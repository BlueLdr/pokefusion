#!/bin/bash
# Run config check and build

set -e

this_script_dir="$(cd "$(dirname "$0")" && pwd)"
project_dir="${this_script_dir}/.."

cd "${project_dir}"

./scripts/config.sh ${1}

npm run build
