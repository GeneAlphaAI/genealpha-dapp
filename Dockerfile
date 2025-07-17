# Use the official Node.js 18 image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json  ./

# Remove node_modules and package-lock.json before installing dependencies
RUN rm -rf node_modules package-lock.json

# Install the dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the application for production
RUN yarn run build

# Expose the port the app runs on
EXPOSE 5180

# Start the application in preview mode on port 5173
#CMD ["npm", "run", "dev", "--", "--port", "5173"]
CMD ["yarn", "run", "preview", "--", "--port", "5180"]
