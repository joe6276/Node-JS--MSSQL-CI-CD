FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 80

RUN chmod +x /app/start.sh

CMD [ "/app/start.sh" ]

# docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=Root@2024"
#  --name db  --network blogs -p 1433:1433 -d mcr.microsoft.com/mssql/server:2022-latest
# docker run  --name backend   --network blogs -p 80:80  ndambuki/blogsbackend