
// Service Worker登録処理
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js', {scope: '/'})
    .then(function() {
      console.log('Service worker registered!');
    })
    .catch(function(err){
      console.log(err);
    });
}
