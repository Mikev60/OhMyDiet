import cartActionsTypes from './cart.types'

//Initializes cart when log in
export const initializeCart = (cart) => ({
    type: cartActionsTypes.INITIALIZE_CART,
    payload: cart
})

//Add to cart
export const addItemsToCartStart = (items) => ({
    type: cartActionsTypes.ADD_ITEM_TO_CART_START,
    payload: items
})
export const addItemsToCartSuccess = (newCart) => ({
    type: cartActionsTypes.ADD_ITEM_TO_CART_SUCCESS,
    payload: newCart
})
export const addItemsToCartFailure = (error) => ({
    type: cartActionsTypes.ADD_ITEM_TO_CART_FAILURE,
    payload: error
})

//Delete from cart
export const removeItemFromCartStart = (item) => ({
    type: cartActionsTypes.REMOVE_ITEM_FROM_CART_START,
    payload: item
})
export const removeItemFromCartSuccess = (newCart) => ({
    type: cartActionsTypes.REMOVE_ITEM_FROM_CART_SUCCESS,
    payload: newCart
})
export const removeItemFromCart = (error) => ({
    type: cartActionsTypes.REMOVE_ITEM_FROM_CART_FAILURE,
    payload: error
})