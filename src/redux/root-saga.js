import { userSagas } from './user/user.sagas'
import { cartSagas } from './cart/cart.sagas'

import { all, call } from 'redux-saga/effects'

export default function* rootSagas() {
   yield all([call(userSagas), call(cartSagas)])
}