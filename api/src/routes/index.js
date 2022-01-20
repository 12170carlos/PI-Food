const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipeRouter = require('./recipe.js');
const recipesRouter = require('./recipes');
const dietRouter = require('./diet.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipe', recipeRouter);
router.use("/recipes", recipesRouter);
router.use("/diets", dietRouter)


module.exports = router;
