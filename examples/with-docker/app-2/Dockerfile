FROM node

RUN mkdir -p /opt/app
WORKDIR /opt/app

ENV PORT=8080

COPY package.json ./
RUN npm install --silent

COPY . ./

EXPOSE $PORT
ENTRYPOINT [ "npm" ]
CMD [ "start" ]
