const startBtn = document.querySelector('.btn');
let playerTurn = document.querySelector('.play-turn');
const cells = document.querySelectorAll('.cell');
const container = document.querySelector('.container');
const end = document.querySelector('.change');

let finishText;
let playingNow = 'O';
let play;
// getting current player
const changeLights = function () {
  if (playingNow === 'O') {
    playerTurn.classList.remove('player-two');
    playerTurn = document.querySelectorAll('.play-turn')[0];
    playerTurn.classList.add('player-one');
  } else {
    playerTurn.classList.remove('player-one');
    playerTurn = document.querySelectorAll('.play-turn')[1];
    playerTurn.classList.add('player-two');
  }
};
const playerChanges = function () {
  changeLights();
  playingNow = playingNow === 'X' ? 'O' : 'X';
};

// clear the board or restart
const clearBoard = function () {
  end.classList.add('show');
  play = true;
  startBtn.textContent = 'Restart';
  playingNow = 'O';
  playerChanges();
  cells.forEach(function (cell) {
    cell.textContent = '';
  });
};
startBtn.addEventListener('click', clearBoard);

// change player
const changePlayer = function (cell) {
  cell.addEventListener('click', function () {
    if (cell.textContent == '' && play) {
      playerChanges();
      cell.textContent = playingNow;
    }
    checkingVictory(cellArray);
  });
};
cells.forEach(changePlayer);

// check for winner

// winning combinations
const cellArray = Array.from(cells);
/*
   Indexes within the board
   [0] [1] [2]
   [3] [4] [5]
   [6] [7] [8]
*/

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkingVictory = function (cellArray) {
  let win = false;

  for (let i = 0; i < winConditions.length; i++) {
    winCondition = winConditions[i];
    let first = cellArray[winCondition[0]];
    let second = cellArray[winCondition[1]];
    let third = cellArray[winCondition[2]];

    if (
      first.textContent == '' ||
      second.textContent == '' ||
      third.textContent == ''
    ) {
      continue;
    }

    if (
      first.textContent == second.textContent &&
      second.textContent == third.textContent
    ) {
      win = true;
      console.log(`current player is ${playingNow}`);
      console.log(`Game ended`);
      break;
    }
  }

  // let tieGame = !cellArray.includes('');

  const gameArray = cellArray.map(function (cell) {
    return cell.textContent;
  });
  let tieGame = !gameArray.includes('');
  if (tieGame) {
    gameEnds();
    document.querySelector('.winner-text').textContent = `Tie Game`;
  }
  if (win) {
    gameEnds();
    displayWinner();
    document.querySelector('.winner-text').textContent = finishText;
  }
};

const gameEnds = function () {
  end.classList.remove('show');
  play = false;
  playerTurn.classList.remove('player-two', 'player-one');
};
const displayWinner = function () {
  finishText = playingNow === 'O' ? `player 01 wins` : `player 02 wins`;
};

// checking tie game
