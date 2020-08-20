import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLazyQuery, gql } from "@apollo/client";
import styled from "styled-components";
import { InputBox } from "Components/InputBox/InputBox";
import { SelectBox } from "Components/SelectBox/SelectBox";
import {
  nameChanged,
  emailChanged,
  dayChanged,
  monthChanged,
  yearChanged,
  currentPageIsInvalid,
  currentPageIsValid,
} from "redux/slices/signupSlice";
import _ from "lodash";
import * as EmailValidator from "email-validator";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// [1..31]
const days = Array.from(Array(31), (_, i) => (i + 1).toString());

// array containing all years from current year to 100 years back
const currYear = new Date().getFullYear();
const years = Array.from(Array(101), (_, i) =>
  (i + currYear - 100).toString()
).reverse();

// Query to check if an email is taken already
const EMAIL_TAKEN = gql`
  query EmailTaken($email: String!) {
    emailTaken(email: $email)
  }
`;

/*********************************
 *  Page one of the sign up modal
 *********************************/
export function PageOne() {
  const dispatch = useDispatch();

  // * GQL queries
  const [emailTaken, { variables: email_variables }] = useLazyQuery(
    EMAIL_TAKEN,
    {
      onCompleted: (data) => {
        // Since there's a lag between requesting the check and getting
        // the results we have to also check if the email we requested
        // a check for is still the email that is currently inputted
        if (data.emailTaken === true && email_variables?.email === email)
          setEmailTakenError(true);
        else setWaitingForValidation(false);
      },
    }
  );

  // * Local state
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailTakenError, setEmailTakenError] = useState(false);
  const [waitingForValidation, setWaitingForValidation] = useState(true);

  // * Bring in form state from Redux
  const { name, email, day, month, year } = useSelector(
    (state: RootState) => state.signup.userInfo
  );
  const focusedField = useSelector(
    (state: RootState) => state.signup.focusedField
  );

  // * Refs for name, email, and month field so we can automatically
  // * focus them.
  const nameField = useRef<HTMLInputElement>(null);
  const emailField = useRef<HTMLInputElement>(null);
  const monthField = useRef<HTMLSelectElement>(null);

  // * If a focusedField is specified, automatically focus
  // * that field
  useEffect(() => {
    if (focusedField === "name") nameField.current?.focus();
    if (focusedField === "email") emailField.current?.focus();
    if (focusedField === "month") monthField.current?.focus();
  }, [focusedField]);

  // * Update redux state as the name input field changes + error checking.
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    value.length === 0 ? setNameError(true) : setNameError(false);
    dispatch(nameChanged(value));
  };

  // * Debounced error checking on the email field to be used with handleEmailChange
  const debouncedEmailErrorCheck = useCallback(
    _.debounce((email: string) => {
      // Invalid email
      if (!EmailValidator.validate(email)) return setEmailError(true);

      // Query server to see if it's taken...
      // The actual error checking will be handled by a useEffect
      emailTaken({ variables: { email } });
    }, 700),
    []
  );

  // * Update redux state as the email input field changes + error checking (debounced).
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // reset both error types to false as the user types
    setEmailError(false);
    setEmailTakenError(false);

    // we need to wait until the email is validated before letting the next
    // button be clickable...
    setWaitingForValidation(true);

    // Check for errors (valid email + not taken) debounced
    debouncedEmailErrorCheck(value);

    // Update the field (regardless of errors)
    dispatch(emailChanged(value));
  };

  // * Check if all the fields on this page of the form are valid
  // * and tell redux about it
  useEffect(() => {
    const fieldsNonEmpty = name && email && day && month && year;
    const noErrors = !nameError && !emailError && !emailTakenError;

    if (fieldsNonEmpty && noErrors && !waitingForValidation)
      dispatch(currentPageIsValid());
    else dispatch(currentPageIsInvalid());
  }, [
    name,
    email,
    day,
    month,
    year,
    nameError,
    emailError,
    emailTakenError,
    dispatch,
    waitingForValidation,
  ]);

  return (
    <Container>
      <Title>Create your account</Title>
      <InputBox
        title="Name"
        value={name}
        onChange={handleNameChange}
        maxLength={50}
        error={nameError}
        ref={nameField}
      />
      <Details>
        {nameError && <ErrorText>What's your name?</ErrorText>}
        <Counter>{`${name.length}/50`}</Counter>
      </Details>
      <InputBox
        title="Email"
        value={email}
        onChange={handleEmailChange}
        maxLength={80}
        error={emailError || emailTakenError}
        ref={emailField}
      />
      <Details>
        {emailError && <ErrorText>Please enter a valid email.</ErrorText>}
        {emailTakenError && (
          <ErrorText>Email has already been taken.</ErrorText>
        )}
      </Details>
      <Subtitle>Date of birth</Subtitle>
      <Subtext>
        This will not be shown publicly. Confirm your own age, even if this
        account is for a business, a pet, or something else.
      </Subtext>
      <DateWrapper>
        <MonthSelect
          title="Month"
          options={months}
          value={month}
          onChange={(e) => dispatch(monthChanged(e.target.value))}
          ref={monthField}
        />
        <DaySelect
          title="Day"
          options={days}
          value={day}
          onChange={(e) => dispatch(dayChanged(e.target.value))}
        />
        <YearSelect
          title="Year"
          options={years}
          value={year}
          onChange={(e) => dispatch(yearChanged(e.target.value))}
        />
      </DateWrapper>
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

const Details = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.greyText};
  padding: 4px 0;
`;

const Subtitle = styled.h4`
  margin-top: 20px;
  margin-bottom: 0;
`;

const Subtext = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.greyText};
`;

const Counter = styled(Subtext)`
  grid-column-start: 2;
  justify-self: flex-end;
`;

const ErrorText = styled(Subtext)`
  color: ${({ theme }) => theme.colors.errorRed};
`;

const DateWrapper = styled.div`
  display: flex;
  margin: 20px 0;
`;

const MonthSelect = styled(SelectBox)`
  margin-right: 10px;
  width: 45%;
`;

const DaySelect = styled(SelectBox)`
  margin-right: 10px;
  width: 25%;
`;

const YearSelect = styled(SelectBox)`
  width: 30%;
`;
