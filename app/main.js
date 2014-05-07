var WIDTH  = 1024/16;
var HEIGHT = 800/16;
var CELL_SIZE = 16;

var CELL    = 1;
var NOTHING = 0;

var canvas = document.getElementById("area");
var c = canvas.getContext('2d');

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


var m1 = createMatrix(WIDTH, HEIGHT);
var m2 = createMatrix(WIDTH, HEIGHT);

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

			if( getElement(fromMatrix, i-1, j-1) === CELL)  count++;
			if( getElement(fromMatrix, i-1, j) === CELL )   count++;
			if( getElement(fromMatrix, i-1, j+1) === CELL ) count++;
			if( getElement(fromMatrix, i, j-1) === CELL )   count++;
			if( getElement(fromMatrix, i, j+1) === CELL )   count++;
			if( getElement(fromMatrix, i+1, j-1) === CELL ) count++;
			if( getElement(fromMatrix, i+1, j) === CELL )   count++;
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

function glider(matrix, x, y) {
	m1[y+0][x+1] = CELL;
	m1[y+1][x+2] = CELL;
	m1[y+2][x+0] = CELL;
	m1[y+2][x+1] = CELL;
	m1[y+2][x+2] = CELL;
}

function createGliders(matrix, n) {
	for(var i = 0; i < n; i++) {
		glider(m1, Math.floor( Math.random() * (WIDTH - 4) ),
							 Math.floor( Math.random() * (HEIGHT - 4) ));
	}
}

createGliders(m1, 10);

var currentMatrix = "m1";

drawMatrix(m1);

setInterval( function() {
	if(currentMatrix === "m1") {
		update(m1, m2);
		drawMatrix(m2);
		currentMatrix = "m2";
	} else {
		update(m2, m1);
		drawMatrix(m2);
		currentMatrix = "m1";
	}
}, 30);


