#!/bin/bash

pkill -f gunicorn || true
pkill -f "python3 app.py" || true