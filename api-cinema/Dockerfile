<<<<<<< HEAD
FROM node:16.14.0

WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .

RUN npm run build

EXPOSE 3000

=======
FROM node:16.14.0

WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .

RUN npm run build

EXPOSE 3000

>>>>>>> b09349382c0bc788ae1c686d6e1dec1d49448606
CMD ["npm", "run", "start:prod"]