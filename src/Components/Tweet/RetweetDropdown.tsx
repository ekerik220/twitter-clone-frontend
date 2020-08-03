import React from "react";
import styled from "styled-components";
import { RetweetIcon, PencilIcon } from "assets/icons";
import { gql, useMutation } from "@apollo/client";
import { tweetDetailsFragment } from "utils/fragments";

const ADD_RETWEET = gql`
  mutation AddRetweet($parentID: ID!) {
    addRetweet(parentID: $parentID) {
      ...tweetDetails
    }
  }
  ${tweetDetailsFragment}
`;

type PropTypes = { tweet: Tweet };

export function RetweetDropdown(props: PropTypes) {
  const [addRetweet] = useMutation(ADD_RETWEET, {
    variables: { parentID: props.tweet.retweetParent || props.tweet.id },
  });

  return (
    <>
      <Backdrop />
      <Container>
        <DropdownButton onClick={() => addRetweet()}>
          <RetweetIcon />
          <DropdownText>Retweet</DropdownText>
        </DropdownButton>
        <DropdownButton>
          <PencilIcon />
          <DropdownText>Retweet with comment</DropdownText>
        </DropdownButton>
      </Container>
    </>
  );
}

const Container = styled.div`
  position: absolute;
  width: 220px;
  height: 100px;
  right: 0;
  top: 0;
  background: white;
  border-radius: 5px;
  box-shadow: rgba(101, 119, 134, 0.2) 0px 0px 15px,
    rgba(101, 119, 134, 0.15) 0px 0px 3px 1px;
  z-index: 2;
`;

const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
`;
const DropdownButton = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  color: black;
  padding: 0 10px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.greyBackground};
  }
`;

const DropdownText = styled.span`
  margin-left: 10px;
`;
