import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupStarted } from "redux/slices/signupSlice";
import styled from "styled-components";
import { LeftPanel } from "./LeftPanel";
import { RightPanel } from "./RightPanel";
import { Nav } from "./Nav";
import { Button } from "Components/Button/Button";
import { useHistory } from "react-router-dom";

/** This is the page we see when we're not logged in. */
export function LoginPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  // Redux state
  const loggedIn = useSelector((state: RootState) => state.user.token);

  // * Redirect to /home if logged in
  useLayoutEffect(() => {
    if (loggedIn) history.push("/home");
  }, [loggedIn, history]);

  return (
    <Wrapper>
      <ContentArea>
        <ExtraSignUpBox>
          <StyledButton onClick={() => dispatch(signupStarted())}>
            Sign up
          </StyledButton>
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
  width: 100%;

  @media only screen and (min-width: 800px) {
    min-height: 100%;
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
