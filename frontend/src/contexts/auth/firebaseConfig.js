import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
 
const firebaseConfig = {
  apiKey: "AIzaSyBWo1G2hi3r3tp4osUZg_b9Pq9woz-2s_s",
  authDomain: "badbankcap.firebaseapp.com",
  projectId: "badbankcap",
  storageBucket: "badbankcap.appspot.com",
  messagingSenderId: "354116981958",
  appId: "1:354116981958:web:62403c2fff23a64b8d73c7",
  measurementId: "G-ZQ2ZRR6WEV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const user = auth.currentUser;

const firebase = {
    signup: (email, password) => createUserWithEmailAndPassword(auth, email, password),
    login: (email, password) => signInWithEmailAndPassword(auth, email, password),
    logout: () => signOut(auth),
    getCurrentUser: callback => onAuthStateChanged(auth, user => callback(user))
}

export default firebase;