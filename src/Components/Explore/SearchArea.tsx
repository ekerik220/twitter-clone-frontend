import React, { useEffect } from "react";
import styled from "styled-components";
import { gql, useLazyQuery } from "@apollo/client";
import { tweetDetailsFragment } from "utils/fragments";
import { useSelector } from "react-redux";
import { Tweet } from "Components/Tweet/Tweet";
import _ from "lodash";

const SEARCH = gql`
  query Search($term: String!) {
    search(term: $term) {
      ...tweetDetails
    }
  }
  ${tweetDetailsFragment}
`;

export function SearchArea() {
  // redux state
  const searchTerm = useSelector(
    (state: RootState) => state.explore.searchTerm
  );

  // * Query to get tweets that contain searchTerm in their body
  const [search, { data, loading }] = useLazyQuery(SEARCH);

  // * Debounced error checking on the email field to be used with handleEmailChange
  const debounceSearch = _.debounce((term: string) => {
    if (term.length > 0) search({ variables: { term: searchTerm } });
  }, 500);

  // * Watch for search request
  useEffect(() => {
    debounceSearch(searchTerm);
  }, [searchTerm, debounceSearch]);

  return (
    <Container>
      {loading && "Loading"}
      {data &&
        data.search.map((tweet: Tweet) => (
          <Tweet key={tweet.id} tweet={tweet} />
        ))}
    </Container>
  );
}

const Container = styled.div`
  margin-top: 100px;
`;
