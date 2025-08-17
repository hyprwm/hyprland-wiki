# CONTRIBUTING

## Issues and Pull Requests

Feel free to open an issue or a PR if you feel anything is necessary.  
Make sure to **clearly** state the reason for the changes.

If you make multiple changes in your PR, it is best to squash them
into self-contained commits that contain one logical change.  
For info about how to squash commits, see [How do I squash my last N commits together?](https://stackoverflow.com/a/5189600)

## Commits

Commits should follow the format: `Dir/Page: summary of changes`, or alternatively, `Scope: summary of changes`  
Some examples:
- `Configuring/Animations: Add amogus section`
- `Backend: Update linter configuation`
- `Meta: Fix CI`

Optionally, you can include a longer commit message 2 lines below the commit
title.  
This format makes it easier to glance over the commit list and figure out what
each commit is about.

## Local Development

We currently use [Hugo](https://gohugo.io/) + the [Hextra theme](https://github.com/imfing/hextra) to build all the pages in `content/` into a static website.

Checking your changes by building them locally is not required, but it's advised especially if they modify the visual structure of a page or section.

To start editing locally, make sure to have `go` and `hugo` installed. Then, run:

```sh
git clone https://github.com/hyprwm/hyprland-wiki
cd hyprland-wiki
hugo serve
```
Open `http://localhost:1313` to see your locally-rendered wiki.

## Linting and Writing Style Guide

We provide a set of linting tools that you can run to make sure to catch common errors before pushing your commits.  
To run the linter, make sure you have [pnpm](https://pnpm.io/) installed, the run:

```shell
cd lint
pnpm i # only needed the first time, installs all dependencies
pnpm run checkall
# or `pnpm run check ../content/Configuring/Aniamtions.md` to lint a single file
# or `pnpm run check ../content/Configuring/ to lint a all pages in a section`
```

You can find the linter configuration file in `lint/.remarkrc.js`.  
This contains a list of [remark](https://github.com/remarkjs/remark) lint [plugins](https://github.com/remarkjs/remark-lint) and their options.  
If you want to suggest any changes to this config, feel free to submit an issue.