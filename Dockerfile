FROM node:latest

ENV NPM_CONFIG_LOGLEVEL warn

WORKDIR /frontend

CMD if [ ${NODE_ENV} = production ]; \
  then \
  npm install; \
  npm run start:prod; \
  else \
  npm run start; \
  fi

EXPOSE 3000
