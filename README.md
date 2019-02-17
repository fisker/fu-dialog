# fu-dialog

> dialog

[![Gzip Size](http://img.badgesize.io/https://unpkg.com/fu-dialog/lib/full-version/dialog.umd.min.js?compression=gzip&style=flat-square)](https://unpkg.com/fu-dialog/lib/full-version/dialog.umd.min.js) |

## files

```text
dist/
├─ full-version (full version include es6-promise and dialog-polyfill, default)
│  ├─ dialog.cjs.js      (CommonJS)
│  ├─ dialog.cjs.min.js  (CommonJS, compressed, default)
│  ├─ dialog.esm.mjs      (ES Module)
│  ├─ dialog.esm.min.mjs  (ES Module, compressed)
│  ├─ dialog.iife.js     (IIFE-style)
│  ├─ dialog.iife.min.js (IIFE-style, compressed)
│  ├─ dialog.umd.js      (UMD)
│  ├─ dialog.umd.min.js  (UMD, compressed)
│  ├─ dialog.css         (css)
│  └─ dialog.min.css     (css, compressed)
├─ pure-version (pure version)
│  ├─ dialog.cjs.js      (CommonJS)
│  ├─ dialog.cjs.min.js  (CommonJS, compressed, default)
│  ├─ dialog.esm.mjs     (ES Module)
│  ├─ dialog.esm.min.mjs (ES Module, compressed)
│  ├─ dialog.iife.js     (IIFE-style)
│  ├─ dialog.iife.min.js (IIFE-style, compressed)
│  ├─ dialog.umd.js      (UMD)
│  ├─ dialog.umd.min.js  (UMD, compressed)
│  ├─ dialog.css         (css)
│  └─ dialog.min.css     (css, compressed)
└─ styles (styles)
   └─ scss  (SCSS)
     ├─ _dialog.scss           (dialog)
     └─ _dialog-polyfill.scss  (dialog polyfill)
```

## install

```sh
yarn add fu-dialog
```

in browser

```html
<!-- style -->
<link
  href="https://unpkg.com/fu-dialog/lib/full-version/dialog.min.css"
  rel="stylesheet"
/>
<!-- module -->
<script type="module">
  import fd from 'https://unpkg.com/fu-dialog?module'
  fd.alert('fu-dialog(module) loaded.')
</script>
<!-- no module -->
<script src="https://unpkg.com/fu-dialog" nomodule></script>
<script nomodule>
  fd.alert('fu-dialog(no module) loaded.')
</script>
```

## ustage`

```js
import fd from 'fu-dialog'

fd.alert('fu-dialog')
```

### fd.Dialog

syntax

```js
new fd.Dialog(options[, show])
```

- **options**

  - Type: `Object` or `any`
  - options is a none `null` `Object`, equals to `{message: options}`

- **options**

  - Type: `Object` or `any`
  - Default: `true`
  - show `dialog` when created

- **@return**
  - `fd.Dialog` instance

### fd.dialog

syntax

```js
dialog(options[, show])
```

- same as `fd.Dialog`, but no `new` operator needed.

### short cuts

shortcuts for `dialog`, include `alert`, `confirm`, `prompt`

```js
fd.alert(options[, onAction])
fd.confirm(options[, onAction])
fd.prompt(options[, onAction])
```

- **options**

  - options pass to `fd.Dialog`

- **onAction**

  - Type: `Function`
  - Default: `noop`
  - a function calls when `default confirm/cancel button` clicks

- **@return**
  - Type: `Promise` (when then is no `Promise`, a `fd.Dialog` will return)
  - always resove, no reject, for easy use of `await`
  - `alert` resolve with `undefined` (when confirm)
  - `confirm` resolve with `true` (when confirm) / `false` (when cancel)
  - `prompt` resolve with `input.value` (when confirm) / `undefined` (when cancel)
  - extra `dialog` is attached to `Promise`

```js
fd.alert('test', () => {
  // 1. dialog confirm button is clicked
  // 2. dialog closeBtn is clicked, when `option.closeBtn` is truly
  // 3. `esc` key is pressed, when `option.preventCancel` is falsly
  console.log('on action.')

  // this is `fd.Dialog` instance
  // so you can use `this.remove()` to remove dialog
  this.remove()

  // return false, to prevent dialog remove
  return false
}).then(() => {
  // same time as onAction calls
  // notice: there is no this as dialog
  // notice: return false can't prevent dialog from removing
})

// dialog is attached to promise
const {dialog} = fd.alert('test')

fd.confirm('test', result => {
  // result is true, when confirm button is clicked
  // result is false, when cancel button is clicked
  // result is false, when closeBtn is clicked
  // result is false, `esc` key is pressed
  console.log('result', result)
}).then(result => {
  // result same as above
})

fd.prompt('test', result => {
  // result is String(input.value), when confirm button is clicked
  // result is undefined, when cancel button is clicked
  // result is undefined, when closeBtn is clicked
  // result is undefined, `esc` key is pressed
}).then(result => {
  // result same as above
})
```

why not reject promise

```js
// if fd.confirm return a promise
// resolve when confirm button is clicked
// reject when cancel button is clicked
// we have to write code like this
;(async () => {
  let result = false

  try {
    result = await fd.confirm('are you sure?')
  } catch (err) {}

  console.log(result)
})()

// much esaier
;(async () => {
  let result = await fd.confirm('are you sure?')

  console.log(result)
})()
```

#### fd.alert

#### fd.confirm

#### fd.prompt

- **options.rows**
  - when `options.rows` is set input will be a `HTMLTextareaElement` with `rows`
  - even if `options.rows` is set to `1`, input will still be a `HTMLTextareaElement`
- **options.input**
  - a `HTMLElement` can pass directly, bu `options.input`

### fd.action

a function to create action button

syntax

```js
fd.action(btnText, btnAction)
```

example

```js
fd.dialog({
  message: 'dialog message',
  actions: [
    // only text
    fd.action('a custom button'),
    // only action
    fd.action('a custom button with action', function() {
      console.log('a custom action')
    }),
  ],
})
```

### fd.action.{confirm, cancel}

shortcuts to create a action,

- function accepts only one function as arguments
- confirm
  a `fu-dialog__action--confirm` class is add to btn
- cancel
  a `fu-dialog__action--cancel` class is add to btn

example

```js
fd.dialog({
  message: 'dialog message',
  actions: [
    // default confirm button
    fd.action.confirm,
    // default confirm button
    fd.action.confirm(),
    // only text
    fd.action.confirm('a custom confirm'),
    // only action
    fd.action.confirm(function() {
      console.log('a custom confirm action')
    }),
  ],
})

fd.dialog({
  message: 'dialog message',
  actions: [
    // default cancel button
    fd.action.cancel,
    // default cancel button
    fd.action.cancel(),
    // only text
    fd.action.cancel('a custom cancel'),
    // only action
    fd.action.cancel(function() {
      console.log('a custom cancel action')
    }),
  ],
})
```

### fd.btn

fd.btn.confirm

- default confirm btn
- same as fd.action.confirm()

fd.btn.cancel

- default cancel btn
- same as fd.action.cancel()
