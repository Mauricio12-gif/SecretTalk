import { initializeApp } from 
"https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";

import { getFirestore } from 
"https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";


const firebaseConfig = {

apiKey: "AIzaSyBddxUw5KyerputaYh_18LITHNv7hlYKFk",

authDomain: "secrettalk-16d0c.firebaseapp.com",

projectId: "secrettalk-16d0c",

storageBucket: "secrettalk-16d0c.firebasestorage.app",

messagingSenderId: "406309368955",

appId: "1:406309368955:web:dd763364724ebc54d15ede"

};


const app = initializeApp(firebaseConfig);


const db = getFirestore(app);


export { db };
