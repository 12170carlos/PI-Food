const { Recipe, Diet, Op } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;
require('dotenv').config();

const createdRecipe = async (req, res) => {
    try {
         const createRecipe = req.body;

        const [newRecipe, created] = await Recipe.findOrCreate({
            where: {
                title: createRecipe.title,
                summary:createRecipe.summary,
                score: createRecipe.score,
                healthScore: createRecipe.healthScore,
                steps: createRecipe.steps,
                image: createRecipe.image,
                
            }
        })

        await newRecipe.setDiets(createRecipe.diets)
        return res.send(newRecipe)
    } catch (error) {
        console.log(error)
    }
       

    
}

module.exports = {
    createdRecipe,
}