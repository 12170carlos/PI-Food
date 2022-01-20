const { Recipe, Diet } = require("../db");
const { API_KEY } = process.env;

const axios = require('axios');

const detailById = async (id) => {
    try {
        const ask = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}` );
        const ele = ask.data; 
        console.log("ele:", ele);

        const recipe = [];
  
            recipe.push( {

                id:ele.id,
                title:ele.title,
                summary: ele.summary,
                score: ele.spoonacularScore,
                healthScore: ele.healthScore,
                steps: ele.analyzedInstructions.map(s => {
                    return (s.steps.map(s2 => (s2.step)))
                }),
                image: ele.image,
                createInDb: false,
                diets: ele.diets.map(diet => diet)
            })
        return recipe;
         
    } catch (error) {
        console.error(error)
    }
}

const getRecipeByIdDB = async (id)  => {
    try {
        const detail = await Recipe.findOne({ 
            where: { id: id},
            include: [
                {
                    model: Diet,
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    }
                }
            ]
        })
        
        return detail;
    } catch (error) {
        console.log(error)
    }

};


// const getRecipeById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const recipeByIdDb = await getRecipeByIdDB();
//         const recipeByIdApi = await detailById();

//         const recipeByIdTotal = recipeByIdDb.concat(recipeByIdApi);

//         if (id) {
//             let recipe = recipeByIdTotal.filter(re => re.id == id);
//             recipe.length ? res.status(200).json(recipe): res.status(404).json({msg: 'Recipe not found'})
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }
module.exports = {
    
    detailById,
    getRecipeByIdDB
}