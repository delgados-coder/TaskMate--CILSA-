
---

# Taskmate - CILSA
**Tu vida organizada**

**Taskmate** es una herramienta de gestión de tareas diseñada para mejorar la productividad, permitiendo organizar, priorizar y hacer seguimiento de proyectos tanto para individuos como para equipos. 

![](header.png)

## Organización del Proyecto

Para coordinar nuestro trabajo y mantener una comunicación fluida, utilizamos:

- **Trello**: Para gestionar el backlog y el seguimiento de las tareas.
- **Slack**: Para la comunicación interna del equipo.

Las reuniones de revisión de progreso se realizan semanalmente los lunes.

## Distribución del Trabajo por Sprints

### Sprint 1: Prototipado y Set-Up
- **Objetivo**: Establecer las bases del proyecto, realizar el prototipado y preparar la infraestructura técnica.
- **Tareas**:
  - Prototipado de la interfaz de usuario utilizando Figma.
  - Definición del flujo de usuario y estructura general en Miro.
  - Creación de repositorios en GitHub para control de versiones.
  - Diagramación y modelado de la base de datos.

### Sprint 2: Desarrollo del Backend
- **Objetivo**: Implementar la API y la base de datos necesarias para la gestión de tareas.
- **Tareas**:
  - Desarrollo del backend utilizando Node.js.
  - Implementación de la API con funcionalidades CRUD.
  - Configuración y conexión de la base de datos.
  - Testing básico del backend y endpoints.

### Sprint 3: Desarrollo del Frontend
- **Objetivo**: Crear la interfaz gráfica e integrarla con el backend.
- **Tareas**:
  - Implementación del frontend con Handlebars.
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

#### Tarea- Categoría:

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

Se ha elegido **PostgreSQL* como motor de base de datos para este proyecto. PostgreSQL es una opción ligera y fácil de implementar, ideal para proyectos donde requiera con el tiempo una gran escalabilidad desde el inicio. 

## Tecnologías del Proyecto

Este proyecto utiliza:

- [Node.js](https://nodejs.org/)
- [Express](https://adonisjs.com/)
- [Handlebars](https://handlebarsjs.com/)


## Estructura del Proyecto

```bash
TASKMATE--CILSA-
│
├── Backend/                     # Directorio del lado del servidor (backend)
│   ├── config/                  # Configuraciones del entorno y la aplicación del backend
│   ├── database/                # Conexión y gestión de la base de datos del backend
│   ├── node_modules/            # Módulos y dependencias de Node.js para el backend
│   ├── start/                   # Archivos de inicio y configuración de rutas del servidor
│   ├── .editorconfig            # Configuración del editor para mantener un formato de código consistente
│   ├── .env                     # Variables de entorno específicas del backend (oculto por seguridad)
│   ├── .env.example             # Ejemplo de archivo de configuración de entorno para que los desarrolladores sepan qué variables usar
│   ├── ace/                     # Utilizado para gestionar dependencias y scripts del servidor backend
│   ├── package-lock.json        # Archivo generado automáticamente que describe las versiones exactas de los módulos de Node.js instalados
│   ├── package.json             # Especifica las dependencias y scripts del proyecto backend
│   └── server.js                # Punto de entrada principal del servidor backend (configura y ejecuta el servidor)
│
├── Frontend/                    # Directorio del lado del cliente (frontend)
│   ├── app/                     # Lógica y vistas de la aplicación frontend
│   ├── config/                  # Configuración específica del frontend
│   ├── database/                # Gestión de la conexión a la base de datos desde el frontend
│   ├── node_modules/            # Módulos y dependencias de Node.js para el frontend
│   ├── public/                  # Archivos públicos accesibles por el navegador (CSS, JavaScript, imágenes, etc.)
│   ├── resources/               # Recursos adicionales necesarios para el frontend (plantillas, vistas, etc.)
│   ├── start/                   # Archivos de inicio para inicializar la aplicación frontend
│   ├── .editorconfig            # Configuración del editor para mantener un formato de código consistente en el frontend
│   ├── .env                     # Variables de entorno específicas del frontend (oculto por seguridad)
│   ├── .env.example             # Ejemplo de archivo de configuración de entorno para que los desarrolladores sepan qué variables usar en frontend
│   ├── ace/                     # Scripts o dependencias adicionales del frontend
│   ├── package-lock.json        # Archivo generado automáticamente que describe las versiones exactas de los módulos de Node.js instalados para el frontend
│   ├── package.json             # Especifica las dependencias y scripts del proyecto frontend
│   └── server.js                # Punto de entrada principal del servidor frontend
│
├── .gitattributes               # Configuración para Git, especifica cómo manejar ciertos tipos de archivos en el control de versiones
├── .gitignore                   # Lista de archivos y carpetas que Git debe ignorar (ej. node_modules, archivos .env)
└── package-lock.json            # Archivo de bloqueo para dependencias del proyecto global
```

---

Esta estructura ofrece una vista clara del proyecto tanto para el backend como el frontend, con comentarios explicativos para facilitar la comprensión del contenido y la función de cada carpeta y archivo.

## Cómo Usar

Para clonar y ejecutar esta aplicación, necesitas tener instalados **Git** y **Node.js**:

### TASKMATE Setup:
```bash
$ git clone https://github.com/TU_USUARIO/taskmate-cilsa
$ cd TaskMate--CILSA-
$ npm install
$ npm start
```

###  Abrir la aplicación
Entra a esta URL en el navegador:
http://127.0.0.1:3000/
---

### Desarrollado por:  
> **Micaela Flaherty** • [GitHub](https://github.com/MIC43LA)       
> **Santiago Delgados** • [GitHub](https://github.com/delgados-coder)       
> **Laura Yachelini** • [GitHub](https://github.com/LauYache)  
> **Roxana Marchetto** • [GitHub](https://github.com/roxymarchetto)  
