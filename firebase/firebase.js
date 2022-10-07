// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDNIG6Ylja2TWba1Kb2b9UfxVsuC9pPrCw",
    authDomain: "discord-project-rpg.firebaseapp.com",
    projectId: "discord-project-rpg",
    storageBucket: "discord-project-rpg.appspot.com",
    messagingSenderId: "982032587701",
    appId: "1:982032587701:web:1dc31fe453b3085f4157fc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };