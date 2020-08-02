import React from "react";
import styled from "styled-components";
import { Tweet } from "Components/Tweet/Tweet";
import { TopTweet } from "./TopTweet";
import { BackButton } from "Components/BackButton/BackButton";
import { useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { tweetDetailsFragment } from "utils/fragments";

export const GET_TWEET = gql`
  query GetTweet($id: ID!) {
    tweet(id: $id) {
      ...tweetDetails
      comments {
        ...tweetDetails
      }
    }
  }
  ${tweetDetailsFragment}
`;

export function CommentPage() {
  // The tweet we clicked on to get here is in history.location.state
  const history = useHistory<Tweet>();

  // The tweet in history is just a copy of the state it was in when we clicked on it
  // so we should use it's ID to get a version of it that will be sensitive to changes
  // ASAP by querying for it
  const { data } = useQuery(GET_TWEET, {
    variables: { id: history.location.state.id },
  });

  return (
    <Container>
      <Header>
        <StyledBackButton onClick={() => history.goBack()} />
        <span>Twat</span>
      </Header>
      <TweetArea>
        <TopTweet tweet={data?.tweet || history.location.state} />
        {data?.tweet.comments.map((tweet: Tweet) => (
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

const TweetArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  background-color: ${({ theme }) => theme.colors.lightGrey};
`;

const StyledBackButton = styled(BackButton)`
  margin-right: 20px;
`;
