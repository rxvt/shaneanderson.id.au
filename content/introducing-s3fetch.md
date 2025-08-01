Title: Introducing S3Fetch
Date: 2021-01-28 19:00
Category: Projects
Tags: aws, python
Status: published
Summary: Introducing [S3Fetch](https://github.com/rxvt/s3fetch) a new  simple & fast multi-threaded S3 download tool.

## Why S3Fetch?

If you've ever tried to download a large number of objects from S3 using the AWS CLI, you've probably noticed it can be painfully slow. The AWS CLI's `aws s3 sync` or `aws s3 cp --recursive` commands process objects sequentially and don't start downloading until the complete object listing is finished.

S3Fetch solves this by:

- **Concurrent operations**: Lists objects and downloads files simultaneously in separate threads
- **Immediate downloads**: Starts downloading the first object as soon as it's discovered, while still listing remaining objects
- **Optimized for prefixes**: Only requests objects under your specified prefix, reducing API calls
- **Configurable threading**: Tune performance with adjustable thread counts

## How It Works

The basic idea is pretty simple: why wait around?

Most tools (like AWS CLI) do this:

1. Ask S3 for a list of ALL your files
2. Wait... and wait... for the complete list
3. Finally start downloading files one by one

S3Fetch does this instead:

1. Start asking S3 for your file list in one thread
2. As soon as S3 mentions the first file, start downloading it in another thread
3. Keep downloading files in multiple threads while the first thread is still getting the rest of the list

So if you're downloading 1,000 files, S3Fetch is already downloading file #1 (and #2, #3, etc.) in separate threads while the main thread is still figuring out what files #500-1000 even are.

That's basically it - just use separate threads so you don't wait around when you don't have to.

### Performance Comparison

For downloading 428 objects from a bucket with 12+ million objects:

- **AWS CLI**: ~2-3 minutes (sequential listing + downloading)
- **S3Fetch (8 threads)**: 29 seconds
- **S3Fetch (100 threads)**: 8 seconds

S3Fetch is Open Source, written in Python and you can read more detailed
instructions and information, raise issues or contribute if that takes your
fancy via the [GitHub repo](https://github.com/rxvt/s3fetch).

You can also use the comment section below if you just want to chat about S3Fetch
or ask questions.

## Installation

Quick and easy install from PyPi. I recommend installation using [pipx](https://pypi.org/project/pipx/):

```text
pipx install s3fetch
```

You can also install using `pip`:

```text
pip install s3fetch
```

## Usage

Basic usage is simple:

```text
s3fetch s3://bucket/prefix
```

### Common Examples

**Download logs from a specific date:**

```text
s3fetch s3://my-logs-bucket/application-logs/2021-01-28
```

**Download all files in a subdirectory:**

```text
s3fetch s3://my-data-bucket/user-uploads/images/
```

**Download with custom thread count for better performance:**

```text
s3fetch s3://large-bucket/big-dataset/ --threads 50
```

**Download to a specific local directory:**

```text
s3fetch s3://my-bucket/data/ --output-dir ./downloads/
```

### When to Use S3Fetch

- **Large file counts**: Downloading hundreds or thousands of files
- **Deep prefixes**: When your files are buried deep in a bucket with millions
  of objects
- **Bandwidth optimization**: Making full use of your connection with parallel
  downloads

### Command Options

- `--threads N`: Number of download threads (default: CPU cores)
- `--output-dir PATH`: Download to specific directory (default: current
  directory)
- `--dry-run`: Show what would be downloaded without actually downloading

You can find more detailed instructions in the
[README](https://github.com/rxvt/s3fetch).

## Benchmarks

Downloading 428 objects under the `fake-prod-data/2020-10-17` prefix from a
bucket containing a total of 12,204,097 objects.

### With 100 threads

```text
s3fetch s3://fake-test-bucket/fake-prod-data/2020-10-17  --threads 100

8.259 seconds
```

### With 8 threads

```text
s3fetch s3://fake-test-bucket/fake-prod-data/2020-10-17  --threads 8

29.140 seconds
```
