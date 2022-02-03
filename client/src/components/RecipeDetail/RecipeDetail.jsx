/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, resetDetail, setLoading } from "../../actions/actions";
import { useParams } from "react-router-dom";
import style from "./RecipeDetail.module.css";
 import Loading from "../Loading/Loading";
// import NavBar from "../NavBar/NavBar";

import NavBar from "../NavBar/NavBar";


const RecipeDetail = () => {
  //Global state
  const recipe = useSelector((state) => state.detailed);
  const loading = useSelector((state)=> state.loading)
  //HOOKS
  const { id } = useParams();
  const dispatch = useDispatch();

  console.log("id:", id)
  /*mounting*/
  useEffect(() => {
    dispatch(getDetail(id));
  }, []);
  
  useEffect(()=>{
      recipe? dispatch(setLoading(false)):dispatch(setLoading(true))
  },[recipe])
  
  /*unmounting */
  useEffect(() => {
    dispatch(setLoading(true))
    return dispatch(resetDetail());
  },[]);
 
  
  return (
    <div>
      <NavBar />
      {
        loading ? <Loading /> 
        : <div> 
             <div className={style.container}>
        <div className={style.portada}>
          <img src={recipe.image} alt="Recipe" />

          <div className={style.scoreContainer}>
            <span>
              <img
                src={process.env.PUBLIC_URL + `/img/icons/whole 30.png`}
                alt="Score"
              />
              {recipe.score}
            </span>

            <span>
              <img
                src={
                  process.env.PUBLIC_URL + `/img/icons_card/healthscore.jpg`
                }
                alt="Health"
              />
              {recipe.healthScore}
            </span>
            {/* <span>
              <img
                src={process.env.PUBLIC_URL + `/img/icons_card/more_info01.png`}
                alt="Time"
              />
              {recipe.time}'
            </span> */}
          </div>
        </div>

        <div className={style.containerGrupScore}>
          <div className={style.containerName}>
            <h2>{recipe.name} </h2>
          </div>

          <div className={style.containerResume}>
            <h6>{recipe.summary}</h6>
          </div>
        </div>
      </div>

      {/** STEPS*/}
      <div className={style.containerSteps}>
        <div className={style.containerTextSteps}>
          <div className={style.containerIcon}>
            <img src={process.env.PUBLIC_URL + `/img/recipes/chef_sombrero.png`} alt="Diet"/>
            <h4>How Cooking it!</h4>
          </div>

          {Array.isArray(recipe.steps) ? (
            recipe.steps.map((step) => (
              <div className={style.containernNumSteps}>
                <h4 key={step.number}>{step.number}</h4>
                <h6 key={step.step}>{step.step}</h6>
              </div>
            ))
          ) : (
            <h3>{recipe.steps}</h3>
          )}
        </div>

        <div className={style.containerDiet}>
          <div className={style.containerIcon}>
            <img
              src={process.env.PUBLIC_URL + `/img/icons_card/typediet.png`}
              alt="Diet"
            />
            <h4>Types Diets</h4>
          </div>
          {recipe.diets?.map((diet,i) => {
            return (
              <div className={style.containerDietText}>
                <img key={diet}
                  src={process.env.PUBLIC_URL + `/img/icons/${diet}.png`}
                  alt="Diet"
                  className={style.img}
                />
                <h6 key={i}>{diet}</h6>
              </div>
            );
          })}
        </div>
      </div>
    </div>
        
      }
   </div>
     
  );

}
export default RecipeDetail;
