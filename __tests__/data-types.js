import fs from 'fs'
import path from 'path'
import {JSDOM} from 'jsdom'
import getType from '../src/utils/get-type'
import buildConfig from '../scripts/build.config'
import pkg from '../package.json'

const testData = [
  undefined,
  null,
  123,
  NaN,
  true,
  false,
  [1, 2, 3],
  'string',
  new Date(),
  Symbol('symbol'),
  /regexp/,
]

const libSource = fs.readFileSync(require.resolve(`../${pkg.browser}`), 'UTF-8')

beforeEach(() => {
  const dom = new JSDOM('', {runScripts: 'outside-only'})
  window = dom.window
  window.eval(libSource)
  delete window.HTMLDialogElement
})

describe.skip('support Data Types', () => {
  testData.forEach(value => {
    test(`${getType(value)}`, () => {
      window[buildConfig.libName].alert(value)
      const messageBody = window.document.querySelector(
        `.${buildConfig.ns}__message-body`
      ).textContent
      expect(messageBody).toBe(String(value))
    })
  })
})
