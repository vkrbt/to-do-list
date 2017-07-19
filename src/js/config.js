'use strict';
let config = {
  host: '192.168.14.144',
  port: 3000,
  getLink: function(argument) {
    return 'http://' + this.host + ':' + this.port + '/';
  }
}