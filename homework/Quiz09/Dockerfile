FROM node:14

COPY ./package.json /yourbackend/
COPY ./yarn.lock /yourbackend/

WORKDIR /yourbackend/
RUN yarn install

COPY . /yourbackend/

CMD yarn start:dev