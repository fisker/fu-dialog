import fs from 'fs'
import path from 'path'
import {JSDOM} from 'jsdom'
import buildConfig from '../scripts/build.config'
import pkg from '../package.json'

const libSource = fs.readFileSync(require.resolve(`../${pkg.browser}`), 'UTF-8')
const {window} = new JSDOM('', {runScripts: 'outside-only'})
window.eval(libSource)
delete window.HTMLDialogElement
const {[buildConfig.libName]: lib} = window

describe('exports', () => {
  test('window.${buildConfig.libName} should be a function', () => {
    expect(typeof lib).toBe('function')
  })
  ;[
    'setDefaults',
    'dialog',
    'Dialog',
    'alert',
    'confirm',
    'prompt',
    'action',
  ].forEach(method => {
    test(`${buildConfig.libName}.${method} should be a function`, () => {
      expect(typeof lib[method]).toBe('function')
    })
  })
  ;['confirm', 'cancel'].forEach(method => {
    test(`${buildConfig.libName}.action.${method} should be a function`, () => {
      expect(typeof lib.action[method]).toBe('function')
    })
  })

  test('${buildConfig.libName}.Dialog should be a class', () => {
    expect(new lib.Dialog()).toBeInstanceOf(lib.Dialog)
  })
})
