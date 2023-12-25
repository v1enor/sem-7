# Specify the base image
FROM node:21

# Set the working directory inside the container
WORKDIR /app

# Copy the rest of the application code to the working directory
COPY . .

# Install dependencies
RUN npm install

# Expose the port on which the application will run
EXPOSE 3001

# Start the application
CMD ["node", "server.js"]
