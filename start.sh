#!/usr/bin/env bash
set -o errexit

exec gunicorn Backend.wsgi:application --bind 0.0.0.0:${PORT:-10000}