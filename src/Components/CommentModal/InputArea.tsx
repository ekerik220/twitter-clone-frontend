import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Avatar } from "Components/Avatar/Avatar";
import { ImageIcon } from "assets/icons";
import { Button } from "Components/Button/Button";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSelector, useDispatch } from "react-redux";
import { gql, useMutation } from "@apollo/client";
import { tweetDetailsFragment } from "utils/fragments";
import { GET_TWEETS } from "Components/Home/Home";
import { GET_TWEET } from "Components/CommentPage/CommentPage";
import { closedCommentModal } from "redux/slices/commentSlice";

const ADD_COMMENT = gql`
  mutation AddComment($replyingToID: ID!, $body: String!) {
    addComment(replyingToID: $replyingToID, body: $body) {
      ...tweetDetails
    }
  }
  ${tweetDetailsFragment}
`;

export function InputArea() {
  const dispatch = useDispatch();

  // Local state
  const [input, setInput] = useState<string | null>("");

  // Redux state
  const avatarURL = useSelector((state: RootState) => state.user.avatar);
  const tweet = useSelector((state: RootState) => state.comment.tweet) as Tweet;

  // refs
  const inputRef = useRef<HTMLSpanElement>(null);

  // * GQL mutation to add a comment to the DB
  const [addComment, { loading }] = useMutation(ADD_COMMENT, {
    variables: { replyingToID: tweet.id, body: input },
    onCompleted: () => {
      dispatch(closedCommentModal());
    },
    update: (store, { data }) => {
      // Update parent tweet's comment list with the new comment
      store.writeFragment({
        id: `Tweet:${tweet.id}`,
        fragment: gql`
          fragment ParentTweet on Tweet {
            commentIDs
          }
        `,
        data: {
          commentIDs: [data.addComment.id, ...tweet.commentIDs],
        },
      });

      // Update query for comments on this tweet
      try {
        const query = store.readQuery<any>({
          query: GET_TWEET,
          variables: { id: tweet.id },
        });

        if (query.tweet) {
          store.writeQuery({
            query: GET_TWEET,
            variables: { id: tweet.id },
            data: {
              tweet: {
                ...tweet,
                comments: [data.addComment, ...query.tweet.comments],
              },
            },
          });
        }
      } catch (err) {
        console.log(err);
      }

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
                tweets: [data.addComment, ...tweetList],
              },
            },
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <Container>
      <AvatarBox>
        <Avatar width="50px" height="50px" url={avatarURL} />
      </AvatarBox>
      <InputBox>
        <Input
          onInput={(e) => setInput(e.currentTarget.textContent)}
          data-placeholder="Twat your reply"
          ref={inputRef}
          contentEditable={!loading}
        ></Input>
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
            <ReplyButton
              disabled={!input || input.length > 280 || loading}
              onClick={() => addComment()}
            >
              Reply
            </ReplyButton>
          </DashboardRight>
        </Dashboard>
      </InputBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  padding: 10px;
  background-color: white;
  margin-bottom: 10px;
`;

const AvatarBox = styled.div`
  margin-right: 5px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 65px);
`;

const Input = styled.span.attrs({ role: "textbox" })`
  position: relative;
  min-height: 150px;
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

const ReplyButton = styled(Button)`
  width: 77px;
  height: 37px;
  font-weight: bold;
`;

const CircularProgress = styled(CircularProgressbar)`
  margin-right: 15px;
  width: 30px;
`;
