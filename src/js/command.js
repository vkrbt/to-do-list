'use strict';

class Command {
  do() {
    throw new Error('this action not implemented');
  }

  undo() {
    throw new Error('this action not implemented');
  }
}

class LocalStorageCommand extends Command {
  constructor(item) {
    super();
    this.item = item;
  }
  do() {
    this.prevItem = localStorage.getItem('text');
    localStorage.setItem('text', this.item);
  }
  undo() {
    this.prevItem = localStorage.setItem('text', this.prevItem);
  }
}

let prevActions = [];
let nextActions = [];
let currentAction;

function go() {
  if (currentAction) {
    prevActions.push(currentAction);
  }
  var item = new LocalStorageCommand((Math.random() * 10) ^ 0);
  nextActions = [];
  currentAction = item;
  currentAction.do();
  return currentAction;
}

function goBack() {
  if (prevActions.length) {
    currentAction.undo();
    nextActions.push(currentAction);
    currentAction = prevActions.pop();
    return currentAction;
  }
}

function goForward() {
  if (nextActions.length) {
    currentAction.do();
    prevActions.push(currentAction);
    currentAction = nextActions.pop();
    return currentAction;
  }
}