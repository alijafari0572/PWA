var fab = document.querySelector('#fab');
var deferredPrompt;

fab.addEventListener('click', function () {

  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function (choice) {
      console.log(choice);
      if (choice.outcome === 'dismissed') {
        console.log('installation was cancelled');
      } else {
        console.log('User Added To Home Screen');
      }
    });
    deferredPrompt = null;
  }


});

window.addEventListener('beforeinstallprompt', function (event) {
  console.log('beforeinstallprompt run .');
  event.preventDefault();
  deferredPrompt = event;
  return false;

});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('/sw.js')
      .then(function () {
        console.log('Service worker registered!');
      })
      .catch(function (e) {
        console.error('SW Errors while registering!', e);
      });
  });
}
