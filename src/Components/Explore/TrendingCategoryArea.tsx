import React from "react";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import { TrendingCategory } from "./TrendingCategory";

const GET_TRENDING = gql`
  query GetTrending {
    trending {
      hashtag
      numOfTweets
    }
  }
`;

export function TrendingCategoryArea() {
  const { data, loading } = useQuery(GET_TRENDING);

  return (
    <Container>
      {loading
        ? "Loading..."
        : data.trending.map((trend: Trend, index: number) => {
            return (
              <TrendingCategory
                key={index}
                number={index + 1}
                hashtag={trend.hashtag}
                numOfTweets={trend.numOfTweets}
              />
            );
          })}
    </Container>
  );
}

const Container = styled.div`
  margin-top: 100px;
`;
