import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
// import pizzas from "../assets/pizza.json";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";

const Home = () => {

  const {searchValue} = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortType, setSortType] = React.useState({
    name: "популярности",
    sortProperty: "rating",
  });
  React.useEffect(() => {
    setIsLoading(true);

    const sortBy = sortType.sortProperty.replace("-", "");
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    fetch(
      `https://6464c842127ad0b8f8a7d62b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
      window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  // const pizzas = items
  //   .filter((obj) => {
  //     if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
  //       return true;
  //     }

  //     return false;
  //   })
  //   .map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  // const skeletons = [...new Array(6)].map((_, index) => (
  //   <Skeleton key={index} />
  // )); статичный поиск код
  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onChangeCategory={(i) => setCategoryId(i)} />
          <Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
            : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}

          {/* {pizzas.map((obj) => (
          <PizzaBlock key={obj.id} {...obj} />
        ))} */}
        </div>
        <Pagination onChangePage={setCurrentPage} currentPage={currentPage} />
      </div>
    </>
  );
};

export default Home;
