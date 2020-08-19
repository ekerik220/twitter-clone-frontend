import React from "react";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import { TrendingCategory } from "./TrendingCategory";
import { LoadingIcon } from "assets/icons";

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
      {loading ? (
        <LoadingArea>
          <LoadingIcon />
        </LoadingArea>
      ) : (
        data.trending.map((trend: Trend, index: number) => {
          return (
            <TrendingCategory
              key={index}
              number={index + 1}
              hashtag={trend.hashtag}
              numOfTweets={trend.numOfTweets}
            />
          );
        })
      )}
    </Container>
  );
}

const Container = styled.div`
  margin-top: 100px;
`;

const LoadingArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;
