#!/bin/bash

# Start docker compose
docker-compose up -d

# Open a new terminal window and start the backend server
osascript -e "tell app \"Terminal\" to do script \"cd ${PWD}/backend && node --env-file=.env --watch server.js\""

# Open another new terminal window and start the frontend server
osascript -e "tell app \"Terminal\" to do script \"cd ${PWD}/frontend && npm run dev\""