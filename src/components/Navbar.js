import { Button, IconButton } from "@material-ui/core";
import { Home, ShoppingCart } from "@material-ui/icons";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { cartContext } from "../App";
import firebase from "../firebase";
import "./Navbar.css";

function Navbar() {
  console.log(firebase.auth().currentUser);
  let displayName = "user";
  let src =
    "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png";
  if (firebase.auth().currentUser) {
    src = firebase.auth().currentUser.photoURL
      ? firebase.auth().currentUser.photoURL
      : src;
    displayName = firebase.auth().currentUser.displayName
      ? firebase.auth().currentUser.displayName
      : firebase.auth().currentUser.phoneNumber;
  }
  const history = useHistory();
  const SignoutHandler = async () => {
    await firebase.auth().signOut();
  };
  const [state, dispatch] = useContext(cartContext);
  console.log(state);
  return (
    <div className="navbar">
      <div className="navbar__logo">
        <div
          className="navbar__logo__container "
          onClick={() => {
            history.push("/");
          }}
        >
          <img src={src}></img>
        </div>
        <div>
          <p>{displayName}</p>
        </div>
      </div>
      <div onClick={() => history.push("/")} className="title">
        <p>INCRED</p>
      </div>
      <div className="navbar__logout">
        <IconButton
          onClick={() => {
            history.push("/cart");
          }}
        >
          <ShoppingCart
            fontSize="large"
            style={{
              color: "black",
            }}
          />
        </IconButton>
        {state.length !== 0 && (
          <div className="navbar__counter">
            <p> {state.length}</p>
          </div>
        )}

        <Button onClick={SignoutHandler} variant="contained" color="primary">
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
