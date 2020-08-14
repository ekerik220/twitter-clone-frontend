import React, { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { useSelector } from "react-redux";

const ADD_REMOVE_LIKE = gql`
  mutation AddOrRemoveLike($tweet: ID!) {
    addOrRemoveLike(tweet: $tweet)
  }
`;

export function useLikeInfo(tweet: Tweet) {
  // Local state
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(tweet.likeIDs.length);

  // Redux state
  const userID = useSelector((state: RootState) => state.user.userID);

  // * GQL mutation to add/remove the user's like from this tweet
  const [addOrRemoveLike, { loading }] = useMutation(ADD_REMOVE_LIKE, {
    variables: { tweet: tweet.id },
    update: (store, { data }) => {
      store.writeFragment({
        id: `Tweet:${tweet.id}`,
        fragment: gql`
          fragment LikeIDs on Tweet {
            likeIDs
          }
        `,
        data: { likeIDs: data.addOrRemoveLike },
      });
    },
    refetchQueries: ["GetUser"],
  });

  // * useEffect to monitor whether this tweet is liked by the user or not
  useEffect(() => {
    if (tweet.likeIDs.includes(userID)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
    setLikeCount(tweet.likeIDs.length);
  }, [userID, tweet.likeIDs]);

  // * Click handler to add/remove the user's like from a tweet
  const handleLikeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!loading) addOrRemoveLike();
  };

  return { handleLikeClick, liked, likeCount };
}
