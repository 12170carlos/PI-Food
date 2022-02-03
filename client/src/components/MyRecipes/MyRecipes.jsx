import React from "react";
import { useSelector } from "react-redux";
import Card from "../Card/Card";
import NavBar from "../NavBar/NavBar";
import { Link } from "react-router-dom";
import style from "./MyRecipes.module.css";
//import { myOwnRecipes } from "../../actions/actions";

export default function MyRecipes() {
  const ownRecipes = useSelector((state) => state.myOwnRecipes);

  return (
    <div>
      <NavBar />{" "}
      {!ownRecipes.length ? (
        <div className={style.containerPrincipalNoRecipes}>
          <div className={style.containerNoRecipes}>
            <img
              src={process.env.PUBLIC_URL + "img/recipes/not_recipe.png"}
              alt="notrecipe"
            />
          </div>
          <div className={style.containerBtnMake}>
            <Link to="/createRecipe">
              <button>ADD RECIPE</button>
            </Link>
          </div>
        </div>
      ) : (
        <div className={style.containerCard}>
          {ownRecipes.map((recipe) => {
            return (
              <>
                <Card
                  key={recipe.id}
                  name={recipe.name}
                  image={recipe.image}
                  diets={
                    recipe.diets
                      ? recipe.diets
                      : recipe.Diets.map((d) => d.name)
                  }
                  id={recipe.id}
                />
              </>
            );
          })}
        </div>
      )}
    </div>
  );
}
