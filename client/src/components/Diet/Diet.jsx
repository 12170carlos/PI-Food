
import React from "react";
import style from "./Diet.module.css";
import { filterBy } from "../../actions/actions";
import { useDispatch } from "react-redux";

export default function Diet  ({ name })  {
  const dispatch = useDispatch();

  return (
    <div>
      <button className={style.btn}>
     
        <img
          name={name}
          src={`./img/icons/${name}.png`}
          alt="Diet"
          onClick={(e) => dispatch(filterBy(e.target.name))}
        />
         
        <span className={style.tooltiptext}>{name.toUpperCase()}</span>
      </button>
    </div>
  );
};
