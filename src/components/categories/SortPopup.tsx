import React, { FC, memo, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setSort } from "../../store/filter/slice";
import { SortPropertyEnum, Sort } from "../../store/filter/types";
import UpIcon from "../svg/UpIcon";

type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};

type PopupClick = MouseEvent & {
  path: Node[];
};

export const sortItems: SortItem[] = [
  { name: "популярности (DESC)", sortProperty: SortPropertyEnum.RATING_DESC },
  { name: "популярности (ASC)", sortProperty: SortPropertyEnum.RATING_ASC },
  { name: "цене (DESC)", sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: "цене (ASC)", sortProperty: SortPropertyEnum.PRICE_ASC },
  { name: "алфавиту(DESC)", sortProperty: SortPropertyEnum.TITLE_DESC },
  { name: "алфавиту(ASC)", sortProperty: SortPropertyEnum.TITLE_ASC },
];

type SortPopupProps = {
  value: Sort;
};

export const SortPopup: FC<SortPopupProps> = memo(({ value }) => {
  const dispatch = useDispatch();
  const sortRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const onClickListItem = (obj: SortItem) => {
    setOpen(false);
    dispatch(setSort(obj));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as PopupClick;
      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <UpIcon />
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{value.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {sortItems.map((sortItem, index) => (
              <li
                key={index}
                onClick={() => onClickListItem(sortItem)}
                className={
                  value.sortProperty === sortItem.sortProperty ? "active" : ""
                }
              >
                {sortItem.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});
