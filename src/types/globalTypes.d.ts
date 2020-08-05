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

type Trend = {
  hashtag: string;
  numOfTweets: number;
};
