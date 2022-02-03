const {
  GET_RECIPE,
  GET_DETAIL,
  GET_DIETS,
  FILTER_DIET,
  SEARCH_BY_NAME,
  SORT_RECIPES,
  SET_CURRENT_PAGE,
  ADD_NEW_RECIPE,
  RESET_DETAIL,
  SET_LOADING,
} = require("./actions_types");

const server = "http://localhost:3001";

const axios = require("axios");

export const getRecipes = () => {
  return async function (dispatch) {
    const recipe = await axios.get(`${server}/api/recipe`);
    dispatch({
      type: GET_RECIPE,
      payload: recipe.data,
    });
  };
};

export const myOwnRecipes = (newRecipe) => {
  
    
    return async function () {

      const response = await axios.post(`${server}/api/recipes`, newRecipe);
      return response
    }
      
    
    
};

export const getDetail = (id) => {
  return async function (dispatch) {
    try {
      let detail = await axios.get(`${server}/api/recipe/${id}`);
      console.log("detail:", detail.data);
      return dispatch({
        type: GET_DETAIL,
        payload: detail.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDiets = () => {
  return async function (dispatch) {
    const diets = await axios.get(`${server}/api/diets`);
    dispatch({
      type: GET_DIETS,
      payload: diets.data,
    });
  };
};

export const searchByName = (input) => {
  return async function (dispatch) {
    const searchName = await axios.get(`${server}/api/recipe?name=${input}`);
    dispatch({
      type: SEARCH_BY_NAME,
      payload: searchName.data,
    });
  };
};

export const setCurrentPage = (payload) => {
  return {
    type: SET_CURRENT_PAGE,
    payload,
  };
};

export const filterBy = (diet) => {
  return {
    type: FILTER_DIET,
    payload: diet,
  };
};
export const sortRecipes = (option) => {
  return {
    type: SORT_RECIPES,
    payload: option,
  };
};

export const resetDetail = () => {
  return {
    type: RESET_DETAIL,
  };
};
export const setLoading = (boolean) => {
  return {
    type: SET_LOADING,
    payload: boolean,
  };
};
