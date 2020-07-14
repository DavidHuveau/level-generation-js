const STAGE_ID = "stage";
const TILE_CLASS = "tile";
const COIN_CLASS = "coin";

const STAGE_ROWS_NUMBER = 8;
const STAGE_COLUMNS_NUMBER = 18;

const TILE_SIZE = 50;

const grid = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const stage = document.getElementById(STAGE_ID);

function displayLevel() {
  for (let rowIndex = 0; rowIndex < STAGE_ROWS_NUMBER; rowIndex++) {
    for (let columnIndex = 0; columnIndex < STAGE_COLUMNS_NUMBER; columnIndex++) {
      if (grid[rowIndex][columnIndex] == 2) {
        dispalyCoin(rowIndex, columnIndex);
      } else if (grid[rowIndex][columnIndex] == 1) {
        displayTile(rowIndex, columnIndex);
      }
    }
  }
}

function dispalyCoin(rowIndex, columnIndex) {
  const coin = document.createElement("div");
  coin.className = COIN_CLASS;
  coin.style.top = addSuffixCssPixel(rowIndex * TILE_SIZE);
  coin.style.left = addSuffixCssPixel(columnIndex * TILE_SIZE);

  stage.appendChild(coin);
}

function displayTile(rowIndex, columnIndex) {
  let tile = document.createElement("div");
  tile.className = TILE_CLASS;
  tile.style.top = addSuffixCssPixel(rowIndex * TILE_SIZE);
  tile.style.left = addSuffixCssPixel(columnIndex * TILE_SIZE);

  stage.appendChild(mergeWithAdjacentTiles(rowIndex, columnIndex, tile));
}

function mergeWithAdjacentTiles(rowIndex, columnIndex, tile) {
  if (columnIndex < STAGE_COLUMNS_NUMBER - 1) {
    if (grid[rowIndex][columnIndex + 1] == 1) {
      tile.style.borderBottomRightRadius = '0px'; tile.style.borderTopRightRadius = '0px';
    }
  }
  if (columnIndex > 0) {
    if (grid[rowIndex][columnIndex - 1] == 1) {
      tile.style.borderBottomLeftRadius = '0px'; tile.style.borderTopLeftRadius = '0px';
    }
  }
  if (rowIndex < STAGE_ROWS_NUMBER - 1) {
    if (grid[rowIndex + 1][columnIndex] == 1) {
      tile.style.borderBottomLeftRadius = '0px'; tile.style.borderBottomRightRadius = '0px';
    }
  }
  if (rowIndex > 0) {
    if (grid[rowIndex - 1][columnIndex] == 1) {
      tile.style.borderTopLeftRadius = '0px'; tile.style.borderTopRightRadius = '0px';
    }
  }
  return tile;
}

// function createElement(type, rowIndex, columnIndex) {

// }

function addSuffixCssPixel(string) {
  return `${string}px`;
}

displayLevel();
