import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";
import {
  userWantsToChangeBirthday,
  userWantsToChangeEmail,
  userWantsToChangeName,
  submittedUserInformation,
} from "redux/slices/signupSlice";
import { Button } from "Components/Button/Button";
import moment from "moment";

// Mutation to add an unconfirmed user to DB
const ADD_UNCONFIRMED_USER = gql`
  mutation AddUnconfirmedUser(
    $email: EmailAddress!
    $username: String!
    $birthdate: Date!
  ) {
    addUnconfirmedUser(
      email: $email
      username: $username
      birthdate: $birthdate
    )
  }
`;

export function PageThree() {
  const dispatch = useDispatch();

  // * Pull data from redux
  const { name, email, day, month, year } = useSelector(
    (state: RootState) => state.signup.userInfo
  );

  // * GraphQL
  const [addUnconfirmedUser] = useMutation(ADD_UNCONFIRMED_USER, {
    onCompleted: (data) => {
      // let redux know we submitted user information
      dispatch(submittedUserInformation(data.addUnconfirmedUser));
    },
  });

  // * Send mutation to server to add an unconfirmed user
  const handleSignupClick = () => {
    const birthdate = moment(`${day} ${month} ${year}`).format("YYYY-MM-DD");
    addUnconfirmedUser({ variables: { email, username: name, birthdate } });
  };

  return (
    <Container>
      <Title>Create your account</Title>
      <Field onClick={() => dispatch(userWantsToChangeName())}>{name}</Field>
      <Field onClick={() => dispatch(userWantsToChangeEmail())}>{email}</Field>
      <Field onClick={() => dispatch(userWantsToChangeBirthday())}>
        {`${month.substr(0, 3)} ${day}, ${year}`}
      </Field>
      <Text>
        By signing up, you agree to the <a href="/">Terms of Service</a> and{" "}
        <a href="/">Privacy Policy</a>, including <a href="/">Cookie Use</a>.
        Others will be able to find you by email or phone number when provided・
        <a href="/">Privacy Options</a>
      </Text>
      <SignupButton onClick={handleSignupClick}>Sign up</SignupButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 540px;
  margin: auto;
`;

const Title = styled.h2`
  font-size: 23px;
`;

const Field = styled.div`
  display: flex;
  align-items: center;
  height: 58px;
  border-bottom: 2px solid black;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.greyBackground};
  margin-bottom: 20px;
  font-size: 19px;
  padding: 0 10px;
  cursor: text;
`;

const Text = styled.span`
  font-size: 15px;
  margin-top: 40px;
  margin-bottom: 20px;
`;

const SignupButton = styled(Button)`
  height: 47px;
`;
