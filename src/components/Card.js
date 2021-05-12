import { IconButton } from "@material-ui/core";
import { AddShoppingCartRounded, RemoveShoppingCart } from "@material-ui/icons";
import React, { useContext, useState } from "react";
import { data } from "../data";
import "./card.css";
import { cartContext } from "../App";

function Card(prop) {
  const [state, dispatch] = useContext(cartContext);
  const [added, setadded] = useState(
    state.filter((item) => item.id === prop.data.id).length > 0
  );
  const AddCartHandler = () => {
    dispatch({ type: "add", data: prop.data });
    setadded(true);
  };

  const RemoveCartHandler = () => {
    dispatch({ type: "remove", data: prop.data });
    setadded(false);
  };
  return (
    <div className="card">
      <div className="card__container">
        <img src={prop.data.Image}></img>
      </div>
      <div className="card__description">
        <div>{prop.data.name}</div>
        <div>{prop.data.describe} </div>
        <div>${prop.data.price}</div>
        {added ? (
          <IconButton
            onClick={RemoveCartHandler}
            style={{
              color: "red",
            }}
          >
            <RemoveShoppingCart />
          </IconButton>
        ) : (
          <IconButton
            onClick={AddCartHandler}
            style={{
              color: "black",
            }}
          >
            <AddShoppingCartRounded />
          </IconButton>
        )}
      </div>
    </div>
  );
}

export default Card;
