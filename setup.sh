#!/bin/bash

# Install Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 16


# Update and install required packages
sudo yum update -y
sudo amazon-linux-extras install postgresql11 -y
psql --version

#Install codedeploy agent
# sudo yum install ruby -y
# cd /home/ec2-user
# wget https://aws-codedeploy-us-east-1.s3.us-east-1.amazonaws.com/latest/install
# chmod +x ./install
# sudo ./install auto
# sudo service codedeploy-agent status
# sudo service codedeploy-agent start
# sudo service codedeploy-agent status
sleep 10
#install cloud watch agent
sudo yum install amazon-cloudwatch-agent -y 


sleep 10

#start cloudwatch agent
# sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl \
# -a fetch-config \
# -m ec2 \
# -c file:/home/ec2-user/webapp/config.json \
# -s

ls

pwd
ls
cd /home/ec2-user/
ls
npm install -g npm@9.5.1
npm install
npm uninstall bcrypt
npm install bcrypt