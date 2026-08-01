import { db } from "./firebase.js";

import {
    collection,
    query,
    where,
    onSnapshot
} from 
"https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";



window.loadMessages = function(){


const username = document
.getElementById("username")
.value
.trim();



const messagesDiv = document
.getElementById("messages");


const profileLink = document
.getElementById("profileLink");



if(username === ""){


messagesDiv.innerHTML =
"Enter your username first";


return;

}




profileLink.innerHTML = `

<h3>Your SecretTalk Link:</h3>

<p>

${window.location.origin}/SecretTalk/?user=${username}

</p>

`;




const messagesQuery = query(

collection(db,"messages"),

where("receiver","==",username)

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

<small>
Anonymous
</small>

</div>

`;



});


});


};
