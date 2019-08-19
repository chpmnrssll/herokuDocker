FROM node:latest

WORKDIR /app

# COPY ./entrypoint.sh /entrypoint/
RUN ["cd", "/app"]
RUN ["chmod", "+x", "/app/entrypoint.sh"]

EXPOSE 8080

ENTRYPOINT ["/app/entrypoint.sh"]

CMD ["yarn", "dev"]
