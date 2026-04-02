#!/bin/bash

set -e  # stop on any error

echo "--- Building project ---"

# ============================================================
# API
# ============================================================

echo ""
echo "--- Building API ---"

cd api

echo "Installing API dependencies..."
npm install

echo "Generating Prisma client..."
npx prisma generate

echo "Running database migrations..."
npx prisma migrate deploy

echo "Compiling TypeScript..."
npx tsc

echo "API build complete."

cd ..

# ============================================================
# FRONTEND
# ============================================================

echo ""
echo "--- Building frontend ---"

cd front

echo "Installing frontend dependencies..."
npm install

echo "Building frontend..."
npm run build

echo "Frontend build complete."

cd ..

echo ""
echo "--- Build complete ---"
