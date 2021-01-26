import { takeLatest, all, call, put } from 'redux-saga/effects';
import userActionsTypes from './user.types';
import { auth, firestore } from '../../utils/firebase';
import {
	signInSuccess,
	signInFailure,
	signOutFailure,
	signOutSuccess,
	setPreferencesSuccess,
	setFavoriteSuccess,
	addPlanSuccess
} from './user.actions';
import { initializeCart } from '../cart/cart.actions';

//Sign in
export function* onSignInStart() {
	yield takeLatest(userActionsTypes.SIGN_IN_START, signIn);
}

export function* signIn({ payload: { email, password, isSigningUp } }) {
	try {
		const { user } = yield isSigningUp
			? auth.createUserWithEmailAndPassword(email, password)
			: auth.signInWithEmailAndPassword(email, password);
		const userRef = yield firestore.doc(`users/${user.uid}`);
		const snapshot = yield userRef.get();
		if (!snapshot.exists) {
			yield userRef.set({ email });
		}
		yield put(signInSuccess({ id: user.uid, ...snapshot.data() }));
		const userRefCart = yield firestore.doc(`carts/${user.uid}`);
		const snapshotCart = yield userRefCart.get();
		if (!snapshotCart.exists) {
			yield console.log('cart does not exist');
			yield put(initializeCart([]));
		} else {
			yield console.log('it exists');
			yield put(initializeCart(snapshotCart.data()));
		}
	} catch (error) {
		yield console.log(error);
		yield put(signInFailure({ type: 'error', message: error.message }));
	}
}

//Check session state
export function* onCheckUserSession() {
	yield takeLatest(userActionsTypes.CHECK_USER_SESSION, isAuth);
}

export function* isAuth() {
	const userAuth = auth.currentUser;
	if (!userAuth) {
		return;
	}
	yield getSnapshotFromUserAuth(userAuth);
}

export function* getSnapshotFromUserAuth(userAuth) {
	try {
		const userRef = yield firestore.doc(`users/${userAuth.uid}`);
		const snapshot = yield userRef.get();
		yield put(signInSuccess({ id: snapshot.id, ...snapshot.data() }));
		const userRefCart = yield firestore.doc(`carts/${userAuth.uid}`);
		const snapshotCart = yield userRefCart.get();
		if (!snapshotCart.exists) {
			yield console.log('cart does not exist');
			yield put(initializeCart([]));
		} else {
			yield console.log('it exists');
			yield put(initializeCart(snapshotCart.data()));
		}
	} catch (error) {
		yield put(signInFailure(error));
	}
}

//Sign out
export function* onSignOutStart() {
	yield takeLatest(userActionsTypes.SIGN_OUT_START, signOut);
}

export function* signOut() {
	try {
		yield auth.signOut();
		yield put(signOutSuccess());
	} catch (error) {
		console.log(error);
		yield put(signOutFailure(error));
	}
}

//Set preferences
export function* onSetPreferencesSTart() {
	yield takeLatest(userActionsTypes.SET_PREFERENCES_START, setPreferences);
}

export function* setPreferences(preferences) {
	try {
		const currentUser = yield auth.currentUser;
		if (!currentUser) {
			return;
		}
		const userRef = yield firestore.doc(`users/${currentUser.uid}`);
		userRef.set(preferences.payload, { merge: true });
		yield put(setPreferencesSuccess(preferences.payload));
	} catch (error) {
		console.log(error);
	}
}

//Set favorite
export function* onSetFavoriteStart() {
	yield takeLatest(userActionsTypes.SET_FAVORITE_START, setFavorite);
}
export function* setFavorite(favorites) {
	try {
		const currentUser = auth.currentUser;
		const userRef = yield firestore.doc(`users/${currentUser.uid}`);
		userRef.set({ favorites: favorites.payload }, { merge: true });
		yield put(setFavoriteSuccess(favorites.payload));
	} catch (error) {
		console.log(error);
	}
}

//Add plan to profile
export function* onAddPlanStart() {
	yield takeLatest(userActionsTypes.ADD_PLAN_START, addPlan);
}

export function* addPlan(payload) {
	yield console.log(payload)
	try {
		const currentUser = auth.currentUser;
		const userRef = yield firestore.doc(`users/${currentUser.uid}`);
		userRef.set({ weekPlan: payload.payload }, { merge: true });
		yield put(addPlanSuccess(payload.payload));
	} catch (error) {
		console.log(error);
	}
}

//Export général
export function* userSagas() {
	yield all([
		call(onSignInStart),
		call(onSignOutStart),
		call(onCheckUserSession),
		call(onSetPreferencesSTart),
		call(onSetFavoriteStart),
		call(onAddPlanStart)
	]);
}
