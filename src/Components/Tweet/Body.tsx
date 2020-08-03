import React from "react";
import styled from "styled-components";
import { RetweetBox } from "./RetweetBox";

type PropTypes = { tweet: Tweet; parentTweet?: Tweet };

export function Body(props: PropTypes) {
  return (
    <Container>
      <TweetBody>{props.tweet.body}</TweetBody>
      <ParentBody>
        {props.tweet.body && props.parentTweet ? (
          <RetweetBox tweet={props.parentTweet} />
        ) : (
          props.parentTweet?.body
        )}
      </ParentBody>
      <ImageArea></ImageArea>
    </Container>
  );
}

const Container = styled.div``;

const TweetBody = styled.div`
  width: 100%;
`;

const ParentBody = styled.div``;

const ImageArea = styled.div``;
