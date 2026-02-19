#!/bin/bash
set -e

echo "Running full validation suite..."

echo "1. Installing dependencies..."
pnpm install --frozen-lockfile

echo "2. Running lint..."
pnpm lint

echo "3. Running type check..."
pnpm type-check

echo "4. Running tests..."
pnpm test

echo "✅ All checks passed successfully!"
