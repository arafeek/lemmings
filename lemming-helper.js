onmessage = function (msg) {
  var func = eval( '(' + msg.data + ')' );
  var fnResult = func();
  postMessage(fnResult);
};