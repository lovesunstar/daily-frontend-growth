
(function() {
  if (window.pacific) {
  	return;
  }
  window.pacific = function(msg) {
    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.pacific) {
      window.webkit.messageHandlers.pacific.postMessage(msg);
    }
  };
}());

function ?() {

}



function test() {
  var count = 0;
  var interval = setInterval(function() {
    window.pacific('123');
    window.pacific([1,2,3,4]);
    window.pacific({'a': 1, 'b': 2});
    window.pacific(true);
    window.pacific(count);
    if (count == 100) {
      clearInterval(interval);
    }
    count++;
  }, 1000);
}
