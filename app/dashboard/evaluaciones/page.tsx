'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  GraduationCap, 
  Plus, 
  FileText, 
  Calendar,
  User,
  BookOpen,
  Edit,
  Eye,
  Save
} from 'lucide-react';

export default function EvaluacionesPage() {
  const [selectedTab, setSelectedTab] = useState('primario');
  const [userProfile] = useState('docente'); // Simulando perfil de usuario
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');

  const [secciones] = useState([
    { id: '4a', nombre: '4° A', nivel: 'primario' },
    { id: '3b', nombre: '3° B', nivel: 'primario' },
    { id: 'sala5', nombre: 'Sala 5', nivel: 'inicial' }
  ]);

  const [examenes] = useState([
    {
      id: 1,
      titulo: 'Evaluación de Matemática - Fracciones',
      fecha: '2025-01-15',
      trimestre: 1,
      materia: 'Matemática',
      seccion: '4° A'
    },
    {
      id: 2,
      titulo: 'Evaluación de Lengua - Comprensión Lectora',
      fecha: '2025-01-20',
      trimestre: 1,
      materia: 'Lengua',
      seccion: '4° A'
    }
  ]);

  const [alumnos] = useState([
    {
      id: 1,
      nombre: 'Juan Pérez',
      seccion: '4° A',
      notas: [
        { examenId: 1, nota: 8, observacion: 'Muy buen desempeño' },
        { examenId: 2, nota: 7, observacion: 'Debe mejorar la redacción' }
      ]
    },
    {
      id: 2,
      nombre: 'María González',
      seccion: '4° A',
      notas: [
        { examenId: 1, nota: 9, observacion: 'Excelente trabajo' },
        { examenId: 2, nota: 8, observacion: 'Muy buena comprensión' }
      ]
    }
  ]);

  const [alumnosInicial] = useState([
    {
      id: 1,
      nombre: 'Sofía Ramírez',
      seccion: 'Sala 5',
      informes: [
        {
          trimestre: 1,
          descripcion: 'Sofía ha mostrado un excelente desarrollo en todas las áreas. Se adapta bien a las rutinas y participa activamente en las actividades grupales.',
          cerrado: true
        },
        {
          trimestre: 2,
          descripcion: '',
          cerrado: false
        },
        {
          trimestre: 3,
          descripcion: '',
          cerrado: false
        }
      ]
    }
  ]);

  const renderPrimarioDocente = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Mis Secciones - Nivel Primario</h3>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {secciones.filter(s => s.nivel === 'primario').map((seccion) => (
          <Card key={seccion.id} className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedSection(seccion.id)}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {seccion.nombre}
                <Badge variant="outline">25 alumnos</Badge>
              </CardTitle>
              <CardDescription>
                Matemática - Lengua - Ciencias
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Exámenes cargados:</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Trimestre actual:</span>
                  <span className="font-medium">1°</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedSection && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Exámenes - {secciones.find(s => s.id === selectedSection)?.nombre}</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Examen
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Crear Nuevo Examen</DialogTitle>
                    <DialogDescription>
                      Complete la información del examen
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Fecha del Examen</Label>
                      <Input type="date" />
                    </div>
                    
                    <div>
                      <Label>Descripción de Temas</Label>
                      <Textarea 
                        placeholder="Describa brevemente los temas evaluados..."
                        rows={3}
                      />
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1">Cancelar</Button>
                      <Button className="flex-1">Crear Examen</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {examenes.map((examen) => (
                <div key={examen.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div>
                    <p className="font-medium">{examen.titulo}</p>
                    <p className="text-sm text-gray-600">
                      {examen.fecha} - Trimestre {examen.trimestre}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{examen.materia}</Badge>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Editar Notas
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderInicialDocente = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Mis Salas - Nivel Inicial</h3>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {secciones.filter(s => s.nivel === 'inicial').map((seccion) => (
          <Card key={seccion.id} className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedSection(seccion.id)}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {seccion.nombre}
                <Badge variant="outline">20 alumnos</Badge>
              </CardTitle>
              <CardDescription>
                Informes de desarrollo integral
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Informes completados:</span>
                  <span className="font-medium">15/20</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Trimestre actual:</span>
                  <span className="font-medium">1°</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedSection && (
        <Card>
          <CardHeader>
            <CardTitle>Alumnos - {secciones.find(s => s.id === selectedSection)?.nombre}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {alumnosInicial.map((alumno) => (
                <Card key={alumno.id} className="hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedStudent(alumno.id.toString())}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{alumno.nombre}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2">
                      {alumno.informes.map((informe, index) => (
                        <div key={index} className={`p-2 rounded text-center text-xs ${
                          informe.cerrado ? 'bg-green-100 text-green-800' : 
                          informe.descripcion ? 'bg-blue-100 text-blue-800' : 
                          'bg-gray-100 text-gray-600'
                        }`}>
                          T{informe.trimestre}
                          {informe.cerrado && <div className="text-xs">✓</div>}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {selectedStudent && (
        <Card>
          <CardHeader>
            <CardTitle>Informes Trimestrales - {alumnosInicial.find(a => a.id.toString() === selectedStudent)?.nombre}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {alumnosInicial.find(a => a.id.toString() === selectedStudent)?.informes.map((informe, index) => (
                <Card key={index} className={`${informe.cerrado ? 'opacity-60' : ''}`}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Trimestre {informe.trimestre}</CardTitle>
                    {informe.cerrado && <Badge variant="secondary">Cerrado</Badge>}
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={informe.descripcion}
                      placeholder="Describa el desarrollo del alumno en este trimestre..."
                      rows={4}
                      disabled={informe.cerrado}
                    />
                    {!informe.cerrado && (
                      <Button className="w-full mt-3" size="sm">
                        <Save className="h-4 w-4 mr-2" />
                        Guardar Informe
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderAlumnoFamilia = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            Juan Pérez - 4° A
          </CardTitle>
          <CardDescription>
            Evaluaciones y calificaciones del trimestre actual
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Matemática
                  </CardTitle>
                  <CardDescription>Prof. Ana López</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Evaluación Fracciones</span>
                      <Badge variant="default">8</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Evaluación Geometría</span>
                      <Badge variant="default">9</Badge>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-medium">
                        <span>Promedio Trimestral</span>
                        <Badge variant="default">8.5</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Lengua
                  </CardTitle>
                  <CardDescription>Maestra Clara</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Comprensión Lectora</span>
                      <Badge variant="default">7</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Producción Escrita</span>
                      <Badge variant="default">8</Badge>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-medium">
                        <span>Promedio Trimestral</span>
                        <Badge variant="default">7.5</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Observaciones del Docente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm"><strong>Matemática:</strong> Muy buen desempeño en el área. Muestra comprensión de los conceptos trabajados.</p>
                  <p className="text-sm"><strong>Lengua:</strong> Debe mejorar la redacción y la ortografía. Se recomienda práctica adicional en casa.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Evaluaciones</h2>
            <p className="text-muted-foreground">
              Gestión de evaluaciones y seguimiento académico
            </p>
          </div>
        </div>

        {/* Contenido según perfil */}
        {userProfile === 'docente' && (
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="primario">Nivel Primario</TabsTrigger>
              <TabsTrigger value="inicial">Nivel Inicial</TabsTrigger>
            </TabsList>

            <TabsContent value="primario">
              {renderPrimarioDocente()}
            </TabsContent>

            <TabsContent value="inicial">
              {renderInicialDocente()}
            </TabsContent>
          </Tabs>
        )}

        {(userProfile === 'alumno' || userProfile === 'familia') && renderAlumnoFamilia()}
      </div>
    </DashboardLayout>
  );
}