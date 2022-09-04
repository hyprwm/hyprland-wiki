## PR Requirements

- Clean, not hacky code
- Described changes and *why* they were there
- Following the style (see below)

## Code Style

Hyprland's code style:
```cpp
void myFunction(int arg) {

    if (shortStatement)
        doSomething();
    else
        doNotDoIt();

    switch (value) {
        case 1:
        { // braces optional
            blahBlah();
            break;
        }
        default:
            Debug::log(ERR, "error");
            break;
    }

    const auto CONSTVALUE = arg == 1 ? 2 : 3;

    void* pLocalPointer = nullptr;

    int localValue = 0;

    if (MY && VERY && LONG && IF && STATEMENT && OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO && SUPERLONG && STATEMENT) {
        ; // blank
    }
}

class myClass {
public:
    int         m_iMyLocalInt = 0;
    //          ^ member
    //            ^ int
    //              ^ camel name

    void        classFunction(int, int, bool defaultBool = false);
    //                          ^ most arg names omitted
    //                                          ^ arg name mandatory here because C++

    //          Note: omitting args only for functions with clear / few args. For long functions:
    void        classFunctionLong(int a, int b, bool sure, bool red, bool enabled, void* item, const CColor& color = {0});
}
```

## Some code FAQ

> Why is the config variable getting so weird?

Every variable from the config needs to be found in a hashmap. To limit the amount of hashmap searches, getting a config option looks like this:
```cpp
static auto *const PFOLLOWMOUSE = &g_pConfigManager->getConfigValuePtr("input:follow_mouse")->intValue;
```
Since the hashmap *cannot* be mutated during runtime, this pointer will always be valid, and will not require hashmap lookups every single time it's read.