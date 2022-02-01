import React from "react";
import { useSelector } from "react-redux";
import Card from "../Card/Card";
import NavBar from "../NavBar/NavBar";
import { Link } from "react-router-dom";
import { myOwnRecipes } from "../../actions/actions";

export default function MyRecipes() {
    const ownRecipes = useSelector((state) => state.myOwnRecipes);

    return (
        <div>
            <NavBar />
            {!myOwnRecipes.length ? (
                <div>
                    <Link to='/ownRecipes'> <button>ADD RECIPE</button></Link>
                </div>
            ): (
                <div>
                    { React.Children.toArray(ownRecipes.map(recipe => (
                        <div>
                            <Card 
                            id={recipe.id}
                            name={recipe.name}
                            diets={recipe.diets}
                            image={recipe.image}
                            />
                        </div>
                    )
                    ))}
                </div>
            )}
            
        </div>
    )
}