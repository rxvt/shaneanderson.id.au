# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Pelican-based static site generator for a personal blog with a cyberpunk/EXA-themed interface. The site features a terminal-style interface with animated elements and a retro-futuristic design aesthetic.

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
- `themes/exapunks/` - Custom cyberpunk-themed Pelican theme
  - `static/css/` - Stylesheets (main, animations, terminal)
  - `static/js/` - JavaScript functionality (terminal.js)
  - `templates/` - Jinja2 templates for all page types

### Theme Architecture

The site uses a custom Pelican theme (`themes/exapunks/`) featuring:

- Cyberpunk/EXA-inspired terminal interface design
- Interactive terminal with file system navigation
- Animated visual effects (scanlines, data streams, circuit borders)
- Responsive layout with sidebar navigation
- Modular CSS structure (main.css, animations.css, terminal.css)
- JavaScript-powered terminal functionality

### Build System

Uses Pelican static site generator with:

- Makefile for traditional make commands
- Live-reload support via livereload library
- Production deployments via pushing `main` branch to remote

## Content Development

### Writing Posts

- Create Markdown files in `content/` directory
- Use Pelican metadata format (Title, Date, Category)
- Articles appear in the themed terminal interface automatically

### Theme Customization

- Modular CSS structure in `themes/exapunks/static/css/`
- Interactive terminal functionality in `themes/exapunks/static/js/terminal.js`
- Jinja2 templates support all Pelican content types
- Terminal displays actual site content and supports navigation commands
