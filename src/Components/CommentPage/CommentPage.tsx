import React from "react";
import styled from "styled-components";
import { Tweet } from "Components/Tweet/Tweet";
import { TopTweet } from "./TopTweet";
import { BackButton } from "Components/BackButton/BackButton";
import { useHistory } from "react-router-dom";

export function CommentPage() {
  const history = useHistory();

  return (
    <Container>
      <Header>
        <StyledBackButton onClick={() => history.goBack()} />
        <span>Twat</span>
      </Header>
      <TweetArea>
        <TopTweet />
        <Tweet />
        <Tweet />
        <Tweet />
        <Tweet />
        <Tweet />
        <Tweet />
        <Tweet />
        <Tweet />
      </TweetArea>
    </Container>
  );
}

const Container = styled.div`
  max-width: 600px;
  width: 100%;

  @media only screen and (min-width: 1000px) {
    min-width: 600px;
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  background-color: white;
  font-size: 19px;
  width: inherit;
  max-width: 600px;
  height: 50px;
  font-weight: bold;
  border: ${({ theme }) => `1px solid ${theme.colors.lightGrey}`};
  border-top: none;
  padding: 0px 10px;
  cursor: pointer;
  position: fixed;
  z-index: 1;
`;

const TweetArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  background-color: ${({ theme }) => theme.colors.lightGrey};
`;

const StyledBackButton = styled(BackButton)`
  margin-right: 20px;
`;
