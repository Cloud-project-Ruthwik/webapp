#!/bin/bash

# Install Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 16


# Update and install required packages
sudo yum update -y
sudo amazon-linux-extras install postgresql11 -y
psql --version

pwd
ls
cd /home/ec2-user/webapp
ls
npm install -g npm@9.5.1
npm install
npm uninstall bcrypt
npm install bcrypt