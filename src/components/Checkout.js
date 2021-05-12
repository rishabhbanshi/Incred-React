import { Button, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import firebase from "../firebase";
import { useHistory } from "react-router";
import "./cart.css";

const style = {
  margin: " 10px 0",
  fontWeight: "bold",
};

function Checkout() {
  const history = useHistory();
  const [name, setname] = useState("");
  const [Phone, setPhone] = useState("");
  const [Email, setEmail] = useState("");
  const [Address, setAddress] = useState("");

  useEffect(() => {
    if (firebase.auth().currentUser) {
      setname(firebase.auth().currentUser.displayName);
      setPhone(firebase.auth().currentUser.phoneNumber);
      setEmail(firebase.auth().currentUser.email);
    }
  }, [firebase.auth().currentUser]);

  const PaymentHandler = () => {
    history.push("/thankyou");
  };
  return (
    <div>
      <Navbar />
      <div className="formcard">
        <p className=" header">CHECKOUT </p>
        <TextField
          placeholder="Name"
          value={name}
          style={style}
          onChange={(e) => {
            setname(e.target.value);
          }}
        ></TextField>
        <TextField
          placeholder="Phone Number"
          value={Phone}
          style={style}
          onChange={(e) => {
            let value = e.target.value;
            value = value.replace(/[a-zA-Z]/g, "");
            console.log(value);
            setPhone(value);
          }}
        ></TextField>
        <TextField
          placeholder="Email"
          value={Email}
          style={style}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></TextField>
        <TextField
          placeholder="Address"
          value={Address}
          style={style}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        ></TextField>
        <Button
          onClick={PaymentHandler}
          variant="contained"
          style={style}
          color="primary"
          disabled={!(name && Phone && Email && Address)}
        >
          Pay
        </Button>
      </div>
    </div>
  );
}

export default Checkout;
