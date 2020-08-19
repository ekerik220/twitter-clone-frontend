import React from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import { Tweet } from "Components/Tweet/Tweet";
import { tweetDetailsFragment } from "utils/fragments";
import { LoadingIcon } from "assets/icons";

const BOOKMARKS = gql`
  query Bookmarks {
    self {
      id
      bookmarks {
        ...tweetDetails
      }
    }
  }
  ${tweetDetailsFragment}
`;

export function Bookmarks() {
  const { data, loading } = useQuery(BOOKMARKS);

  return (
    <Container>
      <Header>Bookmarks</Header>
      <BookmarkedTweets>
        {loading && (
          <LoadingArea>
            <LoadingIcon />
          </LoadingArea>
        )}
        {data?.self.bookmarks.map((tweet: Tweet) => (
          <Tweet tweet={tweet} />
        ))}
      </BookmarkedTweets>
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

const BookmarkedTweets = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
`;

const LoadingArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
`;
