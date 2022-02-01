import React from "react";
// import style from "./DetailCard.module.css";
// import Loading from "../Loading/Loading";

export default function DetailCard({
    name, image, summary, score, healtScore, steps, diets, 
}) {
    return (
        <div className="detailContainer">
           <img className="detailedFood" src={image && image} alt="img"></img>
        
        <div className="detailBgWhite">
            <div className="detailedBg1"></div>
            <div className="detailedBg2"></div>
            <div className="detailedInfo"></div>
            <h2>{name && name}</h2>
            <h3>Diet</h3>
            <p>{diets && diets}</p>
            <h3>Summary</h3>
            <p>{summary && summary}</p>
            <h3>Score</h3>
            <p>{score}</p>
            <h3>HealtScore</h3>
            <p>{healtScore}</p>
            <h3>Steps</h3>
            <p>{steps}</p>
        </div>


        </div>
    )       
}