import React, { useLayoutEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  clickedMembersButton,
  clickedSuggestedButton,
} from "redux/slices/listModalSlice";

export function CategorySelector() {
  const dispatch = useDispatch();

  // redux state
  const currentCategory = useSelector(
    (state: RootState) => state.listModal.pageTwoCategory
  );
  const editMode = useSelector((state: RootState) => state.listModal.editMode);

  // * If we are in edit mode, immediately start us on the members tab
  useLayoutEffect(() => {
    if (editMode) dispatch(clickedMembersButton());
  }, [dispatch, editMode]);

  return (
    <Container>
      <Category
        selected={currentCategory === "members"}
        onClick={() => dispatch(clickedMembersButton())}
      >
        Members (0)
      </Category>
      <Category
        selected={currentCategory === "suggested"}
        onClick={() => dispatch(clickedSuggestedButton())}
      >
        Suggested
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
