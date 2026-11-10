#!/usr/bin/env python3
"""Extract the final assistant text from `opencode run --format json` output."""

from __future__ import annotations

import json
import sys


def main() -> int:
    last_message: str | None = None
    chunks: list[str] = []

    for line in sys.stdin:
        line = line.strip()
        if not line:
            continue
        try:
            event = json.loads(line)
        except json.JSONDecodeError:
            continue
        if event.get("type") != "text":
            continue

        part = event.get("part", {})
        message_id = part.get("messageID") or event.get("messageID")
        if message_id != last_message:
            last_message = message_id
            chunks = []
        chunks.append(part.get("text", ""))

    sys.stdout.write("".join(chunks))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
