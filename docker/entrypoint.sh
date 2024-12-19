#!/bin/sh

# replace api url with one specified in env variable
sed s#http://localhost:8000#${DATA_RENTGEN__UI__API_BROWSER_URL}# -i /usr/share/nginx/html/assets/index*.js
# replace authProvider with specified in env variable
sed s#dummyAuthProvider#${DATA_RENTGEN__UI__AUTH_PROVIDER}# -i /usr/share/nginx/html/assets/index*.js

# run original entrypoint
exec "$@"
