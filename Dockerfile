# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the contents of the "anysite" folder from your host machine to the container
COPY . /app

# Install application dependencies
RUN npm install

# Expose the port that your Node.js application will run on
EXPOSE 3000

# Start the Node.js application with "index.js"

CMD ["node", "index.js"]

# docker buildx build -t anysite .
# docker run -d -p 3000:3000 anysite