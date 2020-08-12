import React, { useState } from "react";
import styled from "styled-components";
import { MagnifyingGlassIcon } from "assets/icons";
import { User } from "./User";
import _ from "lodash";
import { gql, useLazyQuery } from "@apollo/client";
import { useSelector } from "react-redux";

const SEARCH_USERS = gql`
  query SearchUsers($term: String!, $listID: ID!) {
    searchUsers(term: $term) {
      id
      username
      handle
      avatar
    }
    getList(id: $listID) {
      id
      users {
        id
        username
        handle
        avatar
      }
    }
  }
`;

export function PageTwoSuggested() {
  // local state
  const [showResults, setShowResults] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  // redux state
  const listID = useSelector((state: RootState) => state.listModal.listID);

  // * GQL lazy query to search for users with a search term somewhere in their name/handle
  const [searchUsers, { data, loading }] = useLazyQuery(SEARCH_USERS, {
    onCompleted: () => {
      setShowResults(true);
    },
  });

  // * Debounced function to call the search query
  const debouncedSearch = _.debounce((searchTerm) => {
    if (searchTerm.length > 0) {
      searchUsers({ variables: { term: searchTerm, listID } });
    }
  }, 500);

  // * Fire when search input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowResults(false);
    setSearchInput(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <Container>
      <SearchBar>
        <StyledMagnifyingGlassIcon />
        <Input
          placeholder="Search people"
          value={searchInput}
          onChange={handleInputChange}
        />
      </SearchBar>
      {loading && "Loading..."}
      {showResults &&
        searchInput.length > 0 &&
        data?.searchUsers.map((user: User) => {
          const userIDs = data.getList.users.map((user: User) => user.id);
          if (userIDs.includes(user.id)) return null;
          return <User key={user.id} user={user} />;
        })}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.lightGrey};

  &:focus-within {
    color: ${({ theme }) => theme.colors.blueMain};
  }
`;

const StyledMagnifyingGlassIcon = styled(MagnifyingGlassIcon)`
  height: 19px;
  width: 40px;
`;

const Input = styled.input`
  width: 90%;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  border: none;
  outline: none;
  color: black;
  padding: 8px 0;
`;
