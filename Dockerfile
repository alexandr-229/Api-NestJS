FROM node:19-alpine
WORKDIR /
ADD package.json package.json
RUN npm install --force
RUN docker-compose up -d
ADD . .
RUN npm run build
RUN npm prune --production --force
CMD [ "node", "./dist/main.js" ]