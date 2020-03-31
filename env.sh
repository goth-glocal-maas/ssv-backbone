#!/bin/bash
export ENCRYPTION_KEY='{"type":"RS256", "key": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuCuIAGbi8nJXp0eXChlG\nARVeFMZ0CIs46rcAyc0t/Ax+rtHLabs/88grhTiCjAN5Aju0/ziE/BVD+or9825z\nnLXBrGku/j6/x8A+QmF2/DNLhkRCs2RS0BlSluFiquCbQC1TcZFeDd8xIoGpbBQU\nh/7bw2x/RfsO5XFex0QrjcIJnr3fyqnGzI4EFpRaOweyn61YA49EVovJhJ1VQTPb\nJieiboSo1jc0J2C1pN+R4rJBNn1iqtkAcuo9LReVJWjKAWAkc9rP4OLMqbBSP2HA\nLH0BSDpdKOcCXTck1L1d4jwjPa2x36zQUqXCNJD5w+KnL2O+3298BNlnjuVy0I7Z\nhwIDAQAB\n-----END PUBLIC KEY-----\n"}'
export AUTH_PRIVATE_KEY=/root/app/private.pem
export AUTH_PUBLIC_KEY=/root/app/public.pem
export UPLOAD_DIR=/root/app/media
export HASURA_ADMIN_SECRET=taara-hayate-airi
export DATABASE_URL=postgres://sipp11:koala.nutshell.gis@postgis:5432/stth
export DATABASE_PASSWORD=koala.nutshell.gis