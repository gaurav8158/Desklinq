FROM node:20-alpine 

# Set the working directory inside the container  
WORKDIR /app  

# Copy package.json and package-lock.json to the container  
COPY package*.json ./  

# Install dependencies  
RUN npm install  

# Copy the app source code to the container  
COPY . .  

# Development environment
#RUN npm run dev

# Build the Next.js app  
RUN npm run build  

# Expose the port the app will run on
EXPOSE 3000  

# Start the app  
CMD ["npm", "start"] 