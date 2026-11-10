#!/usr/bin/env bash
set -euo pipefail

base_ref() {
  if [ -n "${BASE_REF:-}" ]; then
    printf '%s\n' "$BASE_REF"
    return
  fi

  local ref
  ref=$(git symbolic-ref --quiet --short refs/remotes/origin/HEAD 2>/dev/null || true)
  if [ -n "$ref" ]; then
    printf '%s\n' "${ref#origin/}"
    return
  fi

  printf 'main\n'
}

base_git_ref() {
  local base
  base=$(base_ref)
  if git rev-parse --verify --quiet "origin/$base" >/dev/null; then
    printf 'origin/%s\n' "$base"
  elif git rev-parse --verify --quiet "$base" >/dev/null; then
    printf '%s\n' "$base"
  else
    printf 'origin/main\n'
  fi
}

command=${1:-}
shift || true

case "$command" in
  pr-meta)
    number=${1:?PR number required}
    gh pr view "$number" --json number,title,state,isDraft,baseRefName,headRefName,body,comments
    ;;
  log)
    git log --oneline "$(base_git_ref)..HEAD"
    ;;
  files)
    git diff --name-status "$(base_git_ref)...HEAD"
    git status --porcelain | awk '$1 == "??" { print "??\t" substr($0, 4) }'
    ;;
  diff)
    git diff "$(base_git_ref)...HEAD"
    git diff
    git diff --cached
    while IFS= read -r file; do
      [ -f "$file" ] || continue
      git diff --no-index -- /dev/null "$file" || true
    done < <(git ls-files --others --exclude-standard)
    ;;
  pr-diff)
    number=${1:?PR number required}
    gh pr diff "$number"
    ;;
  *)
    echo "usage: $0 {pr-meta <pr>|log|files|diff|pr-diff <pr>}" >&2
    exit 2
    ;;
esac
