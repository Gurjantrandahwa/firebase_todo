import {initializeApp} from "firebase/app";
import {getDatabase} from "firebase/database";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyApoJ9BqjCVThqjh9Q7WGmxTJDx7AzZHmg",
    authDomain: "to-do-list-96fef.firebaseapp.com",
    databaseURL: "https://to-do-list-96fef-default-rtdb.firebaseio.com",
    projectId: "to-do-list-96fef",
    storageBucket: "to-do-list-96fef.appspot.com",
    messagingSenderId: "576036197013",
    appId: "1:576036197013:web:bd9f89e19759890c3ec19c"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();