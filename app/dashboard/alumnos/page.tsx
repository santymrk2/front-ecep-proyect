'use client';

import { useState } from 'react';
import { 
  SolicitudAdmision, 
  Alumno, 
  ApplicationStatus, 
  CourseType, 
  BajaStatus 
} from '@/types/entities';
import { apiService } from '@/services/api';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Users, 
  Search, 
  UserPlus, 
  Calendar,
  Mail,
  Phone,
  MapPin,
  FileText,
  CheckCircle,
  Clock,
  X
} from 'lucide-react';

export default function AlumnosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('aspirantes');

  const [aspirantes] = useState<SolicitudAdmision[]>([
    {
      id: 1,
      aspirante: {
        id: 1,
        nombre: 'María',
        apellido: 'González',
        dni: '12345678',
        cursoSolicitado: CourseType.TERCER_GRADO,
        emailContacto: 'maria.gonzalez@email.com',
        telefono: '11-1234-5678'
      } as any,
      estado: ApplicationStatus.PENDIENTE,
      fechaCreacion: '2025-01-15T10:00:00',
      emailConfirmacionEnviado: false,
      entrevistaRealizada: false,
    },
    {
      id: 2,
      aspirante: {
        id: 2,
        nombre: 'Carlos',
        apellido: 'Rodríguez',
        dni: '87654321',
        cursoSolicitado: CourseType.SALA_4,
        emailContacto: 'carlos.rodriguez@email.com',
        telefono: '11-9876-5432'
      } as any,
      estado: ApplicationStatus.ENTREVISTA_PROGRAMADA,
      fechaCreacion: '2025-01-12T14:30:00',
      emailConfirmacionEnviado: true,
      entrevistaRealizada: false,
    },
    {
      id: 3,
      aspirante: {
        id: 3,
        nombre: 'Ana',
        apellido: 'Martínez',
        dni: '11223344',
        cursoSolicitado: CourseType.PRIMER_GRADO,
        emailContacto: 'ana.martinez@email.com',
        telefono: '11-5555-1234'
      } as any,
      estado: ApplicationStatus.ACEPTADO,
      fechaCreacion: '2025-01-10T09:15:00',
      emailConfirmacionEnviado: true,
      entrevistaRealizada: true,
    }
  ] as SolicitudAdmision[]);

  const [alumnos] = useState<Alumno[]>([
    {
      id: 1,
      nombre: 'Juan',
      apellido: 'Pérez',
      dni: '12345678',
      fechaNacimiento: '2015-05-15',
      genero: 'Masculino',
      estadoCivil: 'Soltero',
      nacionalidad: 'Argentina',
      domicilio: 'Av. Rivadavia 1234',
      telefono: '11-1234-5678',
      celular: '11-1234-5678',
      emailContacto: 'juan.perez@email.com',
      fechaCreacion: '2022-03-01',
      fechaActualizacion: '2022-03-01',
      legajoAlumno: 'ALU-2022-001',
      fechaInscripcion: '2022-03-01',
      seccionActual: {
        id: 1,
        nombre: '4° A',
        fechaCreacion: '2022-01-01',
        fechaActualizacion: '2022-01-01',
        estadoBaja: BajaStatus.ACTIVO
      } as any,
      estadoBaja: BajaStatus.ACTIVO,
      familiares: []
    },
    {
      id: 2,
      nombre: 'Sofía',
      apellido: 'Ramírez',
      dni: '87654321',
      fechaNacimiento: '2018-08-20',
      genero: 'Femenino',
      estadoCivil: 'Soltera',
      nacionalidad: 'Argentina',
      domicilio: 'Calle San Martín 567',
      telefono: '11-8765-4321',
      celular: '11-8765-4321',
      emailContacto: 'sofia.ramirez@email.com',
      fechaCreacion: '2023-03-01',
      fechaActualizacion: '2023-03-01',
      legajoAlumno: 'ALU-2023-002',
      fechaInscripcion: '2023-03-01',
      seccionActual: {
        id: 2,
        nombre: 'Sala 5',
        fechaCreacion: '2023-01-01',
        fechaActualizacion: '2023-01-01',
        estadoBaja: BajaStatus.ACTIVO
      } as any,
      estadoBaja: BajaStatus.ACTIVO,
      familiares: []
    }
  ] as Alumno[]);

  const getEstadoBadge = (estado: ApplicationStatus) => {
    switch (estado) {
      case ApplicationStatus.PENDIENTE:
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pendiente</Badge>;
      case ApplicationStatus.ENTREVISTA_PROGRAMADA:
        return <Badge variant="outline"><Calendar className="h-3 w-3 mr-1" />Entrevista</Badge>;
      case ApplicationStatus.ACEPTADO:
        return <Badge variant="default"><CheckCircle className="h-3 w-3 mr-1" />Aceptado</Badge>;
      case ApplicationStatus.RECHAZADO:
        return <Badge variant="destructive"><X className="h-3 w-3 mr-1" />Rechazado</Badge>;
      default:
        return <Badge variant="secondary">{estado}</Badge>;
    }
  };

  const getCourseTypeLabel = (courseType: CourseType): string => {
    const labels = {
      [CourseType.SALA_3]: 'Sala 3',
      [CourseType.SALA_4]: 'Sala 4',
      [CourseType.SALA_5]: 'Sala 5',
      [CourseType.PRIMER_GRADO]: '1° Grado',
      [CourseType.SEGUNDO_GRADO]: '2° Grado',
      [CourseType.TERCER_GRADO]: '3° Grado',
      [CourseType.CUARTO_GRADO]: '4° Grado',
      [CourseType.QUINTO_GRADO]: '5° Grado',
      [CourseType.SEXTO_GRADO]: '6° Grado'
    };
    return labels[courseType] || courseType;
  };

  const filteredAspirantes = aspirantes.filter(aspirante =>
    `${aspirante.aspirante.nombre} ${aspirante.aspirante.apellido}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getCourseTypeLabel(aspirante.aspirante.cursoSolicitado).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAlumnos = alumnos.filter(alumno =>
    `${alumno.nombre} ${alumno.apellido}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alumno.seccionActual.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Gestión de Alumnos</h2>
            <p className="text-muted-foreground">
              Administre aspirantes, alumnos activos y gestión familiar
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Alta Manual
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por nombre o curso..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="aspirantes">Aspirantes</TabsTrigger>
            <TabsTrigger value="alumnos">Alumnos Activos</TabsTrigger>
            <TabsTrigger value="historial">Historial</TabsTrigger>
          </TabsList>

          <TabsContent value="aspirantes" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredAspirantes.map((solicitud) => (
                <Card key={solicitud.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        {solicitud.aspirante.nombre} {solicitud.aspirante.apellido}
                      </CardTitle>
                      {getEstadoBadge(solicitud.estado)}
                    </div>
                    <CardDescription>
                      {getCourseTypeLabel(solicitud.aspirante.cursoSolicitado)} - Postulación: {new Date(solicitud.fechaCreacion).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      {solicitud.aspirante.emailContacto}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      {solicitud.aspirante.telefono}
                    </div>
                    
                    <div className="flex space-x-2 pt-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="flex-1">
                            <FileText className="h-4 w-4 mr-2" />
                            Ver Detalles
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Postulación de {solicitud.aspirante.nombre} {solicitud.aspirante.apellido}</DialogTitle>
                            <DialogDescription>
                              Información completa del aspirante
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium">Datos del Aspirante</h4>
                                <p className="text-sm text-gray-600">Nombre: {solicitud.aspirante.nombre} {solicitud.aspirante.apellido}</p>
                                <p className="text-sm text-gray-600">Curso: {getCourseTypeLabel(solicitud.aspirante.cursoSolicitado)}</p>
                                <p className="text-sm text-gray-600">DNI: {solicitud.aspirante.dni}</p>
                              </div>
                              <div>
                                <h4 className="font-medium">Datos Familiares</h4>
                                <p className="text-sm text-gray-600">Email: {solicitud.aspirante.emailContacto}</p>
                                <p className="text-sm text-gray-600">Teléfono: {solicitud.aspirante.telefono}</p>
                                <p className="text-sm text-gray-600">Domicilio: Calle 123, Pilar</p>
                              </div>
                            </div>
                            
                            {solicitud.estado === ApplicationStatus.PENDIENTE && (
                              <div className="flex space-x-2 pt-4">
                                <Button variant="outline" className="flex-1">
                                  <X className="h-4 w-4 mr-2" />
                                  Rechazar
                                </Button>
                                <Button className="flex-1">
                                  <Calendar className="h-4 w-4 mr-2" />
                                  Programar Cita
                                </Button>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="alumnos" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredAlumnos.map((alumno) => (
                <Card key={alumno.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{alumno.nombre} {alumno.apellido}</CardTitle>
                      <Badge variant="default">Activo</Badge>
                    </div>
                    <CardDescription>
                      {alumno.seccionActual.nombre} - DNI: {alumno.dni}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <FileText className="h-4 w-4 mr-2" />
                      Legajo: {alumno.legajoAlumno}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      Ingreso: {new Date(alumno.fechaInscripcion).toLocaleDateString()}
                    </div>
                    
                    <div className="flex space-x-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <FileText className="h-4 w-4 mr-2" />
                        Ver Perfil
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="historial" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Historial de Alumnos</CardTitle>
                <CardDescription>
                  Registro de alumnos egresados y dados de baja
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No hay registros en el historial</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}