import { 
  Alumno, 
  Personal, 
  SolicitudAdmision, 
  Cuota, 
  PagoCuota, 
  ReciboSueldo,
  Evaluacion,
  Calificacion,
  InformeTrimestralInicial,
  AsistenciaDia,
  RegistroAsistencia,
  ActaAccidente,
  Licencia,
  Mensaje,
  Usuario,
  UserRole,
  ApplicationStatus,
  CourseType,
  ShiftType,
  AspiranteFamiliar,
  InternetConnectivity,
  NivelAcademico,
  LaborCondition,
  CargoPersonal,
  PersonnelStatus,
  AttendanceStatus,
  LicenciaType,
  ActaStatus,
  RelationType,
  Trimestre
} from '@/types/entities';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

// Verificamos que la URL de la API esté configurada correctamente
console.log('API_BASE_URL:', API_BASE_URL);

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    let token;
    
    // Verificamos si estamos en el navegador antes de acceder a localStorage
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('authToken');
    }
    
    try {
      console.log(`Realizando solicitud a: ${url}`);
      
      // Evitamos imprimir el cuerpo completo de la solicitud para no saturar la consola
      const optionsLog = { ...options };
      if (optionsLog.body) {
        optionsLog.body = 'BODY_CONTENT_OMITTED';
      }
      console.log('Opciones:', JSON.stringify(optionsLog, null, 2));
      
      const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options?.headers,
      };
      
      const requestOptions = {
        ...options,
        headers,
        mode: 'cors' as RequestMode,
      };
      
      const response = await fetch(url, requestOptions);
  
      if (!response.ok) {
        let errorText = '';
        try {
          errorText = await response.text();
        } catch (e) {
          errorText = 'No se pudo obtener el texto del error';
        }
        
        console.error(`Error en la respuesta: ${response.status}`, errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }
  
      let data;
      try {
        data = await response.json();
        console.log('Respuesta recibida:', data);
      } catch (e) {
        console.error('Error al parsear la respuesta JSON:', e);
        throw new Error('Error al parsear la respuesta del servidor');
      }
      
      return data;
    } catch (error) {
      console.error('Error en la solicitud:', error);
      throw error;
    }
  }

  // Autenticación
  async login(email: string, password: string): Promise<{ token: string; usuario: Usuario }> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async validateEmail(email: string): Promise<{ valid: boolean }> {
    return this.request('/auth/validate-email', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // Gestión de Alumnos
  async getSolicitudesAdmision(): Promise<SolicitudAdmision[]> {
    return this.request('/solicitudes-admision');
  }

  async createSolicitudAdmision(solicitud: Partial<SolicitudAdmision> & { familiares?: AspiranteFamiliar[] }): Promise<SolicitudAdmision> {
    try {
      // Extraemos los familiares del objeto solicitud para manejarlos por separado
      const { familiares, ...solicitudData } = solicitud;
      
      // Preparamos los datos para enviar
      const dataToSend = {
        ...solicitudData,
        // Incluimos información sobre los familiares para que el backend pueda procesarlos
        familiares: familiares || []
      };
      
      console.log('API Service - Enviando solicitud a /solicitudes-admision');
      
      // Enviamos la solicitud de admisión
      return this.request('/solicitudes-admision', {
        method: 'POST',
        body: JSON.stringify(dataToSend),
      });
    } catch (error) {
      console.error('Error en createSolicitudAdmision:', error);
      throw error;
    }
  }

  async updateSolicitudAdmision(id: number, solicitud: Partial<SolicitudAdmision>): Promise<SolicitudAdmision> {
    return this.request(`/solicitudes-admision/${id}`, {
      method: 'PUT',
      body: JSON.stringify(solicitud),
    });
  }

  async getAlumnos(): Promise<Alumno[]> {
    return this.request('/alumnos');
  }

  async getAlumnoById(id: number): Promise<Alumno> {
    return this.request(`/alumnos/${id}`);
  }

  async createAlumno(alumno: Partial<Alumno>): Promise<Alumno> {
    return this.request('/alumnos', {
      method: 'POST',
      body: JSON.stringify(alumno),
    });
  }

  async updateAlumno(id: number, alumno: Partial<Alumno>): Promise<Alumno> {
    return this.request(`/alumnos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(alumno),
    });
  }

  async solicitarBajaAlumno(id: number): Promise<void> {
    return this.request(`/alumnos/${id}/solicitar-baja`, {
      method: 'POST',
    });
  }

  async procesarBajaAlumno(id: number, aceptar: boolean, motivo?: string): Promise<void> {
    return this.request(`/alumnos/${id}/procesar-baja`, {
      method: 'POST',
      body: JSON.stringify({ aceptar, motivo }),
    });
  }

  // Gestión de Personal
  async getPersonal(): Promise<Personal[]> {
    return this.request('/personal');
  }

  async getPersonalById(id: number): Promise<Personal> {
    return this.request(`/personal/${id}`);
  }

  async createPersonal(personal: Partial<Personal>): Promise<Personal> {
    return this.request('/personal', {
      method: 'POST',
      body: JSON.stringify(personal),
    });
  }

  async updatePersonal(id: number, personal: Partial<Personal>): Promise<Personal> {
    return this.request(`/personal/${id}`, {
      method: 'PUT',
      body: JSON.stringify(personal),
    });
  }

  async getLicencias(): Promise<Licencia[]> {
    return this.request('/licencias');
  }

  async createLicencia(licencia: Partial<Licencia>): Promise<Licencia> {
    return this.request('/licencias', {
      method: 'POST',
      body: JSON.stringify(licencia),
    });
  }

  // Pagos
  async getCuotas(): Promise<Cuota[]> {
    return this.request('/cuotas');
  }

  async createCuota(cuota: Partial<Cuota>): Promise<Cuota> {
    return this.request('/cuotas', {
      method: 'POST',
      body: JSON.stringify(cuota),
    });
  }

  async getPagosCuota(): Promise<PagoCuota[]> {
    return this.request('/pagos-cuota');
  }

  async createPagoCuota(pago: Partial<PagoCuota>): Promise<PagoCuota> {
    return this.request('/pagos-cuota', {
      method: 'POST',
      body: JSON.stringify(pago),
    });
  }

  async getRecibosSueldo(): Promise<ReciboSueldo[]> {
    return this.request('/recibos-sueldo');
  }

  async confirmarRecepcionSueldo(id: number): Promise<void> {
    return this.request(`/recibos-sueldo/${id}/confirmar`, {
      method: 'POST',
    });
  }

  // Evaluaciones
  async getEvaluaciones(): Promise<Evaluacion[]> {
    return this.request('/evaluaciones');
  }

  async createEvaluacion(evaluacion: Partial<Evaluacion>): Promise<Evaluacion> {
    return this.request('/evaluaciones', {
      method: 'POST',
      body: JSON.stringify(evaluacion),
    });
  }

  async getCalificaciones(): Promise<Calificacion[]> {
    return this.request('/calificaciones');
  }

  async updateCalificacion(id: number, calificacion: Partial<Calificacion>): Promise<Calificacion> {
    return this.request(`/calificaciones/${id}`, {
      method: 'PUT',
      body: JSON.stringify(calificacion),
    });
  }

  async getInformesTrimestrales(): Promise<InformeTrimestralInicial[]> {
    return this.request('/informes-trimestrales');
  }

  async updateInformeTrimestral(id: number, informe: Partial<InformeTrimestralInicial>): Promise<InformeTrimestralInicial> {
    return this.request(`/informes-trimestrales/${id}`, {
      method: 'PUT',
      body: JSON.stringify(informe),
    });
  }

  // Asistencia
  async getAsistenciasDia(): Promise<AsistenciaDia[]> {
    return this.request('/asistencias-dia');
  }

  async createAsistenciaDia(asistencia: Partial<AsistenciaDia>): Promise<AsistenciaDia> {
    return this.request('/asistencias-dia', {
      method: 'POST',
      body: JSON.stringify(asistencia),
    });
  }

  async updateRegistroAsistencia(id: number, registro: Partial<RegistroAsistencia>): Promise<RegistroAsistencia> {
    return this.request(`/registros-asistencia/${id}`, {
      method: 'PUT',
      body: JSON.stringify(registro),
    });
  }

  // Actas de Accidente
  async getActasAccidente(): Promise<ActaAccidente[]> {
    return this.request('/actas-accidente');
  }

  async createActaAccidente(acta: Partial<ActaAccidente>): Promise<ActaAccidente> {
    return this.request('/actas-accidente', {
      method: 'POST',
      body: JSON.stringify(acta),
    });
  }

  async updateActaAccidente(id: number, acta: Partial<ActaAccidente>): Promise<ActaAccidente> {
    return this.request(`/actas-accidente/${id}`, {
      method: 'PUT',
      body: JSON.stringify(acta),
    });
  }

  // Comunicación
  async getMensajes(): Promise<Mensaje[]> {
    return this.request('/mensajes');
  }

  async sendMensaje(mensaje: Partial<Mensaje>): Promise<Mensaje> {
    return this.request('/mensajes', {
      method: 'POST',
      body: JSON.stringify(mensaje),
    });
  }

  async markMensajeAsRead(id: number): Promise<void> {
    return this.request(`/mensajes/${id}/marcar-leido`, {
      method: 'POST',
    });
  }

  // Reportes
  async generateReportePDF(tipo: string, filtros: any): Promise<Blob> {
    const response = await fetch(`${API_BASE_URL}/reportes/${tipo}/pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
      body: JSON.stringify(filtros),
    });

    if (!response.ok) {
      throw new Error(`Error generating report: ${response.status}`);
    }

    return response.blob();
  }
}

export const apiService = new ApiService();