import globalThis from './global-this'
import {name as pkgName} from '../../package.json'

const {document} = globalThis

if (!document) {
  throw new Error(`${pkgName} requires a window with a document.`)
}

export default document
