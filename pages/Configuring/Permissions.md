---
weight: 12
title: Permissions
---

If you have `hyprland-qtutils` installed, you can make use of Hyprland's built-in
permission system.

For now, it only has one permission, but it might include more in the future.

## Permissions

Permissions work a bit like Android ones. If an app tries to do something sensitive with
the compositor (Hyprland), Hyprland will pop up a notification asking you if you
want to let it do that.

{{< callout type=info >}}

Before setting up permissions, make sure you enable them by setting
`ecosystem:enforce_permissions = true`, as it's disabled by default.

{{</ callout >}}


### Configuring permissions

Configuring them is simple:

```ini
permission = regex, permission, mode
```

for example:
```ini
permission = /usr/bin/grim, screencopy, allow
```
Will allow `/usr/bin/grim` to always capture your screen without asking.


### Permisision modes

There are 3 modes:
- `allow`: Don't ask, just allow the app to proceed.
- `ask`: Pop up a notification every time the app tries to do something sensitive. These popups allow you to Deny, Allow until the app exits, or Allow until Hyprland exits.
- `deny`: Don't ask, always deny the application access.


### Permission list

`screencopy`:
 - Access to your screen _without_ going through xdg-desktop-portal-hyprland. Examples include: `grim`, `wl-screenrec`, `wf-recorder`.
 - If denied, will render a black screen with a "permission denied" text.
 - Why deny? For apps / scripts that might maliciously try to capture your screen without your knowledge by using wayland protocols directly.


## Notes

**xdg-desktop-portal** implementations (including xdph) are just regular applications. They will go through permissions too. You might want to consider
adding a rule like this:
```ini
permission = /usr/(lib|libexec|lib64)/xdg-desktop-portal-hyprland, screencopy, allow
```
if you are not allowing screencopy for all apps.

<br/>

On some **BSD** systems paths might not work. In such cases, you might want to disable permissions altogether, by setting
```ini
ecosystem {
  enforce_permissions = false
}
```
otherwise, you have no _config_ control over permissions (popups will still work, although will not show paths, and "remember" will not be available).

