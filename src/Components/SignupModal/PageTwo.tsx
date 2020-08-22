import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Checkbox } from "Components/Checkbox/Checkbox";
import {
  trackBrowsingWasChanged,
  currentPageIsValid,
} from "redux/slices/signupSlice";

/********************************
 * Page two of the sign up modal
 ********************************/
export function PageTwo() {
  const dispatch = useDispatch();

  // Redux state
  const checked = useSelector(
    (state: RootState) => state.signup.userInfo.trackBrowsing
  );

  // This page has no validation needs, so make sure
  // redux knows it's valid right away.
  useEffect(() => {
    dispatch(currentPageIsValid());
  });

  return (
    <Container>
      <Title>Customize your experience</Title>
      <Subtitle>Track where you see Twatter content across the web</Subtitle>
      <Label>
        <div>
          <Text>
            Twatter uses this data to personalize your experience. This web
            browsing history will never be stored with your name, email, or
            phone number.
          </Text>
        </div>
        <div>
          <Checkbox
            checked={checked}
            onChange={(e) =>
              dispatch(trackBrowsingWasChanged(e.target.checked))
            }
          />
        </div>
      </Label>
      <SubText>
        For more details about these settings, visit the{" "}
        <a href="/">Help Center</a>.
      </SubText>
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
  margin-top: 0;
  font-size: 23px;
`;

const Subtitle = styled.h4`
  font-size: 19px;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Text = styled.span`
  font-size: 15px;
`;

const SubText = styled(Text)`
  color: ${({ theme }) => theme.colors.greyText};
`;

const Label = styled.label`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 30px;
`;
