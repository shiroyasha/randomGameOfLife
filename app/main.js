(function() {

var WIDTH  = 1024/16;
var HEIGHT = 800/16;
var CELL_SIZE = 16;

var CELL    = 1;
var NOTHING = 0;

var canvas = document.getElementById("area");
var c = canvas.getContext('2d');

var interval = null;
var currentMatrix = null;

function createMatrix(width, height) {
	var m = [];
	for( var i = 0; i < height; i++) {
		var line = []
		for( var j = 0; j < width; j++) {
			line.push(NOTHING);
		}
		m.push(line)
	}
	return m;
}

function drawMatrix(m) {
	c.clearRect(0, 0, WIDTH*CELL_SIZE, HEIGHT*CELL_SIZE);
	c.fillStyle = "#000";
	for( var i = 0; i < HEIGHT; i++ ) {
		for( var j = 0; j < WIDTH; j++) {
			var el = m[i][j];
			if( el === CELL) {
				c.fillRect(j*CELL_SIZE, i*CELL_SIZE, CELL_SIZE, CELL_SIZE);
			}
		}
	}
}

function getElement(matrix, y, x) {
	var i = 0;
	i = (y === -1) ? HEIGHT-1 : y;
	i = (y === HEIGHT) ? 0 : i;

	var j = 0;
	j = (x === -1) ? WIDTH-1 : x;
	j = (x === WIDTH) ? 0 : j;

	return matrix[i][j];
}


function update(fromMatrix, toMatrix) {
	for( var i = 0; i < HEIGHT; i++ ) {
		for( var j = 0; j < WIDTH; j++) {
			var count = 0;

			if( getElement(fromMatrix, i-1, j-1) === CELL ) count++;
			if( getElement(fromMatrix, i-1, j)   === CELL ) count++;
			if( getElement(fromMatrix, i-1, j+1) === CELL ) count++;
			if( getElement(fromMatrix, i, j-1)   === CELL ) count++;
			if( getElement(fromMatrix, i, j+1)   === CELL ) count++;
			if( getElement(fromMatrix, i+1, j-1) === CELL ) count++;
			if( getElement(fromMatrix, i+1, j)   === CELL ) count++;
			if( getElement(fromMatrix, i+1, j+1) === CELL ) count++;

			toMatrix[i][j] = NOTHING;

			if(fromMatrix[i][j] === CELL)
				if( count < 2 ) {
					toMatrix[i][j] = NOTHING;
				} else if( count > 3) {
					toMatrix[i][j] = NOTHING;
				} else {
					toMatrix[i][j] = CELL;
				}
			else {
				if(count === 3) {
					toMatrix[i][j] = CELL;
				}
			}
		}
	}
}

function glider1(matrix, x, y) {
	matrix[y+0][x+1] = CELL;
	matrix[y+1][x+2] = CELL;
	matrix[y+2][x+0] = CELL;
	matrix[y+2][x+1] = CELL;
	matrix[y+2][x+2] = CELL;
}

function glider2(matrix, x, y) {
	matrix[y-0][x+1] = CELL;
	matrix[y-1][x+2] = CELL;
	matrix[y-2][x+0] = CELL;
	matrix[y-2][x+1] = CELL;
	matrix[y-2][x+2] = CELL;
}

function glider3(matrix, x, y) {
	matrix[y-0][x-1] = CELL;
	matrix[y-1][x-2] = CELL;
	matrix[y-2][x-0] = CELL;
	matrix[y-2][x-1] = CELL;
	matrix[y-2][x-2] = CELL;
}

function glider4(matrix, x, y) {
	matrix[y+0][x-1] = CELL;
	matrix[y+1][x-2] = CELL;
	matrix[y+2][x-0] = CELL;
	matrix[y+2][x-1] = CELL;
	matrix[y+2][x-2] = CELL;
}

var gliders = [glider1, glider2, glider3, glider4];

function createGliders(matrix, n, randomDir) {
	for(var i = 0; i < n; i++) {
		var glider = null;

		if(randomDir) {
			glider = gliders[Math.floor(Math.random()*4)];
		} else {
			glider = gliders[0];
		}

		glider(matrix, Math.floor( 4 + Math.random() * (WIDTH - 8)  ),
				       Math.floor( 4 + Math.random() * (HEIGHT - 8) ));
	}
}


var createLoop = function(randomDir, glidersCount) {
	var current = createMatrix(WIDTH, HEIGHT);
	var other   = createMatrix(WIDTH, HEIGHT);

	createGliders(other, glidersCount, randomDir);

	function drawAndSwap() {
		update(other, current);
		drawMatrix(current);

		var tmp = other;
		other   = current;
		current = tmp;
	}

	return drawAndSwap;
};

function start() {
	var speed     = parseInt( $("#speed").val() );
	var gliders   = parseInt( $("#gliders").val() );
	var randomDir = $("#randomDir").is(":checked");
	var _loop     = createLoop(randomDir, gliders);

	clearInterval(interval);

	interval = setInterval( _loop, Math.floor(1000/speed) );
}

start();
$("#restart").on("click", start);

}());