import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDNIG6Ylja2TWba1Kb2b9UfxVsuC9pPrCw",
    authDomain: "discord-project-rpg.firebaseapp.com",
    projectId: "discord-project-rpg",
    storageBucket: "discord-project-rpg.appspot.com",
    messagingSenderId: "982032587701",
    appId: "1:982032587701:web:1dc31fe453b3085f4157fc"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };