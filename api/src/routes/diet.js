const { Router } = require('express');
const { loadDiets } = require('../controllers/diets')
const router = Router();



router.get('/', async (req, res, next) => {
    try {
        loadDiets(res)
    } catch (error) {
        next(error);
    }
})

module.exports = router;