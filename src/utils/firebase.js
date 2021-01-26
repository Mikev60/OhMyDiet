import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyAeby_d8xn2eB9e04E97Nr24NvaIepLEAA',
	authDomain: 'ohmydiet-2d93f.firebaseapp.com',
	projectId: 'ohmydiet-2d93f',
	storageBucket: 'ohmydiet-2d93f.appspot.com',
	messagingSenderId: '675615757599',
	appId: '1:675615757599:web:54f5ad4f2d37d206698c2a'
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
