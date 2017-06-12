FROM node:latest

# Available to other docker containers
EXPOSE 80 443

# cwd for all subsequent commands
WORKDIR /usr/src/app

RUN npm install nodemon -g
COPY package.json .
RUN npm install --only=production

RUN apt-get update && apt-get install -y supervisor cron
RUN mkdir -p /var/run/cron /var/log/supervisor

COPY cron/daily/bin /etc/cron.daily/
RUN chmod 777 /etc/cron.daily/*
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
