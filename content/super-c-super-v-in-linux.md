Title: Use Super-C & Super-V on Linux to copy & paste like macOS
Date: 2025-11-07 09:59
Category: General
Tags: linux
Status: published
Summary: Omarchy enabled Super-C and Super-V for copy/paste, and swapping Super/Alt in Hyprland makes Linux clipboard behave like macOS.

I like Linux, but one long-standing annoyance on the desktop has been that copy and paste in the terminal requires Ctrl-Shift-C and Ctrl-Shift-V as Ctrl-C is reserved for canceling jobs. Recently Omarchy [implemented](https://github.com/basecamp/omarchy/releases/tag/v3.1.0) universal copy/paste using Super‑C and Super‑V, which fixes that annoyance, yay!

For those that are unaware the Super key is the “Windows” or “Command” key on most keyboards. Combining Super‑C / Super‑V with swapping Super and Alt in Hyprland makes copy and paste behave the like it does on macOS which resolves a small, but annoying workflow issue for me and allowing me to keep the same muscle memory across MacOS and Linux.

```
input{
  kb_options = altwin:swap_alt_win
}
```
