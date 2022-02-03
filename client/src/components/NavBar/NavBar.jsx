import React from "react";
import { NavLink } from "react-router-dom";
import style from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div>
      <nav className={style.NavContainer}>
        <ul>
          <NavLink
            to="/recipes"
            className={style.link}
            activeclassname={style.active}
          >
            {" "}
            <li>Home</li>
          </NavLink>
          <NavLink
            to="/createRecipe"
            className={style.Link}
            activeclassname={style.active}
          >
            <li>Add New Recipe</li>
          </NavLink>
          <NavLink
            to="/ownRecipes"
            className={style.Link}
            activeclassname={style.active}
          >
            <li>My Own Recipes</li>
          </NavLink>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
