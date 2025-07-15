// Tipos base
export interface BaseEntity {
  id: number;
  fechaCreacion: string;
  fechaActualizacion: string;
  fechaBaja?: string;
  estadoBaja: BajaStatus;
}

export interface Persona extends BaseEntity {
  nombre: string;
  apellido: string;
  dni: string;
  fechaNacimiento: string;
  genero: string;
  estadoCivil: string;
  nacionalidad: string;
  domicilio: string;
  telefono: string;
  celular: string;
  emailContacto: string;
  fotoPerfilUrl?: string;
}

// Enums
export enum BajaStatus {
  ACTIVO = 'ACTIVO',
  BAJA_SOLICITADA = 'BAJA_SOLICITADA',
  BAJA_CONFIRMADA = 'BAJA_CONFIRMADA'
}

export enum UserRole {
  DIRECCION = 'DIRECCION',
  ADMINISTRACION = 'ADMINISTRACION',
  DOCENTE = 'DOCENTE',
  FAMILIA = 'FAMILIA',
  ALUMNO = 'ALUMNO'
}

export enum ApplicationStatus {
  PENDIENTE = 'PENDIENTE',
  EN_REVISION = 'EN_REVISION',
  ENTREVISTA_PROGRAMADA = 'ENTREVISTA_PROGRAMADA',
  ENTREVISTA_REALIZADA = 'ENTREVISTA_REALIZADA',
  ACEPTADO = 'ACEPTADO',
  RECHAZADO = 'RECHAZADO'
}

export enum CourseType {
  SALA_3 = 'SALA_3',
  SALA_4 = 'SALA_4',
  SALA_5 = 'SALA_5',
  PRIMER_GRADO = 'PRIMER_GRADO',
  SEGUNDO_GRADO = 'SEGUNDO_GRADO',
  TERCER_GRADO = 'TERCER_GRADO',
  CUARTO_GRADO = 'CUARTO_GRADO',
  QUINTO_GRADO = 'QUINTO_GRADO',
  SEXTO_GRADO = 'SEXTO_GRADO'
}

export enum ShiftType {
  MANANA = 'MANANA',
  TARDE = 'TARDE'
}

export enum InternetConnectivity {
  FIBRA_OPTICA = 'FIBRA_OPTICA',
  ADSL = 'ADSL',
  CABLE = 'CABLE',
  DATOS_MOVILES = 'DATOS_MOVILES',
  SIN_CONEXION = 'SIN_CONEXION'
}

export enum NivelAcademico {
  INICIAL = 'INICIAL',
  PRIMARIO = 'PRIMARIO'
}

export enum LaborCondition {
  PRINCIPAL = 'PRINCIPAL',
  SUPLENTE = 'SUPLENTE',
  INTERINO = 'INTERINO'
}

export enum CargoPersonal {
  MAESTRO = 'MAESTRO',
  PROFESOR = 'PROFESOR',
  DIRECTIVO = 'DIRECTIVO',
  ADMINISTRATIVO = 'ADMINISTRATIVO',
  MAESTRANZA = 'MAESTRANZA'
}

export enum PersonnelStatus {
  ACTIVO = 'ACTIVO',
  LICENCIA = 'LICENCIA',
  BAJA = 'BAJA'
}

export enum AttendanceStatus {
  PRESENTE = 'PRESENTE',
  AUSENTE = 'AUSENTE',
  TARDANZA = 'TARDANZA'
}

export enum LicenciaType {
  ENFERMEDAD = 'ENFERMEDAD',
  PERSONAL = 'PERSONAL',
  CUIDADO_FAMILIAR = 'CUIDADO_FAMILIAR',
  FORMACION = 'FORMACION',
  MATERNIDAD = 'MATERNIDAD'
}

export enum ActaStatus {
  PENDIENTE_FIRMA = 'PENDIENTE_FIRMA',
  FIRMADA = 'FIRMADA'
}

export enum RelationType {
  PADRE = 'PADRE',
  MADRE = 'MADRE',
  TUTOR = 'TUTOR',
  ABUELO = 'ABUELO',
  ABUELA = 'ABUELA',
  TIO = 'TIO',
  TIA = 'TIA',
  HERMANO = 'HERMANO',
  HERMANA = 'HERMANA'
}

export enum Trimestre {
  PRIMERO = 'PRIMERO',
  SEGUNDO = 'SEGUNDO',
  TERCERO = 'TERCERO'
}

// Entidades principales
export interface Alumno extends Persona {
  legajoAlumno: string;
  fechaInscripcion: string;
  seccionActual: Seccion;
  observacionesGenerales?: string;
  motivoRechazoBaja?: string;
  familiares: AlumnoFamiliar[];
}

export interface Personal extends Persona {
  legajoPersonal: string;
  fechaIngreso: string;
  condicionLaboral: LaborCondition;
  cargo: CargoPersonal;
  situacionActual: PersonnelStatus;
  antecedentesLaborales?: string;
  observacionesGenerales?: string;
  materiasImpartidas: Materia[];
  seccionesAsignadas: Seccion[];
  formacionesAcademicas: FormacionAcademica[];
  licencias: Licencia[];
  actasAccidenteReportadas: ActaAccidente[];
}

export interface Familiar extends Persona {
  lugarTrabajo?: string;
  ocupacion?: string;
  alumnosAsociados: AlumnoFamiliar[];
}

export interface Aspirante extends Persona {
  cursoSolicitado: CourseType;
  turnoPreferido: ShiftType;
  escuelaActual?: string;
  conectividadInternet: InternetConnectivity;
  dispositivosDisponibles?: string;
  idiomasHabladosHogar?: string;
  enfermedadesAlergias?: string;
  medicacionHabitual?: string;
  limitacionesFisicasNeurologicas?: string;
  tratamientosTerapeuticos?: string;
  usoAyudasMovilidad?: boolean;
  coberturaMedica?: string;
  observacionesAdicionalesSalud?: string;
}

export interface Usuario extends BaseEntity {
  email: string;
  password: string;
  rol: UserRole;
  persona: Persona;
}

export interface SolicitudAdmision extends BaseEntity {
  aspirante: Aspirante;
  estado: ApplicationStatus;
  motivoRechazo?: string;
  fechasTentativasEntrevista: string[];
  fechaEntrevistaConfirmada?: string;
  emailConfirmacionEnviado: boolean;
  entrevistaRealizada: boolean;
  autorizadoComunicacionesEmail: boolean;
}

export interface Materia extends BaseEntity {
  nombre: string;
  nivelAcademico: NivelAcademico;
  docentes: Personal[];
  secciones: Seccion[];
  evaluaciones: Evaluacion[];
}

export interface Seccion extends BaseEntity {
  nombre: string;
  nivelAcademico: NivelAcademico;
  grado: number;
  turno: ShiftType;
  alumnos: Alumno[];
  materias: Materia[];
  docentesAsignados: Personal[];
}

export interface Mensaje extends BaseEntity {
  remitente: Usuario;
  destinatario: Usuario;
  contenido: string;
  leido: boolean;
}

export interface PagoCuota extends BaseEntity {
  cuota: Cuota;
  alumno: Alumno;
  fechaPago: string;
  montoPagado: number;
  codigoPagoReferencia: string;
  comprobanteUrl?: string;
}

export interface Cuota extends BaseEntity {
  concepto: string;
  montoBase: number;
  fechaVencimiento: string;
  porcentajeRecargoPorMora: number;
  esMatricula: boolean;
  seccionesAplicables: Seccion[];
  pagos: PagoCuota[];
}

export interface DiaNoHabil extends BaseEntity {
  fecha: string;
  descripcion: string;
  notificacionEnviada: boolean;
}

export interface Evaluacion extends BaseEntity {
  materia: Materia;
  titulo: string;
  fechaEvaluacion: string;
  descripcionTemas: string;
  trimestre: Trimestre;
}

export interface Calificacion extends BaseEntity {
  alumno: Alumno;
  evaluacion: Evaluacion;
  nota: number;
  observacionDocente?: string;
  editable: boolean;
}

export interface Licencia extends BaseEntity {
  personal: Personal;
  fechaInicio: string;
  fechaFin: string;
  motivo: string;
  justificada: boolean;
  horasAusencia: number;
  tipoLicencia: LicenciaType;
}

export interface ReciboSueldo extends BaseEntity {
  personal: Personal;
  fechaEmision: string;
  periodo: string;
  montoNeto: number;
  comprobanteUrl?: string;
  confirmadoRecepcion: boolean;
}

export interface ActaAccidente extends BaseEntity {
  alumno: Alumno;
  docenteResponsable: Personal;
  fechaSuceso: string;
  horaSuceso: string;
  descripcionSuceso: string;
  lugarSuceso: string;
  accionesRealizadas: string;
  estadoActa: ActaStatus;
  urlFirmaDigital?: string;
}

export interface FormacionAcademica extends BaseEntity {
  personal: Personal;
  titulo: string;
  institucion: string;
  fechaObtencion?: string;
  especializaciones?: string;
  cursosRealizados?: string;
}

export interface AsistenciaDia extends BaseEntity {
  fecha: string;
  seccion: Seccion;
  docenteQueRegistro: Personal;
  registros: RegistroAsistencia[];
  editable: boolean;
}

export interface RegistroAsistencia extends BaseEntity {
  asistenciaDia: AsistenciaDia;
  alumno: Alumno;
  estadoAsistencia: AttendanceStatus;
  observacion?: string;
}

export interface InformeTrimestralInicial extends BaseEntity {
  alumno: Alumno;
  docente: Personal;
  trimestre: Trimestre;
  descripcionDesarrollo: string;
  fechaCierreTrimestre?: string;
  publicadoParaFamilias: boolean;
}

// Entidades de relación
export interface AlumnoFamiliar {
  id: number;
  alumno: Alumno;
  familiar: Familiar;
  tipoRelacion: RelationType;
  viveConAlumno: boolean;
}

export interface AspiranteFamiliar {
  id: number;
  aspirante: Aspirante;
  familiar: Familiar;
  tipoRelacion: RelationType;
  viveConAlumno: boolean;
}