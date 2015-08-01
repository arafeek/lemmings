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

  var R = window.R;

  var lemming = {
    Task: Task
  };

  function Task(fn, args, context) {

    if (typeof fn === 'function') {
      // The object that will be passed to the worker script
      var workerOptions = {};

      var worker = new Worker('lemming-helper.js');
      // Stringify the function
      workerOptions.func = fn.toString();
      // TODO: do some typechecking here 
      workerOptions.args = args;
      workerOptions.context = context;


      worker.postMessage(JSON.stringify(workerOptions));

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