# PGN Board

A small chess movement dashboard built with HTML, CSS, and plain JavaScript. It displays a chessboard with pieces, lets you rearrange them, and checks the format of a move written in Standard Algebraic Notation (SAN).

## Introduction

The board is an early learning project: it currently focuses on the visual board, square coordinates, hover feedback, draggable pieces, and move-notation input. It does not yet track a chess position or determine whether a move is legal.

## Run locally

Open [`board/index.html`](board/index.html) in a modern browser, or serve the repository with a local development server.

## Git workflow

Use `main` for published code and `dev` for development. Commit and push changes to `dev`, then fast-forward `main` when the work is ready to publish. See [WORKFLOW.md](WORKFLOW.md) for the commands and safeguards.

## Features

- 8×8 board with file and rank coordinates and the standard starting setup: White on ranks 1–2 and Black on ranks 7–8.
- Individually identified squares (`a1` through `h8`).
- Pastel alternating squares; hovering or focusing a square highlights its rank and file.
- Drag pieces freely; when released, each piece snaps to the nearest empty square.
- Reset the board to the standard starting position, with confirmation.
- A separate move-entry panel for common SAN notation.

## Project status

Notation checking validates the input format only and does not yet move pieces. Position-aware move validation and game rules are not implemented yet.

## TODO

- [ ] TODO: next step -> moves with notation
- [ ] TODO: toggle pieces between players

## Sources

Chess piece icons by deemakdaksina - [Flaticon](https://www.flaticon.com/free-icons/chess). See [asset source notes](assets/sources.txt).

## Chess rules reference

The starting position and board orientation follow the [FIDE Laws of Chess, Article 2 (The Initial Position of the Pieces on the Chessboard)](https://handbook.fide.com/chapter/E012023): the near right-hand corner is a light square, White starts on ranks 1–2, Black on ranks 7–8, and each queen starts on a square of its own colour.
