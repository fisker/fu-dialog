import {
  globalThis,
  forEach,
  toString,
  assign,
  document,
  noop,
  getType,
  isArrayLike,
  isArray,
  returnFalse,
} from './shared';

import {createElement, appendElement, addClass, on} from './dom';

import defaultSettings from './default-settings';

import {registerDialog, Promise} from './polyfill';

import {
  Dialog,
  createAction,
  createConfirmAction,
  createCancelAction,
} from './dialog';

import {alert, confirm, prompt} from './shortcuts';

function setDefault(options, value) {
  if (arguments.length === 2) {
    options = {
      [options]: value,
    };
  }

  return assign(defaultSettings, options);
}

function returnPromise(method) {
  return function(options, onAction = noop) {
    let dialog;
    const promise = new Promise(resolve => {
      dialog = method(options, function(result) {
        resolve(result);
        return onAction.call(this, result);
      });
    });
    promise.dialog = dialog;

    return promise;
  };
}

function dialog(options) {
  return new Dialog(options);
}

dialog.dialog = dialog;
dialog.Dialog = Dialog;
dialog.alert = alert;
dialog.confirm = returnPromise(confirm);
dialog.prompt = returnPromise(prompt);
dialog.action = createAction;
dialog.action.confirm = createConfirmAction;
dialog.action.cancel = createCancelAction;
dialog.btn = {
  confirm: createConfirmAction(),
  cancel: createCancelAction(),
};

module.exports = dialog;
