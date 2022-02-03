import React, { useState } from "react";
import style from "./SearchBar.module.css";
import { searchByName } from "../../actions/actions";
import { useDispatch } from "react-redux";

export default function SearchBar() {
  const dispatch = useDispatch();

  const [input, setInput] = useState("");

  const handleInput = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };
  const handleSubmit = (input, e) => {
    e.preventDefault();
    e.target.value = "";
    dispatch(searchByName(input));
  };
  return (
    <form onSubmit={(e) => handleSubmit(input, e)}>
      <button className={style.button} type="submit" value="Search Recipe" />
      <input
        className={style.input}
        type="text"
        onChange={(e) => handleInput(e)}
        placeholder="Search Recipe"
      />
    </form>
  );
}
