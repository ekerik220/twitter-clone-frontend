import React from "react";
import styled from "styled-components";
import { InputArea } from "./InputArea";

export function Home() {
  return (
    <Container>
      <Header>Home</Header>
      <TweetArea>
        <InputArea />
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

const Tweet = styled.div`
  display: flex;
  width: 100%;
  max-width: 600px;
  height: 200px;
  border: ${({ theme }) => `1px solid ${theme.colors.lightGrey}`};
  background-color: white;
`;
