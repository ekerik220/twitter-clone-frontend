import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "Components";
import { InputBox } from "Components/InputBox/InputBox";
import { useMutation, gql } from "@apollo/client";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "redux/slices/userSlice";
import { LoadingIcon } from "assets/icons";
import { useHistory } from "react-router-dom";

// GQL mutation for user log in
const LOGIN = gql`
  mutation Login($loginName: String!, $password: String!) {
    login(loginName: $loginName, password: $password)
  }
`;

export function LoginForm() {
  const dispatch = useDispatch();
  const history = useHistory();

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
        history.push("/home");
      }
    },
  });

  // If we're waiting on server, just show a centered loading icon
  if (loading)
    return (
      <Loading>
        <LoadingIcon />
      </Loading>
    );

  return (
    <Wrapper>
      {error && (
        <ErrorText>
          The email and password you entered did not match our records. Please
          double-check and try again.
        </ErrorText>
      )}
      <Form>
        <StyledInputBox
          title="Email, or username"
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
        <LoginButtonBox>
          <Button
            variation="outline"
            onClick={() => login({ variables: { loginName, password } })}
            disabled={loginName.length < 1 || password.length < 1}
          >
            Log in
          </Button>
        </LoginButtonBox>
      </Form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  display: flex;
  min-width: 0;
  top: 15px;
  height: 60px;
`;

const StyledInputBox = styled(InputBox)`
  margin-right: 15px;
`;

const LoginButtonBox = styled.div`
  width: 78px;
  min-width: 78px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Loading = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ErrorText = styled.span`
  color: ${({ theme }) => theme.colors.errorRed};
  margin: 10px;
  font-size: 15px;
`;
