# Use CentOS 7 as the base image
FROM centos:7

# Install necessary packages
RUN yum -y install epel-release && \
    yum -y install nginx git && \
    yum clean all

# Install Node.js and npm
RUN curl -sL https://rpm.nodesource.com/setup_14.x | bash - && \
    yum -y install nodejs && \
    yum clean all

# Install PM2 globally
RUN npm install -g pm2

# Clone the Node.js Express application from GitHub
RUN git clone https://github.com/jooapa/anysite.git /var/www/anysite

# Copy nginx.conf from the cloned repository
COPY /var/www/anysite/nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for Nginx
EXPOSE 80

# Set the working directory
WORKDIR /var/www/anysite

# Install the Node.js application's dependencies
RUN npm install

# Start the Node.js application using PM2
CMD ["pm2", "start", "index.js", "--name", "anysite"]
