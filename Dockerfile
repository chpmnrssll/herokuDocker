FROM node:latest

# copy app and install deps
WORKDIR /src
COPY . /src
RUN cd /src
RUN yarn install

# RUN mkdir /app
# WORKDIR /app
# COPY package.json /app/
# RUN npm install

CMD [ "yarn", "start" ]
