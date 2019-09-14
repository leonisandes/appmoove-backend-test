FROM node:10.15

COPY package*.json ./
RUN npm install
COPY . .

CMD [ "npm", "start" ]