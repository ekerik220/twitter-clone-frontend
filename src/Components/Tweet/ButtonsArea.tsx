import React, { useState } from "react";
import styled from "styled-components";
import {
  CommentIcon,
  RetweetIcon,
  ActionsIcon,
  LikeIconFilled,
  LikeIcon,
} from "assets/icons";
import { RetweetDropdown } from "./RetweetDropdown";
import { useDispatch } from "react-redux";
import { useLikeInfo } from "utils/customHooks/useLikeInfo";
import { clickedCommentButton } from "redux/slices/commentSlice";

type PropTypes = { tweet: Tweet };

function ButtonsArea(props: PropTypes) {
  const dispatch = useDispatch();

  // local state
  const [retweetDropdown, setRetweetDropdown] = useState(false);

  // hook that gives us methods / state relating to the 'liked' state of the tweet
  const { handleLikeClick, liked, likeCount } = useLikeInfo(props.tweet);

  // * Click handler for comment button
  const handleCommentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    dispatch(clickedCommentButton(props.tweet));
  };

  // * Click handler for retweet button
  const handleRetweetClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setRetweetDropdown(!retweetDropdown);
  };

  return (
    <Container>
      <ButtonWrapper onClick={handleCommentClick}>
        <IconHover>
          <CommentIcon />
        </IconHover>
        <span>{props.tweet.commentIDs.length}</span>
      </ButtonWrapper>
      <ButtonWrapper color="green" onClick={handleRetweetClick}>
        {retweetDropdown && <RetweetDropdown tweet={props.tweet} />}
        <IconHover>
          <RetweetIcon />
        </IconHover>
        <span>100</span>
      </ButtonWrapper>
      <ButtonWrapper color="pink" onClick={handleLikeClick}>
        <IconHover>{liked ? <LikeIconFilled /> : <LikeIcon />}</IconHover>
        <span>{likeCount}</span>
      </ButtonWrapper>
      <ButtonWrapper>
        <IconHover>
          <ActionsIcon />
        </IconHover>
      </ButtonWrapper>
    </Container>
  );
}

export default ButtonsArea;

const IconHover = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  transition: background-color 0.2s;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 425px;
  margin-top: 10px;
`;

const ButtonWrapper = styled.div.attrs({ role: "button" })`
  display: flex;
  position: relative;
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
