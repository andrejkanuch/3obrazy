import React from "react";
import $ from "jquery";

import { Link } from "gatsby";
import { GlobalStateContext } from "../../context/GlobalContextProvider";

import layout from "./layout.module.scss";
import Cart from "../cart/cart";

class Layout extends React.Component {
  static contextType = GlobalStateContext;

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);

    this.state = {
      popupVisible: false,
    };
  }

  handleClick() {
    if (!this.state.popupVisible) {
      // attach/remove event handler
      document.addEventListener("click", this.handleOutsideClick, false);
    } else {
      document.removeEventListener("click", this.handleOutsideClick, false);
    }

    this.setState((prevState) => ({
      popupVisible: !prevState.popupVisible,
    }));
  }

  handleOutsideClick(e) {
    this.handleClick();
  }

  componentDidMount() {
    $(window).scroll(function () {
      if ($(window).scrollTop() > 10) {
        $(`.${layout.navigation}`).addClass(`${layout.navigationfloating}`);
      } else {
        $(`.${layout.navigation}`).removeClass(`${layout.navigationfloating}`);
      }
    });
  }

  displayAmountofItemsInCart() {
    let total = this.context.total;
    return total ? <span className={layout.totalCart}>{total}</span> : "";
  }
  render() {
    return (
      <div className={layout.layout}>
        <nav className={layout.navigation}>
          <div className={layout.links}>
            <div className={layout.logo}>
              <Link activeClassName="active" to="/">
                <h3>3obrazy</h3>
              </Link>
            </div>
            <ul className={layout.list}>
              <ListLink activeClassName="active" to="/">
                Home
              </ListLink>
              <ListLink activeClassName="active" to="/search/">
                Search
              </ListLink>
              <ListLink activeClassName="active" to="/about/">
                About
              </ListLink>
              <ListLink activeClassName="active" to="/contact/">
                Contact
              </ListLink>
            </ul>
          </div>
          <div className={layout.buttons}>
            <div className={layout.cartWrapper}>
              <span>{this.displayAmountofItemsInCart()}</span>
              <button onClick={this.handleClick}>
                <i aria-label="cart" className="icon-cart"></i>
              </button>
              <Cart visible={this.state.popupVisible}></Cart>
            </div>
          </div>
        </nav>
        {this.props.children}
      </div>
    );
  }
}
const ListLink = (props) => (
  <li>
    <Link
      activeClassName={layout.activeLink}
      to={props.to}
      className={layout.link}
    >
      {props.children}
    </Link>
  </li>
);

export default Layout;
