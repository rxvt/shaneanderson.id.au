#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 2 ]]; then
    echo "Usage: ./add-image.sh <image-file> <post-markdown-file>" >&2
    echo "Example: ./add-image.sh ~/screenshots/demo.png content/my-new-post.md" >&2
    exit 1
fi

image_file="$1"
post_file="$2"

if [[ ! -f "$image_file" ]]; then
    echo "Error: image file not found: $image_file" >&2
    exit 1
fi

if [[ ! -f "$post_file" ]]; then
    echo "Error: post file not found: $post_file" >&2
    exit 1
fi

if ! command -v magick &>/dev/null; then
    echo "Error: ImageMagick (magick) is not installed." >&2
    echo "Install with: sudo pacman -S imagemagick" >&2
    exit 1
fi

slug="$(basename "$post_file" .md)"
orig_name="$(basename "$image_file")"
webp_name="${orig_name%.*}.webp"
out_dir="content/images/$slug"

read -p "Alt text [Screenshot]: " alt_text
alt_text="${alt_text:-Screenshot}"

mkdir -p "$out_dir"

magick "$image_file" -resize '1400x>' -quality 82 "$out_dir/$webp_name"

orig_size=$(stat --printf='%s' "$image_file")
new_size=$(stat --printf='%s' "$out_dir/$webp_name")
orig_kb=$(( orig_size / 1024 ))
new_kb=$(( new_size / 1024 ))

echo "Created: $out_dir/$webp_name (${new_kb} KB, was ${orig_kb} KB)"
echo "Markdown: ![${alt_text}]({static}/images/$slug/$webp_name)"
