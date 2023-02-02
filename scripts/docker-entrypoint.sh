#!/bin/bash


if [[ -z "$SERVE" ]]; then
  # Fetch the docker env's from the container
  # These were string replacements in the build process so we could easily replace them in the output files
  rm -rf /app/dist/*
  cp -r /app/build/* /app/dist/
  while IFS= read -r line; do
    # Get the ENV key
    KEY=$(echo "$line" | cut -d= -f1)
    # Get the docker value that has been inserted temporarily
    DOCKER_VAL=$(echo "$line" | cut -d= -f2)
    # Replace the DOCKER_VAL with the supplied value in the ENV key set by ${!KEY}
    # ## ${!KEY} expands the value in $KEY and pulls the environment variable defined by the _value_ of $KEY
    grep -ElRZ "${DOCKER_VAL}" /app/dist | xargs -0 sed -i -e "s~${DOCKER_VAL}~${!KEY}~g"
  done < .env

else
  # Run this in development mode
  npm run serve
fi
