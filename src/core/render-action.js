import addListener from '../dom/add-listener'

function renderAction(container, button, dialog) {
  const {el, action} = button

  addListener(el, 'click', function() {
    let result

    if (action) {
      result = action.call(dialog)
    }

    if (result !== false) {
      dialog.remove()
    }
  })

  container.appendChild(el)

  return container
}

export default renderAction
