import React from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import { User } from "./User";

const WHO_TO_FOLLOW = gql`
  query WhoToFollow {
    whoToFollow {
      id
      username
      handle
      avatar
    }
  }
`;

type User = {
  id: string;
  username: string;
  handle: string;
  avatar: string;
};

export function FollowSuggestions() {
  const { data } = useQuery(WHO_TO_FOLLOW);

  if (data?.whoToFollow.length > 0) {
    return (
      <Container>
        <Header>Who to follow</Header>
        {data &&
          data.whoToFollow.map((user: User) => (
            <User
              key={user.id}
              avatar={user.avatar}
              username={user.username}
              handle={user.handle}
              userID={user.id}
            />
          ))}
      </Container>
    );
  } else return null;
}

const Container = styled.div`
  margin-top: 15px;

  display: flex;
  flex-direction: column;
  width: 290px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.greyBackground};
  overflow: hidden;
  flex-shrink: 0;

  @media only screen and (min-width: 1090px) {
    width: 350px;
  }
`;

const Header = styled.div`
  font-weight: bold;
  font-size: 19px;
  padding: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.greyBorder};
`;
