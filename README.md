# nodejs-api-rest-mongodb-jwt-oiga
Technical Test Francisco Vélásquez Escobar
francves1711@gmail.com


Como ejecutar entorno de desarrollo del api rest

1.	Clonamos el repositorio de github con el comando: 
git clone https://github.com/francves/nodejs-api-rest-mongodb-jwt-oiga.git
2.	Dentro de la consola de comandos o terminal navegamos hacia la carpeta del proyecto.
3.	Ejecutamos el comando npm install o npm i para instalar los módulos de node necesarios para el proyecto.
4.	Ejecutamos el servidor de mongo.
5.	Creamos la base de datos oiga y las colecciones orders, products y users.
6.	Una vez culminada la instalación de los módulos de node, ejecutamos el comando npm start para iniciar el servidor.
7.	Abrimos el navegador e ingresamos a la URL http://localhost:3000/ para comprobar que el servidor se ha ejecutado correctamente.
8.	Ahora podemos empezar a realizar peticiones hacia los endpoints de /products y /orders

Nota: Para la protección de rutas se utilizo JWT (JSON Web Token), por lo que será necesario registrar un usuario a través del endpoint /signup para obtener un token que enviaremos en la cabecera de las peticiones y así acceder correctamente a los endpoints de /products y /orders (Ver capturas de pantalla de Postman).

Ejecución de Test Unitarios:

Para la ejecución de test unitarios debemos haber clonado el repositorio del api rest en local, haber instalado los módulos necesarios y ejecutar el comando npm test dentro de la carpeta del proyecto. Esto ejecutará los diferentes test creados con Mocha y Supertest para las pruebas http.
