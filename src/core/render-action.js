import addListener from '../dom/add-listener.js'

function renderAction(container, button, dialog) {
  const {el: element, action} = button

  addListener(element, 'click', function () {
    let result

    if (action) {
      result = action.call(dialog)
    }

    if (result !== false) {
      dialog.remove()
    }
  })

  container.appendChild(element)

  return container
}

export default renderAction
