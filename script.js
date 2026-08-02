import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from 
"https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";



// GET RECEIVER FROM LINK

const params = new URLSearchParams(window.location.search);

const receiver = params.get("user");



if(!receiver){

document.getElementById("status").innerHTML =
"Invalid SecretTalk link ❌";

throw new Error("No receiver found");

}





// CREATE UNIQUE SESSION PER RECEIVER

const sessionKey = 
"secretTalk_" + receiver;



let session =
JSON.parse(localStorage.getItem(sessionKey));



let anonymousId;
let conversationId;



if(session){


anonymousId = session.anonymousId;

conversationId = session.conversationId;


}
else{


anonymousId =
"Anonymous #" +
Math.floor(1000 + Math.random() * 9000);



conversationId =
Date.now().toString();



session = {

anonymousId: anonymousId,

conversationId: conversationId

};



localStorage.setItem(

sessionKey,

JSON.stringify(session)

);


}




console.log("Anonymous:", anonymousId);

console.log("Conversation:", conversationId);








// SHOW RECEIVER NAME


const receiverName =
document.getElementById("receiverName");



if(receiverName){


receiverName.innerHTML =

"Send " + receiver + " an anonymous message";


}








// SEND MESSAGE


window.sendMessage = async function(){



const messageBox =
document.getElementById("message");



const status =
document.getElementById("status");



const message =
messageBox.value.trim();





if(message === ""){


alert("Write a message first");


return;


}





try{



await addDoc(

collection(db,"messages"),


{


text: message,


sender: anonymousId,


receiver: receiver,


anonymousId: anonymousId,


conversationId: conversationId,


time: serverTimestamp()


}


);





status.innerHTML =


"Message sent ❤️ <br><br>" +


`

<button onclick="continueChat()">

Continue chatting

</button>

`;





messageBox.value="";



}



catch(error){



console.log(error);



status.innerHTML =
"Failed to send ❌";


}



};









// CONTINUE CHAT


window.continueChat = function(){



window.location.href =


"chat.html?conversation="

+ conversationId


+ "&anonymous="

+ encodeURIComponent(anonymousId)


+ "&user="

+ encodeURIComponent(receiver)


+ "&mode=anonymous";



};









// SERVICE WORKER


if ("serviceWorker" in navigator) {


navigator.serviceWorker.register("service-worker.js")

.then(()=>{


console.log("SecretTalk app ready");


});


}
