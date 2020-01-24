curl -H "Content-Type: application/json" \
     -d'{"email": "sipp11@gmail.com", "password": "test1234"}' \
     http://localhost:11776/signup


curl -H "Content-Type: application/json" \
     -d'{"email": "sipp11@example.com", "password": "test1234"}' \
     http://localhost:11776/login

curl -H "Content-Type: application/json" \
     -d'{"email": "sipp11@gmail.com", "password": "test1234"}' \
     http://localhost:11776/login


# Database

## User

users table

    id          text        unique  primary
    name        text
    password    text
    created_at  timestamp
