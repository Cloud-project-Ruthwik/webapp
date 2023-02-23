#!/bin/bash

# Install Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 16

#!/bin/bash
#!/bin/bash
#!/bin/bash

# Update and install required packages
sudo yum update -y
sudo yum install -y postgresql postgresql-server postgresql-devel postgresql-contrib

# Initialize the database
sudo postgresql-setup initdb

# Start the PostgreSQL service and enable it at boot time
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Modify the pg_hba.conf file to allow access from all IP addresses
sudo sed -i "s/host    all             all             127.0.0.1\/32            ident/host    all             all             0.0.0.0\/0            md5/" /var/lib/pgsql/data/pg_hba.conf

# Modify the postgresql.conf file to listen on all network interfaces
sudo sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/g" /var/lib/pgsql/data/postgresql.conf

# Restart the PostgreSQL service to apply the changes
sudo systemctl restart postgresql

sudo -u postgres psql -c "SELECT rolname, rolpassword FROM pg_authid WHERE rolname='postgres';"
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD 'test';"
sudo systemctl restart postgresql
pwd
ls
cd /home/ec2-user/webapp
ls
npm install -g npm@9.5.1
npm install