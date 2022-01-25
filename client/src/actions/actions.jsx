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
    SET_LOADING
} = require('./actions_types');

const axios = require('axios');

export const getRecipes = () => {
    return async function (dispatch) {
        const recipe = await axios.get("http://localhost:3001/api/recipe");
        dispatch({
            type: GET_RECIPE,
            payload: recipe.data,
        })
    }
}

export const myOwnRecipes = (newRecipe) => {
    return async function(dispatch) {
        const response = await axios.post('http://localhost:3001/api/recipes', newRecipe);
        newRecipe.id = response.data.id;
        dispatch({
            type: ADD_NEW_RECIPE,
            payload: newRecipe,
        })
        alert(response.data.message);
    }
}

export const getDetail = (id) => {
    return async function (dispatch) {
        const detail = await axios.get(`http://localhost:3001/recipe/${id}`);
        dispatch({
            type: GET_DETAIL,
            payload: detail.data,
        })

    }
}

export const getDiets = () => {
    return async function (dispatch) {
        const diets = await axios.get("http://localhost:3001/api/diets");
        dispatch({
            type: GET_DIETS,
            payload: diets.data,
        })
    }
}


export const searchByName = (name) => {
    return async function (dispatch) {
        const searchName = await axios.get(`http://localhost:3001/recipe?name=${name}`);
        dispatch({
            type: SEARCH_BY_NAME,
            payload:searchName.data,
        })
    }
}

export const setCurrentPage = (payload) => {
    return {
        type: SET_CURRENT_PAGE,
        payload,
    }
}

export const filterBy = (diet) => {
    return {
        type: FILTER_DIET,
        payload: diet,
    }
}
export const sortRecipes = (option) => {
    return {
        type: SORT_RECIPES,
        payload: option,
    }
}

export const resetDetail =() => {
    return {
        type: RESET_DETAIL,
    }
}
export const setLoading =(boolean) => {
    return {
        type: SET_LOADING,
        payload: boolean,
    }
}