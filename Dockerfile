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

# # gets lets encrypt certs and sets up autorenew
# RUN echo "deb http://deb.debian.org/debian jessie-backports main" >> /etc/apt/sources.list && \
# apt-get update && \
# apt-get -y -t jessie-backports install certbot && \
# certbot certonly --email=jonpicchietti@gmail.com --agree-tos --standalone -d picchietti.io --non-interactive
