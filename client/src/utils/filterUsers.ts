
import IUser from "../types/user"; // adjust path as needed

export function filterUsers(users: IUser[], search: string): IUser[] {
  if (!search.trim()) return users;

  const keyword = search.toLowerCase();
  return users.filter((user) =>
    user.name.toLowerCase().includes(keyword)
  );
}
