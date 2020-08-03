import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Header } from "./Header";
import { Body } from "./Body";
import ButtonsArea from "./ButtonsArea";
import { AvatarBox } from "./AvatarBox";

type PropTypes = {
  tweet: Tweet;
};

export function Tweet(props: PropTypes) {
  const history = useHistory();

  // * Click handler. Redirects to comments page for this tweet.
  const handleClick = () => {
    history.push("/comments", props.tweet);
  };

  return (
    <Container onClick={handleClick}>
      <AvatarBox tweet={props.tweet} />
      <ContentBox>
        <Header tweet={props.tweet} />
        {props.tweet.replyingTo && (
          <ReplyingTo>
            Replying to <BlueText>@{props.tweet.replyingTo}</BlueText>
          </ReplyingTo>
        )}
        <Body tweet={props.tweet} />
        <ButtonsArea tweet={props.tweet} />
      </ContentBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.lightGrey};
  background-color: white;
  padding: 10px;
  padding-bottom: 0;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.greyBackground};
  }
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ReplyingTo = styled.span`
  margin-top: -7px;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.colors.greyText};
  width: fit-content;
  cursor: pointer;
`;

const BlueText = styled.span`
  color: ${({ theme }) => theme.colors.blueMain};
`;
