FROM node:latest

EXPOSE 8080

# COPY ./entrypoint.sh /entrypoint/
RUN mkdir /app
WORKDIR /app
COPY package.json /app/
RUN ["chmod", "+x", "/app/entrypoint.sh"]
ENTRYPOINT ["/app/entrypoint.sh"]

CMD ["yarn", "dev"]
