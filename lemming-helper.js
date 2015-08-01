onmessage = function (msg) {
  var options = JSON.parse(msg.data);
  var func = eval( '(' + options.func + ')' );
  var fnResult = func.apply(options.context, options.args);
  postMessage(fnResult);
};