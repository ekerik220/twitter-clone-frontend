import { gql } from "@apollo/client";

export const tweetDetailsFragment = gql`
  fragment tweetDetails on Tweet {
    id
    userID
    username
    handle
    avatar
    date
    body
    likeIDs
    commentIDs
    replyingTo
    retweetParent
    retweetIDs
    images
  }
`;
