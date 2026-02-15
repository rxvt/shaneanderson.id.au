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

cat > "$filepath" <<EOF
Title: ${title}
Date: ${date}
Category: ${category}
Tags: ${tags}
Status: draft
Summary:

EOF

sed -i 's/^Summary:$/Summary: /' "$filepath"

echo "Created: $filepath"

# Open in editor with cursor on the Summary line
editor="${EDITOR:-vim}"
echo "Opening in ${editor}..."

if [[ "$editor" == "vim" || "$editor" == "nvim" ]]; then
    "$editor" '+call cursor(6, 999)' '+startinsert!' "$filepath"
else
    "$editor" "$filepath"
fi
