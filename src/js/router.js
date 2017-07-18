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
    changePath()
  });
}

function loadTemplate(path) {
  $.get(Router.routes[path].template).done(function(res) {
    $('#view').html(res);
  }).fail(function(err) {
    $('#view').html('<h1>404</h1>')
  });
}

function changePath() {
  let path = window.location.hash;
  if (Router.routes[path]) {
    loadTemplate(path);
  } else {
    loadTemplate('#/404');
  }
}

let Router = {
  routes: {
    '#/all': {
      template: '/all.html',
    },
    '#/active': {
      template: '/active.html',
    },
    '#/done': {
      template: '/done.html',
    },
    '#/404': {
      template: '/404.html',
    }
  },
  init: init,
  preInit: preInit,
}

Router.init();