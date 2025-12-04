import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyB4BXlJOEY33NVqAIJYri6u2qvso3t1ShY",
    authDomain: "portfolio-scoreboard.firebaseapp.com",
    projectId: "portfolio-scoreboard",
    storageBucket: "portfolio-scoreboard.firebasestorage.app",
    messagingSenderId: "1085075454082",
    appId: "1:1085075454082:web:ff663940e1a5623df7dc9b",
    measurementId: "G-0JDWZ1D9PJ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
