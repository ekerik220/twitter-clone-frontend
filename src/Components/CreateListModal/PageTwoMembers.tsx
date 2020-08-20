import React from "react";
import styled from "styled-components";
import { User } from "./User";
import { gql, useQuery } from "@apollo/client";
import { useSelector } from "react-redux";

export const GET_LIST_USERS = gql`
  query GetListUsers($id: ID!) {
    getList(id: $id) {
      id
      users {
        id
        username
        handle
        avatar
      }
    }
  }
`;

export function PageTwoMembers() {
  // redux state
  const listID = useSelector((state: RootState) => state.listModal.listID);

  const { data } = useQuery(GET_LIST_USERS, { variables: { id: listID } });

  return (
    <Container>
      {data?.getList.users.map((user: User) => (
        <User key={user.id} added={true} user={user} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
