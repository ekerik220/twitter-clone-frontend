import React from "react";
import styled, { css } from "styled-components";

type PropTypes = {
  variation?: "primary" | "outline";
  children?: React.ReactNode;
  className?: string;
};

export function Button(props: PropTypes) {
  return (
    <Wrapper variation={props.variation} className={props.className}>
      {props.children}
    </Wrapper>
  );
}

type WrapperProps = {
  variation?: string;
};
const Wrapper = styled.a.attrs({ role: "button" })<WrapperProps>`
  align-items: center;
  border-radius: 100px;
  cursor: pointer;
  display: flex;
  font-size: 15px;
  font-weight: bold;
  justify-content: center;
  height: 39px;
  transition: background-color 0.2s;
  user-select: none;

  ${({ variation }) =>
    variation === "outline" ? outlineStyles : primaryStyles}
`;

const primaryStyles = css`
  background-color: ${({ theme }) => theme.colors.blueMain};
  color: white;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryButtonHover};
  }
`;

const outlineStyles = css`
  border: ${({ theme }) => `1px solid ${theme.colors.blueMain}`};
  color: ${({ theme }) => theme.colors.blueMain};

  &:hover {
    background-color: ${({ theme }) => theme.colors.outlineButtonHover};
  }
`;
