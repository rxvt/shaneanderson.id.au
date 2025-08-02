AUTHOR = "Shane Anderson"
SITENAME = "Shane Anderson"
SITEURL = ""

PATH = "content"

TIMEZONE = "Australia/Sydney"

DEFAULT_LANG = "en"

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = "feeds/all.atom.xml"
FEED_ALL_RSS = "feeds/all.rss.xml"
CATEGORY_FEED_ATOM = "feeds/{slug}.atom.xml"
CATEGORY_FEED_RSS = "feeds/{slug}.rss.xml"
TAG_FEED_ATOM = "feeds/tag-{slug}.atom.xml"
TAG_FEED_RSS = "feeds/tag-{slug}.rss.xml"
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = (
    ("Pelican", "https://getpelican.com/"),
    ("Python.org", "https://www.python.org/"),
    ("Jinja2", "https://palletsprojects.com/p/jinja/"),
    ("You can modify those links in your config file", "#"),
)

# Social widget
SOCIAL = (
    ("GITHUB", "https://github.com/rxvt"),
    ("LINKEDIN", "https://www.linkedin.com/in/shaneanderson3/"),
)

DEFAULT_PAGINATION = True

# Theme configuration
THEME = "themes/exapunks"

# Menu settings
DISPLAY_PAGES_ON_MENU = True
DISPLAY_CATEGORIES_ON_MENU = False

# Uncomment following line if you want document-relative URLs when developing
# RELATIVE_URLS = True

DEFAULT_METADATA = {
    "status": "draft",
}

CC_LICENSE = {"name": "Creative Commons Attribution", "version": "4.0", "slug": "by"}
ROBOTS = "index, follow"

# Markdown extensions
MARKDOWN = {
    'extension_configs': {
        'markdown.extensions.admonition': {},
        'markdown.extensions.codehilite': {'css_class': 'highlight'},
        'markdown.extensions.extra': {},
        'markdown.extensions.meta': {},
    },
    'output_format': 'html5',
}

# Static files configuration for GitHub Pages
STATIC_PATHS = ['extras']
EXTRA_PATH_METADATA = {'extras/CNAME': {'path': 'CNAME'}}
