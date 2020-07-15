const STAGE_ID = "stage";

const STAGE_ROWS_NUMBER = 8;
const STAGE_COLUMNS_NUMBER = 18;

const EARTH_CLASS = "earth";
const COIN_CLASS = "coin";

const TILE_TYPE = Object.freeze({
  EARTH: { id: 1, className: EARTH_CLASS },
  COIN: { id: 2, className: COIN_CLASS }
});

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
        this.displayTile(rowIndex, columnIndex);
      }
    }
  }

  displayTile(rowIndex, columnIndex) {
    const tileType = this.grid[rowIndex][columnIndex];
    if (tileType === 0) return;

    const tileKeyInTypeObject = Object.keys(TILE_TYPE).find(key => TILE_TYPE[key].id === tileType);
    let tileElement = document.createElement("div");
    tileElement.className = TILE_TYPE[tileKeyInTypeObject].className;
    tileElement.style.top = this.addSuffixCssPixel(rowIndex * TILE_SIZE);
    tileElement.style.left = this.addSuffixCssPixel(columnIndex * TILE_SIZE);

    if (tileType === TILE_TYPE.COIN.id) {
      this.stage.appendChild(tileElement);
    } else if (tileType === TILE_TYPE.EARTH.id) {
      this.stage.appendChild(
        this.mergeWithAdjacentTiles(rowIndex, columnIndex, tileElement)
      );
    }
  }

  mergeWithAdjacentTiles(rowIndex, columnIndex, tileElement) {
    if (columnIndex < STAGE_COLUMNS_NUMBER - 1) {
      if (this.grid[rowIndex][columnIndex + 1] === TILE_TYPE.EARTH.id) {
        tileElement.style.borderBottomRightRadius = "0px";
        tileElement.style.borderTopRightRadius = "0px";
      }
    }
    if (columnIndex > 0) {
      if (this.grid[rowIndex][columnIndex - 1] === TILE_TYPE.EARTH.id) {
        tileElement.style.borderBottomLeftRadius = "0px";
        tileElement.style.borderTopLeftRadius = "0px";
      }
    }
    if (rowIndex < STAGE_ROWS_NUMBER - 1) {
      if (this.grid[rowIndex + 1][columnIndex] === TILE_TYPE.EARTH.id) {
        tileElement.style.borderBottomLeftRadius = "0px";
        tileElement.style.borderBottomRightRadius = "0px";
      }
    }
    if (rowIndex > 0) {
      if (this.grid[rowIndex - 1][columnIndex] === TILE_TYPE.EARTH.id) {
        tileElement.style.borderTopLeftRadius = "0px";
        tileElement.style.borderTopRightRadius = "0px";
      }
    }
    return tileElement;
  }

  addSuffixCssPixel(string) {
    return `${string}px`;
  }
}
