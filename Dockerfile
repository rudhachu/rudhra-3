FROM quay.io/hermit/hermit-ser:latest

RUN git clone https://github.com/rudhachu/rudhra-3 /root/rudhra
WORKDIR /root/rudhra/
RUN yarn install --network-concurrency 1
CMD ["node", "index.js"]
