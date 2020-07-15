const STAGE_ID = "stage";

const TILE_CLASS = "tile";
const COIN_CLASS = "coin";

const STAGE_ROWS_NUMBER = 8;
const STAGE_COLUMNS_NUMBER = 18;

const TILE_SIZE = 50;

class LevelGeneration {
  constructor() {
    this.stage = document.getElementById(STAGE_ID);

    this.grid = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    this.displayLevel();
  }

  displayLevel() {
    for (let rowIndex = 0; rowIndex < STAGE_ROWS_NUMBER; rowIndex++) {
      for (let columnIndex = 0; columnIndex < STAGE_COLUMNS_NUMBER; columnIndex++) {
        if (this.grid[rowIndex][columnIndex] == 2) {
          this.dispalyCoin(rowIndex, columnIndex);
        } else if (this.grid[rowIndex][columnIndex] == 1) {
          this.displayTile(rowIndex, columnIndex);
        }
      }
    }
  }

  dispalyCoin(rowIndex, columnIndex) {
    const coin = document.createElement("div");
    coin.className = COIN_CLASS;
    coin.style.top = this.addSuffixCssPixel(rowIndex * TILE_SIZE);
    coin.style.left = this.addSuffixCssPixel(columnIndex * TILE_SIZE);

    this.stage.appendChild(coin);
  }

  displayTile(rowIndex, columnIndex) {
    let tile = document.createElement("div");
    tile.className = TILE_CLASS;
    tile.style.top = this.addSuffixCssPixel(rowIndex * TILE_SIZE);
    tile.style.left = this.addSuffixCssPixel(columnIndex * TILE_SIZE);

    this.stage.appendChild(this.mergeWithAdjacentTiles(rowIndex, columnIndex, tile));
  }

  // displayTile(elementType, rowIndex, columnIndex) {
  //   let tile = document.createElement("div");
  //   tile.className = TILE_CLASS;
  //   tile.style.top = this.addSuffixCssPixel(rowIndex * TILE_SIZE);
  //   tile.style.left = this.addSuffixCssPixel(columnIndex * TILE_SIZE);

  // }

  mergeWithAdjacentTiles(rowIndex, columnIndex, tile) {
    if (columnIndex < STAGE_COLUMNS_NUMBER - 1) {
      if (this.grid[rowIndex][columnIndex + 1] == 1) {
        tile.style.borderBottomRightRadius = '0px'; tile.style.borderTopRightRadius = '0px';
      }
    }
    if (columnIndex > 0) {
      if (this.grid[rowIndex][columnIndex - 1] == 1) {
        tile.style.borderBottomLeftRadius = '0px'; tile.style.borderTopLeftRadius = '0px';
      }
    }
    if (rowIndex < STAGE_ROWS_NUMBER - 1) {
      if (this.grid[rowIndex + 1][columnIndex] == 1) {
        tile.style.borderBottomLeftRadius = '0px'; tile.style.borderBottomRightRadius = '0px';
      }
    }
    if (rowIndex > 0) {
      if (this.grid[rowIndex - 1][columnIndex] == 1) {
        tile.style.borderTopLeftRadius = '0px'; tile.style.borderTopRightRadius = '0px';
      }
    }
    return tile;
  }

  addSuffixCssPixel(string) {
    return `${string}px`;
  }
}
