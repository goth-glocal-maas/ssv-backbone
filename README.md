# Setup

    openssl genrsa -out private.pem 2048
    openssl rsa -in private.pem -pubout > public.pem
    mv *.pen supplements/

## Prep for env variable

    awk -v ORS='\\n' '1' public.pem

## Start

    source env
    docker-compose up --build

# Components

- PostGIS
- Hasura
- Auth
- Nextjs (or Caddy w/Nextjs export)

# Database

## User

users table

    id              text        unique  primary
    first_name      text        nullable
    last_name       text        nullable
    email           text        unique
    password        text
    role            text
    created_at      timestamp
    last_login_at   timestamp

# Testing

    curl -H "Content-Type: application/json" \
        -d'{"username": "sipp11@gmail.com", "password": "test1234"}' \
        http://localhost:11776/signup


    curl -H "Content-Type: application/json" \
        -d'{"username": "sipp11@example.com", "password": "test1234"}' \
        http://localhost:11776/login

    curl -H "Content-Type: application/json" \
        -d'{"username": "sipp11@gmail.com", "password": "test1234"}' \
        http://localhost:11776/login
