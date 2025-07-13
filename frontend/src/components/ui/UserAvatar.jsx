export default function UserAvatar({ email }) {
  const initials = email
    .split('@')[0]
    .split('.')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="w-10 h-10 rounded-full bg-[#08D9D6] flex items-center justify-center text-[#252A34] font-bold">
      {initials}
    </div>
  );
}