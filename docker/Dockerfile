# rollup module does not support arm64 for now.
# use amd64 for building .js and .css (which are platform agnostic),
# and then copy to platform-specific nginx image

FROM --platform=linux/amd64 node:26.8.1 AS build

WORKDIR /app

COPY package*.json .
RUN npm ci

COPY . .
RUN npm run build


FROM mikefarah/yq AS yq
FROM nginx AS prod

COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

COPY --chmod=0755 ./docker/entrypoint.sh /entrypoint.sh
COPY --from=yq --chmod=0755 /usr/bin/yq /usr/bin/yq

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 CMD ["curl", "-f", "http://localhost:3000/"]
