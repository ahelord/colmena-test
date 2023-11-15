### Prerequisites

What things you need to install the software and how to install them :

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [Docker](https://docs.docker.com/docker-for-windows/install/) or [Docker Toolbox](https://github.com/docker/toolbox/releases)
- [Nest CLI](https://docs.nestjs.com/cli/overview)

---

### Installation

1. Clone the git repository

   ```bash
   git clone https://github.com/ahelord/colmena-test.git
   ```

2. Go into the project directory

   ```bash
   cd colmena-test/
   ```

3. Install NPM dependencies

   ```bash
   npm i
   ```

### Run test

   ```bash
    npm run test
   ```

### Run locally in docker

   ```bash
   docker-compose up -d --build
   ```
This command will run the [docker-compose.yml](docker-compose.yml) that runs the containers:
- postgres-colmena: is the postgres database
- nodejs-colmena: is the nest.js service that runs on port 8001

By downloading this file [Colmena test.postman_collection.json](Colmena%20test.postman_collection.json)   you can import it into Postman and consume all the endpoints created

Compose file uses `.env.docker`.

### Run locally

   ```bash
   npm run start
   ```
Locally uses .env

### How use

#### 1. Consume sign-up endpoint
```bash
curl --location 'localhost:8001/auth/sign-up' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"test3@test.com",
    "password":"A^S1B%JVo9p!"
}'
```
- Copy access token of response
```bash
{
    "statusCode": 201,
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgzM2Y5ZTVjLWJmYTUtNDJjZi05Njc3LTg1NTlmYjY1NDUzNyIsImVtYWlsIjoidGVzdDNAdGVzdC5jb20iLCJzdWIiOiI4MzNmOWU1Yy1iZmE1LTQyY2YtOTY3Ny04NTU5ZmI2NTQ1MzciLCJpYXQiOjE3MDAwMjc1NjAsImV4cCI6MTcwMDAzMTE2MH0.9JK0U9PcDIM3X57Lmpku2af1p5jwXwwWK5DkyVzITJQ",
        "accessTokenExpiresIn": "2023-11-15T06:52:40.206Z",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgzM2Y5ZTVjLWJmYTUtNDJjZi05Njc3LTg1NTlmYjY1NDUzNyIsImVtYWlsIjoidGVzdDNAdGVzdC5jb20iLCJzdWIiOiI4MzNmOWU1Yy1iZmE1LTQyY2YtOTY3Ny04NTU5ZmI2NTQ1MzciLCJpYXQiOjE3MDAwMjc1NjAsImV4cCI6MTcwMDA0OTE2MH0.iyiSl8zd9uToXItpCWnosyyj_Tgrapka21666Ys1BDE"
    }
}
```

#### 2. You can refresh the token that by default expires in 60 minutes


```bash
curl --location 'localhost:8001/auth/access-token' \
--header 'Content-Type: application/json' \
--data '{
    "refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ1NjUwNTkwLTk3MzMtNDdjOS04ODc1LTE4Njg4ZmYxNGQwNyIsImVtYWlsIjoidGVzdDNAdGVzdC5jb20iLCJzdWIiOiI0NTY1MDU5MC05NzMzLTQ3YzktODg3NS0xODY4OGZmMTRkMDciLCJpYXQiOjE3MDAwMTg1ODAsImV4cCI6MTcwMDA0MDE4MH0.x2qvY1EryMQ6Cc7kEF_ENjGmeqCHKAzFibfJK9ZMyK4"
}'

```

#### 3. If the refresh token expires you can log in

```bash
curl --location 'localhost:8001/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"test3@test.com",
    "password":"A^S1B%JVo9p!"
}'
```

#### 4. Put token in header Authorization

```bash
curl --location 'http://localhost:8001/patient' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgzM2Y5ZTVjLWJmYTUtNDJjZi05Njc3LTg1NTlmYjY1NDUzNyIsImVtYWlsIjoidGVzdDNAdGVzdC5jb20iLCJzdWIiOiI4MzNmOWU1Yy1iZmE1LTQyY2YtOTY3Ny04NTU5ZmI2NTQ1MzciLCJpYXQiOjE3MDAwMjc1NjAsImV4cCI6MTcwMDAzMTE2MH0.9JK0U9PcDIM3X57Lmpku2af1p5jwXwwWK5DkyVzITJQ' \
--data-raw '{
    "identificationDocument": "6",
    "firstName": "string",
    "lastName": "string",
    "email": "patient2@test.com",
    "phone": "string",
    "address": "string",
    "city": "string"
}'
```