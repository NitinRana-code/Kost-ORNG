FROM node:lts-alpine3.18
WORKDIR /kost
COPY . /kost/

RUN npm install
CMD ["npm", "run", "dev"]