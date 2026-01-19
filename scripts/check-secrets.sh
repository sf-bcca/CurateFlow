#!/bin/sh

# Redirect output to stderr.
exec 1>&2

# List of patterns to check
# We search for common variable names indicating secrets
PATTERNS="(API_KEY|SECRET|TOKEN|PASSWORD|CREDENTIAL|PRIVATE_KEY|ACCESS_KEY)"

# Check staged changes for secrets
# git grep --cached searches the staged content.
# We exclude package-lock.json and yarn.lock as they might contain hashes that look like secrets but are safe.
# We also exclude this script itself.

if git grep -Eiq "$PATTERNS" --cached -- . ':!package-lock.json' ':!yarn.lock' ':!pnpm-lock.yaml' ':!scripts/check-secrets.sh'; then
    echo "=========================================================="
    echo " 🛑 SECURITY CHECK FAILED: Potential secrets detected! 🛑"
    echo "=========================================================="
    echo "The following lines in your staged files match secret patterns:"
    echo ""
    
    # Print the matching lines with line numbers
    git grep -Ein "$PATTERNS" --cached -- . ':!package-lock.json' ':!yarn.lock' ':!pnpm-lock.yaml' ':!scripts/check-secrets.sh'
    
    echo ""
    echo "If these are false positives, you can bypass this check with:"
    echo "  git commit --no-verify"
    echo "=========================================================="
    exit 1
fi

exit 0
