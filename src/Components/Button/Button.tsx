import React from "react";
import styled, { css } from "styled-components";

type PropTypes = {
  variation?: "primary" | "outline";
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
};

export function Button({
  variation,
  children,
  disabled = false,
  onClick,
  className,
}: PropTypes) {
  return (
    <Wrapper
      onClick={onClick}
      variation={variation}
      className={className}
      disabled={disabled}
    >
      {children}
    </Wrapper>
  );
}

type WrapperProps = {
  variation?: string;
  disabled: boolean;
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
  opacity: ${({ disabled }) => (disabled ? "0.5" : "1")};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

  ${({ variation }) =>
    variation === "outline" ? outlineStyles : primaryStyles};
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
