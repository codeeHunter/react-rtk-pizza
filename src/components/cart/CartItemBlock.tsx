import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { addItem, minusItem, removeItem } from "../../store/cart/slice";
import { CartItem } from "../../store/cart/types";
import Close from "../svg/Close";
import Plus from "../svg/Plus";
import Minus from "../svg/MinusIcon";

type CartItemProps = {
  id: string;
  title: string;
  type: string;
  price: number;
  size: number;
  count: number;
  imageUrl: string;
};

export const CartItemBlock: FC<CartItemProps> = ({
  id,
  title,
  type,
  price,
  size,
  count,
  imageUrl,
}) => {
  const dispatch = useDispatch();

  const onClickAdd = () => {
    dispatch(
      addItem({
        id,
      } as CartItem)
    );
  };

  const onClickMinus = () => {
    dispatch(minusItem(id));
  };

  const onClickRemove = () => {
    if (window.confirm("Ты действительно хочешь удалить товар?")) {
      dispatch(removeItem(id));
    }
  };

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>
          {type}, {size} см.
        </p>
      </div>
      <div className="cart__item-count">
        <button
          onClick={onClickMinus}
          disabled={count === 1}
          className={
            "button button--outline button--circle cart__item-count-minus"
          }
        >
          <Minus />
        </button>
        <b>{count}</b>
        <button
          onClick={onClickAdd}
          className={
            "button button--outline button--circle cart__item-count-plus"
          }
        >
          <Plus />
        </button>
      </div>
      <div className="cart__item-price">
        <b>{price * count} ₽</b>
      </div>
      <div className="cart__item-remove">
        <button
          onClick={onClickRemove}
          className="button button--outline button--circle"
        >
          <Close />
        </button>
      </div>
    </div>
  );
};
