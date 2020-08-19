import React from "react";
import styled from "styled-components";
import { AddListIcon, LoadingIcon } from "assets/icons";
import { List } from "./List";
import { useDispatch } from "react-redux";
import { openedListModal } from "redux/slices/listModalSlice";
import { gql, useQuery } from "@apollo/client";

const GET_LISTS = gql`
  query GetLists {
    self {
      id
      lists {
        id
        name
        description
        img
        users {
          id
        }
      }
      username
      handle
    }
  }
`;

export function Lists() {
  const dispatch = useDispatch();

  const { data, loading } = useQuery(GET_LISTS);

  return (
    <Container>
      <Header>
        <span>Lists</span>
        <IconHover onClick={() => dispatch(openedListModal())}>
          <AddListIcon />
        </IconHover>
      </Header>
      <ListsArea>
        {loading && (
          <LoadingArea>
            <LoadingIcon />
          </LoadingArea>
        )}
        {data?.self.lists.map((list: List, index: number) => (
          <List key={index} list={list} />
        ))}
      </ListsArea>
    </Container>
  );
}

const Container = styled.div`
  max-width: 600px;
  width: 100%;
  min-height: 100%;
  border-left: 1px solid;
  border-right: 1px solid;
  border-color: ${({ theme }) => theme.colors.lightGrey};

  @media only screen and (min-width: 1000px) {
    min-width: 600px;
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  font-size: 19px;
  width: calc(100% - 95px);
  max-width: 599px;
  height: 50px;
  font-weight: bold;
  border: ${({ theme }) => `1px solid ${theme.colors.lightGrey}`};
  border-top: none;
  padding: 0px 10px;
  cursor: pointer;
  position: fixed;
  z-index: 1;
`;

const IconHover = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  transition: background-color 0.2s;
  color: ${({ theme }) => theme.colors.blueMain};

  &:hover {
    background-color: ${({ theme }) => theme.colors.blueHover};
  }
`;

const ListsArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
`;

const LoadingArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
`;
