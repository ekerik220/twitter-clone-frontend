import React, { useEffect } from "react";
import { useHistory, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { NavBar } from "Components/NavBar/NavBar";
import { Home } from "Components/Home/Home";

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
          <Home />
        </Route>
        <Route path="/explore"></Route>
      </Switch>
      <DiscoverArea></DiscoverArea>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const DiscoverArea = styled.div`
  width: 100%;
  display: none;

  @media only screen and (min-width: 1000px) {
    display: flex;
  }
`;
