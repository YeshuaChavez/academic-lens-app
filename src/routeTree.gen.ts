/* eslint-disable */
// @ts-nocheck
import { Route as rootRouteImport } from './routes/__root'
import { Route as LoginRouteImport } from './routes/login'
import { Route as IndexRouteImport } from './routes/index'
import { Route as EstudianteDashboardImport } from './routes/estudiante/dashboard'
import { Route as EstudianteMatriculaImport } from './routes/estudiante/matricula'
import { Route as EstudianteNotasImport } from './routes/estudiante/notas'
import { Route as EstudiantePagosImport } from './routes/estudiante/pagos'
import { Route as EstudianteBibliotecaImport } from './routes/estudiante/biblioteca'
import { Route as EstudianteMensajeriaImport } from './routes/estudiante/mensajeria'
import { Route as DocenteDashboardImport } from './routes/docente/dashboard'
import { Route as DocenteCursosImport } from './routes/docente/cursos'
import { Route as DocenteNotasImport } from './routes/docente/notas'
import { Route as DocenteAsistenciaImport } from './routes/docente/asistencia'
import { Route as DocenteMensajeriaImport } from './routes/docente/mensajeria'
import { Route as DocenteMaterialesImport } from './routes/docente/materiales'
import { Route as AdminDashboardImport } from './routes/admin/dashboard'
import { Route as AdminReportesImport } from './routes/admin/reportes'
import { Route as AdminUsuariosImport } from './routes/admin/usuarios'
import { Route as AdminCursosImport } from './routes/admin/cursos'
import { Route as AdminMensajeriaImport } from './routes/admin/mensajeria'
import { Route as AdminConfiguracionImport } from './routes/admin/configuracion'

const LoginRoute = LoginRouteImport.update({ id: '/login', path: '/login', getParentRoute: () => rootRouteImport } as any)
const IndexRoute = IndexRouteImport.update({ id: '/', path: '/', getParentRoute: () => rootRouteImport } as any)
const EstudianteDashboardRoute = EstudianteDashboardImport.update({ id: '/estudiante/dashboard', path: '/estudiante/dashboard', getParentRoute: () => rootRouteImport } as any)
const EstudianteMatriculaRoute = EstudianteMatriculaImport.update({ id: '/estudiante/matricula', path: '/estudiante/matricula', getParentRoute: () => rootRouteImport } as any)
const EstudianteNotasRoute = EstudianteNotasImport.update({ id: '/estudiante/notas', path: '/estudiante/notas', getParentRoute: () => rootRouteImport } as any)
const EstudiantePagosRoute = EstudiantePagosImport.update({ id: '/estudiante/pagos', path: '/estudiante/pagos', getParentRoute: () => rootRouteImport } as any)
const EstudianteBibliotecaRoute = EstudianteBibliotecaImport.update({ id: '/estudiante/biblioteca', path: '/estudiante/biblioteca', getParentRoute: () => rootRouteImport } as any)
const EstudianteMensajeriaRoute = EstudianteMensajeriaImport.update({ id: '/estudiante/mensajeria', path: '/estudiante/mensajeria', getParentRoute: () => rootRouteImport } as any)
const DocenteDashboardRoute = DocenteDashboardImport.update({ id: '/docente/dashboard', path: '/docente/dashboard', getParentRoute: () => rootRouteImport } as any)
const DocenteCursosRoute = DocenteCursosImport.update({ id: '/docente/cursos', path: '/docente/cursos', getParentRoute: () => rootRouteImport } as any)
const DocenteNotasRoute = DocenteNotasImport.update({ id: '/docente/notas', path: '/docente/notas', getParentRoute: () => rootRouteImport } as any)
const DocenteAsistenciaRoute = DocenteAsistenciaImport.update({ id: '/docente/asistencia', path: '/docente/asistencia', getParentRoute: () => rootRouteImport } as any)
const DocenteMensajeriaRoute = DocenteMensajeriaImport.update({ id: '/docente/mensajeria', path: '/docente/mensajeria', getParentRoute: () => rootRouteImport } as any)
const DocenteMaterialesRoute = DocenteMaterialesImport.update({ id: '/docente/materiales', path: '/docente/materiales', getParentRoute: () => rootRouteImport } as any)
const AdminDashboardRoute = AdminDashboardImport.update({ id: '/admin/dashboard', path: '/admin/dashboard', getParentRoute: () => rootRouteImport } as any)
const AdminReportesRoute = AdminReportesImport.update({ id: '/admin/reportes', path: '/admin/reportes', getParentRoute: () => rootRouteImport } as any)
const AdminUsuariosRoute = AdminUsuariosImport.update({ id: '/admin/usuarios', path: '/admin/usuarios', getParentRoute: () => rootRouteImport } as any)
const AdminCursosRoute = AdminCursosImport.update({ id: '/admin/cursos', path: '/admin/cursos', getParentRoute: () => rootRouteImport } as any)
const AdminMensajeriaRoute = AdminMensajeriaImport.update({ id: '/admin/mensajeria', path: '/admin/mensajeria', getParentRoute: () => rootRouteImport } as any)
const AdminConfiguracionRoute = AdminConfiguracionImport.update({ id: '/admin/configuracion', path: '/admin/configuracion', getParentRoute: () => rootRouteImport } as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/login': typeof LoginRoute
  '/estudiante/dashboard': typeof EstudianteDashboardRoute
  '/estudiante/matricula': typeof EstudianteMatriculaRoute
  '/estudiante/notas': typeof EstudianteNotasRoute
  '/estudiante/pagos': typeof EstudiantePagosRoute
  '/estudiante/biblioteca': typeof EstudianteBibliotecaRoute
  '/estudiante/mensajeria': typeof EstudianteMensajeriaRoute
  '/docente/dashboard': typeof DocenteDashboardRoute
  '/docente/cursos': typeof DocenteCursosRoute
  '/docente/notas': typeof DocenteNotasRoute
  '/docente/asistencia': typeof DocenteAsistenciaRoute
  '/docente/mensajeria': typeof DocenteMensajeriaRoute
  '/docente/materiales': typeof DocenteMaterialesRoute
  '/admin/dashboard': typeof AdminDashboardRoute
  '/admin/reportes': typeof AdminReportesRoute
  '/admin/usuarios': typeof AdminUsuariosRoute
  '/admin/cursos': typeof AdminCursosRoute
  '/admin/mensajeria': typeof AdminMensajeriaRoute
  '/admin/configuracion': typeof AdminConfiguracionRoute
}

export interface FileRoutesByTo extends FileRoutesByFullPath {}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/login': typeof LoginRoute
  '/estudiante/dashboard': typeof EstudianteDashboardRoute
  '/estudiante/matricula': typeof EstudianteMatriculaRoute
  '/estudiante/notas': typeof EstudianteNotasRoute
  '/estudiante/pagos': typeof EstudiantePagosRoute
  '/estudiante/biblioteca': typeof EstudianteBibliotecaRoute
  '/estudiante/mensajeria': typeof EstudianteMensajeriaRoute
  '/docente/dashboard': typeof DocenteDashboardRoute
  '/docente/cursos': typeof DocenteCursosRoute
  '/docente/notas': typeof DocenteNotasRoute
  '/docente/asistencia': typeof DocenteAsistenciaRoute
  '/docente/mensajeria': typeof DocenteMensajeriaRoute
  '/docente/materiales': typeof DocenteMaterialesRoute
  '/admin/dashboard': typeof AdminDashboardRoute
  '/admin/reportes': typeof AdminReportesRoute
  '/admin/usuarios': typeof AdminUsuariosRoute
  '/admin/cursos': typeof AdminCursosRoute
  '/admin/mensajeria': typeof AdminMensajeriaRoute
  '/admin/configuracion': typeof AdminConfiguracionRoute
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  LoginRoute: typeof LoginRoute
  EstudianteDashboardRoute: typeof EstudianteDashboardRoute
  EstudianteMatriculaRoute: typeof EstudianteMatriculaRoute
  EstudianteNotasRoute: typeof EstudianteNotasRoute
  EstudiantePagosRoute: typeof EstudiantePagosRoute
  EstudianteBibliotecaRoute: typeof EstudianteBibliotecaRoute
  EstudianteMensajeriaRoute: typeof EstudianteMensajeriaRoute
  DocenteDashboardRoute: typeof DocenteDashboardRoute
  DocenteCursosRoute: typeof DocenteCursosRoute
  DocenteNotasRoute: typeof DocenteNotasRoute
  DocenteAsistenciaRoute: typeof DocenteAsistenciaRoute
  DocenteMensajeriaRoute: typeof DocenteMensajeriaRoute
  DocenteMaterialesRoute: typeof DocenteMaterialesRoute
  AdminDashboardRoute: typeof AdminDashboardRoute
  AdminReportesRoute: typeof AdminReportesRoute
  AdminUsuariosRoute: typeof AdminUsuariosRoute
  AdminCursosRoute: typeof AdminCursosRoute
  AdminMensajeriaRoute: typeof AdminMensajeriaRoute
  AdminConfiguracionRoute: typeof AdminConfiguracionRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute,
  LoginRoute,
  EstudianteDashboardRoute,
  EstudianteMatriculaRoute,
  EstudianteNotasRoute,
  EstudiantePagosRoute,
  EstudianteBibliotecaRoute,
  EstudianteMensajeriaRoute,
  DocenteDashboardRoute,
  DocenteCursosRoute,
  DocenteNotasRoute,
  DocenteAsistenciaRoute,
  DocenteMensajeriaRoute,
  DocenteMaterialesRoute,
  AdminDashboardRoute,
  AdminReportesRoute,
  AdminUsuariosRoute,
  AdminCursosRoute,
  AdminMensajeriaRoute,
  AdminConfiguracionRoute,
}

export const routeTree = rootRouteImport._addFileChildren(rootRouteChildren)._addFileTypes<FileRoutesByFullPath>()
