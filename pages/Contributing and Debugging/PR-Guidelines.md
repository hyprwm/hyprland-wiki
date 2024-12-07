---
title: PR Guidelines
---

## PR Requirements

- Clean, not hacky code
- Described changes and _why_ they were there
- Following the style (see below)

## Code Style

Please read this if you are submitting a PR, in order to minimize the amount of style nits received, and save
the time for the maintainers.

### Before you submit

Make sure you ran clang-format: `clang-format -i src/**/*{cpp,hpp}`

Check if your changes don't violate `clang-tidy`. Usually this is built into your IDE.

### Clang-format

This is non-negotiable. Your code **must** be formatted.

### Clang-tidy

Clang-tidy violations are not hard requirements, but please try to minimize them, and
_only_ ignore them if it's absolutely necessary.

I've tweaked it so that in 99% of cases you absolutely should fix it.

### Other

Some stuff clang-tidy / clang-format won't catch:
- No uninitialized _primitives_ (int, float, double, size_t, etc.)
- No short ifs. if your if/else body contains 1 _line_ (not 1 statement) do not put `{}` around it.
- The above rule does not apply to loops / etc
- Consider adding a `;` inside of empty function bodies
- Use utilities. Do not invent new types where one already exists.
- Consider the usage of the STL
- Minimize manual memory management to an absolute minimum. You have tons of tools at your disposal to do so
- Whenever you're initializing vectors arrays or maps with a lot of elements, add a `,` after the last element to make the styling nicer