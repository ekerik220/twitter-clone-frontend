import React from "react";
import styled from "styled-components";

type PropTypes = {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
};

export function BackButton(props: PropTypes) {
  return (
    <Container className={props.className} onClick={props.onClick}>
      <SVGBackArrow fill="currentColor" viewBox="0 0 24 24">
        <g>
          <path d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"></path>
        </g>
      </SVGBackArrow>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 37px;
  width: 37px;
  border-radius: 50%;
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.blueHover};
  }
`;

const SVGBackArrow = styled.svg`
  color: ${({ theme }) => theme.colors.blueMain};
  width: 23px;
`;
