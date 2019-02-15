import fs from 'fs'
import path from 'path'
import {JSDOM} from 'jsdom'

const libSource = fs.readFileSync(require.resolve('../'), 'UTF-8')
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
