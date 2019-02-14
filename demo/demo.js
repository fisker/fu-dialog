import _ from '..';
import {getType, globalThis} from '../src/shared';
import {on} from '../src/dom';

function createTestBtn(text, props = {}) {
  const el = document.createElement('button');
  Object.assign(
    el,
    {
      type: 'button',
      textContent: text,
    },
    props
  );

  return el;
}

var container = document.getElementById('js-data-types');
[
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
  new Error('error'),
  /regexp/,
].forEach(value => {
  const btn = createTestBtn(`${getType(value)}: ${String(value)}`);
  on(btn, 'click', function() {
    _.alert(value);
  });
  container.appendChild(btn);
});

function customActions() {
  function createBtn(tagName, props) {
    var el = document.createElement(tagName);
    Object.assign(el, props);
    el.className = 'f-dialog__action';

    if (tagName === 'button') {
      el.type = 'button';
    }
    return el;
  }

  var dialog = _.dialog({
    message: '自定义确定按钮',
    actions: [
      '按钮文字',
      {
        text: '按钮Object',
        action: function() {
          console.log(this);
        },
      },
      createBtn('button', {
        textContent: 'HTML元素',
      }),
      {
        el: createBtn('a', {
          textContent: 'el: HTML元素',
          href: globalThis.location.href,
          target: '_blank',
        }),
      },
      {
        el: function() {
          return createBtn('button', {
            textContent: 'el: 函数',
          });
        },
      },
      function() {
        alert('函数');
      },
      ['类数组(如jQuery对象)'],
      _.action('_.action'),
      _.action.confirm('_.action.confirm'),
      _.action.cancel('_.action.cancel'),
    ],
  });

  dialog.container.style.width = 'auto';
}

function alertCallback() {
  _.alert('请点击确定', function() {
    alert('【确定】按钮被点击');
  });
}
function alertPromise() {
  _.alert('请点击确定').then(function() {
    alert('【确定】按钮被点击');
  });
}
function confirmCallback() {
  _.confirm('请点击一个按钮', function(result) {
    alert(`【${result ? '确定' : '取消'}】按钮被点击`);
  });
}
function confirmPromise() {
  _.confirm('请点击一个按钮').then(function(result) {
    alert(`【${result ? '确定' : '取消'}】按钮被点击`);
  });
}
function promptCallback() {
  _.prompt('请输入点什么', function(result) {
    alert(`${typeof result} : ${result}`);
  });
}
function promptPromise() {
  _.prompt({message: '请输入点什么', rows: 5}).then(function(result) {
    alert(`${typeof result} : ${result}`);
  });
}

function preventClose() {
  _.alert({
    message: 'test',
    actions: [
      _.action.confirm('return false in action', function() {
        return false;
      }),
    ],
  });
}

function preventClose2() {
  _.alert('return false in callback', function() {
    return false;
  });
}

globalThis._ = _;
globalThis.demo = {
  customActions,
  preventClose2,
  alertCallback,
  alertPromise,
  confirmCallback,
  confirmPromise,
  promptCallback,
  promptPromise,
};
