FROM node:26-alpine

WORKDIR /app

COPY ./package*.json ./

RUN npm ci

COPY . ./

EXPOSE 5173

ARG ENVIRONMENT
ENV ENVIRONMENT ${ENVIRONMENT}

CMD npm run prod