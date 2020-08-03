import React, { useState } from "react";
import styled from "styled-components";
import {
  CommentIcon,
  RetweetIcon,
  ActionsIcon,
  LikeIconFilled,
  LikeIcon,
  BoldRetweetIcon,
} from "assets/icons";
import { RetweetDropdown } from "./RetweetDropdown";
import { useDispatch } from "react-redux";
import { useLikeInfo } from "utils/customHooks/useLikeInfo";
import { clickedCommentButton } from "redux/slices/commentSlice";
import { gql, useQuery } from "@apollo/client";

export const SELF = gql`
  query Self {
    self {
      retweetParentIDs
    }
  }
`;

type PropTypes = { tweet: Tweet };

function ButtonsArea(props: PropTypes) {
  const dispatch = useDispatch();

  // local state
  const [retweetDropdown, setRetweetDropdown] = useState(false);

  // hook that gives us methods / state relating to the 'liked' state of the tweet
  const { handleLikeClick, liked, likeCount } = useLikeInfo(props.tweet);

  // * GQL query to get logged in user's retweetIDs list
  const { data } = useQuery(SELF);

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
        <Text>{props.tweet.commentIDs.length}</Text>
      </ButtonWrapper>
      <ButtonWrapper color="green" onClick={handleRetweetClick}>
        {retweetDropdown && <RetweetDropdown tweet={props.tweet} />}
        <IconHover>
          {data && data.self.retweetParentIDs.includes(props.tweet.id) ? (
            <BoldRetweetIcon />
          ) : (
            <RetweetIcon />
          )}
        </IconHover>
        <Text
          color={
            data && data.self.retweetParentIDs.includes(props.tweet.id)
              ? "green"
              : undefined
          }
        >
          {props.tweet.retweetIDs.length}
        </Text>
      </ButtonWrapper>
      <ButtonWrapper color="pink" onClick={handleLikeClick}>
        <IconHover>{liked ? <LikeIconFilled /> : <LikeIcon />}</IconHover>
        <Text color={liked ? "pink" : undefined}>{likeCount}</Text>
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

type TextProps = { color?: string };
const Text = styled.span<TextProps>`
  color: ${({ theme, color }) =>
    color === "green"
      ? theme.colors.greenText
      : color === "pink"
      ? theme.colors.pinkText
      : "black"};
`;
