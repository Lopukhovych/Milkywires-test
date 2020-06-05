FROM node:lts

RUN mkdir -p /app/
WORKDIR /app

COPY ./package*.json ./
RUN npm ci

COPY . .
RUN chown -R node:node /app
USER node

CMD ["/bin/bash", "start.sh"]
