FROM node:10.11

RUN echo 'alias ll="ls -lah"' >> ~/.bashrc

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn install
