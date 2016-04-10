'use strict';

(function() {

var WIDTH  = 0;
var HEIGHT = 0;
var CELL_SIZE = 0;

var c = document.getElementById("area").getContext('2d');

function glider1(matrix, x, y) {
	matrix[y+0][x+1] = Field.CELL;
	matrix[y+1][x+2] = Field.CELL;
	matrix[y+2][x+0] = Field.CELL;
	matrix[y+2][x+1] = Field.CELL;
	matrix[y+2][x+2] = Field.CELL;
}

function glider2(matrix, x, y) {
	matrix[y-0][x+1] = Field.CELL;
	matrix[y-1][x+2] = Field.CELL;
	matrix[y-2][x+0] = Field.CELL;
	matrix[y-2][x+1] = Field.CELL;
	matrix[y-2][x+2] = Field.CELL;
}

function glider3(matrix, x, y) {
	matrix[y-0][x-1] = Field.CELL;
	matrix[y-1][x-2] = Field.CELL;
	matrix[y-2][x-0] = Field.CELL;
	matrix[y-2][x-1] = Field.CELL;
	matrix[y-2][x-2] = Field.CELL;
}

function glider4(matrix, x, y) {
	matrix[y+0][x-1] = Field.CELL;
	matrix[y+1][x-2] = Field.CELL;
	matrix[y+2][x-0] = Field.CELL;
	matrix[y+2][x-1] = Field.CELL;
	matrix[y+2][x-2] = Field.CELL;
}

var gliders = [glider1, glider2, glider3, glider4];

function randomInt(from, to) {
	return Math.floor( from + Math.random() * to);
}

function createGliders(matrix, n, randomDir) {
	for(var i = 0; i < n; i++) {
		var glider = randomDir ? gliders[randomInt(0, 4)] : gliders[0];

		glider(matrix, randomInt(4, WIDTH-8), randomInt(4, HEIGHT-8));
	}
}

var createLoop = function(randomDir, glidersCount) {
  var field = new Field(WIDTH, HEIGHT);
	createGliders(field._matrix, glidersCount, randomDir);

	return function() {
    c.clearRect(0, 0, WIDTH*CELL_SIZE, HEIGHT*CELL_SIZE);
		field.updateEach();
		field.draw(c, CELL_SIZE);
	};
};

var interval = null;

function start() {
	var speed     = parseInt( $("#speed").val() );
	var gliders   = parseInt( $("#gliders").val() );
	var randomDir = $("#randomDir").is(":checked");
	var size      = parseInt( $("#cell-size").val() );

	WIDTH = Math.floor(1024/size); 
	HEIGHT = Math.floor(800/size); 
	CELL_SIZE = Math.floor(size);

	var _loop     = createLoop(randomDir, gliders);

	clearInterval(interval);

	interval = setInterval( _loop, Math.floor(1000/speed) );

	return false;
}

start();
$("#restart").on("click", start);

}());
