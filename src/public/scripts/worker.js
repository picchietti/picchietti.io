export default function registerWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .catch(function(error) {
        console.log('Service worker registration failed, error:', error);
      });
  }
}
