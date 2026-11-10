#!/usr/bin/env python3
"""Render an OpenCode command template for non-interactive use.

Expands $ARGUMENTS/$1..$9 and executes !`...` shell blocks, matching the
project command semantics closely enough for CI.
"""

from __future__ import annotations

import re
import subprocess
import sys
from pathlib import Path


def strip_frontmatter(text: str) -> str:
    if not text.startswith("---"):
        return text
    end = text.find("\n---", 3)
    if end == -1:
        return text
    return text[end + 4 :].lstrip("\n")


def expand_arguments(text: str, argument: str) -> str:
    text = text.replace("$ARGUMENTS", argument)
    for position in range(1, 10):
        text = text.replace(f"${position}", argument)
    return text


def expand_shell_blocks(text: str, cwd: Path) -> str:
    pattern = re.compile(r"!`([^`]*)`")

    def run(match: re.Match[str]) -> str:
        command = match.group(1)
        result = subprocess.run(
            command,
            shell=True,
            cwd=cwd,
            text=True,
            capture_output=True,
        )
        if result.returncode != 0:
            detail = result.stderr.strip() or result.stdout.strip()
            return f"[failed to collect context: {command}]\n{detail}"
        return result.stdout

    return pattern.sub(run, text)


def main() -> int:
    if len(sys.argv) < 2:
        print(f"usage: {sys.argv[0]} <command.md> [argument]", file=sys.stderr)
        return 2

    command_path = Path(sys.argv[1])
    argument = sys.argv[2] if len(sys.argv) > 2 else ""
    text = command_path.read_text(encoding="utf-8")
    text = strip_frontmatter(text)
    text = expand_arguments(text, argument)
    text = expand_shell_blocks(text, Path.cwd())
    sys.stdout.write(text)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
