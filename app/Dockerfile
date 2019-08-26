FROM node:latest

EXPOSE 8080

RUN mkdir /app
WORKDIR /app
COPY . /app/
RUN ["chmod", "+x", "/app/entrypoint.sh"]
ENTRYPOINT ["/app/entrypoint.sh"]

CMD if [ "$NODE_ENV" = "development" ]; \
  then yarn dev;  \
  else yarn start; \
  fi
