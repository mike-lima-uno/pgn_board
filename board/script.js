
const BOARD = document.querySelector("#chessboard");
const BOARD_COLS = "abcdefgh";
const toggleSidesButton = document.querySelector("#toggle-sides");
const resetButton = document.querySelector("#reset-game");
const PIECE_FILES = {
  white: {
    king: "king_white.png",
    queen: "queen_white.png",
    rook: "rook_white.png",
    bishop: "bishop_white.png",
    knight: "knight_white.png",
    pawn: "pawn_white.png",
  },
  black: {
    king: "king_black.png",
    queen: "queen_black.png",
    rook: "rook_black.png",
    bishop: "bishop_black.png",
    knight: "knight_black.png",
    pawn: "pawn_black.png",
  },
};
let activeDrag = null;
let gameStarted = false;
let sidesToggled = false;

for (let row = 0; row < 8; row += 1) {
  for (let column = 0; column < 8; column += 1) {
    const rank = 8 - row;
    const board_col = BOARD_COLS[column];
    const square = document.createElement("div");
    square.className = `square square--${(row + column) % 2 === 0 ? "light" : "dark"}`;
    square.id = `${board_col}${rank}`;
    square.dataset.row = String(row);
    square.dataset.column = String(column);
    square.setAttribute("role", "gridcell");
    square.setAttribute("aria-label", `${board_col.toUpperCase()}${rank}`);
    square.tabIndex = 0;
    square.innerHTML = `<span class="square-coordinate">${board_col.toUpperCase()}${rank}</span>`;
    square.addEventListener("pointerenter", () => highlightSquare(square));
    square.addEventListener("focus", () => highlightSquare(square));
    square.addEventListener("pointerleave", clearHighlights);
    square.addEventListener("blur", clearHighlights);
    BOARD.append(square);
  }
}

function addPiece(file, rank, color, type) {
  const square = document.getElementById(`${file}${rank}`);
  const piece = document.createElement("img");
  piece.className = "chess-piece";
  piece.src = `../assets/${PIECE_FILES[color][type]}`;
  piece.alt = `${color} ${type}`;
  piece.draggable = false;
  piece.dataset.color = color;
  piece.dataset.type = type;
  piece.addEventListener("pointerdown", startDragging);
  square.append(piece);
}

const backRank = ["rook", "knight", "bishop", "king", "queen", "bishop", "knight", "rook"];

function swapBoardSides() {
  const rotatedPieces = [...BOARD.querySelectorAll(".chess-piece")].map((piece) => {
    const square = piece.parentElement;
    const file = BOARD_COLS[BOARD_COLS.length - 1 - BOARD_COLS.indexOf(square.id[0])];
    const rank = 9 - Number(square.id[1]);
    return { piece, destination: document.getElementById(`${file}${rank}`) };
  });
  rotatedPieces.forEach(({ piece }) => piece.remove());
  rotatedPieces.forEach(({ piece, destination }) => destination.append(piece));
}

function populateStartingPosition() {
  BOARD.querySelectorAll(".chess-piece").forEach((piece) => piece.remove());
  for (let column = 0; column < BOARD_COLS.length; column += 1) {
    const file = BOARD_COLS[column];
    addPiece(file, 8, "white", backRank[column]);
    addPiece(file, 7, "white", "pawn");
    addPiece(file, 2, "black", "pawn");
    addPiece(file, 1, "black", backRank[column]);
  }
  if (sidesToggled) {
    swapBoardSides();
  }
}

function markGameStarted() {
  gameStarted = true;
  toggleSidesButton.disabled = true;
}

populateStartingPosition();

function startDragging(event) {
  if (event.button !== 0 || activeDrag) {
    return;
  }

  event.preventDefault();
  const piece = event.currentTarget;
  const bounds = piece.getBoundingClientRect();
  const ghost = piece.cloneNode();
  ghost.classList.add("chess-piece-ghost");
  ghost.style.width = `${bounds.width}px`;
  ghost.style.height = `${bounds.height}px`;
  document.body.append(ghost);
  piece.classList.add("is-dragging");

  activeDrag = {
    piece,
    origin: piece.parentElement,
    ghost,
    offsetX: bounds.width / 2,
    offsetY: bounds.height / 2,
    startX: event.clientX,
    startY: event.clientY,
    moved: false,
  };
  moveDragGhost(event);
}

function moveDragGhost(event) {
  if (!activeDrag) {
    return;
  }

  if (Math.hypot(event.clientX - activeDrag.startX, event.clientY - activeDrag.startY) > 3) {
    activeDrag.moved = true;
  }
  activeDrag.ghost.style.left = `${event.clientX - activeDrag.offsetX}px`;
  activeDrag.ghost.style.top = `${event.clientY - activeDrag.offsetY}px`;
}

function finishDragging(event) {
  if (!activeDrag) {
    return;
  }

  const { piece, origin, ghost, moved } = activeDrag;
  if (moved) {
    const emptySquares = [...BOARD.querySelectorAll('[role="gridcell"]')].filter((square) => (
      square === origin || !square.querySelector(".chess-piece")
    ));
    const destination = emptySquares.reduce((nearest, square) => {
      const bounds = square.getBoundingClientRect();
      const distance = Math.hypot(
        bounds.left + bounds.width / 2 - event.clientX,
        bounds.top + bounds.height / 2 - event.clientY,
      );
      return !nearest || distance < nearest.distance ? { square, distance } : nearest;
    }, null);

    if (destination && destination.square !== origin) {
      destination.square.append(piece);
      markGameStarted();
    }
  }
  piece.classList.remove("is-dragging");
  ghost.remove();
  activeDrag = null;
}

document.addEventListener("pointermove", moveDragGhost);
document.addEventListener("pointerup", finishDragging);
document.addEventListener("pointercancel", () => {
  if (!activeDrag) {
    return;
  }
  activeDrag.piece.classList.remove("is-dragging");
  activeDrag.ghost.remove();
  activeDrag = null;
});

toggleSidesButton.addEventListener("click", () => {
  if (gameStarted) {
    return;
  }
  sidesToggled = !sidesToggled;
  swapBoardSides();
  toggleSidesButton.setAttribute("aria-pressed", String(sidesToggled));
});

resetButton.addEventListener("click", () => {
  if (!window.confirm("Reset the board and clear the current move?")) {
    return;
  }
  gameStarted = false;
  toggleSidesButton.disabled = false;
  populateStartingPosition();
  moveInput.value = "";
  moveInput.removeAttribute("aria-invalid");
  moveResult.textContent = "";
  moveResult.className = "move-result";
});

function highlightSquare(activeSquare) {
  const { row, column } = activeSquare.dataset;
  BOARD.querySelectorAll('[role="gridcell"]').forEach((square) => {
    const sharesAxis = square.dataset.row === row || square.dataset.column === column;
    square.classList.toggle("is-active", square === activeSquare);
    square.classList.toggle("is-axis", sharesAxis && square !== activeSquare);
  });
}

function clearHighlights() {
  BOARD.querySelectorAll('[role="gridcell"]').forEach((square) => {
    square.classList.remove("is-active", "is-axis");
  });
}

const moveForm = document.querySelector("#move-form");
const moveInput = document.querySelector("#move-input");
const moveResult = document.querySelector("#move-result");
const sanMovePattern = /^(?:(?:O|0)-(?:O|0)(?:-(?:O|0))?|(?:[KQRBN](?:[a-h][1-8]?|[1-8])?x?[a-h][1-8](?:=[QRBN])?|[a-h]x[a-h][1-8]|[a-h][1-8](?:=[QRBN])?)[+#]?)(?:[!?]{1,2})?$/;
const numberedMovePattern = /^(?:\d+\.(?:\.\.\.)?\s*)?(.+)$/;

moveForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const enteredMove = moveInput.value.trim();
  const moveMatch = enteredMove.match(numberedMovePattern);
  const sanMove = moveMatch ? moveMatch[1].trim() : "";
  const isValid = sanMovePattern.test(sanMove);

  moveInput.setAttribute("aria-invalid", String(!isValid));
  moveResult.className = `move-result ${isValid ? "is-valid" : "is-invalid"}`;
  moveResult.textContent = isValid ? "Good move · valid notation" : "Invalid notation";
  if (isValid) {
    markGameStarted();
  }
});

moveInput.addEventListener("input", () => {
  moveInput.removeAttribute("aria-invalid");
  moveResult.textContent = "";
  moveResult.className = "move-result";
});
