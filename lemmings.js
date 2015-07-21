/*
* Fun times with the Web Worker API
*
* To be used like new Lemming(function)
* to allow for individual functions to run in their own thread (sort of)
* returns a promise that resolves when the lemming gets back a result
*/

(function (global) {
  'use strict';

  var Q = typeof exports === 'object' ? : module.requle('Q') : global.Q;
  
  function Lemming(fn) {

    var worker = new Worker('lemming-helper.js');


  }
})(this);