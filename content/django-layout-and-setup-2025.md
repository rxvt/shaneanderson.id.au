Title: How I Structure Django Projects for Better Maintainability 2025
Date: 2025-08-17 19:07
Category: General
Tags: python, django
Status: published
Summary: My Django layout and setup in 2025

When starting a new Django project I've found myself tweaking the default project structure to make it more maintainable and organized. Here's my preferred layout and the small adjustments needed to make it work.

The default Django layout works fine, but I prefer using a `src` directory to cleanly separate the Django application code from project configuration files (`pyproject.toml`, `README.md`, etc.).

## Why I Prefer This Structure

I make a few organizational changes that help keep larger projects maintainable:

1. **Rename the project directory to `config`** - This makes it immediately clear that this directory contains configuration rather than application logic
2. **Split settings and URLs into subdirectories** - `config/settings/` and `config/urls/` allow for clean environment-specific configurations (local, staging, production)
3. **Create a dedicated `apps` directory** - This keeps all your Django applications organized in one place, separate from configuration

## Required Configuration Changes

This structure requires a few small configuration changes to work properly:

### 1. Tell Django where your Settings module is

Django needs to know the new path to your settings file:

```bash
export DJANGO_SETTINGS_MODULE="config.settings.local"
```

### 2. Adjust BASE_DIR Path in your Settings Module

You'll need to add an additional `.parent` to the `BASE_DIR` statement in your `settings` module since the `config/settings` directory is now nested one level deeper:

```python
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent.parent
```

### 3. Add Apps Directory to Python Path

Finally, also in your `settings` module add the `apps` directory to your Python path so Django can find your applications:

```python
# Add apps directory to Python path
sys.path.insert(0, os.path.join(BASE_DIR, "apps"))
```

## Example Directory Structure

```
.
├── Justfile
├── pyproject.toml
├── README.md
├── src
│   └── scrm
│       ├── __init__.py
│       ├── apps
│       │   ├── __init__.py
│       │   ├── mycoolapp
│       │   │   ├── __init__.py
│       │   │   ├── admin.py
│       │   │   ├── apps.py
│       │   │   ├── migrations
│       │   │   ├── models.py
│       │   │   ├── templates
│       │   │   │   └── mycoolapp
│       │   │   │       ├── base.html
│       │   │   │       ├── news.html
│       │   │   │       ├── pagination_footer.html
│       │   │   ├── tests.py
│       │   │   ├── urls.py
│       │   │   └── views.py
│       ├── config
│       │   ├── __init__.py
│       │   ├── asgi.py
│       │   ├── settings
│       │   │   ├── __init__.py
│       │   │   ├── default.py
│       │   │   └── local.py
│       │   ├── urls
│       │   │   ├── __init__.py
│       │   │   ├── default.py
│       │   │   └── local.py
│       │   └── wsgi.py
│       ├── db.sqlite3
│       └── manage.py
└── uv.lock

```
