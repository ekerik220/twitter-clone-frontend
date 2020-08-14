import React from "react";
import styled from "styled-components";
import { CameraIcon, CrossIcon } from "assets/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  closedEditProfileModal,
  updatedBio,
  updatedUsername,
} from "redux/slices/profileSlice";
import {
  openedLandscapeImageEditor,
  openedImageEditor,
} from "redux/slices/imageEditorSlice";
import { InputBox } from "Components/InputBox/InputBox";
import { Avatar } from "Components/Avatar/Avatar";
import { Button } from "Components/Button/Button";
import { gql, useMutation } from "@apollo/client";
import { b64toBlob } from "utils/functions";

const UPDATE_PROFILE = gql`
  mutation UpdateProfile(
    $username: String!
    $bio: String
    $avatar: Upload
    $profileImg: Upload
  ) {
    updateProfile(
      username: $username
      bio: $bio
      avatar: $avatar
      profileImg: $profileImg
    ) {
      username
      bio
      avatar
      profileImg
    }
  }
`;

export function EditProfileModal() {
  const dispatch = useDispatch();

  // redux state
  const profileImg = useSelector(
    (state: RootState) => state.profile.profileImg
  );
  const avatarImg = useSelector((state: RootState) => state.profile.avatarImg);
  const username = useSelector((state: RootState) => state.profile.username);
  const bio = useSelector((state: RootState) => state.profile.bio);
  const userID = useSelector((state: RootState) => state.user.userID);

  // * GQL mutation to update the profile with the new information.
  // * Called when pressed the 'Save' button.
  const [updateProfile] = useMutation(UPDATE_PROFILE, {
    variables: {
      username,
      bio,
      avatar: avatarImg?.startsWith("data") ? b64toBlob(avatarImg) : null,
      profileImg: profileImg?.startsWith("data") ? b64toBlob(profileImg) : null,
    },
    optimisticResponse: {
      __typename: "Mutation",
      updateProfile: {
        username,
        bio,
        avatar: avatarImg,
        profileImg,
      },
    },
    update: (store, { data }) => {
      store.writeFragment({
        id: `User:${userID}`,
        fragment: gql`
          fragment Self on User {
            username
            bio
            avatar
            profileImg
          }
        `,
        data: {
          username: data?.updateProfile.username,
          bio: data?.updateProfile.bio,
          avatar: data?.updateProfile.avatar,
          profileImg: data?.updateProfile.profileImg,
        },
      });
    },
  });

  // * Handler for clicking the camera button on the landscape image
  const handleLandscapeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files) {
      const reader = new FileReader();

      reader.readAsDataURL(e.target.files[0]);

      reader.onload = () => {
        // open image editor modal with this file
        dispatch(
          openedLandscapeImageEditor({
            file: reader.result as string,
            target: "profile",
          })
        );
      };
    }
  };

  // * Handler for clicking the camera button on the avatar image
  const handleAvatarFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files) {
      const reader = new FileReader();

      reader.readAsDataURL(e.target.files[0]);

      reader.onload = () => {
        // open image editor modal with this file
        dispatch(
          openedImageEditor({
            file: reader.result as string,
            target: "avatar",
          })
        );
      };
    }
  };

  // * Handler for the save button
  const handleClickSave = () => {
    updateProfile();
    dispatch(closedEditProfileModal());
  };

  return (
    <>
      <Backdrop></Backdrop>
      <Container>
        <AvatarBox>
          <Avatar width="110px" height="110px" url={avatarImg} />
          <CameraIconHover>
            <CameraIcon />
            <HiddenFileInput onChange={handleAvatarFileInput} />
          </CameraIconHover>
        </AvatarBox>
        <Header>
          <IconHover onClick={() => dispatch(closedEditProfileModal())}>
            <CrossIcon />
          </IconHover>
          <Title>Edit profile</Title>
          <StyledButton
            disabled={username.length === 0}
            onClick={handleClickSave}
          >
            Save
          </StyledButton>
        </Header>
        <ContentAreaWrapper>
          <ContentArea>
            <ImageBox img={profileImg}>
              <CameraIconHover>
                <CameraIcon />
                <HiddenFileInput onChange={handleLandscapeFileInput} />
              </CameraIconHover>
            </ImageBox>
            <StyledInputBox
              title="Name"
              value={username}
              maxLength={50}
              onChange={(e) => dispatch(updatedUsername(e.target.value))}
            />
            <CharCount>{username.length}/50</CharCount>
            <StyledInputBox
              title="Bio"
              value={bio}
              maxLength={160}
              onChange={(e) => dispatch(updatedBio(e.target.value))}
            />
            <CharCount>{bio.length}/160</CharCount>
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

const Title = styled.span`
  font-weight: bold;
  font-size: 19px;
  margin-left: 20px;
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

type ImageBoxProps = { img: string };
const ImageBox = styled.div<ImageBoxProps>`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  height: 195px;
  min-height: 195px;
  margin: 0 2px 70px 2px;
  background: ${({ img }) => (img === "" ? "white" : `url(${img}) no-repeat`)};
  background-size: cover;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

const CameraIconHover = styled(IconHover)`
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;

  &:hover {
    background-color: ${({ theme }) => theme.colors.whiteHover};
  }
`;

const StyledInputBox = styled(InputBox)`
  margin: 5px 10px;
`;

const HiddenFileInput = styled.input.attrs({ type: "file", title: " " })`
  opacity: 0;
  width: 40px;
  height: 40px;
  position: absolute;
  cursor: pointer;
`;

const AvatarBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 200px;
  left: 15px;
  z-index: 2;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid white;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

const CharCount = styled.span`
  margin-left: auto;
  margin-right: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.greyText};
`;

const StyledButton = styled(Button)`
  width: 65px;
  height: 30px;
  margin-left: auto;
`;
