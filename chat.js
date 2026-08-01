import { db } from "./firebase.js";


import {
collection,
query,
where,
orderBy,
onSnapshot,
addDoc,
serverTimestamp
}
from
"https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";



// GET CHAT DETAILS FROM LINK

const params = new URLSearchParams(window.location.search);


const conversationId = params.get("conversation");

const anonymousId = params.get("anonymous");

const receiver = params.get("user");

const mode = params.get("mode");



let senderName;
let receiverName;



// DECIDE WHO IS CHATTING

if(mode === "anonymous"){

senderName = anonymousId;

receiverName = receiver;

}
else{

senderName = receiver;

receiverName = anonymousId;

}





document.getElementById("chatTitle").innerHTML =
"Chat with " + receiverName;





// LOAD CHAT MESSAGES

const messagesQuery = query(

collection(db,"messages"),

where("conversationId","==",conversationId),

orderBy("time","asc")

);



onSnapshot(messagesQuery,(snapshot)=>{


const chatBox =
document.getElementById("chatMessages");


chatBox.innerHTML = "";



snapshot.forEach((doc)=>{


const data = doc.data();



const mine =
data.sender === senderName;



chatBox.innerHTML += `

<div style="
display:flex;
justify-content:${mine ? "flex-end" : "flex-start"};
margin:10px;
">


<div style="
background:${mine ? "#d1ffd6" : "#ffeef5"};
padding:12px;
border-radius:15px;
max-width:70%;
">


<p style="margin:0;">
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






// SEND REPLY

window.sendReply = async function(){


const replyBox =
document.getElementById("reply");


const reply =
replyBox.value.trim();



if(reply===""){

return;

}



await addDoc(

collection(db,"messages"),

{

text: reply,


sender: senderName,


receiver: receiverName,


conversationId: conversationId,


time: serverTimestamp()

}

);



replyBox.value = "";



};
