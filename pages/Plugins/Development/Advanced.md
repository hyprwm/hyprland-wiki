This page documents a few advanced things about the Hyprland Plugin API.

{{< toc >}}

## Using Function Hooks

{{< hint type=important >}}

Function hooks are only available on `AMD64` (`x86_64`).
Attempting to hook on any other arch will make Hyprland simply ignore your hooking attempt.

{{</ hint >}}

Function hooks are intimidating at first, but when used properly can be _extremely_ powerful.

Function hooks allow you to intercept any call to the function you hook.

Let's look at a simple example:
```cpp
void Events::listener_monitorFrame(void* owner, void* data)
```
will be the function we want to hook. `Events::` is a namespace, not a class, so this
is just a plain function.

```cpp
// make a global instance of a hook class for this hook
inline CFunctionHook* g_pMonitorFrameHook = nullptr;
// create a pointer typedef for the function we are hooking.
typedef void (*origMonitorFrame)(void*, void*);

// our hook
void hkMonitorFrame(void* owner, void* data) {
    (*(origMonitorFrame)g_pMonitorFrameHook->m_pOriginal)(owner, data);
}

APICALL EXPORT PLUGIN_DESCRIPTION_INFO PLUGIN_INIT(HANDLE handle) {
    // stuff...

    // create the hook
    g_pMonitorFrameHook = HyprlandAPI::createFunctionHook(handle, (void*)&Events::listener_monitorFrame, (void*)&hkMonitorFrame);

    // init the hook
    g_pMonitorFrameHook->hook();

    // further stuff...
}

```

We have just made a hook. Now, whenever Hyprland calls `Events::listener_monitorFrame`, our hook will be called instead!

This way, you can run code before / after the function, modify the inputs or results, or even block the function from executing.

`CFunctionHook` can also be unhooked whenever you please. Just run `unhook()`. It can be rehooked later by calling `hook()` again.

### The three horsemen of function hooking

The first type of functions we have hooked above. It's a public non-member.

For public members, e.g. `CCompositor::focusWindow(CWindow*, wlr_surface*)` you will also need to add the thisptr argument to your hook:

```cpp
typedef void (*origFocusWindow)(void*, CWindow*, wlr_surface*);

void hkFocusWindow(void* thisptr, CWindow* pWindow, wlr_surface* pSurface) {
    // stuff...

    // and if you want to call the original...
    (*(origFocusWindow)g_pFocusWindowHook->m_pOriginal)(thisptr, pWindow, pSurface);
}

APICALL EXPORT PLUGIN_DESCRIPTION_INFO PLUGIN_INIT(HANDLE handle) {
    // stuff...

    g_pFocusWindowHook = HyprlandAPI::createFunctionHook(handle, (void*)&CCompositor::focusWindow, (void*)&hkFocusWindow);
    g_pFocusWindowHook->hook();

    // further stuff...
}
```

For private functions or members, you will need to use the signature, for example for `CInputManager::processMouseDownNormal`:
```cpp
typedef void (*origMouseDownNormal)(void*, wlr_pointer_button_event*);

void hkProcessMouseDownNormal(void* thisptr, wlr_pointer_button_event* e) {
    // stuff...

    // and if you want to call the original...
    (*(origMouseDownNormal)g_pMouseDownHook->m_pOriginal)(thisptr, e);
}

APICALL EXPORT PLUGIN_DESCRIPTION_INFO PLUGIN_INIT(HANDLE handle) {
    // stuff...
    
    g_pMouseDownHook = HyprlandAPI::createFunctionHook(
        PHANDLE, HyprlandAPI::getFunctionAddressFromSignature(PHANDLE, "_ZN13CInputManager22processMouseDownNormalEP24wlr_pointer_button_event"), (void*)&hkProcessMouseDownNormal);

    g_pMouseDownHook->hook();

    // further stuff...
}
```

To get the signature, compile Hyprland and run `objdump -D ./path/to/Hyprland | grep "functionName"`

When it finally spits out something, you can stop it with `ctrl+C`.

Example output:
```
  9710b9:       eb 01                   jmp    9710bc <_ZN13CInputManager22processMouseDownNormalEP24wlr_pointer_button_event+0xed8>
  9710c3:       74 37                   je     9710fc <_ZN13CInputManager22processMouseDownNormalEP24wlr_pointer_button_event+0xf18>
  9710fa:       eb 1f                   jmp    97111b <_ZN13CInputManager22processMouseDownNormalEP24wlr_pointer_button_event+0xf37>
  971128:       74 05                   je     97112f <_ZN13CInputManager22processMouseDownNormalEP24wlr_pointer_button_event+0xf4b>
```
From this, we can see the signature is `_ZN13CInputManager22processMouseDownNormalEP24wlr_pointer_button_event`.

{{< hint type=warning >}}
Please note signatures may and most likely will differ between compilers. (gcc/clang)
{{</ hint >}}

## Using the config
You can register config values in the `PLUGIN_INIT` function:

```cpp
APICALL EXPORT PLUGIN_DESCRIPTION_INFO PLUGIN_INIT(HANDLE handle) {
    // stuff...
    
    HyprlandAPI::addConfigValue(PHANDLE, "plugin:example:exampleInt", SConfigValue{.intValue = 1});

    // further stuff...
}
```

Plugin variables ***must*** be in the `plugins:` category. Further categories are up to you. It's generally
a good idea to group all variables from your plugin in a subcategory with the plugin name, e.g. `plugins:myPlugin:variable1`.

For retrieving the values, call `HyprlandAPI::getConfigValue`.

Please remember that the pointer to your config value will never change after `PLUGIN_INIT`, so to greatly optimize performance, make it static:
```cpp
static auto* const MYVAR      = &HyprlandAPI::getConfigValue(PHANDLE, "plugin:myPlugin:variable1")->intValue;
```

## Further
Read the API at `src/plugins/PluginAPI.hpp` and check out the examplePlugin in `examples/`.

And, most importantly, have fun!