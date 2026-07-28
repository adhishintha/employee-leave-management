#!/bin/bash

set -e

echo "====================================="
echo "Starting Deployment..."
echo "====================================="

PROJECT_DIR=/home/ubuntu/leave-management-system

cd $PROJECT_DIR

echo "Pulling latest code..."
git pull origin main

echo "Installing Python dependencies..."
cd backend
pip3 install -r requirements.txt

echo "Installing React dependencies..."
cd ../frontend
npm install

echo "Building React..."
npm run build

echo "Stopping old Flask application..."
pkill -f "python3 app.py" || true
pkill -f "gunicorn" || true

echo "Starting Flask application..."
cd ../backend

nohup gunicorn -w 4 -b 0.0.0.0:5000 app:app > app.log 2>&1 &

echo "Deployment Completed Successfully."