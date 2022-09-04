import React, { FC } from "react";
import { Sort } from "../../store/filter/types";
import { Categories, SortPopup } from "../../components";

interface SortCategoriesProps {
  categoryId: number;
  onClickCategory: (id: number) => void;
  value: Sort;
}

export const SortCategories: FC<SortCategoriesProps> = ({
  categoryId,
  onClickCategory,
  value,
}) => {
  return (
    <div className="content__top">
      <Categories categoryId={categoryId} onClickCategory={onClickCategory} />
      <SortPopup value={value} />
    </div>
  );
};
