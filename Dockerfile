FROM node:10.19.0
COPY . /app-preview-info-carousel
WORKDIR /app-preview-info-carousel
RUN npm install
CMD npm start
EXPOSE 3003

#
# sudo docker run --rm -it --network cassandra-net -p 3003:3003 90441f50938a (<- image id given when docker build is done)
