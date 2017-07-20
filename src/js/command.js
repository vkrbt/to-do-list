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

function go(obj) {
  nextActions = [];
  prevActions.push(obj);
  obj.do();
}

function goBack() {
  if (prevActions.length) {
    let currentAction = prevActions.pop();
    currentAction.undo();
    nextActions.push(currentAction);
    return currentAction;
  }
}

function goForward() {
  if (nextActions.length) {
    let currentAction = nextActions.pop();
    currentAction.do();
    prevActions.push(currentAction);
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
  var yKey = 89;
  if ((e.ctrlKey || e.metaKey) && e.keyCode == yKey) {
    goForward();
    return false;
  }
});