/**
 * 回溯算法
 * 解决一个回溯问题，实际上就是一个决策树的遍历过程。
 */

// 迷宫老鼠问题
var maze = [
  [1, 0, 0, 0],
  [1, 1, 1, 1],
  [0, 0, 1, 0],
  [0, 1, 1, 1],
];
const ratInAMaze = maze => {
  let solution = [];
  let row = maze.length;
  let col = maze[0].length;
  // 初始化
  for (let i = 0; i < row; i++) {
    solution[i] = [];
    for (let j = 0; j < col; j++) {
      solution[i][j] = 0;
    }
  }
  if (findPath(maze, 0, 0, solution)) {
    return solution;
  }
  return null;
};

const findPath = (maze, x, y, solution) => {
  const row = maze.length;
  const col = maze[0].length;
  if (x === col - 1 && y === row - 1) {
    solution[x][y] = 1;
    return true;
  }
  if (isSafe(maze, x, y)) {
    solution[x][y] = 1;
    if (findPath(maze, x + 1, y, solution)) {
      return true;
    }
    if (findPath(maze, x, y + 1, solution)) {
      return true;
    }
    solution[x][y] = 0;
    return false;
  }
  return false;
};

const isSafe = (maze, x, y) => {
  const row = maze.length;
  const col = maze[0].length;
  if (x < col && y < row && maze[x][y] === 1) {
    return true;
  }
  return false;
};

const res = ratInAMaze(maze);
console.log('x====', res);
