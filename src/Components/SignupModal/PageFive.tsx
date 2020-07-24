import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";
import { InputBox } from "Components/InputBox/InputBox";
import _ from "lodash";
import { LoadingIcon } from "assets/icons/LoadingIcon";
import {
  currentPageIsValid,
  currentPageIsInvalid,
  createdAccount,
} from "redux/slices/signupSlice";
import { userLoggedIn } from "redux/slices/userSlice";
import { useHistory } from "react-router-dom";

// Mutation to add a confirmed user to DB
const ADD_USER = gql`
  mutation AddUser($id: ID!, $password: String!, $loginName: String!) {
    addUser(id: $id, password: $password)
    login(loginName: $loginName, password: $password)
  }
`;

/**********************************
 * Page five of the sign up modal
 **********************************/
export function PageFive() {
  const dispatch = useDispatch();
  const history = useHistory();

  // Local state
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [password, setPassword] = useState("");
  const [pwLengthError, setpwLengthError] = useState(false);

  // Redux state
  const userID = useSelector((state: RootState) => state.signup.userInfo.id);
  const email = useSelector((state: RootState) => state.signup.userInfo.email);
  const shouldTryPassword = useSelector(
    (state: RootState) => state.signup.shouldTryPassword
  );

  // * GQL Mutation
  const [addUser, { loading }] = useMutation(ADD_USER, {
    onCompleted: (data) => {
      const token = data.login;
      dispatch(createdAccount());
      dispatch(userLoggedIn(token));
      history.push("/home");
    },
  });

  // * Debounced password length error checking. Debounce it so it doesn't
  // * immediately give them an error as they're typing, just if they stop
  // * typing and the PW is still too short.
  const debouncedPasswordErrorCheck = useCallback(
    _.debounce((password: string) => {
      if (password.length < 8) setpwLengthError(true);
    }, 700),
    []
  );

  // * Reset PW length errors, keep PW up to date in state, and call the debounced
  // * error checking.
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setpwLengthError(false);
    debouncedPasswordErrorCheck(e.target.value);
    setPassword(e.target.value);
  };

  // * Watch password length and if it's >= 8 tell redux that this page is valid
  useEffect(() => {
    if (password.length >= 8) dispatch(currentPageIsValid());
    else dispatch(currentPageIsInvalid());
  }, [password, dispatch]);

  // * Watch for redux to tell us to send off the password
  useEffect(() => {
    if (shouldTryPassword) {
      addUser({ variables: { id: userID, password, loginName: email } });
    }
  }, [shouldTryPassword, dispatch, password, userID, addUser, email]);

  // If we're waiting on server, just show a centered loading icon
  if (loading)
    return (
      <Loading>
        <StyledLoadingIcon />
      </Loading>
    );

  return (
    <Container>
      <Title>You'll need a password</Title>
      <Subtext>Make sure it's 8 characters or more.</Subtext>
      <InputBox
        title="Password"
        type={passwordHidden ? "password" : "text"}
        autoFocus={true}
        value={password}
        onChange={handlePasswordChange}
        error={pwLengthError}
      />
      <RevealPassword onClick={() => setPasswordHidden(!passwordHidden)}>
        {passwordHidden ? "Reveal Password" : "Hide Password"}
      </RevealPassword>
      {pwLengthError && (
        <ErrorText>
          Your password needs to be at least 8 characters. Please enter a longer
          one.
        </ErrorText>
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 540px;
  margin: auto;
`;

const Title = styled.h2`
  font-size: 23px;
`;

const Subtext = styled.span`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.greyText};
  margin-bottom: 10px;
`;

const RevealPassword = styled.span`
  width: fit-content;
  margin-top: 8px;
  margin-left: 10px;
  color: ${({ theme }) => theme.colors.blueMain};
  user-select: none;
  cursor: pointer;
`;

const ErrorText = styled(Subtext)`
  color: ${({ theme }) => theme.colors.errorRed};
  margin: 0 10px;
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const StyledLoadingIcon = styled(LoadingIcon)`
  height: 25px;
`;
