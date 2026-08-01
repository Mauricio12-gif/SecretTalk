import { db } from "./firebase.js";

import {
collection,
query,
where,
onSnapshot,
addDoc,
serverTimestamp
}
from
"https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";


// GET DATA FROM URL

const params = new URLSearchParams(window.location.search);

const conversationId = params.get("conversation");
const anonymousId = params.get("anonymous");
const username = params.get("user");
const mode = params.get("mode");



console.log("Conversation:", conversationId);
console.log("Anonymous:", anonymousId);
console.log("User:", username);
console.log("Mode:", mode);



let senderName;
let receiverName;



if(mode === "anonymous"){

senderName = anonymousId;
receiverName = username;

}
else{

senderName = username;
receiverName = anonymousId;

}



document.getElementById("chatTitle").innerHTML =
"Chat with " + receiverName;



// LOAD MESSAGES

const messagesQuery = query(

collection(db,"messages"),

where("conversationId","==",conversationId)

);



onSnapshot(messagesQuery,(snapshot)=>{


const chatBox =
document.getElementById("chatMessages");


chatBox.innerHTML = "";



if(snapshot.empty){

chatBox.innerHTML =
"No messages yet";

return;

}



let messages = [];



snapshot.forEach((doc)=>{

messages.push(doc.data());

});



// SORT BY TIME

messages.sort((a,b)=>{

if(!a.time || !b.time){

return 0;

}

return a.time.seconds - b.time.seconds;

});




messages.forEach((data)=>{


const mine =
data.sender === senderName;



chatBox.innerHTML += `

<div style="
display:flex;
justify-content:${mine ? "flex-end":"flex-start"};
margin:10px;
">


<div style="
background:${mine ? "#d1ffd6":"#ffeef5"};
padding:12px;
border-radius:15px;
max-width:70%;
">

<p>
${data.text}
</p>

<small>
${data.sender}
</small>

</div>


</div>

`;



});


});




// SEND MESSAGE

window.sendReply = async function(){


const replyBox =
document.getElementById("reply");


const message =
replyBox.value.trim();



if(message===""){

return;

}



await addDoc(

collection(db,"messages"),

{

text:message,

sender:senderName,

receiver:receiverName,

conversationId:conversationId,

time:serverTimestamp(),

anonymousId: anonymousId

}

);



replyBox.value="";

};
