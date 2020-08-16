import React from "react";
import styled from "styled-components";
import { Avatar } from "Components/Avatar/Avatar";
import { gql, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";

const GET_SELF = gql`
  query GetSelf {
    self {
      id
      username
      handle
      avatar
    }
  }
`;

type PropTypes = {
  list: List;
};

export function List(props: PropTypes) {
  const history = useHistory();

  const { data } = useQuery(GET_SELF);

  const handleClick = () => {
    const list: List = {
      id: props.list.id,
      name: props.list.name,
      userIDs: props.list.userIDs,
      img: props.list.img,
      description: props.list.description,
    };
    history.push(`/list/${props.list.id}`, list);
  };

  return (
    <Container onClick={handleClick}>
      <Avatar width="50px" height="50px" url={props.list.img} />
      <Info>
        <Title>{props.list.name}</Title>
        <User>
          <Avatar width="15px" height="15px" url={data?.self.avatar} />
          <Username>{data?.self.username}</Username>
          <Handle>@{data?.self.handle}</Handle>
        </User>
      </Info>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 70px;
  padding: 10px;
  background: white;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGrey};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.greyBackground};
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 15px;
  margin-bottom: 5px;
`;

const User = styled.div`
  display: flex;
`;

const Username = styled.span`
  font-size: 13px;
  font-weight: bold;
  margin: 0 5px;
`;

const Handle = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.greyText};
`;
