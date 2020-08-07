import React from "react";
import styled from "styled-components";
import { PurpleStarIcon, PersonFollowIcon } from "assets/icons";
import { Avatar } from "Components/Avatar/Avatar";
import { useHistory } from "react-router-dom";

type PropTypes = { notification: NotificationObject };

export function Notification(props: PropTypes) {
  const history = useHistory();

  const handleClick = () => {
    if (props.notification.tweet)
      history.push("/comments", props.notification.tweet);
  };

  return (
    <Container onClick={handleClick}>
      {props.notification.type === "follow" && <PersonFollowIcon />}
      {props.notification.type === "tweet" && <PurpleStarIcon />}
      <Content>
        <Avatar
          height="30px"
          width="30px"
          url={props.notification.user.avatar}
        />
        {props.notification.type === "follow" && (
          <TypeHeader>
            <BoldText>{props.notification.user.username}</BoldText> followed you
          </TypeHeader>
        )}
        {props.notification.type === "tweet" && (
          <>
            <TypeHeader>
              Recent Twat from{" "}
              <BoldText>{props.notification.user.username}</BoldText>
            </TypeHeader>
            <TweetBody>{props.notification.tweet?.body}</TweetBody>
          </>
        )}
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.colors.lightGrey};
  background-color: white;
  padding: 10px 10px 10px 30px;
  padding-bottom: 0;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.greyBackground};
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const TypeHeader = styled.span`
  font-size: 15px;
  margin-top: 10px;
`;

const BoldText = styled.span`
  font-weight: bold;
`;

const TweetBody = styled.span`
  color: ${({ theme }) => theme.colors.greyText};
  font-size: 15px;
  margin-top: 10px;
`;
