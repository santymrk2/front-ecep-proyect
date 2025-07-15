'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  School, 
  Users, 
  MessageSquare, 
  ClipboardList, 
  Calendar, 
  UserCheck, 
  FileText, 
  CreditCard,
  BarChart3,
  Home,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import Link from 'next/link';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Inicio', href: '/dashboard' },
    { icon: Users, label: 'Gestión de Alumnos', href: '/dashboard/alumnos' },
    { icon: MessageSquare, label: 'Comunicación', href: '/dashboard/comunicacion' },
    { icon: ClipboardList, label: 'Evaluaciones', href: '/dashboard/evaluaciones' },
    { icon: Calendar, label: 'Asistencia', href: '/dashboard/asistencia' },
    { icon: UserCheck, label: 'Personal', href: '/dashboard/personal' },
    { icon: FileText, label: 'Actas de Accidentes', href: '/dashboard/actas' },
    { icon: CreditCard, label: 'Pagos', href: '/dashboard/pagos' },
    { icon: BarChart3, label: 'Reportes', href: '/dashboard/reportes' },
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <div className="flex items-center">
            <div className="bg-primary text-primary-foreground rounded-full p-2 mr-3">
              <School className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold">ECEP</h1>
              <p className="text-xs text-gray-600">Sistema Escolar</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-2">
            {menuItems.map((item, index) => (
              <Link key={index} href={item.href}>
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-gray-100"
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        </ScrollArea>
        
        <div className="border-t p-4">
          <Button
            variant="ghost"
            className="w-full justify-start hover:bg-gray-100"
          >
            <Settings className="h-5 w-5 mr-3" />
            Configuración
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start hover:bg-gray-100 text-red-600"
            onClick={() => window.location.href = '/'}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Cerrar Sesión
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 lg:px-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm">
              <p className="font-medium">Prof. Juan Carlos</p>
              <p className="text-gray-600">Dirección</p>
            </div>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-medium">
              JC
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}