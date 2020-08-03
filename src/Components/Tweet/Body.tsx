import React from "react";
import styled from "styled-components";

type PropTypes = { tweet: Tweet };

export function Body(props: PropTypes) {
  return (
    <Container>
      <TweetBody>{props.tweet.body}</TweetBody>
      <ImageArea></ImageArea>
    </Container>
  );
}

const Container = styled.div``;

const TweetBody = styled.div`
  width: 100%;
`;

const ImageArea = styled.div``;
