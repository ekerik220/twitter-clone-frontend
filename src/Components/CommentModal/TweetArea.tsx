import React from "react";
import styled from "styled-components";
import { Avatar } from "Components/Avatar/Avatar";

type PropTypes = {
  tweet: Tweet;
};

export function TweetArea(props: PropTypes) {
  return (
    <Container>
      <AvatarBox>
        <Avatar width="50px" height="50px" url={props.tweet.avatar} />
      </AvatarBox>
      <ContentBox>
        <Header>
          <div>
            <Username>{props.tweet.username}</Username>
            <UserHandle>@{props.tweet.handle}</UserHandle>
          </div>
        </Header>
        <TweetBody>{props.tweet.body}</TweetBody>
        <ImageArea></ImageArea>
        <ReplyingTo>
          Replying to <BlueText>@{props.tweet.handle}</BlueText>
        </ReplyingTo>
      </ContentBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  background-color: white;
  padding: 10px;
  padding-bottom: 15px;
`;

const AvatarBox = styled.div`
  margin-right: 15px;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
`;

const UserHandle = styled.span`
  color: ${({ theme }) => theme.colors.greyText};
`;

const Username = styled.span`
  font-weight: bold;
`;

const TweetBody = styled.div`
  width: 100%;
`;

const ImageArea = styled.div``;

const ReplyingTo = styled.span`
  margin-top: 15px;
  color: ${({ theme }) => theme.colors.greyText};
  width: fit-content;
  cursor: pointer;
`;

const BlueText = styled.span`
  color: ${({ theme }) => theme.colors.blueMain};
`;
