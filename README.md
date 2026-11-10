# PGN Board

A small chess movement dashboard built with HTML, CSS, and plain JavaScript. It displays an empty 8×8 chessboard, highlights a square's rank and file, and checks the format of a move written in Standard Algebraic Notation (SAN).

## Introduction

The board is an early learning project: it currently focuses on the visual board, square coordinates, hover feedback, and move-notation input. It does not yet track a chess position or determine whether a move is legal.

## Run locally

Open [`board/index.html`](board/index.html) in a modern browser, or serve the repository with a local development server.

## Git workflow

Use `main` for published code and `dev` for development. Commit and push changes to `dev`, then fast-forward `main` when the work is ready to publish. See [WORKFLOW.md](WORKFLOW.md) for the commands and safeguards.

## Features

- Empty 8×8 board with file and rank coordinates.
- Individually identified squares (`a1` through `h8`).
- Pastel alternating squares; hovering or focusing a square highlights its rank and file.
- A separate move-entry panel for common SAN notation.

## Project status

Notation checking validates the input format only. Position-aware move validation, chess pieces, and game rules are not implemented yet.
