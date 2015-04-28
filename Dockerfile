from ubuntu:14.04

maintainer Tom Cowling <tom.cowling@gmail.com>

run apt-get update -yqq
run apt-get install nodejs -yqq
run ln -svf /usr/bin/nodejs /usr/bin/node
run apt-get install npm -yqq

copy dist /dist

workdir /dist

run npm install --production

expose 3004

cmd node /dist/server.js | /dist/node_modules/bunyan/bin/bunyan