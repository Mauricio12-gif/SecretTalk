import { db } from "./firebase.js";

import {
collection,
onSnapshot
} from 
"https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";


const messagesDiv = document.getElementById("messages");


onSnapshot(collection(db,"messages"),(snapshot)=>{


messagesDiv.innerHTML = "";


snapshot.forEach((doc)=>{


const data = doc.data();


messagesDiv.innerHTML += `

<div>

<p>${data.text}</p>

<small>${data.receiver || "No receiver"}</small>

</div>

`;

});


});
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
