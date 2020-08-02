import React from "react";
import styled from "styled-components";
import { InputArea } from "./InputArea";
import { useSelector, useDispatch } from "react-redux";
import { TweetArea } from "./TweetArea";
import { CrossIcon } from "assets/icons";
import { closedCommentModal } from "redux/slices/commentSlice";

export function CommentModal() {
  const dispatch = useDispatch();

  // redux state
  const tweet = useSelector((state: RootState) => state.comment.tweet) as Tweet;

  return (
    <>
      <Backdrop onClick={() => dispatch(closedCommentModal())}></Backdrop>
      <Container>
        <Header>
          <IconHover onClick={() => dispatch(closedCommentModal())}>
            <CrossIcon />
          </IconHover>
        </Header>

        <ContentAreaWrapper>
          <ContentArea>
            <TweetArea tweet={tweet} />
            <InputArea />
          </ContentArea>
        </ContentAreaWrapper>
      </Container>
    </>
  );
}

const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  background: ${({ theme }) => theme.colors.modalBackground};
  z-index: 1;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 50%;
  top: 5%;
  transform: translate(-50%);
  border-radius: 15px;
  background-color: white;
  max-width: 600px;
  width: 100%;
  max-height: 90%;
  z-index: 2;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  height: 53px;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.colors.greyBorder};
  padding: 0 15px;
`;

const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  border-radius: 15px;
`;

const IconHover = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 37px;
  width: 37px;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.blueMain};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.blueHover};
  }
`;

// Wrap the content area to keep the bottom-right corner rounded
// even when we have a scroll bar (normally scroll bar will make
// the corner squared off).
const ContentAreaWrapper = styled.div`
  height: 100%;
  overflow: hidden;
  border-bottom-right-radius: 15px;
`;
