FROM registry.access.redhat.com/ubi8/nodejs-20:latest

# Copy package.json and package-lock.json
COPY package*.json ./

# Install npm production packages
RUN npm shrinkwrap
RUN npm install --omit-dev

COPY . /opt/app-root/src

ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000

CMD ["npm", "start"]
