import fs from 'fs'
import path from 'path'
import {JSDOM} from 'jsdom'
import buildConfig from '../scripts/build.config'
import package_ from '../package.json'

const librarySource = fs.readFileSync(
  require.resolve(`../${package_.browser}`),
  'UTF-8'
)
const {window} = new JSDOM('', {runScripts: 'outside-only'})
window.eval(librarySource)
delete window.HTMLDialogElement
const {[buildConfig.libName]: library} = window

describe('exports', () => {
  test(`window.${buildConfig.libName} should be a function`, () => {
    expect(typeof library).toBe('function')
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
      expect(typeof library[method]).toBe('function')
    })
  })
  ;['confirm', 'cancel'].forEach(method => {
    test(`${buildConfig.libName}.action.${method} should be a function`, () => {
      expect(typeof library.action[method]).toBe('function')
    })
  })

  test(`${buildConfig.libName}.Dialog should be a class`, () => {
    expect(new library.Dialog()).toBeInstanceOf(library.Dialog)
  })
})
