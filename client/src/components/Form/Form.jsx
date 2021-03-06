import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Form.module.css";
import NavBar from "../NavBar/NavBar";
import { myOwnRecipes } from "../../actions/actions";

//methods
  const validate = (input, e) => {
    const { name } = e.target;
    let error = {};
    switch (name) {
      case "name":
        if (!/^[/A-Za-z\s]+$/g.test(input.name)) {
          error.name = "The name must not contain numbers";
        }
        break;
      case "score":
        if (!/^[0-9]?[0-9]{1}$|^100$/.test(input.score)) {
          error.score = "The score must be from 0 to 100";
        }
        break;
      case "healthScore":
        if (!/^[0-9]?[0-9]{1}$|^100$/.test(input.healthScore)) {
          error.healthScore = "The health score must be from 0 to 100";
        }
        break;

      case "image":
        if (!/^(ftp|http|https):\/\/[^ "]+$/.test(input.image)) {
          error.image = "It must be a correct URL";
        }
        break;
      default:
        return "";
    }
    return error;
  };
  
const CreateRecipe = () => {
  //global states
  const diets = useSelector((state) => state.diets);

  //local states
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    summary: "",
    score: "",
    healthScore: "",
    steps: "",
    diets: [],
    image: `${process.env.PUBLIC_URL}img/myrecipe.png`,
  });

  

  const dispatch = useDispatch();

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(validate({ ...input, [e.target.name]: e.target.value }, e));
  };
  const handleSubmit = (newRecipe, e) => {
    e.preventDefault();
    dispatch(myOwnRecipes(newRecipe));
  };
  const handleCheckBox = (e) => {
    setInput({
      ...input,
      diets: [...input.diets, e.target.id],
    });
  };

  function isDisabled(errors) {
    return Object.keys(errors).length > 0;
  }
  return (
    <div>
      <NavBar />
      <form onSubmit={(e) => handleSubmit(input, e)}>
        <div className={style.form}>
          <div className={style.containerInput}>
            <div className={style.grupo}>
              <input
                type="text"
                name="name"
                className={style.input}
                required
                onChange={(e) => handleInput(e)}
              />
              <span className={errors.name ? style.error : style.barra}></span>
              {errors.name && <h6 id={style.errorWord}>{errors.name}</h6>}
              <label htmlFor="name" className={style.label}>Name</label>
            </div>

            <div className={style.grupo}>
              <textarea
                name="summary"
                rows="3"
                required
                className={style.input}
                onChange={(e) => handleInput(e)}
              ></textarea>
              <span className={style.barra}></span>
              <label className={style.label}>Summary</label>
            </div>

            <div className={style.grupo}>
              <textarea
                name="steps"
                rows="3"
                required
                className={style.input}
                onChange={(e) => handleInput(e)}
              ></textarea>
              <span className={style.barra}></span>
              <label className={style.label}>Steps</label>
            </div>

            <div className={style.grupo}>
              <input
                type="number"
                name="score"
                required
                className={style.input}
                onChange={(e) => handleInput(e)}
              />
              <span className={errors.score ? style.error : style.barra}></span>
              {errors.score && <h6 id={style.errorWord}>{errors.score}</h6>}
              <label className={style.label}>Score</label>
            </div>

            <div className={style.grupo}>
              <input
                type="number"
                name="healthScore"
                className={style.input}
                onChange={(e) => handleInput(e)}
                required
              />
              <span
                className={errors.healthScore ? style.error : style.barra}
              ></span>
              {errors.healthScore && (
                <h6 id={style.errorWord}>{errors.healthScore}</h6>
              )}
              <label className={style.label}>Health Score</label>
            </div>


            <div className={style.grupo}>
              <input
                type="text"
                name="image"
                className={style.input}
                onChange={(e) => handleInput(e)}
              />
              <span className={errors.image ? style.error : style.barra}></span>
              {errors.image && <h6 id={style.errorWord}>{errors.image}</h6>}
              <label className={style.label}>Url Image</label>
            </div>
          </div>

          <div className={style.containerDiet}>
            <div className={style.containerIconDiet}>
              <img
                src={process.env.PUBLIC_URL + `/img/icons_detail/typediet.png`}
                alt="type diets"
              />
              <span>Choose Diet</span>
            </div>
            {diets.map((diet,i) => {
              return (
                <div  key = {i} className={style.containerDietMap}>
                 
                  <input
                  
                    type="checkbox"
                    id={diet.name}
                    name="diets"
                    onChange={(e) => handleCheckBox(e)}
                  />
                  <img
                    src={process.env.PUBLIC_URL + `/img/icons/${diet.name}.png`}
                    alt="Diet"
                  />
                  <label>{diet.name.toUpperCase()}</label>
                </div>
              );
            })}
          </div>
        </div>
        <div className={style.button}>
          <input
            type="submit"
            disabled={isDisabled(errors)}
            value="Create Recipe"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateRecipe;
