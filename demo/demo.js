import getType from '../src/utils/get-type'
import globalThis from '../src/utils/global-this'
import document from '../src/utils/document'
import forEach from '../src/utils/for-each'
import assign from '../src/utils/assign'
import noop from '../src/utils/noop'
import addListener from '../src/dom/add-listener'
import createElement from '../src/dom/create-element'
import _ from '../src/full-version'

function createTestButton(text, properties = {}, onClick = noop) {
  if (typeof properties === 'function') {
    onClick = properties || noop
    properties = {}
  }

  properties = assign(
    {
      textContent: text,
    },
    properties
  )

  const element = createElement('button', properties)
  addListener(element, onClick)
  return element
}

const container = document.getElementById('js-data-types')
const dataTypes = [
  undefined,
  null,
  123,
  NaN,
  true,
  false,
  [1, 2, 3],
  'string',
  new Date(),
  globalThis.Symbol ? Symbol('symbol') : 'symbol(string)',
  new Error('error'),
  /regexp/,
]
forEach.call(dataTypes, value => {
  const button = createTestButton(`${getType(value)}: ${String(value)}`)
  addListener(button, 'click', function() {
    _.alert(value)
  })
  container.appendChild(button)
})

function customActions() {
  function createActionButton(tagName, properties) {
    const element = createElement(tagName, properties)
    element.className = 'f-dialog__action'
    return element
  }

  const dialog = _.dialog({
    message: '自定义确定按钮',
    actions: [
      '按钮文字',
      {
        text: '按钮Object',
        action() {
          console.log(this)
        },
      },
      createActionButton('button', {
        textContent: 'HTML元素',
      }),
      {
        el: createActionButton('a', {
          textContent: 'el: HTML元素',
          href: globalThis.location.href,
          target: '_blank',
        }),
      },
      {
        el() {
          return createActionButton('button', {
            textContent: 'el: 函数',
          })
        },
      },
      function() {
        alert('函数')
      },
      ['类数组(如jQuery对象)'],
      _.action('_.action'),
      _.action.confirm('_.action.confirm'),
      _.action.cancel('_.action.cancel'),
    ],
  })

  dialog.container.style.width = 'auto'
}

function alertCallback() {
  _.alert('请点击确定', function() {
    alert('【确定】按钮被点击')
  })
}
function alertPromise() {
  _.alert('请点击确定').then(function() {
    alert('【确定】按钮被点击')
  })
}
function confirmCallback() {
  _.confirm('请点击一个按钮', function(result) {
    alert(`【${result ? '确定' : '取消'}】按钮被点击`)
  })
}
function confirmPromise() {
  _.confirm('请点击一个按钮').then(function(result) {
    alert(`【${result ? '确定' : '取消'}】按钮被点击`)
  })
}
function promptCallback() {
  _.prompt('请输入点什么', function(result) {
    alert(`${typeof result} : ${result}`)
  })
}
function promptPromise() {
  _.prompt({message: '请输入点什么', rows: 5}).then(function(result) {
    alert(`${typeof result} : ${result}`)
  })
}

function preventClose() {
  _.alert({
    message: 'test',
    actions: [
      _.action.confirm('return false in action', function() {
        return false
      }),
    ],
  })
}

function preventClose2() {
  _.alert('return false in callback', function() {
    return false
  })
}

globalThis._ = _
globalThis.demo = {
  customActions,
  preventClose,
  preventClose2,
  alertCallback,
  alertPromise,
  confirmCallback,
  confirmPromise,
  promptCallback,
  promptPromise,
}
