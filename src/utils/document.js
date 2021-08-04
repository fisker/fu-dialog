import {name as packageName} from '../../package.json'
import globalThis from './global-this.js'

const {document} = globalThis

if (!document) {
  throw new Error(`${packageName} requires a window with a document.`)
}

export default document
