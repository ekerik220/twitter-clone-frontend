import React from "react";
import styled from "styled-components";

type PropTypes = {
  title: string;
  value: string;
  className?: string;
};

export function InputBox(props: PropTypes) {
  return (
    <Wrapper className={props.className}>
      <span>{props.title}</span>
      <input value={props.value} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.greyBackground};
  padding: 5px 10px 0;
  border-bottom: 3px solid black;
  font-size: 15px;

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${({ theme }) => theme.colors.greyText};
  }

  input {
    border: none;
    outline-style: none;
    background-color: ${({ theme }) => theme.colors.greyBackground};
    padding-top: 2px;
    padding-bottom: 5px;
    font-size: 19px;
    font-family: ${({ theme }) => theme.inputFont};
    line-height: 1.3;
  }

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.blueMain};

    span {
      color: ${({ theme }) => theme.colors.blueMain};
    }
  }
`;
