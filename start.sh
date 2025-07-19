#!/bin/bash

echo "Starting MusicFlow - AI Music Recommendation System"
echo

echo "Starting Backend Server..."
cd backend
python app.py &
BACKEND_PID=$!
cd ..

echo
echo "Starting Frontend Server..."
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

echo
echo "Both servers are starting..."
echo "Backend will be available at: http://localhost:5000"
echo "Frontend will be available at: http://localhost:3000"
echo
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
trap "echo 'Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait 