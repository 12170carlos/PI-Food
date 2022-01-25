import React from "react";
import { Link } from "react-router-dom";
//import style from "./Landing.module.css";

export default function LandingPage()  {
    return (
        <div>
            <h1>Bienvenidos a mi super pagina!</h1>
            <Link to='/recipes'>
                <button>Ingresar</button>
            </Link>
        </div>
    )
}
