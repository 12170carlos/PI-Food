require('dotenv').config();
const {API_KEY} = process.env;
const axios = require('axios');
const { Diet } = require('../db')

const getDiets = async() => {
    const ask = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`);
    const diets = await ask.data.results.map( d => d.diets).flat(1);
    let moods = [];
    diets ? moods = moods.concat(diets) : false
    return [... new Set(diets)]
}


const loadDiets = async(res) => {
    try {
       let moodsDb = await Diet.findAll();
       if (!moodsDb || !moodsDb.length) {
           moodsDb = await getDiets();
           for(let mood of moodsDb) {
               await Diet.findOrCreate({
                   where: {name: mood}
               })
           }
       } 
       return res.send(moodsDb)
    } catch (error) {
      console.log(error)  
    }
}
module.exports = {
    loadDiets,
}