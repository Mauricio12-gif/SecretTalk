import { db } from "./firebase.js";
alert("login.js loaded");


import {
collection,
query,
where,
getDocs
}
from
"https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";



window.login = async function(){


const username =
document.getElementById("username")
.value
.trim();


const password =
document.getElementById("password")
.value
.trim();


const status =
document.getElementById("status");



if(username === "" || password === ""){


status.innerHTML =
"Fill all fields";


return;

}



try{


const usersQuery = query(

collection(db,"users"),

where("username","==",username),

where("password","==",password)

);



const result = await getDocs(usersQuery);



if(result.empty){


status.innerHTML =
"Wrong username or password ❌";


return;


}



const userDoc =
result.docs[0];


const userData =
userDoc.data();



localStorage.setItem(
"username",
userData.username
);



status.innerHTML =
"Login successful ❤️";



setTimeout(()=>{


window.location.href =
"receiver.html";


},1000);



}


catch(error){


console.log(error);


status.innerHTML =
error.message;


}


};
