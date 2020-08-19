import React, { useState } from "react";
import styled from "styled-components";
import { Avatar } from "Components/Avatar/Avatar";
import {
  DownArrow,
  CommentIcon,
  RetweetIcon,
  LikeIcon,
  ActionsIcon,
  LikeIconFilled,
  BoldRetweetIcon,
  BookmarksIcon,
} from "assets/icons";
import { useLikeInfo } from "utils/customHooks/useLikeInfo";
import moment from "moment";
import { useDispatch } from "react-redux";
import { clickedCommentButton } from "redux/slices/commentSlice";
import { RetweetDropdown } from "Components/Tweet/RetweetDropdown";
import { gql, useQuery, useMutation } from "@apollo/client";

export const SELF = gql`
  query Self {
    self {
      retweetParentIDs
      bookmarkIDs
    }
  }
`;

const ADD_REMOVE_BOOKMARK = gql`
  mutation addOrRemoveBookmark($tweetID: ID!) {
    addOrRemoveBookmark(tweetID: $tweetID) {
      id
      bookmarkIDs
    }
  }
`;

type PropTypes = {
  tweet: Tweet;
};

export function TopTweet(props: PropTypes) {
  const dispatch = useDispatch();

  const { handleLikeClick, liked, likeCount } = useLikeInfo(props.tweet);

  // local state
  const [retweetDropdown, setRetweetDropdown] = useState(false);

  // * GQL query to get logged in user's retweetIDs list
  const { data } = useQuery(SELF);

  // * GQL mutation to add tweet to user's bookmarkIDs list
  const [addOrRemoveBookmark] = useMutation(ADD_REMOVE_BOOKMARK, {
    variables: { tweetID: props.tweet.id },
    update: (store, { data }) => {
      store.writeFragment({
        id: `User:${data?.addOrRemoveBookmark.id}`,
        fragment: gql`
          fragment BookmarkIDs on User {
            bookmarkIDs
          }
        `,
        data: {
          bookmarkIDs: data?.addOrRemoveBookmark.bookmarkIDs,
        },
      });
    },
    refetchQueries: ["Bookmarks"],
  });

  const handleRetweetClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setRetweetDropdown(!retweetDropdown);
  };

  const handleBookmarkClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    addOrRemoveBookmark();
  };

  const formatDate = (date: Date) => {
    return moment(date).format("LT · MMM D, YYYY");
  };

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
      {props.tweet.images && props.tweet.images.length > 0 && (
        <ImageBox>
          <Image src={props.tweet.images[0]} alt="" />
        </ImageBox>
      )}
      <Date>{formatDate(props.tweet.date)}</Date>
      <RetweetsLikes>
        <Count>
          <BoldBlackText>{props.tweet.retweetIDs.length}</BoldBlackText> Retwats
        </Count>
        <Count>
          <BoldBlackText>{likeCount}</BoldBlackText> Likes
        </Count>
      </RetweetsLikes>
      <ButtonsArea>
        <IconHover onClick={() => dispatch(clickedCommentButton(props.tweet))}>
          <CommentIconSVG />
        </IconHover>
        <IconHover color="green" onClick={handleRetweetClick}>
          {retweetDropdown && <RetweetDropdown tweet={props.tweet} />}
          {data && data.self.retweetParentIDs.includes(props.tweet.id) ? (
            <BoldRetweetIconSVG />
          ) : (
            <RetweetIconSVG />
          )}
        </IconHover>
        <IconHover color="pink" onClick={handleLikeClick}>
          {liked ? <LikeIconFilledSVG /> : <LikeIconSVG />}
        </IconHover>
        <IconHover onClick={handleBookmarkClick}>
          <StyledBookmarkIcon
            filled={data && data.self.bookmarkIDs.includes(props.tweet.id)}
          />
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
  position: relative;
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

const LikeIconFilledSVG = styled(LikeIconFilled)`
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

const BoldRetweetIconSVG = styled(BoldRetweetIcon)`
  height: 23px;
  width: 23px;
`;

const ImageBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Image = styled.img`
  max-width: 500px;
  max-height: 300px;
  border-radius: 15px;
  margin-top: 10px;
`;

const StyledBookmarkIcon = styled(BookmarksIcon)`
  width: 23px;
  height: 23px;
  color: ${({ theme, filled }) => (filled ? theme.colors.blueMain : "inherit")};
`;
