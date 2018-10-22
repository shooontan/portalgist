import getConfig from 'next/config';
import firebase from 'firebase/app';
import 'firebase/auth';

const { publicRuntimeConfig: prc } = getConfig();

const config = {
  apiKey: process.env.FIREBASE_API_KEY || prc.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || prc.FIREBASE_AUTH_DOMAIN,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default firebase;
