var LiveForm = require("./LiveForm");
var random = require("./random.js");


module.exports = class Virus extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.life = 20;
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
        let found = this.chooseCell(3);
        let randoms = random(found);

        if (randoms) {

            this.life++;
            let x = randoms[0];
            let y = randoms[1];

            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            for (let i in predatorArr) {
                if (predatorArr[i].x == x && predatorArr[i].y == y) {
                    predatorArr.splice(i, 1)
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
            matrix[y][x] = 4;
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
        for (let i in virusArr) {
            if (this.x === virusArr[i].x && this.y === virusArr[i].y) {
                virusArr.splice(i, 1);
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
            matrix[y][x] = 4;
            let virus = new Virus(x, y);
            virusArr.push(virus);
            this.life = 10;
        }
    }
}
