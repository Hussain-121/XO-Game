const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');
let currentPlayer = 'X';
let board = Array(9).fill('');
let gameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const updateBoard = (index) => {
  board[index] = currentPlayer;
};

const checkWinner = () => {
  let winner = null;
  for (const condition of winningConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = currentPlayer;
      break;
    }
  }
  return winner;
};

const checkDraw = () => {
  return board.every(cell => cell !== '');
};

const handleCellClick = (e) => {
  const cellIndex = e.target.getAttribute('data-index');
  
  if (board[cellIndex] !== '' || !gameActive) return;
  
  updateBoard(cellIndex);
  e.target.textContent = currentPlayer;

  const winner = checkWinner();
  if (winner) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (checkDraw()) {
    statusText.textContent = 'Game is a draw!';
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
};

const restartGame = () => {
  currentPlayer = 'X';
  board = Array(9).fill('');
  gameActive = true;
  cells.forEach(cell => cell.textContent = '');
  statusText.textContent = `Player ${currentPlayer}'s turn`;
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);

statusText.textContent = `Player ${currentPlayer}'s turn`;
