import { initializeApp } from 
"https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";


import { getFirestore } from 
"https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";



const firebaseConfig = {

apiKey: "AIzaSyDWoOntz_Xgz1nxgSwjg9M86WmtJfn9Bmo",

authDomain: "secrettalk-d6fe6.firebaseapp.com",

projectId: "secrettalk-d6fe6",

storageBucket: "secrettalk-d6fe6.firebasestorage.app",

messagingSenderId: "273110228571",

appId: "1:273110228571:web:5ffc4fa713c4b6fc9fa97e"

};



const app = initializeApp(firebaseConfig);



const db = getFirestore(app);



export { db };
