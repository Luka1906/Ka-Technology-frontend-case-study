const UserAvatar = ({ seed }) => {
 const avatarUrl = `https://api.dicebear.com/9.x/lorelei/svg?seed=${encodeURIComponent(
  seed
)}&backgroundColor=6366f1,8b5cf6,ec4899&clothingColor=6366f1,8b5cf6,ec4899&hairColor=2c1b18,724133,a55728`;
  return (
    <img
      src={avatarUrl}
      alt="Avatar"
      className="h-14 w-14 rounded-full"
    />
  );
}

export default UserAvatar