FROM ubuntu:latest

RUN mkdir -p /app
WORKDIR /app
COPY startup_script.sh /app/
COPY mongoconnector.json /app/
RUN chmod 777 /app/startup_script.sh
RUN chmod 777 /app/mongoconnector.json
CMD ["sh","startup_script.sh"]
