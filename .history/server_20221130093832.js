
weath = "winter"

var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Predator = require("./modules/Predator.js");
var Virus = require("./modules/Virus.js");
var Svetik = require("./modules/Svetik.js");
var Grigor = require("./modules/Grigor")
let random = require('./modules/random');

grassArr = [];
grassEaterArr = [];
predatorArr = [];
virusArr = [];
svetikArr = [];
grigorArr = [];
matrix = [];





function matrixGenerator(matrixSize, grass, grassEater, predator, virus, svetik, grigor) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < predator; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < virus; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < svetik; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
    for (let i = 0; i < svetik; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 6;
    }
}
matrixGenerator(20, 5, 25, 15, 20, 1, 1);

function weather() {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
    io.sockets.emit('weather', weath)
}
setInterval(weather, 5000);


var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
let fs = require('fs');




function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
            }
            else if (matrix[y][x] == 3) {
                var predator = new Predator(x, y);
                predatorArr.push(predator);
            }
            else if (matrix[y][x] == 4) {
                var virus = new Virus(x, y);
                virusArr.push(virus);
            }
            else if (matrix[y][x] == 5) {
                var svetik = new Svetik(x, y);
                svetikArr.push(svetik);
            }
            else if (matrix[y][x] == 6) {
                var grigor = new Grigor(x, y);
                grigorArr.push(grigor);
            }
        }
    }
}

function game() {
    if (grassArr[0] !== undefined) {
        if (weath != 'autumn') {
            for (var i in grassArr) {
                grassArr[i].mul();
            }
        }

    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }
    if (predatorArr[0] !== undefined) {
        for (var i in predatorArr) {
            predatorArr[i].eat();
        }
    }
    if (virusArr[0] !== undefined) {
        for (var i in virusArr) {
            virusArr[i].eat();
        }
    }
    if (svetikArr[0] !== undefined) {
        for (var i in svetikArr) {
            svetikArr[i].eat();
        }
    }
    if (grigorArr[0] !== undefined) {
        for (var i in grigorArr) {
            grigorArr[i].eat();
        }
    }
    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassArr.length,
        grassEaterCount: grassEaterArr.length,
        predatorCounter: predatorArr.length,
        virusCounter: virusArr.length,
        svetikCounter: svetikArr.length,
        grigorCounter: grigorArr.length
    }


    io.sockets.emit("data", sendData);
}



setInterval(game, 1000)

//// Add event
function kill() {
    grassArr = [];
    grassEaterArr = [];
    predatorArr = [];
    virusArr = [];
    svetikArr = [];
    grigorArr = [];
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
}
function addgrass() {

    for (let i = 0; i < 1; i++) {
        let x = Math.floor(Math.random() * 25)
        let y = Math.floor(Math.random() * 25)
        matrix[y][x] = 1;
        var newGrass = new Grass(x, y);
        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix[y].length; x++) {
                if (matrix[y][x] == 0) {
                    grassArr.push(newGrass);
                }
            }
        }
    }
}


function stop() {
    grassArr.length = 0
    grassEaterArr.length = 0
    predatorArr.length = 0
    virusArr.length = 0
    svetikArr.length = 0
    grigorArr.length = 0

}
function run() {
    creatingObjects()
}
// function foo() {
//     for (var i = 0; i < matrix.length; i++) {
//         for (var j = 0; j < matrix[i].length; j++) {
//             let num1 = txt1.value;
//             let num2 = txt2.value;
//             if (i == num1 && j == num2) {
//                 matrix[i][j] = 7;
//             }
//         }
//     }

// }

// btn1.addEventListener("click", foo)
function kaycak() {
    let j = Math.floor(Math.random() * 25)
    let i = Math.floor(Math.random() * 25)
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (y == j && x == i) {
                matrix[y][x] = 7;
            }
        }
    }

}
function paytun() {
    let j = Math.floor(Math.random() * 25)
    for (let y = 0; y < j; y++) {
        for (let x = 0; x < j; x++) {
            matrix[y][x] = 7;
        }
    }
}

io.on('connection', function (socket) {
    creatingObjects();
    socket.on("kill", kill);
    socket.on("addgrass", addgrass);
    socket.on("stop", stop);
    socket.on("run", run);
    socket.on("kaycak", kaycak);
    socket.on("paytun", paytun);
});
////   Create static Json
var statistics = {};

setInterval(function () {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.predator = predatorArr.length
    statistics.virus = virusArr.length
    statistics.grigor = grigorArr.length
    statistics.svetik = svetikArr.length
    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
    })
}, 1000)
