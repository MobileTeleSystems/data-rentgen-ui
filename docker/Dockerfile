FROM node:23.1.0 AS build

# set working directory
WORKDIR /app

COPY package*.json .
RUN npm ci

COPY . .
RUN npm run build


FROM nginx:stable AS prod

COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

COPY ./docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh


ARG API_URL=http://localhost:8000
ENV DATA_RENTGEN__UI__API_BROWSER_URL=${API_URL}

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 3000
