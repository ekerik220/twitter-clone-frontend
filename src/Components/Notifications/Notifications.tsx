import React, { useEffect } from "react";
import styled from "styled-components";
import { tweetDetailsFragment } from "utils/fragments";
import { gql, useQuery } from "@apollo/client";
import { Notification } from "./Notification";
import { CategorySelector } from "./CategorySelector";
import { useSelector, useDispatch } from "react-redux";
import { Tweet } from "Components/Tweet/Tweet";
import { leavingNotificationScreen } from "redux/slices/notificationsSlice";
import { LoadingIcon } from "assets/icons";

const GET_NOTIFICATIONS = gql`
  query GetNotifications {
    self {
      notifications {
        type
        user {
          id
          username
          handle
          avatar
        }
        tweet {
          ...tweetDetails
        }
      }
      mentions {
        ...tweetDetails
      }
    }
  }
  ${tweetDetailsFragment}
`;

export function Notifications() {
  const dispatch = useDispatch();

  const { data, loading } = useQuery(GET_NOTIFICATIONS);

  // redux data
  const currentCategory = useSelector(
    (state: RootState) => state.notifications.currentCategory
  );

  // * Reset redux state when we leave this screen
  useEffect(() => {
    return () => {
      dispatch(leavingNotificationScreen());
    };
  }, [dispatch]);

  return (
    <Container>
      <Header>
        <PageTitle>Notifications</PageTitle>
        <CategorySelector />
      </Header>
      <NotificationArea>
        {loading && (
          <LoadingArea>
            <LoadingIcon />
          </LoadingArea>
        )}
        {currentCategory === "notifications" &&
          data?.self.notifications.map(
            (notification: NotificationObject, index: number) => (
              <Notification key={index} notification={notification} />
            )
          )}
        {currentCategory === "mentions" &&
          data?.self.mentions.map((tweet: Tweet) => (
            <Tweet key={tweet.id} tweet={tweet} />
          ))}
      </NotificationArea>
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
  flex-direction: column;
  background-color: white;
  width: calc(100% - 80px);
  max-width: 599px;
  border: ${({ theme }) => `1px solid ${theme.colors.lightGrey}`};
  border-top: none;
  position: fixed;
  z-index: 1;
`;

const PageTitle = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
  font-weight: bold;
  font-size: 19px;
  height: 50px;
  cursor: pointer;
`;

const NotificationArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
`;

const LoadingArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
`;
