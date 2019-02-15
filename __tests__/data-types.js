import fs from 'fs'
import path from 'path'
import {JSDOM} from 'jsdom'
import {getType} from '../src/shared'

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

const libSource = fs.readFileSync(
  path.join(__dirname, '../lib/f-dialog.min.js'),
  'UTF-8'
)

beforeEach(() => {
  const dom = new JSDOM('', {runScripts: 'outside-only'})
  window = dom.window
  window.eval(libSource)
  delete window.HTMLDialogElement
})

describe('support Data Types', () => {
  testData.forEach(value => {
    test(`${getType(value)}`, () => {
      window.fDialog.alert(value)
      const messageBody = window.document.querySelector(
        '.f-dialog__message-body'
      ).textContent
      expect(messageBody).toBe(String(value))
    })
  })
})
