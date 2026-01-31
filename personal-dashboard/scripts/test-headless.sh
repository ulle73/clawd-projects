#!/bin/bash

echo "Running headless checks..."

# Check if required files exist
FILES=("index.html" "package.json" "src/main.jsx" "src/App.jsx" "src/data/recipes.json")

for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "✓ $file exists"
  else
    echo "✗ $file MISSING"
    exit 1
  fi
done

# Basic syntax check for JS/JSX files using node if possible, or just grep
echo "Verifying React entry point..."
if grep -q "ReactDOM.createRoot" src/main.jsx; then
  echo "✓ src/main.jsx looks valid"
else
  echo "✗ src/main.jsx invalid"
  exit 1
fi

echo "All basic checks passed!"
exit 0
