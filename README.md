# PGN Movement Dashboard

A small browser-based chess movement dashboard. The current page contains an empty 8×8 board, file and rank coordinates, square hover highlighting, and a field for checking chess move notation.

## Run locally

Open `dashboard/index.html` in a modern browser. Tailwind CSS is loaded from its CDN, so an internet connection is required for the page's styling.

## Current features

- Empty chessboard with A–H and 1–8 coordinates.
- Hovering over or focusing a square highlights its rank and file and displays its coordinate.
- The move input accepts common Standard Algebraic Notation (SAN) forms and reports whether the notation format looks valid.

Notation checking currently validates format only; it does not verify whether a move is legal in a particular chess position.

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines and [WORKFLOW.md](WORKFLOW.md) for the branch workflow.

## License

This project is distributed under the MIT License. See [LICENSE](LICENSE).
