import React, { useState } from "react";
import styled from "styled-components";
import { Tooltip } from "./Tooltip";
import { UserInfo } from "./UserInfo";
import { tooltipWasOpened } from "redux/slices/globalUISlice";
import { useDispatch, useSelector } from "react-redux";

/**
 * Top level component for the user button in the side nav
 */
export function User() {
  const dispatch = useDispatch();

  // Redux state
  const tooltipOpen = useSelector(
    (state: RootState) => state.globalUI.tooltipOpen
  );

  return (
    <Tooltip visible={tooltipOpen}>
      <Container onClick={() => dispatch(tooltipWasOpened())}>
        <UserInfo />
      </Container>
    </Tooltip>
  );
}

const Container = styled.div`
  border-radius: 50px;
  transition: background-color 0.2s;
  position: relative;
  left: 6px;
  cursor: pointer;
  padding: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.blueHover};
  }

  @media only screen and (min-width: 1280px) {
    width: 240px;
    left: 0;
    top: 0;
  }
`;
