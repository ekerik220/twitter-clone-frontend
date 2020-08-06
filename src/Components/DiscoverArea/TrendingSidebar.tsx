import React from "react";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import { TrendingCategory } from "Components/Explore/TrendingCategory";
import { useHistory } from "react-router-dom";

const GET_TRENDING = gql`
  query GetTrending {
    trending {
      hashtag
      numOfTweets
    }
  }
`;

export function TrendingSidebar() {
  const history = useHistory();

  // * GQL query to get the top trending hashtags
  const { data } = useQuery(GET_TRENDING);

  return (
    <Container>
      <Header>Trending</Header>
      {data &&
        data.trending
          .slice(0, 3)
          .map((trend: Trend, index: number) => (
            <TrendingCategory
              key={index}
              number={index + 1}
              hashtag={trend.hashtag}
              numOfTweets={trend.numOfTweets}
            />
          ))}
      <Footer onClick={() => history.push("/explore")}>Show more</Footer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 290px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.greyBackground};
  overflow: hidden;
  margin-top: 50px;

  @media only screen and (min-width: 1090px) {
    width: 350px;
  }
`;

const Header = styled.div`
  font-weight: bold;
  font-size: 19px;
  padding: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.greyBorder};
`;

const Footer = styled.div`
  cursor: pointer;
  padding: 15px;
  color: ${({ theme }) => theme.colors.blueMain};
  font-size: 15px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.greyHover};
  }
`;
