import React, { useContext } from "react";

import {
  GlobalStateContext,
  GlobalDispatchContext,
} from "../../context/GlobalContextProvider";

import { Link } from "gatsby";

import "./cart.scss";
import "../../styles/global.scss";

function Cart(props) {
  const state = useContext(GlobalStateContext);
  const dispatch = useContext(GlobalDispatchContext);
  if (props.visible) {
    return (
      <div className="cart">
        {getItems(state, dispatch)}
        <div className="cart__checkout">
          <button className="cart__checkout-btn">CHECKOUT</button>
        </div>
      </div>
    );
  } else {
    return "";
  }
}

function getItems(state, dispatch) {
  return state.items.map((item, index) => {
    return cartItem(item, index, dispatch);
  });
}

function cartItem(item, index, dispatch) {
  function removeItem(id, size) {
    dispatch({
      type: "REMOVE_ITEM",
      payload: {
        id,
        size,
      },
    });
  }
  function subQuantity(id, size) {
    dispatch({
      type: "SUB_QUANTITY",
      payload: {
        id,
        size,
      },
    });
  }
  function addQuantity(id, size) {
    dispatch({
      type: "ADD_QUANTITY",
      payload: {
        id,
        size,
      },
    });
  }



  const { name, size, quantity, id, price } = item;
  return (
    <div className="cart__item" key={index}>
      <Link to={`/item/${item.id}`}>
        <span>
          {name} {size} x {quantity}
        </span>
      </Link>
      <div>
        <span className="cart__item--price">{price} &euro;</span>
        <button onClick={() => removeItem(id, size)}>
          <i aria-label="remove" className="icon-remove"></i>
        </button>
      </div>
    </div>
  );
}

export default Cart;
