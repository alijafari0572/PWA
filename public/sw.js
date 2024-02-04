self.addEventListener('install',function (event){
console.log('[SW] installing', event);

});

self.addEventListener('activate',function(event){
    console.log('[SW] activating', event);
});