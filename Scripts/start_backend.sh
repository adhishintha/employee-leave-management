#!/bin/bash

cd /home/ubuntu/leave-management-system/backend

nohup gunicorn -w 4 -b 0.0.0.0:5000 app:app > app.log 2>&1 &