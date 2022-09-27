# SA-JIRA
 A slight take away from the actual JIRA software

## Tech used

The following are the technologies used:

- node.js 
- express.js
- react.js
- mongoDB
- pm2


## REST APIs

- ```/tickets``` supports CRUD of tickets
- ```/users``` supports CRUD of users

## UI Features
- Creation of a ticket
- View of all tickets
- Filtering of tickets by Assinee or Status

## Installation

The application has been containerised

Please run the below commands to start the containers:

```sh
docker-compose up -d
docker-compose logs
```

#### To start the server individually

```sh
npm run start
or
npm run prod
```
This would start the server in 4000 port.

#### To start the client individually


```sh
npm run start
```
This would start the client in 9099 port. The port can be configured in package.json
## Environmental variables
The environment variables to connect to mongo from server can be found in 
```server/.env``` file

Similary client's env file is ```client/.env```



## License

MIT

**Free Software, Hell Yeah!**


