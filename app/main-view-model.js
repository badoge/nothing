import { Application, Observable } from "@nativescript/core";
import "@valor/nativescript-websockets";

const viewModel = new Observable();

export function createViewModel() {
  connectWS();
  viewModel.message = "Loading...";
  return viewModel;
}

let ws;

function connectWS() {
  ws = new WebSocket("http://ws.alienpls.com/connect");

  ws.onopen = function (event) {
    viewModel.set("message", event.type == "open" ? "Connected" : "");
  };

  ws.onmessage = function (event) {
    let count = parseInt(event?.data, 10) - 1 || 0;
    viewModel.set("message", count == 0 ? "You are the only idiot doing nothing" : `${count} other ${count == 1 ? "idiot" : "idiots"} doing nothing`);
  };

  ws.onerror = function (error) {
    viewModel.set("message", "I don't know how many idiots are doing nothing (error)");
  };

  ws.onclose = function (event) {
    viewModel.set("message", "I don't know how many idiots are doing nothing (disconnected)");
  };
}

function disconnectWS() {
  ws.close();
}

Application.on(Application.resumeEvent, () => {
  if (ws.readyState == WebSocket.CLOSED || ws.readyState == WebSocket.CLOSING) {
    connectWS();
  }
});

Application.on(Application.suspendEvent, () => {
  if (ws.readyState == WebSocket.OPEN || ws.readyState == WebSocket.CONNECTING) {
    disconnectWS();
  }
});
