// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAagT_-kFKPYxsZRgoAAet26GoAQ8WA68s",
  authDomain: "community-24ed8.firebaseapp.com",
  projectId: "community-24ed8",
  storageBucket: "community-24ed8.appspot.com",
  messagingSenderId: "235727764075",
  appId: "1:235727764075:web:e7aaa0dc1ea4fe1ae14f2e"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db =getFirestore(app)
