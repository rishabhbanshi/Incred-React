import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import { cartContext } from "../App";
import Card from "./Card";
import Navbar from "./Navbar";
import "./cart.css";
import {
  AccountBalanceWallet,
  MonetizationOn,
  ShoppingCart,
} from "@material-ui/icons";
const reducer = (currentSum, currentValue) => currentSum + currentValue.price;

function Cart() {
  const [state, dispatch] = useContext(cartContext);
  const ClearCartHandler = () => {
    dispatch({ type: "reset" });
  };
  const history = useHistory();
  const CheckoutHandler = () => {
    history.push("/checkout");
  };

  return (
    <div>
      <Navbar />
      <Button
        onClick={ClearCartHandler}
        variant="contained"
        color="primary"
        className="clear_cart"
        style={{
          margin: "15px",
          fontSize: "20px",
          fontFamily: "'Josefin Sans', sans-serif",
          fontWeight: "bold",
        }}
      >
        <ShoppingCart /> Clear Cart
      </Button>
      <Button
        onClick={CheckoutHandler}
        variant="contained"
        color="primary"
        style={{
          margin: "15px",
          fontSize: "20px",
          fontFamily: "'Josefin Sans', sans-serif",
          fontWeight: "bold",
        }}
        disabled={state.length === 0}
        className="checkout"
      >
        <AccountBalanceWallet />
        CheckOut
      </Button>
      <p className="price">
        <MonetizationOn
          style={{
            fontSize: "40px",
          }}
        />
        <span>Total Price : {state.reduce(reducer, 0)} </span>
      </p>
      <div className="products">
        {state.map((item) => {
          return <Card key={item.id} data={item}></Card>;
        })}
      </div>
    </div>
  );
}

export default Cart;
