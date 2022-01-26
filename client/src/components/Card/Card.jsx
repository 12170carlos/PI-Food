import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css"
//import { useDispatch } from "react-redux";


export default function Card ({ id, image, title, diets }) {
    return (
      <div className={style.containerCard}>
        <div className={style.imgContainer}>
          <img src={image ? image : false} alt="Recipe" />
        </div>
        <div className={style.containerText}>
          <div className={style.container}>
            <h1>{title}</h1>
          </div>
          <div className={style.containerDiet}>
              {console.log(diets)}
            {diets.map((diet) => (
              <h6 key={diet}>{diet.toUpperCase()} |</h6>
            ))}

          </div>
        </div>
        <div className={style.containerDesc}>
          <div className={style.containerInf}>
            <div className={style.grup}>
              <Link to={`/detail/${id}`} className={style.link}>
                {/* <img
                  src={process.env.PUBLIC_URL + `/img/icons_card/plus1.png`}
                  alt="Time"
                /> */}
                <span className={style.tooltiptext}>More Detail</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  