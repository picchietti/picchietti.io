FROM node:latest

# use bash instead of sh for all future commands
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Available to other docker containers
EXPOSE 80 443

# cwd for all subsequent commands
WORKDIR /usr/src/app/picchietti.io

RUN npm install nodemon -g
COPY picchietti.io/package.json .
RUN npm install

COPY cron_scripts/daily/daily-analytics /etc/cron.daily

# # gets lets encrypt certs and sets up autorenew
# RUN echo "deb http://deb.debian.org/debian jessie-backports main" >> /etc/apt/sources.list && \
# apt-get update && \
# apt-get -y -t jessie-backports install certbot && \
# certbot certonly --email=jonpicchietti@gmail.com --agree-tos --standalone -d picchietti.io --non-interactive
