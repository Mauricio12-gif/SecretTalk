import { auth, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword
} from 
"https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";

import {
    doc,
    setDoc
} from
"https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";



window.signup = async function(){


const username = document
.getElementById("username")
.value
.trim();


const email = document
.getElementById("email")
.value
.trim();


const password = document
.getElementById("password")
.value
.trim();


const status = document
.getElementById("status");



if(username === "" || email === "" || password === ""){

    status.innerHTML =
    "Fill all fields";

    return;

}



try{


const userCredential =
await createUserWithEmailAndPassword(
    auth,
    email,
    password
);



const user = userCredential.user;



await setDoc(

doc(db,"users",user.uid),

{

username: username,

email: email,

createdAt: new Date()

}

);



status.innerHTML =
"Account created successfully ❤️";



console.log("User created:", user.uid);



}


catch(error){


console.log(error);


status.innerHTML =
error.message;


}


};
