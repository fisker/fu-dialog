import globalThis from './global-this'

const {document} = globalThis

if (!document) {
  throw new Error('f-dialog requires a window with a document.')
}

export default document
