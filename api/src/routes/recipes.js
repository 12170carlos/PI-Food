
const { Router } = require('express');
const router = Router();
const { createdRecipe } = require('../controllers/recipePost')

router.post('/', async (req, res) => {
    createdRecipe(req, res)
})
module.exports = router;