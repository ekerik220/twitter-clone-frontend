import React from "react";
import styled from "styled-components";
import { Avatar } from "Components/Avatar/Avatar";

type PropTypes = { tweet: Tweet; noInteract?: boolean };

export function RetweetBox(props: PropTypes) {
  return (
    <Container noInteract={props.noInteract}>
      <Header>
        <Avatar width="20px" height="20px" />
        <Username>{props.tweet.username}</Username>
        <UserHandle>@{props.tweet.handle}</UserHandle>
      </Header>
      <Body>{props.tweet.body}</Body>
    </Container>
  );
}

type ContainerProps = { noInteract?: boolean };
const Container = styled.div<ContainerProps>`
  border: 1px solid ${({ theme }) => theme.colors.greyBorder};
  border-radius: 15px;
  padding: 10px;
  margin-top: 5px;
  transition: background-color 0.2s;

  ${({ noInteract }) =>
    !noInteract &&
    `
  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }`}
`;

const Header = styled.div`
  display: flex;
`;

const UserHandle = styled.span`
  color: ${({ theme }) => theme.colors.greyText};
`;

const Username = styled.span`
  font-weight: bold;
  margin-right: 5px;
  margin-left: 5px;
`;

const Body = styled.div`
  margin-top: 5px;
  font-size: 15px;
`;
