FROM node:latest

# use bash instead of sh for all future commands
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

EXPOSE 80

RUN mkdir -p /var/www/release && \
  ln -s /var/www/release/ /home/sysadminjon

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY picchietti.io/package.json /usr/src/app/
RUN npm install nodemon -g
RUN npm install

COPY picchietti.io /usr/src/app
COPY cron_scripts/picchietti.io/daily/daily-analytics.sh /etc/cron.daily

# # gets lets encrypt certs and sets up autorenew
# RUN echo "deb http://deb.debian.org/debian jessie-backports main" >> /etc/apt/sources.list && \
# apt-get update && \
# apt-get -y -t jessie-backports install certbot && \
# certbot certonly --email=jonpicchietti@gmail.com --agree-tos --standalone -d picchietti.io --non-interactive

CMD [ "npm", "start" ]
