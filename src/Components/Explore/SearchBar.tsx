import React from "react";
import styled from "styled-components";
import { MagnifyingGlassIcon } from "assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { updatedSearchTerm } from "redux/slices/exploreSlice";
import { useHistory } from "react-router-dom";

type PropTypes = { className?: string };

export function SearchBar(props: PropTypes) {
  const dispatch = useDispatch();
  const history = useHistory();

  // redux state
  const searchTerm = useSelector(
    (state: RootState) => state.explore.searchTerm
  );

  const enterKeyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && history.location.pathname !== "/explore") {
      history.push("/explore");
    }
  };

  return (
    <Wrapper className={props.className}>
      <Container>
        <MagnifyingGlassIconSVG />
        <Input
          value={searchTerm}
          onChange={(e) => dispatch(updatedSearchTerm(e.target.value))}
          placeholder="Search Twatter"
          onKeyPress={enterKeyHandler}
        />
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 0 10px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 40px;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  margin-top: 10px;

  &:focus-within {
    background-color: white;
    border: 1px solid ${({ theme }) => theme.colors.blueMain};
    color: ${({ theme }) => theme.colors.blueMain};
  }
`;

const MagnifyingGlassIconSVG = styled(MagnifyingGlassIcon)`
  width: 40px;
  height: 19px;
`;

const Input = styled.input`
  width: 90%;
  color: black;
  outline-style: none;
  border: none;
  background-color: rgba(0, 0, 0, 0);
  padding: 5px;
`;
