'use strict';
let config = {
  host: 'localhost',
  port: 3000,
  getLink: function(argument) {
    return 'http://' + this.host + ':' + this.port + '/';
  }
}