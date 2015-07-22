/*
* Fun times with the Web Worker API
*
* To be used like new Lemming(function)
* to allow for individual functions to run in their own thread (sort of)
* returns a promise that resolves when the lemming gets back a result
*/

(function (global) {
  'use strict';

  // Can they though?
  if (typeof window === undefined) {
    console.log('Lemmings cannot be run in a worker!');
    return;
  }

  var lemming = {
    Task: Task
  };

  function Task(fn) {

    if (typeof fn === 'function') {
      // Stringify the function
      var fnMessage = fn.toString();

      var worker = new Worker('lemming-helper.js');
      worker.postMessage(fnMessage);

      return new Promise(function (resolve, reject) {
        worker.onmessage = function (result) {
          resolve(result.data);
        };
      });
    }
  }

  if (typeof exports === 'object') {
    module.exports = lemming;
  } else if (typeof define === 'function' && define.amd) {
    define(function () { return lemming });
  } else {
    global.lemming = lemming;
  }

})(this);