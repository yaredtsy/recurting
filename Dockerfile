From node
WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@8.11.0
RUN npm install

COPY . .
CMD ["npm","run","start:dev"]