import { db } from "./firebase.js";
console.log("Signup JS loaded");

import {
    collection,
    addDoc,
    serverTimestamp
} from 
"https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";



// GET RECEIVER FROM LINK

const params = new URLSearchParams(window.location.search);

const receiver = params.get("user") || "Mauricio";



const receiverName = document.getElementById("receiverName");


if(receiverName){

    receiverName.innerHTML =
    "Send " + receiver + " an anonymous message";

}




// SEND MESSAGE

window.sendMessage = async function(){


    const messageBox = document.getElementById("message");

    const status = document.getElementById("status");


    const message = messageBox.value.trim();



    if(message === ""){

        alert("Write a message first");

        return;

    }



    try{


        await addDoc(

            collection(db,"messages"),

            {

                text: message,

                receiver: receiver,

                time: serverTimestamp()

            }

        );



        status.innerHTML =
        "Message sent ❤️";


        messageBox.value = "";


        console.log("Message saved");


    }


    catch(error){


        console.log(error);


        status.innerHTML =
        "Failed to send ❌";


    }


};





// CREATE SECRET TALK LINK

window.createLink = function(){


    const username = document
    .getElementById("username")
    .value
    .trim();



    const result = document
    .getElementById("result");



    if(username === ""){


        result.innerHTML =
        "Enter a username first";


        return;

    }



    const link =

    window.location.origin +

    "/SecretTalk/?user=" +

    encodeURIComponent(username);



    result.innerHTML = `

    Your SecretTalk link:

    <br><br>

    <a href="${link}">
    ${link}
    </a>

    `;


};
