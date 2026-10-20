---
name: token-saver
description: Use on every coding task in the BetterMarawi.org repo to keep context and token use low. Covers how to search, read, edit, run commands, and report with minimal output. Never skip verification to save tokens.
---

# Token Saver

Goal: finish the task correctly using the least context. Saving tokens never means skipping checks.

## Before reading

1. Search first, then read. Use grep, rg, or file search to find the exact file and lines. Do not open whole folders or large files "to understand".
2. Read only the line ranges you need, not entire files.
3. Do not re-read a file you just read or wrote, unless it changed.
4. Read `docs/*.md` only when the task touches that topic. Never load all docs.
5. Never open or search `node_modules`, `.next`, `.git`, `package-lock.json`, build output, or images.
6. Do not open `src/data/barangays.ts` (96 entries, large) unless the task is about barangay data.

## While working

7. Make a short plan (under 8 lines), then act. Skip long reasoning for simple edits.
8. Edit existing files in place with targeted replacements. Never re-create or rewrite a whole file for a small change. This also protects the owner's manual edits.
9. Batch related edits and commands instead of many tiny steps.
10. Reuse existing components, tokens, and helpers before writing new ones.
11. Do not add a dependency for something a few lines can do.

## Running commands

12. Use quiet output and trim long logs: pipe through `tail -n 40` or `head -n 40`.
13. Run `typecheck` and `lint` first, and `build` once at the end, not after every edit.
14. On errors, read the first error and fix it. Do not paste the full log back.
15. Start the dev server once and reuse it. Run `rm -rf .next` only if the cache is stale.
16. Use git summaries: `git status --short`, `git diff --stat`, and `git diff <file>` for specific files only.

## Reporting

17. Final summary under 15 lines: what changed, files touched, verification results, and anything left alone or not done.
18. Do not repeat the task, print whole files, or paste large diffs.
19. Ask one short question only when blocked. Otherwise state the assumption and continue.

## Long sessions

20. After a big task is committed, suggest a fresh session with a 5-line handoff: branch, last commit, what is done, what is next.
21. Keep work task-scoped. Do not pull unrelated areas into context.