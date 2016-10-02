type Props = {
  users: Array<User>
}

type ProfilePic = {
  url: string,
  width: number,
  height: number
}

type User = {
  id: number,
  firstName: string,
  lastName: string,
  role: "Administrator" | "Editor" | "Reader",
  activated: bool,
  profilePic: ProfilePic
}

const User = ({id, firstName, lastName} : Props) => (
  `<li href="/users/${id}">${firstName} ${lastName}</li>`
);

export default User;
