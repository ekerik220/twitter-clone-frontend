import "croppie/croppie.css";
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { createGlobalStyle } from "styled-components";
import { Button } from "Components/Button/Button";
import { BackButton } from "Components/BackButton/BackButton";
import Croppie from "croppie";
import ReactResizeDetector from "react-resize-detector";
import { useMutation, gql } from "@apollo/client";
import { finishedEditingImage } from "redux/slices/imageEditorSlice";
import { userSetNewAvatar } from "redux/slices/userSlice";
import { LoadingIcon } from "assets/icons";
import { imageSelected } from "redux/slices/listModalSlice";

// !TODO Implement my own image cropper (not using croppie).
// !TODO This is a big job though, so for now we'll use this hacked together version.

const SET_AVATAR_IMAGE = gql`
  mutation SetAvatarImage($file: Upload!) {
    setAvatarImage(file: $file) {
      avatar
    }
  }
`;

/**
 * Image cropping componenet
 *
 * This is pretty hacky. Croppie library is doing most of the work.
 * There is a react version of croppie, but it's not being maintained,
 * so I used the regular js version and shoe horned it into react. Also,
 * while it is functionally very close to the Twitter cropping tool, there
 * were some differences that couldn't be fixed with the croppie settings, so
 * I tried to get it working as close as I could manage (this was a bit hacky,
 * though).
 */
export function ImageEditor() {
  const dispatch = useDispatch();

  // * GQL Mutation
  const [setAvatarImage, { loading }] = useMutation(SET_AVATAR_IMAGE, {
    onCompleted: (data) => {
      const avatar = data.setAvatarImage.avatar;
      dispatch(userSetNewAvatar(avatar));
      dispatch(finishedEditingImage());
    },
  });

  // * Local state and refs
  const contAreaRef = useRef<HTMLDivElement>(null);
  const croppieRef = useRef<HTMLDivElement>(null);
  const [myCroppie, setMyCroppie] = useState<Croppie>();
  const [firstResize, setFirstResize] = useState(true);

  // * Redux state
  const imageSrc = useSelector((state: RootState) => state.imageEditor.file);
  const heightDivider = useSelector(
    (state: RootState) => state.imageEditor.heightDivider
  );
  const target = useSelector((state: RootState) => state.imageEditor.target);

  // * Attach croppie to a div (croppieRef points to the div to use).
  useEffect(() => {
    if (croppieRef.current !== null && contAreaRef.current !== null) {
      // We want the viewport (cropping) area to be a square that is 85% of the height
      // of the content area.
      //const dimensions = contAreaRef.current.clientHeight * 0.85;
      const height = (contAreaRef.current.clientHeight * 0.95) / heightDivider;
      const width = contAreaRef.current.clientHeight * 0.95;

      // Attach croppie to div, setting viewport dimensions
      const croppie = new Croppie(croppieRef.current, {
        viewport: { height: height, width: width },
        enableExif: true,
      });

      // Save our croppie instance to state so we can use it elsewhere
      setMyCroppie(croppie);

      // Bind an image to our croppie
      croppie.bind({ url: imageSrc, zoom: 0 });
    }
  }, [croppieRef, imageSrc, heightDivider]);

  // * When content area div is resized (this happens when window is resized),
  // * calculate a new view port size and rebind the croppie.
  const onResize = (width: number, height: number) => {
    // This is where things geta little hacky... Croppie has an inner div that
    // works as the view port (cropping area). We want the view port to always
    // be 85% of the content area, so we need it to change size as the content area
    // does. However, croppie has no supported way of resizing the view port, so
    // I grabbed the view port div by it's class name and manually set the style
    // attribute on it to the proper dimensions.
    const vp = document.getElementsByClassName("cr-viewport")[0];

    if (vp && myCroppie) {
      // A resize actually gets triggered on page load, and for some reason
      // (and it only seems to happen when vp && myCroppie are both defined
      // for this first resize), it would end up being very zoomed in on the
      // image, despite the zoom being set to 0. I can't figure out the reason,
      // so a hacky fix was to just disregard the first 'resize'.
      if (firstResize) setFirstResize(false);
      else {
        // resize the view port manually
        const vp_height = (height * 0.95) / heightDivider;
        const vp_width = height * 0.95;
        vp.setAttribute(
          "style",
          `width: ${vp_width}px; height: ${vp_height}px;`
        );

        // rebind to resize the image
        myCroppie.bind({
          url: imageSrc,
          zoom: 0,
        });
      }
    }
  };

  // * Send off a mutation to the server with the cropped image
  const onClickApply = async () => {
    if (myCroppie) {
      const image = await myCroppie.result({ type: "base64" });

      if (target === "avatar") setAvatarImage({ variables: { file: image } });
      if (target === "list") dispatch(imageSelected(image));
      dispatch(finishedEditingImage());
    }
  };

  return (
    <React.Fragment>
      <Backdrop></Backdrop>
      <Modal>
        <Header>
          <HeaderLeftWrapper>
            <BackButton />
            <HeaderText>Edit media</HeaderText>
          </HeaderLeftWrapper>
          <ApplyButton onClick={onClickApply}>Apply</ApplyButton>
        </Header>
        {loading ? (
          <Loading>
            <StyledLoadingIcon />
          </Loading>
        ) : (
          <ContentAreaWrapper>
            <ContentArea ref={contAreaRef}>
              <div ref={croppieRef}></div>
              <ReactResizeDetector
                handleWidth
                handleHeight
                onResize={onResize}
              />
            </ContentArea>
          </ContentAreaWrapper>
        )}
      </Modal>
    </React.Fragment>
  );
}

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
  z-index: 100;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  height: 53px;
  padding: 0 15px;
`;

const HeaderText = styled.span`
  margin-left: 15px;
  font-weight: bold;
  font-size: 18px;
`;

const ApplyButton = styled(Button)`
  justify-self: flex-end;
  height: 30px;
  width: 73px;
`;

// Wrap the content area to keep the bottom-right corner rounded
// even when we have a scroll bar (normally scroll bar will make
// the corner squared off).
const ContentAreaWrapper = styled.div`
  height: 100%;
  border-bottom-right-radius: 15px;
`;

const ContentArea = styled.div`
  display: flex;
  justify-content: center;
  height: calc(100% - 60px);
  position: relative;
`;

const HeaderLeftWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const StyledLoadingIcon = styled(LoadingIcon)`
  height: 25px;
`;
