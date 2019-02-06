function createGrid(x, y) {
  var toReturn = new Array(x)
  for (let i = 0; i < x; i++) {
    toReturn[i] = new Array(y)
  }
  return toReturn
}

let grid
const x = 200
const y = 200
const size = 4

function setup() {
  createCanvas(x * size, y * size)
  background(255)
  grid = createGrid(x, y)

  for (let i = 0; i < x; i++) {
    for (let j = 0; j < x; j++) {
      grid[i][j] = round(random(0, 1))
    }
  }
}

function printCells(table) {
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      var color = table[i][j] === 0 ? 255 : 0
      fill(color)
      noStroke()
      rect(i * size, j * size, size, size)
    }
  }
}

function draw() {
  printCells(grid)

  var nextGen = createGrid(x, y)
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < x; j++) {
      const currentCell = grid[i][j]
      const nbLiving = shouldCellLive(i, j)
      
      if (nbLiving === 3) nextGen[i][j] = 1
      if (nbLiving === 2) nextGen[i][j] = currentCell
      if (nbLiving < 2) nextGen[i][j] = 0
      if (nbLiving > 3) nextGen[i][j] = 0
    }
  }
  grid = nextGen
}

function shouldCellLive(row, col) {
  let nbLiveNeighb = 0
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      rowIdx = row + i
      colIdx = col + j
      if (rowIdx >= 0 && colIdx >= 0 && rowIdx < x && colIdx < y) {
        if (grid[rowIdx][colIdx] === 1) {
          nbLiveNeighb++
        }
      }
    }
  }
  return nbLiveNeighb
}
