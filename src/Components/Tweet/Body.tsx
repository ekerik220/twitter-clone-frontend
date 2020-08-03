import React from "react";
import styled from "styled-components";
import { RetweetBox } from "./RetweetBox";
import { useHistory } from "react-router-dom";

type PropTypes = { tweet: Tweet; parentTweet?: Tweet };

export function Body(props: PropTypes) {
  const history = useHistory();

  // * Click handler. Redirects to comments page for parent tweet
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    history.push("/comments", props.parentTweet);
  };

  return (
    <Container>
      <TweetBody>{props.tweet.body}</TweetBody>
      <ParentBody onClick={handleClick}>
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
