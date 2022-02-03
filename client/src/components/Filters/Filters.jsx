import React from "react";
import { useDispatch } from "react-redux";
import { sortRecipes } from "../../actions/actions";
import style from "./Filters.module.css";

export default function Filters() {
  const dispatch = useDispatch();
  const filterOption = ["a-z", "z-a", "0-100", "100-0"];
  return (
    <select
      name="FILTER"
      defaultValue="select"
      onChange={(e) => dispatch(sortRecipes(e.target.value))}
      className={style.container}
    >
      <option
        key="filter"
        hidden
        defaultValue="filter"
        className={style.option}
      >
        Filter
      </option>
      {filterOption.map((option) => {
        return (
          <option key={option} value={option} className={style.option}>
            {option.toUpperCase()}
          </option>
        );
      })}
    </select>
  );
}
