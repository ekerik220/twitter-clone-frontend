import React from "react";
import styled from "styled-components";
import { CrossIcon } from "assets/icons";
import { useDispatch } from "react-redux";
import { closedRetweetModal } from "redux/slices/retweetSlice";
import { InputArea } from "./InputArea";

export function RetweetWithCommentModal() {
  const dispatch = useDispatch();

  return (
    <>
      <Backdrop onClick={() => dispatch(closedRetweetModal())}></Backdrop>
      <Modal>
        <Header>
          <IconHover onClick={() => dispatch(closedRetweetModal())}>
            <CrossIcon />
          </IconHover>
        </Header>
        <InputArea />
      </Modal>
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

const Modal = styled.div`
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
