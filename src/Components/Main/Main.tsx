import React, { useEffect } from "react";
import { useHistory, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { NavBar } from "Components/NavBar/NavBar";
import { Home } from "Components/Home/Home";
import { CommentPage } from "Components/CommentPage/CommentPage";
import { CommentModal } from "Components/CommentModal/CommentModal";
import { RetweetWithCommentModal } from "Components/RetweetWithCommentModal/RetweetWithCommentModal";
import { TweetModal } from "Components/TweetModal/TweetModal";
import { Explore } from "Components/Explore/Explore";
import { DiscoverArea } from "Components/DiscoverArea/DiscoverArea";
import { Bookmarks } from "Components/Bookmarks/Bookmarks";
import { Notifications } from "Components/Notifications/Notifications";
import { Lists } from "Components/Lists/Lists";
import { CreateListModal } from "Components/CreateListModal/CreateListModal";
import { ListPage } from "Components/ListPage/ListPage";

export function Main() {
  const history = useHistory();

  // Redux state
  // if we have a token we're logged in
  const loggedIn = useSelector((state: RootState) => state.user.token);
  const commentModalOpen = useSelector(
    (state: RootState) => state.comment.modalOpen
  );
  const retweetModalOpen = useSelector(
    (state: RootState) => state.retweet.modalOpen
  );
  const tweetModalOpen = useSelector(
    (state: RootState) => state.tweetModal.modalOpen
  );
  const listModalOpen = useSelector((state: RootState) => state.listModal.open);

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
        <Route path="/explore">
          <Explore />
        </Route>
        <Route path="/comments">
          <CommentPage />
        </Route>
        <Route path="/bookmarks">
          <Bookmarks />
        </Route>
        <Route path="/notifications">
          <Notifications />
        </Route>
        <Route path="/lists">
          <Lists />
        </Route>
        <Route path="/list/:listID" component={ListPage} />
      </Switch>
      <DiscoverArea />

      {/* Modals */}
      {commentModalOpen && <CommentModal />}
      {retweetModalOpen && <RetweetWithCommentModal />}
      {tweetModalOpen && <TweetModal />}
      {listModalOpen && <CreateListModal />}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
