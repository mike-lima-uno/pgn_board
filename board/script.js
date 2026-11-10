
const board = document.querySelector("#chessboard");
const files = "abcdefgh";

for (let row = 0; row < 8; row += 1) {
  for (let column = 0; column < 8; column += 1) {
    const rank = 8 - row;
    const file = files[column];
    const square = document.createElement("div");
    square.className = `square square--${(row + column) % 2 === 0 ? "light" : "dark"}`;
    square.id = `${file}${rank}`;
    square.dataset.row = String(row);
    square.dataset.column = String(column);
    square.setAttribute("role", "gridcell");
    square.setAttribute("aria-label", `${file.toUpperCase()}${rank}`);
    square.tabIndex = 0;
    square.innerHTML = `<span class="square-coordinate">${file.toUpperCase()}${rank}</span>`;
    square.addEventListener("pointerenter", () => highlightSquare(square));
    square.addEventListener("focus", () => highlightSquare(square));
    square.addEventListener("pointerleave", clearHighlights);
    square.addEventListener("blur", clearHighlights);
    board.append(square);
  }
}

function highlightSquare(activeSquare) {
  const { row, column } = activeSquare.dataset;
  board.querySelectorAll('[role="gridcell"]').forEach((square) => {
    const sharesAxis = square.dataset.row === row || square.dataset.column === column;
    square.classList.toggle("is-active", square === activeSquare);
    square.classList.toggle("is-axis", sharesAxis && square !== activeSquare);
  });
}

function clearHighlights() {
  board.querySelectorAll('[role="gridcell"]').forEach((square) => {
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
});

moveInput.addEventListener("input", () => {
  moveInput.removeAttribute("aria-invalid");
  moveResult.textContent = "";
  moveResult.className = "move-result";
});
