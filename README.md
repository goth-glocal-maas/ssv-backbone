
# Components

* PostGIS
* Hasura
* Auth
* Nextjs (or Caddy w/Nextjs export)


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
        -d'{"email": "sipp11@gmail.com", "password": "test1234"}' \
        http://localhost:11776/signup


    curl -H "Content-Type: application/json" \
        -d'{"email": "sipp11@example.com", "password": "test1234"}' \
        http://localhost:11776/login

    curl -H "Content-Type: application/json" \
        -d'{"email": "sipp11@gmail.com", "password": "test1234"}' \
        http://localhost:11776/login

