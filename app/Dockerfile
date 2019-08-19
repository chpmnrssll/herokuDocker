FROM node:latest

WORKDIR /app

# COPY ./entrypoint.sh /entrypoint/

RUN ["chmod", "+x", "entrypoint.sh"]

EXPOSE 8080

ENTRYPOINT ["entrypoint.sh"]

CMD ["yarn", "dev"]
