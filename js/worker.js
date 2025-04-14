self.onmessage = function (event) {
  postMessage("A worker ezt kapta: " + event.data);
};
