import React from "react";
import styled from "styled-components";
import { RetweetIcon } from "assets/icons";
import { useSelector } from "react-redux";

type PropTypes = { tweet: Tweet };

export function Retweeted(props: PropTypes) {
  const userID = useSelector((state: RootState) => state.user.userID);

  return (
    <Container>
      <StyledRetweetIcon />
      <Text>
        {props.tweet.userID === userID ? "You" : `@${props.tweet.handle}`}{" "}
        Retweeted
      </Text>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.greyText};
  padding-left: 38px;
  width: fit-content;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledRetweetIcon = styled(RetweetIcon)`
  width: 13px;
  height: 13px;
`;

const Text = styled.span`
  margin-left: 8px;
  font-size: 13px;
`;
