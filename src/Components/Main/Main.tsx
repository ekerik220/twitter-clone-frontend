import React, { useEffect } from "react";
import { useHistory, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { NavBar } from "Components/NavBar/NavBar";

export function Main() {
  const history = useHistory();

  // Redux state
  // if we have a token we're logged in
  const loggedIn = useSelector((state: RootState) => state.user.token);

  // * redirect to '/' if not logged in
  useEffect(() => {
    if (!loggedIn) history.push("/");
  }, [history, loggedIn]);

  return (
    <Container>
      <NavBar />
      <Switch>
        <Route path="/home">
          <TweetArea>
            <Tweet></Tweet>
            <Tweet></Tweet>
            <Tweet></Tweet>
            <Tweet></Tweet>
            <Tweet></Tweet>
            <Tweet></Tweet>
            <Tweet></Tweet>
            <Tweet></Tweet>
            <Tweet></Tweet>
            <Tweet></Tweet>
          </TweetArea>
        </Route>
      </Switch>
      <DiscoverArea></DiscoverArea>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

const TweetArea = styled.div`
  border: 1px solid black;
  width: 600px;
  max-width: 600px;
`;

const Tweet = styled.div`
  width: 600px;
  height: 200px;
  border: 1px solid black;
`;

const DiscoverArea = styled.div`
  border: 1px solid black;
  width: 100%;
`;
