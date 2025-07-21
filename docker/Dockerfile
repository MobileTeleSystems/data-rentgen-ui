# rollup module does not support arm64 for now.
# use amd64 for building .js and .css (which are platform agnostic),
# and then copy to platform-specific nginx image

FROM --platform=linux/amd64 node:24.4.1 AS build

WORKDIR /app

COPY package*.json .
RUN npm ci

COPY . .
RUN npm run build


FROM nginx:stable-alpine AS prod

COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

COPY ./docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh


ARG API_URL=http://localhost:8000
ARG AUTH_PROVIDER=dummyAuthProvider
ENV DATA_RENTGEN__UI__API_BROWSER_URL=${API_URL}
ENV DATA_RENTGEN__UI__AUTH_PROVIDER=${AUTH_PROVIDER}

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 CMD ["curl", "-f", "http://localhost:3000/"]
