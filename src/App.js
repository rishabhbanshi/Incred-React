import React, { useEffect, useState } from "react";
import "./App.css";
import firebase from "./firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import Login from "./Login";
import Homepage from "./Homepage";

function Index() {
  const history = useHistory();
  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((user) => {
      console.log("inside listen");
      if (user) {
        history.push("/");
      } else {
        history.push("/login");
      }
    });
    return () => {
      listener();
    };
  }, []);
  return <></>;
}

const App = () => {
  console.log(firebase.auth().currentUser);
  return (
    <div className="App">
      <Router>
        <Index></Index>
        <Switch>
          <Route path="/login" component={Login} exact />
          <Route path="/" component={Homepage} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
