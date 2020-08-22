import React from "react";
import styled from "styled-components";
import { CrossIcon } from "assets/icons";
import { Button } from "Components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { CategorySelector } from "./CategorySelector";
import { PageTwoSuggested } from "./PageTwoSuggested";
import { PageTwoMembers } from "./PageTwoMembers";
import { closedListModal } from "redux/slices/listModalSlice";

export function PageTwo() {
  const dispatch = useDispatch();

  // redux state
  const category = useSelector(
    (state: RootState) => state.listModal.pageTwoCategory
  );

  return (
    <>
      <Backdrop></Backdrop>
      <Container>
        <Header>
          <HeaderTop>
            <IconHover onClick={() => dispatch(closedListModal())}>
              <CrossIcon />
            </IconHover>
            <Title>Add to your list</Title>
            <StyledButton onClick={() => dispatch(closedListModal())}>
              Done
            </StyledButton>
          </HeaderTop>
          <CategorySelector />
        </Header>
        <ContentAreaWrapper>
          <ContentArea>
            {category === "suggested" && <PageTwoSuggested />}
            {category === "members" && <PageTwoMembers />}
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
  height: 90%;
  z-index: 2;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.colors.greyBorder};
`;

const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  height: 53px;
  padding: 0 15px;
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 19px;
  margin-left: 20px;
`;

const StyledButton = styled(Button)`
  width: 68px;
  height: 30px;
  margin-left: auto;
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
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.blueHover};
  }
`;

const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;

// Wrap the content area to keep the bottom-right corner rounded
// even when we have a scroll bar (normally scroll bar will make
// the corner squared off).
const ContentAreaWrapper = styled.div`
  height: 100%;
  overflow: hidden;
  border-bottom-right-radius: 15px;
`;
