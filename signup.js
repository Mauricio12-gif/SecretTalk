import { db } from "./firebase.js";

import {
collection,
addDoc,
serverTimestamp
}
from
"https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";


window.createAccount = async function(){

const username =
document.getElementById("username").value.trim();

const password =
document.getElementById("password").value.trim();

const status =
document.getElementById("status");


if(username === "" || password === ""){

status.innerHTML =
"Fill all fields";

return;

}


try{

await addDoc(

collection(db,"users"),

{

username: username,

password: password,

createdAt: serverTimestamp()

}

);

status.innerHTML =
"Account created successfully ❤️";


setTimeout(()=>{

window.location.href = "login.html";

},1500);

}

catch(error){

console.log(error);

status.innerHTML =
error.message;

}

};
