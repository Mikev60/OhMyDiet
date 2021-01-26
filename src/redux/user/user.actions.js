import userActionsTypes from './user.types'


// Sign in
export const signInStart = (emailAndPassword) => ({
    type: userActionsTypes.SIGN_IN_START,
    payload: emailAndPassword
})
export const signInSuccess = (user) => ({
    type: userActionsTypes.SIGN_IN_SUCCESS,
    payload: user
})

export const signInFailure = (error) => ({
    type: userActionsTypes.SIGN_IN_FAILURE,
    payload: error
})

//Check session
export const checkUserSession = () => ({
    type: userActionsTypes.CHECK_USER_SESSION
})

//Sign out 
export const signOutStart = () => ({
    type: userActionsTypes.SIGN_OUT_START
})
export const signOutSuccess = () => ({
    type: userActionsTypes.SIGN_OUT_SUCCESS
})
export const signOutFailure = (error) => ({
    type: userActionsTypes.SIGN_OUT_FAILURE,
    payload: error
})

//Set Preferences
export const setPreferencesStart = (preferences) => {
    console.log('action')
    return {
    type: userActionsTypes.SET_PREFERENCES_START, 
    payload: preferences
}};
export const setPreferencesSuccess = (preferences) => ({
    type: userActionsTypes.SET_PREFERENCES_SUCCESS,
    payload: preferences
})
export const setPreferencesFailure = (error) => ({
    type: userActionsTypes.SET_PREFERENCES_FAILURE, 
    payload: error
})

//SetFavorites 
export const setFavoriteStart = (idRecipe) => ({
    type: userActionsTypes.SET_FAVORITE_START,
    payload: idRecipe
})
export const setFavoriteSuccess = (idRecipe) => ({
    type: userActionsTypes.SET_FAVORITE_SUCCESS,
    payload: idRecipe
})
export const setFavoriteFailure = (error) => ({
    type: userActionsTypes.SET_FAVORITE_FAILURE,
    payload: error
})

//Add plan to profile
export const addPlanStart = (plan) => ({
    type: userActionsTypes.ADD_PLAN_START,
    payload: plan
})
export const addPlanSuccess = (plan) => ({
    type: userActionsTypes.ADD_PLAN_SUCCESS,
    payload: plan
})