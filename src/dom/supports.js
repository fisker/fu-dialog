import document from '../utils/document'

const div = document.createElement('div')

export const SUPPORTS_CLASS_LIST = 'classList' in div
export const SUPPORTS_TEXT_CONTENT = 'textContent' in div
export const SUPPORTS_EVENT_LISTENER = 'addEventListener' in div
