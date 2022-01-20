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
                title: ele.title,
                summary: ele.summary,
                score: ele.spoonacularScore,
                healthScore: ele.healthScore,
                steps: ele.analyzedInstructions.map(s => {
                    return (s.steps.map(s2 => (s2.step)))
                }),
                image: ele.image,
                createInDb: false,
                diets: ele.diets.map(diet => diet)
            }
        })
        return recipes100;
    } catch (error) {
        console.log(error)
    }
}

const getRecipes = async(req, res) => {
    
    try {
    let { name } = req.query;
        const recipes = await getRecipesFromAPi();//recipes de la API
        
        const recipesDb = await Recipe.findAll({//promesa
        attributes: ['id', 'title', 'summary', 'score', 'healthScore', 'steps', 'image', 'createInDb' ],

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
        
                
        if(name) {
            
            const filterByName =  recipes.filter((reci) =>  
            reci.title.toLowerCase().includes(name.toLowerCase())
            );
            
            const filterByNameDb = recipesDb.filter((reci) => 
            reci.title.toLowerCase().includes(name.toLowerCase())
            );
            filterByName.length || filterByNameDb.length
                ? res.send(filterByNameDb.concat(filterByName))
                : res.send('Recipe not found')
            
            
        }else {
            recipesDb.length ? res.send(recipesDb.concat(recipes)) : res.send(recipes)
        }
    } catch (error) {
        console.log(error)
    }
        
}

const getById =  async(req, res) => {
    try {
        const { id }  = req.params;

        //const intergerId = Number(id)
        const recipes = await getRecipes();
        
        if (id) {
            console.log('entro') 
        //if (Number.isInteger(intergerId)) {
                
                
                let recipesId = await recipes.filter(reci => reci.id == id)
                recipesId.lenght 
                            ? res.json(recipesId)
                            : res.json({msg:'Recipe not found'})
                    

                //}

                // const getRecipeId = async (req, res) => {
                //     try {
                //       const { id } = req.params;
                //       const recipeTotal = await allRecipes();
                //       if (id) {
                //         let recipeId = await recipeTotal.filter((r) => r.id == id);
                //         recipeId.length ? res.status(200).json(recipeId): res.status(400).send("Recipe No Encontrado");
                //       }
                //     } catch (e) {
                //       console.log(e);
                //     }
                //   };
                // } else {
                //                              //https://api.spoonacular.com/recipes/716429/information?apiKey=5ae4272d21f2486eb304e4289e64a3b7
                //     recipe = await axios.get(` https://api.spoonacular.com/recipes/${id}/information?&apiKey=${API_KEY}/`)

                //     recipe = recipe.data;

                //recipe? res.send(recipe):res.status(404)
                //}
        }    
    }catch (error) {
       console.log(error);
    }
}


module.exports = {
    getById,
    getRecipes,

}
