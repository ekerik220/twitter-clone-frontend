import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Avatar } from "Components/Avatar/Avatar";
import { ImageIcon } from "assets/icons";
import { Button } from "Components/Button/Button";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { gql, useMutation } from "@apollo/client";

const ADD_TWEET = gql`
  mutation AddTweet($body: String!) {
    addTweet(body: $body) {
      id
    }
  }
`;

export function InputArea() {
  // Local state
  const [input, setInput] = useState<string | null>("");

  // refs
  const inputRef = useRef<HTMLSpanElement>(null);

  // * GQL Mutation to add a tweet to DB
  const [addTweet, { loading }] = useMutation(ADD_TWEET, {
    onCompleted: () => {
      setInput("");
      if (inputRef.current) inputRef.current.innerHTML = "";
    },
  });

  return (
    <Container>
      <AvatarBox>
        <Avatar width="50px" height="50px" />
      </AvatarBox>
      <InputBox>
        <Input
          onInput={(e) => setInput(e.currentTarget.textContent)}
          data-placeholder="What's happening?"
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
            <TweetButton
              disabled={!input || input.length > 280 || loading}
              onClick={() => addTweet({ variables: { body: input } })}
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
  border: ${({ theme }) => `1px solid ${theme.colors.lightGrey}`};
  padding: 10px;
  background-color: white;
  margin-bottom: 10px;
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
