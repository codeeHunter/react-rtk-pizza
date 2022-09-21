import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { addItem } from "../../store/cart/slice";
import { CartItem } from "../../store/cart/types";
import Plus from "../svg/Plus";

const sizeTitle = ["тонкое", "традиционное"];

type PizzaItemProps = {
  id: string;
  sizes: number[];
  price: number;
  title: string;
  imageUrl: string;
  types: number[];
};

export const PizzaItem: FC<PizzaItemProps> = ({
  id,
  sizes,
  price,
  title,
  imageUrl,
  types,
}) => {
  const [selectedSize, setSelectedSize] = useState(0);
  const cartitem = useTypedSelector((state) =>
    state.cart.items.find((obj) => obj.id === id)
  );

  const addedCount = cartitem ? cartitem.count : 0;
  const [selectedType, setSelectedType] = useState(0);
  const dispatch = useDispatch();

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      title,
      price,
      imageUrl,
      type: sizeTitle[selectedType],
      size: sizes[selectedSize],
      count: 0,
    };
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/pizza/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
          <h4 className="pizza-block__title">{title}</h4>
        </Link>
        <div className="pizza-block__selector">
          <ul>
            {types.map((type, index) => (
              <li
                key={index}
                className={index === selectedType ? "active" : ""}
                onClick={() => {
                  setSelectedType(index);
                }}
              >
                {sizeTitle[type]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((item, index) => (
              <li
                key={index}
                className={selectedSize === index ? "active" : ""}
                onClick={() => setSelectedSize(index)}
              >
                {item}см
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button
            onClick={onClickAdd}
            className="button button--outline button--add"
          >
            <Plus />
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};
