#!/bin/bash

# Change to the directory where the application code is stored
cd /home/ec2-user/webapp

touch .env

# Write new environment variables to .env file
echo "AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}" > .env
echo "AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}" >> .env
echo "AWS_REGION=${AWS_REGION}" >> .env
echo "RDS_USERNAME=${DB_USERNAME}" >> .env
echo "RDS_PASSWORD=${DB_PASSWORD}" >> .env
echo "RDS_HOST=${DB_HOST}" >> .env
echo "S3_BUCKET_NAME=${S3_BUCKET_NAME}" >> .env

npm install pm2 -g
pm2 start server.js

pm2 startup

sudo env PATH=$PATH:/home/ec2-user/.nvm/versions/node/v16.19.1/bin /home/ec2-user/.nvm/versions/node/v16.19.1/lib/node_modules/pm2/bin/pm2 startup systemd -u ec2-user --hp /home/ec2-user
pm2 save