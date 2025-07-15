'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Download, 
  Calendar, 
  GraduationCap, 
  Users, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  X
} from 'lucide-react';

export default function ReportesPage() {
  const [selectedTab, setSelectedTab] = useState('boletines');
  const [selectedSection, setSelectedSection] = useState('');
  const [fechaDesde, setFechaDesde] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');

  const [secciones] = useState([
    '3° A', '3° B', '4° A', '4° B', '5° A', '5° B', '6° A', '6° B',
    'Sala 3', 'Sala 4', 'Sala 5'
  ]);

  const [boletines] = useState([
    {
      id: 1,
      nombre: 'Juan Pérez',
      seccion: '4° A',
      promedioGeneral: 8.5,
      asistencia: 92,
      inasistencias: 3,
      estado: 'Promociona'
    },
    {
      id: 2,
      nombre: 'María González',
      seccion: '4° A',
      promedioGeneral: 7.2,
      asistencia: 88,
      inasistencias: 5,
      estado: 'Promociona'
    },
    {
      id: 3,
      nombre: 'Carlos López',
      seccion: '4° A',
      promedioGeneral: 6.8,
      asistencia: 85,
      inasistencias: 7,
      estado: 'No Promociona'
    }
  ]);

  const [estadisticasAprobacion] = useState({
    totalMaterias: 240,
    materiasAprobadas: 210,
    materiasDesaprobadas: 30,
    materiaConMasFallos: 'Matemática',
    alumnosConMaterias: 12
  });

  const [asistenciasAlumnos] = useState([
    {
      id: 1,
      nombre: 'Juan Pérez',
      seccion: '4° A',
      diasAsistidos: 18,
      inasistencias: 2,
      justificadas: 1,
      injustificadas: 1,
      porcentaje: 90
    },
    {
      id: 2,
      nombre: 'María González',
      seccion: '4° A',
      diasAsistidos: 17,
      inasistencias: 3,
      justificadas: 2,
      injustificadas: 1,
      porcentaje: 85
    }
  ]);

  const [actas] = useState([
    {
      id: 1,
      alumno: 'Pedro Martínez',
      docente: 'Prof. Ana López',
      fecha: '2025-01-18',
      hora: '10:30',
      descripcion: 'Caída en el recreo',
      firmada: true
    },
    {
      id: 2,
      alumno: 'Sofía Ramírez',
      docente: 'Maestra Clara',
      fecha: '2025-01-15',
      hora: '14:15',
      descripcion: 'Golpe en la cabeza',
      firmada: false
    }
  ]);

  const porcentajeAprobacion = Math.round((estadisticasAprobacion.materiasAprobadas / estadisticasAprobacion.totalMaterias) * 100);

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Reportes</h2>
            <p className="text-muted-foreground">
              Genere reportes detallados y exportables en PDF
            </p>
          </div>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Exportar PDF
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="boletines">Boletines</TabsTrigger>
            <TabsTrigger value="aprobacion">Aprobación</TabsTrigger>
            <TabsTrigger value="asistencias">Asistencias</TabsTrigger>
            <TabsTrigger value="inasistencias">Inasistencias</TabsTrigger>
            <TabsTrigger value="actas">Actas</TabsTrigger>
          </TabsList>

          <TabsContent value="boletines" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Reporte de Boletines
                </CardTitle>
                <CardDescription>
                  Resumen académico individualizado por estudiante
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="seccion">Sección</Label>
                      <Select value={selectedSection} onValueChange={setSelectedSection}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione una sección" />
                        </SelectTrigger>
                        <SelectContent>
                          {secciones.map((seccion) => (
                            <SelectItem key={seccion} value={seccion}>
                              {seccion}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {selectedSection && (
                    <div className="mt-6">
                      <h4 className="font-medium mb-4">Alumnos de {selectedSection}</h4>
                      <div className="space-y-3">
                        {boletines.map((alumno) => (
                          <div key={alumno.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-4">
                              <div>
                                <p className="font-medium">{alumno.nombre}</p>
                                <p className="text-sm text-gray-600">{alumno.seccion}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-6">
                              <div className="text-center">
                                <p className="text-sm font-medium">Promedio</p>
                                <p className="text-lg">{alumno.promedioGeneral}</p>
                              </div>
                              <div className="text-center">
                                <p className="text-sm font-medium">Asistencia</p>
                                <p className="text-lg">{alumno.asistencia}%</p>
                              </div>
                              <div className="text-center">
                                <Badge variant={alumno.estado === 'Promociona' ? 'default' : 'destructive'}>
                                  {alumno.estado}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="aprobacion" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                    Aprobación General
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      {porcentajeAprobacion}%
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {estadisticasAprobacion.materiasAprobadas} de {estadisticasAprobacion.totalMaterias} materias
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-orange-600" />
                    Materia Crítica
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">
                      {estadisticasAprobacion.materiaConMasFallos}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Mayor cantidad de desaprobaciones
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-red-600" />
                    Alumnos con Materias
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">
                      {estadisticasAprobacion.alumnosConMaterias}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Alumnos que adeudan materias
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="asistencias" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Reporte de Asistencias de Alumnos
                </CardTitle>
                <CardDescription>
                  Análisis detallado de asistencia por período
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="desde">Desde</Label>
                      <Input
                        id="desde"
                        type="date"
                        value={fechaDesde}
                        onChange={(e) => setFechaDesde(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="hasta">Hasta</Label>
                      <Input
                        id="hasta"
                        type="date"
                        value={fechaHasta}
                        onChange={(e) => setFechaHasta(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="seccion-asistencia">Sección</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione sección" />
                        </SelectTrigger>
                        <SelectContent>
                          {secciones.map((seccion) => (
                            <SelectItem key={seccion} value={seccion}>
                              {seccion}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-medium mb-4">Detalle de Asistencias</h4>
                    <div className="space-y-3">
                      {asistenciasAlumnos.map((alumno) => (
                        <div key={alumno.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">{alumno.nombre}</p>
                            <p className="text-sm text-gray-600">{alumno.seccion}</p>
                          </div>
                          <div className="flex items-center space-x-6">
                            <div className="text-center">
                              <p className="text-sm font-medium">Días Asistidos</p>
                              <p className="text-lg">{alumno.diasAsistidos}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-medium">Inasistencias</p>
                              <p className="text-lg">{alumno.inasistencias}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-medium">Justificadas</p>
                              <p className="text-lg text-green-600">{alumno.justificadas}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-medium">Porcentaje</p>
                              <p className="text-lg font-bold">{alumno.porcentaje}%</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inasistencias" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Reporte de Inasistencias de Profesores</CardTitle>
                <CardDescription>
                  Seguimiento de ausentismo docente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Funcionalidad en desarrollo</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="actas" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Reporte de Actas
                </CardTitle>
                <CardDescription>
                  Registro de actas de accidentes y incidentes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="desde-actas">Desde</Label>
                      <Input
                        id="desde-actas"
                        type="date"
                        value={fechaDesde}
                        onChange={(e) => setFechaDesde(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="hasta-actas">Hasta</Label>
                      <Input
                        id="hasta-actas"
                        type="date"
                        value={fechaHasta}
                        onChange={(e) => setFechaHasta(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="seccion-actas">Sección</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Todas las secciones" />
                        </SelectTrigger>
                        <SelectContent>
                          {secciones.map((seccion) => (
                            <SelectItem key={seccion} value={seccion}>
                              {seccion}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="nivel-actas">Nivel</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Todos los niveles" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inicial">Inicial</SelectItem>
                          <SelectItem value="primario">Primario</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-center font-medium text-blue-800">
                      Total de actas encontradas: {actas.length}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {actas.map((acta) => (
                      <div key={acta.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{acta.alumno}</p>
                          <p className="text-sm text-gray-600">{acta.docente}</p>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <p className="text-sm font-medium">Fecha</p>
                            <p className="text-sm">{acta.fecha}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium">Hora</p>
                            <p className="text-sm">{acta.hora}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium">Estado</p>
                            <Badge variant={acta.firmada ? 'default' : 'destructive'}>
                              {acta.firmada ? (
                                <CheckCircle className="h-3 w-3 mr-1" />
                              ) : (
                                <X className="h-3 w-3 mr-1" />
                              )}
                              {acta.firmada ? 'Firmada' : 'Pendiente'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}