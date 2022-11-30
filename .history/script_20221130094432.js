var socket = io();
//! Setup function fires automatically
function setup() {
  var weath = "winter";
  var side = 30;
  var matrix = [];
  let grassCountElement = document.getElementById("grassCount");
  let grassEaterCountElement = document.getElementById("grassEaterCount");
  let predatorCounterElement = document.getElementById("predatorCounter");
  let virusCounterElement = document.getElementById("virusCounter");
  let svetikCounterElement = document.getElementById("svetikCounter");
  let grigorCounterElement = document.getElementById("grigorCounter");

  socket.on("data", drawCreatures);
  socket.on("weather", function (data) {
    weath = data;
  });
  function drawCreatures(data) {
    matrix = data.matrix;
    grassCountElement.innerText = data.grassCounter;
    grassEaterCountElement.innerText = data.grassEaterCount;
    predatorCounterElement.innerText = data.predatorCounter;
    virusCounterElement.innerText = data.virusCounter;
    svetikCounterElement.innerText = data.svetikCounter;
    grigorCounterElement.innerText = data.grigorCounter;

    createCanvas(matrix[0].length * side, matrix.length * side);
    background("#acacac");
    for (var i = 0; i < matrix.length; i++) {
      for (var j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] == 1) {
          if (weath == "spring") {
            fill("green");
          } else if (weath == "summer") {
            fill("#1f5c3f");
          } else if (weath == "winter") {
            fill("white");
          } else if (weath == "autumn") {
            fill("#4dffa6");
          }
          rect(j * side, i * side, side, side);
        } else if (matrix[i][j] == 2) {
          fill("orange");
          rect(j * side, i * side, side, side);
        } else if (matrix[i][j] == 0) {
          fill("#acacac");
          rect(j * side, i * side, side, side);
        } else if (matrix[i][j] == 3) {
          fill("red");
          rect(j * side, i * side, side, side);
        } else if (matrix[i][j] == 4) {
          fill("blue");
          rect(j * side, i * side, side, side);
        } else if (matrix[i][j] == 5) {
          fill("yellow");
          rect(j * side, i * side, side, side);
        } else if (matrix[i][j] == 6) {
          fill("brown");
          rect(j * side, i * side, side, side);
        } else if (matrix[i][j] == 7) {
          fill("black");
          rect(j * side, i * side, side, side);
        }
      }
    }
  }
}

function kill() {
  socket.emit("kill");
}
function stop() {
  socket.emit("stop");
}
function addgrass() {
  socket.emit("addgrass");
}
function paytun() {
  socket.emit("paytun");
}
function run() {
  socket.emit("run");
}
function kaycak() {
  socket.emit("kaycak");
}
function paytun() {
  socket.emit("paytun");
}
