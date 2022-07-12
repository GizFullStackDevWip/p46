#!/bin/bash
cd /home/ubuntu/outdoormax-ci-cd
sudo apt update && sudo apt install --assume-yes curl
curl --silent --location https://deb.nodesource.com/setup_14.x  | sudo bash -
sudo apt install --assume-yes nodejs 
npm install pm2 -g