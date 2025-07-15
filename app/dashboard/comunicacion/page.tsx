'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  MessageSquare, 
  Send, 
  Plus, 
  Bell, 
  Users,
  Search,
  FileText,
  Calendar
} from 'lucide-react';

export default function ComunicacionPage() {
  const [selectedTab, setSelectedTab] = useState('inicio');
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [chats] = useState([
    {
      id: 1,
      nombre: 'Prof. Ana López',
      ultimoMensaje: 'Gracias por la información sobre el examen',
      hora: '10:30',
      noLeidos: 0
    },
    {
      id: 2,
      nombre: 'Directora María Santos',
      ultimoMensaje: 'Necesito revisar los reportes de asistencia',
      hora: '09:15',
      noLeidos: 2
    }
  ]);

  const [comunicaciones] = useState([
    {
      id: 1,
      titulo: 'Inicio de Clases 2025',
      descripcion: 'Comunicamos que las clases del ciclo lectivo 2025 comenzarán el lunes 10 de marzo...',
      tipo: 'institucional',
      fecha: '2025-01-20',
      autor: 'Dirección'
    },
    {
      id: 2,
      titulo: 'Reunión de Padres - Nivel Inicial',
      descripcion: 'Se convoca a los padres de nivel inicial para la reunión informativa...',
      tipo: 'nivel',
      nivel: 'Inicial',
      fecha: '2025-01-18',
      autor: 'Coordinación Inicial'
    },
    {
      id: 3,
      titulo: 'Entrega de Materiales - 4° A',
      descripcion: 'Recordamos a las familias de 4° A que mañana es la fecha límite...',
      tipo: 'seccion',
      seccion: '4° A',
      fecha: '2025-01-17',
      autor: 'Maestra Carla'
    }
  ]);

  const [usuarios] = useState([
    { id: 1, nombre: 'Prof. Ana López', cargo: 'Docente' },
    { id: 2, nombre: 'Directora María Santos', cargo: 'Dirección' },
    { id: 3, nombre: 'Carlos Pérez', cargo: 'Administración' }
  ]);

  const getTipoBadge = (tipo: string, nivel?: string, seccion?: string) => {
    switch (tipo) {
      case 'institucional':
        return <Badge variant="default">Institucional</Badge>;
      case 'nivel':
        return <Badge variant="secondary">Nivel {nivel}</Badge>;
      case 'seccion':
        return <Badge variant="outline">Sección {seccion}</Badge>;
      default:
        return <Badge>{tipo}</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Comunicación</h2>
            <p className="text-muted-foreground">
              Mensajes privados y comunicaciones institucionales
            </p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="inicio">Inicio</TabsTrigger>
            <TabsTrigger value="chats">Chats</TabsTrigger>
          </TabsList>

          <TabsContent value="inicio" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Comunicaciones Generales</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Comunicado
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Crear Nuevo Comunicado</DialogTitle>
                    <DialogDescription>
                      Complete la información para crear un nuevo comunicado
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Título del Comunicado</label>
                      <Input placeholder="Ingrese el título..." />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Descripción</label>
                      <Textarea 
                        placeholder="Escriba el contenido del comunicado..."
                        rows={6}
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Tipo de Comunicación</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione el tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="institucional">Institucional (Toda la escuela)</SelectItem>
                          <SelectItem value="nivel">Por nivel</SelectItem>
                          <SelectItem value="seccion">Por sección específica</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1">
                        Cancelar
                      </Button>
                      <Button className="flex-1">
                        Enviar
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {comunicaciones.map((comunicacion) => (
                <Card key={comunicacion.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Bell className="h-5 w-5 text-primary" />
                        <div>
                          <CardTitle className="text-lg">{comunicacion.titulo}</CardTitle>
                          <CardDescription>
                            Por {comunicacion.autor} - {comunicacion.fecha}
                          </CardDescription>
                        </div>
                      </div>
                      {getTipoBadge(comunicacion.tipo, comunicacion.nivel, comunicacion.seccion)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-3">{comunicacion.descripcion}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      Publicado el {comunicacion.fecha}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="chats" className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4 h-[600px]">
              {/* Lista de chats */}
              <Card className="md:col-span-1">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Chats</CardTitle>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Nuevo Chat</DialogTitle>
                          <DialogDescription>
                            Seleccione un usuario para iniciar una conversación
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              placeholder="Buscar usuario..."
                              className="pl-10"
                            />
                          </div>
                          <div className="space-y-2">
                            {usuarios.map((usuario) => (
                              <div
                                key={usuario.id}
                                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                              >
                                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm">
                                  {usuario.nombre.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                  <p className="font-medium">{usuario.nombre}</p>
                                  <p className="text-sm text-gray-500">{usuario.cargo}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {chats.map((chat) => (
                      <div
                        key={chat.id}
                        className="flex items-center space-x-3 p-3 hover:bg-gray-50 cursor-pointer"
                      >
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white text-sm">
                          {chat.nombre.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{chat.nombre}</p>
                            <span className="text-xs text-gray-500">{chat.hora}</span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">{chat.ultimoMensaje}</p>
                        </div>
                        {chat.noLeidos > 0 && (
                          <Badge variant="default" className="rounded-full">
                            {chat.noLeidos}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Área de chat */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">Prof. Ana López</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col h-[450px]">
                  {/* Mensajes */}
                  <div className="flex-1 space-y-3 overflow-y-auto mb-4">
                    <div className="flex justify-start">
                      <div className="bg-gray-100 p-3 rounded-lg max-w-xs">
                        <p className="text-sm">Hola, ¿cómo estás?</p>
                        <span className="text-xs text-gray-500">10:15</span>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-primary text-white p-3 rounded-lg max-w-xs">
                        <p className="text-sm">Muy bien, gracias. ¿Necesitas algo?</p>
                        <span className="text-xs text-primary-foreground/80">10:16</span>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-gray-100 p-3 rounded-lg max-w-xs">
                        <p className="text-sm">Sí, quería consultarte sobre el examen de mañana</p>
                        <span className="text-xs text-gray-500">10:20</span>
                      </div>
                    </div>
                  </div>

                  {/* Input de mensaje */}
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Escribe un mensaje..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1"
                    />
                    <Button size="sm">
                      <Send className="h-4 w-4" />
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