// @ts-nocheck

export default class Othello {
  boardSize = 8;
  boardStateCount = 0;
  currentBoard = [];
  player1 = {
    name: "",
    move: "B",
    score: 2,
  };
  player2 = {
    name: "",
    move: "W",
    score: 2,
  };
  currentPlayer = this.player1;
  otherPlayer = this.player2;
  possibleMoves = [];
  isGameOver = false;

  constructor() {
    this.initBoard();
    this.displayBoard();
    this.getPossibleMoves();
  }

  setGameState({ currentBoard, player1, player2, currentPlayer, otherPlayer, possibleMoves, isGameOver }) {
    this.currentBoard = currentBoard;
    this.player1 = player1;
    this.player2 = player2;
    this.currentPlayer = currentPlayer;
    this.otherPlayer = otherPlayer;
    this.possibleMoves = possibleMoves;
    this.isGameOver = isGameOver;
  }

  getGameState() {
    return {
      currentBoard: this.currentBoard,
      player1: this.player1,
      player2: this.player2,
      currentPlayer: this.currentPlayer,
      otherPlayer: this.otherPlayer,
      possibleMoves: this.possibleMoves,
      isGameOver: this.isGameOver,
    };
  }

  initBoard() {
    let board = [];
    for (let i = 0; i < this.boardSize; i++) {
      const row = [];
      for (let j = 0; j < this.boardSize; j++) {
        if ((i == 3 && j == 3) || (i == 4 && j == 4)) {
          row.push("W");
        } else if ((i == 4 && j == 3) || (i == 3 && j == 4)) {
          row.push("B");
        } else {
          row.push("_");
        }
      }
      board.push(row);
    }

    this.currentBoard = board;
  }

  displayBoard() {
    // console.log("\n\n\n\n\n\n\n");
    // console.log("Board State Number " + this.boardStateCount++);
    // console.log("\n    0 1 2 3 4 5 6 7\n");
    for (let i = 0; i < this.currentBoard.length; i++) {
      let str = `${i}  `;
      for (let j = 0; j < this.currentBoard[i].length; j++) {
        str += " " + this.currentBoard[i][j];
      }
      // console.log(`${str}\n`);
    }
  }

  switchPlayer() {
    let temp = this.currentPlayer;
    this.currentPlayer = this.otherPlayer;
    this.otherPlayer = temp;
  }

  getPossibleMoves() {
    this.possibleMoves = [];

    for (let i = 0; i < this.boardSize; i++) {
      for (let j = 0; j < this.boardSize; j++) {
        if (this.currentBoard[i][j] == this.currentPlayer.move) {
          // Check Left Row for White + Empty
          for (let x = j - 1; x > 0; x--) {
            if (this.currentBoard[i][x] == this.currentPlayer.move || this.currentBoard[i][x] == "_") break;
            if (this.currentBoard[i][x] === this.otherPlayer.move && this.currentBoard[i][x - 1] == "_") {
              this.possibleMoves.push([i, x - 1]);
              break;
            }
          }

          // Check Right Row For White + Empty
          for (let x = j + 1; x < this.boardSize - 1; x++) {
            if (this.currentBoard[i][x] == this.currentPlayer.move || this.currentBoard[i][x] == "_") break;
            if (this.currentBoard[i][x] === this.otherPlayer.move && this.currentBoard[i][x + 1] == "_") {
              this.possibleMoves.push([i, x + 1]);
              break;
            }
          }

          // Check Top Column For White + Empty
          for (let x = i - 1; x > 0; x--) {
            if (this.currentBoard[x][j] == this.currentPlayer.move || this.currentBoard[x][j] == "_") break;
            if (this.currentBoard[x][j] === this.otherPlayer.move && this.currentBoard[x - 1][j] == "_") {
              this.possibleMoves.push([x - 1, j]);
              break;
            }
          }

          // Check For Bottom Column For White + Empty
          for (let x = i + 1; x < this.boardSize - 1; x++) {
            if (this.currentBoard[x][j] == this.currentPlayer.move || this.currentBoard[x][j] == "_") break;
            if (this.currentBoard[x][j] === this.otherPlayer.move && this.currentBoard[x + 1][j] == "_") {
              this.possibleMoves.push([x + 1, j]);
              break;
            }
          }

          // Check For Right Top Diagonal
          let x = i - 1;
          let y = j + 1;
          while (x > 0 && y < this.boardSize - 1) {
            if (this.currentBoard[x][y] == this.currentPlayer.move || this.currentBoard[x][y] == "_") break;
            if (this.currentBoard[x][y] === this.otherPlayer.move && this.currentBoard[x - 1][y + 1] == "_") {
              this.possibleMoves.push([x - 1, y + 1]);
              break;
            }
            x--;
            y++;
          }

          // Check For Right Bottom Diagonal
          x = i + 1;
          y = j + 1;
          while (x < this.boardSize - 1 && y < this.boardSize - 1) {
            if (this.currentBoard[x][y] == this.currentPlayer.move || this.currentBoard[x][y] == "_") break;
            if (this.currentBoard[x][y] === this.otherPlayer.move && this.currentBoard[x + 1][y + 1] == "_") {
              this.possibleMoves.push([x + 1, y + 1]);
              break;
            }
            x++;
            y++;
          }

          // Check For Top Left Diagonal
          x = i - 1;
          y = j - 1;
          while (x > 0 && y > 0) {
            if (this.currentBoard[x][y] == this.currentPlayer.move || this.currentBoard[x][y] == "_") break;
            if (this.currentBoard[x][y] === this.otherPlayer.move && this.currentBoard[x - 1][y - 1] == "_") {
              this.possibleMoves.push([x - 1, y - 1]);
              break;
            }
            x--;
            y--;
          }

          // Check For Left Bottom Diagonal
          x = i + 1;
          y = j - 1;
          while (x < this.boardSize - 1 && y > 0) {
            if (this.currentBoard[x][y] == this.currentPlayer.move || this.currentBoard[x][y] == "_") break;
            if (this.currentBoard[x][y] === this.otherPlayer.move && this.currentBoard[x + 1][y - 1] == "_") {
              this.possibleMoves.push([x + 1, y - 1]);
              break;
            }
            x++;
            y--;
          }
        }
      }
    }
    // console.log({ currentPlayer: this.currentPlayer, possibleMoves: this.possibleMoves });
  }

  modifyBoardOnMove(i, j) {
    // Check Left Row
    let positionsToTurn = [];
    let tempPositionsToTurn = [];

    for (let x = j - 1; x >= 0; x--) {
      if (this.currentBoard[i][x] === this.otherPlayer.move) {
        // console.log("here");
        // console.log({ cp: this.currentPlayer });

        tempPositionsToTurn.push([i, x]);
        continue;
      }
      if (this.currentBoard[i][x] == this.currentPlayer.move) {
        // console.log("now here");

        positionsToTurn = [...positionsToTurn, ...tempPositionsToTurn];
        break;
      }
      if (this.currentBoard[i][x] == "_") {
        break;
      }
    }

    // Check Right Row
    tempPositionsToTurn = [];
    for (let x = j + 1; x < this.boardSize; x++) {
      if (this.currentBoard[i][x] === this.otherPlayer.move) {
        tempPositionsToTurn.push([i, x]);
        continue;
      }
      if (this.currentBoard[i][x] == this.currentPlayer.move) {
        positionsToTurn = [...positionsToTurn, ...tempPositionsToTurn];
        break;
      }
      if (this.currentBoard[i][x] == "_") {
        break;
      }
    }

    // Check Top Column
    tempPositionsToTurn = [];
    for (let x = i - 1; x >= 0; x--) {
      if (this.currentBoard[x][j] === this.otherPlayer.move) {
        tempPositionsToTurn.push([x, j]);
        continue;
      }
      if (this.currentBoard[x][j] == this.currentPlayer.move) {
        positionsToTurn = [...positionsToTurn, ...tempPositionsToTurn];
        break;
      }
      if (this.currentBoard[x][j] == "_") {
        break;
      }
    }

    // Check Bottom Column
    tempPositionsToTurn = [];
    for (let x = i + 1; x < this.boardSize; x++) {
      if (this.currentBoard[x][j] === this.otherPlayer.move) {
        tempPositionsToTurn.push([x, j]);
        continue;
      }
      if (this.currentBoard[x][j] == this.currentPlayer.move) {
        positionsToTurn = [...positionsToTurn, ...tempPositionsToTurn];
        break;
      }
      if (this.currentBoard[x][j] == "_") {
        break;
      }
    }

    // Check Bottom Left Row
    let x = i + 1;
    let y = j - 1;
    tempPositionsToTurn = [];
    while (x < this.boardSize && y >= 0) {
      if (this.currentBoard[x][y] === this.otherPlayer.move) {
        tempPositionsToTurn.push([x, y]);
      } else if (this.currentBoard[x][y] == this.currentPlayer.move) {
        positionsToTurn = [...positionsToTurn, ...tempPositionsToTurn];
        break;
      } else if (this.currentBoard[x][y] == "_") {
        break;
      }
      x++;
      y--;
    }

    // Check Top Left Row
    x = i - 1;
    y = j - 1;
    tempPositionsToTurn = [];
    while (x >= 0 && y >= 0) {
      if (this.currentBoard[x][y] === this.otherPlayer.move) {
        tempPositionsToTurn.push([x, y]);
      } else if (this.currentBoard[x][y] == this.currentPlayer.move) {
        positionsToTurn = [...positionsToTurn, ...tempPositionsToTurn];
        break;
      } else if (this.currentBoard[x][y] == "_") {
        break;
      }
      x--;
      y--;
    }

    // Check Top Right Row
    x = i - 1;
    y = j + 1;
    tempPositionsToTurn = [];
    while (x >= 0 && y < this.boardSize) {
      if (this.currentBoard[x][y] === this.otherPlayer.move) {
        tempPositionsToTurn.push([x, y]);
      } else if (this.currentBoard[x][y] == this.currentPlayer.move) {
        positionsToTurn = [...positionsToTurn, ...tempPositionsToTurn];
        break;
      } else if (this.currentBoard[x][y] == "_") {
        break;
      }
      x--;
      y++;
    }

    // Check Bottom Right Row
    x = i + 1;
    y = j + 1;
    tempPositionsToTurn = [];
    while (x < this.boardSize && y < this.boardSize) {
      if (this.currentBoard[x][y] === this.otherPlayer.move) {
        tempPositionsToTurn.push([x, y]);
      } else if (this.currentBoard[x][y] == this.currentPlayer.move) {
        positionsToTurn = [...positionsToTurn, ...tempPositionsToTurn];
        break;
      } else if (this.currentBoard[x][y] == "_") {
        break;
      }
      x++;
      y++;
    }

    for (let p of positionsToTurn) {
      this.currentBoard[p[0]][p[1]] = this.currentPlayer.move;
    }
  }

  isMoveValid(r, c) {
    let isValid = false;

    this.possibleMoves.forEach((move) => {
      if (move[0] == r && move[1] == c) {
        isValid = true;
        return;
      }
    });

    if (!isValid) {
      // console.log(`\n\n\n\n Sorry ${this.currentPlayer.name} You cannot Play that move!`);
    }

    return isValid;
  }

  addPlayerScore() {
    this.player1.score = 0;
    this.player2.score = 0;
    for (let i = 0; i < this.boardSize; i++) {
      for (let j = 0; j < this.boardSize; j++) {
        if (this.currentBoard[i][j] == this.player1.move) {
          this.player1.score++;
        }
        if (this.currentBoard[i][j] == this.player2.move) {
          this.player2.score++;
        }
      }
    }
  }

  makeMove(r, c) {
    if (!this.isMoveValid(r, c)) return false;
    this.currentBoard[r][c] = this.currentPlayer.move;
    this.modifyBoardOnMove(r, c);
    this.addPlayerScore();
    this.switchPlayer();
    this.displayBoard();
    this.getPossibleMoves();

    if (this.possibleMoves.length <= 0) {
      this.switchPlayer();
      this.getPossibleMoves();
      if (this.possibleMoves.length <= 0) {
        this.isGameOver = true;
        // console.log("\n\n\n\nGame Over");
        // console.log(`Player 1: ${this.player1.score}`);
        // console.log(`Player 2: ${this.player2.score}`);
        if (this.player1.score > this.player2.score) {
          // console.log(`\n${this.player1.name} Wins!`);
        } else if (this.player2.score > this.player1.score) {
          // console.log(`\n${this.player2.name} Wins!`);
        } else {
          // console.log("\nDraw");
        }
      }
    }
    return true;
  }
}
