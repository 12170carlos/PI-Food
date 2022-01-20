const { Router } = require('express');
const { API_KEY } = process.env;
const router = Router();
const axios = require("axios");
const { getRecipes, getById} = require('../controllers/recipes');
const  { Recipe } = require('../db')
const {  detailById, getRecipeByIdDB } = require('../controllers/recipeById')

router.get('/', function (req, res) {
    
    getRecipes(req, res)
});

router.get('/:id', async (req, res,next) => {
    const { id } = req.params;

    const integerId = Number(id);
    if(id) {
        if (Number.isInteger(integerId)) {
            try {
                let recipeById = await detailById(id);
                let recipeDbId = await getRecipeByIdDB(id)

                if (recipeDbId) return res.json(recipeDbId);
                if (recipeById) return res.json(recipeById);

                return res.status(404).send('Recipe not found')
            } catch (error) {
                next(error);
            }
        }
    }
})

module.exports = router;