import React, { ChangeEvent, FC } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useState } from "react";
import debounce from "lodash.debounce";
import styles from "./Search.module.scss";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../store/filter/slice";
import CloseSearch from "../svg/CloseSearch";
import SearchIcon from "../svg/Search";

export const Search: FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current?.focus();
  };

  const updateSearchValue = useCallback(
    debounce((string) => {
      dispatch(setSearchValue(string));
    }, 250),
    []
  );

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <SearchIcon />
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {value && <CloseSearch onClickClear={onClickClear} />}
    </div>
  );
};
