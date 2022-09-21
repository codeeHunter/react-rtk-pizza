import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { CartEmpty, CartItemBlock } from "../../components";
import Basket from "../../components/svg/Basket";
import ClearBasket from "../../components/svg/ClearBasket";
import LeftArrow from "../../components/svg/LeftArrow";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { clearItems } from "../../store/cart/slice";
import { CartItem } from "../../store/cart/types";

const Cart: FC = () => {
  const dispatch = useDispatch();
  const { items, totalPrice } = useTypedSelector((state) => state.cart);

  const totalCount = items.reduce(
    (sum: number, item: CartItem) => sum + item.count,
    0
  );

  const onClickClear = () => {
    if (window.confirm("Очистить корзину?")) {
      dispatch(clearItems());
    }
  };

  if (!totalCount) {
    return <CartEmpty />;
  }

  return (
    <div className="container container--cart">
      <div className="cart">
        <div className="cart__top">
          <h2 className="content__title">
            <Basket />
            Корзина
          </h2>
          <div onClick={onClickClear} className="cart__clear">
            <ClearBasket />
            <span>Очистить корзину</span>
          </div>
        </div>
        <div className="content__items">
          {items.map((item: CartItem, index) => (
            <CartItemBlock key={index} {...item} />
          ))}
        </div>
        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <span>
              Всего пицц: <b>{totalCount} шт.</b>
            </span>
            <span>
              Сумма заказа: <b>{totalPrice} ₽</b>
            </span>
          </div>
          <div className="cart__bottom-buttons">
            <Link
              to="/"
              className="button button--outline button--add go-back-btn"
            >
              <LeftArrow />
              <span>Вернуться назад</span>
            </Link>
            <div className="button pay-btn">
              <span>Оплатить сейчас</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
