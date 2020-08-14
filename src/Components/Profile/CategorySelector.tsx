import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  clickedTweetsButton,
  clickedMediaButton,
  clickedLikesButton,
} from "redux/slices/profileSlice";

export function CategorySelector() {
  const dispatch = useDispatch();

  // redux state
  const currentCategory = useSelector(
    (state: RootState) => state.profile.currentCategory
  );

  return (
    <Container>
      <Category
        selected={currentCategory === "tweets"}
        onClick={() => dispatch(clickedTweetsButton())}
      >
        Tweets
      </Category>
      <Category
        selected={currentCategory === "media"}
        onClick={() => dispatch(clickedMediaButton())}
      >
        Media
      </Category>
      <Category
        selected={currentCategory === "likes"}
        onClick={() => dispatch(clickedLikesButton())}
      >
        Likes
      </Category>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;

type CategoryProps = { selected: boolean };
const Category = styled.div<CategoryProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-weight: bold;
  padding: 15px;
  cursor: pointer;
  user-select: none;
  font-size: 15px;
  transition: background-color 0.2s;
  color: ${({ theme, selected }) =>
    selected ? theme.colors.blueMain : theme.colors.greyText};
  border-bottom: ${({ selected }) => selected && "2px solid"};
  border-color: ${({ theme }) => theme.colors.blueMain};

  &:hover {
    background-color: ${({ theme }) => theme.colors.blueHover};
    color: ${({ theme }) => theme.colors.blueMain};
  }
`;
