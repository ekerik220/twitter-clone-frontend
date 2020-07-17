import React from "react";
import styled from "styled-components";
import { TwitterBird } from "assets/icons";
import { Button } from "Components/Button/Button";
import { LoginForm } from "./LoginForm";

export function RightPanel() {
  return (
    <Wrapper>
      <TopBox>
        <LoginForm />
      </TopBox>
      <CenterBox>
        <TwitterBirdSVG />
        <Heading>See what's happening in the world right now</Heading>
        <JoinTwatterText>Join Twatter today.</JoinTwatterText>
        <StyledButton>Sign up</StyledButton>
        <StyledButton variation="outline">Log in</StyledButton>
      </CenterBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(3, auto);
  justify-content: center;
  padding: 15px;

  @media only screen and (min-width: 800px) {
    width: 50%;
  }
`;

const TopBox = styled.div`
  display: none;

  @media only screen and (min-width: 1000px) and (min-height: 660px) {
    display: flex;
    width: 100%;
    min-width: 0;
    grid-row: 1;
  }
`;

const CenterBox = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 380px;
  justify-self: center;
  grid-row: 2;
`;

const TwitterBirdSVG = styled(TwitterBird)`
  height: 41.25px;
  align-self: flex-start;
  color: ${({ theme }) => theme.colors.blueMain};
`;

const Heading = styled.span`
  font-size: 30px;
  font-weight: bold;
  margin-top: 20px;
  line-height: 1.3125;
`;

const JoinTwatterText = styled.span`
  font-size: 15px;
  font-weight: bold;
  margin-top: 59px;
  margin-bottom: 15px;
`;

const StyledButton = styled(Button)`
  margin-bottom: 15px;
  padding: 0 15px;
`;
