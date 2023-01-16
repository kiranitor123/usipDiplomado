Este es un CRUD con NodeJS
*Primero se tiene que clonar o descargar el proyecto
*Luego `npm i`, para instalar las dependencias
*y finalmente para hacerlo correr en local `node main.js`

Operaciones que se puede realizar (en la nube), cambiar el domino por `localhost:3000` para pruebas locales
curl --location --request GET 'https://basic-api-rest-node.onrender.com/users'

curl --location --request POST 'https://basic-api-rest-node.onrender.com/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "nombre": "test",
    "edad": 45
}'

curl --location --request PUT 'https://basic-api-rest-node.onrender.com/users/2' \
--header 'Content-Type: application/json' \
--data-raw '{
    "nombre": "test2",
    "edad": 15
}'

curl --location --request DELETE 'https://basic-api-rest-node.onrender.com/users/3'

curl --location --request GET 'https://basic-api-rest-node.onrender.com/promedio'

curl --location --request GET 'https://basic-api-rest-node.onrender.com/status'


para tener una copia de la bd local hacer correr el script en algun db manager
