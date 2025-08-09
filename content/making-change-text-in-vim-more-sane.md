Title: Making Change Text in Vim a bit more sane
Date: 2025-08-10 09:05
Category: TIL
Tags: vim
Status: published
Summary: I've been finding it super annoying that Change Text in Vim yanks the changed text to the default register, overwriting the text I had stored.

I've been finding it super annoying that Change Text in Vim yanks the changed text to the default register, overwriting the text I had stored. I 
wanted something more akin to how copy and paste works on Windows or MacOS where I can have some text stored in the buffer and write on top of the
existing text - so I asked [Claude.AI](https://anthropic.com/) and it gave me the following which works perfectly.

```lua
return {
  {
    "LazyVim",
    opts = function()
      -- Custom mappings for change command without affecting registers
      vim.keymap.set("n", "c", '"_c', { noremap = true, desc = "Change without yanking" })
      vim.keymap.set("n", "C", '"_C', { noremap = true, desc = "Change to end of line without yanking" })
      vim.keymap.set("n", "cc", '"_cc', { noremap = true, desc = "Change entire line without yanking" })
      vim.keymap.set("x", "c", '"_c', { noremap = true, desc = "Change selection without yanking" })

      -- Keep normal delete/cut behavior unchanged
      -- d, dd, D will still yank to registers as normal
    end,
  },
}
```
