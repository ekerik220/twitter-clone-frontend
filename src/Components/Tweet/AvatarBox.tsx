import React from "react";
import styled from "styled-components";
import { Avatar } from "Components/Avatar/Avatar";

type PropTypes = { tweet: Tweet };

export function AvatarBox(props: PropTypes) {
  return (
    <Container>
      <Avatar width="50px" height="50px" url={props.tweet.avatar} />
    </Container>
  );
}

const Container = styled.div`
  margin-right: 10px;
`;
