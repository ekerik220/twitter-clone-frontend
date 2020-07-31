import React from "react";
import styled from "styled-components";
import { Avatar } from "Components/Avatar/Avatar";
import {
  DownArrow,
  CommentIcon,
  RetweetIcon,
  LikeIcon,
  ActionsIcon,
} from "assets/icons";

type PropTypes = {
  tweet: Tweet;
};

export function TopTweet(props: PropTypes) {
  return (
    <Container>
      <ReasonArea></ReasonArea>
      <UserArea>
        <UserWrap>
          <Avatar width="50px" height="50px" url={props.tweet.avatar} />
          <UserInfo>
            <UserName>{props.tweet.username}</UserName>
            <UserHandle>@{props.tweet.handle}</UserHandle>
          </UserInfo>
        </UserWrap>
        <DownArrowHover>
          <DownArrowIcon />
        </DownArrowHover>
      </UserArea>
      <Body>{props.tweet.body}</Body>
      <Date>4:25 PM · Jul 28, 2020</Date>
      <RetweetsLikes>
        <Count>
          <BoldBlackText>100</BoldBlackText> Retwats
        </Count>
        <Count>
          <BoldBlackText>100</BoldBlackText> Likes
        </Count>
      </RetweetsLikes>
      <ButtonsArea>
        <IconHover>
          <CommentIconSVG />
        </IconHover>
        <IconHover color="green">
          <RetweetIconSVG />
        </IconHover>
        <IconHover color="pink">
          <LikeIconSVG />
        </IconHover>
        <IconHover>
          <ActionsIconSVG />
        </IconHover>
      </ButtonsArea>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.lightGrey};
  background-color: white;
  padding: 10px;
  padding-bottom: 0;
`;

const ReasonArea = styled.div``;

const UserArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

const UserWrap = styled.div`
  display: flex;
  cursor: pointer;
`;

const UserName = styled.span`
  font-weight: bold;
`;

const UserHandle = styled.span`
  color: ${({ theme }) => theme.colors.greyText};
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;

  &:hover {
    & > ${UserName} {
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
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.blueHover};
  }
`;

const DownArrowIcon = styled(DownArrow)`
  width: 15px;
  color: ${({ theme }) => theme.colors.greyText};
`;

const Body = styled.div`
  margin-top: 7px;
`;

const Date = styled.div`
  margin-top: 7px;
  color: ${({ theme }) => theme.colors.greyText};
`;

const RetweetsLikes = styled.div`
  max-width: 570px;
  width: 100%;
  padding: 15px 5px;
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.colors.lightGrey};
  margin-top: 10px;
`;

const Count = styled.span`
  color: ${({ theme }) => theme.colors.greyText};
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const BoldBlackText = styled.span`
  color: black;
  font-weight: bold;
`;

const ButtonsArea = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  color: ${({ theme }) => theme.colors.greyText};
  padding: 5px;
`;

type IconHoverProps = { color?: string };
const IconHover = styled.div<IconHoverProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  transition: background-color 0.2s, color 0.2s;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme, color }) =>
      color === "green"
        ? theme.colors.greenHover
        : color === "pink"
        ? theme.colors.pinkHover
        : theme.colors.blueHover};
    color: ${({ theme, color }) =>
      color === "green"
        ? theme.colors.greenText
        : color === "pink"
        ? theme.colors.pinkText
        : theme.colors.blueMain};
  }
`;

const CommentIconSVG = styled(CommentIcon)`
  height: 23px;
  width: 23px;
`;

const LikeIconSVG = styled(LikeIcon)`
  height: 23px;
  width: 23px;
`;

const RetweetIconSVG = styled(RetweetIcon)`
  height: 23px;
  width: 23px;
`;

const ActionsIconSVG = styled(ActionsIcon)`
  height: 23px;
  width: 23px;
`;
