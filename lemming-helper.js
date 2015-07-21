onmessage = function (msg) {
  console.log(msg);
  var fnResult = msg.data();
  postMessage(fnResult);
};