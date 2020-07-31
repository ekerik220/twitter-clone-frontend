type Tweet = {
  id?: string;
  userID: string;
  username: string;
  handle: string;
  avatar?: string;
  date: Date;
  body: string;
  images?: [string];
  replyingToID?: string;
};
