var http = require('http');
var express = require('express');

var Server = function(){
  this.initialize.apply(this, arguments);
};

var initRouter = function(router, documentRoot){
  router.use(express.static(documentRoot));
};

Server.prototype = {

  initialize: function(conf){
    conf = conf || {};
    this._port = conf.port || 8880;
    this._documentRoot = conf.documentRoot || process.cwd() + "/app";
    this._router = express();

    initRouter(this.router, this.documentRoot);
  },
  start: function(){
    this.engine.listen(this.port);
    this.log("Server started at http://localhost:" + this.port + "/");
    this.log("The document root is " + this.documentRoot);
  },
  log: function(text){
    console.log(text);
  },
  warn: function(text){
    this.log(text);
  },
  error: function(text){
    this.log(text);
  },
  get router(){
    return this._router;
  },
  get engine(){
    return this._router;
  },
  get port(){
    return this._port;
  },
  get documentRoot(){
    return this._documentRoot;
  }
};

function startServer(conf){
  var server = new Server(conf);
  server.start();
  return server;
}

startServer();
