
var LiveForm = require("./LiveForm");
var random = require("./random.js");


module.exports = class Predator extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.life = 10;
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

    eat() {
        let found = this.chooseCell(2);
        let randoms = random(found);

        if (randoms) {

            this.life++;
            let x = randoms[0];
            let y = randoms[1];

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            for (let i in grassEaterArr) {
                if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                    grassEaterArr.splice(i, 1)
                }
            }
            this.x = x;
            this.y = y;

            if (this.life >= 13) {
                this.mul();
            }
        } else {
            this.move();
        }
    }

    move() {
        let found = this.chooseCell(0);
        let emptyCell = random(found);
        if (emptyCell) {
            this.life--;
            let x = emptyCell[0];
            let y = emptyCell[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            if (this.life <= 0) {
                this.die();
            }
        } else {
            this.life--;
            if (this.life <= 0) {
                this.die();
            }
        }
    }

    die() {
        for (let i in predatorArr) {
            if (this.x === predatorArr[i].x && this.y === predatorArr[i].y) {
                predatorArr.splice(i, 1);
                break;
            }
        }
        matrix[this.y][this.x] = 0;
    }

    mul() {
        let found = this.chooseCell(0);
        let emptyCell = random(found);
        if (emptyCell) {
            let x = emptyCell[0];
            let y = emptyCell[1];
            matrix[y][x] = 3;
            let predator = new Predator(x, y);
            predatorArr.push(predator);
            this.life = 10;
        }
    }
}
