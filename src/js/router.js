'use strict';

function preInit() {
  $(window).ready(function() {
    if (!window.location.hash) {
      window.location.hash = '#/active';
    } else {
      changePath();
    }
  });
}

function init() {
  Router.preInit();
  $(window).on('hashchange', function() {
    changePath();
  });
}

function loadTemplate(path) {
  $.get(Router.routes[path].template).done(function(res) {
    $('#view').html(res);
    if (path != '#/404'){
      Router.routes[path].init(path.slice(2));
    }
  }).fail(function(err) {
    $('#view').html('<h1>404</h1>')
  });
}

function changePath() {
  let path = window.location.hash;
  if (Router.routes[path]) {
    loadTemplate(path);
    $('.menu-button').removeClass('active');
    $('.menu-button.'+path.slice(2)+'-tasks').addClass('active');
  } else {
    $('.menu-button').removeClass('active');
    loadTemplate('#/404');
  }
}

function getCurrentPath(){
  return window.location.hash;
}

let Router = {
  routes: {
    '#/all': {
      template: '/all.html',
      init: getNotes,
    },
    '#/active': {
      template: '/active.html',
      init: getNotes,
    },
    '#/done': {
      template: '/done.html',
      init: getNotes,
    },
    '#/404': {
      template: '/404.html'
    }
  },
  init: init,
  preInit: preInit,
  getCurrentPath: getCurrentPath,
}

Router.init();