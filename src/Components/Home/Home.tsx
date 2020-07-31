import React, { useState } from "react";
import styled from "styled-components";
import { InputArea } from "./InputArea";
import { Tweet } from "Components/Tweet/Tweet";
import { gql, useQuery } from "@apollo/client";

// query for logged in user's tweet list
const GET_TWEETS = gql`
  query GetTweets {
    self {
      tweets {
        username
        handle
        avatar
        date
        body
      }
    }
  }
`;

export function Home() {
  // Local state
  const [tweets, setTweets] = useState<Tweet[]>([]);

  // * GQL query to get logged in user's tweet list
  const { loading } = useQuery(GET_TWEETS, {
    onCompleted: (data) => {
      setTweets(data.self.tweets);
      //dispatch(loadedTweets(tweets));
    },
  });

  return (
    <Container>
      <Header>Home</Header>
      <TweetArea>
        <InputArea />
        {tweets.map((tweet) => (
          <Tweet tweet={tweet} />
        ))}
      </TweetArea>
    </Container>
  );
}

const Container = styled.div`
  max-width: 600px;
  width: 100%;

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
  max-width: 600px;
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
