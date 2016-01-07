var SERVER_NAME = "blue.mlkcca.com";
var DATA_STORE_NAME = "messages";

var server;
var dataStore;
var ui;

function hasInput(str){
  return str != null && str.length > 0;
}

function buildMessage(name, message){
  if(!hasInput(message)){
    return null;
  }
  if(!hasInput(name)){
    name = "名無しさん";
  }
  return {
    name: name,
    body: message,
    timeStamp: new Date()
  };
}

function toSendMessage(message){
  return message != null;
}

function sendMessage(){
  var message = buildMessage(ui.name.value,
                             ui.message.value);
  console.log(message);
  if(toSendMessage(message)){
    console.log("メッセージ送信");
    dataStore.send(message);
  }
}

function showMessage(message){
  var text = message.name  + ":" + message.body;
  ui.timeLine.value = ui.timeLine.value + "\n" + text;
}

function receiveMessage(data){
  console.log("メッセージ受信");
  console.log(data);
  var message = data.value;
  showMessage(message);
}

function initializeServer(){
  server = new MilkCocoa(SERVER_NAME);
  dataStore = server.dataStore(DATA_STORE_NAME);
  dataStore.on("send", receiveMessage);
}

function initializeUIElements(){
  ui = {
    name: document.querySelector("[name=nickName]"),
    message: document.querySelector("[name=message]"),
    timeLine: document.querySelector("#timeline")
  };
}

function initialize(){
  initializeServer();
  initializeUIElements();

  var button  = document.querySelector("button");
  button.addEventListener("click", sendMessage);
}

window.addEventListener("load", initialize);
