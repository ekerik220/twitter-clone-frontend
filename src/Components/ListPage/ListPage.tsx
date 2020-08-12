import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { BackButton } from "Components/BackButton/BackButton";
import { gql, useQuery } from "@apollo/client";
import { Avatar } from "Components/Avatar/Avatar";
import { Button } from "Components/Button/Button";
import { tweetDetailsFragment } from "utils/fragments";
import { Tweet } from "Components/Tweet/Tweet";
import { useDispatch } from "react-redux";
import { openedEditListModal } from "redux/slices/listModalSlice";

const GET_LIST = gql`
  query GetList($id: ID!) {
    getList(id: $id) {
      id
      name
      img
      description
      users {
        id
        tweets {
          ...tweetDetails
        }
      }
    }
    self {
      id
      username
      handle
      avatar
    }
  }
  ${tweetDetailsFragment}
`;

export function ListPage() {
  const dispatch = useDispatch();
  const history = useHistory<List>();
  const { listID } = useParams();

  // local state
  const [tweets, setTweets] = useState<Tweet[]>();

  // snapshot of what the list looks like when we entered the page...
  // this is just to have something to display while we load the data
  // from the server, and won't reflect any changes made while we're on
  // the page
  const snapshot = history.location.state;

  // * Grab the data for this list
  const { data } = useQuery(GET_LIST, { variables: { id: listID } });

  // * Sort the tweets by date
  useEffect(() => {
    let tweetAccum: Tweet[] = [];
    data?.getList.users.forEach((user: any) => {
      tweetAccum = tweetAccum.concat(user.tweets);
    });
    tweetAccum.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setTweets(tweetAccum);
  }, [data]);

  // * Opens the edit list modal
  const handleEditListButton = () => {
    if (data) dispatch(openedEditListModal(data.getList));
  };

  return (
    <Container>
      <Header>
        <StyledBackButton onClick={() => history.goBack()} />
        <span>{data?.getList.name || snapshot.name}</span>
      </Header>
      <CoverImage
        src={
          data?.getList.img ||
          snapshot.img ||
          "https://pbs.twimg.com/media/EXZ2rMvVAAAAfrN?format=png&name=900x900"
        }
      />
      <ListInfoArea>
        <Title>{data?.getList.name || snapshot.name}</Title>
        <Description>
          {data?.getList.description || snapshot.description}
        </Description>
        <User>
          <Avatar width="20px" height="20px" url={data?.self.avatar} />
          <Username>{data?.self.username}</Username>
          <Handle>@{data?.self.handle}</Handle>
        </User>
        <ListStats>
          <CountSpan>
            <Counter>{data?.getList.users.length || 0}</Counter> Members
          </CountSpan>
          <CountSpan>
            <Counter>0</Counter> Followers
          </CountSpan>
        </ListStats>
        <StyledButton variation="outline" onClick={handleEditListButton}>
          Edit List
        </StyledButton>
      </ListInfoArea>
      <TweetArea>
        {tweets?.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} />
        ))}
      </TweetArea>
    </Container>
  );
}

const Container = styled.div`
  max-width: 600px;
  width: 100%;

  height: 100%;

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
  background-color: white;
  font-size: 19px;
  width: inherit;
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

const StyledBackButton = styled(BackButton)`
  margin-right: 20px;
`;

const TweetArea = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.lightGrey};
`;

const CoverImage = styled.img`
  margin-top: 50px;
  height: 195px;
  min-height: 195px;
  width: 100%;
  border: none;
  background: lightgrey;
`;

const ListInfoArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.greyBorder};
`;

const Title = styled.h2`
  font-size: 19px;
  font-weight: bold;
  margin: 10px 0;
`;

const Description = styled.span`
  font-size: 15px;
  padding: 0 20px;
  overflow-wrap: break-word;
  text-align: center;
  width: 100%;
`;

const Username = styled.span`
  font-weight: bold;
  margin: 0 5px;
`;

const Handle = styled.span`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.greyText};
`;

const User = styled.div`
  display: flex;
  cursor: pointer;
  margin: 10px 0;

  &:hover ${Username} {
    text-decoration: underline;
  }
`;

const ListStats = styled.div`
  display: flex;
  font-size: 15px;
`;

const CountSpan = styled.span`
  color: ${({ theme }) => theme.colors.greyText};
  cursor: pointer;
  margin: 0 15px;

  &:hover {
    text-decoration: underline;
  }
`;

const Counter = styled.span`
  color: black;
  font-weight: bold;
`;

const StyledButton = styled(Button)`
  width: 90px;
  height: 39px;
  margin: 20px 0;
`;
