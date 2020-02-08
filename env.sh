#!/bin/bash
export ENCRYPTION_KEY='{"type":"RS256", "key": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzN25tgAXH+GrrrkZzNM2\n04qtp9l9H7JMb8X7OUL4Wu5uZYyYvCkFzcLTHUoDpWD9V1WmuTyBaimyY6oTTkQF\nImZEDce8o3bfzkQR9w6SLLqg6F4nAHU1UaXQPl2k5RG+bWDJCRjwNnQOhP8WaZHN\nWi70TpEhDZRXgAFMSNHtXCQPYMlnrCsER+gWrTl2T7NFIgRhsRZeTDBAQjuLZ/LH\nZH8Fsmj/mwy4ip9Vmq9clgRxD66lU1cZ2d+EXieMU0xA0niIaRt2LAIskLHoz/oP\n7sMv39NgjIXCYUNIwcWkXOkP8QCOKwWIJxy2deXeG25VeM9FM1AMMwZABUlzxwqR\nWQIDAQAB\n-----END PUBLIC KEY-----\n"}'
export DATABASE_URL=postgres://sipp11:koala.nutshell.gis@postgis:5432/pdms
export AUTH_PRIVATE_KEY=/root/app/private.pem
export AUTH_PUBLIC_KEY=/root/app/public.pem