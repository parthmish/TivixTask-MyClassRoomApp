# Use an official node runtime as a parent image
FROM node:8

WORKDIR /TivixTask-MyClassRoomApp/

# Install dependencies
COPY package.json package-lock.json /TivixTask-MyClassRoomApp/

RUN npm install

# Add rest of the client code
COPY . /TivixTask-MyClassRoomApp/

EXPOSE 3000

CMD npm start