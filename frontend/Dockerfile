FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
COPY yarn.lock /usr/src/app/yarn.lock
RUN yarn install

COPY ./ /usr/src/app
RUN yarn build

RUN yarn global add serve

EXPOSE 3000

CMD serve -s build
