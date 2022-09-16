import React from 'react';
import { useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { Categories, PizzaBlock, Skeleton, Pagination, SortPopup } from '../components';
import { sortList } from '../components/Sort';

import { useAppDispatch } from '../redux/store';
import { setCategoryId, setFilters, setCurrentPage } from '../redux/Filter/slice';
import { selectFilter } from '../redux/Filter/selectors';
import { SearchPizzaParams } from '../redux/Pizza/slice';
import { selectPizzaData } from '../redux/Pizza/selectors';
import { fetchPizzas } from '../redux/Pizza/asyncActions';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, currentPage, sortBy, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const getPizzas = () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        category,
        search,
        currentPage: String(currentPage),
        sortBy,
      }),
    );

    window.scrollTo(0, 0);
  };

  const onChangeCategory = React.useCallback((index: number) => {
    dispatch(setCategoryId(index));
  }, [dispatch]);

  const onChangePage = (value: number) => {
    dispatch(setCurrentPage(value));
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortBy.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortBy, searchValue, currentPage, navigate]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;

      const sort = sortList.find((obj) => obj === params.sortBy);
      if (sort) {
        params.sortBy = sort;
      }
      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sortBy: sort || sortList[0],
        }),
      );
      isSearch.current = true;
    }
  }, [dispatch]);

  React.useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortBy, searchValue, currentPage]);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...Array(8)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <SortPopup value={sortBy} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>Не удалось получить данные. Попробуйте перезагрузить страницу.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
