import React, { useState } from "react";
import {data}  from "../data"
import Card from "./Card";
import "./product.css"

function Products() {
    const [products, setproducts] = useState(data)
  return (
    <div className="products">
        {
            products.map((item)=>{
                return( <Card key={item.id} data ={item}>
                </Card>)
            })
        }
    </div>
  );
}

export default Products;
