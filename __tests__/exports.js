import fs from 'fs'
import path from 'path'
import {JSDOM} from 'jsdom'

const libSource = fs.readFileSync(
  path.join(__dirname, '../lib/f-dialog.min.js'),
  'UTF-8'
)
const {window} = new JSDOM('', {runScripts: 'outside-only'})
window.eval(libSource)
delete window.HTMLDialogElement
const {fDialog} = window

describe('exports', () => {
  test('window.fDialog should be a function', () => {
    expect(typeof fDialog).toBe('function')
  })
  ;[
    'setDefault',
    'dialog',
    'Dialog',
    'alert',
    'confirm',
    'prompt',
    'action',
  ].forEach(method => {
    test(`fDialog.${method} should be a function`, () => {
      expect(typeof fDialog[method]).toBe('function')
    })
  })
  ;['confirm', 'cancel'].forEach(method => {
    test(`fDialog.action.${method} should be a function`, () => {
      expect(typeof fDialog.action[method]).toBe('function')
    })
  })

  test('fDialog.Dialog should be a class', () => {
    window.eval(`var myDialog = new fDialog.Dialog()`)
    expect(window.myDialog).toBeInstanceOf(fDialog.Dialog)
  })
})

// test('exports', t => {

//   t.is(typeof fDialog, 'function', 'fDialog should be a function')
//   t.is(typeof fDialog.setDefault, 'function', 'fDialog.setDefault should be a function')
//   t.is(typeof fDialog.dialog, 'function', 'fDialog.dialog should be a function')
//   t.is(typeof fDialog.Dialog, 'function', 'fDialog.Dialog should be a function')
//   t.is(fDialog.Dialog.prototype.constructor, fDialog.Dialog, 'fDialog.Dialog should be a class')
//   t.is(typeof fDialog.alert, 'function', 'fDialog.alert should be a function')
//   t.is(typeof fDialog.confirm, 'function', 'fDialog.confirm should be a function')
//   t.is(typeof fDialog.prompt, 'function', 'fDialog.prompt should be a function')
//   t.is(typeof fDialog.action, 'function', 'fDialog.action should be a function')
//   t.is(typeof fDialog.action.confirm, 'function', 'fDialog.action.confirm should be a function')
//   t.is(typeof fDialog.action.cancel, 'function', 'fDialog.action.cancel should be a function')
// })
