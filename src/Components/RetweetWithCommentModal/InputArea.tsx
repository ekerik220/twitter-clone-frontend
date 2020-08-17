import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Avatar } from "Components/Avatar/Avatar";
import { ImageIcon } from "assets/icons";
import { Button } from "Components/Button/Button";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { tweetDetailsFragment } from "utils/fragments";
import { RetweetBox } from "Components/Tweet/RetweetBox";
import { GET_TWEETS } from "Components/Home/Home";
import { GET_TWEET } from "Components/CommentPage/CommentPage";
import { closedRetweetModal } from "redux/slices/retweetSlice";

const ADD_RETWEET = gql`
  mutation AddRetweet($parentID: ID!, $body: String!) {
    addRetweet(parentID: $parentID, body: $body) {
      ...tweetDetails
    }
  }
  ${tweetDetailsFragment}
`;

const GET_AVATAR = gql`
  query GetAvatar {
    self {
      avatar
    }
  }
`;

export function InputArea() {
  const dispatch = useDispatch();

  // Local state
  const [input, setInput] = useState<string | null>("");

  // Redux state
  const tweet = useSelector((state: RootState) => state.retweet.tweet) as Tweet;

  // refs
  const inputRef = useRef<HTMLSpanElement>(null);

  // * GQL mutation to get logged in user's avatar
  const { data } = useQuery(GET_AVATAR);

  // * GQL Mutation to add a retweet with comment
  const [addRetweet, { loading }] = useMutation(ADD_RETWEET, {
    variables: { parentID: tweet.id, body: input },
    onCompleted: () => {
      dispatch(closedRetweetModal());
    },
    update: (store, { data }) => {
      // Update tweets returned from self { tweets } queries
      try {
        type GetTweetsQuery = { self: { tweets: Tweet[] } };
        const tweetList = store.readQuery<GetTweetsQuery>({
          query: GET_TWEETS,
          variables: { getRetweets: true },
        })?.self.tweets;

        if (tweetList) {
          store.writeQuery({
            query: GET_TWEETS,
            data: {
              self: {
                __typename: "User",
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
        id: tweet.id,
        fragment: gql`
          fragment ParentTweet on Tweet {
            retweetIDs
          }
        `,
        data: { retweetIDs: [data.addRetweet.id, ...tweet.retweetIDs] },
      });

      // Update queries for this tweet with the new retweetID list
      store.writeQuery({
        query: GET_TWEET,
        variables: { id: tweet.id },
        data: {
          tweet: {
            ...tweet,
            retweetIDs: [data.addRetweet.id, ...tweet.retweetIDs],
          },
        },
      });
    },
  });

  return (
    <Container>
      <AvatarBox>
        <Avatar width="50px" height="50px" url={data?.self.avatar} />
      </AvatarBox>
      <InputBox>
        <Input
          onInput={(e) => setInput(e.currentTarget.textContent)}
          data-placeholder="Add a comment"
          ref={inputRef}
          contentEditable={!loading}
        ></Input>
        <RetweetBox noInteract tweet={tweet} />
        <Dashboard>
          <DashboardLeft>
            <ImageIconHover>
              <ImageIcon />
            </ImageIconHover>
          </DashboardLeft>
          <DashboardRight>
            {input && input.length > 0 && (
              <CircularProgress
                value={input ? (input.length / 280) * 100 : 0}
                text={
                  input && input.length >= 260 ? `${280 - input.length}` : ""
                }
                styles={buildStyles({
                  textSize: "50px",
                  textColor: input && input.length >= 280 ? "#ff0033" : "black",
                  pathTransition: "none",
                  pathColor:
                    input && input.length < 260
                      ? "rgb(29,161,242)"
                      : input && input.length < 280
                      ? "rgb(255,140,0)"
                      : input && input.length >= 290
                      ? "rgba(0,0,0,0)"
                      : "#ff0033",
                  trailColor:
                    input && input.length >= 290 ? "rgba(0,0,0,0)" : "#d6d6d6",
                })}
              />
            )}
            <TweetButton
              disabled={!input || input.length > 280 || loading}
              onClick={() => addRetweet()}
            >
              Retwat
            </TweetButton>
          </DashboardRight>
        </Dashboard>
      </InputBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  padding: 10px;
  margin: 0 5px 5px 5px;
  margin-bottom: 5px;
  background-color: white;
  overflow-y: auto;
`;

const AvatarBox = styled.div`
  margin-right: 15px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 65px);
`;

const Input = styled.span.attrs({ role: "textbox" })`
  position: relative;
  width: 100%;
  white-space: pre-line;
  overflow-wrap: break-word;
  display: block;
  cursor: text;
  padding: 10px;
  font-size: 19px;

  &:empty:before {
    content: attr(data-placeholder);
    display: block;
    height: 100%;
    color: #00000066;
  }
`;

const Dashboard = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const DashboardLeft = styled.div`
  display: flex;
  align-items: center;
`;

const DashboardRight = styled.div`
  display: flex;
`;

const ImageIconHover = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 37px;
  height: 37px;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.blueMain};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.blueHover};
  }
`;

const TweetButton = styled(Button)`
  width: 77px;
  height: 37px;
  font-weight: bold;
`;

const CircularProgress = styled(CircularProgressbar)`
  margin-right: 15px;
  width: 30px;
`;
