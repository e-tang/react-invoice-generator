#!/bin/bash

file=$1

if [ -z "$file" ]; then
  echo "Usage: $0 <file>"
  exit 1
fi

curl --header "Content-Type: application/json" \
  --request POST \
  --data @$file \
    http://localhost:5173/api/geninvoice