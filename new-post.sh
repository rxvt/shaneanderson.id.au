#!/usr/bin/env bash
set -euo pipefail

# Prompt for title
read -p "Title: " title

if [[ -z "$title" ]]; then
  echo "Error: title cannot be empty" >&2
  exit 1
fi

# Generate slug from title
slug="$(echo "$title" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | sed 's/[^a-z0-9-]//g' | sed 's/--*/-/g' | sed 's/^-//;s/-$//')"

# Auto-fill date
date="$(date '+%Y-%m-%d %H:%M')"

# Prompt for category and tags
read -p "Category [General]: " category
category="${category:-General}"

read -p "Tags [misc]: " tags
tags="${tags:-misc}"

# Create the file
filepath="content/${slug}.md"

if [[ -f "$filepath" ]]; then
  echo "Error: file already exists: $filepath" >&2
  exit 1
fi

printf 'Title: %s\n' "$title" > "$filepath"
printf 'Date: %s\n' "$date" >> "$filepath"
printf 'Category: %s\n' "$category" >> "$filepath"
printf 'Tags: %s\n' "$tags" >> "$filepath"
printf 'Status: draft\n' >> "$filepath"
printf 'Summary: \n' >> "$filepath"
printf '\n' >> "$filepath"

echo "Created: $filepath"

# Open in editor with cursor on the Summary line
editor="${EDITOR:-vim}"
echo "Opening in ${editor}..."

checksum="$(md5sum "$filepath")"

if [[ "$editor" == "vim" || "$editor" == "nvim" ]]; then
  "$editor" '+call cursor(6, 999)' '+startinsert!' "$filepath"
else
  "$editor" "$filepath"
fi

# Remove the file if it was not modified
if [[ "$(md5sum "$filepath")" == "$checksum" ]]; then
  rm "$filepath"
  echo "No changes saved, removed $filepath"
fi
