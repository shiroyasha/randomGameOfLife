function createMatrix(width, height) {
  var matrix = [];
  for( var i = 0; i < height; i++) {
    var line = []
    for( var j = 0; j < width; j++) {
      line.push(Field.NOTHING);
    }
    matrix.push(line)
  }
  return matrix;
}

function Field(width, height) {
  this.width = width;
  this.height = height;

  this._matrix1 = createMatrix(width, height);
  this._matrix2 = createMatrix(width, height);

  this._matrix = this._matrix1;
}

Field.DISTANCES = [{ y: -1, x: -1},
                   { y: -1, x:  0},
                   { y: -1, x:  1},
                   { y:  0, x: -1},
                   { y:  0, x:  1},
                   { y:  1, x: -1},
                   { y:  1, x:  0},
                   { y:  1, x:  1}];

Field.CELL    = 1;
Field.NOTHING = 0;

Field.prototype.updateEach = function(fun) {
  var current = this._matrix;
  var other   = this._matrix === this._matrix1 ? this._matrix2 : this._matrix1;

  for( var i = 0; i < this.height; i++) {
    for( var j = 0; j < this.width; j++) {
      other[i][j] = this.isStayingAlive(j, i) ? Field.CELL : Field.NOTHING;
    }
  }

  this._matrix = other;
};

Field.prototype.countAliveNeighbours = function(x, y) {
  var count = 0;

  Field.DISTANCES.forEach( function(el) {
    if( this.getElement(x+el.x, y+el.y) === Field.CELL ) count++;
  }.bind(this));

  return count;
};

Field.prototype.isStayingAlive = function(x, y) {
  var aliveNeighbours = this.countAliveNeighbours(x, y);

  if( this._matrix[y][x] == Field.CELL )
    if( aliveNeighbours < 2 || aliveNeighbours > 3 ) {
      return false;
    } else {
      return true;
    }
  else {
    if(aliveNeighbours === 3) {
      return true;
    } else {
      return false;
    }
  }
}

Field.prototype.getElement = function(x, y) {
  var i = 0;
  i = (y === -1) ? this.height-1 : y;
  i = (y === this.height) ? 0 : i;

  var j = 0;
  j = (x === -1) ? this.width-1 : x;
  j = (x === this.width) ? 0 : j;

  return this._matrix[i][j];
};

Field.prototype.draw = function(c, size) {
  for (var i = 0; i < this.height; i++) {
    for (var j = 0; j < this.height; j++) {
      if( this._matrix[i][j] === Field.CELL) c.fillRect(j*size, i*size, size, size);
    }
  }
};