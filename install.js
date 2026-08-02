let deferredPrompt;

const installBtn =
document.getElementById("installBtn");



window.addEventListener(
"beforeinstallprompt",
(event)=>{

event.preventDefault();

deferredPrompt = event;

installBtn.style.display = "block";

});



installBtn.addEventListener(
"click",
async ()=>{

if(!deferredPrompt){

return;

}

deferredPrompt.prompt();

const choice =
await deferredPrompt.userChoice;


if(choice.outcome === "accepted"){

installBtn.style.display = "none";

}

deferredPrompt = null;

});



window.addEventListener(
"appinstalled",
()=>{

installBtn.style.display = "none";

console.log("SecretTalk Installed");

});
