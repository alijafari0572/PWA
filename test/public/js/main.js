// if(navigator.serviceWorker)

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(function (registration) {
        console.log('[WEB] SW Registered');
      })
      .catch(function (event) {
        console.error('[WEB] SW Registration Failed', event);
      });
  }