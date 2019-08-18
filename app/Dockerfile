FROM node:latest

COPY ./entrypoint.sh /entrypoint/

RUN ["chmod", "+x", "entrypoint/entrypoint.sh"]

WORKDIR /app

EXPOSE 8080

ENTRYPOINT ["/entrypoint/entrypoint.sh"]

CMD ["yarn", "dev"]
