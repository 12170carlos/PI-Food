import React, { useEffect } from "react";
import style from "./AllDiets.module.css"
import { useDispatch, useSelector } from "react-redux";
import { getDiets } from "../../actions/actions";
import Diet from "../Diet/Diet";

export default function AllDiets() {
    const diets = useSelector((state) => state.diets);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDiets());
    },[dispatch])

    return (
        <div className={style.container}>
            <Diet key={"All"} name={"All"}/>
            {diets && diets.map((diet) => {
                return <Diet key={diet.name} name={diet.name} />
            } )}
        </div>
    );
}
