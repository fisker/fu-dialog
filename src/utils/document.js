import globalThis from './global-this'
import {name as packageName} from '../../package.json'

const {document} = globalThis

if (!document) {
  throw new Error(`${packageName} requires a window with a document.`)
}

export default document
