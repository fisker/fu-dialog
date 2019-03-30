parcelRequire = (function(e, r, t, n) {
  var i,
    o = 'function' == typeof parcelRequire && parcelRequire,
    u = 'function' == typeof require && require
  function f(t, n) {
    if (!r[t]) {
      if (!e[t]) {
        var i = 'function' == typeof parcelRequire && parcelRequire
        if (!n && i) return i(t, !0)
        if (o) return o(t, !0)
        if (u && 'string' == typeof t) return u(t)
        var c = new Error("Cannot find module '" + t + "'")
        throw ((c.code = 'MODULE_NOT_FOUND'), c)
      }
      ;(p.resolve = function(r) {
        return e[t][1][r] || r
      }),
        (p.cache = {})
      var l = (r[t] = new f.Module(t))
      e[t][0].call(l.exports, p, l, l.exports, this)
    }
    return r[t].exports
    function p(e) {
      return f(p.resolve(e))
    }
  }
  ;(f.isParcelRequire = !0),
    (f.Module = function(e) {
      ;(this.id = e), (this.bundle = f), (this.exports = {})
    }),
    (f.modules = e),
    (f.cache = r),
    (f.parent = o),
    (f.register = function(r, t) {
      e[r] = [
        function(e, r) {
          r.exports = t
        },
        {},
      ]
    })
  for (var c = 0; c < t.length; c++)
    try {
      f(t[c])
    } catch (e) {
      i || (i = e)
    }
  if (t.length) {
    var l = f(t[t.length - 1])
    'object' == typeof exports && 'undefined' != typeof module
      ? (module.exports = l)
      : 'function' == typeof define && define.amd
      ? define(function() {
          return l
        })
      : n && (this[n] = l)
  }
  if (((parcelRequire = f), i)) throw i
  return f
})(
  {
    '0/n0': [
      function(require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', {value: !0}),
          (exports.default = void 0)
        var e = Object.prototype.toString,
          t = e
        exports.default = t
      },
      {},
    ],
    '8iLZ': [
      function(require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', {value: !0}),
          (exports.default = void 0)
        var e = t(require('./to-string'))
        function t(e) {
          return e && e.__esModule ? e : {default: e}
        }
        function r(t) {
          return e.default.call(t).slice(8, -1)
        }
        var u = r
        exports.default = u
      },
      {'./to-string': '0/n0'},
    ],
    mCin: [
      function(require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', {value: !0}),
          (exports.default = void 0)
        var e = Function('return this')(),
          t = e
        exports.default = t
      },
      {},
    ],
    EHrm: [
      function(require, module, exports) {
        module.exports = {
          author: {
            name: 'fisker Cheung',
            email: 'lionkay@gmail.com',
            url: 'https://www.fiskercheung.com/',
          },
          browser: 'lib/full-version/dialog.min.js',
          description: "fisker's dialog",
          devDependencies: {
            '@babel/core': '7.4.0',
            '@babel/preset-env': '7.4.2',
            '@commitlint/cli': '7.5.2',
            '@commitlint/config-conventional': '7.5.0',
            'babel-plugin-transform-es3-member-expression-literals': '6.22.0',
            'babel-plugin-transform-es3-property-literals': '6.22.0',
            'babel-plugin-transform-es5-property-mutators': '6.24.1',
            'caniuse-lite': '1.0.30000955',
            'cp-file': '6.1.0',
            'create-banner': '1.0.0',
            'cssnano-cli': '1.0.5',
            'cz-conventional-changelog-emoji': '^0.1.0',
            'dialog-polyfill': '0.5.0',
            'es6-promise': '4.2.6',
            eslint: '5.15.3',
            'eslint-config-fisker': '^4.2.3',
            'gzip-size': '5.0.0',
            husky: '1.3.1',
            jest: '24.5.0',
            jsdom: '14.0.0',
            'lint-staged': '8.1.5',
            'markdownlint-cli': '^0.14.1',
            mem: '4.2.0',
            'npm-run-all': '4.1.5',
            'postcss-cli': '6.1.2',
            'postcss-cssnext': '3.1.0',
            'postcss-header': '1.0.0',
            'postcss-preset-env': '6.6.0',
            'postcss-scss': '2.0.0',
            prettier: '1.16.4',
            'pretty-bytes': '5.1.0',
            'read-dir-deep': '4.0.3',
            rollup: '1.7.4',
            'rollup-plugin-analyzer': '3.0.0',
            'rollup-plugin-babel': '4.3.2',
            'rollup-plugin-commonjs': '9.2.2',
            'rollup-plugin-json': '4.0.0',
            'rollup-plugin-node-resolve': '4.0.1',
            'rollup-plugin-prettier': '^0.6.0',
            'rollup-plugin-terser': '4.0.4',
            sass: '^1.17.3',
            stylelint: '9.10.1',
            'stylelint-config-fisker': '^0.0.4',
            table: '5.2.3',
            'uglify-js': '3.5.2',
            'write-pkg': '3.2.0',
            yarn: '1.15.2',
          },
          files: ['lib', 'src', 'package.json', 'LICENSE', 'README.md'],
          jsdelivr: 'lib/full-version/dialog.min.js',
          keywords: ['dialog', 'alert', 'confirm', 'prompt', 'promise'],
          license: 'MIT',
          main: 'lib/full-version/dialog.common.js',
          module: 'lib/full-version/dialog.esm.min.mjs',
          name: 'fu-dialog',
          publishConfig: {registry: 'https://registry.npmjs.org/'},
          repository: {
            type: 'git',
            url: 'git+https://github.com/fisker/fu-dialog.git',
          },
          scripts: {
            build: 'npm-run-all --parallel build:*',
            'build:css': 'bash ./scripts/build-css.sh',
            'build:js': 'bash ./scripts/build-js.sh',
            'build:package': 'bash ./scripts/build-package.sh',
            'build:styles': 'bash ./scripts/build-styles-source.sh',
            'build:docs': 'parcel build demo/index.html --out-dir docs',
            clean: 'bash ./scripts/clean.sh',
            dev: 'parcel demo/index.html --open',
            dist: 'npm-run-all --parallel dist:*',
            'dist:npm': 'np --no-yarn --no-cleanup',
            lint: 'npm-run-all --parallel lint:*',
            'lint:js': 'eslint src/**/*.js',
            'lint:scss': 'stylelint src/**/*.scss',
            info: 'node ./scripts/filesize.js',
            release: 'npm-run-all --sequential lint clean build info test dist',
            test: 'jest',
            version: 'npm-run-all --parallel build && git add lib',
            'gzip-size': '^5.0.0',
          },
          style: 'lib/full-version/dialog.min.css',
          unpkg: 'lib/full-version/dialog.min.js',
          version: '1.0.11',
          bugs: {url: 'https://github.com/fisker/fu-dialog/issues'},
          readme: 'ERROR: No README data found!',
          homepage: 'https://github.com/fisker/fu-dialog#readme',
          config: {
            commitizen: {
              path: './node_modules/cz-conventional-changelog-emoji',
            },
          },
        }
      },
      {},
    ],
    '86LI': [
      function(require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', {value: !0}),
          (exports.default = void 0)
        var e = t(require('./global-this')),
          r = require('../../package.json')
        function t(e) {
          return e && e.__esModule ? e : {default: e}
        }
        var o = e.default.document
        if (!o)
          throw new Error(
            ''.concat(r.name, ' requires a window with a document.')
          )
        var a = o
        exports.default = a
      },
      {'./global-this': 'mCin', '../../package.json': 'EHrm'},
    ],
    NwqO: [
      function(require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', {value: !0}),
          (exports.default = void 0)
        var t = Array.prototype.forEach,
          e =
            t ||
            function(t) {
              for (var e = 0, r = this.length; e < r; e += 1)
                t.call(this, this[e], e, this)
            }
        exports.default = e
      },
      {},
    ],
    '2s2J': [
      function(require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', {value: !0}),
          (exports.default = void 0)
        var e = Object.prototype.hasOwnProperty,
          t = e
        exports.default = t
      },
      {},
    ],
    sd57: [
      function(require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', {value: !0}),
          (exports.default = void 0)
        var e = t(require('./has-own'))
        function t(e) {
          return e && e.__esModule ? e : {default: e}
        }
        function r(t) {
          var r
          for (r in this)
            e.default.call(this, r) && t.call(this, this[r], r, this)
        }
        var s = r
        exports.default = s
      },
      {'./has-own': '2s2J'},
    ],
    ANwP: [
      function(require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', {value: !0}),
          (exports.default = void 0)
        var e = t(require('./for-each')),
          r = t(require('./for-in'))
        function t(e) {
          return e && e.__esModule ? e : {default: e}
        }
        var u = Object.assign,
          n =
            u ||
            function(t) {
              for (
                var u = arguments.length,
                  n = new Array(u > 1 ? u - 1 : 0),
                  a = 1;
                a < u;
                a++
              )
                n[a - 1] = arguments[a]
              return (
                e.default.call(n, function(e) {
                  r.default.call(e, function(e, r) {
                    t[r] = e
                  })
                }),
                t
              )
            }
        exports.default = n
      },
      {'./for-each': 'NwqO', './for-in': 'sd57'},
    ],
    'EpJ+': [
      function(require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', {value: !0}),
          (exports.default = void 0)
        var e = function() {}
        exports.default = e
      },
      {},
    ],
    Ig3t: [
      function(require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', {value: !0}),
          (exports.default = void 0)
        var e = function() {
          return !1
        }
        exports.default = e
      },
      {},
    ],
    CAQo: [
      function(require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', {value: !0}),
          (exports.default = void 0)
        var e = function() {
          return !0
        }
        exports.default = e
      },
      {},
    ],
    J47R: [
      function(require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', {value: !0}),
          (exports.default = void 0)
        var e = r(require('../utils/return-false')),
          t = r(require('../utils/return-true'))
        function r(e) {
          return e && e.__esModule ? e : {default: e}
        }
        function u(e) {
          return 'function' == typeof e || 'boolean' == typeof e
        }
        function n(r) {
          return !0 === r && (r = t.default), !1 === r && (r = e.default), r
        }
        function o(e, t, r) {
          var o =
            arguments.length > 3 && void 0 !== arguments[3] && arguments[3]
          return (
            u(t) && ((o = r || !1), (r = t), (t = 'click')),
            (r = n(r)),
            e.addEventListener(t, r, o),
            e
          )
        }
        var i = o
        exports.default = i
      },
      {'../utils/return-false': 'Ig3t', '../utils/return-true': 'CAQo'},
    ],
    GFDC: [
      function(require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', {value: !0}),
          (exports.default = void 0)
        var e = r(require('./get-type'))
        function r(e) {
          return e && e.__esModule ? e : {default: e}
        }
        var t = Array.isArray,
          u =
            t ||
            function(r) {
              return 'Array' === (0, e.default)(r)
            }
        exports.default = u
      },
      {'./get-type': '8iLZ'},
    ],
    'z/cM': [
      function(require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', {value: !0}),
          (exports.SUPPORTS_EVENT_LISTENER = exports.SUPPORTS_TEXT_CONTENT = exports.SUPPORTS_CLASS_LIST = void 0)
        var e = t(require('../utils/document'))
        function t(e) {
          return e && e.__esModule ? e : {default: e}
        }
        var r = e.default.createElement('div'),
          S = 'classList' in r
        exports.SUPPORTS_CLASS_LIST = S
        var T = 'textContent' in r
        exports.SUPPORTS_TEXT_CONTENT = T
        var s = 'addEventListener' in r
        exports.SUPPORTS_EVENT_LISTENER = s
      },
      {'../utils/document': '86LI'},
    ],
    RAYM: [
      function(require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', {value: !0}),
          (exports.default = void 0)
        var e = t(require('../utils/is-array'))
        function t(e) {
          return e && e.__esModule ? e : {default: e}
        }
        function r() {
          var t =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []
          return (0, e.default)(t) ? t : String(t || '').split(' ')
        }
        var u = r
        exports.default = u
      },
      {'../utils/is-array': 'GFDC'},
    ],
    XRJ7: [
      function(require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', {value: !0}),
          (exports.default = void 0)
        var e = a(require('../utils/is-array')),
          t = a(require('../utils/document')),
          r = a(require('../utils/assign')),
          n = require('./supports'),
          u = a(require('./parse-classnames'))
        function a(e) {
          return e && e.__esModule ? e : {default: e}
        }
        function s() {
          var t =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
          ;((0, e.default)(t) || 'string' == typeof t) && (t = {className: t})
          var r = (0, u.default)(t.className)
          return (
            0 !== r.length ? (t.className = r.join(' ')) : delete t.className,
            !n.SUPPORTS_TEXT_CONTENT &&
              'textContent' in t &&
              ((t.innerText = t.textContent), delete t.textContent),
            t
          )
        }
        var l = {button: {type: 'button'}, input: {type: 'text'}}
        function i(e, t) {
          var n = l[t]
          return n && (e = (0, r.default)({}, n, e)), e
        }
        function o(e, n) {
          var u =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}
          'string' == typeof e && ((u = n), (n = e), (e = null))
          var a = t.default.createElement(n)
          return (
            (u = i((u = s(u)), n)),
            (0, r.default)(a, u),
            e && e.appendChild(a),
            a
          )
        }
        var d = o
        exports.default = d
      },
      {
        '../utils/is-array': 'GFDC',
        '../utils/document': '86LI',
        '../utils/assign': 'ANwP',
        './supports': 'z/cM',
        './parse-classnames': 'RAYM',
      },
    ],
    SrtY: [
      function(require, module, exports) {
        var t,
          e,
          n = (module.exports = {})
        function r() {
          throw new Error('setTimeout has not been defined')
        }
        function o() {
          throw new Error('clearTimeout has not been defined')
        }
        function i(e) {
          if (t === setTimeout) return setTimeout(e, 0)
          if ((t === r || !t) && setTimeout)
            return (t = setTimeout), setTimeout(e, 0)
          try {
            return t(e, 0)
          } catch (n) {
            try {
              return t.call(null, e, 0)
            } catch (n) {
              return t.call(this, e, 0)
            }
          }
        }
        function u(t) {
          if (e === clearTimeout) return clearTimeout(t)
          if ((e === o || !e) && clearTimeout)
            return (e = clearTimeout), clearTimeout(t)
          try {
            return e(t)
          } catch (n) {
            try {
              return e.call(null, t)
            } catch (n) {
              return e.call(this, t)
            }
          }
        }
        !(function() {
          try {
            t = 'function' == typeof setTimeout ? setTimeout : r
          } catch (n) {
            t = r
          }
          try {
            e = 'function' == typeof clearTimeout ? clearTimeout : o
          } catch (n) {
            e = o
          }
        })()
        var c,
          s = [],
          l = !1,
          a = -1
        function f() {
          l &&
            c &&
            ((l = !1), c.length ? (s = c.concat(s)) : (a = -1), s.length && h())
        }
        function h() {
          if (!l) {
            var t = i(f)
            l = !0
            for (var e = s.length; e; ) {
              for (c = s, s = []; ++a < e; ) c && c[a].run()
              ;(a = -1), (e = s.length)
            }
            ;(c = null), (l = !1), u(t)
          }
        }
        function m(t, e) {
          ;(this.fun = t), (this.array = e)
        }
        function p() {}
        ;(n.nextTick = function(t) {
          var e = new Array(arguments.length - 1)
          if (arguments.length > 1)
            for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n]
          s.push(new m(t, e)), 1 !== s.length || l || i(h)
        }),
          (m.prototype.run = function() {
            this.fun.apply(null, this.array)
          }),
          (n.title = 'browser'),
          (n.env = {}),
          (n.argv = []),
          (n.version = ''),
          (n.versions = {}),
          (n.on = p),
          (n.addListener = p),
          (n.once = p),
          (n.off = p),
          (n.removeListener = p),
          (n.removeAllListeners = p),
          (n.emit = p),
          (n.prependListener = p),
          (n.prependOnceListener = p),
          (n.listeners = function(t) {
            return []
          }),
          (n.binding = function(t) {
            throw new Error('process.binding is not supported')
          }),
          (n.cwd = function() {
            return '/'
          }),
          (n.chdir = function(t) {
            throw new Error('process.chdir is not supported')
          }),
          (n.umask = function() {
            return 0
          })
      },
      {},
    ],
    Zt7E: [
      function(require, module, exports) {
        var define
        var global = arguments[3]
        var process = require('process')
        var t,
          e = arguments[3],
          r = require('process')
        !(function(e, r) {
          'object' == typeof exports && 'undefined' != typeof module
            ? (module.exports = r())
            : 'function' == typeof t && t.amd
            ? t(r)
            : (e.ES6Promise = r())
        })(this, function() {
          'use strict'
          function t(t) {
            return 'function' == typeof t
          }
          var n = Array.isArray
              ? Array.isArray
              : function(t) {
                  return '[object Array]' === Object.prototype.toString.call(t)
                },
            o = 0,
            i = void 0,
            s = void 0,
            u = function(t, e) {
              ;(p[o] = t), (p[o + 1] = e), 2 === (o += 2) && (s ? s(_) : w())
            }
          var c = 'undefined' != typeof window ? window : void 0,
            a = c || {},
            f = a.MutationObserver || a.WebKitMutationObserver,
            l =
              'undefined' == typeof self &&
              void 0 !== r &&
              '[object process]' === {}.toString.call(r),
            h =
              'undefined' != typeof Uint8ClampedArray &&
              'undefined' != typeof importScripts &&
              'undefined' != typeof MessageChannel
          function v() {
            var t = setTimeout
            return function() {
              return t(_, 1)
            }
          }
          var p = new Array(1e3)
          function _() {
            for (var t = 0; t < o; t += 2) {
              ;(0, p[t])(p[t + 1]), (p[t] = void 0), (p[t + 1] = void 0)
            }
            o = 0
          }
          var d,
            y,
            m,
            b,
            w = void 0
          function g(t, e) {
            var r = this,
              n = new this.constructor(S)
            void 0 === n[j] && N(n)
            var o = r._state
            if (o) {
              var i = arguments[o - 1]
              u(function() {
                return K(o, n, i, r._result)
              })
            } else k(r, n, t, e)
            return n
          }
          function A(t) {
            if (t && 'object' == typeof t && t.constructor === this) return t
            var e = new this(S)
            return O(e, t), e
          }
          l
            ? (w = function() {
                return r.nextTick(_)
              })
            : f
            ? ((y = 0),
              (m = new f(_)),
              (b = document.createTextNode('')),
              m.observe(b, {characterData: !0}),
              (w = function() {
                b.data = y = ++y % 2
              }))
            : h
            ? (((d = new MessageChannel()).port1.onmessage = _),
              (w = function() {
                return d.port2.postMessage(0)
              }))
            : (w =
                void 0 === c && 'function' == typeof require
                  ? (function() {
                      try {
                        var t = Function('return this')().require('vertx')
                        return void 0 !== (i = t.runOnLoop || t.runOnContext)
                          ? function() {
                              i(_)
                            }
                          : v()
                      } catch (e) {
                        return v()
                      }
                    })()
                  : v())
          var j = Math.random()
            .toString(36)
            .substring(2)
          function S() {}
          var E = void 0,
            T = 1,
            M = 2,
            P = {error: null}
          function x(t) {
            try {
              return t.then
            } catch (e) {
              return (P.error = e), P
            }
          }
          function C(e, r, n) {
            r.constructor === e.constructor &&
            n === g &&
            r.constructor.resolve === A
              ? (function(t, e) {
                  e._state === T
                    ? F(t, e._result)
                    : e._state === M
                    ? Y(t, e._result)
                    : k(
                        e,
                        void 0,
                        function(e) {
                          return O(t, e)
                        },
                        function(e) {
                          return Y(t, e)
                        }
                      )
                })(e, r)
              : n === P
              ? (Y(e, P.error), (P.error = null))
              : void 0 === n
              ? F(e, r)
              : t(n)
              ? (function(t, e, r) {
                  u(function(t) {
                    var n = !1,
                      o = (function(t, e, r, n) {
                        try {
                          t.call(e, r, n)
                        } catch (o) {
                          return o
                        }
                      })(
                        r,
                        e,
                        function(r) {
                          n || ((n = !0), e !== r ? O(t, r) : F(t, r))
                        },
                        function(e) {
                          n || ((n = !0), Y(t, e))
                        },
                        t._label
                      )
                    !n && o && ((n = !0), Y(t, o))
                  }, t)
                })(e, r, n)
              : F(e, r)
          }
          function O(t, e) {
            var r, n
            t === e
              ? Y(t, new TypeError('You cannot resolve a promise with itself'))
              : ((n = typeof (r = e)),
                null === r || ('object' !== n && 'function' !== n)
                  ? F(t, e)
                  : C(t, e, x(e)))
          }
          function q(t) {
            t._onerror && t._onerror(t._result), D(t)
          }
          function F(t, e) {
            t._state === E &&
              ((t._result = e),
              (t._state = T),
              0 !== t._subscribers.length && u(D, t))
          }
          function Y(t, e) {
            t._state === E && ((t._state = M), (t._result = e), u(q, t))
          }
          function k(t, e, r, n) {
            var o = t._subscribers,
              i = o.length
            ;(t._onerror = null),
              (o[i] = e),
              (o[i + T] = r),
              (o[i + M] = n),
              0 === i && t._state && u(D, t)
          }
          function D(t) {
            var e = t._subscribers,
              r = t._state
            if (0 !== e.length) {
              for (
                var n = void 0, o = void 0, i = t._result, s = 0;
                s < e.length;
                s += 3
              )
                (n = e[s]), (o = e[s + r]), n ? K(r, n, o, i) : o(i)
              t._subscribers.length = 0
            }
          }
          function K(e, r, n, o) {
            var i = t(n),
              s = void 0,
              u = void 0,
              c = void 0,
              a = void 0
            if (i) {
              if (
                ((s = (function(t, e) {
                  try {
                    return t(e)
                  } catch (r) {
                    return (P.error = r), P
                  }
                })(n, o)) === P
                  ? ((a = !0), (u = s.error), (s.error = null))
                  : (c = !0),
                r === s)
              )
                return void Y(
                  r,
                  new TypeError(
                    'A promises callback cannot return that same promise.'
                  )
                )
            } else (s = o), (c = !0)
            r._state !== E ||
              (i && c
                ? O(r, s)
                : a
                ? Y(r, u)
                : e === T
                ? F(r, s)
                : e === M && Y(r, s))
          }
          var L = 0
          function N(t) {
            ;(t[j] = L++),
              (t._state = void 0),
              (t._result = void 0),
              (t._subscribers = [])
          }
          var U = (function() {
            function t(t, e) {
              ;(this._instanceConstructor = t),
                (this.promise = new t(S)),
                this.promise[j] || N(this.promise),
                n(e)
                  ? ((this.length = e.length),
                    (this._remaining = e.length),
                    (this._result = new Array(this.length)),
                    0 === this.length
                      ? F(this.promise, this._result)
                      : ((this.length = this.length || 0),
                        this._enumerate(e),
                        0 === this._remaining && F(this.promise, this._result)))
                  : Y(
                      this.promise,
                      new Error('Array Methods must be provided an Array')
                    )
            }
            return (
              (t.prototype._enumerate = function(t) {
                for (var e = 0; this._state === E && e < t.length; e++)
                  this._eachEntry(t[e], e)
              }),
              (t.prototype._eachEntry = function(t, e) {
                var r = this._instanceConstructor,
                  n = r.resolve
                if (n === A) {
                  var o = x(t)
                  if (o === g && t._state !== E)
                    this._settledAt(t._state, e, t._result)
                  else if ('function' != typeof o)
                    this._remaining--, (this._result[e] = t)
                  else if (r === W) {
                    var i = new r(S)
                    C(i, t, o), this._willSettleAt(i, e)
                  } else
                    this._willSettleAt(
                      new r(function(e) {
                        return e(t)
                      }),
                      e
                    )
                } else this._willSettleAt(n(t), e)
              }),
              (t.prototype._settledAt = function(t, e, r) {
                var n = this.promise
                n._state === E &&
                  (this._remaining--,
                  t === M ? Y(n, r) : (this._result[e] = r)),
                  0 === this._remaining && F(n, this._result)
              }),
              (t.prototype._willSettleAt = function(t, e) {
                var r = this
                k(
                  t,
                  void 0,
                  function(t) {
                    return r._settledAt(T, e, t)
                  },
                  function(t) {
                    return r._settledAt(M, e, t)
                  }
                )
              }),
              t
            )
          })()
          var W = (function() {
            function e(t) {
              ;(this[j] = L++),
                (this._result = this._state = void 0),
                (this._subscribers = []),
                S !== t &&
                  ('function' != typeof t &&
                    (function() {
                      throw new TypeError(
                        'You must pass a resolver function as the first argument to the promise constructor'
                      )
                    })(),
                  this instanceof e
                    ? (function(t, e) {
                        try {
                          e(
                            function(e) {
                              O(t, e)
                            },
                            function(e) {
                              Y(t, e)
                            }
                          )
                        } catch (r) {
                          Y(t, r)
                        }
                      })(this, t)
                    : (function() {
                        throw new TypeError(
                          "Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."
                        )
                      })())
            }
            return (
              (e.prototype.catch = function(t) {
                return this.then(null, t)
              }),
              (e.prototype.finally = function(e) {
                var r = this.constructor
                return t(e)
                  ? this.then(
                      function(t) {
                        return r.resolve(e()).then(function() {
                          return t
                        })
                      },
                      function(t) {
                        return r.resolve(e()).then(function() {
                          throw t
                        })
                      }
                    )
                  : this.then(e, e)
              }),
              e
            )
          })()
          return (
            (W.prototype.then = g),
            (W.all = function(t) {
              return new U(this, t).promise
            }),
            (W.race = function(t) {
              var e = this
              return n(t)
                ? new e(function(r, n) {
                    for (var o = t.length, i = 0; i < o; i++)
                      e.resolve(t[i]).then(r, n)
                  })
                : new e(function(t, e) {
                    return e(new TypeError('You must pass an array to race.'))
                  })
            }),
            (W.resolve = A),
            (W.reject = function(t) {
              var e = new this(S)
              return Y(e, t), e
            }),
            (W._setScheduler = function(t) {
              s = t
            }),
            (W._setAsap = function(t) {
              u = t
            }),
            (W._asap = u),
            (W.polyfill = function() {
              var t = void 0
              if (void 0 !== e) t = e
              else if ('undefined' != typeof self) t = self
              else
                try {
                  t = Function('return this')()
                } catch (o) {
                  throw new Error(
                    'polyfill failed because global object is unavailable in this environment'
                  )
                }
              var r = t.Promise
              if (r) {
                var n = null
                try {
                  n = Object.prototype.toString.call(r.resolve())
                } catch (o) {}
                if ('[object Promise]' === n && !r.cast) return
              }
              t.Promise = W
            }),
            (W.Promise = W),
            W
          )
        })
      },
      {process: 'SrtY'},
    ],
    BUIB: [
      function(require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', {value: !0}),
          (exports.default = void 0)
        var e = window.CustomEvent
        function t(e) {
          for (; e && e !== document.body; ) {
            var t = window.getComputedStyle(e),
              o = function(e, o) {
                return !(void 0 === t[e] || t[e] === o)
              }
            if (
              t.opacity < 1 ||
              o('zIndex', 'auto') ||
              o('transform', 'none') ||
              o('mixBlendMode', 'normal') ||
              o('filter', 'none') ||
              o('perspective', 'none') ||
              'isolate' === t.isolation ||
              'fixed' === t.position ||
              'touch' === t.webkitOverflowScrolling
            )
              return !0
            e = e.parentElement
          }
          return !1
        }
        function o(e) {
          for (; e; ) {
            if ('dialog' === e.localName) return e
            e = e.parentElement
          }
          return null
        }
        function i(e) {
          e && e.blur && e !== document.body && e.blur()
        }
        function n(e, t) {
          for (var o = 0; o < e.length; ++o) if (e[o] === t) return !0
          return !1
        }
        function a(e) {
          return (
            !(!e || !e.hasAttribute('method')) &&
            'dialog' === e.getAttribute('method').toLowerCase()
          )
        }
        function r(e) {
          if (
            ((this.dialog_ = e),
            (this.replacedStyleTop_ = !1),
            (this.openAsModal_ = !1),
            e.hasAttribute('role') || e.setAttribute('role', 'dialog'),
            (e.show = this.show.bind(this)),
            (e.showModal = this.showModal.bind(this)),
            (e.close = this.close.bind(this)),
            'returnValue' in e || (e.returnValue = ''),
            'MutationObserver' in window)
          ) {
            new MutationObserver(this.maybeHideModal.bind(this)).observe(e, {
              attributes: !0,
              attributeFilter: ['open'],
            })
          } else {
            var t,
              o = !1,
              i = function() {
                o ? this.downgradeModal() : this.maybeHideModal(), (o = !1)
              }.bind(this),
              n = function(n) {
                if (n.target === e) {
                  var a = 'DOMNodeRemoved'
                  ;(o |= n.type.substr(0, a.length) === a),
                    window.clearTimeout(t),
                    (t = window.setTimeout(i, 0))
                }
              }
            ;[
              'DOMAttrModified',
              'DOMNodeRemoved',
              'DOMNodeRemovedFromDocument',
            ].forEach(function(t) {
              e.addEventListener(t, n)
            })
          }
          Object.defineProperty(e, 'open', {
            set: this.setOpen.bind(this),
            get: e.hasAttribute.bind(e, 'open'),
          }),
            (this.backdrop_ = document.createElement('div')),
            (this.backdrop_.className = 'backdrop'),
            this.backdrop_.addEventListener(
              'click',
              this.backdropClick_.bind(this)
            )
        }
        ;(e && 'object' != typeof e) ||
          ((e = function(e, t) {
            t = t || {}
            var o = document.createEvent('CustomEvent')
            return (
              o.initCustomEvent(
                e,
                !!t.bubbles,
                !!t.cancelable,
                t.detail || null
              ),
              o
            )
          }).prototype = window.Event.prototype),
          (r.prototype = {
            get dialog() {
              return this.dialog_
            },
            maybeHideModal: function() {
              ;(this.dialog_.hasAttribute('open') &&
                document.body.contains(this.dialog_)) ||
                this.downgradeModal()
            },
            downgradeModal: function() {
              this.openAsModal_ &&
                ((this.openAsModal_ = !1),
                (this.dialog_.style.zIndex = ''),
                this.replacedStyleTop_ &&
                  ((this.dialog_.style.top = ''),
                  (this.replacedStyleTop_ = !1)),
                this.backdrop_.parentNode &&
                  this.backdrop_.parentNode.removeChild(this.backdrop_),
                l.dm.removeDialog(this))
            },
            setOpen: function(e) {
              e
                ? this.dialog_.hasAttribute('open') ||
                  this.dialog_.setAttribute('open', '')
                : (this.dialog_.removeAttribute('open'), this.maybeHideModal())
            },
            backdropClick_: function(e) {
              if (this.dialog_.hasAttribute('tabindex')) this.dialog_.focus()
              else {
                var t = document.createElement('div')
                this.dialog_.insertBefore(t, this.dialog_.firstChild),
                  (t.tabIndex = -1),
                  t.focus(),
                  this.dialog_.removeChild(t)
              }
              var o = document.createEvent('MouseEvents')
              o.initMouseEvent(
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
              ),
                this.dialog_.dispatchEvent(o),
                e.stopPropagation()
            },
            focus_: function() {
              var e = this.dialog_.querySelector('[autofocus]:not([disabled])')
              if (
                (!e && this.dialog_.tabIndex >= 0 && (e = this.dialog_), !e)
              ) {
                var t = ['button', 'input', 'keygen', 'select', 'textarea'].map(
                  function(e) {
                    return e + ':not([disabled])'
                  }
                )
                t.push('[tabindex]:not([disabled]):not([tabindex=""])'),
                  (e = this.dialog_.querySelector(t.join(', ')))
              }
              i(document.activeElement), e && e.focus()
            },
            updateZIndex: function(e, t) {
              if (e < t) throw new Error('dialogZ should never be < backdropZ')
              ;(this.dialog_.style.zIndex = e),
                (this.backdrop_.style.zIndex = t)
            },
            show: function() {
              this.dialog_.open || (this.setOpen(!0), this.focus_())
            },
            showModal: function() {
              if (this.dialog_.hasAttribute('open'))
                throw new Error(
                  "Failed to execute 'showModal' on dialog: The element is already open, and therefore cannot be opened modally."
                )
              if (!document.body.contains(this.dialog_))
                throw new Error(
                  "Failed to execute 'showModal' on dialog: The element is not in a Document."
                )
              if (!l.dm.pushDialog(this))
                throw new Error(
                  "Failed to execute 'showModal' on dialog: There are too many open modal dialogs."
                )
              t(this.dialog_.parentElement) &&
                console.warn(
                  'A dialog is being shown inside a stacking context. This may cause it to be unusable. For more information, see this link: https://github.com/GoogleChrome/dialog-polyfill/#stacking-context'
                ),
                this.setOpen(!0),
                (this.openAsModal_ = !0),
                l.needsCentering(this.dialog_)
                  ? (l.reposition(this.dialog_), (this.replacedStyleTop_ = !0))
                  : (this.replacedStyleTop_ = !1),
                this.dialog_.parentNode.insertBefore(
                  this.backdrop_,
                  this.dialog_.nextSibling
                ),
                this.focus_()
            },
            close: function(t) {
              if (!this.dialog_.hasAttribute('open'))
                throw new Error(
                  "Failed to execute 'close' on dialog: The element does not have an 'open' attribute, and therefore cannot be closed."
                )
              this.setOpen(!1), void 0 !== t && (this.dialog_.returnValue = t)
              var o = new e('close', {bubbles: !1, cancelable: !1})
              this.dialog_.dispatchEvent(o)
            },
          })
        var l = {
          reposition: function(e) {
            var t =
                document.body.scrollTop || document.documentElement.scrollTop,
              o = t + (window.innerHeight - e.offsetHeight) / 2
            e.style.top = Math.max(t, o) + 'px'
          },
          isInlinePositionSetByStylesheet: function(e) {
            for (var t = 0; t < document.styleSheets.length; ++t) {
              var o = document.styleSheets[t],
                i = null
              try {
                i = o.cssRules
              } catch (c) {}
              if (i)
                for (var a = 0; a < i.length; ++a) {
                  var r = i[a],
                    l = null
                  try {
                    l = document.querySelectorAll(r.selectorText)
                  } catch (c) {}
                  if (l && n(l, e)) {
                    var s = r.style.getPropertyValue('top'),
                      d = r.style.getPropertyValue('bottom')
                    if ((s && 'auto' !== s) || (d && 'auto' !== d)) return !0
                  }
                }
            }
            return !1
          },
          needsCentering: function(e) {
            return (
              'absolute' === window.getComputedStyle(e).position &&
              (!(
                ('auto' !== e.style.top && '' !== e.style.top) ||
                ('auto' !== e.style.bottom && '' !== e.style.bottom)
              ) &&
                !l.isInlinePositionSetByStylesheet(e))
            )
          },
          forceRegisterDialog: function(e) {
            if (
              ((window.HTMLDialogElement || e.showModal) &&
                console.warn(
                  'This browser already supports <dialog>, the polyfill may not work correctly',
                  e
                ),
              'dialog' !== e.localName)
            )
              throw new Error(
                'Failed to register dialog: The element is not a dialog.'
              )
            new r(e)
          },
          registerDialog: function(e) {
            e.showModal || l.forceRegisterDialog(e)
          },
          DialogManager: function() {
            this.pendingDialogStack = []
            var e = this.checkDOM_.bind(this)
            ;(this.overlay = document.createElement('div')),
              (this.overlay.className = '_dialog_overlay'),
              this.overlay.addEventListener(
                'click',
                function(t) {
                  ;(this.forwardTab_ = void 0), t.stopPropagation(), e([])
                }.bind(this)
              ),
              (this.handleKey_ = this.handleKey_.bind(this)),
              (this.handleFocus_ = this.handleFocus_.bind(this)),
              (this.zIndexLow_ = 1e5),
              (this.zIndexHigh_ = 100150),
              (this.forwardTab_ = void 0),
              'MutationObserver' in window &&
                (this.mo_ = new MutationObserver(function(t) {
                  var o = []
                  t.forEach(function(e) {
                    for (var t, i = 0; (t = e.removedNodes[i]); ++i)
                      t instanceof Element &&
                        ('dialog' === t.localName && o.push(t),
                        (o = o.concat(t.querySelectorAll('dialog'))))
                  }),
                    o.length && e(o)
                }))
          },
        }
        if (
          ((l.DialogManager.prototype.blockDocument = function() {
            document.documentElement.addEventListener(
              'focus',
              this.handleFocus_,
              !0
            ),
              document.addEventListener('keydown', this.handleKey_),
              this.mo_ &&
                this.mo_.observe(document, {childList: !0, subtree: !0})
          }),
          (l.DialogManager.prototype.unblockDocument = function() {
            document.documentElement.removeEventListener(
              'focus',
              this.handleFocus_,
              !0
            ),
              document.removeEventListener('keydown', this.handleKey_),
              this.mo_ && this.mo_.disconnect()
          }),
          (l.DialogManager.prototype.updateStacking = function() {
            for (
              var e, t = this.zIndexHigh_, o = 0;
              (e = this.pendingDialogStack[o]);
              ++o
            )
              e.updateZIndex(--t, --t),
                0 === o && (this.overlay.style.zIndex = --t)
            var i = this.pendingDialogStack[0]
            i
              ? (i.dialog.parentNode || document.body).appendChild(this.overlay)
              : this.overlay.parentNode &&
                this.overlay.parentNode.removeChild(this.overlay)
          }),
          (l.DialogManager.prototype.containedByTopDialog_ = function(e) {
            for (; (e = o(e)); ) {
              for (var t, i = 0; (t = this.pendingDialogStack[i]); ++i)
                if (t.dialog === e) return 0 === i
              e = e.parentElement
            }
            return !1
          }),
          (l.DialogManager.prototype.handleFocus_ = function(e) {
            if (
              !this.containedByTopDialog_(e.target) &&
              document.activeElement !== document.documentElement &&
              (e.preventDefault(),
              e.stopPropagation(),
              i(e.target),
              void 0 !== this.forwardTab_)
            ) {
              var t = this.pendingDialogStack[0]
              return (
                t.dialog.compareDocumentPosition(e.target) &
                  Node.DOCUMENT_POSITION_PRECEDING &&
                  (this.forwardTab_
                    ? t.focus_()
                    : e.target !== document.documentElement &&
                      document.documentElement.focus()),
                !1
              )
            }
          }),
          (l.DialogManager.prototype.handleKey_ = function(t) {
            if (((this.forwardTab_ = void 0), 27 === t.keyCode)) {
              t.preventDefault(), t.stopPropagation()
              var o = new e('cancel', {bubbles: !1, cancelable: !0}),
                i = this.pendingDialogStack[0]
              i && i.dialog.dispatchEvent(o) && i.dialog.close()
            } else 9 === t.keyCode && (this.forwardTab_ = !t.shiftKey)
          }),
          (l.DialogManager.prototype.checkDOM_ = function(e) {
            this.pendingDialogStack.slice().forEach(function(t) {
              ;-1 !== e.indexOf(t.dialog)
                ? t.downgradeModal()
                : t.maybeHideModal()
            })
          }),
          (l.DialogManager.prototype.pushDialog = function(e) {
            var t = (this.zIndexHigh_ - this.zIndexLow_) / 2 - 1
            return (
              !(this.pendingDialogStack.length >= t) &&
              (1 === this.pendingDialogStack.unshift(e) && this.blockDocument(),
              this.updateStacking(),
              !0)
            )
          }),
          (l.DialogManager.prototype.removeDialog = function(e) {
            var t = this.pendingDialogStack.indexOf(e)
            ;-1 !== t &&
              (this.pendingDialogStack.splice(t, 1),
              0 === this.pendingDialogStack.length && this.unblockDocument(),
              this.updateStacking())
          }),
          (l.dm = new l.DialogManager()),
          (l.formSubmitter = null),
          (l.useValue = null),
          void 0 === window.HTMLDialogElement)
        ) {
          var s = document.createElement('form')
          if ((s.setAttribute('method', 'dialog'), 'dialog' !== s.method)) {
            var d = Object.getOwnPropertyDescriptor(
              HTMLFormElement.prototype,
              'method'
            )
            if (d) {
              var c = d.get
              d.get = function() {
                return a(this) ? 'dialog' : c.call(this)
              }
              var u = d.set
              ;(d.set = function(e) {
                return 'string' == typeof e && 'dialog' === e.toLowerCase()
                  ? this.setAttribute('method', e)
                  : u.call(this, e)
              }),
                Object.defineProperty(HTMLFormElement.prototype, 'method', d)
            }
          }
          document.addEventListener(
            'click',
            function(e) {
              if (
                ((l.formSubmitter = null),
                (l.useValue = null),
                !e.defaultPrevented)
              ) {
                var t = e.target
                if (t && a(t.form)) {
                  if (
                    !(
                      'submit' === t.type &&
                      ['button', 'input'].indexOf(t.localName) > -1
                    )
                  ) {
                    if ('input' !== t.localName || 'image' !== t.type) return
                    l.useValue = e.offsetX + ',' + e.offsetY
                  }
                  o(t) && (l.formSubmitter = t)
                }
              }
            },
            !1
          )
          var h = HTMLFormElement.prototype.submit,
            g = function() {
              if (!a(this)) return h.call(this)
              var e = o(this)
              e && e.close()
            }
          ;(HTMLFormElement.prototype.submit = g),
            document.addEventListener(
              'submit',
              function(e) {
                var t = e.target
                if (a(t)) {
                  e.preventDefault()
                  var i = o(t)
                  if (i) {
                    var n = l.formSubmitter
                    n && n.form === t
                      ? i.close(l.useValue || n.value)
                      : i.close(),
                      (l.formSubmitter = null)
                  }
                }
              },
              !0
            )
        }
        var p = l
        exports.default = p
      },
      {},
    ],
    JBrm: [
      function(require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', {value: !0}),
          (exports.setEnvironment = o),
          (exports.default = void 0)
        var e = {}
        function o(o) {
          var r = o.Promise,
            t = o.dialogPolyfill
          r && (e.Promise = r), t && (e.dialogPolyfill = t)
        }
        var r = e
        exports.default = r
      },
      {},
    ],
    cHCQ: [
      function(require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', {value: !0}),
          (exports.DIALOG_TYPE_PROMPT = exports.DIALOG_TYPE_CONFIRM = exports.DIALOG_TYPE_ALERT = exports.ACTION_TYPE_CANCEL = exports.ACTION_TYPE_CONFIRM = exports.ACTION = exports.CLOSE_BTN = exports.ACTIONS = exports.FOOT = exports.INPUT = exports.MESSAGE_BODY = exports.MESSAGE = exports.BODY = exports.TITLE = exports.HEAD = exports.CONTAINER = void 0)
        var o = 'fu',
          t = ''.concat(o, '-dialog'),
          r = t
        exports.CONTAINER = r
        var e = ''.concat(t, '__head')
        exports.HEAD = e
        var _ = ''.concat(t, '__title')
        exports.TITLE = _
        var s = ''.concat(t, '__body')
        exports.BODY = s
        var a = ''.concat(t, '__message')
        exports.MESSAGE = a
        var c = ''.concat(t, '__message-body')
        exports.MESSAGE_BODY = c
        var p = ''.concat(t, '__input')
        exports.INPUT = p
        var T = ''.concat(t, '__foot')
        exports.FOOT = T
        var x = ''.concat(t, '__actions')
        exports.ACTIONS = x
        var O = ''.concat(t, '__close')
        exports.CLOSE_BTN = O
        var E = ''.concat(t, '__action')
        exports.ACTION = E
        var A = ''.concat(E, '--confirm')
        exports.ACTION_TYPE_CONFIRM = A
        var I = ''.concat(E, '--cancel')
        exports.ACTION_TYPE_CANCEL = I
        var n = ''.concat(t, '--alert')
        exports.DIALOG_TYPE_ALERT = n
        var N = ''.concat(t, '--confirm')
        exports.DIALOG_TYPE_CONFIRM = N
        var C = ''.concat(t, '--prompt')
        exports.DIALOG_TYPE_PROMPT = C
      },
      {},
    ],
    mJHy: [
      function(require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', {value: !0}),
          (exports.default = void 0)
        var e = 9007199254740991
        function t(t) {
          return 'number' == typeof t && t > -1 && t % 1 == 0 && t <= e
        }
        var r = t
        exports.default = r
      },
      {},
    ],
    P7jw: [
      function(require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', {value: !0}),
          (exports.default = void 0)
        var e = t(require('./is-length'))
        function t(e) {
          return e && e.__esModule ? e : {default: e}
        }
        function r(t) {
          return t && 'function' != typeof t && (0, e.default)(t.length)
        }
        var u = r
        exports.default = u
      },
      {'./is-length': 'mJHy'},
    ],
    nOI8: [
      function(require, module, exports) {
        'use strict'
        function e(e) {
          return e && 'number' == typeof e.nodeType
        }
        Object.defineProperty(exports, '__esModule', {value: !0}),
          (exports.default = void 0)
        var t = e
        exports.default = t
      },
      {},
    ],
    e1ok: [
      function(require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', {value: !0}),
          (exports.default = void 0)
        var e = u(require('../utils/is-array-like')),
          r = u(require('../utils/for-each')),
          t = u(require('../utils/is-node'))
        function u(e) {
          return e && e.__esModule ? e : {default: e}
        }
        function i(u, l) {
          return 'string' == typeof l
            ? ((u.innerHTML = l), u)
            : (0, t.default)(l)
            ? (u.appendChild(l), u)
            : (0, e.default)(l)
            ? (r.default.call(l, function(e) {
                i(u, e)
              }),
              u)
            : u
        }
        var l = i
        exports.default = l
      },
      {
        '../utils/is-array-like': 'P7jw',
        '../utils/for-each': 'NwqO',
        '../utils/is-node': 'nOI8',
      },
    ],
    SGyF: [
      function(require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', {value: !0}),
          (exports.default = void 0)
        var e = t(require('./add-listener'))
        function t(e) {
          return e && e.__esModule ? e : {default: e}
        }
        function r(e) {
          return e.preventDefault(), !1
        }
        function u(t, u) {
          return (0, e.default)(t, u, r)
        }
        var n = u
        exports.default = n
      },
      {'./add-listener': 'J47R'},
    ],
    '0t4r': [
      function(require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', {value: !0}),
          (exports.setDefaults = o),
          (exports.default = void 0)
        var e = t(require('../utils/assign'))
        function t(e) {
          return e && e.__esModule ? e : {default: e}
        }
        function r(e, t, r) {
          return (
            t in e
              ? Object.defineProperty(e, t, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[t] = r),
            e
          )
        }
        var n = {
          title: '提示',
          confirmActionText: '确定',
          cancelActionText: '取消',
          promptPlaceholder: '请输入',
          reverseActions: !1,
          closeButton: '关闭',
          preventCancel: !0,
        }
        function o(t, o) {
          return (
            2 === arguments.length && (t = r({}, t, o)), (0, e.default)(n, t)
          )
        }
        var u = n
        exports.default = u
      },
      {'../utils/assign': 'ANwP'},
    ],
    Nsw3: [
      function(require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', {value: !0}),
          (exports.default = void 0)
        var e = r(require('./defaults')),
          t = r(require('../utils/get-type')),
          u = r(require('../utils/assign'))
        function r(e) {
          return e && e.__esModule ? e : {default: e}
        }
        function s(r) {
          var s =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : e.default
          return (
            'Object' !== (0, t.default)(r) && (r = {message: r}),
            (r = (0, u.default)(s, r))
          )
        }
        var a = s
        exports.default = a
      },
      {
        './defaults': '0t4r',
        '../utils/get-type': '8iLZ',
        '../utils/assign': 'ANwP',
      },
    ],
    HuUp: [
      function(require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', {value: !0}),
          (exports.default = exports.createCancelAction = exports.createConfirmAction = void 0)
        var e = s(require('../utils/assign')),
          t = s(require('../utils/noop')),
          r = s(require('../utils/return-false')),
          n = s(require('../utils/return-true')),
          a = s(require('../dom/parse-classnames')),
          o = s(require('../dom/create-element')),
          u = c(require('./classnames')),
          i = s(require('./defaults'))
        function c(e) {
          if (e && e.__esModule) return e
          var t = {}
          if (null != e)
            for (var r in e)
              if (Object.prototype.hasOwnProperty.call(e, r)) {
                var n =
                  Object.defineProperty && Object.getOwnPropertyDescriptor
                    ? Object.getOwnPropertyDescriptor(e, r)
                    : {}
                n.get || n.set ? Object.defineProperty(t, r, n) : (t[r] = e[r])
              }
          return (t.default = e), t
        }
        function s(e) {
          return e && e.__esModule ? e : {default: e}
        }
        function l(i, c) {
          var s =
            arguments.length > 2 && void 0 !== arguments[2]
              ? arguments[2]
              : t.default
          'function' == typeof c && ((s = c), (c = {})),
            !1 === s && (s = r.default),
            !0 === s && (s = n.default),
            (c = (0, e.default)({textContent: String(i)}, c))
          var l = (0, a.default)(c.className)
          return (
            l.unshift(u.ACTION),
            (c.className = l),
            {el: (0, o.default)('button', c), action: s}
          )
        }
        function f(e) {
          var t = ''
          return (
            'confirm' === e
              ? (t = u.ACTION_TYPE_CONFIRM)
              : 'cancel' === e && (t = u.ACTION_TYPE_CANCEL),
            function(r, n) {
              var a = i.default[''.concat(e, 'ActionText')]
              return (
                'function' == typeof r && ((n = r), (r = a)),
                l((r = r || a), {className: t}, n)
              )
            }
          )
        }
        var d = f('confirm')
        exports.createConfirmAction = d
        var p = f('cancel')
        exports.createCancelAction = p
        var v = l
        exports.default = v
      },
      {
        '../utils/assign': 'ANwP',
        '../utils/noop': 'EpJ+',
        '../utils/return-false': 'Ig3t',
        '../utils/return-true': 'CAQo',
        '../dom/parse-classnames': 'RAYM',
        '../dom/create-element': 'XRJ7',
        './classnames': 'cHCQ',
        './defaults': '0t4r',
      },
    ],
    t1hI: [
      function(require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', {value: !0}),
          (exports.default = void 0)
        var e = n(require('../utils/is-array-like')),
          t = n(require('../utils/is-node')),
          r = o(require('./create-action'))
        function o(e) {
          if (e && e.__esModule) return e
          var t = {}
          if (null != e)
            for (var r in e)
              if (Object.prototype.hasOwnProperty.call(e, r)) {
                var o =
                  Object.defineProperty && Object.getOwnPropertyDescriptor
                    ? Object.getOwnPropertyDescriptor(e, r)
                    : {}
                o.get || o.set ? Object.defineProperty(t, r, o) : (t[r] = e[r])
              }
          return (t.default = e), t
        }
        function n(e) {
          return e && e.__esModule ? e : {default: e}
        }
        function i(o) {
          return (
            'string' == typeof o && (o = {text: o}),
            (0, e.default)(o)
              ? i(o[0])
              : ((0, t.default)(o) && (o = {el: o}),
                'function' == typeof o.el && (o.el = o.el()),
                (o !== r.createConfirmAction && o !== r.createCancelAction) ||
                  (o = o()),
                ('function' != typeof o && 'boolean' != typeof o) ||
                  (o = (0, r.createConfirmAction)(o)),
                o.el || (o = (0, r.default)(o.text, o.action)),
                o)
          )
        }
        var u = i
        exports.default = u
      },
      {
        '../utils/is-array-like': 'P7jw',
        '../utils/is-node': 'nOI8',
        './create-action': 'HuUp',
      },
    ],
    '3VV+': [
      function(require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', {value: !0}),
          (exports.default = void 0)
        var e = r(require('../dom/add-listener'))
        function r(e) {
          return e && e.__esModule ? e : {default: e}
        }
        function t(r, t, u) {
          var a = t.el,
            d = t.action
          return (
            (0, e.default)(a, 'click', function() {
              var e
              d && (e = d.call(u)), !1 !== e && u.remove()
            }),
            r.appendChild(a),
            r
          )
        }
        var u = t
        exports.default = u
      },
      {'../dom/add-listener': 'J47R'},
    ],
    Ufp6: [
      function(require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', {value: !0}),
          (exports.default = void 0)
        var e = s(require('../utils/document')),
          t = f(require('./classnames')),
          n = s(require('../dom/create-element')),
          r = s(require('../dom/append-elements')),
          i = s(require('../dom/add-listener')),
          a = s(require('../dom/prevent-event')),
          o = s(require('./parse-options')),
          l = s(require('./parse-action')),
          u = s(require('./render-action')),
          c = s(require('./env')),
          d = s(require('../utils/for-each'))
        function f(e) {
          if (e && e.__esModule) return e
          var t = {}
          if (null != e)
            for (var n in e)
              if (Object.prototype.hasOwnProperty.call(e, n)) {
                var r =
                  Object.defineProperty && Object.getOwnPropertyDescriptor
                    ? Object.getOwnPropertyDescriptor(e, n)
                    : {}
                r.get || r.set ? Object.defineProperty(t, n, r) : (t[n] = e[n])
              }
          return (t.default = e), t
        }
        function s(e) {
          return e && e.__esModule ? e : {default: e}
        }
        function v(e, t) {
          if (!(e instanceof t))
            throw new TypeError('Cannot call a class as a function')
        }
        function p(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n]
            ;(r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              'value' in r && (r.writable = !0),
              Object.defineProperty(e, r.key, r)
          }
        }
        function h(e, t, n) {
          return t && p(e.prototype, t), n && p(e, n), e
        }
        function m(e) {
          var t = c.default.dialogPolyfill,
            n = (void 0 === t ? {} : t).registerDialog
          return n ? n(e) : e
        }
        var y = (function() {
            function c(f, s) {
              v(this, c)
              var p = this,
                h = !(
                  null === (f = (0, o.default)(f)).title ||
                  !1 === f.title ||
                  void 0 === f.title
                ),
                y = f.content,
                O = 'message' in f,
                g = (f.actions || []).map(l.default),
                b = f,
                q = b.closeButton,
                C = void 0 === q ? '' : q,
                E = b.onClose,
                S = f,
                N = S.preventCancel,
                P = S.onCancel,
                T = (0, n.default)('dialog', t.CONTAINER)
              if (
                (m(T),
                N
                  ? (0, a.default)(T, 'cancel')
                  : (0, i.default)(T, 'cancel', function() {
                      P && P(), p.remove()
                    }),
                (this.container = T),
                C)
              ) {
                var _ = (0, n.default)(T, 'button', {
                  className: t.CLOSE_BTN,
                  innerHTML: '<span>'.concat(String(C), '</span>'),
                })
                ;(0, i.default)(_, 'click', function() {
                  E && E(), p.remove()
                })
              }
              if (h) {
                var j = (0, n.default)(T, 'div', t.HEAD)
                this.head = j
                ;(0, n.default)(j, 'div', {
                  className: t.TITLE,
                  textContent: String(f.title),
                })
              }
              if (y || O) {
                var w = (0, n.default)(T, 'div', t.BODY)
                if (((this.body = w), y)) (0, r.default)(w, f.content)
                else if (O) {
                  var M = (0, n.default)(w, 'div', t.MESSAGE)
                  ;(0, n.default)(M, 'span', {
                    className: t.MESSAGE_BODY,
                    textContent: String(f.message),
                  })
                }
              }
              if (0 !== g.length) {
                var D = (0, n.default)(T, 'div', t.FOOT)
                this.foot = D
                var k = (0, n.default)(D, 'div', t.ACTIONS)
                d.default.call(g, function(e) {
                  return (0, u.default)(k, e, p)
                })
              }
              e.default.body.appendChild(this.container),
                !1 !== s && this.open()
            }
            return (
              h(c, [
                {
                  key: 'open',
                  value: function() {
                    this.container.showModal()
                  },
                },
                {
                  key: 'remove',
                  value: function() {
                    this.container.parentNode.removeChild(this.container)
                  },
                },
                {
                  key: 'close',
                  value: function() {
                    this.container.close()
                  },
                },
              ]),
              c
            )
          })(),
          O = y
        exports.default = O
      },
      {
        '../utils/document': '86LI',
        './classnames': 'cHCQ',
        '../dom/create-element': 'XRJ7',
        '../dom/append-elements': 'e1ok',
        '../dom/add-listener': 'J47R',
        '../dom/prevent-event': 'SGyF',
        './parse-options': 'Nsw3',
        './parse-action': 't1hI',
        './render-action': '3VV+',
        './env': 'JBrm',
        '../utils/for-each': 'NwqO',
      },
    ],
    zzOV: [
      function(require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', {value: !0}),
          (exports.default = void 0)
        var e = t(require('../utils/noop')),
          r = t(require('./env'))
        function t(e) {
          return e && e.__esModule ? e : {default: e}
        }
        function u(t) {
          return function(u) {
            var n,
              o =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : e.default,
              i = r.default.Promise
            if (i) {
              var l = new i(function(e) {
                n = t(u, function(r) {
                  return e(r), o.call(this, r)
                })
              })
              return (l.dialog = n), l
            }
            return t(u, o)
          }
        }
        var n = u
        exports.default = n
      },
      {'../utils/noop': 'EpJ+', './env': 'JBrm'},
    ],
    'S+Ru': [
      function(require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', {value: !0}),
          (exports.default = void 0)
        var e = require('./supports')
        function t(e, t) {
          return e.classList.add(t), e
        }
        function r(e, t) {
          return (e.className += ' '.concat(t)), e
        }
        var s = e.SUPPORTS_CLASS_LIST ? t : r
        exports.default = s
      },
      {'./supports': 'z/cM'},
    ],
    'K+7+': [
      function(require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', {value: !0}),
          (exports.alert = d),
          (exports.confirm = f),
          (exports.prompt = p)
        var e = s(require('../utils/noop')),
          t = u(require('./classnames')),
          r = s(require('../dom/create-element')),
          n = s(require('../dom/add-class')),
          a = s(require('../dom/append-elements')),
          o = s(require('./defaults')),
          l = s(require('./dialog')),
          i = require('./create-action'),
          c = s(require('./parse-options'))
        function u(e) {
          if (e && e.__esModule) return e
          var t = {}
          if (null != e)
            for (var r in e)
              if (Object.prototype.hasOwnProperty.call(e, r)) {
                var n =
                  Object.defineProperty && Object.getOwnPropertyDescriptor
                    ? Object.getOwnPropertyDescriptor(e, r)
                    : {}
                n.get || n.set ? Object.defineProperty(t, r, n) : (t[r] = e[r])
              }
          return (t.default = e), t
        }
        function s(e) {
          return e && e.__esModule ? e : {default: e}
        }
        function d(r) {
          var a =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : e.default
          if (!(r = (0, c.default)(r)).actions) {
            var o = (0, i.createConfirmAction)(a)
            r.actions = [o]
          }
          r.onClose = a
          var u = new l.default(r)
          return (0, n.default)(u.container, t.DIALOG_TYPE_ALERT), u
        }
        function f(r) {
          var a =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : e.default
          function u() {
            return a.call(this, !1)
          }
          if (!(r = (0, c.default)(r)).actions) {
            var s = (0, i.createConfirmAction)(function() {
                return a.call(this, !0)
              }),
              d = (0, i.createCancelAction)(u)
            o.default.reverseActions
              ? (r.actions = [d, s])
              : (r.actions = [s, d])
          }
          r.onClose = u
          var f = new l.default(r)
          return (0, n.default)(f.container, t.DIALOG_TYPE_CONFIRM), f
        }
        function p(u) {
          var s =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : e.default
          ;(u = (0, c.default)(u, {title: null, closeButton: !1})).content ||
            'message' in u ||
            (u.content = [])
          var d = u.input
          function f() {
            return s.call(this)
          }
          if (
            (d ||
              (d = u.rows
                ? (0, r.default)('textarea', {
                    className: t.INPUT,
                    rows: u.rows,
                    placeholder: u.placeholder || o.default.promptPlaceholder,
                  })
                : (0, r.default)('input', {
                    className: t.INPUT,
                    placeholder: u.placeholder || o.default.promptPlaceholder,
                  })),
            !u.actions)
          ) {
            var p = (0, i.createConfirmAction)(function() {
                return s.call(this, d.value)
              }),
              v = (0, i.createCancelAction)(f)
            o.default.reverseActions
              ? (u.actions = [v, p])
              : (u.actions = [p, v])
          }
          u.onClose = f
          var m = new l.default(u, !1)
          return (
            (0, n.default)(m.container, t.DIALOG_TYPE_PROMPT),
            (0, a.default)(m.body, d),
            m.open(),
            m
          )
        }
      },
      {
        '../utils/noop': 'EpJ+',
        './classnames': 'cHCQ',
        '../dom/create-element': 'XRJ7',
        '../dom/add-class': 'S+Ru',
        '../dom/append-elements': 'e1ok',
        './defaults': '0t4r',
        './dialog': 'Ufp6',
        './create-action': 'HuUp',
        './parse-options': 'Nsw3',
      },
    ],
    CoU7: [
      function(require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', {value: !0}),
          (exports.default = void 0)
        var e = c(require('./dialog')),
          t = c(require('./shortcut-wrapper')),
          r = c(require('../utils/assign')),
          n = i(require('./defaults')),
          a = require('./shortcuts'),
          o = i(require('./create-action')),
          u = i(require('./env'))
        function i(e) {
          if (e && e.__esModule) return e
          var t = {}
          if (null != e)
            for (var r in e)
              if (Object.prototype.hasOwnProperty.call(e, r)) {
                var n =
                  Object.defineProperty && Object.getOwnPropertyDescriptor
                    ? Object.getOwnPropertyDescriptor(e, r)
                    : {}
                n.get || n.set ? Object.defineProperty(t, r, n) : (t[r] = e[r])
              }
          return (t.default = e), t
        }
        function c(e) {
          return e && e.__esModule ? e : {default: e}
        }
        function l() {
          function i(t) {
            return new e.default(t)
          }
          return (
            (0, r.default)(i, {
              env: u.default,
              setEnvironment: u.setEnvironment,
              defaults: n.default,
              setDefaults: n.setDefaults,
              dialog: i,
              Dialog: e.default,
              alert: (0, t.default)(a.alert),
              confirm: (0, t.default)(a.confirm),
              prompt: (0, t.default)(a.prompt),
              action: (0, r.default)(o.default, {
                confirm: o.createConfirmAction,
                cancel: o.createCancelAction,
              }),
              btn: {
                confirm: (0, o.createConfirmAction)(),
                cancel: (0, o.createCancelAction)(),
              },
            }),
            i
          )
        }
        var f = l
        exports.default = f
      },
      {
        './dialog': 'Ufp6',
        './shortcut-wrapper': 'zzOV',
        '../utils/assign': 'ANwP',
        './defaults': '0t4r',
        './shortcuts': 'K+7+',
        './create-action': 'HuUp',
        './env': 'JBrm',
      },
    ],
    ZfHS: [
      function(require, module, exports) {
        'use strict'
        Object.defineProperty(exports, '__esModule', {value: !0}),
          (exports.default = void 0)
        var e = o(require('es6-promise')),
          r = o(require('dialog-polyfill')),
          l = o(require('./core/env')),
          u = o(require('./utils/assign')),
          t = o(require('./core/export-module'))
        function o(e) {
          return e && e.__esModule ? e : {default: e}
        }
        ;(0, u.default)(l.default, {
          Promise: e.default,
          dialogPolyfill: r.default,
        })
        var i = (0, t.default)()
        exports.default = i
      },
      {
        'es6-promise': 'Zt7E',
        'dialog-polyfill': 'BUIB',
        './core/env': 'JBrm',
        './utils/assign': 'ANwP',
        './core/export-module': 'CoU7',
      },
    ],
    lgAh: [
      function(require, module, exports) {
        'use strict'
        var t = i(require('../src/utils/get-type')),
          e = i(require('../src/utils/global-this')),
          n = i(require('../src/utils/document')),
          o = i(require('../src/utils/for-each')),
          r = i(require('../src/utils/assign')),
          a = i(require('../src/utils/noop')),
          l = i(require('../src/dom/add-listener')),
          c = i(require('../src/dom/create-element')),
          u = i(require('../src/full-version'))
        function i(t) {
          return t && t.__esModule ? t : {default: t}
        }
        function f(t) {
          return (f =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function(t) {
                  return typeof t
                }
              : function(t) {
                  return t &&
                    'function' == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? 'symbol'
                    : typeof t
                })(t)
        }
        function s(t) {
          var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {},
            n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : a.default
          'function' == typeof e && ((n = e || a.default), (e = {})),
            (e = (0, r.default)({textContent: t}, e))
          var o = (0, c.default)('button', e)
          return (0, l.default)(o, n), o
        }
        var d = n.default.getElementById('js-data-types'),
          m = [
            void 0,
            null,
            123,
            NaN,
            !0,
            !1,
            [1, 2, 3],
            'string',
            new Date(),
            e.default.Symbol ? Symbol('symbol') : 'symbol(string)',
            new Error('error'),
            /regexp/,
          ]
        function p() {
          function t(t, e) {
            var n = (0, c.default)(t, e)
            return (n.className = 'f-dialog__action'), n
          }
          u.default.dialog({
            message: '自定义确定按钮',
            actions: [
              '按钮文字',
              {
                text: '按钮Object',
                action: function() {
                  console.log(this)
                },
              },
              t('button', {textContent: 'HTML元素'}),
              {
                el: t('a', {
                  textContent: 'el: HTML元素',
                  href: e.default.location.href,
                  target: '_blank',
                }),
              },
              {
                el: function() {
                  return t('button', {textContent: 'el: 函数'})
                },
              },
              function() {
                alert('函数')
              },
              ['类数组(如jQuery对象)'],
              u.default.action('_.action'),
              u.default.action.confirm('_.action.confirm'),
              u.default.action.cancel('_.action.cancel'),
            ],
          }).container.style.width = 'auto'
        }
        function y() {
          u.default.alert('请点击确定', function() {
            alert('【确定】按钮被点击')
          })
        }
        function b() {
          u.default.alert('请点击确定').then(function() {
            alert('【确定】按钮被点击')
          })
        }
        function g() {
          u.default.confirm('请点击一个按钮', function(t) {
            alert('【'.concat(t ? '确定' : '取消', '】按钮被点击'))
          })
        }
        function h() {
          u.default.confirm('请点击一个按钮').then(function(t) {
            alert('【'.concat(t ? '确定' : '取消', '】按钮被点击'))
          })
        }
        function v() {
          u.default.prompt('请输入点什么', function(t) {
            alert(''.concat(f(t), ' : ').concat(t))
          })
        }
        function C() {
          u.default
            .prompt({message: '请输入点什么', rows: 5})
            .then(function(t) {
              alert(''.concat(f(t), ' : ').concat(t))
            })
        }
        function q() {
          u.default.alert({
            message: 'test',
            actions: [
              u.default.action.confirm('return false in action', function() {
                return !1
              }),
            ],
          })
        }
        function _() {
          u.default.alert('return false in callback', function() {
            return !1
          })
        }
        o.default.call(m, function(e) {
          var n = s(''.concat((0, t.default)(e), ': ').concat(String(e)))
          ;(0, l.default)(n, 'click', function() {
            u.default.alert(e)
          }),
            d.appendChild(n)
        }),
          (e.default._ = u.default),
          (e.default.demo = {
            customActions: p,
            preventClose: q,
            preventClose2: _,
            alertCallback: y,
            alertPromise: b,
            confirmCallback: g,
            confirmPromise: h,
            promptCallback: v,
            promptPromise: C,
          })
      },
      {
        '../src/utils/get-type': '8iLZ',
        '../src/utils/global-this': 'mCin',
        '../src/utils/document': '86LI',
        '../src/utils/for-each': 'NwqO',
        '../src/utils/assign': 'ANwP',
        '../src/utils/noop': 'EpJ+',
        '../src/dom/add-listener': 'J47R',
        '../src/dom/create-element': 'XRJ7',
        '../src/full-version': 'ZfHS',
      },
    ],
  },
  {},
  ['lgAh'],
  null
)
//# sourceMappingURL=/demo.b9db01ab.js.map
