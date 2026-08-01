import { db } from "./firebase.js";

import {

collection,

onSnapshot,

query,

orderBy,

where

} from
"https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";



const messagesDiv = document.getElementById("messages");



const params = new URLSearchParams(window.location.search);

const username = params.get("user") || "Mauricio";



const messagesQuery = query(

collection(db,"messages"),

where("receiver","==",username),

orderBy("time","desc")

);



onSnapshot(messagesQuery,(snapshot)=>{


messagesDiv.innerHTML =

"<h2>Inbox for " + username + "</h2>";



if(snapshot.empty){

messagesDiv.innerHTML +=

"<p>No messages yet</p>";

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
