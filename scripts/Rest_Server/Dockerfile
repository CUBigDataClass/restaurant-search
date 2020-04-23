FROM ubuntu:latest

RUN mkdir -p /app
WORKDIR /app
COPY startup_script.sh /app
COPY elasticRest.py /app
RUN chmod 777 startup_script.sh
RUN chmod 777 elasticRest.py
EXPOSE 5000
CMD ["sh", "startup_script.sh"]

