import { db } from "./firebase.js";


import {

collection,

addDoc,

serverTimestamp

} from 
"https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";



window.sendMessage = async function(){


const messageBox = document.getElementById("message");

const status = document.getElementById("status");


const message = messageBox.value.trim();
  const receiver = "Mauricio";



if(message === ""){


alert("Write a message first");

return;


}



try{


await addDoc(

collection(db,"messages"),

{


text: message,


time: serverTimestamp()


}

);



status.innerHTML = 
"Message sent ❤️";


messageBox.value = "";


}


catch(error){


console.log(error);


status.innerHTML =
"Failed to send ❌";


}



};
