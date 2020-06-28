import React from "react";
import styled from "styled-components";
import { LeftPanel } from "./LeftPanel";
import { RightPanel } from "./RightPanel";
import { Nav } from "./Nav";
import { Button } from "Components/Button/Button";

/** This is the page we see when we're not logged in. */
export function LoginPage() {
  return (
    <Wrapper>
      <ContentArea>
        <ExtraSignUpBox>
          <StyledButton>Sign up</StyledButton>
          <StyledButton variation="outline">Log in</StyledButton>
        </ExtraSignUpBox>
        <LeftPanel />
        <RightPanel />
      </ContentArea>
      <Nav />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (min-width: 800px) {
    height: 100%;
  }
`;

const ContentArea = styled.div`
  display: flex;
  flex-direction: column-reverse;
  height: 100%;

  @media only screen and (min-width: 800px) {
    flex-direction: row;
  }
`;

const ExtraSignUpBox = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  padding-top: 40px;
  padding-bottom: 30px;

  @media only screen and (min-width: 800px) {
    display: none;
  }
`;

const StyledButton = styled(Button)`
  margin-right: 15px;
  max-width: 180px;
  width: 100%;
`;
