import React from "react";
import styled from "styled-components";
import { Avatar } from "Components/Avatar/Avatar";
import { Button } from "Components/Button/Button";
import { useSelector } from "react-redux";
import { useMutation, gql } from "@apollo/client";

const ADD_USER_TO_LIST = gql`
  mutation AddUserToList($userID: ID!, $listID: ID!) {
    addUserToList(userID: $userID, listID: $listID) {
      id
      username
      handle
      avatar
    }
  }
`;

type PropTypes = { added?: boolean; user: User };

export function User(props: PropTypes) {
  // redux state
  const listID = useSelector((state: RootState) => state.listModal.listID);

  // * GQL mutation to add a user to this list
  const [addUserToList] = useMutation(ADD_USER_TO_LIST, {
    variables: { userID: props.user.id, listID },
    optimisticResponse: {
      __typename: "Mutation",
      addUserToList: {
        __typename: "User",
        id: props.user.id,
        username: props.user.username,
        handle: props.user.handle,
        avatar: props.user.avatar,
      },
    },
    update: (store, { data }) => {
      const ListUsersFragment = gql`
        fragment ListUsers on List {
          users {
            id
            username
            handle
            avatar
          }
        }
      `;

      const read: any = store.readFragment({
        id: `List:${listID}`,
        fragment: ListUsersFragment,
      });

      store.writeFragment({
        id: `List:${listID}`,
        fragment: ListUsersFragment,
        data: { ...read, users: [data?.addUserToList, ...read.users] },
      });
    },
  });

  return (
    <Container>
      <div>
        <Avatar width="50px" height="50px" />
      </div>
      <UserContent>
        <UserContentHeader>
          <UserInfo>
            <Username>{props.user.username}</Username>
            <Handle>@{props.user.handle}</Handle>
          </UserInfo>
          <AddButton variation="outline" onClick={() => addUserToList()}>
            {props.added ? "Remove" : "Add"}
          </AddButton>
        </UserContentHeader>
        <Biography>
          The official Twitter for @Marvel 's Agents of S.H.I.E.L.D. on
          @ABCNetwork ! Watch the 2 Hour Series Finale Wednesday at 9|8c.
        </Biography>
      </UserContent>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  padding: 10px;
`;

const UserContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const UserContentHeader = styled.div`
  display: flex;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Username = styled.span`
  font-size: 15px;
  font-weight: bold;
`;
const Handle = styled.span`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.greyText};
  margin: 3px 0;
`;
const Biography = styled.span`
  font-size: 15px;
`;

const AddButton = styled(Button)`
  width: 60px;
  height: 30px;
  margin-left: auto;
`;
