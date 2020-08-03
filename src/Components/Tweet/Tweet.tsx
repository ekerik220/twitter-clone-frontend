import React, { useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Header } from "./Header";
import { Body } from "./Body";
import ButtonsArea from "./ButtonsArea";
import { AvatarBox } from "./AvatarBox";
import { Retweeted } from "./Retweeted";
import { gql, useLazyQuery } from "@apollo/client";
import { tweetDetailsFragment } from "utils/fragments";

const GET_TWEET = gql`
  query GetTweet($id: ID!) {
    tweet(id: $id) {
      ...tweetDetails
    }
  }
  ${tweetDetailsFragment}
`;

type PropTypes = {
  tweet: Tweet;
};

export function Tweet(props: PropTypes) {
  const history = useHistory();

  // * GQL query to get the parent of this tweet (if this tweet is a retweet)
  const [getParentTweet, { data, loading }] = useLazyQuery(GET_TWEET, {
    variables: { id: props.tweet.retweetParent },
  });

  // * Click handler. Redirects to comments page for this tweet.
  const handleClick = () => {
    const redirectTweet = data && !props.tweet.body ? data.tweet : props.tweet;
    history.push("/comments", redirectTweet);
  };

  // * If tweet is a retweet (has a parent), query for that parent tweet's info
  useEffect(() => {
    if (props.tweet.retweetParent) getParentTweet();
  }, [getParentTweet, props.tweet.retweetParent]);

  // * Don't show the tweet until we've loaded it's parent's info
  if (loading) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container onClick={handleClick}>
      {props.tweet.retweetParent && <Retweeted tweet={props.tweet} />}
      <TweetArea>
        <AvatarBox
          tweet={data && !props.tweet.body ? data.tweet : props.tweet}
        />
        <ContentBox>
          <Header
            tweet={data && !props.tweet.body ? data.tweet : props.tweet}
          />
          {props.tweet.replyingTo && (
            <ReplyingTo>
              Replying to <BlueText>@{props.tweet.replyingTo}</BlueText>
            </ReplyingTo>
          )}
          <Body tweet={props.tweet} parentTweet={data?.tweet} />
          <ButtonsArea
            tweet={data && !props.tweet.body ? data.tweet : props.tweet}
          />
        </ContentBox>
      </TweetArea>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100px;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.lightGrey};
  background-color: white;
  padding: 10px;
  padding-bottom: 0;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.greyBackground};
  }
`;

const TweetArea = styled.div`
  display: flex;
  width: 100%;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ReplyingTo = styled.span`
  font-size: 15px;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.colors.greyText};
  width: fit-content;
  cursor: pointer;
`;

const BlueText = styled.span`
  color: ${({ theme }) => theme.colors.blueMain};
`;
