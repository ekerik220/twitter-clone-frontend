import React from "react";
import styled from "styled-components";

export function Messages() {
  return <Container>Work in progress</Container>;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  width: 100%;
  min-height: 100%;
  border-left: 1px solid;
  border-right: 1px solid;
  border-color: ${({ theme }) => theme.colors.lightGrey};

  font-size: 19px;

  @media only screen and (min-width: 1000px) {
    min-width: 600px;
  }
`;
