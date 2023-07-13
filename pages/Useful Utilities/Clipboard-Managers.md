_Starting method:_ manual (`exec-once`)

Clipboard Managers are useful tools that allows one to manage their copied items, be-it texts or images.

Some common ones used are `copyq`, `clipman` and `cliphist`.

`clipman` - Utilizes Wayland  with `wl-clipboard` support and stores text only [Github](https://github.com/yory8/clipman)

`cliphist` - Utilizes Wayland with `wl-clipboard` and can store both images and text [Github](https://github.com/sentriz/cliphist) 

`wl-clip-persists` - When we copy something on Wayland (using wl-clipboard) and close the application we copied from, the copied data disappears from the clipboard and we cannot paste it anymore. So to fix this problem we can use a program called as `wl-clip-persists` which will preserve the data in the clipboard after the application is closed. [Github](https://github.com/Linus789/wl-clip-persist)

## copyq

Start by adding the following lines to your `~/.config/hypr/hyprland.conf`

```ini
exec-once = copyq --start-server
```
If your `copyq`'s main window cannot close/hide properly, try to enable its "Hide main window" option in Layout configuration tab in Preferences dialog.

## cliphist

Start by adding the following lines to your `~/.config/hypr/hyprland.conf`

```ini
exec-once = wl-paste --type text --watch cliphist store #Stores only text data

exec-once = wl-paste --type image --watch cliphist store #Stores only image data
```
Do note that any of the above lines can be disabled based on your needs

To bind `cliphist` to a hotkey and display it under `rofi` or `dmenu`, again head over to `~/.config/hypr/hyprland.conf`

### For `rofi` users
```ini
bind = SUPER, V, exec, cliphist list | rofi -dmenu | cliphist decode | wl-copy
```

### For `dmenu` users
```ini
bind = SUPER, V, exec, cliphist list | dmenu | cliphist decode | wl-copy
```
The binds mention above correspond to SUPER+V to access the clipboard history

For further info, please refer to the repository mentioned above

## clipman  

Start by adding the following line to your `~/.config/hypr/hyprland.conf`

```ini
exec-once = wl-paste -t text --watch clipman store --no-persist
```
If you wish to use it as a primary clipboard manager, use this instead

```ini
exec-once = wl-paste -p -t text --watch clipman store -P --histpath="~/.local/share/clipman-primary.json"
```
And also make sure to create a file named `clipman-primary.json` in `~/.local/share/clipman-primary.json`

Now bind the `clipman` like this:

### For `rofi` users
```ini
bind = SUPER, V, exec, clipman pick -t rofi
```

### For `dmenu` users
```ini
bind = SUPER, V, exec, clipman pick -t dmenu
```

So on and so forth. For further information, please refer to the repository mentioned above



