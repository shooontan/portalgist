FROM node:10.11

RUN echo 'alias ll="ls -lah"' >> ~/.bashrc

WORKDIR /app

COPY package.json yarn.lock /app/

RUN \
  curl -o- -L https://yarnpkg.com/install.sh | bash \
  && export PATH="$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH" \
  && yarn install
