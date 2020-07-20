import React from "react";
import styled from "styled-components";

type PropTypes = {
  type?: string;
  title?: string;
  value?: string;
  maxLength?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  autoFocus?: boolean;
  className?: string;
};

export const InputBox = React.forwardRef<HTMLInputElement, PropTypes>(
  ({ error = false, ...props }, ref) => {
    return (
      <Wrapper className={props.className} error={error}>
        <label>
          <Title error={error}>{props.title}</Title>
          <Input
            error={error}
            value={props.value}
            onChange={props.onChange}
            maxLength={props.maxLength}
            type={props.type}
            ref={ref}
            spellCheck="false"
            autoFocus={props.autoFocus}
          />
        </label>
      </Wrapper>
    );
  }
);

type TitleProps = { error: boolean };
const Title = styled.span<TitleProps>`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme, error }) =>
    error ? theme.colors.errorRed : theme.colors.greyText};
  margin-left: 10px;
`;

type InputProps = { error: boolean };
const Input = styled.input<InputProps>`
  display: block;
  width: 100%;
  border: none;
  outline-style: none;
  background-color: ${({ theme }) => theme.colors.greyBackground};
  padding-top: 2px;
  padding-bottom: 5px;
  padding-left: 10px;
  font-size: 19px;
  font-family: ${({ theme }) => theme.inputFont};
  line-height: 1.3;
  border-bottom: 2px solid;
  border-color: ${({ theme, error }) =>
    error ? theme.colors.errorRed : "black"};
`;

type WrapperProps = { error: boolean };
const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.greyBackground};
  padding-top: 5px;
  font-size: 15px;

  &:focus-within {
    ${Input} {
      border-color: ${({ theme, error }) =>
        error ? theme.colors.errorRed : theme.colors.blueMain};
    }

    ${Title} {
      color: ${({ theme, error }) =>
        error ? theme.colors.errorRed : theme.colors.blueMain};
    }
  }
`;
