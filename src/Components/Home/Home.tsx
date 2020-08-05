import React from "react";
import styled from "styled-components";
import { InputArea } from "./InputArea";
import { Tweet } from "Components/Tweet/Tweet";
import { gql, useQuery } from "@apollo/client";
import { tweetDetailsFragment } from "utils/fragments";

// query for logged in user's tweet list
export const GET_TWEETS = gql`
  query GetTweets($getRetweets: Boolean) {
    self {
      retweetParentIDs
      tweets(getRetweets: $getRetweets) {
        ...tweetDetails
      }
    }
  }
  ${tweetDetailsFragment}
`;

export function Home() {
  // * GQL query to get logged in user's tweet list
  const { data } = useQuery(GET_TWEETS, { variables: { getRetweets: true } });

  return (
    <Container>
      <Header>Home</Header>
      <TweetArea>
        <InputArea />
        {data?.self.tweets.map((tweet: Tweet) => (
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
  width: calc(100% - 95px);
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
