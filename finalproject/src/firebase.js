import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCvV21EcIcD61DpyaveKENEmAP2ajyS0M",
  authDomain: "todoapp-e31f2.firebaseapp.com",
  projectId: "todoapp-e31f2",
  storageBucket: "todoapp-e31f2.appspot.com",
  messagingSenderId: "1016239800364",
  appId: "1:1016239800364:web:cebf9f634d6ef8a3d85189",
  measurementId: "G-9YJD4VPNVT"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();
