# Git workflow

This project uses two branches:

- `main` contains the published, stable version of the project.
- `dev` is where changes are developed, reviewed, committed, and pushed.

Use fast-forward-only updates to keep the history linear. Do not force-push. If a fast-forward is rejected or the branches have diverged, stop and inspect the history before proceeding.

## Create and publish the development branch

Run this once if `dev` does not exist yet:

```sh
git switch main
git pull --ff-only origin main
git switch -c dev
git push -u origin dev
```

If `dev` already exists, switch to it and update it instead:

```sh
git switch dev
git pull --ff-only origin dev
```

## Develop on `dev`

After making changes, inspect and validate what will be committed:

```sh
git status --short
git add -A
git diff --cached --check
git diff --cached
git commit -m "Describe the change"
git push origin dev
```

Review the staged diff before committing, especially when using `git add -A`.

## Publish `dev` to `main`

When the changes are ready to publish:

```sh
git switch main
git pull --ff-only origin main
git merge --ff-only dev
git push origin main
git switch dev
git pull --ff-only origin dev
```

If `git merge --ff-only dev` fails, do not force the merge. Inspect the branches and commit graph first:

```sh
git log --oneline --graph --decorate --all
git status --short --branch
```

## Useful checks

```sh
git branch
git status --short --branch
git log --oneline --graph --decorate --all
```
