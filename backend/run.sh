#!/bin/bash
set -e
pip install -r /src/requirements.txt
cd /src &&  gunicorn -b 0.0.0.0:8000 app
