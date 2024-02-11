## Wofi

Wofi is a GTK-based customizable launcher for wayland.
[SourceHut](https://hg.sr.ht/~scoopta/wofi).

## Rofi (Wayland fork)

Rofi, but with Wayland support.
[GitHub](https://github.com/lbonn/rofi).

## bemenu

bemenu is a Wayland-native replacement for dmenu.
[GitHub](https://github.com/Cloudef/bemenu).

## fuzzel

Fuzzel is an application launcher for wlroots based Wayland compositors, similar to rofi's `drun` mode.
[Codeberg](https://codeberg.org/dnkl/fuzzel)

## tofi

tofi is an extremely fast and simple yet highly customizable dmenu / rofi replacement for wlroots-based Wayland compositors. When configured correctly, tofi can get on screen within a single frame.
[Github](https://github.com/philj56/tofi)

For a more comprehensive list of launchers, check
[awesome-hyprland](https://github.com/hyprland-community/awesome-hyprland#runners-menus-and-application-launchers).

## Emacs
If you are already running an emacs server you can use Emacs.

The config below is taken from [DistroTube's Configuring Emacs](https://gitlab.com/dwt1/configuring-emacs/-/blob/main/07-the-final-touches/scripts/app-launchers.el?ref_type=heads) repository.
```emacs-lisp
;;; app-launchers.el --- Possible alternatives to dmenu/rofi
;;; Code:

;; Counsel-Linux-App
;; Since we have counsel installed, we can use 'counsel-linux-app' to launch our Linux apps.  It list the apps by their executable command, so it's kind of tricky to use.

(defun dt/emacs-counsel-launcher ()
  "Create and select a frame called emacs-counsel-launcher which consists only of a minibuffer and has specific dimensions. Runs counsel-linux-app on that frame, which is an emacs command that prompts you to select an app and open it in a dmenu like behaviour. Delete the frame after that command has exited"
  (interactive)
  (with-selected-frame 
    (make-frame '((name . "emacs-run-launcher")
                  (minibuffer . only)
                  (fullscreen . 0) ; no fullscreen
                  (undecorated . t) ; remove title bar
                  ;;(auto-raise . t) ; focus on this frame
                  ;;(tool-bar-lines . 0)
                  ;;(menu-bar-lines . 0)
                  (internal-border-width . 10)
                  (width . 80)
                  (height . 11)))
                  (unwind-protect
                    (counsel-linux-app)
                    (delete-frame))))


;; App-Launcher
;; The 'app-launcher' is a better run launcher since it reads the desktop applications on your system and you can search them by their names as defined in their desktop file.  This means that sometimes you have to search for a generic term rather than the actual binary command of the program.

(use-package app-launcher
  :elpaca '(app-launcher :host github :repo "SebastienWae/app-launcher"))
;; create a global keyboard shortcut with the following code
;; emacsclient -cF "((visibility . nil))" -e "(emacs-run-launcher)"

(defun dt/emacs-run-launcher ()
  "Create and select a frame called emacs-run-launcher which consists only of a minibuffer and has specific dimensions. Runs app-launcher-run-app on that frame, which is an emacs command that prompts you to select an app and open it in a dmenu like behaviour. Delete the frame after that command has exited"
  (interactive)
  (with-selected-frame 
    (make-frame '((name . "emacs-run-launcher")
                  (minibuffer . only)
                  (fullscreen . 0) ; no fullscreen
                  (undecorated . t) ; remove title bar
                  ;;(auto-raise . t) ; focus on this frame
                  ;;(tool-bar-lines . 0)
                  ;;(menu-bar-lines . 0)
                  (internal-border-width . 10)
                  (width . 80)
                  (height . 11)))
                  (unwind-protect
                    (app-launcher-run-app)
                    (delete-frame))))

(provide 'app-launchers)
;;; app-launchers.el ends here
```
