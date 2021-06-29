import React, { useContext } from "react";
import { GlobalDispatchContext } from "../context/GlobalContextProvider";

import Layout from "../components/layout/layout";

import "../styles/product-page.scss";

function Product({ pageContext }) {
  const dispatch = useContext(GlobalDispatchContext);
  const { id, image, name, size,price } = pageContext.node;

  return (
    <Layout>
      <div className="product-page">
        <div className="main-content">
          <div className="product-image">
            <img src={image.file.url} alt={name} />
          </div>
          <div className="product-description">
            <div className="description">
              <h1 className="description__title">{name.toUpperCase()}</h1>
              {
                size.options.map(item=>{
                  return (<OptionRow key={item.size} size={item.size} name={name} id={id} price={price}></OptionRow>)
                })
              }
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
  function addItem(params) {
    const { name,price,id,size } = params;
    dispatch({
      type: "ADD_ITEM",
      payload: {
       name,id,size,quantity:0,price
      },
    });
  }

  function OptionRow(params) {
    return (
      <div className="description__size--option">
        <span>{params.size}</span>
        <button onClick={addItem.bind(this, params)}>
          <i className="icon-cart"></i>
        </button>
      </div>
    );
  }
}
export default Product;
