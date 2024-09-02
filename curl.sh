#!/bin/bash

# This script sends a POST request to the geninvoice endpoint
# of the Invoice API. It sends the contents of a file as the
# body of the request. The file should contain a JSON object
# with the invoice details.
# Usage: ./curl.sh <file>
# Example: ./curl.sh examples/invoice1.json
file=$1

if [ -z "$file" ]; then
  echo "Usage: $0 <file>"
  exit 1
fi

curl --header "Content-Type: application/json" \
  --request POST \
  --data @$file \
    http://localhost:5173/api/geninvoice