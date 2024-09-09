FROM quay.io/hermit/hermit-ser:latest

RUN git clone https://github.com/rudhachu/rudhra-3 /root/rudhra-3
WORKDIR /root/rudhra-3/
RUN yarn install --network-concurrency 1
CMD ["node", "index.js"]
