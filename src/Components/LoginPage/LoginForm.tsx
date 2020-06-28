import React from "react";
import styled from "styled-components";
import { Button } from "Components";

export function LoginForm() {
  return (
    <Wrapper>
      <div style={{ minWidth: 0 }}>
        <InputBox>
          <span>Phone, email, or username</span>
          <input name="username" id="" />
        </InputBox>
      </div>
      <div style={{ minWidth: 0, position: "relative" }}>
        <InputBox style={{ position: "relative" }}>
          <span>Password</span>
          <input />
        </InputBox>
        <ForgotPasswordLink>Forgot password?</ForgotPasswordLink>
      </div>
      <LoginButtonBox>
        <Button variation="outline">Log in</Button>
      </LoginButtonBox>
    </Wrapper>
  );
}

const Wrapper = styled.form`
  display: flex;
  min-width: 0;
  top: 15px;
  height: 60px;
`;

const InputBox = styled.label`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.greyBackground};
  padding: 5px 10px 0;
  border-bottom: 1.5px solid black;
  max-width: 210px;
  min-width: 0;
  font-size: 15px;
  margin-right: 15px;

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

const ForgotPasswordLink = styled.a`
  position: absolute;
  color: ${({ theme }) => theme.colors.blueMain};
  bottom: -25px;
  left: 8px;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginButtonBox = styled.div`
  width: 78px;
  min-width: 78px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
