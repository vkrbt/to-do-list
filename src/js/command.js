'use strict';

class Command {
  do() {
    throw new Error('this action not implemented');
  }

  undo() {
    throw new Error('this action not implemented');
  }
}

let CommandNavigator = {
  go(obj) {
    nextActions = [];
    prevActions.push(obj);
    obj.do();
  },
  goBack() {
    if (prevActions.length) {
      let currentAction = prevActions.pop();
      currentAction.undo();
      nextActions.push(currentAction);
      return currentAction;
    }
  },
  goForward() {
    if (nextActions.length) {
      let currentAction = nextActions.pop();
      currentAction.do();
      prevActions.push(currentAction);
      return currentAction;
    }
  }
}

export default Command;
export { CommandNavigator };