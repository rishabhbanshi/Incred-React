import { Button } from "@material-ui/core";
import { LocalMall } from "@material-ui/icons";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import { cartContext } from "../App";
import "./cart.css";
const style = {
  margin: " 10px 0",
  fontWeight: "bold",
  fontSize: "large",
};
function Thankyou() {
  const [state, dispatch] = useContext(cartContext);
  const history = useHistory();
  return (
    <div className="thank">
      <h1> Thank You for shopping !</h1>
      <div>
        <img src="https://lh3.googleusercontent.com/proxy/-Z6H3hD26NymlQ2IIMB-cUPvNP3q6WNjpBTxzQ957qslD8ZniawmZUGMVt3Qpt-DwR_sLdoO9T3q-PFrGNclWuPzbMrg3J9NZJAgHtoTyycsBwkFpuvLz_g"></img>
      </div>
      <Button
        style={style}
        onClick={() => {
          history.push("/");
          dispatch({ type: "reset" });
        }}
        variant="contained"
        color="primary"
      >
        <LocalMall /> Continue Shopping
      </Button>
      
    </div>
  );
}

export default Thankyou;
