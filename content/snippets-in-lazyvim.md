Title: How to create snippets in LazyVim
Date: 2025-08-02 18:53
Category: TIL
Tags: vim
Status: published
Summary: It wasn't obvious to me how to create snippets in LazyVim so documenting it here.

Took me way too much effort to figure this out and searching for info resulted in a lot of posts with  other people asking the same question or outdated information as LazyVim has changed its plugins a bunch of times, hopefully this helps someone else out there.

This example will use the template I'm using for my blog posts and is compatible with the [Blink](https://github.com/saghen/blink.cmp) plugin that LazyVim is using for completions (under [Extras](https://www.lazyvim.org/extras/coding/blink)) in 2025.

```bash
mkdir ~/.config/nvim/snippets
touch ~/.config/nvim/snippets/markdown.json
```

```json
{
  "pelican-post": {
    "prefix": "post",
    "body": [
      "Title: ${1:Post Title}",
      "Date: $CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE $CURRENT_HOUR:$CURRENT_MINUTE",
      "Category: ${2:General, Projects}",
      "Tags: ${3:aws, python, vim}",
      "Status: ${4:draft, published, hidden, skip}",
      "Summary: ${5:Brief description}",
      "",
      "$0"
    ],
    "description": "Pelican blog post"
  }
}
```

Now you should be able to open up a Markdown file, type `post<Tab>` and have the snippet appear. You should be able to tab through the fields too.
