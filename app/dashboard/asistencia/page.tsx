'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Calendar, Users, CheckCircle, X, Plus, BarChart3, FileText } from 'lucide-react';

export default function AsistenciaPage() {
  const [selectedTab, setSelectedTab] = useState('tomar');

  const [secciones] = useState([
    {
      id: 1,
      nombre: '4° A',
      totalAlumnos: 25,
      promedio: 92.5,
      ultimaAsistencia: '2025-01-20'
    },
    {
      id: 2,
      nombre: 'Sala 5',
      totalAlumnos: 20,
      promedio: 88.2,
      ultimaAsistencia: '2025-01-19'
    },
    {
      id: 3,
      nombre: '3° B',
      totalAlumnos: 23,
      promedio: 95.1,
      ultimaAsistencia: '2025-01-20'
    }
  ]);

  const [historialAsistencia] = useState([
    {
      id: 1,
      fecha: '2025-01-20',
      seccion: '4° A',
      presentes: 23,
      ausentes: 2,
      porcentaje: 92
    },
    {
      id: 2,
      fecha: '2025-01-19',
      seccion: '4° A',
      presentes: 24,
      ausentes: 1,
      porcentaje: 96
    },
    {
      id: 3,
      fecha: '2025-01-18',
      seccion: '4° A',
      presentes: 22,
      ausentes: 3,
      porcentaje: 88
    }
  ]);

  const [alumnos] = useState([
    { id: 1, nombre: 'Juan Pérez', asistencia: 95, inasistencias: 2 },
    { id: 2, nombre: 'María González', asistencia: 88, inasistencias: 5 },
    { id: 3, nombre: 'Carlos López', asistencia: 92, inasistencias: 3 },
    { id: 4, nombre: 'Ana Martínez', asistencia: 97, inasistencias: 1 }
  ]);

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Asistencia</h2>
            <p className="text-muted-foreground">
              Control de asistencia y seguimiento académico
            </p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="tomar">Tomar Asistencia</TabsTrigger>
            <TabsTrigger value="historial">Historial</TabsTrigger>
            <TabsTrigger value="reportes">Reportes</TabsTrigger>
          </TabsList>

          <TabsContent value="tomar" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {secciones.map((seccion) => (
                <Card key={seccion.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{seccion.nombre}</CardTitle>
                      <Badge variant="secondary">
                        {seccion.totalAlumnos} alumnos
                      </Badge>
                    </div>
                    <CardDescription>
                      Promedio: {seccion.promedio}% - Última: {seccion.ultimaAsistencia}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Asistencia Promedio</span>
                        <span>{seccion.promedio}%</span>
                      </div>
                      <Progress value={seccion.promedio} className="h-2" />
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">
                        <Plus className="h-4 w-4 mr-2" />
                        Nueva Asistencia
                      </Button>
                      <Button variant="outline" size="sm">
                        <Users className="h-4 w-4 mr-2" />
                        Alumnos
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="historial" className="space-y-4">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Historial de Asistencias
                  </CardTitle>
                  <CardDescription>
                    Registro diario de asistencias por sección
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {historialAsistencia.map((asistencia) => (
                      <div key={asistencia.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="text-sm font-medium">
                            {asistencia.fecha}
                          </div>
                          <Badge variant="outline">{asistencia.seccion}</Badge>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="flex items-center space-x-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>{asistencia.presentes} presentes</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <X className="h-4 w-4 text-red-600" />
                            <span>{asistencia.ausentes} ausentes</span>
                          </div>
                          <div className="text-sm font-medium">
                            {asistencia.porcentaje}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Asistencia por Alumno
                  </CardTitle>
                  <CardDescription>
                    Porcentaje individual de asistencia del trimestre
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {alumnos.map((alumno) => (
                      <div key={alumno.id} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{alumno.nombre}</span>
                          <span>{alumno.asistencia}% ({alumno.inasistencias} inasistencias)</span>
                        </div>
                        <Progress value={alumno.asistencia} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reportes" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Cierre Mensual</CardTitle>
                  <CardDescription>
                    Generar reporte mensual de asistencias
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Enero 2025</p>
                        <p className="text-gray-600">Días hábiles: 20</p>
                      </div>
                      <div>
                        <p className="font-medium">Promedio General</p>
                        <p className="text-gray-600">91.8%</p>
                      </div>
                    </div>
                    <Button className="w-full">
                      <FileText className="h-4 w-4 mr-2" />
                      Crear PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cierre Trimestral</CardTitle>
                  <CardDescription>
                    Consolidado del trimestre en curso
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium">1° Trimestre</p>
                        <p className="text-gray-600">Mar - May 2025</p>
                      </div>
                      <div>
                        <p className="font-medium">Estado</p>
                        <Badge variant="outline">En curso</Badge>
                      </div>
                    </div>
                    <Button className="w-full" disabled>
                      <FileText className="h-4 w-4 mr-2" />
                      Crear PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}