import React, { Fragment } from "react";
import styled from "styled-components";
import { CrossIcon, CameraIcon, DownArrow } from "assets/icons";
import { InputBox } from "Components/InputBox/InputBox";
import { Button } from "Components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { openedLandscapeImageEditor } from "redux/slices/imageEditorSlice";
import {
  closedListModal,
  nextButtonClicked,
  listIDChanged,
  updatedName,
  updatedDescription,
} from "redux/slices/listModalSlice";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

const ADD_LIST = gql`
  mutation AddList($name: String!, $description: String, $img: String) {
    addList(name: $name, description: $description, img: $img) {
      id
      name
      description
      img
      users {
        id
      }
    }
  }
`;

const UPDATE_LIST = gql`
  mutation UpdateList(
    $listID: ID!
    $name: String!
    $description: String
    $img: String
  ) {
    updateList(
      listID: $listID
      name: $name
      description: $description
      img: $img
    ) {
      id
      name
      description
      img
    }
  }
`;

const DELETE_LIST = gql`
  mutation DeleteList($listID: ID!) {
    deleteList(listID: $listID) {
      id
    }
  }
`;

export function PageOne() {
  const dispatch = useDispatch();
  const history = useHistory();

  // redux state
  const img = useSelector((state: RootState) => state.listModal.img);
  const name = useSelector((state: RootState) => state.listModal.name);
  const description = useSelector(
    (state: RootState) => state.listModal.description
  );
  const listID = useSelector((state: RootState) => state.listModal.listID);
  const editMode = useSelector((state: RootState) => state.listModal.editMode);
  const userID = useSelector((state: RootState) => state.user.userID);

  // * GQL mutation to add a list to the logged in user's lists array
  const [addList] = useMutation(ADD_LIST, {
    variables: { name, description, img },
    optimisticResponse: {
      __typename: "Mutation",
      addList: {
        __typename: "List",
        id: "",
        name,
        description,
        img,
        users: [],
      },
    },
    update: (store, { data }) => {
      if (data) dispatch(listIDChanged(data.addList.id));

      const ListsFragment = gql`
        fragment Lists on User {
          lists {
            id
            name
            description
            img
            users {
              id
            }
          }
        }
      `;
      const read: any = store.readFragment({
        id: `User:${userID}`,
        fragment: ListsFragment,
      });
      store.writeFragment({
        id: `User:${userID}`,
        fragment: ListsFragment,
        data: { ...read, lists: [data?.addList, ...read.lists] },
      });
    },
  });

  // * GQL mutation to update the name/description/img of the list
  const [updateList] = useMutation(UPDATE_LIST, {
    variables: { listID, name, description, img },
    optimisticResponse: {
      __typename: "Mutation",
      updateList: {
        name,
        description,
        img,
      },
    },
    update: (store, { data }) => {
      const CurrentListFragment = gql`
        fragment CurrentList on List {
          name
          description
          img
        }
      `;
      store.writeFragment({
        id: `List:${listID}`,
        fragment: CurrentListFragment,
        data: {
          name: data?.updateList.name,
          description: data?.updateList.description,
          img: data?.updateList.img,
        },
      });
    },
  });

  // * GQL mutation to delete list
  const [deleteList] = useMutation(DELETE_LIST, {
    variables: { listID },
    optimisticResponse: {
      typename: "Mutation",
      deleteList: {
        id: listID,
      },
    },
    update: (store, { data }) => {
      const ListsFragment = gql`
        fragment Lists on User {
          lists {
            id
            name
            description
            img
            users {
              id
            }
          }
        }
      `;

      const read: any = store.readFragment({
        id: `User:${userID}`,
        fragment: ListsFragment,
      });

      const updatedLists = read.lists.filter(
        (list: List) => list.id !== data?.deleteList.id
      );

      store.writeFragment({
        id: `User:${userID}`,
        fragment: ListsFragment,
        data: { ...read, lists: updatedLists },
      });
    },
  });

  // * onChange handler for the file input. Opens the image editor with selected file.
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files) {
      const reader = new FileReader();

      reader.readAsDataURL(e.target.files[0]);

      reader.onload = () => {
        // open image editor modal with this file
        dispatch(
          openedLandscapeImageEditor({
            file: reader.result as string,
            target: "list",
          })
        );
      };
    }
  };

  // * onClick handler for the next button
  const handleNextButton = () => {
    dispatch(nextButtonClicked());
    addList();
  };

  // * onClick handler for the done button (edit mode)
  const handleDoneButton = () => {
    updateList();
    dispatch(closedListModal());
  };

  const handleDeleteList = () => {
    deleteList();
    dispatch(closedListModal());
    history.push("/lists");
  };

  return (
    <>
      <Backdrop></Backdrop>
      <Container>
        <Header>
          <IconHover onClick={() => dispatch(closedListModal())}>
            <CrossIcon />
          </IconHover>
          <Title>Create a new List</Title>
          {editMode ? (
            <StyledButton onClick={handleDoneButton}>Done</StyledButton>
          ) : (
            <StyledButton onClick={handleNextButton}>Next</StyledButton>
          )}
        </Header>
        <ContentAreaWrapper>
          <ContentArea>
            <ImageBox img={img}>
              <CameraIconHover>
                <CameraIcon />
                <HiddenFileInput onChange={handleFileInput} />
              </CameraIconHover>
            </ImageBox>
            <StyledInputBox
              title="Name"
              value={name}
              onChange={(e) => dispatch(updatedName(e.target.value))}
            />
            <CharCount>0/25</CharCount>
            <StyledInputBox
              title="Description"
              value={description}
              onChange={(e) => dispatch(updatedDescription(e.target.value))}
            />
            <CharCount>0/100</CharCount>

            {/* edit mode content starts here */}
            {editMode && (
              <>
                <ManageMembers onClick={() => dispatch(nextButtonClicked())}>
                  <span>Manage members</span>
                  <ArrowIcon />
                </ManageMembers>
                <DeleteList onClick={handleDeleteList}>Delete list</DeleteList>
              </>
            )}
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

type ImageBoxProps = { img: string };
const ImageBox = styled.div<ImageBoxProps>`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  height: 195px;
  min-height: 195px;
  margin: 2px;
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
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: ${({ theme }) => theme.colors.whiteHover};
  }
`;

const StyledInputBox = styled(InputBox)`
  margin: 5px 10px;
`;

const CharCount = styled.span`
  margin-left: auto;
  margin-right: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.greyText};
`;

const HiddenFileInput = styled.input.attrs({ type: "file", title: " " })`
  opacity: 0;
  width: 40px;
  height: 40px;
  position: absolute;
  cursor: pointer;
`;

const ManageMembers = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 13px;
  width: 100%;
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.colors.greyBorder};
  cursor: pointer;
  font-size: 15px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightGrey};
  }
`;

const ArrowIcon = styled(DownArrow)`
  transform: rotate(-90deg);
  height: 20px;
  color: ${({ theme }) => theme.colors.greyText};
`;

const DeleteList = styled.div`
  font-size: 15px;
  text-align: center;
  padding: 17px;
  color: ${({ theme }) => theme.colors.errorRed};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.pinkHover};
  }
`;
