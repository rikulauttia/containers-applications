FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g nodemon

ENV NODE_ENV=development

EXPOSE 3000

CMD ["nodemon", "bin/www"]
