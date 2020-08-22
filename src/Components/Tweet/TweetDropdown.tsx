import React from "react";
import styled from "styled-components";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { FollowIcon } from "assets/icons/FollowIcon";
import { UnfollowIcon } from "assets/icons/UnfollowIcon";
import { TrashcanIcon } from "assets/icons";

export const SELF = gql`
  query Self {
    self {
      followingIDs
    }
  }
`;

const FOLLOW_OR_UNFOLLOW = gql`
  mutation FollowOrUnfollow($id: ID!) {
    followOrUnfollow(id: $id) {
      followingIDs
    }
  }
`;

const DELETE_TWEET = gql`
  mutation DeleteTweet($tweetID: ID!) {
    deleteTweet(tweetID: $tweetID) {
      id
    }
  }
`;

type PropTypes = { tweet: Tweet };

export function TweetDropdown(props: PropTypes) {
  // redux state
  const userID = useSelector((state: RootState) => state.user.userID);

  // * GQL query to get logged in user's followingIDs list
  const { data } = useQuery(SELF);

  // * GQL mutation to follow or unfollow a user
  const [followOrUnfollow] = useMutation(FOLLOW_OR_UNFOLLOW, {
    variables: { id: props.tweet.userID },
    update: (store, { data }) => {
      const fragment = gql`
        fragment MyFollowingIDs on User {
          followingIDs
        }
      `;
      store.writeFragment({
        id: `User:${userID}`,
        fragment,
        data: { followingIDs: data?.followOrUnfollow.followingIDs },
      });
    },
  });

  // * GQL mutation to delete this tweet
  const [deleteTweet] = useMutation(DELETE_TWEET, {
    variables: { tweetID: props.tweet.id },
    optimisticResponse: {
      __typename: "Mutation",
      deleteTweet: {
        id: props.tweet.id,
      },
    },
    update: (store, { data }) => {
      const fragment = gql`
        fragment Tweets on User {
          tweets {
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
        }
      `;

      const read: any = store.readFragment({ id: `User:${userID}`, fragment });

      store.writeFragment({
        id: `User:${userID}`,
        fragment,
        data: {
          tweets: read.tweets.filter(
            (tweet: Tweet) => tweet.id !== data?.deleteTweet.id
          ),
        },
      });
    },
  });

  return (
    <>
      <Backdrop />
      <Container>
        {props.tweet.userID === userID ? (
          <DropdownButton color="red" onClick={() => deleteTweet()}>
            <TrashcanIcon />
            <DropdownText>Delete</DropdownText>
          </DropdownButton>
        ) : data && data.self.followingIDs.includes(props.tweet.userID) ? (
          <DropdownButton onClick={() => followOrUnfollow()}>
            <UnfollowIcon />
            <DropdownText>Unfollow @{props.tweet.handle}</DropdownText>
          </DropdownButton>
        ) : (
          <DropdownButton onClick={() => followOrUnfollow()}>
            <FollowIcon />
            <DropdownText>Follow @{props.tweet.handle}</DropdownText>
          </DropdownButton>
        )}
      </Container>
    </>
  );
}

const Container = styled.div`
  position: absolute;
  width: 230px;
  right: 0;
  top: 0;
  background: white;
  border-radius: 5px;
  box-shadow: rgba(101, 119, 134, 0.2) 0px 0px 15px,
    rgba(101, 119, 134, 0.15) 0px 0px 3px 1px;
  z-index: 2;
`;

const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
`;

type DropdownButtonProps = { color?: string };
const DropdownButton = styled.div<DropdownButtonProps>`
  display: flex;
  align-items: center;
  height: 50px;
  color: ${({ theme, color }) =>
    color === "red" ? theme.colors.errorRed : "black"};
  padding: 0 10px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.greyBackground};
  }
`;

const DropdownText = styled.span`
  margin-left: 10px;
`;
