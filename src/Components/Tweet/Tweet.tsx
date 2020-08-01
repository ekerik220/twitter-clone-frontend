import React from "react";
import styled from "styled-components";
import { Avatar } from "Components/Avatar/Avatar";
import { DownArrow, LikeIconFilled } from "assets/icons";
import { CommentIcon } from "assets/icons/CommentIcon";
import { LikeIcon } from "assets/icons/LikeIcon";
import { RetweetIcon } from "assets/icons/RetweetIcon";
import { ActionsIcon } from "assets/icons/ActionsIcon";
import { useHistory } from "react-router-dom";
import { useLikeInfo } from "utils/customHooks/useLikeInfo";

type PropTypes = {
  tweet: Tweet;
};

export function Tweet(props: PropTypes) {
  const history = useHistory();

  // hook that gives us methods / state relating to the 'liked' state of the tweet
  const { handleLikeClick, liked, likeCount } = useLikeInfo(props.tweet);

  // * Click handler. Redirects to comments page for this tweet.
  const handleClick = () => {
    history.push("/comments", props.tweet);
  };

  return (
    <Container onClick={handleClick}>
      <AvatarBox>
        <Avatar width="50px" height="50px" url={props.tweet.avatar} />
      </AvatarBox>
      <ContentBox>
        <Header>
          <User>
            <Username>{props.tweet.username}</Username>
            <UserHandle>@{props.tweet.handle}</UserHandle>
          </User>
          <DownArrowHover>
            <DownArrowIcon />
          </DownArrowHover>
        </Header>
        <TweetBody>{props.tweet.body}</TweetBody>
        <ImageArea></ImageArea>
        <ButtonsArea>
          <ButtonWrapper>
            <IconHover>
              <CommentIcon />
            </IconHover>
            <span>100</span>
          </ButtonWrapper>
          <ButtonWrapper color="green">
            <IconHover>
              <RetweetIcon />
            </IconHover>
            <span>100</span>
          </ButtonWrapper>
          <ButtonWrapper color="pink">
            <IconHover onClick={handleLikeClick}>
              {liked ? <LikeIconFilled /> : <LikeIcon />}
            </IconHover>
            <span>{likeCount}</span>
          </ButtonWrapper>
          <ButtonWrapper>
            <IconHover>
              <ActionsIcon />
            </IconHover>
          </ButtonWrapper>
        </ButtonsArea>
      </ContentBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.lightGrey};
  background-color: white;
  padding: 10px;
  padding-bottom: 0;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.greyBackground};
  }
`;

const AvatarBox = styled.div`
  margin-right: 10px;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const UserHandle = styled.span`
  color: ${({ theme }) => theme.colors.greyText};
`;

const Username = styled.span`
  font-weight: bold;
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

const TweetBody = styled.div`
  width: 100%;
`;

const IconHover = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  transition: background-color 0.2s;
`;

const ImageArea = styled.div``;

const ButtonsArea = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 425px;
  margin-top: 10px;
`;

type ButtonWrapperProps = { color?: string };
const ButtonWrapper = styled.div.attrs({ role: "button" })`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.greyText};
  transition: color 0.2s;
  width: fit-content;

  &:hover {
    & > ${IconHover} {
      background-color: ${({ theme, color }) =>
        color === "green"
          ? theme.colors.greenHover
          : color === "pink"
          ? theme.colors.pinkHover
          : theme.colors.blueHover};
    }

    color: ${({ theme, color }) =>
      color === "green"
        ? theme.colors.greenText
        : color === "pink"
        ? theme.colors.pinkText
        : theme.colors.blueMain};
  }
`;
