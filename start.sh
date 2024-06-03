#!/bin/sh

# Start the user app in the background
npm run start-user-app &

# Start the bank webhook in the background
npm run start-bank-webhook &

# Wait for all background jobs to finish
wait