FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install
RUN npm install -g serve

COPY . /usr/src/app

RUN npm run build

EXPOSE 5000
CMD [ "serve", "-s", "build" ]
