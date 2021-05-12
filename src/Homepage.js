import React, { useEffect } from "react";
import { useHistory } from "react-router";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import firebase from "./firebase";
import "./Homepage.css"

function Homepage() {
 
  return (
    <div className="homepage">
       <Navbar />
      <Products/>
    </div>
  );
}

export default Homepage;
