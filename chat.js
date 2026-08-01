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



// GET CHAT DETAILS FROM LINK

const params = new URLSearchParams(window.location.search);


const conversationId = params.get("conversation");

const anonymousId = params.get("anonymous");

const receiver = params.get("user");
const mode = params.get("mode");

let senderName;


if(mode === "anonymous"){

senderName = anonymousId;

}
else{

senderName = receiver;

}



document.getElementById("chatTitle").innerHTML =
anonymousId || "Anonymous";




// LOAD CHAT MESSAGES

const messagesQuery = query(

collection(db,"messages"),

where("conversationId","==",conversationId)

);



onSnapshot(messagesQuery,(snapshot)=>{


const chatBox =
document.getElementById("chatMessages");


chatBox.innerHTML = "";


snapshot.forEach((doc)=>{


const data = doc.data();


chatBox.innerHTML += `

<div style="
background:#ffeef5;
padding:10px;
margin:10px;
border-radius:15px;
">

${data.text}

<br>

<small>
${data.sender}
</small>

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

sender: receiver,

receiver: anonymousId,

conversationId: conversationId,

time: serverTimestamp()

  }

);


replyBox.value="";


};
