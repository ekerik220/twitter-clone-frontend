import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { gql, useLazyQuery } from "@apollo/client";
import { tweetDetailsFragment } from "utils/fragments";
import { useSelector } from "react-redux";
import { Tweet } from "Components/Tweet/Tweet";
import _ from "lodash";
import { LoadingIcon } from "assets/icons";

const SEARCH = gql`
  query Search($term: String!) {
    search(term: $term) {
      ...tweetDetails
    }
  }
  ${tweetDetailsFragment}
`;

export function SearchArea() {
  // local state
  const [tweets, setTweets] = useState<Tweet[]>();

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

  // * Filter tweets
  useEffect(() => {
    if (data) {
      const filteredTweets = data.search.filter((tweet: Tweet) => {
        // filter out retweets with no added content
        if (tweet.retweetParent && !tweet.body) return false;
        // filter out tweets that are repyling to someone
        if (tweet.replyingTo) return false;
        // keep anything else
        return true;
      });

      setTweets(filteredTweets);
    }
  }, [data]);

  return (
    <Container>
      {loading && (
        <LoadingArea>
          <LoadingIcon />
        </LoadingArea>
      )}
      {data &&
        tweets?.map((tweet: Tweet) => <Tweet key={tweet.id} tweet={tweet} />)}
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
