import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecipes, setLoading } from "../../actions";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import DietsContainer from "../DietsContainer/DietsContainer";
import style from "./Home.module.css";
//import SearchBar from "../SearchBar/SearchBar";
//import SelectSort from "../SelectSort/SelectSort";
import Loading from "../Loading/Loading";
import Nav from "../Nav/Nav";


export default function Home() {
  //Global states
  const recipe = useSelector((state) => state.currentRecipes);
  const loading = useSelector((state) => state.loading);

  //Local states
  const [currentPage, setCurrentPage] = useState(1);
  const foodPerPage = 9;

  //variables
  const indexOfLastFood = currentPage * foodPerPage;
  const indexOfFirstFood = indexOfLastFood - foodPerPage;
  const currentFood = recipe.slice(indexOfFirstFood, indexOfLastFood);

  //functions
  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //HOOKS
  const dispatch = useDispatch();

  /*mounting*/
  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  /*unmounting*/
  useEffect(() => {
    return recipe.length
      ? dispatch(setLoading(false))
      : dispatch(setLoading(true));
  }, [recipe, dispatch]);

  return (
    <div>
      <Nav />
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className={style.containerSearch}>
            {/* <SearchBar /> */}
            {/* <SelectSort /> */}
          </div>
          <div className={style.box}>
            <div className={style.containerImg}>
              <img src="./img/portada.png" alt="Loading" />
            </div>
          </div>

          <div className={style.containerDiets}>
            <DietsContainer />
          </div>

          <div className={style.cardContainer}>
            {Array.isArray(currentFood) ? (
              currentFood.map((recipe) => {
                return (
                  <Card
                    key={recipe.id}
                    name={recipe.name}
                    image={recipe.image}
                    type_diets={recipe.type_diets}
                    id={recipe.id}
                  />
                );
              })
            ) : (
              <img
                id={style.imgError}
                src={process.env.PUBLIC_URL + `/img/not_found1.png`}
                alt="Error"
              />
            )}
          </div>
          <Pagination
            pagination={pagination}
            allRecipe={recipe.length}
            foodPerPage={foodPerPage}
          />
        </div>
      )}
    </div>
  );
}

