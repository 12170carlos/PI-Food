const { Recipe, Diet } = require("../db");
const { API_KEY } = process.env;
const { getAllRecipes } = require("./recipes")

const axios = require('axios');

const detailById = async () => {
    try {
        const recipeApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
        const respuesta = recipeApi.data.results;
        return respuesta.map((ele) => {
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
        
        
    } catch (error) {
        console.log(error)
    }
}



const getById =  async(id, res) => {
    try {
        
        if (!id.includes("-")) {
            console.log('entro')      
            const detail= await getAllRecipes();    
            const recipesId =  detail?.find((reci) => reci.id.toString() === id);
            recipesId
                ? res.json(recipesId)
                : res.json("No Recipe Found for this ID")
        }else {
            const detail = await Recipe.findOne({
                where: { id: id },
                include: [
                    {
                        model: Diet,
                        attributes: ["name"],
                        through: {
                            attributes: [],
                        },
                    },
                ],
            });
           
            detail ? res.send(detail) : res.send("No Recipe Found for this ID")
        } 
    }catch (error) {
       console.log(error);
    }
}

// const getRecipeByIdDB = async (id)  => {
//     try {
//         const detail = await Recipe.findOne({ 
//             where: { id: id},
//             include: [
//                 {
//                     model: Diet,
//                     attributes: ['name'],
//                     through: {
//                         attributes: [],
//                     }
//                 }
//             ]
//         })
        
//         return detail;
//     } catch (error) {
//         console.log(error)
//     }

// };



module.exports = {
    getById,
    detailById,
    //getRecipeByIdDB
}