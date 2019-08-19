FROM node:latest

EXPOSE 8080

# COPY ./entrypoint.sh /entrypoint/
RUN mkdir /app
WORKDIR /app
COPY package.json /app/
RUN ["chmod", "+x", "entrypoint.sh"]
ENTRYPOINT ["entrypoint.sh"]

CMD ["yarn", "dev"]
