'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  MessageSquare, 
  ClipboardList, 
  Calendar, 
  UserCheck, 
  FileText, 
  CreditCard,
  BarChart3,
  Bell,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard-layout';

export default function DashboardPage() {
  const [userProfile] = useState('direccion'); // Simulando perfil de usuario
  const [notifications] = useState([
    { id: 1, type: 'info', message: 'Nueva postulación de alumno recibida', time: '2 min' },
    { id: 2, type: 'warning', message: 'Solicitud de baja pendiente de revisión', time: '1 hora' },
    { id: 3, type: 'success', message: 'Reporte mensual generado correctamente', time: '3 horas' }
  ]);

  const [stats] = useState({
    totalAlumnos: 485,
    alumnosActivos: 467,
    docentesActivos: 32,
    asistenciaPromedio: 92.5,
    comunicacionesPendientes: 3,
    postulacionesPendientes: 8
  });

  const quickActions = [
    { icon: Users, label: 'Gestión de Alumnos', href: '/dashboard/alumnos', color: 'bg-blue-500' },
    { icon: MessageSquare, label: 'Comunicación', href: '/dashboard/comunicacion', color: 'bg-green-500' },
    { icon: ClipboardList, label: 'Evaluaciones', href: '/dashboard/evaluaciones', color: 'bg-purple-500' },
    { icon: Calendar, label: 'Asistencia', href: '/dashboard/asistencia', color: 'bg-orange-500' },
    { icon: UserCheck, label: 'Personal', href: '/dashboard/personal', color: 'bg-teal-500' },
    { icon: FileText, label: 'Actas', href: '/dashboard/actas', color: 'bg-red-500' },
    { icon: CreditCard, label: 'Pagos', href: '/dashboard/pagos', color: 'bg-indigo-500' },
    { icon: BarChart3, label: 'Reportes', href: '/dashboard/reportes', color: 'bg-yellow-500' }
  ];

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground">
              Bienvenido al sistema de gestión escolar ECEP
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">
              {userProfile === 'direccion' ? 'Dirección' : 'Usuario'}
            </Badge>
          </div>
        </div>

        {/* Estadísticas principales */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Alumnos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalAlumnos}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12 desde el mes pasado
                </span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Asistencia Promedio</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.asistenciaPromedio}%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +2.1% desde la semana pasada
                </span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Docentes Activos</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.docentesActivos}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-blue-600 flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Plantilla completa
                </span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Postulaciones</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.postulacionesPendientes}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-orange-600 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Pendientes de revisión
                </span>
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {/* Acciones rápidas */}
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
              <CardDescription>
                Accede rápidamente a las funciones principales del sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => window.location.href = action.href}
                  >
                    <div className={`p-2 rounded-full ${action.color} text-white mb-2`}>
                      <action.icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium text-center">{action.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notificaciones */}
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-4 w-4 mr-2" />
                Notificaciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-start space-x-3">
                    <div className={`p-1 rounded-full ${
                      notification.type === 'info' ? 'bg-blue-100' :
                      notification.type === 'warning' ? 'bg-yellow-100' :
                      'bg-green-100'
                    }`}>
                      <div className={`h-2 w-2 rounded-full ${
                        notification.type === 'info' ? 'bg-blue-500' :
                        notification.type === 'warning' ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">hace {notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actividad reciente */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>
              Últimas acciones realizadas en el sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Nueva postulación recibida</p>
                    <p className="text-xs text-muted-foreground">María González - 3° Grado</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">2 min</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Asistencia cargada</p>
                    <p className="text-xs text-muted-foreground">4° A - Prof. Ana López</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">15 min</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <ClipboardList className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Evaluación creada</p>
                    <p className="text-xs text-muted-foreground">Matemática - 5° B</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">1 hora</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}