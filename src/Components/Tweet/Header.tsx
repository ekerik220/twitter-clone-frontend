import React, { useState } from "react";
import styled from "styled-components";
import { DownArrow } from "assets/icons";
import { TweetDropdown } from "./TweetDropdown";

type PropTypes = { tweet: Tweet };

export function Header(props: PropTypes) {
  // local state
  const [dropdown, setDropdown] = useState(false);

  const handleDownArrowClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setDropdown(!dropdown);
  };

  return (
    <Container>
      <User>
        <Username>{props.tweet.username}</Username>
        <UserHandle>@{props.tweet.handle}</UserHandle>
      </User>
      <DownArrowHover onClick={handleDownArrowClick}>
        {dropdown && <TweetDropdown tweet={props.tweet} />}
        <DownArrowIcon />
      </DownArrowHover>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 15px;
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
  position: relative;

  &:hover {
    background-color: ${({ theme }) => theme.colors.blueHover};
  }
`;

const DownArrowIcon = styled(DownArrow)`
  color: ${({ theme }) => theme.colors.greyText};
  height: 15px;
`;
