const express = require("express");
const app = express();

const ROWS = 20;
const COLS = 10;

// Legend symbols
const WALL = "#";
const BREAKABLE_WALL = "井";
const BOX = "▩";
const BOX_ENDZONE = "◙";       // not used
const PLAYER = "웃";
const PLAYER_ENDZONE = "(웃)"; // not used
const ENDZONE = "O";

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRoom(boxes = 3, breakableWalls = 5) {
  // Initialize empty grid
  let grid = Array.from({ length: ROWS }, () => Array(COLS).fill(" "));

  // Add walls around border
  for (let r = 0; r < ROWS; r++) {
    grid[r][0] = WALL;
    grid[r][COLS - 1] = WALL;
  }
  for (let c = 0; c < COLS; c++) {
    grid[0][c] = WALL;
    grid[ROWS - 1][c] = WALL;
  }

  // Place breakable walls randomly
  for (let i = 0; i < breakableWalls; i++) {
    let r, c;
    do {
      r = randomInt(1, ROWS - 2);
      c = randomInt(1, COLS - 2);
    } while (grid[r][c] !== " ");
    grid[r][c] = BREAKABLE_WALL;
  }

  // Place endzones
  for (let i = 0; i < boxes; i++) {
    let r, c;
    do {
      r = randomInt(1, ROWS - 2);
      c = randomInt(1, COLS - 2);
    } while (grid[r][c] !== " ");
    grid[r][c] = ENDZONE;
  }

  // Place boxes
  for (let i = 0; i < boxes; i++) {
    let r, c;
    do {
      r = randomInt(1, ROWS - 2);
      c = randomInt(1, COLS - 2);
    } while (grid[r][c] !== " ");
    grid[r][c] = BOX;
  }

  // Place player
  let pr, pc;
  do {
    pr = randomInt(1, ROWS - 2);
    pc = randomInt(1, COLS - 2);
  } while (grid[pr][pc] !== " ");
  grid[pr][pc] = PLAYER;

  return grid;
}

// Root route for testing
app.get("/", (req, res) => {
  res.send("Sokoban Generator API is running! Use /generate to get a CSV file.");
});

// /generate route returns CSV
app.get("/generate", (req, res) => {
  const boxes = parseInt(req.query.boxes) || 3;
  const breakableWalls = parseInt(req.query.breakableWalls) || 5;

  const grid = generateRoom(boxes, breakableWalls);

  // Convert to CSV
  const csv = grid.map(row => row.join(",")).join("\n");

  // Set headers to force CSV download
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=sokoban_room.csv");

  res.send(csv);
});

// Dynamic port for Render or fallback to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sokoban API running on port ${PORT}`);
});