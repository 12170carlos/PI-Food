import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecipes, setLoading } from "../../actions/actions";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import style from "./Home.module.css";
import SearchBar from "../SearchBar/SearchBar";
import Filters from "../Filters/Filters"
import Loading from "../Loading/Loading";
import NavBar from "../NavBar/NavBar";
import AllDiets from "../AllDiets/AllDiets"

const Home = () => {
  //Global states
  const recipe = useSelector((state) => state.allRecipes);
  const loading = useSelector((state)=> state.loading)

  console.log("recipe:", recipe)
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
  },[dispatch]);

  /*unmounting*/
  useEffect(()=>{
    return recipe.length ? dispatch(setLoading(false)) : dispatch(setLoading(true))
  },[recipe,dispatch])


 
    return (
     
      <div>
         <NavBar />
        {      
          (loading) ? <Loading />
          : <div>   
          <div className={style.containerSearch}>
          <SearchBar />
          <Filters />
        </div>
        {/* <div className={style.box}>
          <div className={style.containerImg}>
            <img src="./img/portada.png" alt="Loading" />
          </div>
        </div> */}

        <div className={style.containerDiets}>
  
          <AllDiets />
        </div>

        <div className={style.cardContainer}>
         { Array.isArray(currentFood)? currentFood.map((recipe) => {
            return (
              <Card
                key={recipe.id}
                name={recipe.name}
                image={recipe.image}
                diets={recipe.diets}
                id={recipe.id}
              />
            );
          }): (<img id={style.imgError}src={process.env.PUBLIC_URL + `/img/not_found1.png`} alt="Error"/>) } 
        </div>
        <Pagination
          pagination={pagination}
          allRecipe={recipe.length}
          foodPerPage={foodPerPage}
        />
     
        
     </div> 
        
        }

</div>
    );
  }

export default Home;
