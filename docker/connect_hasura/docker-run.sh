#! /bin/bash
docker run -d  --net=host  \
       -e HASURA_GRAPHQL_DATABASE_URL=postgresql://postgres:postgrespassword@localhost:5431/postgres \
       -e HASURA_GRAPHQL_ENABLE_CONSOLE=true \
       hasura/graphql-engine:latest




