const { Recipe, Diet, Op } = require("../db");
const axios = require("axios");
const { getAllRecipes } = require('./recipes')
const { API_KEY } = process.env;
require('dotenv').config();

const createdRecipe = async (req, res) => {
    try {
         let {name, summary, score, healthScore,steps, image, diets}= req.body;

        const totalRecipes = await getAllRecipes();
        if (!name || !summary){
            return res.json(
                'Debe ingresar un nombre y Resumen del plato'
            );
        }else if (name){

            
            let recipeName = await totalRecipes.filter(r => r.name.toLowerCase().includes(name.toLowerCase()));
            if(recipeName.length){
                return  res.send( "Ya existe Un recipe con ese Nombre")
            }
        }
        
        const [newRecipe, created] = await Recipe.findOrCreate({
            where: {
                name,
                summary,
                score,
                healthScore,
                steps,
                image,
                
                
            }
        })

        let newDietsLower = diets.map(diet => diet.toLowerCase())

        let dietsDb = await Diet.findAll({
            where: { name: newDietsLower }
        })

        newRecipe.setDiets(dietsDb)
        return res.send(newRecipe)
    } catch (error) {
        console.log(error)
    }
       

    
}

module.exports = {
    createdRecipe,
}