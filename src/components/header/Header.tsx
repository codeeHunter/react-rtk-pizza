import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Search } from "../search/Search";
import logoSvg from "../../assets/img/pizza-logo.svg";
import Logo from "../svg/Logo";

export const Header = () => {
  const { items, totalPrice } = useTypedSelector((state) => state.cart);
  const { pathname } = useLocation();
  const isMounted = useRef(false);
  const path = !pathname.includes("pizza");

  const totalCount = items.reduce(
    (sum: number, item: any) => sum + item.count,
    0
  );

  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items);
      localStorage.setItem("cart", json);
    }
    isMounted.current = true;
  }, [items]);

  return (
    <div className="header">
      <div className="container">
        <div className="header__logo">
          <Link to={"/"}>
            <img width="38" src={logoSvg} alt="Pizza logo" />
            <div>
              <h1>React Pizza</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </Link>
        </div>
        {pathname !== "/cart" && path ? <Search /> : ""}
        <div className="header__cart">
          {pathname !== "/cart" && (
            <Link to="/cart" className="button button--cart">
              <span>{totalPrice} ₽</span>
              <div className="button__delimiter"></div>
              <Logo />
              <span>{totalCount}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
