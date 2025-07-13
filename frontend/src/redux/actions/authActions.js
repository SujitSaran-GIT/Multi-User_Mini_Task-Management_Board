import axios from 'axios'
import API_BASE_URL from '../../'
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS } from '../constants/authConstants.js'

const API = API_BASE_URL

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST })

    const config = { headers: { 'Content-Type': 'application/json' } }
    const { data } = await axios.post(`${API}/auth/login`, { email, password }, config)

    // Validate the response data
    if (!data || !data.token) {
      throw new Error('Invalid response from server');
    }

    dispatch({ type: LOGIN_SUCCESS, payload: data })
    localStorage.setItem('userInfo', JSON.stringify(data))

    // Set default auth header for future requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response?.data?.message || error.message })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  // Clear auth header
  delete axios.defaults.headers.common['Authorization']
  dispatch({ type: LOGOUT })
}

export const register = (name, email, password, role) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST })

    const config = { headers: { 'Content-Type': 'application/json' } }
    const { data } = await axios.post(`${API}/auth/register`, { name, email, password, role }, config)

    dispatch({ type: REGISTER_SUCCESS, payload: data })
    dispatch({ type: LOGIN_SUCCESS, payload: data })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: REGISTER_FAIL, payload: error.response?.data.message || error.message })
  }
}

