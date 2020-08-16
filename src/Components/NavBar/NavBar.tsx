import React from "react";
import styled from "styled-components";
import { Button } from "Components/Button/Button";
import { NavList } from "./NavList";
import { TwitterBird } from "assets/icons";
import { User } from "./User";
import { useDispatch } from "react-redux";
import { clickedTweetButton } from "redux/slices/tweetModalSlice";

/**
 * Side nav bar top level component
 */
export function NavBar() {
  const dispatch = useDispatch();

  return (
    <Container>
      <Nav>
        <TwitterBirdHoverWrap>
          <TwitterBirdSVG />
        </TwitterBirdHoverWrap>
        <NavList />
        <StyledButton
          onClick={() => dispatch(clickedTweetButton())}
        ></StyledButton>
        <User />
      </Nav>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: flex-end;
  flex-direction: column;
  width: 80px;
  background: white;

  @media only screen and (min-width: 1280px) {
    min-width: 300px;
  }
`;

const TwitterBirdHoverWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0 10px 0;
  min-height: 47px;
  height: 47px;
  width: 47px;
  border-radius: 50%;
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.blueHover};
  }
`;

const TwitterBirdSVG = styled(TwitterBird)`
  height: 30px;
  width: 47px;
  color: ${({ theme }) => theme.colors.blueMain};
`;

const Nav = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
  align-items: flex-end;
  padding-left: 10px;
  padding-right: 10px;
  z-index: 1;

  @media only screen and (min-width: 1280px) {
    align-items: flex-start;
    margin-right: 0;
  }
`;

const StyledButton = styled(Button)`
  width: 47px;
  min-height: 47px;
  margin-top: 15px;
  margin-bottom: auto;

  &:before {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='22px' height='22px' fill='white'%3E%3Cg%3E%3Cpath d='M8.8 7.2H5.6V3.9c0-.4-.3-.8-.8-.8s-.7.4-.7.8v3.3H.8c-.4 0-.8.3-.8.8s.3.8.8.8h3.3v3.3c0 .4.3.8.8.8s.8-.3.8-.8V8.7H9c.4 0 .8-.3.8-.8s-.5-.7-1-.7zm15-4.9v-.1h-.1c-.1 0-9.2 1.2-14.4 11.7-3.8 7.6-3.6 9.9-3.3 9.9.3.1 3.4-6.5 6.7-9.2 5.2-1.1 6.6-3.6 6.6-3.6s-1.5.2-2.1.2c-.8 0-1.4-.2-1.7-.3 1.3-1.2 2.4-1.5 3.5-1.7.9-.2 1.8-.4 3-1.2 2.2-1.6 1.9-5.5 1.8-5.7z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
  }

  @media only screen and (min-width: 1280px) {
    width: calc(100% - 25px);

    &:before {
      content: "Twat";
    }
  }
`;
