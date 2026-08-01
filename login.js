import { auth } from "./firebase.js";

import {
signInWithEmailAndPassword
}
from
"https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";


async function login(){

const email =
document.getElementById("email").value.trim();

const password =
document.getElementById("password").value.trim();

const status =
document.getElementById("status");


try{

await signInWithEmailAndPassword(
auth,
email,
password
);

status.innerHTML =
"Login successful ❤️";

window.location.href =
"receiver.html";

}

catch(error){

status.innerHTML =
error.message;

console.log(error);

}

}


document
.getElementById("loginButton")
.addEventListener("click", login);
