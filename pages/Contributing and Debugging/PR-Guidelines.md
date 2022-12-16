# PR Requirements

- Clean, not hacky code
- Described changes and _why_ they were there
- Following the style (see below)

## Code Style

Hyprland's code style is governed by the `.clang-format` file.

Make sure to format accordingly whenever you make a PR.

## Some code FAQ

> Why is the config variable getting so weird?

Every variable from the config needs to be found in a hashmap. To limit the amount of hashmap searches, getting a config option looks like this:

```cpp
static auto* const PFOLLOWMOUSE = &g_pConfigManager->getConfigValuePtr("input:follow_mouse")->intValue;
```

Since the hashmap _cannot_ be mutated during runtime, this pointer will always be valid, and will not require hashmap lookups every single time it's read.
