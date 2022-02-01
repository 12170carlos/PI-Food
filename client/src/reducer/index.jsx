import {

    GET_RECIPE,
    GET_DETAIL,
    GET_DIETS,
    FILTER_DIET,
    SEARCH_BY_NAME,
    SORT_RECIPES,
    SET_CURRENT_PAGE,
    ADD_NEW_RECIPE,
    SET_LOADING,
    RESET_DETAIL
} from "../actions/actions_types";

const initialState = {
    allRecipes: [],
    diets: [],
    recipes: [],
    detailed: {},
    myOwnRecipes: [],
    loading: true,
    currentPage: 1
};

export default function rootReducer (state = initialState, action)  {
    switch (action.type) {
        case GET_RECIPE:
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload,
            };
        case GET_DETAIL:
            return {
                ...state,
                detailed: action.payload,
            }
        case GET_DIETS:
            return {
                ...state,
                diets: action.payload,
            }
        case SEARCH_BY_NAME:
            if (!action.payload.length) {
                return {
                    ...state,
                    allRecipes: "WE CAN'T FOUND RESULTS, CHECK AGAIN"
                }
            }else{

                return {
                    ...state,
                    allRecipes: action.payload,
                }
            }
        case ADD_NEW_RECIPE:
            return {
                ...state,
                myOwnRecipes:[...state.myOwnRecipes, action.payload],
                
            }
        case FILTER_DIET:
            let newRecipe = [];
            if (action.payload === "all"){

                return {
                    ...state,
                    allRecipes: state.recipes
                }
            }
            state.recipes.forEach(diet => {
                if (diet.diets.includes(action.payload)){
                    newRecipe.push(diet)
                }
            })
            return {
                ...state,
                allRecipes: newRecipe
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload,
            }
        case SORT_RECIPES:
            let sorted = [...state.recipes];
            let options = {
                "a-z": function(a,b) { return new Intl.Collator().compare(a.name,b.name)},//equivale a LocalCompare pero para grandes matrices
                "z-a": function(a,b) { return new Intl.Collator().compare(b.name,a.name)},
                "0-100": function(a,b) { return a.score - b.score},
                "100-0": function(a,b) { return b.score - a.score},
            }
            sorted.sort((a,b) => options[action.payload](a,b))

            return {
                ...state,
                allRecipes:sorted
            }
            case SET_LOADING:
                return {
                    ...state,
                    loading: action.payload,
                }
            case RESET_DETAIL:
                return {
                    ...state,
                    detailed:{}
                }
        default:
            return state;


    }
}



