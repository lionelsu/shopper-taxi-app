#!/bin/sh

# Esperar o banco de dados estar acessível antes de rodar as migrações
echo "Esperando o banco de dados..."

while ! nc -z postgres 5432; do
    sleep 1
done

echo "Banco de dados está acessível. Executando migrações..."
npx prisma migrate dev --name rides_model
npx prisma generate

npm run dev
