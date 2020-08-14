import React from "react";
import styled from "styled-components";
import { Avatar } from "Components/Avatar/Avatar";
import { Button } from "Components/Button/Button";
import { CalendarIcon } from "assets/icons";
import { useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";
import { GET_USER } from "./Profile";
import { useParams } from "react-router-dom";
import { openedEditProfileModal } from "redux/slices/profileSlice";
import moment from "moment";

export function ProfileCard() {
  const dispatch = useDispatch();
  const { handle } = useParams();

  const { data } = useQuery(GET_USER, { variables: { handle } });

  const handleEditProfileButton = () => {
    if (data) dispatch(openedEditProfileModal(data.getUserByHandle));
  };

  return (
    <Container>
      <StyledAvatar url={data?.getUserByHandle.avatar} />
      <ProfilePicture src={data?.getUserByHandle.profileImg} />
      <BottomArea>
        <StyledButton variation="outline" onClick={handleEditProfileButton}>
          Edit profile
        </StyledButton>
        <Username>{data?.getUserByHandle.username}</Username>
        <Handle>@{data?.getUserByHandle.handle}</Handle>
        <Biography>{data?.getUserByHandle.bio}</Biography>
        <JoinDateBox>
          <CalendarIcon />
          <JoinDate>
            Joined{" "}
            {data
              ? moment(data.getUserByHandle.joinDate).format("MMMM YYYY")
              : null}
          </JoinDate>
        </JoinDateBox>
        <ListStats>
          <CountSpan>
            <Counter>
              {data ? data.getUserByHandle.followingIDs.length : 0}
            </Counter>{" "}
            Following
          </CountSpan>
          <CountSpan>
            <Counter>
              {data ? data.getUserByHandle.followedByIDs.length : 0}
            </Counter>{" "}
            Followers
          </CountSpan>
        </ListStats>
      </BottomArea>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  margin-top: 50px;
`;

const BottomArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 15px;
`;

const ProfilePicture = styled.img`
  height: 195px;
  width: 100%;
  background: lightgray;
`;

const StyledAvatar = styled(Avatar)`
  position: absolute;
  width: 134px;
  height: 134px;
  top: 110px;
  left: 15px;
`;

const StyledButton = styled(Button)`
  width: 112px;
  height: 39px;
  margin-left: auto;
  font-size: 15px;
`;

const Username = styled.span`
  font-size: 19px;
  font-weight: bold;
`;

const Handle = styled.span`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.greyText};
`;

const Biography = styled.span`
  font-size: 15px;
  margin: 10px 0;
`;

const JoinDateBox = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.greyText};
`;

const JoinDate = styled.span`
  margin-left: 10px;
  font-size: 15px;
`;

const ListStats = styled.div`
  display: flex;
  font-size: 15px;
`;

const CountSpan = styled.span`
  color: ${({ theme }) => theme.colors.greyText};
  cursor: pointer;
  margin: 10px 25px 0 0;

  &:hover {
    text-decoration: underline;
  }
`;

const Counter = styled.span`
  color: black;
  font-weight: bold;
`;
