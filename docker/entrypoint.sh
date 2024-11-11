#!/bin/env sh

# replace api url with one specified in env variable
sed s#http://localhost:8000#${DATA_RENTGEN__UI__API_BROWSER_URL}# -i /usr/share/nginx/html/assets/index*.js

# run original entrypoint
exec "$@"
