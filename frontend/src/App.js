import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import GroupsPage from "./components/GroupsPage";
import GroupDetail from "./components/GroupDetail";
import NewGroupForm from "./components/GroupNewForm";
import UpdateGroupForm from "./components/GroupUpdate";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route exact path="/login">
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/groups">
            <GroupsPage />
          </Route>
          <Route exact path='/groups/new'>
            <NewGroupForm />
          </Route>
          <Route exact path='/groups/:groupId'>
            <GroupDetail />
          </Route>
          <Route exact path='/groups/:groupId/edit'>
            <UpdateGroupForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
