import { auth, db } from "./firebase.js";

import {
onAuthStateChanged,
signOut
} from
"https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";


import {
doc,
getDoc,
collection,
query,
where,
onSnapshot
} from
"https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";



onAuthStateChanged(auth, async (user)=>{


if(!user){

window.location.href = "login.html";

return;

}



console.log("Logged in UID:", user.uid);



try{


const userDoc = await getDoc(
doc(db,"users",user.uid)
);



if(!userDoc.exists()){

document.getElementById("messages").innerHTML =
"User profile not found";

return;

}



const userData = userDoc.data();



console.log("User data received:", userData);



const username = userData.username?.trim();



console.log("Username:", username);



if(!username){

document.getElementById("messages").innerHTML =
"Username missing in profile";

return;

}



document.getElementById("welcome").innerHTML =
"Welcome " + username + " 👋";



const link =

window.location.origin +

"/SecretTalk/?user=" +

encodeURIComponent(username);



document.getElementById("myLink").innerHTML = link;



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



// GROUP MESSAGES BY ANONYMOUS USER

const chats = {};



snapshot.forEach((doc)=>{


const data = doc.data();


const id = data.anonymousId;



if(!id){

return;

}



if(!chats[id]){


chats[id] = {


anonymousId: id,


conversationId: data.conversationId,


lastMessage: data.text,


time: data.time


};


}
else{


chats[id].lastMessage = data.text;


chats[id].conversationId = data.conversationId;


}


});





// DISPLAY CHAT FOLDERS


Object.values(chats).forEach((chat)=>{


messagesDiv.innerHTML += `

<div style="
background:#ffeef5;
padding:15px;
margin:10px;
border-radius:15px;
">


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


}


catch(error){


console.log("ERROR:", error);


document.getElementById("messages").innerHTML =

"Error: " + error.message;


}


});




// LOGOUT

window.logout = async function(){


try{


await signOut(auth);


window.location.href = "home.html";


}


catch(error){


console.log(error);


alert("Logout failed");


}


};





// OPEN CHAT AS ACCOUNT OWNER

window.openChat = function(conversationId, anonymousId){



const username =

document.getElementById("welcome")
.innerText
.replace("Welcome ","")
.replace(" 👋","");



window.location.href =

"chat.html?conversation="

+ conversationId

+ "&anonymous="

+ encodeURIComponent(anonymousId)

+ "&user="

+ encodeURIComponent(username)

+ "&mode=owner";


};
