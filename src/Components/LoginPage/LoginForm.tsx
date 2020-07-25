import React from "react";
import styled from "styled-components";
import { Button } from "Components";
import { InputBox } from "Components/InputBox/InputBox";

export function LoginForm() {
  return (
    <Wrapper>
      <div style={{ minWidth: 0 }}>
        <StyledInputBox title="Phone, email, or username" value="" />
      </div>
      <div style={{ minWidth: 0, position: "relative" }}>
        <StyledInputBox title="Password" value="" />
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

const StyledInputBox = styled(InputBox)`
  margin-right: 15px;
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
