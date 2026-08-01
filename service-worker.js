const CACHE_NAME = "secrettalk-v1";

const FILES_TO_CACHE = [
  "/SecretTalk/",
  "/SecretTalk/index.html",
  "/SecretTalk/style.css",
  "/SecretTalk/manifest.json"
];


self.addEventListener("install", (event)=>{

event.waitUntil(

caches.open(CACHE_NAME)
.then((cache)=>{

return cache.addAll(FILES_TO_CACHE);

})

);

});



self.addEventListener("fetch", (event)=>{


event.respondWith(

caches.match(event.request)
.then((response)=>{

return response || fetch(event.request);

})

);


});
