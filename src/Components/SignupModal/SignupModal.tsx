import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { createGlobalStyle } from "styled-components";
import { TwitterBird } from "assets/icons";
import { Button } from "Components/Button/Button";
import { PageOne } from "./PageOne";
import { PageTwo } from "./PageTwo";
import { PageThree } from "./PageThree";
import { PageFour } from "./PageFour";
import { PageFive } from "./PageFive";
import { BackButton } from "Components/BackButton/BackButton";
import { wentBackOnePage, wentForwardOnePage } from "redux/slices/signupSlice";

export function SignupModal() {
  const dispatch = useDispatch();

  // Redux state
  const currentPageIsValid = useSelector(
    (state: RootState) => state.signup.currentPageValidated
  );
  const currentPage = useSelector(
    (state: RootState) => state.signup.currentPage
  );

  return (
    <React.Fragment>
      <BlockScrolling />
      <Backdrop></Backdrop>
      <Modal>
        <Header>
          <HeaderLeftWrapper>
            {currentPage > 1 && (
              <BackButton onClick={() => dispatch(wentBackOnePage())} />
            )}
            {currentPage === 3 && <StepCount>Step 3 of 5</StepCount>}
            {currentPage === 5 && <StepCount>Step 5 of 5</StepCount>}
          </HeaderLeftWrapper>
          {currentPage !== 3 && <TwitterBirdSVG />}
          {currentPage !== 3 && (
            <NextButton
              onClick={() => dispatch(wentForwardOnePage())}
              disabled={!currentPageIsValid}
            >
              Next
            </NextButton>
          )}
        </Header>
        <ContentAreaWrapper>
          <ContentArea>
            {currentPage === 1 && <PageOne />}
            {currentPage === 2 && <PageTwo />}
            {currentPage === 3 && <PageThree />}
            {currentPage === 4 && <PageFour />}
            {currentPage === 5 && <PageFive />}
          </ContentArea>
        </ContentAreaWrapper>
      </Modal>
    </React.Fragment>
  );
}

// Blocks the background from scrolling by making the height of body
// equal the view height and hiding any overflow.
const BlockScrolling = createGlobalStyle`
  body {
    height: 100vh;
    overflow-y: hidden;
    padding-right: 15px;
  }
`;

const Backdrop = styled.div`
  position: absolute;
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  min-height: 400px;
  height: 90%;
  background: white;
  border-radius: 15px;
  z-index: 1;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  height: 53px;
  padding: 0 15px;
`;

const TwitterBirdSVG = styled(TwitterBird)`
  grid-column-start: 2;
  justify-self: center;
  width: 26px;
  color: ${({ theme }) => theme.colors.blueMain};
`;

const NextButton = styled(Button)`
  justify-self: flex-end;
  height: 30px;
  width: 68px;
`;

// Wrap the content area to keep the bottom-right corner rounded
// even when we have a scroll bar (normally scroll bar will make
// the corner squared off).
const ContentAreaWrapper = styled.div`
  height: 100%;
  overflow: hidden;
  border-bottom-right-radius: 15px;
`;

const ContentArea = styled.div`
  overflow-y: auto;
  height: 100%;
`;

const HeaderLeftWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StepCount = styled.span`
  grid-column-start: 1;
  margin-left: 20px;
  font-weight: bold;
  font-size: 19px;
`;
