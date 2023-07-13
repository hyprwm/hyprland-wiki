This page documents the recommended guidelines for making a stable and neat plugin.

{{< toc >}}

## Formatting
Although Hyprland plugins obviously are not _required_ to follow Hyprland's formatting, naming conventions, etc.
it might be a good idea to keep your code consistent. See `.clang-format` in the Hyprland repo.

## Usage of the API
It's always advised to use the API entries whenever possible, as they are guaranteed stability as long as the version
matches.

It is, of course, possible to use the internal methods by just including the proper headers,
but it should not be treated as the default way of doing things.

Hyprland's internal methods may be changed, removed or added without any prior notice. It is worth nothing though
that methods that "seem" fundamental, like e.g. `focusWindow` or `mouseMoveUnified` probably are, and are
unlikely to change their general method of functioning.

## Function Hooks
Function hooks allow your plugin to intercept all calls to a function of your choice. They are to be treated as
a last resort, as they are the easiest thing to break between updates.

Always prefer using Event Hooks.

## Threads
The Wayland event loop is strictly single-threaded. It is not recommended to create threads in your code, unless
they are fully detached from the Hyprland process. (e.g. saving a file)