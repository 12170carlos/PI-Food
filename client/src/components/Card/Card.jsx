import React from "react";
import style from "./Card.module.css";
import { Link } from "react-router-dom";

export default function card ({ id, image, name, diets }) {
  return (
    <div className={style.containerCard}>
      <div className={style.imgContainer}>
        <img src={image ? image : "./img/myrecipe.png"} alt="Recipe" />
      </div>
      <div className={style.containerText}>
        <div className={style.container}>
          <h1>{name}</h1>
        </div>
        <div className={style.containerDiet}>
          {diets?.map((diet) => (
            <h6 key={diet.name}>{diet.toUpperCase()} |</h6>
          ))}
        </div>
      </div>
      <div className={style.containerDesc}>
        <div className={style.containerInf}>
          <div className={style.grup}>
            <Link to={`/detail/${id}`} className={style.link}>
              <img
                src={process.env.PUBLIC_URL + `/img/icons_card/plus.png`}
                alt="Time"
              />
              <span className={style.tooltiptext}>More Detail</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

