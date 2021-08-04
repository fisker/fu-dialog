import fs from 'fs'
import {JSDOM} from 'jsdom'
import getType from '../src/utils/get-type.js'
import buildConfig from '../scripts/build.config.cjs'
import package_ from '../package.json'

const testData = [
  undefined,
  null,
  123,
  Number.NaN,
  true,
  false,
  [1, 2, 3],
  'string',
  new Date(),
  Symbol('symbol'),
  /regexp/,
]

const librarySource = fs.readFileSync(
  require.resolve(`../${package_.browser}`),
  'UTF-8'
)

beforeEach(() => {
  const dom = new JSDOM('', {runScripts: 'outside-only'})
  global.window = dom.window
  dom.window.eval(librarySource)
  delete window.HTMLDialogElement
})

describe.skip('support Data Types', () => {
  for (const value of testData) {
    test(`${getType(value)}`, () => {
      window[buildConfig.libName].alert(value)
      const messageBody = window.document.querySelector(
        `.${buildConfig.ns}__message-body`
      ).textContent
      expect(messageBody).toBe(String(value))
    })
  }
})
