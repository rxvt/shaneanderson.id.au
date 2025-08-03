# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Pelican-based static site generator for a personal blog with a plain theme focused on content and readability.

## Build and Development Commands

After you update any html or css you need to run `make html` to regenerate the output files.

### Development Server

- `make serve` - Build and serve site at <http://localhost:8000>
- `make devserver` - Start development server with auto-regeneration

### Building

- `make html` - Build the site to output/ directory
- `make clean && make html` - Clean build (delete output first)
- `make publish` - Build using production settings

### Utility Commands

- `make clean` - Remove generated files from output/
- `make regenerate` - Auto-regenerate on file changes

## Architecture and Structure

### Core Files

- `pelicanconf.py` - Main Pelican configuration (development settings)
- `publishconf.py` - Production configuration overrides
- `tasks.py` - Invoke-based task runner with build/serve commands
- `Makefile` - GNU Make equivalent of tasks.py commands

### Content Structure

- `content/` - Markdown blog posts and pages
- `output/` - Generated static site files
- `themes/plain-theme-2025/` - Custom clean Pelican theme
  - `static/css/` - Stylesheets (main.css, pygments.css)
  - `static/js/` - JavaScript directory (currently empty)
  - `templates/` - Jinja2 templates for all page types

### Theme Architecture

The site uses a custom Pelican theme (`themes/plain-theme-2025/`) featuring:

- Clean, content-focused design emphasizing readability
- Responsive layout optimized for blog content
- Clickable categories and tags for easy navigation
- Consistent post-summary layouts across index, category, and tag pages
- Simple CSS structure with main.css and syntax highlighting via pygments.css

### Build System

Uses Pelican static site generator with:

- Makefile for traditional make commands
- Live-reload support via livereload library
- Production deployments via pushing `main` branch to remote

## Content Development

### Writing Posts

- Create Markdown files in `content/` directory
- Use Pelican metadata format with required fields:
  - `Title:` - Article title
  - `Date:` - Publication date (YYYY-MM-DD HH:MM format)
  - `Category:` - Article category (clickable navigation)
  - `Tags:` - Comma-separated tags (clickable navigation)
  - `Status:` - `published` or `draft`
  - `Summary:` - Article excerpt for index/category/tag pages
- Articles appear automatically on the index page and relevant category/tag pages

### Navigation Features

The theme includes enhanced navigation functionality:

- **Clickable Categories**: Category labels on index and article pages link to category pages showing all articles in that category
- **Clickable Tags**: Tag labels on index and article pages link to tag pages showing all articles with that tag  
- **Tags on Index**: Tags are displayed alongside categories in the post metadata on the main index page
- **Consistent Layouts**: Category pages and tag pages use the same post-summary layout as the index page, showing article titles, dates, categories, tags, and summaries

### Theme Customization

- Jinja2 templates support all Pelican content types
- CSS styling preserves appearance when categories/tags are converted to clickable links
- All templates use consistent post-summary structure for unified presentation
