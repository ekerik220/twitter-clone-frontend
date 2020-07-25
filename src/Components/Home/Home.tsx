import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export function Home() {
  const history = useHistory();

  // Redux state
  // if we have a token we're logged in
  const loggedIn = useSelector((state: RootState) => state.user.token);

  // * redirect to '/' if not logged in
  useEffect(() => {
    if (!loggedIn) history.push("/");
  }, [history, loggedIn]);

  return <div>Welcome home.</div>;
}
