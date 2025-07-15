'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, 
  Plus, 
  Search, 
  Calendar,
  Clock,
  User,
  MapPin,
  AlertTriangle,
  Edit,
  Eye,
  Printer,
  CheckCircle,
  X
} from 'lucide-react';

export default function ActasPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('todas');
  const [userProfile] = useState('docente'); // Simulando perfil de usuario

  const [actas] = useState([
    {
      id: 1,
      alumno: 'Pedro Martínez',
      seccion: '4° A',
      docente: 'Prof. Ana López',
      fecha: '2025-01-18',
      hora: '10:30',
      lugar: 'Patio de recreo',
      descripcion: 'El alumno se cayó mientras jugaba al fútbol durante el recreo. Se golpeó la rodilla derecha.',
      acciones: 'Se aplicó hielo en la zona afectada y se comunicó con los padres. El alumno fue llevado a la enfermería.',
      firmada: true,
      fechaCreacion: '2025-01-18',
      creadoPor: 'Prof. Ana López',
      puedeEditar: false
    },
    {
      id: 2,
      alumno: 'Sofía Ramírez',
      seccion: 'Sala 5',
      docente: 'Maestra Clara',
      fecha: '2025-01-15',
      hora: '14:15',
      lugar: 'Aula',
      descripcion: 'La alumna se golpeó la cabeza con el borde de la mesa al levantarse rápidamente.',
      acciones: 'Se revisó la zona afectada, se aplicó compresas frías y se notificó a los padres inmediatamente.',
      firmada: false,
      fechaCreacion: '2025-01-15',
      creadoPor: 'Maestra Clara',
      puedeEditar: true
    },
    {
      id: 3,
      alumno: 'Juan Pérez',
      seccion: '3° B',
      docente: 'Prof. Carlos López',
      fecha: '2025-01-20',
      hora: '09:45',
      lugar: 'Gimnasio',
      descripcion: 'Durante la clase de educación física, el alumno se torció el tobillo al saltar.',
      acciones: 'Se inmovilizó el pie, se aplicó hielo y se contactó a los padres para que lo retiren.',
      firmada: false,
      fechaCreacion: '2025-01-20',
      creadoPor: 'Prof. Carlos López',
      puedeEditar: true
    }
  ]);

  const [alumnos] = useState([
    { id: 1, nombre: 'Pedro Martínez', seccion: '4° A' },
    { id: 2, nombre: 'Sofía Ramírez', seccion: 'Sala 5' },
    { id: 3, nombre: 'Juan Pérez', seccion: '3° B' },
    { id: 4, nombre: 'María González', seccion: '4° A' },
    { id: 5, nombre: 'Carlos Rodríguez', seccion: '5° A' }
  ]);

  const filteredActas = actas.filter(acta => {
    const matchesSearch = acta.alumno.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         acta.docente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         acta.seccion.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'todas' ||
                         (selectedFilter === 'firmadas' && acta.firmada) ||
                         (selectedFilter === 'pendientes' && !acta.firmada);
    
    return matchesSearch && matchesFilter;
  });

  const canEdit = (acta: any) => {
    if (userProfile === 'direccion') return true;
    if (userProfile === 'docente' && acta.creadoPor === 'Prof. Ana López') {
      const fechaCreacion = new Date(acta.fechaCreacion);
      const ahora = new Date();
      const diferenciaDias = Math.floor((ahora.getTime() - fechaCreacion.getTime()) / (1000 * 60 * 60 * 24));
      return diferenciaDias <= 2;
    }
    return false;
  };

  const getMaxDate = () => {
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate());
    return maxDate.toISOString().split('T')[0];
  };

  const getMinDate = () => {
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() - 2);
    return minDate.toISOString().split('T')[0];
  };

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Actas de Accidentes</h2>
            <p className="text-muted-foreground">
              Registro y seguimiento de incidentes escolares
            </p>
          </div>
          {(userProfile === 'docente' || userProfile === 'direccion') && (
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nueva Acta
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Registrar Nueva Acta de Accidente</DialogTitle>
                  <DialogDescription>
                    Complete la información del incidente ocurrido
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Alumno</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Buscar alumno..." />
                      </SelectTrigger>
                      <SelectContent>
                        {alumnos.slice(0, 5).map((alumno) => (
                          <SelectItem key={alumno.id} value={alumno.id.toString()}>
                            {alumno.nombre} - {alumno.seccion}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Fecha del Suceso</Label>
                      <Input 
                        type="date" 
                        min={getMinDate()}
                        max={getMaxDate()}
                      />
                    </div>
                    <div>
                      <Label>Hora del Suceso</Label>
                      <Input type="time" />
                    </div>
                  </div>
                  
                  <div>
                    <Label>Lugar del Suceso</Label>
                    <Input placeholder="Ej: Patio de recreo, Aula, Gimnasio..." />
                  </div>
                  
                  <div>
                    <Label>Descripción del Suceso *</Label>
                    <Textarea 
                      placeholder="Describa detalladamente lo ocurrido..."
                      rows={4}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label>Acciones Realizadas *</Label>
                    <Textarea 
                      placeholder="Describa las medidas o intervenciones tomadas por la escuela..."
                      rows={3}
                      required
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1">Cancelar</Button>
                    <Button className="flex-1">Registrar Acta</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Filtros */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por alumno, docente o sección..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtrar por estado..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas las actas</SelectItem>
              <SelectItem value="firmadas">Firmadas</SelectItem>
              <SelectItem value="pendientes">Pendientes</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Estadísticas */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Actas</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{actas.length}</div>
              <p className="text-xs text-muted-foreground">
                Este mes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Actas Firmadas</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {actas.filter(a => a.firmada).length}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round((actas.filter(a => a.firmada).length / actas.length) * 100)}% del total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {actas.filter(a => !a.firmada).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Requieren firma
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Actas */}
        <Card>
          <CardHeader>
            <CardTitle>Registro de Actas</CardTitle>
            <CardDescription>
              Historial de incidentes y accidentes registrados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredActas.map((acta) => (
                <div key={acta.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="font-medium">{acta.alumno}</p>
                        <p className="text-sm text-gray-600">{acta.seccion}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{acta.docente}</p>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-3 w-3 mr-1" />
                          {acta.fecha}
                          <Clock className="h-3 w-3 ml-2 mr-1" />
                          {acta.hora}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-3 w-3 mr-1" />
                          {acta.lugar}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Badge variant={acta.firmada ? 'default' : 'destructive'}>
                      {acta.firmada ? (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      ) : (
                        <X className="h-3 w-3 mr-1" />
                      )}
                      {acta.firmada ? 'Firmada' : 'Pendiente'}
                    </Badge>
                    
                    <div className="flex space-x-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Acta de Accidente - {acta.alumno}</DialogTitle>
                            <DialogDescription>
                              Detalles completos del incidente
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium">Información del Incidente</h4>
                                <p className="text-sm text-gray-600">Alumno: {acta.alumno}</p>
                                <p className="text-sm text-gray-600">Sección: {acta.seccion}</p>
                                <p className="text-sm text-gray-600">Docente: {acta.docente}</p>
                                <p className="text-sm text-gray-600">Fecha: {acta.fecha}</p>
                                <p className="text-sm text-gray-600">Hora: {acta.hora}</p>
                                <p className="text-sm text-gray-600">Lugar: {acta.lugar}</p>
                              </div>
                              <div>
                                <h4 className="font-medium">Estado del Acta</h4>
                                <div className="mt-2">
                                  <Badge variant={acta.firmada ? 'default' : 'destructive'}>
                                    {acta.firmada ? 'Firmada' : 'Pendiente de Firma'}
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600 mt-2">
                                  Creada por: {acta.creadoPor}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Fecha de creación: {acta.fechaCreacion}
                                </p>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-medium">Descripción del Suceso</h4>
                              <p className="text-sm text-gray-700 mt-1">{acta.descripcion}</p>
                            </div>
                            
                            <div>
                              <h4 className="font-medium">Acciones Realizadas</h4>
                              <p className="text-sm text-gray-700 mt-1">{acta.acciones}</p>
                            </div>
                            
                            <div className="flex space-x-2">
                              <Button variant="outline" className="flex-1">
                                <Printer className="h-4 w-4 mr-2" />
                                Imprimir Acta
                              </Button>
                              {canEdit(acta) && (
                                <Button variant="outline" className="flex-1">
                                  <Edit className="h-4 w-4 mr-2" />
                                  Editar
                                </Button>
                              )}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      {canEdit(acta) && (
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}