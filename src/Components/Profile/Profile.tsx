import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { tweetDetailsFragment } from "utils/fragments";
import { BackButton } from "Components/BackButton/BackButton";
import { ProfileCard } from "./ProfileCard";
import { CategorySelector } from "./CategorySelector";
import { useSelector } from "react-redux";
import { Tweet } from "Components/Tweet/Tweet";
import { LoadingIcon } from "assets/icons";

export const GET_USER = gql`
  query GetUser($handle: String!) {
    getUserByHandle(handle: $handle) {
      id
      username
      handle
      bio
      avatar
      profileImg
      joinDate
      followingIDs
      followedByIDs
      tweets {
        ...tweetDetails
      }
      likedTweets {
        ...tweetDetails
      }
    }
  }
  ${tweetDetailsFragment}
`;

export function Profile() {
  const { handle } = useParams();
  const history = useHistory<User>();

  // local state
  const [tweets, setTweets] = useState<Tweet[]>([]);

  // redux state
  const currentCategory = useSelector(
    (state: RootState) => state.profile.currentCategory
  );

  // * Gets the profile data from the server
  const { data, loading } = useQuery(GET_USER, { variables: { handle } });

  // * Change which tweets are visible depending on the current category
  useEffect(() => {
    if (!data) return;
    let visibleTweets = [];

    if (currentCategory === "tweets") {
      visibleTweets = data.getUserByHandle.tweets;
    }

    if (currentCategory === "media") {
      visibleTweets = data.getUserByHandle.tweets.filter(
        (tweet: Tweet) => tweet.images && tweet.images.length > 0
      );
    }

    if (currentCategory === "likes") {
      visibleTweets = data.getUserByHandle.likedTweets;
    }

    setTweets(visibleTweets);
  }, [data, currentCategory]);

  if (loading) {
    return (
      <LoadingArea>
        <LoadingIcon />
      </LoadingArea>
    );
  }

  return (
    <Container>
      <Header>
        <StyledBackButton onClick={() => history.goBack()} />
        {data?.getUserByHandle.username}
      </Header>
      <ProfileCard />
      <CategorySelector />
      <TweetArea>
        {tweets.map((tweet: Tweet) => (
          <Tweet key={tweet.id} tweet={tweet} />
        ))}
      </TweetArea>
    </Container>
  );
}

const Container = styled.div`
  max-width: 600px;
  width: 100%;

  height: 100%;

  border-left: 1px solid;
  border-right: 1px solid;
  border-color: ${({ theme }) => theme.colors.lightGrey};

  @media only screen and (min-width: 1000px) {
    min-width: 600px;
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  background-color: white;
  font-size: 19px;
  width: inherit;
  max-width: 599px;
  height: 50px;
  font-weight: bold;
  border: ${({ theme }) => `1px solid ${theme.colors.lightGrey}`};
  border-top: none;
  padding: 0px 10px;
  cursor: pointer;
  position: fixed;
  z-index: 1;
`;

const StyledBackButton = styled(BackButton)`
  margin-right: 20px;
`;

const TweetArea = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.lightGrey};
`;

const LoadingArea = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
