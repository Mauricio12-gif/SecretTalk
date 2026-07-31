import { db } from "./firebase.js";


import {

collection,

onSnapshot,

query,

orderBy

} from 
"https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";



const messagesDiv = document.getElementById("messages");



const messagesQuery = query(

collection(db,"messages"),

orderBy("time","desc")

);



onSnapshot(messagesQuery,(snapshot)=>{


messagesDiv.innerHTML = "";


if(snapshot.empty){

messagesDiv.innerHTML = 
"No messages yet";

return;

}



snapshot.forEach((doc)=>{


const data = doc.data();



messagesDiv.innerHTML += `

<div style="
background:#ffeef5;
padding:15px;
margin:10px;
border-radius:15px;
">

<p>${data.text}</p>

<small>Anonymous</small>

</div>

`;



});


});
