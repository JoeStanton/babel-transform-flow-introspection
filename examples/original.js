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

// Example function, for later use with autoTest

export const genHTML = ({id, firstName, lastName} : Props) => (
  `<li href="/users/${id}">${firstName} ${lastName}</li>`
);

// Exmaples with Enums

type Suit =
  | "Diamonds"
  | "Clubs"
  | "Hearts"
  | "Spades";

type Rank =
  | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  | "Jack"
  | "Queen"
  | "King"
  | "Ace";

type Card = {
  suit: Suit,
  rank: Rank,
}
