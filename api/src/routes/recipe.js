const { Router } = require('express');

const router = Router();
require('dotenv').config();
const axios = require("axios");
const { getAllRecipes } = require('../controllers/recipes');

const { getById } = require('../controllers/recipeById')
//const {   detailById, getRecipeByIdDB } = require('../controllers/recipeById')

router.get('/', async (req, res, next)  => {
    try {
        const { name } = req.query;
        const totalRecipes = await getAllRecipes();

        if (name){
            let byName = totalRecipes.filter( recipe => recipe.name.toLowerCase().includes(name.toLowerCase()));
        byName.length ? res.json(byName)
        : res.send('Alert: Recipe not Found')
            
        }else  res.json(totalRecipes)
        
    } catch (error) {
        next(error)
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    getById(id, res)
    
})
module.exports = router;