import { auth, db } from "./firebase.js";

import {
onAuthStateChanged
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


console.log("Logged in:", user.uid);



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


console.log("User data:", userData);



const username = userData.username;



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


}

catch(error){

console.log(error);

document.getElementById("messages").innerHTML =
"Error: " + error.message;

}


});
