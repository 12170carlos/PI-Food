const { Recipe, Diet } = require("../db");

const { Op } = require('sequelize');
const axios = require("axios");
const { API_KEY } = process.env;
require('dotenv').config();

const getRecipesFromAPi = async () => {
    try {
        const recipeApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
        const respuesta = recipeApi.data.results;
        const recipes100 = respuesta.map(ele => {
            return {
                id: ele.id,
                name: ele.title,
                summary: ele.summary,
                score: ele.spoonacularScore,
                healthScore: ele.healthScore,
                steps: ele.analyzedInstructions.map(s => {
                    return (s.steps.map(s2 => (s2.step)))
                }),
                image: ele.image,
                createInDb: false,
                diets: ele.diets
            }
        })
        
        return recipes100;
    } catch (error) {
        console.log(error)
    }
}

const getRecipesfromDb = async() => {
    
    try {
    
        
        return await Recipe.findAll({//promesa
        attributes: ['id', 'name', 'summary', 'score', 'healthScore', 'steps', 'image', 'createInDb' ],

            include: [
                {
                    model: Diet,

                    attributes: ['name'],
                    through: {
                        attributes: [],
                    },
                },
            ],
        });
        
    } catch (error) {
        console.log(error)
    }

}
const getAllRecipes = async () => {

    const apiRecipes = await getRecipesFromAPi();
    const dbRecipes = await getRecipesfromDb();
    const totalRecipes = [...dbRecipes, ...apiRecipes]
    
    return totalRecipes;

}


               
        



module.exports = {
    //getById,
    getAllRecipes,

}
