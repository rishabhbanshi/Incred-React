import React, { createContext, useEffect, useReducer, useState } from "react";
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
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Thankyou from "./components/Thankyou";

export const cartContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [...state, action.data];
    case "remove":
      return [...state.filter((item) => item.id !== action.data.id)];
    case "reset":
      return [];
    case "default":
      return state;
  }
};

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
  const [state, dispatch] = useReducer(reducer, []);
  console.log(firebase.auth().currentUser);
  return (
    <div className="App">
      <cartContext.Provider value={[state, dispatch]}>
        <Router>
          <Index></Index>
          <Switch>
          <Route path="/thankyou" component={Thankyou} exact />
            <Route path="/checkout" component={Checkout} exact />
            <Route path="/cart" component={Cart} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/" component={Homepage} />
          </Switch>
        </Router>
      </cartContext.Provider>
    </div>
  );
};

export default App;
