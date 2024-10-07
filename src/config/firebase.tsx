import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD1EhkwKcDKlebL38NhtyORyday3gHGGYA",
    authDomain: "appdevolucao.firebaseapp.com",
    databaseURL: "https://appdevolucao-default-rtdb.firebaseio.com",
    projectId: "appdevolucao",
    storageBucket: "appdevolucao.appspot.com",
    messagingSenderId: "1043595107065",
    appId: "1:1043595107065:web:76140a53a6de1139572028",
    measurementId: "G-BH0FNYN7VL"
};

const app = initializeApp(firebaseConfig);
initializeFirestore(app, {localCache: persistentLocalCache({tabManager: persistentMultipleTabManager()})})
export const auth = getAuth(app);
export const db = getFirestore(app);
