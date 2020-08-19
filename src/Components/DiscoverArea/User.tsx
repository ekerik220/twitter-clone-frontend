import React from "react";
import styled from "styled-components";
import { Avatar } from "Components/Avatar/Avatar";
import { Button } from "Components/Button/Button";
import { gql, useMutation } from "@apollo/client";
import { useSelector } from "react-redux";

const FOLLOW_OR_UNFOLLOW = gql`
  mutation FollowOrUnfollow($id: ID!) {
    followOrUnfollow(id: $id) {
      followingIDs
    }
  }
`;

type PropTypes = {
  avatar: string;
  username: string;
  handle: string;
  userID: string;
};

export function User(props: PropTypes) {
  // redux state
  const userID = useSelector((state: RootState) => state.user.userID);

  const [followOrUnfollow, { data }] = useMutation(FOLLOW_OR_UNFOLLOW, {
    variables: { id: props.userID },
    update: (store, { data }) => {
      const fragment = gql`
        fragment MyFollowingIDs on User {
          followingIDs
        }
      `;

      store.writeFragment({
        id: `User:${userID}`,
        fragment,
        data: { followingIDs: data.followOrUnfollow.followingIDs },
      });
    },
  });

  return (
    <Container>
      <Avatar width="50px" height="50px" url={props.avatar} />
      <UserInfo>
        <Username>{props.username}</Username>
        <Handle>@{props.handle}</Handle>
      </UserInfo>
      {!data?.followOrUnfollow.followingIDs.includes(props.userID) ? (
        <FollowButton variation="outline" onClick={() => followOrUnfollow()}>
          Follow
        </FollowButton>
      ) : (
        <UnfollowButton onClick={() => followOrUnfollow()}>
          Following
        </UnfollowButton>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.greyBorder};
  transition: background-color 0.2s;
  cursor: pointer;

  &:last-child {
    border: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.greyHover};
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  width: calc(100% - 171px);
`;

const Username = styled.span`
  font-size: 15px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Handle = styled.span`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.greyText};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FollowButton = styled(Button)`
  width: 81px;
  height: 30px;
  margin-left: auto;
`;

const UnfollowButton = styled(Button)`
  width: 101px;
  height: 30px;
  margin-left: auto;

  &:hover {
    background-color: ${({ theme }) => theme.colors.errorRed};
  }
`;
