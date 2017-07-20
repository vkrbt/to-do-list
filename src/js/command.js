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

function go(obj) {
  nextActions = [];
  currentAction = obj;
  prevActions.push(currentAction);
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


$("body").keydown(function(e){
  var zKey = 90;
  if ((e.ctrlKey || e.metaKey) && e.keyCode == zKey) {
    goBack();
    return false;
  }
});

$("body").keydown(function(e){
  var zKey = 89;
  if ((e.ctrlKey || e.metaKey) && e.keyCode == zKey) {
    goForward();
    return false;
  }
});