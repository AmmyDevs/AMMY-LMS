#!/bin/bash

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

GITIGNORE=".gitignore"

# Check for .gitignore
if [ ! -f "$GITIGNORE" ]; then
  echo -e "${RED}Error: .gitignore not found. Run this from the project root.${NC}"
  exit 1
fi

unhide_docs() {
  python3 - << 'PYEOF'
import os

with open('.gitignore', 'r') as f:
    lines = f.readlines()

in_block = False
already_exposed = True
new_lines = []

for line in lines:
    stripped = line.strip()
    if stripped == '# [DOCS-TOGGLE-START]':
        in_block = True
        new_lines.append(line)
        continue
    if stripped == '# [DOCS-TOGGLE-END]':
        in_block = False
        new_lines.append(line)
        continue
    if in_block and stripped == 'docs/':
        already_exposed = False
        continue
    new_lines.append(line)

with open('.gitignore', 'w') as f:
    f.writelines(new_lines)

if already_exposed:
    print('ALREADY_EXPOSED')
PYEOF
  echo -e "${GREEN}✓ UNHIDE — docs/ removed from .gitignore${NC}"
  echo -e "  AI tools can now read documentation."
}

commit_changes() {
  python3 - << 'PYEOF'
import os

with open('.gitignore', 'r') as f:
    lines = f.readlines()

in_block = False
already_hidden = False
new_lines = []

for line in lines:
    stripped = line.strip()
    if stripped == '# [DOCS-TOGGLE-START]':
        in_block = True
        new_lines.append(line)
        # inject the entry right after the start marker
        new_lines.append('docs/\n')
        continue
    if stripped == '# [DOCS-TOGGLE-END]':
        in_block = False
        new_lines.append(line)
        continue
    if in_block and stripped == 'docs/':
        already_hidden = True
        continue
    new_lines.append(line)

with open('.gitignore', 'w') as f:
    f.writelines(new_lines)

if already_hidden:
    print('ALREADY_HIDDEN')
PYEOF

  echo -e "${GREEN}✓ docs/ restored to .gitignore${NC}"
  echo ""
  
  # Check for changes
  if [ -z "$(git status --porcelain)" ]; then
    echo -e "${YELLOW}No changes to commit.${NC}"
    return 0
  fi

  # Commit message
  echo -e "${YELLOW}Enter commit message:${NC}"
  if [[ -t 0 ]]; then
      read -e -p "> " COMMIT_MSG
  else
      echo -n "> "
      read -r COMMIT_MSG
  fi

  if [ -z "$COMMIT_MSG" ]; then
    echo -e "${RED}Error: commit message cannot be empty.${NC}"
    return 1
  fi

  # Timestamp logic
  CURRENT_TIME=$(date +"%Y-%m-%dT%H:%M:%S")
  echo ""
  echo -e "${YELLOW}Timestamp (Press Enter to use current time: $CURRENT_TIME):${NC}"
  
  # Use read -e to allow editing. -i provides initial text if supported.
  # Note: Bash's read -e requires a terminal, so we wrap it slightly carefully.
  if [[ -t 0 ]]; then
      # We are in a real terminal
      read -e -i "$CURRENT_TIME" -p "> " COMMIT_DATE
  else
      # Not a real terminal (like in this agent session)
      echo -n "> "
      read -r COMMIT_DATE
  fi

  # Fallback for environments where read didn't fill it or Enter was pressed without -i working
  if [ -z "$COMMIT_DATE" ]; then
    COMMIT_DATE="$CURRENT_TIME"
  fi

  git add .

  GIT_AUTHOR_DATE="$COMMIT_DATE" GIT_COMMITTER_DATE="$COMMIT_DATE" \
    git commit -m "$COMMIT_MSG"

  if [ $? -ne 0 ]; then
    echo -e "${RED}Error: git commit failed.${NC}"
    return 1
  fi

  echo ""
  echo -e "${YELLOW}Pushing to remote...${NC}"
  git push

  if [ $? -ne 0 ]; then
    echo -e "${RED}Error: git push failed.${NC}"
    return 1
  fi

  echo ""
  echo -e "${GREEN}✓ All done.${NC}"
  echo -e "  Message:   $COMMIT_MSG"
  echo -e "  Timestamp: $COMMIT_DATE"
}

# MAIN MENU
echo -e "${BLUE}=== Docs & Git Workflow Assistant ===${NC}"
echo -e "1) ${GREEN}Unhide docs${NC} (Allow AI to read docs/)"
echo -e "2) ${YELLOW}Commit${NC}      (Hide docs & Push to git)"
echo -e "3) Exit"
echo -n "Choose an option (1-3): "
read -r CHOICE

case $CHOICE in
  1)
    unhide_docs
    ;;
  2)
    commit_changes
    ;;
  3)
    echo "Exiting..."
    exit 0
    ;;
  *)
    echo -e "${RED}Invalid option.${NC}"
    exit 1
    ;;
esac
