/*!
 * fu-dialog v1.0.9
 * Copyright 2019 fisker
 * Released under the MIT license
 */

;(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory())
    : typeof define === 'function' && define.amd
    ? define(factory)
    : ((global = global || self), (global.fd = factory()))
})(this, function() {
  'use strict'

  var commonjsGlobal =
    typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : typeof self !== 'undefined'
      ? self
      : {}

  function commonjsRequire() {
    throw new Error(
      'Dynamic requires are not currently supported by rollup-plugin-commonjs'
    )
  }

  function createCommonjsModule(fn, module) {
    return (module = {exports: {}}), fn(module, module.exports), module.exports
  }

  var es6Promise = createCommonjsModule(function(module, exports) {
    /*!
     * @overview es6-promise - a tiny implementation of Promises/A+.
     * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
     * @license   Licensed under MIT license
     *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
     * @version   v4.2.5+7f2b526d
     */
    ;(function(global, factory) {
      module.exports = factory()
    })(commonjsGlobal, function() {
      function objectOrFunction(x) {
        var type = typeof x
        return x !== null && (type === 'object' || type === 'function')
      }

      function isFunction(x) {
        return typeof x === 'function'
      }

      var _isArray = void 0

      if (Array.isArray) {
        _isArray = Array.isArray
      } else {
        _isArray = function _isArray(x) {
          return Object.prototype.toString.call(x) === '[object Array]'
        }
      }

      var isArray = _isArray
      var len = 0
      var vertxNext = void 0
      var customSchedulerFn = void 0

      var asap = function asap(callback, arg) {
        queue[len] = callback
        queue[len + 1] = arg
        len += 2

        if (len === 2) {
          // If len is 2, that means that we need to schedule an async flush.
          // If additional callbacks are queued before the queue is flushed, they
          // will be processed by this flush that we are scheduling.
          if (customSchedulerFn) {
            customSchedulerFn(flush)
          } else {
            scheduleFlush()
          }
        }
      }

      function setScheduler(scheduleFn) {
        customSchedulerFn = scheduleFn
      }

      function setAsap(asapFn) {
        asap = asapFn
      }

      var browserWindow = typeof window !== 'undefined' ? window : undefined
      var browserGlobal = browserWindow || {}
      var BrowserMutationObserver =
        browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver
      var isNode =
        typeof self === 'undefined' &&
        typeof process !== 'undefined' &&
        {}.toString.call(process) === '[object process]' // test for web worker but not in IE10

      var isWorker =
        typeof Uint8ClampedArray !== 'undefined' &&
        typeof importScripts !== 'undefined' &&
        typeof MessageChannel !== 'undefined' // node

      function useNextTick() {
        // node version 0.10.x displays a deprecation warning when nextTick is used recursively
        // see https://github.com/cujojs/when/issues/410 for details
        return function() {
          return process.nextTick(flush)
        }
      } // vertx

      function useVertxTimer() {
        if (typeof vertxNext !== 'undefined') {
          return function() {
            vertxNext(flush)
          }
        }

        return useSetTimeout()
      }

      function useMutationObserver() {
        var iterations = 0
        var observer = new BrowserMutationObserver(flush)
        var node = document.createTextNode('')
        observer.observe(node, {
          characterData: true
        })
        return function() {
          node.data = iterations = ++iterations % 2
        }
      } // web worker

      function useMessageChannel() {
        var channel = new MessageChannel()
        channel.port1.onmessage = flush
        return function() {
          return channel.port2.postMessage(0)
        }
      }

      function useSetTimeout() {
        // Store setTimeout reference so es6-promise will be unaffected by
        // other code modifying setTimeout (like sinon.useFakeTimers())
        var globalSetTimeout = setTimeout
        return function() {
          return globalSetTimeout(flush, 1)
        }
      }

      var queue = new Array(1000)

      function flush() {
        for (var i = 0; i < len; i += 2) {
          var callback = queue[i]
          var arg = queue[i + 1]
          callback(arg)
          queue[i] = undefined
          queue[i + 1] = undefined
        }

        len = 0
      }

      function attemptVertx() {
        try {
          var vertx = Function('return this')().require('vertx')

          vertxNext = vertx.runOnLoop || vertx.runOnContext
          return useVertxTimer()
        } catch (e) {
          return useSetTimeout()
        }
      }

      var scheduleFlush = void 0 // Decide what async method to use to triggering processing of queued callbacks:

      if (isNode) {
        scheduleFlush = useNextTick()
      } else if (BrowserMutationObserver) {
        scheduleFlush = useMutationObserver()
      } else if (isWorker) {
        scheduleFlush = useMessageChannel()
      } else if (
        browserWindow === undefined &&
        typeof commonjsRequire === 'function'
      ) {
        scheduleFlush = attemptVertx()
      } else {
        scheduleFlush = useSetTimeout()
      }

      function then(onFulfillment, onRejection) {
        var parent = this
        var child = new this.constructor(noop)

        if (child[PROMISE_ID] === undefined) {
          makePromise(child)
        }

        var _state = parent._state

        if (_state) {
          var callback = arguments[_state - 1]
          asap(function() {
            return invokeCallback(_state, child, callback, parent._result)
          })
        } else {
          subscribe(parent, child, onFulfillment, onRejection)
        }

        return child
      }
      /**
	      `Promise.resolve` returns a promise that will become resolved with the
	      passed `value`. It is shorthand for the following:
	    
	      ```javascript
	      let promise = new Promise(function(resolve, reject){
	        resolve(1);
	      });
	    
	      promise.then(function(value){
	        // value === 1
	      });
	      ```
	    
	      Instead of writing the above, your code now simply becomes the following:
	    
	      ```javascript
	      let promise = Promise.resolve(1);
	    
	      promise.then(function(value){
	        // value === 1
	      });
	      ```
	    
	      @method resolve
	      @static
	      @param {Any} value value that the returned promise will be resolved with
	      Useful for tooling.
	      @return {Promise} a promise that will become fulfilled with the given
	      `value`
	    */

      function resolve$1(object) {
        /*jshint validthis:true */
        var Constructor = this

        if (
          object &&
          typeof object === 'object' &&
          object.constructor === Constructor
        ) {
          return object
        }

        var promise = new Constructor(noop)
        resolve(promise, object)
        return promise
      }

      var PROMISE_ID = Math.random()
        .toString(36)
        .substring(2)

      function noop() {}

      var PENDING = void 0
      var FULFILLED = 1
      var REJECTED = 2
      var TRY_CATCH_ERROR = {
        error: null
      }

      function selfFulfillment() {
        return new TypeError('You cannot resolve a promise with itself')
      }

      function cannotReturnOwn() {
        return new TypeError(
          'A promises callback cannot return that same promise.'
        )
      }

      function getThen(promise) {
        try {
          return promise.then
        } catch (error) {
          TRY_CATCH_ERROR.error = error
          return TRY_CATCH_ERROR
        }
      }

      function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
        try {
          then$$1.call(value, fulfillmentHandler, rejectionHandler)
        } catch (e) {
          return e
        }
      }

      function handleForeignThenable(promise, thenable, then$$1) {
        asap(function(promise) {
          var sealed = false
          var error = tryThen(
            then$$1,
            thenable,
            function(value) {
              if (sealed) {
                return
              }

              sealed = true

              if (thenable !== value) {
                resolve(promise, value)
              } else {
                fulfill(promise, value)
              }
            },
            function(reason) {
              if (sealed) {
                return
              }

              sealed = true
              reject(promise, reason)
            },
            'Settle: ' + (promise._label || ' unknown promise')
          )

          if (!sealed && error) {
            sealed = true
            reject(promise, error)
          }
        }, promise)
      }

      function handleOwnThenable(promise, thenable) {
        if (thenable._state === FULFILLED) {
          fulfill(promise, thenable._result)
        } else if (thenable._state === REJECTED) {
          reject(promise, thenable._result)
        } else {
          subscribe(
            thenable,
            undefined,
            function(value) {
              return resolve(promise, value)
            },
            function(reason) {
              return reject(promise, reason)
            }
          )
        }
      }

      function handleMaybeThenable(promise, maybeThenable, then$$1) {
        if (
          maybeThenable.constructor === promise.constructor &&
          then$$1 === then &&
          maybeThenable.constructor.resolve === resolve$1
        ) {
          handleOwnThenable(promise, maybeThenable)
        } else {
          if (then$$1 === TRY_CATCH_ERROR) {
            reject(promise, TRY_CATCH_ERROR.error)
            TRY_CATCH_ERROR.error = null
          } else if (then$$1 === undefined) {
            fulfill(promise, maybeThenable)
          } else if (isFunction(then$$1)) {
            handleForeignThenable(promise, maybeThenable, then$$1)
          } else {
            fulfill(promise, maybeThenable)
          }
        }
      }

      function resolve(promise, value) {
        if (promise === value) {
          reject(promise, selfFulfillment())
        } else if (objectOrFunction(value)) {
          handleMaybeThenable(promise, value, getThen(value))
        } else {
          fulfill(promise, value)
        }
      }

      function publishRejection(promise) {
        if (promise._onerror) {
          promise._onerror(promise._result)
        }

        publish(promise)
      }

      function fulfill(promise, value) {
        if (promise._state !== PENDING) {
          return
        }

        promise._result = value
        promise._state = FULFILLED

        if (promise._subscribers.length !== 0) {
          asap(publish, promise)
        }
      }

      function reject(promise, reason) {
        if (promise._state !== PENDING) {
          return
        }

        promise._state = REJECTED
        promise._result = reason
        asap(publishRejection, promise)
      }

      function subscribe(parent, child, onFulfillment, onRejection) {
        var _subscribers = parent._subscribers
        var length = _subscribers.length
        parent._onerror = null
        _subscribers[length] = child
        _subscribers[length + FULFILLED] = onFulfillment
        _subscribers[length + REJECTED] = onRejection

        if (length === 0 && parent._state) {
          asap(publish, parent)
        }
      }

      function publish(promise) {
        var subscribers = promise._subscribers
        var settled = promise._state

        if (subscribers.length === 0) {
          return
        }

        var child = void 0,
          callback = void 0,
          detail = promise._result

        for (var i = 0; i < subscribers.length; i += 3) {
          child = subscribers[i]
          callback = subscribers[i + settled]

          if (child) {
            invokeCallback(settled, child, callback, detail)
          } else {
            callback(detail)
          }
        }

        promise._subscribers.length = 0
      }

      function tryCatch(callback, detail) {
        try {
          return callback(detail)
        } catch (e) {
          TRY_CATCH_ERROR.error = e
          return TRY_CATCH_ERROR
        }
      }

      function invokeCallback(settled, promise, callback, detail) {
        var hasCallback = isFunction(callback),
          value = void 0,
          error = void 0,
          succeeded = void 0,
          failed = void 0

        if (hasCallback) {
          value = tryCatch(callback, detail)

          if (value === TRY_CATCH_ERROR) {
            failed = true
            error = value.error
            value.error = null
          } else {
            succeeded = true
          }

          if (promise === value) {
            reject(promise, cannotReturnOwn())
            return
          }
        } else {
          value = detail
          succeeded = true
        }

        if (promise._state !== PENDING);
        else if (hasCallback && succeeded) {
          resolve(promise, value)
        } else if (failed) {
          reject(promise, error)
        } else if (settled === FULFILLED) {
          fulfill(promise, value)
        } else if (settled === REJECTED) {
          reject(promise, value)
        }
      }

      function initializePromise(promise, resolver) {
        try {
          resolver(
            function resolvePromise(value) {
              resolve(promise, value)
            },
            function rejectPromise(reason) {
              reject(promise, reason)
            }
          )
        } catch (e) {
          reject(promise, e)
        }
      }

      var id = 0

      function nextId() {
        return id++
      }

      function makePromise(promise) {
        promise[PROMISE_ID] = id++
        promise._state = undefined
        promise._result = undefined
        promise._subscribers = []
      }

      function validationError() {
        return new Error('Array Methods must be provided an Array')
      }

      var Enumerator = (function() {
        function Enumerator(Constructor, input) {
          this._instanceConstructor = Constructor
          this.promise = new Constructor(noop)

          if (!this.promise[PROMISE_ID]) {
            makePromise(this.promise)
          }

          if (isArray(input)) {
            this.length = input.length
            this._remaining = input.length
            this._result = new Array(this.length)

            if (this.length === 0) {
              fulfill(this.promise, this._result)
            } else {
              this.length = this.length || 0

              this._enumerate(input)

              if (this._remaining === 0) {
                fulfill(this.promise, this._result)
              }
            }
          } else {
            reject(this.promise, validationError())
          }
        }

        Enumerator.prototype._enumerate = function _enumerate(input) {
          for (var i = 0; this._state === PENDING && i < input.length; i++) {
            this._eachEntry(input[i], i)
          }
        }

        Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
          var c = this._instanceConstructor
          var resolve$$1 = c.resolve

          if (resolve$$1 === resolve$1) {
            var _then = getThen(entry)

            if (_then === then && entry._state !== PENDING) {
              this._settledAt(entry._state, i, entry._result)
            } else if (typeof _then !== 'function') {
              this._remaining--
              this._result[i] = entry
            } else if (c === Promise$1) {
              var promise = new c(noop)
              handleMaybeThenable(promise, entry, _then)

              this._willSettleAt(promise, i)
            } else {
              this._willSettleAt(
                new c(function(resolve$$1) {
                  return resolve$$1(entry)
                }),
                i
              )
            }
          } else {
            this._willSettleAt(resolve$$1(entry), i)
          }
        }

        Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
          var promise = this.promise

          if (promise._state === PENDING) {
            this._remaining--

            if (state === REJECTED) {
              reject(promise, value)
            } else {
              this._result[i] = value
            }
          }

          if (this._remaining === 0) {
            fulfill(promise, this._result)
          }
        }

        Enumerator.prototype._willSettleAt = function _willSettleAt(
          promise,
          i
        ) {
          var enumerator = this
          subscribe(
            promise,
            undefined,
            function(value) {
              return enumerator._settledAt(FULFILLED, i, value)
            },
            function(reason) {
              return enumerator._settledAt(REJECTED, i, reason)
            }
          )
        }

        return Enumerator
      })()
      /**
	      `Promise.all` accepts an array of promises, and returns a new promise which
	      is fulfilled with an array of fulfillment values for the passed promises, or
	      rejected with the reason of the first passed promise to be rejected. It casts all
	      elements of the passed iterable to promises as it runs this algorithm.
	    
	      Example:
	    
	      ```javascript
	      let promise1 = resolve(1);
	      let promise2 = resolve(2);
	      let promise3 = resolve(3);
	      let promises = [ promise1, promise2, promise3 ];
	    
	      Promise.all(promises).then(function(array){
	        // The array here would be [ 1, 2, 3 ];
	      });
	      ```
	    
	      If any of the `promises` given to `all` are rejected, the first promise
	      that is rejected will be given as an argument to the returned promises's
	      rejection handler. For example:
	    
	      Example:
	    
	      ```javascript
	      let promise1 = resolve(1);
	      let promise2 = reject(new Error("2"));
	      let promise3 = reject(new Error("3"));
	      let promises = [ promise1, promise2, promise3 ];
	    
	      Promise.all(promises).then(function(array){
	        // Code here never runs because there are rejected promises!
	      }, function(error) {
	        // error.message === "2"
	      });
	      ```
	    
	      @method all
	      @static
	      @param {Array} entries array of promises
	      @param {String} label optional string for labeling the promise.
	      Useful for tooling.
	      @return {Promise} promise that is fulfilled when all `promises` have been
	      fulfilled, or rejected if any of them become rejected.
	      @static
	    */

      function all(entries) {
        return new Enumerator(this, entries).promise
      }
      /**
	      `Promise.race` returns a new promise which is settled in the same way as the
	      first passed promise to settle.
	    
	      Example:
	    
	      ```javascript
	      let promise1 = new Promise(function(resolve, reject){
	        setTimeout(function(){
	          resolve('promise 1');
	        }, 200);
	      });
	    
	      let promise2 = new Promise(function(resolve, reject){
	        setTimeout(function(){
	          resolve('promise 2');
	        }, 100);
	      });
	    
	      Promise.race([promise1, promise2]).then(function(result){
	        // result === 'promise 2' because it was resolved before promise1
	        // was resolved.
	      });
	      ```
	    
	      `Promise.race` is deterministic in that only the state of the first
	      settled promise matters. For example, even if other promises given to the
	      `promises` array argument are resolved, but the first settled promise has
	      become rejected before the other promises became fulfilled, the returned
	      promise will become rejected:
	    
	      ```javascript
	      let promise1 = new Promise(function(resolve, reject){
	        setTimeout(function(){
	          resolve('promise 1');
	        }, 200);
	      });
	    
	      let promise2 = new Promise(function(resolve, reject){
	        setTimeout(function(){
	          reject(new Error('promise 2'));
	        }, 100);
	      });
	    
	      Promise.race([promise1, promise2]).then(function(result){
	        // Code here never runs
	      }, function(reason){
	        // reason.message === 'promise 2' because promise 2 became rejected before
	        // promise 1 became fulfilled
	      });
	      ```
	    
	      An example real-world use case is implementing timeouts:
	    
	      ```javascript
	      Promise.race([ajax('foo.json'), timeout(5000)])
	      ```
	    
	      @method race
	      @static
	      @param {Array} promises array of promises to observe
	      Useful for tooling.
	      @return {Promise} a promise which settles in the same way as the first passed
	      promise to settle.
	    */

      function race(entries) {
        /*jshint validthis:true */
        var Constructor = this

        if (!isArray(entries)) {
          return new Constructor(function(_, reject) {
            return reject(new TypeError('You must pass an array to race.'))
          })
        } else {
          return new Constructor(function(resolve, reject) {
            var length = entries.length

            for (var i = 0; i < length; i++) {
              Constructor.resolve(entries[i]).then(resolve, reject)
            }
          })
        }
      }
      /**
	      `Promise.reject` returns a promise rejected with the passed `reason`.
	      It is shorthand for the following:
	    
	      ```javascript
	      let promise = new Promise(function(resolve, reject){
	        reject(new Error('WHOOPS'));
	      });
	    
	      promise.then(function(value){
	        // Code here doesn't run because the promise is rejected!
	      }, function(reason){
	        // reason.message === 'WHOOPS'
	      });
	      ```
	    
	      Instead of writing the above, your code now simply becomes the following:
	    
	      ```javascript
	      let promise = Promise.reject(new Error('WHOOPS'));
	    
	      promise.then(function(value){
	        // Code here doesn't run because the promise is rejected!
	      }, function(reason){
	        // reason.message === 'WHOOPS'
	      });
	      ```
	    
	      @method reject
	      @static
	      @param {Any} reason value that the returned promise will be rejected with.
	      Useful for tooling.
	      @return {Promise} a promise rejected with the given `reason`.
	    */

      function reject$1(reason) {
        /*jshint validthis:true */
        var Constructor = this
        var promise = new Constructor(noop)
        reject(promise, reason)
        return promise
      }

      function needsResolver() {
        throw new TypeError(
          'You must pass a resolver function as the first argument to the promise constructor'
        )
      }

      function needsNew() {
        throw new TypeError(
          "Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."
        )
      }
      /**
	      Promise objects represent the eventual result of an asynchronous operation. The
	      primary way of interacting with a promise is through its `then` method, which
	      registers callbacks to receive either a promise's eventual value or the reason
	      why the promise cannot be fulfilled.
	    
	      Terminology
	      -----------
	    
	      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	      - `thenable` is an object or function that defines a `then` method.
	      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	      - `exception` is a value that is thrown using the throw statement.
	      - `reason` is a value that indicates why a promise was rejected.
	      - `settled` the final resting state of a promise, fulfilled or rejected.
	    
	      A promise can be in one of three states: pending, fulfilled, or rejected.
	    
	      Promises that are fulfilled have a fulfillment value and are in the fulfilled
	      state.  Promises that are rejected have a rejection reason and are in the
	      rejected state.  A fulfillment value is never a thenable.
	    
	      Promises can also be said to *resolve* a value.  If this value is also a
	      promise, then the original promise's settled state will match the value's
	      settled state.  So a promise that *resolves* a promise that rejects will
	      itself reject, and a promise that *resolves* a promise that fulfills will
	      itself fulfill.
	    
	    
	      Basic Usage:
	      ------------
	    
	      ```js
	      let promise = new Promise(function(resolve, reject) {
	        // on success
	        resolve(value);
	    
	        // on failure
	        reject(reason);
	      });
	    
	      promise.then(function(value) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```
	    
	      Advanced Usage:
	      ---------------
	    
	      Promises shine when abstracting away asynchronous interactions such as
	      `XMLHttpRequest`s.
	    
	      ```js
	      function getJSON(url) {
	        return new Promise(function(resolve, reject){
	          let xhr = new XMLHttpRequest();
	    
	          xhr.open('GET', url);
	          xhr.onreadystatechange = handler;
	          xhr.responseType = 'json';
	          xhr.setRequestHeader('Accept', 'application/json');
	          xhr.send();
	    
	          function handler() {
	            if (this.readyState === this.DONE) {
	              if (this.status === 200) {
	                resolve(this.response);
	              } else {
	                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	              }
	            }
	          };
	        });
	      }
	    
	      getJSON('/posts.json').then(function(json) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```
	    
	      Unlike callbacks, promises are great composable primitives.
	    
	      ```js
	      Promise.all([
	        getJSON('/posts'),
	        getJSON('/comments')
	      ]).then(function(values){
	        values[0] // => postsJSON
	        values[1] // => commentsJSON
	    
	        return values;
	      });
	      ```
	    
	      @class Promise
	      @param {Function} resolver
	      Useful for tooling.
	      @constructor
	    */

      var Promise$1 = (function() {
        function Promise(resolver) {
          this[PROMISE_ID] = nextId()
          this._result = this._state = undefined
          this._subscribers = []

          if (noop !== resolver) {
            typeof resolver !== 'function' && needsResolver()
            this instanceof Promise
              ? initializePromise(this, resolver)
              : needsNew()
          }
        }
        /**
	      The primary way of interacting with a promise is through its `then` method,
	      which registers callbacks to receive either a promise's eventual value or the
	      reason why the promise cannot be fulfilled.
	       ```js
	      findUser().then(function(user){
	        // user is available
	      }, function(reason){
	        // user is unavailable, and you are given the reason why
	      });
	      ```
	       Chaining
	      --------
	       The return value of `then` is itself a promise.  This second, 'downstream'
	      promise is resolved with the return value of the first promise's fulfillment
	      or rejection handler, or rejected if the handler throws an exception.
	       ```js
	      findUser().then(function (user) {
	        return user.name;
	      }, function (reason) {
	        return 'default name';
	      }).then(function (userName) {
	        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	        // will be `'default name'`
	      });
	       findUser().then(function (user) {
	        throw new Error('Found user, but still unhappy');
	      }, function (reason) {
	        throw new Error('`findUser` rejected and we're unhappy');
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	      });
	      ```
	      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
	       ```js
	      findUser().then(function (user) {
	        throw new PedagogicalException('Upstream error');
	      }).then(function (value) {
	        // never reached
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // The `PedgagocialException` is propagated all the way down to here
	      });
	      ```
	       Assimilation
	      ------------
	       Sometimes the value you want to propagate to a downstream promise can only be
	      retrieved asynchronously. This can be achieved by returning a promise in the
	      fulfillment or rejection handler. The downstream promise will then be pending
	      until the returned promise is settled. This is called *assimilation*.
	       ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // The user's comments are now available
	      });
	      ```
	       If the assimliated promise rejects, then the downstream promise will also reject.
	       ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // If `findCommentsByAuthor` fulfills, we'll have the value here
	      }, function (reason) {
	        // If `findCommentsByAuthor` rejects, we'll have the reason here
	      });
	      ```
	       Simple Example
	      --------------
	       Synchronous Example
	       ```javascript
	      let result;
	       try {
	        result = findResult();
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```
	       Errback Example
	       ```js
	      findResult(function(result, err){
	        if (err) {
	          // failure
	        } else {
	          // success
	        }
	      });
	      ```
	       Promise Example;
	       ```javascript
	      findResult().then(function(result){
	        // success
	      }, function(reason){
	        // failure
	      });
	      ```
	       Advanced Example
	      --------------
	       Synchronous Example
	       ```javascript
	      let author, books;
	       try {
	        author = findAuthor();
	        books  = findBooksByAuthor(author);
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```
	       Errback Example
	       ```js
	       function foundBooks(books) {
	       }
	       function failure(reason) {
	       }
	       findAuthor(function(author, err){
	        if (err) {
	          failure(err);
	          // failure
	        } else {
	          try {
	            findBoooksByAuthor(author, function(books, err) {
	              if (err) {
	                failure(err);
	              } else {
	                try {
	                  foundBooks(books);
	                } catch(reason) {
	                  failure(reason);
	                }
	              }
	            });
	          } catch(error) {
	            failure(err);
	          }
	          // success
	        }
	      });
	      ```
	       Promise Example;
	       ```javascript
	      findAuthor().
	        then(findBooksByAuthor).
	        then(function(books){
	          // found books
	      }).catch(function(reason){
	        // something went wrong
	      });
	      ```
	       @method then
	      @param {Function} onFulfilled
	      @param {Function} onRejected
	      Useful for tooling.
	      @return {Promise}
	      */

        /**
	      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	      as the catch block of a try/catch statement.
	      ```js
	      function findAuthor(){
	      throw new Error('couldn't find that author');
	      }
	      // synchronous
	      try {
	      findAuthor();
	      } catch(reason) {
	      // something went wrong
	      }
	      // async with promises
	      findAuthor().catch(function(reason){
	      // something went wrong
	      });
	      ```
	      @method catch
	      @param {Function} onRejection
	      Useful for tooling.
	      @return {Promise}
	      */

        Promise.prototype.catch = function _catch(onRejection) {
          return this.then(null, onRejection)
        }
        /**
	        `finally` will be invoked regardless of the promise's fate just as native
	        try/catch/finally behaves
	      
	        Synchronous example:
	      
	        ```js
	        findAuthor() {
	          if (Math.random() > 0.5) {
	            throw new Error();
	          }
	          return new Author();
	        }
	      
	        try {
	          return findAuthor(); // succeed or fail
	        } catch(error) {
	          return findOtherAuther();
	        } finally {
	          // always runs
	          // doesn't affect the return value
	        }
	        ```
	      
	        Asynchronous example:
	      
	        ```js
	        findAuthor().catch(function(reason){
	          return findOtherAuther();
	        }).finally(function(){
	          // author was either found, or not
	        });
	        ```
	      
	        @method finally
	        @param {Function} callback
	        @return {Promise}
	      */

        Promise.prototype.finally = function _finally(callback) {
          var promise = this
          var constructor = promise.constructor

          if (isFunction(callback)) {
            return promise.then(
              function(value) {
                return constructor.resolve(callback()).then(function() {
                  return value
                })
              },
              function(reason) {
                return constructor.resolve(callback()).then(function() {
                  throw reason
                })
              }
            )
          }

          return promise.then(callback, callback)
        }

        return Promise
      })()

      Promise$1.prototype.then = then
      Promise$1.all = all
      Promise$1.race = race
      Promise$1.resolve = resolve$1
      Promise$1.reject = reject$1
      Promise$1._setScheduler = setScheduler
      Promise$1._setAsap = setAsap
      Promise$1._asap = asap
      /*global self*/

      function polyfill() {
        var local = void 0

        if (typeof commonjsGlobal !== 'undefined') {
          local = commonjsGlobal
        } else if (typeof self !== 'undefined') {
          local = self
        } else {
          try {
            local = Function('return this')()
          } catch (e) {
            throw new Error(
              'polyfill failed because global object is unavailable in this environment'
            )
          }
        }

        var P = local.Promise

        if (P) {
          var promiseToString = null

          try {
            promiseToString = Object.prototype.toString.call(P.resolve())
          } catch (e) {
            // silently ignored
          }

          if (promiseToString === '[object Promise]' && !P.cast) {
            return
          }
        }

        local.Promise = Promise$1
      } // Strange compat..

      Promise$1.polyfill = polyfill
      Promise$1.Promise = Promise$1
      return Promise$1
    })
  })

  var dialogPolyfill = createCommonjsModule(function(module) {
    ;(function() {
      // nb. This is for IE10 and lower _only_.
      var supportCustomEvent = window.CustomEvent

      if (!supportCustomEvent || typeof supportCustomEvent === 'object') {
        supportCustomEvent = function CustomEvent(event, x) {
          x = x || {}
          var ev = document.createEvent('CustomEvent')
          ev.initCustomEvent(
            event,
            !!x.bubbles,
            !!x.cancelable,
            x.detail || null
          )
          return ev
        }

        supportCustomEvent.prototype = window.Event.prototype
      }
      /**
       * @param {Element} el to check for stacking context
       * @return {boolean} whether this el or its parents creates a stacking context
       */

      function createsStackingContext(el) {
        while (el && el !== document.body) {
          var s = window.getComputedStyle(el)

          var invalid = function invalid(k, ok) {
            return !(s[k] === undefined || s[k] === ok)
          }

          if (
            s.opacity < 1 ||
            invalid('zIndex', 'auto') ||
            invalid('transform', 'none') ||
            invalid('mixBlendMode', 'normal') ||
            invalid('filter', 'none') ||
            invalid('perspective', 'none') ||
            s['isolation'] === 'isolate' ||
            s.position === 'fixed' ||
            s.webkitOverflowScrolling === 'touch'
          ) {
            return true
          }

          el = el.parentElement
        }

        return false
      }
      /**
       * Finds the nearest <dialog> from the passed element.
       *
       * @param {Element} el to search from
       * @return {HTMLDialogElement} dialog found
       */

      function findNearestDialog(el) {
        while (el) {
          if (el.localName === 'dialog') {
            return (
              /** @type {HTMLDialogElement} */
              el
            )
          }

          el = el.parentElement
        }

        return null
      }
      /**
       * Blur the specified element, as long as it's not the HTML body element.
       * This works around an IE9/10 bug - blurring the body causes Windows to
       * blur the whole application.
       *
       * @param {Element} el to blur
       */

      function safeBlur(el) {
        if (el && el.blur && el !== document.body) {
          el.blur()
        }
      }
      /**
       * @param {!NodeList} nodeList to search
       * @param {Node} node to find
       * @return {boolean} whether node is inside nodeList
       */

      function inNodeList(nodeList, node) {
        for (var i = 0; i < nodeList.length; ++i) {
          if (nodeList[i] === node) {
            return true
          }
        }

        return false
      }
      /**
       * @param {HTMLFormElement} el to check
       * @return {boolean} whether this form has method="dialog"
       */

      function isFormMethodDialog(el) {
        if (!el || !el.hasAttribute('method')) {
          return false
        }

        return el.getAttribute('method').toLowerCase() === 'dialog'
      }
      /**
       * @param {!HTMLDialogElement} dialog to upgrade
       * @constructor
       */

      function dialogPolyfillInfo(dialog) {
        this.dialog_ = dialog
        this.replacedStyleTop_ = false
        this.openAsModal_ = false // Set a11y role. Browsers that support dialog implicitly know this already.

        if (!dialog.hasAttribute('role')) {
          dialog.setAttribute('role', 'dialog')
        }

        dialog.show = this.show.bind(this)
        dialog.showModal = this.showModal.bind(this)
        dialog.close = this.close.bind(this)

        if (!('returnValue' in dialog)) {
          dialog.returnValue = ''
        }

        if ('MutationObserver' in window) {
          var mo = new MutationObserver(this.maybeHideModal.bind(this))
          mo.observe(dialog, {
            attributes: true,
            attributeFilter: ['open']
          })
        } else {
          // IE10 and below support. Note that DOMNodeRemoved etc fire _before_ removal. They also
          // seem to fire even if the element was removed as part of a parent removal. Use the removed
          // events to force downgrade (useful if removed/immediately added).
          var removed = false

          var cb = function() {
            removed ? this.downgradeModal() : this.maybeHideModal()
            removed = false
          }.bind(this)

          var timeout

          var delayModel = function delayModel(ev) {
            if (ev.target !== dialog) {
              return
            } // not for a child element

            var cand = 'DOMNodeRemoved'
            removed |= ev.type.substr(0, cand.length) === cand
            window.clearTimeout(timeout)
            timeout = window.setTimeout(cb, 0)
          }

          ;[
            'DOMAttrModified',
            'DOMNodeRemoved',
            'DOMNodeRemovedFromDocument'
          ].forEach(function(name) {
            dialog.addEventListener(name, delayModel)
          })
        } // Note that the DOM is observed inside DialogManager while any dialog
        // is being displayed as a modal, to catch modal removal from the DOM.

        Object.defineProperty(dialog, 'open', {
          set: this.setOpen.bind(this),
          get: dialog.hasAttribute.bind(dialog, 'open')
        })
        this.backdrop_ = document.createElement('div')
        this.backdrop_.className = 'backdrop'
        this.backdrop_.addEventListener('click', this.backdropClick_.bind(this))
      }

      dialogPolyfillInfo.prototype = {
        get dialog() {
          return this.dialog_
        },

        /**
         * Maybe remove this dialog from the modal top layer. This is called when
         * a modal dialog may no longer be tenable, e.g., when the dialog is no
         * longer open or is no longer part of the DOM.
         */
        maybeHideModal: function maybeHideModal() {
          if (
            this.dialog_.hasAttribute('open') &&
            document.body.contains(this.dialog_)
          ) {
            return
          }

          this.downgradeModal()
        },

        /**
         * Remove this dialog from the modal top layer, leaving it as a non-modal.
         */
        downgradeModal: function downgradeModal() {
          if (!this.openAsModal_) {
            return
          }

          this.openAsModal_ = false
          this.dialog_.style.zIndex = '' // This won't match the native <dialog> exactly because if the user set top on a centered
          // polyfill dialog, that top gets thrown away when the dialog is closed. Not sure it's
          // possible to polyfill this perfectly.

          if (this.replacedStyleTop_) {
            this.dialog_.style.top = ''
            this.replacedStyleTop_ = false
          } // Clear the backdrop and remove from the manager.

          this.backdrop_.parentNode &&
            this.backdrop_.parentNode.removeChild(this.backdrop_)
          dialogPolyfill.dm.removeDialog(this)
        },

        /**
         * @param {boolean} value whether to open or close this dialog
         */
        setOpen: function setOpen(value) {
          if (value) {
            this.dialog_.hasAttribute('open') ||
              this.dialog_.setAttribute('open', '')
          } else {
            this.dialog_.removeAttribute('open')
            this.maybeHideModal() // nb. redundant with MutationObserver
          }
        },

        /**
         * Handles clicks on the fake .backdrop element, redirecting them as if
         * they were on the dialog itself.
         *
         * @param {!Event} e to redirect
         */
        backdropClick_: function backdropClick_(e) {
          if (!this.dialog_.hasAttribute('tabindex')) {
            // Clicking on the backdrop should move the implicit cursor, even if dialog cannot be
            // focused. Create a fake thing to focus on. If the backdrop was _before_ the dialog, this
            // would not be needed - clicks would move the implicit cursor there.
            var fake = document.createElement('div')
            this.dialog_.insertBefore(fake, this.dialog_.firstChild)
            fake.tabIndex = -1
            fake.focus()
            this.dialog_.removeChild(fake)
          } else {
            this.dialog_.focus()
          }

          var redirectedEvent = document.createEvent('MouseEvents')
          redirectedEvent.initMouseEvent(
            e.type,
            e.bubbles,
            e.cancelable,
            window,
            e.detail,
            e.screenX,
            e.screenY,
            e.clientX,
            e.clientY,
            e.ctrlKey,
            e.altKey,
            e.shiftKey,
            e.metaKey,
            e.button,
            e.relatedTarget
          )
          this.dialog_.dispatchEvent(redirectedEvent)
          e.stopPropagation()
        },

        /**
         * Focuses on the first focusable element within the dialog. This will always blur the current
         * focus, even if nothing within the dialog is found.
         */
        focus_: function focus_() {
          // Find element with `autofocus` attribute, or fall back to the first form/tabindex control.
          var target = this.dialog_.querySelector('[autofocus]:not([disabled])')

          if (!target && this.dialog_.tabIndex >= 0) {
            target = this.dialog_
          }

          if (!target) {
            // Note that this is 'any focusable area'. This list is probably not exhaustive, but the
            // alternative involves stepping through and trying to focus everything.
            var opts = ['button', 'input', 'keygen', 'select', 'textarea']
            var query = opts.map(function(el) {
              return el + ':not([disabled])'
            }) // TODO(samthor): tabindex values that are not numeric are not focusable.

            query.push('[tabindex]:not([disabled]):not([tabindex=""])') // tabindex != "", not disabled

            target = this.dialog_.querySelector(query.join(', '))
          }

          safeBlur(document.activeElement)
          target && target.focus()
        },

        /**
         * Sets the zIndex for the backdrop and dialog.
         *
         * @param {number} dialogZ
         * @param {number} backdropZ
         */
        updateZIndex: function updateZIndex(dialogZ, backdropZ) {
          if (dialogZ < backdropZ) {
            throw new Error('dialogZ should never be < backdropZ')
          }

          this.dialog_.style.zIndex = dialogZ
          this.backdrop_.style.zIndex = backdropZ
        },

        /**
         * Shows the dialog. If the dialog is already open, this does nothing.
         */
        show: function show() {
          if (!this.dialog_.open) {
            this.setOpen(true)
            this.focus_()
          }
        },

        /**
         * Show this dialog modally.
         */
        showModal: function showModal() {
          if (this.dialog_.hasAttribute('open')) {
            throw new Error(
              "Failed to execute 'showModal' on dialog: The element is already open, and therefore cannot be opened modally."
            )
          }

          if (!document.body.contains(this.dialog_)) {
            throw new Error(
              "Failed to execute 'showModal' on dialog: The element is not in a Document."
            )
          }

          if (!dialogPolyfill.dm.pushDialog(this)) {
            throw new Error(
              "Failed to execute 'showModal' on dialog: There are too many open modal dialogs."
            )
          }

          if (createsStackingContext(this.dialog_.parentElement)) {
            console.warn(
              'A dialog is being shown inside a stacking context. ' +
                'This may cause it to be unusable. For more information, see this link: ' +
                'https://github.com/GoogleChrome/dialog-polyfill/#stacking-context'
            )
          }

          this.setOpen(true)
          this.openAsModal_ = true // Optionally center vertically, relative to the current viewport.

          if (dialogPolyfill.needsCentering(this.dialog_)) {
            dialogPolyfill.reposition(this.dialog_)
            this.replacedStyleTop_ = true
          } else {
            this.replacedStyleTop_ = false
          } // Insert backdrop.

          this.dialog_.parentNode.insertBefore(
            this.backdrop_,
            this.dialog_.nextSibling
          ) // Focus on whatever inside the dialog.

          this.focus_()
        },

        /**
         * Closes this HTMLDialogElement. This is optional vs clearing the open
         * attribute, however this fires a 'close' event.
         *
         * @param {string=} opt_returnValue to use as the returnValue
         */
        close: function close(opt_returnValue) {
          if (!this.dialog_.hasAttribute('open')) {
            throw new Error(
              "Failed to execute 'close' on dialog: The element does not have an 'open' attribute, and therefore cannot be closed."
            )
          }

          this.setOpen(false) // Leave returnValue untouched in case it was set directly on the element

          if (opt_returnValue !== undefined) {
            this.dialog_.returnValue = opt_returnValue
          } // Triggering "close" event for any attached listeners on the <dialog>.

          var closeEvent = new supportCustomEvent('close', {
            bubbles: false,
            cancelable: false
          })
          this.dialog_.dispatchEvent(closeEvent)
        }
      }
      var dialogPolyfill = {}

      dialogPolyfill.reposition = function(element) {
        var scrollTop =
          document.body.scrollTop || document.documentElement.scrollTop
        var topValue =
          scrollTop + (window.innerHeight - element.offsetHeight) / 2
        element.style.top = Math.max(scrollTop, topValue) + 'px'
      }

      dialogPolyfill.isInlinePositionSetByStylesheet = function(element) {
        for (var i = 0; i < document.styleSheets.length; ++i) {
          var styleSheet = document.styleSheets[i]
          var cssRules = null // Some browsers throw on cssRules.

          try {
            cssRules = styleSheet.cssRules
          } catch (e) {}

          if (!cssRules) {
            continue
          }

          for (var j = 0; j < cssRules.length; ++j) {
            var rule = cssRules[j]
            var selectedNodes = null // Ignore errors on invalid selector texts.

            try {
              selectedNodes = document.querySelectorAll(rule.selectorText)
            } catch (e) {}

            if (!selectedNodes || !inNodeList(selectedNodes, element)) {
              continue
            }

            var cssTop = rule.style.getPropertyValue('top')
            var cssBottom = rule.style.getPropertyValue('bottom')

            if (
              (cssTop && cssTop !== 'auto') ||
              (cssBottom && cssBottom !== 'auto')
            ) {
              return true
            }
          }
        }

        return false
      }

      dialogPolyfill.needsCentering = function(dialog) {
        var computedStyle = window.getComputedStyle(dialog)

        if (computedStyle.position !== 'absolute') {
          return false
        } // We must determine whether the top/bottom specified value is non-auto.  In
        // WebKit/Blink, checking computedStyle.top == 'auto' is sufficient, but
        // Firefox returns the used value. So we do this crazy thing instead: check
        // the inline style and then go through CSS rules.

        if (
          (dialog.style.top !== 'auto' && dialog.style.top !== '') ||
          (dialog.style.bottom !== 'auto' && dialog.style.bottom !== '')
        ) {
          return false
        }

        return !dialogPolyfill.isInlinePositionSetByStylesheet(dialog)
      }
      /**
       * @param {!Element} element to force upgrade
       */

      dialogPolyfill.forceRegisterDialog = function(element) {
        if (window.HTMLDialogElement || element.showModal) {
          console.warn(
            'This browser already supports <dialog>, the polyfill ' +
              'may not work correctly',
            element
          )
        }

        if (element.localName !== 'dialog') {
          throw new Error(
            'Failed to register dialog: The element is not a dialog.'
          )
        }

        new dialogPolyfillInfo(
          /** @type {!HTMLDialogElement} */
          element
        )
      }
      /**
       * @param {!Element} element to upgrade, if necessary
       */

      dialogPolyfill.registerDialog = function(element) {
        if (!element.showModal) {
          dialogPolyfill.forceRegisterDialog(element)
        }
      }
      /**
       * @constructor
       */

      dialogPolyfill.DialogManager = function() {
        /** @type {!Array<!dialogPolyfillInfo>} */
        this.pendingDialogStack = []
        var checkDOM = this.checkDOM_.bind(this) // The overlay is used to simulate how a modal dialog blocks the document.
        // The blocking dialog is positioned on top of the overlay, and the rest of
        // the dialogs on the pending dialog stack are positioned below it. In the
        // actual implementation, the modal dialog stacking is controlled by the
        // top layer, where z-index has no effect.

        this.overlay = document.createElement('div')
        this.overlay.className = '_dialog_overlay'
        this.overlay.addEventListener(
          'click',
          function(e) {
            this.forwardTab_ = undefined
            e.stopPropagation()
            checkDOM([]) // sanity-check DOM
          }.bind(this)
        )
        this.handleKey_ = this.handleKey_.bind(this)
        this.handleFocus_ = this.handleFocus_.bind(this)
        this.zIndexLow_ = 100000
        this.zIndexHigh_ = 100000 + 150
        this.forwardTab_ = undefined

        if ('MutationObserver' in window) {
          this.mo_ = new MutationObserver(function(records) {
            var removed = []
            records.forEach(function(rec) {
              for (var i = 0, c; (c = rec.removedNodes[i]); ++i) {
                if (!(c instanceof Element)) {
                  continue
                } else if (c.localName === 'dialog') {
                  removed.push(c)
                }

                removed = removed.concat(c.querySelectorAll('dialog'))
              }
            })
            removed.length && checkDOM(removed)
          })
        }
      }
      /**
       * Called on the first modal dialog being shown. Adds the overlay and related
       * handlers.
       */

      dialogPolyfill.DialogManager.prototype.blockDocument = function() {
        document.documentElement.addEventListener(
          'focus',
          this.handleFocus_,
          true
        )
        document.addEventListener('keydown', this.handleKey_)
        this.mo_ &&
          this.mo_.observe(document, {
            childList: true,
            subtree: true
          })
      }
      /**
       * Called on the first modal dialog being removed, i.e., when no more modal
       * dialogs are visible.
       */

      dialogPolyfill.DialogManager.prototype.unblockDocument = function() {
        document.documentElement.removeEventListener(
          'focus',
          this.handleFocus_,
          true
        )
        document.removeEventListener('keydown', this.handleKey_)
        this.mo_ && this.mo_.disconnect()
      }
      /**
       * Updates the stacking of all known dialogs.
       */

      dialogPolyfill.DialogManager.prototype.updateStacking = function() {
        var zIndex = this.zIndexHigh_

        for (var i = 0, dpi; (dpi = this.pendingDialogStack[i]); ++i) {
          dpi.updateZIndex(--zIndex, --zIndex)

          if (i === 0) {
            this.overlay.style.zIndex = --zIndex
          }
        } // Make the overlay a sibling of the dialog itself.

        var last = this.pendingDialogStack[0]

        if (last) {
          var p = last.dialog.parentNode || document.body
          p.appendChild(this.overlay)
        } else if (this.overlay.parentNode) {
          this.overlay.parentNode.removeChild(this.overlay)
        }
      }
      /**
       * @param {Element} candidate to check if contained or is the top-most modal dialog
       * @return {boolean} whether candidate is contained in top dialog
       */

      dialogPolyfill.DialogManager.prototype.containedByTopDialog_ = function(
        candidate
      ) {
        while ((candidate = findNearestDialog(candidate))) {
          for (var i = 0, dpi; (dpi = this.pendingDialogStack[i]); ++i) {
            if (dpi.dialog === candidate) {
              return i === 0 // only valid if top-most
            }
          }

          candidate = candidate.parentElement
        }

        return false
      }

      dialogPolyfill.DialogManager.prototype.handleFocus_ = function(event) {
        if (this.containedByTopDialog_(event.target)) {
          return
        }

        event.preventDefault()
        event.stopPropagation()
        safeBlur(
          /** @type {Element} */
          event.target
        )

        if (this.forwardTab_ === undefined) {
          return
        } // move focus only from a tab key

        var dpi = this.pendingDialogStack[0]
        var dialog = dpi.dialog
        var position = dialog.compareDocumentPosition(event.target)

        if (position & Node.DOCUMENT_POSITION_PRECEDING) {
          if (this.forwardTab_) {
            // forward
            dpi.focus_()
          } else {
            // backwards
            document.documentElement.focus()
          }
        }

        return false
      }

      dialogPolyfill.DialogManager.prototype.handleKey_ = function(event) {
        this.forwardTab_ = undefined

        if (event.keyCode === 27) {
          event.preventDefault()
          event.stopPropagation()
          var cancelEvent = new supportCustomEvent('cancel', {
            bubbles: false,
            cancelable: true
          })
          var dpi = this.pendingDialogStack[0]

          if (dpi && dpi.dialog.dispatchEvent(cancelEvent)) {
            dpi.dialog.close()
          }
        } else if (event.keyCode === 9) {
          this.forwardTab_ = !event.shiftKey
        }
      }
      /**
       * Finds and downgrades any known modal dialogs that are no longer displayed. Dialogs that are
       * removed and immediately readded don't stay modal, they become normal.
       *
       * @param {!Array<!HTMLDialogElement>} removed that have definitely been removed
       */

      dialogPolyfill.DialogManager.prototype.checkDOM_ = function(removed) {
        // This operates on a clone because it may cause it to change. Each change also calls
        // updateStacking, which only actually needs to happen once. But who removes many modal dialogs
        // at a time?!
        var clone = this.pendingDialogStack.slice()
        clone.forEach(function(dpi) {
          if (removed.indexOf(dpi.dialog) !== -1) {
            dpi.downgradeModal()
          } else {
            dpi.maybeHideModal()
          }
        })
      }
      /**
       * @param {!dialogPolyfillInfo} dpi
       * @return {boolean} whether the dialog was allowed
       */

      dialogPolyfill.DialogManager.prototype.pushDialog = function(dpi) {
        var allowed = (this.zIndexHigh_ - this.zIndexLow_) / 2 - 1

        if (this.pendingDialogStack.length >= allowed) {
          return false
        }

        if (this.pendingDialogStack.unshift(dpi) === 1) {
          this.blockDocument()
        }

        this.updateStacking()
        return true
      }
      /**
       * @param {!dialogPolyfillInfo} dpi
       */

      dialogPolyfill.DialogManager.prototype.removeDialog = function(dpi) {
        var index = this.pendingDialogStack.indexOf(dpi)

        if (index === -1) {
          return
        }

        this.pendingDialogStack.splice(index, 1)

        if (this.pendingDialogStack.length === 0) {
          this.unblockDocument()
        }

        this.updateStacking()
      }

      dialogPolyfill.dm = new dialogPolyfill.DialogManager()
      dialogPolyfill.formSubmitter = null
      dialogPolyfill.useValue = null
      /**
       * Installs global handlers, such as click listers and native method overrides. These are needed
       * even if a no dialog is registered, as they deal with <form method="dialog">.
       */

      if (window.HTMLDialogElement === undefined) {
        /**
         * If HTMLFormElement translates method="DIALOG" into 'get', then replace the descriptor with
         * one that returns the correct value.
         */
        var testForm = document.createElement('form')
        testForm.setAttribute('method', 'dialog')

        if (testForm.method !== 'dialog') {
          var methodDescriptor = Object.getOwnPropertyDescriptor(
            HTMLFormElement.prototype,
            'method'
          )

          if (methodDescriptor) {
            // nb. Some older iOS and older PhantomJS fail to return the descriptor. Don't do anything
            // and don't bother to update the element.
            var realGet = methodDescriptor.get

            methodDescriptor.get = function() {
              if (isFormMethodDialog(this)) {
                return 'dialog'
              }

              return realGet.call(this)
            }

            var realSet = methodDescriptor.set

            methodDescriptor.set = function(v) {
              if (typeof v === 'string' && v.toLowerCase() === 'dialog') {
                return this.setAttribute('method', v)
              }

              return realSet.call(this, v)
            }

            Object.defineProperty(
              HTMLFormElement.prototype,
              'method',
              methodDescriptor
            )
          }
        }
        /**
         * Global 'click' handler, to capture the <input type="submit"> or <button> element which has
         * submitted a <form method="dialog">. Needed as Safari and others don't report this inside
         * document.activeElement.
         */

        document.addEventListener(
          'click',
          function(ev) {
            dialogPolyfill.formSubmitter = null
            dialogPolyfill.useValue = null

            if (ev.defaultPrevented) {
              return
            } // e.g. a submit which prevents default submission

            var target =
              /** @type {Element} */
              ev.target

            if (!target || !isFormMethodDialog(target.form)) {
              return
            }

            var valid =
              target.type === 'submit' &&
              ['button', 'input'].indexOf(target.localName) > -1

            if (!valid) {
              if (!(target.localName === 'input' && target.type === 'image')) {
                return
              } // this is a <input type="image">, which can submit forms

              dialogPolyfill.useValue = ev.offsetX + ',' + ev.offsetY
            }

            var dialog = findNearestDialog(target)

            if (!dialog) {
              return
            }

            dialogPolyfill.formSubmitter = target
          },
          false
        )
        /**
         * Replace the native HTMLFormElement.submit() method, as it won't fire the
         * submit event and give us a chance to respond.
         */

        var nativeFormSubmit = HTMLFormElement.prototype.submit

        var replacementFormSubmit = function replacementFormSubmit() {
          if (!isFormMethodDialog(this)) {
            return nativeFormSubmit.call(this)
          }

          var dialog = findNearestDialog(this)
          dialog && dialog.close()
        }

        HTMLFormElement.prototype.submit = replacementFormSubmit
        /**
         * Global form 'dialog' method handler. Closes a dialog correctly on submit
         * and possibly sets its return value.
         */

        document.addEventListener(
          'submit',
          function(ev) {
            var form =
              /** @type {HTMLFormElement} */
              ev.target

            if (!isFormMethodDialog(form)) {
              return
            }

            ev.preventDefault()
            var dialog = findNearestDialog(form)

            if (!dialog) {
              return
            } // Forms can only be submitted via .submit() or a click (?), but anyway: sanity-check that
            // the submitter is correct before using its value as .returnValue.

            var s = dialogPolyfill.formSubmitter

            if (s && s.form === form) {
              dialog.close(dialogPolyfill.useValue || s.value)
            } else {
              dialog.close()
            }

            dialogPolyfill.formSubmitter = null
          },
          true
        )
      }

      dialogPolyfill['forceRegisterDialog'] = dialogPolyfill.forceRegisterDialog
      dialogPolyfill['registerDialog'] = dialogPolyfill.registerDialog

      if (typeof module['exports'] === 'object') {
        // CommonJS support
        module['exports'] = dialogPolyfill
      } else {
        // all others
        window['dialogPolyfill'] = dialogPolyfill
      }
    })()
  })

  var env = {}

  var forEach = Array.prototype.forEach
  var forEach$1 =
    forEach ||
    function forEach(iteratee) {
      var i = 0
      var length = this.length

      for (; i < length; i++) {
        iteratee.call(this, this[i], i, this)
      }
    }

  var hasOwnProperty = Object.prototype.hasOwnProperty

  function forIn(iteratee) {
    var key

    for (key in this) {
      if (hasOwnProperty.call(this, key)) {
        iteratee.call(this, this[key], key, this)
      }
    }
  }

  var assign = Object.assign
  var assign$1 =
    assign ||
    function assign(target) {
      for (
        var _len = arguments.length,
          sources = new Array(_len > 1 ? _len - 1 : 0),
          _key = 1;
        _key < _len;
        _key++
      ) {
        sources[_key - 1] = arguments[_key]
      }

      forEach$1.call(sources, function(source) {
        forIn.call(source, function(value, key) {
          target[key] = value
        })
      })
      return target
    }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function')
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || false
      descriptor.configurable = true
      if ('value' in descriptor) descriptor.writable = true
      Object.defineProperty(target, descriptor.key, descriptor)
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps)
    if (staticProps) _defineProperties(Constructor, staticProps)
    return Constructor
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      })
    } else {
      obj[key] = value
    }

    return obj
  }

  // eslint-disable-next-line no-new-func
  var globalThis = Function('return this')()

  var name = 'fu-dialog'

  var document$1 = globalThis.document

  if (!document$1) {
    throw new Error(''.concat(name, ' requires a window with a document.'))
  }

  var NS = 'fu-dialog'
  var CONTAINER = NS
  var HEAD = ''.concat(NS, '__head')
  var TITLE = ''.concat(NS, '__title')
  var BODY = ''.concat(NS, '__body')
  var MESSAGE = ''.concat(NS, '__message')
  var MESSAGE_BODY = ''.concat(NS, '__message-body')
  var INPUT = ''.concat(NS, '__input')
  var FOOT = ''.concat(NS, '__foot')
  var ACTIONS = ''.concat(NS, '__actions')
  var CLOSE_BTN = ''.concat(NS, '__close')
  var ACTION = ''.concat(NS, '__action')
  var ACTION_TYPE_CONFIRM = ''.concat(ACTION, '--confirm')
  var ACTION_TYPE_CANCEL = ''.concat(ACTION, '--cancel')
  var DIALOG_TYPE_ALERT = ''.concat(NS, '--alert')
  var DIALOG_TYPE_CONFIRM = ''.concat(NS, '--confirm')
  var DIALOG_TYPE_PROMPT = ''.concat(NS, '--prompt')

  var toString = Object.prototype.toString

  function getType(x) {
    return toString.call(x).slice(8, -1)
  }

  var isArray = Array.isArray
  var isArray$1 =
    isArray ||
    function isArray(x) {
      return getType(x) === 'Array'
    }

  var div = document$1.createElement('div')
  var SUPPORTS_CLASS_LIST = 'classList' in div
  var SUPPORTS_TEXT_CONTENT = 'textContent' in div

  function parseClassNames() {
    var className =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
    var classList = ''

    if (isArray$1(className)) {
      classList = className
    } else {
      classList = String(className || '').split(' ')
    }

    return classList
  }

  function parseDomProps() {
    var props =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}

    if (isArray$1(props) || typeof props === 'string') {
      props = {
        className: props
      }
    }

    var classList = parseClassNames(props.className)

    if (classList.length) {
      props.className = classList.join(' ')
    } else {
      delete props.className
    }

    if (!SUPPORTS_TEXT_CONTENT && 'textContent' in props) {
      props.innerText = props.textContent
      delete props.textContent
    }

    return props
  }

  var defaultDomProps = {
    button: {
      type: 'button'
    },
    input: {
      type: 'text'
    }
  }

  function setDefaultProps(props, tagName) {
    var defaultProps = defaultDomProps[tagName]

    if (defaultProps) {
      props = assign$1({}, defaultProps, props)
    }

    return props
  }

  function createElement(parentNode, tagName) {
    var props =
      arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {}

    if (typeof parentNode === 'string') {
      props = tagName
      tagName = parentNode
      parentNode = null
    }

    var el = document$1.createElement(tagName)
    props = parseDomProps(props)
    props = setDefaultProps(props, tagName)
    assign$1(el, props)

    if (parentNode) {
      parentNode.appendChild(el)
    }

    return el
  }

  var MAX_SAFE_INTEGER = 9007199254740991

  function isLength(x) {
    return (
      typeof x === 'number' && x > -1 && x % 1 === 0 && x <= MAX_SAFE_INTEGER
    )
  }

  function isArrayLike(x) {
    return x && typeof x !== 'function' && isLength(x.length)
  }

  function isNode(x) {
    return x && typeof x.nodeType === 'number'
  }

  function appendElement(parent, children) {
    if (typeof children === 'string') {
      parent.innerHTML = children
      return parent
    }

    if (isNode(children)) {
      parent.appendChild(children)
      return parent
    }

    if (isArrayLike(children)) {
      forEach$1.call(children, function(child) {
        appendElement(parent, child)
      })
      return parent
    }

    return parent
  }

  var returnFalse = function() {
    return false
  }

  var returnTrue = function() {
    return true
  }

  // import {

  function isListener(x) {
    return typeof x === 'function' || typeof x === 'boolean'
  }

  function parseListener(listener) {
    if (listener === true) {
      listener = returnTrue
    }

    if (listener === false) {
      listener = returnFalse
    }

    return listener
  }

  function addListener(el, type, listener) {
    var options =
      arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false

    if (isListener(type)) {
      options = listener || false
      listener = type
      type = 'click'
    }

    listener = parseListener(listener)
    el.addEventListener(type, listener, options)
    return el
  }

  function preventDefault(e) {
    e.preventDefault()
    return false
  }

  function preventEvent(el, type) {
    return addListener(el, type, preventDefault)
  }

  var defaultSettings = {
    title: '提示',
    confirmActionText: '确定',
    cancelActionText: '取消',
    promptPlaceholder: '请输入',
    reverseActions: false,
    closeButton: '关闭',
    preventCancel: true
  }

  function parseOptions(options) {
    var defaultOptions =
      arguments.length > 1 && arguments[1] !== undefined
        ? arguments[1]
        : defaultSettings
    var type = getType(options)

    if (type !== 'Object') {
      options = {
        message: options
      }
    }

    options = assign$1(defaultOptions, options)
    return options
  }

  var noop = function() {}

  function createAction(actionText, props) {
    var action =
      arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop

    if (typeof props === 'function') {
      action = props
      props = {}
    }

    if (action === false) {
      action = returnFalse
    }

    if (action === true) {
      action = returnTrue
    }

    props = assign$1(
      {
        textContent: String(actionText)
      },
      props
    )
    var classList = parseClassNames(props.className)
    classList.unshift(ACTION)
    props.className = classList
    var el = createElement('button', props)
    return {
      el: el,
      action: action
    }
  }

  function createTypedAction(type) {
    var typedActionClassName = ''

    if (type === 'confirm') {
      typedActionClassName = ACTION_TYPE_CONFIRM
    } else if (type === 'cancel') {
      typedActionClassName = ACTION_TYPE_CANCEL
    }

    return function(actionText, action) {
      var DEFAULT_TEXT = defaultSettings[''.concat(type, 'ActionText')]

      if (typeof actionText === 'function') {
        action = actionText
        actionText = DEFAULT_TEXT
      }

      actionText = actionText || DEFAULT_TEXT
      return createAction(
        actionText,
        {
          className: typedActionClassName
        },
        action
      )
    }
  }

  var createConfirmAction = createTypedAction('confirm')
  var createCancelAction = createTypedAction('cancel')

  function parseAction(action) {
    if (typeof action === 'string') {
      action = {
        text: action
      }
    }

    if (isArrayLike(action)) {
      return parseAction(action[0])
    }

    if (isNode(action)) {
      action = {
        el: action
      }
    }

    if (typeof action.el === 'function') {
      action.el = action.el()
    }

    if (action === createConfirmAction || action === createCancelAction) {
      action = action()
    }

    if (typeof action === 'function' || typeof action === 'boolean') {
      action = createConfirmAction(action)
    }

    if (!action.el) {
      action = createAction(action.text, action.action)
    }

    return action
  }

  function renderAction(container, btn, dialog) {
    var el = btn.el,
      action = btn.action
    addListener(el, 'click', function() {
      var result

      if (action) {
        result = action.call(dialog)
      }

      if (result !== false) {
        dialog.remove()
      }
    })
    container.appendChild(el)
    return container
  }

  function registerDialog(dialog) {
    var _env$dialogPolyfill = env.dialogPolyfill,
      dialogPolyfill = _env$dialogPolyfill === void 0 ? {} : _env$dialogPolyfill
    var registerDialog = dialogPolyfill.registerDialog

    if (registerDialog) {
      return registerDialog(dialog)
    }

    return dialog
  }

  var Dialog =
    /*#__PURE__*/
    (function() {
      function Dialog(options, open) {
        _classCallCheck(this, Dialog)

        var dialog = this
        options = parseOptions(options)
        var hasTitle = !(
          options.title === null ||
          options.title === false ||
          typeof options.title === 'undefined'
        )
        var hasContent = options.content
        var hasMessage = 'message' in options
        var actions = (options.actions || []).map(parseAction)
        var _options = options,
          _options$closeButton = _options.closeButton,
          closeButtonText =
            _options$closeButton === void 0 ? '' : _options$closeButton,
          onClose = _options.onClose
        var _options2 = options,
          preventCancel = _options2.preventCancel,
          onCancel = _options2.onCancel
        var container = createElement('dialog', CONTAINER)
        registerDialog(container)

        if (preventCancel) {
          preventEvent(container, 'cancel')
        } else {
          addListener(container, 'cancel', function() {
            if (onCancel) {
              onCancel()
            }

            dialog.remove()
          })
        }

        this.container = container

        if (closeButtonText) {
          var closeButton = createElement(container, 'button', {
            className: CLOSE_BTN,
            innerHTML: '<span>'.concat(String(closeButtonText), '</span>')
          })
          addListener(closeButton, 'click', function() {
            if (onClose) {
              onClose()
            }

            dialog.remove()
          })
        } // head

        if (hasTitle) {
          var head = createElement(container, 'div', HEAD)
          this.head = head
          var title = createElement(head, 'div', {
            className: TITLE,
            textContent: String(options.title)
          })
        } // body

        if (hasContent || hasMessage) {
          var body = createElement(container, 'div', BODY)
          this.body = body

          if (hasContent) {
            appendElement(body, options.content)
          } else if (hasMessage) {
            var message = createElement(body, 'div', MESSAGE)
            var messageBody = createElement(message, 'span', {
              className: MESSAGE_BODY,
              textContent: String(options.message)
            })
          }
        } // foot

        if (actions.length) {
          var foot = createElement(container, 'div', FOOT)
          this.foot = foot
          var actionsContainer = createElement(foot, 'div', ACTIONS)
          forEach$1.call(actions, function(action) {
            return renderAction(actionsContainer, action, dialog)
          })
        }

        document$1.body.appendChild(this.container)

        if (open !== false) {
          this.open()
        }
      }

      _createClass(Dialog, [
        {
          key: 'open',
          value: function open() {
            this.container.showModal()
          }
        },
        {
          key: 'remove',
          value: function remove() {
            this.container.parentNode.removeChild(this.container)
          }
        },
        {
          key: 'close',
          value: function close() {
            this.container.close()
          }
        }
      ])

      return Dialog
    })()

  function returnPromise(method) {
    var Promise = env.Promise
    return function(options) {
      var onAction =
        arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop
      var dialog
      var promise = new Promise(function(resolve) {
        dialog = method(options, function(result) {
          resolve(result)
          return onAction.call(this, result)
        })
      })
      promise.dialog = dialog
      return promise
    }
  }

  var identify = function(x) {
    return x
  }

  function setDefault(options, value) {
    if (arguments.length === 2) {
      options = _defineProperty({}, options, value)
    }

    return assign$1(defaultSettings, options)
  }

  function addClassByClassList(el, className) {
    el.classList.add(className)
    return el
  }

  function addClassByClassName(el, className) {
    el.className += ' '.concat(className)
    return el
  }

  var addClass = SUPPORTS_CLASS_LIST ? addClassByClassList : addClassByClassName

  function alert(options) {
    var onAction =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop
    options = parseOptions(options)

    if (!options.actions) {
      var confirmBtn = createConfirmAction(onAction)
      options.actions = [confirmBtn]
    }

    options.onClose = onAction
    var dialog = new Dialog(options)
    addClass(dialog.container, DIALOG_TYPE_ALERT)
    return dialog
  }
  function confirm(options) {
    var onAction =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop
    options = parseOptions(options)

    function onConfirm() {
      return onAction.call(this, true)
    }

    function onCancel() {
      return onAction.call(this, false)
    }

    if (!options.actions) {
      var confirmBtn = createConfirmAction(onConfirm)
      var cancelBtn = createCancelAction(onCancel)

      if (defaultSettings.reverseActions) {
        options.actions = [cancelBtn, confirmBtn]
      } else {
        options.actions = [confirmBtn, cancelBtn]
      }
    }

    options.onClose = onCancel
    var dialog = new Dialog(options)
    addClass(dialog.container, DIALOG_TYPE_CONFIRM)
    return dialog
  }
  function prompt(options) {
    var onAction =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop
    options = parseOptions(options, {
      title: null,
      closeButton: false
    })

    if (!options.content && !('message' in options)) {
      options.content = []
    }

    var _options = options,
      input = _options.input

    if (!input) {
      if (options.rows) {
        input = createElement('textarea', {
          className: INPUT,
          rows: options.rows,
          placeholder: options.placeholder || defaultSettings.promptPlaceholder
        })
      } else {
        input = createElement('input', {
          className: INPUT,
          placeholder: options.placeholder || defaultSettings.promptPlaceholder
        })
      }
    }

    function onConfirm() {
      return onAction.call(this, input.value)
    }

    function onCancel() {
      return onAction.call(this)
    }

    if (!options.actions) {
      var confirmBtn = createConfirmAction(onConfirm)
      var cancelBtn = createCancelAction(onCancel)

      if (defaultSettings.reverseActions) {
        options.actions = [cancelBtn, confirmBtn]
      } else {
        options.actions = [confirmBtn, cancelBtn]
      }
    }

    options.onClose = onCancel
    var dialog = new Dialog(options, false)
    addClass(dialog.container, DIALOG_TYPE_PROMPT)
    appendElement(dialog.body, input)
    dialog.open()
    return dialog
  }

  function exportModule() {
    var shortCutWrapper = env.Promise ? returnPromise : identify

    function dialog(options) {
      return new Dialog(options)
    }

    assign$1(dialog, {
      defaultSettings: defaultSettings,
      setDefault: setDefault,
      dialog: dialog,
      Dialog: Dialog,
      alert: shortCutWrapper(alert),
      confirm: shortCutWrapper(confirm),
      prompt: shortCutWrapper(prompt),
      action: assign$1(createAction, {
        confirm: createConfirmAction,
        cancel: createCancelAction
      }),
      btn: {
        confirm: createConfirmAction(),
        cancel: createCancelAction()
      }
    })
    return dialog
  }

  assign$1(env, {
    Promise: es6Promise,
    dialogPolyfill: dialogPolyfill
  })
  var fullVersion = exportModule()

  return fullVersion
})
//# sourceMappingURL=dialog.umd.js.map
