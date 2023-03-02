#!/bin/bash

# Install Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 16


# Update and install required packages
sudo yum update -y
sudo amazon-linux-extras install postgresql11 -y
psql --version

echo 'export AWS_ACCESS_KEY_ID="AKIA3DSMITPOHNG76FPS"' >> ~/.bash_profile
echo 'export AWS_SECRET_ACCESS_KEY="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"' >> ~/.bash_profile
echo 'export AWS_REGION="us-east-1"' >> ~/.bash_profile
echo 'export DB_USERNAME="csye6225"' >> ~/.bash_profile
echo 'export DB_PASSWORD="csye6225"' >> ~/.bash_profile
echo 'export DB_HOST="csye6225.ch9yy1xvcvin.us-east-1.rds.amazonaws.com"' >> ~/.bash_profile
echo 'export S3_BUCKET_NAME="img9141"' >> ~/.bash_profile
source ~/.bash_profile

pwd
ls
cd /home/ec2-user/webapp
ls
npm install -g npm@9.5.1
npm install
npm uninstall bcrypt
npm install bcrypt