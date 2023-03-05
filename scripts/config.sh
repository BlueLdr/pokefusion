#!/bin/bash
# Ensure all required env vars are present

set -e

env_file=./.env.${NODE_ENV:-local}
if [[ -f "${env_file}" ]]; then
    source "${env_file}"
fi

declare -a required_vars=(
    "POKEFUSION_UI_API_URL"
)

error=false

for name in "${required_vars[@]}"
do
    if [ -z "${!name}" ]; then
      echo "Missing required environment variable '${name}'"
      error=true
    fi
done


if [[ $error == true ]]; then
    >&2 echo -e "\033[0;31mERROR: Missing one or more required environment variables\033[0m\\n"
    exit 1
fi
