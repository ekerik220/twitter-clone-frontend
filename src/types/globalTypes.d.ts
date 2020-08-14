type Tweet = {
  id: string;
  userID: string;
  username: string;
  handle: string;
  avatar?: string;
  date: Date;
  body: string;
  images?: [string];
  replyingTo?: string;
  likeIDs: [string];
  commentIDs: [string];
  retweetParent?: string;
  retweetIDs: [string];
};

type User = {
  id: string;
  username: string;
  bio: string;
  handle: string;
  avatar: string;
  profileImg: string;
};

type Trend = {
  hashtag: string;
  numOfTweets: number;
};

type NotificationObject = {
  type: string;
  user: User;
  tweet?: Tweet;
};

type List = {
  id: string;
  name: string;
  description?: string;
  img?: string;
  userIDs: [string];
};
