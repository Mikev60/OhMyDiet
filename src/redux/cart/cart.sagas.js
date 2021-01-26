import { takeLatest, all, call, put } from 'redux-saga/effects';
import cartActionsTypes from './cart.types';
import { auth, firestore } from '../../utils/firebase';
import { addItemsToCartSuccess } from './cart.actions'

//Add to cart
export function* onAddItemsToCartStart() {
	yield takeLatest(cartActionsTypes.ADD_ITEM_TO_CART_START, addItemsToCart);
}
export function* addItemsToCart(items) {
	try {
		const currentUser = auth.currentUser;
        const userRef = yield firestore.doc(`carts/${currentUser.uid}`);
        yield userRef.set({items: items.payload}, { merge: true})
        yield put(addItemsToCartSuccess(items.payload))
	} catch (error) {
		console.log(error);
	}
}

//Remove from cart
export function* onRemoveItemFromCart(){
	yield takeLatest(cartActionsTypes.REMOVE_ITEM_FROM_CART_START, removeItemFromCart)
}

export function* removeItemFromCart(payload) {
	try {
		const currentUser = auth.currentUser;
        const userRef = yield firestore.doc(`carts/${currentUser.uid}`);
		yield userRef.set({items: payload.payload}, { merge: true})
		yield put(addItemsToCartSuccess(payload.payload))
	} catch (error) {
		console.log(error);
	}
}

//Export général
export function* cartSagas() {
	yield all([call(onAddItemsToCartStart), call(onRemoveItemFromCart)]);
}
