import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Avatar } from "Components/Avatar/Avatar";
import { ImageIcon, CrossIcon } from "assets/icons";
import { Button } from "Components/Button/Button";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { GET_TWEETS } from "Components/Home/Home";
import { tweetDetailsFragment } from "utils/fragments";
import { closedTweetModal } from "redux/slices/tweetModalSlice";

const ADD_TWEET = gql`
  mutation AddTweet($body: String!, $img: Upload) {
    addTweet(body: $body, img: $img) {
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
  const [imgFile, setImgFile] = useState<File>();
  const [imgData, setImgData] = useState<string>();

  // refs
  const inputRef = useRef<HTMLSpanElement>(null);

  // * GQL mutation to get logged in user's avatar
  const { data } = useQuery(GET_AVATAR);

  // * GQL Mutation to add a tweet to DB
  const [addTweet, { loading }] = useMutation(ADD_TWEET, {
    onCompleted: (data) => {
      setInput("");
      setImgFile(undefined);
      setImgData(undefined);
      if (inputRef.current) inputRef.current.innerHTML = "";
      dispatch(closedTweetModal());
    },
    update: (store, { data }) => {
      type GetTweetsQuery = { self: { tweets: Tweet[] } };
      const tweetList = store.readQuery<GetTweetsQuery>({
        query: GET_TWEETS,
        variables: { getRetweets: true },
      })?.self.tweets;

      if (tweetList) {
        store.writeQuery({
          query: GET_TWEETS,
          data: { self: { tweets: [data.addTweet, ...tweetList] } },
        });
      }
    },
  });

  // * Handle file input for the image button
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files) {
      // Save the plain file in state
      setImgFile(e.target.files[0]);

      // Get a data string version of the file so we can display the image right now
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setImgData(reader.result as string);
      };
    }
  };

  // * Remove image from the tweet
  const removeImage = () => {
    setImgData(undefined);
    setImgFile(undefined);
  };

  return (
    <Container>
      <AvatarBox>
        <Avatar width="50px" height="50px" url={data?.self.avatar} />
      </AvatarBox>
      <InputBox>
        <Input
          onInput={(e) => setInput(e.currentTarget.textContent)}
          data-placeholder="What's happening?"
          ref={inputRef}
          contentEditable={!loading}
        ></Input>
        {imgData && (
          <ImageBox>
            <BlackCircle onClick={removeImage}>
              <StyledCrossIcon />
            </BlackCircle>
            <Image src={imgData} alt="" />
          </ImageBox>
        )}
        <Dashboard>
          <DashboardLeft>
            <ImageIconHover>
              <ImageIcon />
              <HiddenFileInput onChange={handleFileInput} />
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
              onClick={() =>
                addTweet({ variables: { body: input, img: imgFile } })
              }
            >
              Twat
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
  background-color: white;
  margin: 0 5px 5px 5px;
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
  min-height: 150px;
  outline: none;

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
  overflow: hidden;
  position: relative;

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

const ImageBox = styled.div`
  cursor: pointer;
  position: relative;
  max-width: max-content;
  margin: 0 auto;
`;

const Image = styled.img`
  width: 100%;
  max-height: 300px;
  border-radius: 15px;
  object-fit: cover;
`;

const BlackCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 7px;
  left: 7px;
  height: 28px;
  width: 28px;
  border-radius: 50%;
  background: black;
`;

const StyledCrossIcon = styled(CrossIcon)`
  color: white;
  height: 19px;
  width: 19px;
`;

const HiddenFileInput = styled.input.attrs({
  type: "file",
  title: " ",
  accept: "image/png, image/jpeg",
})`
  position: absolute;
  height: 50px;
  opacity: 0;
  cursor: pointer;
  width: 30px;
`;
