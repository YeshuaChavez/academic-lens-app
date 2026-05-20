# Campus360 - Portal Educativo de Innovatec University

Campus360 es una plataforma web educativa integral desarrollada para Innovatec University. Permite la gestion y administracion de procesos academicos a traves de tres perfiles diferenciados: Estudiantes, Docentes y Administradores.

## Caracteristicas Principales

### Pagina de Acceso (Login)
- Interfaz moderna con diseno de vidrio esmerilado (glassmorphism).
- Fondo interactivo con transicion automatica (crossfade) entre dos videos optimizados para un rendimiento fluido tanto en dispositivos moviles como en computadoras de escritorio.
- Selector dinamico de rol (Estudiante, Docente, Administrador) que adapta la tematica cromatica y los accesos de la aplicacion.

### Portal de Estudiante
- Acceso a cursos activos y progreso academico.
- Consulta de calificaciones e historial de notas.
- Biblioteca virtual integrada con busqueda de recursos.
- Modulos de matricula y pagos en linea.
- Sistema de mensajeria y notificaciones.

### Portal de Docente
- Administracion de asignaturas y grupos.
- Registro y actualizacion de calificaciones.
- Control de asistencia de los estudiantes.
- Carga de materiales de estudio y recursos multimedia.

### Portal de Administrador
- Panel de control con graficos estadisticos sobre matricula y rendimiento.
- Gestion integral de usuarios (creacion, edicion y baja de estudiantes/docentes/administradores).
- Configuracion del sistema e infraestructura institucional.
- Reportes institucionales exportables.

## Tecnologias Utilizadas

El proyecto utiliza un conjunto moderno de herramientas de desarrollo web enfocado en la velocidad y escalabilidad:

- **Framework**: TanStack Start (React 19) con soporte para renderizado en el servidor (SSR) y generacion estatica.
- **Enrutador**: TanStack Router para un enrutado tipado y seguro.
- **Estilos**: Tailwind CSS v4 para diseno responsivo y modular con variables HSL personalizadas.
- **Iconografia**: Lucide React para un set homogeneo de iconos vectoriales.
- **Visualizacion de datos**: Recharts para la generacion de reportes graficos e interactivos en el panel de administracion.
- **Herramienta de construccion**: Vite v7 para compilacion ultrarrapida.

## Requisitos Previos

Asegurese de tener instalado:
- Node.js (version 18 o superior) o Bun (version 1.0 o superior).
- Un gestor de paquetes como npm, yarn o bun.

## Instalacion y Uso

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/YeshuaChavez/academic-lens-app.git
   cd academic-lens-app
   ```

2. Instalar las dependencias del proyecto:
   ```bash
   npm install
   # o usando bun:
   bun install
   ```

3. Levantar el servidor de desarrollo local:
   ```bash
   npm run dev
   # o usando bun:
   bun run dev
   ```
   El servidor estara disponible en http://localhost:3000.

4. Compilar el proyecto para produccion:
   ```bash
   npm run build
   # o usando bun:
   bun run build
   ```

5. Previsualizar la version de produccion compilada:
   ```bash
   npm run preview
   # o usando bun:
   bun run preview
   ```

## Scripts Disponibles

En el archivo `package.json` se definen los siguientes comandos:

- `npm run dev`: Inicia el entorno de desarrollo con Vite.
- `npm run build`: Compila la aplicacion optimizada para produccion.
- `npm run preview`: Sirve localmente los archivos compilados en la carpeta dist.
- `npm run lint`: Ejecuta ESLint para analizar la calidad del codigo y detectar problemas.
- `npm run format`: Ejecuta Prettier para dar formato consistente a todo el codigo fuente.
