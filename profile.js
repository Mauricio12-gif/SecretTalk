function createLink(){


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



}
