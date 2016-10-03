type Props = {
  users: Array<User>
}

type ProfilePic = {
  url: string,
  width: number,
  height: number
}

type Role = "Administrator" | "Editor" | "Reader";
type Administrator = "Administrator";

type User = {
  id: number,
  firstName: string,
  lastName: string,
  role: Role,
  activated: bool,
  profilePic: ProfilePic
}

type Event = {
  authToken: string,
  body: Object,
  params: Object,
  url: string,
  query: Object
}

type LambdaContext = {
  succeed?: (result: any) => void,
  fail: (error: Error) => void,
  done: (result: any) => void,
  getRemainingTimeInMillis: () => number,
  functionName?: string,
  functionVersion?: number | string,
  invokedFunctionArn?: string,
  memoryLimitInMB?: number,
  awsRequestId?: number | string,
  logGroupName?: string,
  logStreamName?: string
};

type Message = {
  type: string,
  id: string
}

type WorkflowRule = {
  key: string,
  description: string,
  connection: Connection,
  path: string,
  if?: Function
}

type Connection = {
  baseUrl: string,
  headers?: Object
}

type Activity = {
  type: string,
  id: string,
  description: string,
  status: string,
  summary: string
}

type Query = {
  KeyConditionExpression: string,
  ExpressionAttributeNames?: Object,
  ExpressionAttributeValues: Object
}

type Filter = {
  FilterExpression: string,
  ExpressionAttributeNames?: Object,
  ExpressionAttributeValues: Object
}

// Example function, for later use with autoTest

const genHTML = ({id, firstName, lastName} : Props) => (
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
