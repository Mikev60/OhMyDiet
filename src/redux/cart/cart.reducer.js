import cartActionsTypes from './cart.types';

const initialState = {
	cart: []
};

const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case cartActionsTypes.INITIALIZE_CART:
			return {
				...state,
				cart: action.payload
			};
		case cartActionsTypes.ADD_ITEM_TO_CART_SUCCESS:
			return {
				...state,
				cart: {
					...state.cart,
					items: action.payload
				}
			};
		default:
			return state;
	}
};

export default cartReducer;
