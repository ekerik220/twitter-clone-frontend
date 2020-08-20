import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";
import { InputBox } from "Components/InputBox/InputBox";
import {
  currentPageIsValid,
  currentPageIsInvalid,
  triedCode,
  codeWasValid,
} from "redux/slices/signupSlice";
import { LoadingIcon } from "assets/icons/LoadingIcon";

const CONFIRM_USER = gql`
  mutation ConfirmUser($confirmationCode: String!, $id: ID!) {
    confirmUser(confirmationCode: $confirmationCode, id: $id)
  }
`;

/**********************************
 * Page four of the sign up modal
 **********************************/
export function PageFour() {
  const dispatch = useDispatch();

  // Local state
  const [codeInput, setCodeInput] = useState("");
  const [invalidCodeError, setInvalidCodeError] = useState(false);

  // Redux state
  const email = useSelector((state: RootState) => state.signup.userInfo.email);
  const shouldTryCode = useSelector(
    (state: RootState) => state.signup.shouldTryCode
  );
  const userID = useSelector((state: RootState) => state.signup.userInfo.id);

  // * GQL Mutation
  const [confirmUser, { loading }] = useMutation(CONFIRM_USER, {
    errorPolicy: "all",
    onCompleted: (data) => {
      // tell redux about the success
      if (data.confirmUser) dispatch(codeWasValid());
    },
    onError: () => {
      // set the invalidCodeError state to true for 4 seconds
      setInvalidCodeError(true);
      window.setTimeout(() => {
        setInvalidCodeError(false);
      }, 4000);
    },
  });

  // * Watch the codeInput field and let redux know when it has at least
  // * 1 character (this page is valid in that case).
  useEffect(() => {
    if (codeInput.length > 0) dispatch(currentPageIsValid());
    else dispatch(currentPageIsInvalid());
  }, [dispatch, codeInput]);

  // * Watch for a signal to try the code from redux (shouldTryCode)
  // * Tell redux that we tried the code
  useEffect(() => {
    if (shouldTryCode) {
      confirmUser({ variables: { confirmationCode: codeInput, id: userID } });
      setCodeInput("");
      dispatch(triedCode());
    }
  }, [shouldTryCode, userID, confirmUser, codeInput, dispatch]);

  // If we're waiting on server to check our validation code, just show a
  // centered loading icon.
  if (loading)
    return (
      <Loading>
        <StyledLoadingIcon />
      </Loading>
    );

  return (
    <Container>
      <Title>We sent you a code</Title>
      <Subtext>Enter it below to verify {email}.</Subtext>
      <InputBox
        title="Verification code"
        maxLength={100}
        value={codeInput}
        onChange={(e) => setCodeInput(e.target.value)}
        autoFocus={true}
      />
      {invalidCodeError && (
        <ErrorMessage>
          The code you entered is incorrect. Please try again.
        </ErrorMessage>
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 540px;
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

const ErrorMessage = styled.div`
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  justify-content: center;
  width: 370px;
  background-color: ${({ theme }) => theme.colors.blueMain};
  color: white;
  padding: 5px;
  border-radius: 5px;
  font-size: 15px;
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
