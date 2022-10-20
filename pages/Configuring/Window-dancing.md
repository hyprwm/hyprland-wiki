Some XWayland games like Rhythm Doctor and Friday Night Funkin' mods like to move the windows by themselves, but that often doesn't work by default.

# Configuring

I'll be using Rhythm Doctor as an example. 

1. Set input rules
```ini
input {
	# ...
	follow_mouse=0
	float_switch_override_focus=0
	
}
```

2. Set the windowrule

```ini
windowrule=windowdance, rhythm doctor.exe
```

3. Have fun!

![Demo](https://pool.jortage.com/voringme/misskey/565b9dfb-125f-4ea0-9257-b371cb4c7195.mp4)
