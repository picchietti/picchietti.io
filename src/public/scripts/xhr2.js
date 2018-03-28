export default class XHR2 {
  constructor(method, url) {
    var xhr = new XMLHttpRequest();

    // "synchronous requests on the main thread have been deprecated due to the negative effects to the user experience."
    xhr.open(method, url, true);

    xhr.addEventListener('error', function(){
      alert('Communication failed. Please check your internet connection.');
    }, false);

    return xhr;
  }
}