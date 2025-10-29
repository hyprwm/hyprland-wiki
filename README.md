# Hyprland Wiki

Welcome to the Hyprland Wiki! Here we store the wiki pages. They are automatically updated on the
website whenever a change occurs, within a reasonable timeframe (usually 1–2 minutes).
You can find the site at [https://wiki.hypr.land/](https://wiki.hypr.land/)

## Contributing to the Wiki

Feel free to open an issue or a PR if you feel anything is necessary.
Make sure to clearly state the reason for the changes.

Commits should have the form:

`Dir/Page: summary of changes`

Optionally, you can include a longer commit message 2 lines below the commit
title.

This format makes it easier to glance over the commit list and figure out what
each commit is about.

Additionally, if you make many changes in your PR, it is best to squash them
into self-contained commits that contain one logical change.

For info about how to squash commits, see [this](https://stackoverflow.com/a/5189600).

## Local development

To see your local changes, make sure to have `go` and `hugo` installed. Then, run

```sh
$ hugo serve
```

and open `http://localhost:1313` to see the locally-rendered wiki.

## License

This repository is licensed under the [BSD 3-Clause License](./LICENSE).
