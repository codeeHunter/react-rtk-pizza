import React, { FC, useCallback, useEffect, useState } from "react";
import {
  SortCategories,
  Pagination,
  PizzaItem,
  Skeleton,
} from "../../components";
import { useRef } from "react";
import { useAppDispatch } from "../../store/store";
import { setCategoryId, setCurrentPage } from "../../store/filter/slice";
import { fetchPizzas } from "../../store/pizzas/asyncAction";
import { useTypedSelector } from "../../hooks/useTypedSelector";

export const Home: FC = () => {
  const { categoryId, sort, currentPage, searchValue } = useTypedSelector(
    (state) => state.filter
  );

  const { items, status } = useTypedSelector((state) => state.pizza);

  const isSearch = useRef(false);
  const dispatch = useAppDispatch();

  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  const [_, setIsLoading] = useState(true);

  const getPizzas = async () => {
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sort.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    setIsLoading(true);
    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage: String(currentPage),
      })
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items.map((obj: any) => <PizzaItem key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <SortCategories
        categoryId={categoryId}
        onClickCategory={onChangeCategory}
        value={sort}
      />
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>
            К сожалению, не удалось получить пиццы. Попробуйте повторить попытку
            позже.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
