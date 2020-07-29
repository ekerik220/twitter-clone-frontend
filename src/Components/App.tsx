import React from "react";
import { useSelector } from "react-redux";
import { LoginPage, SignupModal } from "Components";
import { ImageEditor } from "./ImageEditor/ImageEditor";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Main } from "./Main/Main";
import { StandaloneLoginPage } from "./StandaloneLoginPage/StandaloneLoginPage";

function App() {
  // Redux state
  const imageEditorOpen = useSelector(
    (state: RootState) => state.imageEditor.open
  );
  const signupModalOpen = useSelector(
    (state: RootState) => state.signup.modalOpen
  );

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LoginPage />
        </Route>
        <Route path="/login">
          <StandaloneLoginPage />
        </Route>
        <Route path={["/home", "/explore", "/comments"]}>
          <Main />
        </Route>
      </Switch>
      {/* Modals */}
      {imageEditorOpen && <ImageEditor />}
      {signupModalOpen && <SignupModal />}
    </Router>
  );
}

export default App;
