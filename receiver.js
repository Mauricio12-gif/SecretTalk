import { db } from "./firebase.js";


import {
collection,
query,
where,
onSnapshot
}
from
"https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";



// GET LOGGED IN USER

const username = localStorage.getItem("username");



if(!username){

window.location.href = "login.html";

}




// SHOW WELCOME

document.getElementById("welcome").innerHTML =
"Welcome " + username + " 👋";






// CREATE USER LINK

const link =

window.location.origin +

"/SecretTalk/?user=" +

encodeURIComponent(username);



document.getElementById("myLink").innerHTML = link;






// COPY LINK

window.copyLink = function(){


const link =
document.getElementById("myLink").innerText;


navigator.clipboard.writeText(link);


alert("Link copied ❤️");


};






// SHARE LINK

window.shareLink = function(){


const link =
document.getElementById("myLink").innerText;


const message =
"Send me an anonymous message on SecretTalk 💌\n\n"
+ link;



const whatsappURL =

"https://wa.me/?text="

+ encodeURIComponent(message);



window.open(
whatsappURL,
"_blank"
);



};







// LOAD MESSAGES

const messagesQuery = query(

collection(db,"messages"),

where("receiver","==",username)

);





onSnapshot(messagesQuery,(snapshot)=>{


const messagesDiv =
document.getElementById("messages");


messagesDiv.innerHTML = "";



if(snapshot.empty){


messagesDiv.innerHTML =
"No messages yet";


return;


}





const chats = {};





snapshot.forEach((doc)=>{


const data = doc.data();


const id = data.anonymousId;



if(!chats[id]){


chats[id] = {


anonymousId:id,


conversationId:data.conversationId,


lastMessage:data.text,


time:data.time


};


}

else{


chats[id].lastMessage =
data.text;


chats[id].time =
data.time;


}


});







Object.values(chats).forEach((chat)=>{



messagesDiv.innerHTML += `


<div class="message-card">


<h3>

${chat.anonymousId}

</h3>


<p>

${chat.lastMessage}

</p>



<button onclick="openChat(
'${chat.conversationId}',
'${chat.anonymousId}'
)">

Open Chat

</button>


</div>


`;



});



});










// OPEN CHAT

window.openChat = function(conversationId, anonymousId){



window.location.href =

"chat.html?conversation="

+ conversationId

+ "&anonymous="

+ encodeURIComponent(anonymousId)

+ "&user="

+ encodeURIComponent(username);



};








// LOGOUT

window.logout = function(){


localStorage.removeItem("username");


window.location.href =
"home.html";


};
