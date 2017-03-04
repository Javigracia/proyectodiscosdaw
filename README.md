# Proyecto Discos DEW
Proyecto de la asignatura de Cliente del ciclo superior de Desarrollo de Aplicaciones Web.

# Introducción
El proyecto consta de una serie de páginas web con la temática de votación de discos por parte de clientes registrados,
con opción de registro en la misma aplicación en caso de no estarlo ya y la visualización de los discos con su nota media 
o el Top 5 de las notas más altas.
Se debe crear una base de datos en SQL Server con las tablas necesarias para los discos, clientes o usuarios, tipos de discos, 
puntuación e intérprete y tener los datos necesarios para su funcionamiento como son los discos, intérpretes y clientes.

La estructura de la aplicación es la siguiente:
- Portada: En esta página tenemos una imagen svg que represente la temática de la Web.
- Home: Página de inicio de la aplicación. Presenta como el resto un layout con una barra superior con enlaces a esta misma
página, contacto y about. Debajo tenemos una imagen con 3 botones que nos llevan a las diferentes secciones de la Web que se 
detallan a continuación. Discos, Admin o Clientes y Top 5.
- Discos: Muestra una tabla o lista de todos los discos de nuestra base de datos con su nota media por disco.
- Admin o Clientes: Comprueba si estamos autorizados por Login para llevarnos a la página de Admin en si o a la de Login.
    - Login: En caso de no estar logueado previamente y por tanto con sesión activa, se nos pide email y password.
        - ErrorLogin: Esta página muestra un mensaje de error si el password es incorrecto.
    - Registro: Si no somos usuario registrado, tenemos la opción de crear un nuevo usuario o cliente.
- Top 5: Nos muestra una gráfica de barras horizontales con los 5 discos más votados (no es necesario estar logueado).

Todo el proyecto debe presentar imágenes svg como logo de la web con un peso máximo de 2Kb e iconos con un peso de 1Kb.
Además debe ser response y adaptada a dispositivos móviles.
Debe usar esquema de colores coherente a “web-safe colors” y un mapa de imagen con varios links a otras webs de tipo banner
publicitario.

# Tecnologías aplicadas
- .Net (Servidor)
- Rest o Soap
- SQL Server
- Ajax
- jQuery
- React
- Html5
- Css3
- JavaScript
- Entity Framework
- Canvas y SVG
- Mapa de imágenes
- Imágenes vectoriales generadas o descargadas (Inkscape)
- Reveal.js o Prezi (para la presentación de tipo pitch del proyecto)
- Trello
- Github
- Markdown (este mismo documento README.md)

# Información extra
- Curso escolar 2016-17
- 2º CSFP Desarrollo de Aplicaciones Web, grupo A (2ºDAWA)
- Módulo de Desarrollo Web en Entorno Cliente (DEW)
- Profesora: Albérica García Rodríguez

# Miembros del proyecto
 Miembro | Participación | Twitter | Correo
 --------|---------------|---------|--------
 Cristo Daniel Cabello Delgado | Cliente |  | danilismo23@gmail.com
 Javier Gracia González | Servidor, Base de Datos, Documentación | [@javigracia](https://twitter.com/javigracia) | neodreamer@gmail.com

 # Recursos y detalles
 [Trello](https://trello.com/b/e8f9YnnZ)
 [Github](https://github.com/Javigracia/proyectodiscosdaw/)