import React from "react";
import styled from "styled-components";
import { SearchBar } from "Components/Explore/SearchBar";
import { TrendingSidebar } from "Components/DiscoverArea/TrendingSidebar";
import { useSelector } from "react-redux";
import { FollowSuggestions } from "./FollowSuggestions";

export function DiscoverArea() {
  // redux state
  const onExploreScreen = useSelector(
    (state: RootState) => state.explore.onExploreScreen
  );

  return (
    <Container>
      {!onExploreScreen && (
        <>
          <SearchBarContainer>
            <StyledSearchBar />
          </SearchBarContainer>
          <TrendingSidebar />
        </>
      )}
      <FollowSuggestions />
    </Container>
  );
}

const Container = styled.div`
  margin-left: 15px;
  width: 100%;
  display: none;
  flex-direction: column;

  @media only screen and (min-width: 1000px) {
    display: flex;
  }
`;

const SearchBarContainer = styled.div`
  background: white;
  height: 50px;
  position: fixed;
`;

const StyledSearchBar = styled(SearchBar)`
  width: 290px;
  padding: 0;

  @media only screen and (min-width: 1090px) {
    width: 350px;
  }
`;
