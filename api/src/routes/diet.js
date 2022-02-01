const { Router } = require('express');
const { getDiets } = require('../controllers/diets')
const router = Router();
const { Diet } = require("../db")
require('dotenv').config();



router.get('/', async(req, res) => {

    const diets = ["gluten free","vegetarian","lacto ovo vegetarian","vegan","pescatarian","paleolithic","primal","fodmap friendly","whole 30","dairy free"];
        
    diets.forEach(diet => Diet.findOrCreate({where:{name:diet}}))
    
    const responseDb= await Diet.findAll();
    return res.json(responseDb);
})
module.exports = router;