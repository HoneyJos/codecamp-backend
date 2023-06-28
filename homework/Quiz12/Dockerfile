FROM node:16

COPY ./package.json /myproject/
COPY ./yarn.lock /myproject/
WORKDIR /myfolder/
RUN yarn install

COPY . /myfolder/

CMD yarn start:dev