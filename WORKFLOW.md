# GitHub Branch Workflow

This project uses `main` and `dev` as its long-lived branches.

## Branch roles

- `main` contains the stable, reviewed version of the project. Changes reach `main` through release pull requests from `dev`.
- `dev` is the integration branch for completed work and the starting point for new feature branches.
- Short-lived feature branches use descriptive names, such as `feature/board-coordinates` or `fix/notation-check`.

## Day-to-day development

1. Start from the latest `dev` branch and create a feature branch.
2. Make a focused change and test it locally. For the current static page, open `dashboard/index.html` in a browser and check the board interaction and move-input behavior.
3. Commit the change with a concise, descriptive message.
4. Push the feature branch and open a pull request targeting `dev`.
5. Review the pull request, address feedback, and merge it into `dev` when ready.
6. When `dev` is ready for a stable release, open a pull request from `dev` to `main`, review it, and merge it.

## Initial branch setup

If `dev` does not exist yet, create it from the current `main` branch after the initial project commit, then push both branches to GitHub. Keep `main` and `dev` synchronized through pull requests rather than making routine feature changes directly on `main`.

## Commit and review guidance

- Keep each commit focused and use clear messages (for example, `Add board coordinate labels`).
- Check the browser UI before submitting a user-facing change.
- Describe what changed and how it was checked in the pull request.
- Do not commit credentials, private keys, or local environment files.
