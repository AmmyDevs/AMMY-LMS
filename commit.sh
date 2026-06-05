#!/bin/bash

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# Main commit function
commit_changes() {
  echo -e "${BLUE}=== Git Commit & Push ===${NC}"
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
  
  if [[ -t 0 ]]; then
      read -e -i "$CURRENT_TIME" -p "> " COMMIT_DATE
  else
      echo -n "> "
      read -r COMMIT_DATE
  fi

  # Fallback if no input provided
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
  echo -e "${GREEN}✓ Commit successful.${NC}"
  echo -e "  Message:   $COMMIT_MSG"
  echo -e "  Timestamp: $COMMIT_DATE"
}

# Run commit
commit_changes
