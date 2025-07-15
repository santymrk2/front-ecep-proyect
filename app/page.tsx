'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { School, Mail, Lock, Users, GraduationCap, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.endsWith('@ecep.edu.ar')) {
      setIsValidEmail(true);
    } else {
      alert('Por favor, ingrese un correo electrónico válido del dominio @ecep.edu.ar');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Validar contraseña (mínimo 8 caracteres, 2 números, 1 símbolo)
    const passwordRegex = /^(?=.*[0-9].*[0-9])(?=.*[!@#$%^&*])/;
    if (password.length < 8 || !passwordRegex.test(password)) {
      alert('La contraseña debe tener al menos 8 caracteres, 2 números y 1 símbolo especial');
      return;
    }
    // Simular login exitoso
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo y título */}
        <div className="text-center">
          <div className="flex justify-center items-center mb-4">
            <div className="bg-primary text-primary-foreground rounded-full p-3">
              <School className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">ECEP</h1>
          <p className="text-gray-600 mt-2">Escuela Complejo Evangelico Pilar</p>
          <p className="text-sm text-gray-500 mt-1">Sistema de Gestión Escolar</p>
        </div>

        {/* Formulario de login */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Iniciar Sesión</CardTitle>
            <CardDescription className="text-center">
              Ingrese sus credenciales para acceder al sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={!isValidEmail ? handleEmailSubmit : handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="nombre@ecep.edu.ar"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                    disabled={isValidEmail}
                  />
                </div>
              </div>

              {isValidEmail && (
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Ingrese su contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    Mínimo 8 caracteres, 2 números y 1 símbolo especial
                  </p>
                </div>
              )}

              <Button type="submit" className="w-full">
                {!isValidEmail ? 'Continuar' : 'Ingresar'}
              </Button>
            </form>

            {!isValidEmail && (
              <>
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500">o</span>
                  </div>
                </div>

                <Link href="/postulacion">
                  <Button variant="outline" className="w-full">
                    <Users className="h-4 w-4 mr-2" />
                    ¿Querés postularte como alumno? Ingresá acá
                  </Button>
                </Link>
              </>
            )}
          </CardContent>
        </Card>

        {/* Información adicional */}
        <div className="text-center text-sm text-gray-600 space-y-2">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center">
              <GraduationCap className="h-4 w-4 mr-1" />
              <span>Nivel Inicial</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 mr-1" />
              <span>Nivel Primario</span>
            </div>
          </div>
          <p>© 2025 Escuela Complejo Evangelico Pilar. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
}