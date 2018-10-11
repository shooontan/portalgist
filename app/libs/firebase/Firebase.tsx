import getConfig from 'next/config';
import firebase from 'firebase/app';
import 'firebase/auth';

const { publicRuntimeConfig: prc } = getConfig();

const config = {
  apiKey: process.env.FIREBASE_API_KEY || prc.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || prc.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL || prc.FIREBASE_DATABASE_URL,
  messagingSenderId:
    process.env.FIREBASE_MESSAGING_SENDER_ID ||
    prc.FIREBASE_MESSAGING_SENDER_ID,
  projectId: process.env.FIREBASE_PROJECT_ID || prc.FIREBASE_PROJECT_ID,
  storageBucket:
    process.env.FIREBASE_STORAGE_BUCKET || prc.FIREBASE_STORAGE_BUCKET,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default firebase;
