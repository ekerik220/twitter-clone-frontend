import React, { useEffect } from "react";
import styled from "styled-components";
import { SearchBar } from "./SearchBar";
import { CategorySelector } from "./CategorySelector";
import { useSelector, useDispatch } from "react-redux";
import { TrendingCategoryArea } from "./TrendingCategoryArea";
import { SearchArea } from "./SearchArea";
import {
  leavingExploreScreen,
  enteringExploreScreen,
} from "redux/slices/exploreSlice";

export function Explore() {
  const dispatch = useDispatch();

  // redux state
  const currentCategory = useSelector(
    (state: RootState) => state.explore.currentCategory
  );

  // * Tell redux we're dismounting the explore screen so it can clean up the state
  useEffect(() => {
    dispatch(enteringExploreScreen());
    return () => {
      dispatch(leavingExploreScreen());
    };
  }, [dispatch]);

  return (
    <Container>
      <Header>
        <SearchBar />
        <CategorySelector />
      </Header>
      {currentCategory === "trending" && <TrendingCategoryArea />}
      {currentCategory === "search" && <SearchArea />}
    </Container>
  );
}

const Container = styled.div`
  max-width: 600px;
  width: 100%;
  min-height: 100%;
  border-left: 1px solid;
  border-right: 1px solid;
  border-color: ${({ theme }) => theme.colors.lightGrey};

  @media only screen and (min-width: 1000px) {
    min-width: 600px;
  }
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: calc(100% - 80px);
  max-width: 599px;
  border: ${({ theme }) => `1px solid ${theme.colors.lightGrey}`};
  border-top: none;
  position: fixed;
  z-index: 1;
`;
