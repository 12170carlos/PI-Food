import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css"
//import { useDispatch } from "react-redux";


export default function Card ({ items }) {
    if (Array.isArray(items)) {

        return (
            <div className={style.containerCard}>
        <div className={style.imgContainer}>
              
            {items.map((diet) => (
                <div key={diet.id}>{diet.toUpperCase()} |</div>
                ))}

          </div>
        </div>
        
        )

    }
}