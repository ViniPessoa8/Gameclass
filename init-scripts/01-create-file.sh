#!/bin/sh
echo "Criando arquivo teste.txt dentro do PostgreSQL..."
echo "Conteúdo do arquivo teste" > /var/lib/postgresql/data/teste.txt
chmod 644 /var/lib/postgresql/data/teste.txt
chown postgres:postgres /var/lib/postgresql/data/teste.txt
