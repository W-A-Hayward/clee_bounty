#!/bin/bash

set -e  # stop on any error

# ============================================================
# check .env exists
# ============================================================

if [ ! -f api/.env ]; then
  echo "Error: api/.env not found. Copy api/.env.example and fill in the values."
  exit 1
fi

# ============================================================
# start api
# ============================================================

echo "--- Starting API ---"
cd api
node dist/server.js &
API_PID=$!
echo "API running on PID $API_PID"
cd ..

# ============================================================
# start frontend (dev only — in prod serve the dist folder)
# ============================================================

echo ""
echo "--- Starting frontend ---"
cd front
npm run preview &
FRONT_PID=$!
echo "Frontend running on PID $FRONT_PID"
cd ..

echo ""
echo "--- All services running ---"
echo "API:      http://localhost:4000"
echo "Frontend: http://localhost:4173"

# ============================================================
# graceful shutdown on ctrl+c
# ============================================================

trap "echo '--- Shutting down ---'; kill $API_PID $FRONT_PID; exit 0" SIGINT SIGTERM

# keep script alive
wait
