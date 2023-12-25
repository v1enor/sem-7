# Use an official Node.js runtime as the base image
FROM node:21

# Set the working directory in the container
WORKDIR /app

# Copy the rest of the application code to the working directory
COPY . .

# Install dependencies
RUN npm instal

# Expose the port that the app will run on
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]