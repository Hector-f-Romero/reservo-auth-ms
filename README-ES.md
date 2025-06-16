<p align="center">
    <img src="public/Reservo-combined-mark.svg" alt="Reservo combined mark" />
</p>

# Tabla de contenidos

- [Tabla de contenidos](#tabla-de-contenidos)
- [Contexto de Reservo y finalidad](#contexto-de-reservo-y-finalidad)
- [Reservo Auth MS](#reservo-auth-ms-)
- [Configuración del entorno](#configuración-del-entorno-)
  - [Requisitos previos](#requisitos-previos)
  - [Inicializar el proyecto](#inicializar-el-proyecto)
- [Licencia](#licencia)

# Contexto de Reservo y finalidad

Reservo nace como un proyecto personal con **el objetivo de aprender y experimentar de primera mano los principios de la arquitectura de microservicios**, comprendiendo tanto sus ventajas como sus desafíos mientras desarrollaba una solución para gestionar las reservas de un auditorio.

Además, quería explorar una tecnología diferente al ecosistema de JavaScript para construir servidores web, por lo que decidí desarrollar el núcleo del proyecto en Java 17 con Spring Boot. Este camino me permitió adquirir nuevos conocimientos, afianzar buenas prácticas y diseñar un repositorio orientado a facilitar una experiencia de desarrollo limpia y mantenible.

Reconozco que la distribución de responsabilidades entre los distintos microservicios pudo haber sido más simple. Sin embargo, quise retarme simulando un entorno más complejo, donde fuera necesario orquestar múltiples servicios al mismo tiempo. Esta decisión, aunque desafiante, me permitió entender mejor las implicaciones reales de trabajar con este tipo de arquitectura en contextos más amplios.

Reservo está compuesto por cinco repositorios:

- [Fronted desarrollado en Astro y React 🚀](https://github.com/Hector-f-Romero/reservo-front)
- [Gateway de NestJS encargado de enrutar las peticiones al microservicio correspondiente 🧠](https://github.com/Hector-f-Romero/reservo-api-gateway)
- [Microservicio en Spring Boot que gestiona el CRUD de las entidades involucradas 🎨](https://github.com/Hector-f-Romero/reservo-events-user-ms)
- [App híbrida de NestJS que utiliza WebSockets y se comunica entre microservicios ⌚](https://github.com/Hector-f-Romero/reservo-ws-ms)
- [Microservicio de NestJS dedicado a la autenticación 🔐](https://github.com/Hector-f-Romero/reservo-auth-ms)

<p align="center">
    <img src="public/Reservo-architecture-diagram.svg" alt="Diagrama de arquitectura de Reservo" />
</p>

En cada repositorio he documentado los principales retos enfrentados y los aprendizajes obtenidos durante el desarrollo. Mirando hacia atrás, solo puedo sentirme orgulloso del esfuerzo invertido y del resultado alcanzado con este proyecto.

# Reservo Auth MS 🔐

Este proyecto es un microservicio de autenticación construido con NestJS que se encarga de la autenticación de usuarios y la validación de tokens mediante un intermediario de mensajes NATS. El servicio es responsable de:

- Autenticación de usuarios (inicio de sesión/registro)
- Generación y validación de tokens JWT
- Integración con un microservicio de gestión de usuarios.

# Configuración del entorno ⚙

## Requisitos previos 
- Node 22.12.0
- Docker Desktop
- pnpm 10.8.0

## Inicializar el proyecto

1. Clonar este repositorio y accede al directorio del proyecto.
2. Instalar dependencias usando el gestor de paquetes: `pnpm install`.
3. Crear el archivo de variables de entorno `cp .env.example .env`.
4. Completar los valores necesarios dentro del archivo `.env`.
5. Iniciar el servidor Gateway usando el comando `pnpm run start:dev`.
6. Asegurarse de tener los siguientes servicios en ejecución:
   - Reservo Auth MS
   - Reservo Events User MS
   - Reservo WebSocket MS.
7. Ejecuta una petición `HTTP POST` al endpoint `/V1/seed` para cargar datos de prueba en la base de datos.

Por defecto, la documentación de la API está disponible en `http://localhost:3000/api` .

# Licencia

Revisa `LICENSE` para más información.