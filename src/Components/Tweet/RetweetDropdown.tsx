import React from "react";
import styled from "styled-components";
import { RetweetIcon, PencilIcon } from "assets/icons";
import { gql, useMutation, useQuery } from "@apollo/client";
import { tweetDetailsFragment } from "utils/fragments";
import { useDispatch } from "react-redux";
import { clickedRetweetCommentButton } from "redux/slices/retweetSlice";
import { GET_TWEETS } from "Components/Home/Home";
import { GET_TWEET } from "Components/CommentPage/CommentPage";

const ADD_RETWEET = gql`
  mutation AddRetweet($parentID: ID!) {
    addRetweet(parentID: $parentID) {
      ...tweetDetails
    }
  }
  ${tweetDetailsFragment}
`;

const UNDO_RETWEET = gql`
  mutation UndoRetweet($parentID: ID!) {
    undoRetweet(parentID: $parentID) {
      ...tweetDetails
    }
  }
  ${tweetDetailsFragment}
`;

export const SELF = gql`
  query Self {
    self {
      retweetParentIDs
    }
  }
`;

type PropTypes = { tweet: Tweet };

export function RetweetDropdown(props: PropTypes) {
  const dispatch = useDispatch();

  // * GQL query to get logged in user's retweetIDs list
  const { data } = useQuery(SELF);

  // * GQL Mutation to add a retweet (logged in user retweeting this tweet)
  const [addRetweet] = useMutation(ADD_RETWEET, {
    variables: {
      parentID: props.tweet.body ? props.tweet.id : props.tweet.retweetParent,
    },
    update: (store, { data }) => {
      // Update tweets returned from self { tweets } queries
      try {
        type GetTweetsQuery = {
          self: { retweetParentIDs: string[]; tweets: Tweet[] };
        };
        const query = store.readQuery<GetTweetsQuery>({
          query: GET_TWEETS,
          variables: { getRetweets: true },
        });
        const tweetList = query?.self.tweets;
        const retweetParentIDs = query?.self.retweetParentIDs;

        if (tweetList && retweetParentIDs) {
          store.writeQuery({
            query: GET_TWEETS,
            data: {
              self: {
                __typename: "User",
                retweetParentIDs: [
                  data.addRetweet.retweetParent,
                  ...retweetParentIDs,
                ],
                tweets: [data.addRetweet, ...tweetList],
              },
            },
          });
        }
      } catch (err) {
        console.log(err);
      }

      // Update the retweetIDs list for parent tweet
      store.writeFragment({
        id: props.tweet.id,
        fragment: gql`
          fragment ParentTweet on Tweet {
            retweetIDs
          }
        `,
        data: { retweetIDs: [data.addRetweet.id, ...props.tweet.retweetIDs] },
      });

      // Update queries for this tweet with the new retweetID list
      store.writeQuery({
        query: GET_TWEET,
        variables: { id: props.tweet.id },
        data: {
          tweet: {
            ...props.tweet,
            retweetIDs: [data.addRetweet.id, ...props.tweet.retweetIDs],
          },
        },
      });
    },
  });

  // * GQL Mutation to undo a retweet
  const [undoRetweet] = useMutation(UNDO_RETWEET, {
    variables: {
      parentID: props.tweet.body ? props.tweet.id : props.tweet.retweetParent,
    },
    update: (store, { data }) => {
      // Update tweets returned from self { tweets } queries
      try {
        type GetTweetsQuery = {
          self: { retweetParentIDs: string[]; tweets: Tweet[] };
        };
        const query = store.readQuery<GetTweetsQuery>({
          query: GET_TWEETS,
          variables: { getRetweets: true },
        });
        const tweetList = query?.self.tweets;
        const retweetParentIDs = query?.self.retweetParentIDs;

        if (tweetList && retweetParentIDs) {
          store.writeQuery({
            query: GET_TWEETS,
            data: {
              self: {
                __typename: "User",
                retweetParentIDs: retweetParentIDs.filter(
                  (id) => id !== data.undoRetweet.retweetParent
                ),
                tweets: tweetList.filter(
                  (tweet) => tweet.id !== data.undoRetweet.id
                ),
              },
            },
          });
        }
      } catch (err) {
        console.log(err);
      }

      // Update the retweetIDs list for parent tweet
      store.writeFragment({
        id: props.tweet.id,
        fragment: gql`
          fragment ParentTweet on Tweet {
            retweetIDs
          }
        `,
        data: {
          retweetIDs: props.tweet.retweetIDs.filter(
            (id) => id !== data.undoRetweet.id
          ),
        },
      });

      // Update queries for this tweet with the new retweetID list
      store.writeQuery({
        query: GET_TWEET,
        variables: { id: props.tweet.id },
        data: {
          tweet: {
            ...props.tweet,
            retweetIDs: props.tweet.retweetIDs.filter(
              (id) => id !== data.undoRetweet.id
            ),
          },
        },
      });
    },
  });

  return (
    <>
      <Backdrop />
      <Container>
        {data && data.self.retweetParentIDs.includes(props.tweet.id) ? (
          <DropdownButton onClick={() => undoRetweet()}>
            <RetweetIcon />
            <DropdownText>Undo Retweet</DropdownText>
          </DropdownButton>
        ) : (
          <DropdownButton onClick={() => addRetweet()}>
            <RetweetIcon />
            <DropdownText>Retweet</DropdownText>
          </DropdownButton>
        )}
        <DropdownButton
          onClick={() => dispatch(clickedRetweetCommentButton(props.tweet))}
        >
          <PencilIcon />
          <DropdownText>Retweet with comment</DropdownText>
        </DropdownButton>
      </Container>
    </>
  );
}

const Container = styled.div`
  position: absolute;
  width: 230px;
  height: 100px;
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
const DropdownButton = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  color: black;
  padding: 0 10px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.greyBackground};
  }
`;

const DropdownText = styled.span`
  margin-left: 10px;
`;
