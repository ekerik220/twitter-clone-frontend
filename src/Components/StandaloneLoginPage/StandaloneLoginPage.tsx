import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "redux/slices/userSlice";
import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";
import { TwitterBird, LoadingIcon } from "assets/icons";
import { InputBox } from "Components/InputBox/InputBox";
import { Button } from "Components/Button/Button";
import { signupStarted } from "redux/slices/signupSlice";

const LOGIN = gql`
  mutation Login($loginName: String!, $password: String!) {
    login(loginName: $loginName, password: $password)
  }
`;

export function StandaloneLoginPage() {
  const dispatch = useDispatch();

  // Local state
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");

  // * GQL mutation
  const [login, { loading, error }] = useMutation(LOGIN, {
    errorPolicy: "all",
    onCompleted: (data) => {
      if (data?.login) {
        const token = data.login;
        dispatch(userLoggedIn(token));
      }
    },
  });

  // * Send off login mutation on click
  const handleLoginClick = () => {
    login({ variables: { loginName, password } });
  };

  // If we're waiting on server, just show a centered loading icon
  if (loading)
    return (
      <Loading>
        <LoadingIcon />
      </Loading>
    );

  return (
    <Container>
      <SVGTwitterBirdIcon />
      <Title>Log in to Twatter</Title>
      {error && (
        <ErrorText>
          The email and password you entered did not match our records. Please
          double-check and try again.
        </ErrorText>
      )}
      <StyledInputBox
        title="Phone, email, or username"
        value={loginName}
        onChange={(e) => setLoginName(e.target.value)}
        type="username"
      />
      <StyledInputBox
        title="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      <StyledButton
        onClick={handleLoginClick}
        disabled={loginName.length < 1 || password.length < 1}
      >
        Log in
      </StyledButton>
      <LinkArea>
        <Link>Forgot password?</Link>
        <LinkDivider>·</LinkDivider>
        <Link onClick={() => dispatch(signupStarted())}>
          Sign up for Twatter
        </Link>
      </LinkArea>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
`;

const SVGTwitterBirdIcon = styled(TwitterBird)`
  margin-top: 20px;
  height: 36px;
  color: ${({ theme }) => theme.colors.blueMain};
`;

const Title = styled.h2`
  font-size: 23px;
  font-weight: bold;
  text-align: center;
`;

const ErrorText = styled.span`
  color: ${({ theme }) => theme.colors.errorRed};
  margin-bottom: 5px;
  font-size: 15px;
`;

const StyledInputBox = styled(InputBox)`
  width: 100%;
  margin-bottom: 20px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 47px;
  margin-bottom: 10px;
`;

const LinkArea = styled.div`
  display: flex;
`;

const LinkDivider = styled.span`
  margin: 0 5px;
`;

const Link = styled.span`
  color: ${({ theme }) => theme.colors.blueMain};
  font-size: 15px;
  text-align: center;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
