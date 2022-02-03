const { Recipe, Diet } = require("../db");

const { Op } = require('sequelize');
const axios = require("axios");
const { API_KEY } = process.env;
require('dotenv').config();

const getRecipesFromApi = async () => {
    try {
        const recipeApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
        const respuesta = recipeApi.data.results;
        const recipes100 = respuesta.map(ele => {
            return {
                id: ele.id,
                name: ele.title,
                summary: ele.summary.replace(/<[^>]*>?/gm, ""),
                score: ele.spoonacularScore,
                healthScore: ele.healthScore,
                types: ele.dishTypes?.map(ele => ele),
                steps: (ele.analyzedInstructions[0] &&
                ele.analyzedInstructions[0].steps?.map(s => {
                    return {number: s.number, step: s.step} 
                })
                ),
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

    const apiRecipes = await getRecipesFromApi();
    const dbRecipes = await getRecipesfromDb();
    const totalRecipes = [...dbRecipes, ...apiRecipes]
    
    return totalRecipes;

}


               
        



module.exports = {
    //getById,
    getAllRecipes,

}
