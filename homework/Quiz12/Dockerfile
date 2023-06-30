FROM node:16

COPY ./package.json /myproject/
COPY ./yarn.lock /myproject/
WORKDIR /myproject/
RUN yarn install

COPY . /myproject//

CMD yarn start:dev