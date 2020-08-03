import React from "react";
import styled from "styled-components";
import { DownArrow } from "assets/icons";

type PropTypes = { tweet: Tweet };

export function Header(props: PropTypes) {
  return (
    <Container>
      <User>
        <Username>{props.tweet.username}</Username>
        <UserHandle>@{props.tweet.handle}</UserHandle>
      </User>
      <DownArrowHover>
        <DownArrowIcon />
      </DownArrowHover>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const UserHandle = styled.span`
  color: ${({ theme }) => theme.colors.greyText};
`;

const Username = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;

const User = styled.span`
  &:hover {
    & > ${Username} {
      text-decoration: underline;
    }
  }
`;

const DownArrowHover = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 27px;
  width: 27px;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.blueHover};
  }
`;

const DownArrowIcon = styled(DownArrow)`
  color: ${({ theme }) => theme.colors.greyText};
  height: 15px;
`;
