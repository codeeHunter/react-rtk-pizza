import React, { FC, memo } from "react";

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

type CaterogiesProps = {
  categoryId: number;
  onClickCategory: (index: number) => void;
};

export const Categories: FC<CaterogiesProps> = memo(
  ({ categoryId, onClickCategory }) => {
    return (
      <div className="categories">
        <ul>
          {categories.map((category, index) => (
            <li
              className={categoryId === index ? "active" : ""}
              key={index}
              onClick={() => onClickCategory(index)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
