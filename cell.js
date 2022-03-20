function Cell(x, y) {
    this.x = x;
    this.y = y;
    this.score = -1;
    this.color;
    this.visited = false;
    //                 top  ,  right , bottom , left
    //                  0   ,    1   , 2      , 3
    this.neighbors = [ null, null  , null  , null  ];

    this.setNeighbor = function (x, cell) {
        this.neighbors[x] = cell;
    };
}

function CreatedCell(x, y) {
    this.x = x;
    this.y = y;
}