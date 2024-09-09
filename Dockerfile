FROM quay.io/princerudh/rudhra:latest

RUN git clone https://github.com/rudhachu/rudhra-3 /root/bot
WORKDIR /root/bot/
RUN yarn install --network-concurrency 1
CMD ["npm", "start"]
