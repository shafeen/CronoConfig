# Notes

### Relevant libaries/packages
- BSON document library: [js-bson](https://www.npmjs.com/package/bson)
- Lightweight interface to run git commands: [Simple Git](https://www.npmjs.com/package/simple-git)
- Text diff-ing in javascript: [diff](https://www.npmjs.com/package/diff)

### Useful git commands
- List all commits that changes a specific file:
  ```bash
  git log --follow -- <filepath>
  ```
- Get short hash of changed commits:
  ```bash
  git log --oneline --follow <filepath> | awk '{print $1}'
  ```
- Show changes for a file in a commit:
  ```bash
  git show <sha> -- <filepath>
  ```
- Show the an entire file for a specific commit (not just the diffs):
  ```bash
  git show <sha>:<filepath>
  ```
- Show the entile file for a 1 commit before a specific commit:
  ```bash
  git show <sha>~1:<filepath>
  ```
