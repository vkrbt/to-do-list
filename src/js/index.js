'use strict';

import {CommandNavigator as cmdNav} from './command.js';

function toBoolean(string){
  if(string == 'true'){
    return true;
  }
  return false;
}

$("body").keydown(function(e) {
  var zKey = 90;
  if ((e.ctrlKey || e.metaKey) && e.keyCode == zKey) {
    cmdNav.goBack();
    return false;
  }
});

$("body").keydown(function(e) {
  var yKey = 89;
  if ((e.ctrlKey || e.metaKey) && e.keyCode == yKey) {
    cmdNav.goForward();
    return false;
  }
});