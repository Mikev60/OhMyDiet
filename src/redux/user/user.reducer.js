import userActionsTypes from './user.types'

const initialState = {
    currentUser: null,
    feedback: null, 
    preferences: null,
    favorites: []
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case userActionsTypes.SIGN_IN_SUCCESS:
            return {
                ...state, 
                currentUser: { email : action.payload.email, id: action.payload.id } ,
                feedback : {},
                preferences: {diet: action.payload.preferences.diet, maxCalories: action.payload.preferences.maxCalories},
                favorites: action.payload.favorites ? action.payload.favorites : [],
                weekPlan: action.payload.weekPlan
            }
        case userActionsTypes.SIGN_IN_FAILURE: 
            return {
                ...state, 
                feedback: action.payload
            }
        case userActionsTypes.SIGN_OUT_SUCCESS:
            return {
                ...state, 
                currentUser: null
            }
        case userActionsTypes.SET_PREFERENCES_SUCCESS:
            return {
                ...state, 
                preferences: { ...state.preferences, vegan: action.payload.vegan, vegetarian: action.payload.vegetarian, glutenFree: action.payload.glutenFree }
            }
        case userActionsTypes.SET_FAVORITE_SUCCESS:
            return {
                ...state, 
                favorites: action.payload
            }
        case userActionsTypes.ADD_PLAN_SUCCESS:
            return {
                ...state, 
                weekPlan: action.payload
            }
        default: 
            return state; 
    }
}

export default userReducer;