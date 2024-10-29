# Taskmate - CILSA
**Tu vida organizada**

**Taskmate** es una herramienta de gestión de tareas diseñada para mejorar la productividad, permitiendo organizar, priorizar y hacer seguimiento de proyectos tanto para individuos como para equipos.

![](header.png)

## Organización del Proyecto

Para coordinar nuestro trabajo y mantener una comunicación fluida, utilizamos:

- **Trello**: Para gestionar el backlog y el seguimiento de las tareas.
- **Slack**: Para la comunicación interna del equipo.
- **Google Meet**: Para reuniones y actualizaciones de progreso.

Las reuniones de revisión de progreso se realizan semanalmente los lunes.

## Distribución del Trabajo por Sprints

### Sprint 1: Prototipado y Set-Up
- **Objetivo**: Establecer las bases del proyecto, realizar el prototipado y preparar la infraestructura técnica.
- **Tareas**:
  - Prototipado de la interfaz de usuario utilizando Figma.
  - Creación de repositorios en GitHub para control de versiones.
  - Diagramación y modelado de la base de datos.

### Sprint 2: Desarrollo del Backend
- **Objetivo**: Implementar la API y la base de datos necesarias para la gestión de tareas.
- **Tareas**:
  - Desarrollo del backend utilizando **Express.js**.
  - Implementación de la API con funcionalidades CRUD.
  - Configuración y conexión de la base de datos con **PostgreSQL**.
  - Testing básico del backend y endpoints.

### Sprint 3: Desarrollo del Frontend
- **Objetivo**: Crear la interfaz gráfica e integrarla con el backend.
- **Tareas**:
  - Implementación del frontend utilizando **Handlebars** como motor de plantillas.
  - Desarrollo de componentes de la interfaz: lista de tareas, botones, formularios.
  - Integración con la API.
  - Testing y pruebas de usabilidad.

### Sprint 4: Refinamiento y Despliegue
- **Objetivo**: Finalizar la aplicación, corregir errores y proceder con el despliegue.
- **Tareas**:
  - Refactorización y mejora del código.
  - Pruebas de usuario y corrección de errores.
  - Despliegue en producción.

## MVP (Producto Mínimo Viable)

El MVP deberá incluir las siguientes funcionalidades:

- **Gestión de tareas**:
  - Crear, ver, editar y eliminar tareas.
  - Marcar tareas como completadas o pendientes.

- **Estructura básica**:
  - Interfaz simple para gestionar las tareas.
  - API funcional con operaciones CRUD.
  - Persistencia de datos en la base de datos.

## Modelo Entidad-Relación

### **Entidades y Atributos:**

1. **Usuario:**
   - `ID_Usuario` (Clave primaria, INTEGER, AUTOINCREMENT)
   - `Nombre` (TEXT)
   - `Correo` (TEXT, UNIQUE)
   - `Contraseña` (TEXT)

2. **Tarea:**
   - `ID_Tarea` (Clave primaria, INTEGER, AUTOINCREMENT)
   - `Titulo` (TEXT)
   - `Descripcion` (TEXT)
   - `Fecha_Limite` (DATE)
   - `Prioridad` (TEXT)
   - `Estado` (TEXT)
   - `Fecha_Creacion` (TIMESTAMP)
   - `Fecha_Modificacion` (TIMESTAMP)
   - `ID_Usuario` (INTEGER, Clave foránea)
   - `ID_Categoria` (INTEGER, Clave foránea)
   - `ID_Lista` (INTEGER, Clave foránea)

3. **Categoria:**
   - `ID_Categoria` (Clave primaria, INTEGER, AUTOINCREMENT)
   - `Nombre_Categoria` (TEXT)
   - `Descripcion` (TEXT)

4. **Lista_de_Tareas:**
   - `ID_Lista` (Clave primaria, INTEGER, AUTOINCREMENT)
   - `Nombre_Lista` (TEXT)
   - `Descripcion` (TEXT)
   - `ID_Usuario` (INTEGER, Clave foránea)

### **Relaciones**:

#### Usuario - Tarea:

- Un **Usuario** puede tener múltiples **Tareas**.
- Cada **Tarea** pertenece a un solo **Usuario**.

#### Tarea - Categoría:

- Una **Tarea** puede pertenecer a una **Categoría**.
- Una **Categoría** puede tener múltiples **Tareas**.

#### Tarea - Lista de Tareas:

- Una **Tarea** puede pertenecer a una **Lista de Tareas**.
- Una Lista de **Tareas** puede tener múltiples **Tareas**.

#### Usuario - Lista de Tareas:

- Un **Usuario** puede tener múltiples **Listas de Tareas**.
- Cada **Lista de Tareas** pertenece a un solo **Usuario**.

## Diagramas del Proyecto

A continuación, se muestran los diagramas que representan el modelo entidad-relación y su estructura en la base de datos.

![Diagrama Entidad-Atributos](diagrama1.png)
![Diagrama Estructura Ent-Rel](diagrama2.png)
![Diagrama Relaciones](diagrama3.png)

## Elección del Motor de Base de Datos

Se ha elegido **PostgreSQL** como motor de base de datos para este proyecto. PostgreSQL es una opción robusta y escalable, ideal para proyectos que pueden crecer con el tiempo.

## Tecnologías del Proyecto

Este proyecto utiliza:

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Handlebars](https://handlebarsjs.com/)
- [PostgreSQL](https://www.postgresql.org/)

## Estructura del Proyecto

```bash
TASKMATE--CILSA-
│
├── bin/                         # Archivos de inicio para el servidor
│   └── www                      # Archivo principal para iniciar el servidor
│
├── db/                          # Directorio para la base de datos
│
├── db.js                        # Archivo de configuración de la base de datos
│
├── lib/                         # Librerías auxiliares del proyecto
│
├── templateEngine.js            # Configuración del motor de plantillas Handlebars
│
├── public/                      # Archivos públicos accesibles por el navegador
│   ├── images/                  # Imágenes utilizadas en la aplicación
│   │   ├── carrusel pagina 1.png
│   │   ├── carrusel pagina 2.png
│   │   ├── carrusel pagina 3.png
│   │   ├── logo.png
│   │   ├── retrato.png
│   │   ├── retrato1.png
│   │   ├── retrato2.png
│   │   ├── retrato3.png
│   │   ├── retrato4.png
│   │   ├── retrato5.png
│   │   ├── retrato6.png
│   │
│   └── js/                     # Archivos JavaScript del frontend
│       ├── CategoriasDashboard.js
│       ├── ListasDashboard.js
│       ├── TareasDashboard.js
│       └── users.js
│
├── stylesheets/                # Hojas de estilo CSS
│   ├── dashboard.css
│   ├── home.css
│   └── tarea.css
│
├── routes/                     # Rutas de la aplicación
│   ├── categorias.js
│   ├── dashboard.js
│   ├── index.js
│   ├── listas.js
│   └── tareas.js
│
├── views/                      # Vistas de la aplicación
│   ├── layouts/                # Plantillas principales
│   ├── partials/               # Componentes reutilizables
│   ├── categorias/              # Vistas específicas de categorías
│   │   └── categorias.hbs
│   ├── listas/                  # Vistas específicas de listas
│   │   └── listas.hbs
│   ├── tareas/                  # Vistas específicas de tareas
│   │   └── tareas.hbs
│   ├── footer.hbs
│   ├── header.hbs
│   ├── dashboard.hbs
│   ├── error.hbs
│   └── home.hbs
│
├── .env                        # Variables de entorno (oculto por seguridad)
├── .gitignore                  # Archivos que Git debe ignorar
├── README.md                   # Documentación del proyecto
├── app.js                      # Archivo principal de la aplicación
├── package-lock.json           # Bloqueo de dependencias del proyecto
└── package.json                # Información del proyecto y dependencias
```

## Cómo Usar

Para clonar y ejecutar esta aplicación, necesitas tener instalados **Git** y **Node.js**:

### TASKMATE Setup:
```bash
$ git clone https://github.com/TU_USUARIO/taskmate-cilsa
$ cd TaskMate--CILSA-
$ npm install
$ npm start
```

### Abrir la aplicación
Entra a esta URL en el navegador:
http://127.0.0.1:3000/

---


### Desarrollado por:  
> **Micaela Flaherty** • [GitHub](https://github.com/MIC43LA)       
> **Santiago Delgado** • [GitHub](https://github.com/delgados-coder)       
> **Laura Yachelini** • [GitHub](https://github.com/LauYache)  
> **Roxana Marchetto** • [GitHub](https://github.com/roxymarchetto)  
