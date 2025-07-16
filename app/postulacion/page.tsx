'use client';

import { useState } from 'react';
import { 
  CourseType, 
  ShiftType, 
  InternetConnectivity, 
  RelationType,
  Aspirante,
  AspiranteFamiliar,
  Familiar,
  SolicitudAdmision,
  ApplicationStatus
} from '@/types/entities';
import { apiService } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, ArrowRight, User, Users, Home, Heart, Check, Plus } from 'lucide-react';
import Link from 'next/link';

export default function PostulacionPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<Aspirante & { familiares: AspiranteFamiliar[] }>>({
    // Datos del aspirante
    nombre: '',
    apellido: '',
    dni: '',
    fechaNacimiento: '',
    cursoSolicitado: undefined as CourseType | undefined,
    turnoPreferido: undefined as ShiftType | undefined,
    escuelaActual: '',
    domicilio: '',
    nacionalidad: '',
    genero: '',
    estadoCivil: '',
    telefono: '',
    celular: '',
    emailContacto: '',
    // Datos familiares
    familiares: [],
    // Condiciones del hogar
    conectividadInternet: undefined as InternetConnectivity | undefined,
    dispositivosDisponibles: '',
    idiomasHabladosHogar: '',
    // Salud
    enfermedadesAlergias: '',
    medicacionHabitual: '',
    limitacionesFisicasNeurologicas: '',
    tratamientosTerapeuticos: '',
    usoAyudasMovilidad: false,
    coberturaMedica: '',
    observacionesAdicionalesSalud: '',
    // Confirmación
  });

  const [communicationsAuthorized, setCommunicationsAuthorized] = useState(false);

  const totalSteps = 5;

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const addFamiliar = () => {
    setFormData(prev => ({
      ...prev,
      familiares: [...(prev.familiares || []), {
        id: 0, // Este valor será asignado por el backend
        tipoRelacion: RelationType.PADRE,
        viveConAlumno: true,
        aspirante: {} as Aspirante, // Este valor será asignado por el backend
        familiar: {
          id: 0, // Este valor será asignado por el backend
          nombre: '',
          apellido: '',
          dni: '',
          fechaNacimiento: '',
          genero: '',
          estadoCivil: '',
          nacionalidad: '',
          domicilio: '',
          telefono: '',
          celular: '',
          emailContacto: '',
          lugarTrabajo: '',
          ocupacion: '',
          alumnosAsociados: [], // Campo requerido por la interfaz Familiar
          fechaCreacion: new Date().toISOString(),
          fechaActualizacion: new Date().toISOString(),
          estadoBaja: 'ACTIVO'
        } as Familiar
      }]
    }));
  };

  const handleSubmit = () => {
    try {
      // Extraemos los familiares del formData
      const { familiares, ...aspiranteData } = formData;
      
      // Validamos que los campos obligatorios estén completos
      if (!aspiranteData.nombre || !aspiranteData.apellido || !aspiranteData.dni || 
          !aspiranteData.fechaNacimiento || !aspiranteData.cursoSolicitado || 
          !aspiranteData.turnoPreferido || !aspiranteData.conectividadInternet) {
        alert('Por favor complete todos los campos obligatorios del aspirante.');
        return;
      }

      if(!communicationsAuthorized){
        alert('Debe autorizar a recibir comunicaciones por correo electrónico para enviar la postulación.');
        return;
      }
      
      // Simplificamos la estructura para evitar problemas con campos faltantes
      const aspiranteSimplificado = {
        nombre: aspiranteData.nombre,
        apellido: aspiranteData.apellido,
        dni: aspiranteData.dni,
        fechaNacimiento: aspiranteData.fechaNacimiento,
        genero: aspiranteData.genero || '',
        estadoCivil: aspiranteData.estadoCivil || '',
        nacionalidad: aspiranteData.nacionalidad || '',
        domicilio: aspiranteData.domicilio || '',
        telefono: aspiranteData.telefono || '',
        celular: aspiranteData.celular || '',
        emailContacto: aspiranteData.emailContacto || '',
        cursoSolicitado: aspiranteData.cursoSolicitado || '',
        turnoPreferido: aspiranteData.turnoPreferido,
        escuelaActual: aspiranteData.escuelaActual || '',
        conectividadInternet: aspiranteData.conectividadInternet,
        dispositivosDisponibles: aspiranteData.dispositivosDisponibles || '',
        idiomasHabladosHogar: aspiranteData.idiomasHabladosHogar || '',
        enfermedadesAlergias: aspiranteData.enfermedadesAlergias || '',
        medicacionHabitual: aspiranteData.medicacionHabitual || '',
        limitacionesFisicasNeurologicas: aspiranteData.limitacionesFisicasNeurologicas || '',
        tratamientosTerapeuticos: aspiranteData.tratamientosTerapeuticos || '',
        usoAyudasMovilidad: aspiranteData.usoAyudasMovilidad || false,
        coberturaMedica: aspiranteData.coberturaMedica || '',
        observacionesAdicionalesSalud: aspiranteData.observacionesAdicionalesSalud || ''
      };
      
      // Simplificamos los familiares para evitar problemas con campos faltantes
const familiaresSimplificados = (familiares || []).map(familiar => ({
        tipoRelacion: familiar.tipoRelacion,
        viveConAlumno: familiar.viveConAlumno || false,
        familiar: {
          nombre: familiar.familiar?.nombre || '',
          apellido: familiar.familiar?.apellido || '',
          dni: familiar.familiar?.dni || '',
          fechaNacimiento: familiar.familiar?.fechaNacimiento || '',
          genero: familiar.familiar?.genero || '',
          estadoCivil: familiar.familiar?.estadoCivil || '',
          nacionalidad: familiar.familiar?.nacionalidad || '',
          domicilio: familiar.familiar?.domicilio || '',
          telefono: familiar.familiar?.telefono || '',
          celular: familiar.familiar?.celular || '',
          emailContacto: familiar.familiar?.emailContacto || '',
          lugarTrabajo: familiar.familiar?.lugarTrabajo || '',
          ocupacion: familiar.familiar?.ocupacion || ''
        }
      }));
      
      // Convertimos los datos a la estructura esperada por la API
      const solicitudData = {
        aspirante: aspiranteSimplificado,
        estado: ApplicationStatus.PENDIENTE,
        emailConfirmacionEnviado: false,
        entrevistaRealizada: false,
        familiares: familiaresSimplificados
      }as Partial<SolicitudAdmision> & { familiares?: AspiranteFamiliar[] };
      // Validamos que los campos obligatorios estén completos
      
      console.log('Enviando datos:', JSON.stringify(solicitudData, null, 2));
      
      apiService.createSolicitudAdmision(solicitudData)
        .then(response => {
          console.log('Respuesta exitosa:', response);
          alert('Postulación enviada exitosamente. Recibirá un email con los próximos pasos.');
        })
        .catch(error => {
          console.error('Error al enviar postulación:', error);
          alert(`Error al enviar la postulación: ${error.message}. Por favor, intente nuevamente.`);
        });
    } catch (error) {
      console.error('Error en el proceso de envío:', error);
      alert(`Error inesperado: ${error}. Por favor, intente nuevamente.`);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center mb-6">
              <User className="h-6 w-6 text-primary mr-2" />
              <h3 className="text-lg font-medium">Datos del Aspirante</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  id="nombre"
                  value={formData.nombre || ''}
                  onChange={(e) => handleInputChange('nombre', e.target.value)}
                  placeholder="Ingrese el nombre"
                />
              </div>
              
              <div>
                <Label htmlFor="apellido">Apellido</Label>
                <Input
                  id="apellido"
                  value={formData.apellido || ''}
                  onChange={(e) => handleInputChange('apellido', e.target.value)}
                  placeholder="Ingrese el apellido"
                />
              </div>
              
              <div>
                <Label htmlFor="dni">DNI</Label>
                <Input
                  id="dni"
                  value={formData.dni || ''}
                  onChange={(e) => handleInputChange('dni', e.target.value)}
                  placeholder="12345678"
                />
              </div>
              
              <div>
                <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
                <Input
                  id="fechaNacimiento"
                  type="date"
                  value={formData.fechaNacimiento || ''}
                  onChange={(e) => handleInputChange('fechaNacimiento', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="cursoSolicitado">Curso Solicitado</Label>
                <Select onValueChange={(value) => handleInputChange('cursoSolicitado', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un curso" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={CourseType.SALA_3}>Sala de 3 años</SelectItem>
                    <SelectItem value={CourseType.SALA_4}>Sala de 4 años</SelectItem>
                    <SelectItem value={CourseType.SALA_5}>Sala de 5 años</SelectItem>
                    <SelectItem value={CourseType.PRIMER_GRADO}>1° Grado</SelectItem>
                    <SelectItem value={CourseType.SEGUNDO_GRADO}>2° Grado</SelectItem>
                    <SelectItem value={CourseType.TERCER_GRADO}>3° Grado</SelectItem>
                    <SelectItem value={CourseType.CUARTO_GRADO}>4° Grado</SelectItem>
                    <SelectItem value={CourseType.QUINTO_GRADO}>5° Grado</SelectItem>
                    <SelectItem value={CourseType.SEXTO_GRADO}>6° Grado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="turnoPreferido">Turno Preferido</Label>
                <Select onValueChange={(value) => handleInputChange('turnoPreferido', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un turno" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ShiftType.MANANA}>Mañana</SelectItem>
                    <SelectItem value={ShiftType.TARDE}>Tarde</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="escuelaActual">Escuela Actual</Label>
                <Input
                  id="escuelaActual"
                  value={formData.escuelaActual || ''}
                  onChange={(e) => handleInputChange('escuelaActual', e.target.value)}
                  placeholder="Nombre de la escuela actual"
                />
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="domicilio">Domicilio Completo</Label>
                <Input
                  id="domicilio"
                  value={formData.domicilio || ''}
                  onChange={(e) => handleInputChange('domicilio', e.target.value)}
                  placeholder="Dirección completa"
                />
              </div>
              
              <div>
                <Label htmlFor="nacionalidad">Nacionalidad</Label>
                <Input
                  id="nacionalidad"
                  value={formData.nacionalidad || ''}
                  onChange={(e) => handleInputChange('nacionalidad', e.target.value)}
                  placeholder="Argentina"
                />
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center mb-6">
              <Users className="h-6 w-6 text-primary mr-2" />
              <h3 className="text-lg font-medium">Datos Familiares</h3>
              <Button type="button" onClick={addFamiliar} className="ml-auto" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Agregar Familiar
              </Button>
            </div>
            
            <div className="space-y-6">
              {formData.familiares?.map((familiar, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h4 className="font-medium mb-4">Familiar {index + 1}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Relación</Label>
                      <Select value={familiar.tipoRelacion} onValueChange={(value) => {
                        const newFamiliares = [...(formData.familiares || [])];
                        newFamiliares[index] = { ...newFamiliares[index], tipoRelacion: value as RelationType };
                        handleInputChange('familiares', newFamiliares);
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione relación" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={RelationType.PADRE}>Padre</SelectItem>
                          <SelectItem value={RelationType.MADRE}>Madre</SelectItem>
                          <SelectItem value={RelationType.TUTOR}>Tutor</SelectItem>
                          <SelectItem value={RelationType.ABUELO}>Abuelo</SelectItem>
                          <SelectItem value={RelationType.ABUELA}>Abuela</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>Nombre</Label>
                      <Input
                        value={familiar.familiar?.nombre || ''}
                        onChange={(e) => {
                          const newFamiliares = [...(formData.familiares || [])];
                          newFamiliares[index] = {
                            ...newFamiliares[index],
                            familiar: { ...newFamiliares[index].familiar, nombre: e.target.value }
                          };
                          handleInputChange('familiares', newFamiliares);
                        }}
                        placeholder="Nombre"
                      />
                    </div>
                    
                    <div>
                      <Label>Apellido</Label>
                      <Input
                        value={familiar.familiar?.apellido || ''}
                        onChange={(e) => {
                          const newFamiliares = [...(formData.familiares || [])];
                          newFamiliares[index] = {
                            ...newFamiliares[index],
                            familiar: { ...newFamiliares[index].familiar, apellido: e.target.value }
                          };
                          handleInputChange('familiares', newFamiliares);
                        }}
                        placeholder="Apellido"
                      />
                    </div>
                    
                    <div>
                      <Label>DNI</Label>
                      <Input
                        value={familiar.familiar?.dni || ''}
                        onChange={(e) => {
                          const newFamiliares = [...(formData.familiares || [])];
                          newFamiliares[index] = {
                            ...newFamiliares[index],
                            familiar: { ...newFamiliares[index].familiar, dni: e.target.value }
                          };
                          handleInputChange('familiares', newFamiliares);
                        }}
                        placeholder="12345678"
                      />
                    </div>
                    
                    <div>
                      <Label>Fecha de Nacimiento</Label>
                      <Input
                        type="date"
                        value={familiar.familiar?.fechaNacimiento || ''}
                        onChange={(e) => {
                          const newFamiliares = [...(formData.familiares || [])];
                          newFamiliares[index] = {
                            ...newFamiliares[index],
                            familiar: { ...newFamiliares[index].familiar, fechaNacimiento: e.target.value }
                          };
                          handleInputChange('familiares', newFamiliares);
                        }}
                      />
                    </div>
                    
                    <div>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={familiar.familiar?.emailContacto || ''}
                        onChange={(e) => {
                          const newFamiliares = [...(formData.familiares || [])];
                          newFamiliares[index] = {
                            ...newFamiliares[index],
                            familiar: { ...newFamiliares[index].familiar, emailContacto: e.target.value }
                          };
                          handleInputChange('familiares', newFamiliares);
                        }}
                        placeholder="email@ejemplo.com"
                      />
                    </div>
                    
                    <div>
                      <Label>Teléfono</Label>
                      <Input
                        value={familiar.familiar?.telefono || ''}
                        onChange={(e) => {
                          const newFamiliares = [...(formData.familiares || [])];
                          newFamiliares[index] = {
                            ...newFamiliares[index],
                            familiar: { ...newFamiliares[index].familiar, telefono: e.target.value }
                          };
                          handleInputChange('familiares', newFamiliares);
                        }}
                        placeholder="11-1234-5678"
                      />
                    </div>
                    
                    <div>
                      <Label>Celular</Label>
                      <Input
                        value={familiar.familiar?.celular || ''}
                        onChange={(e) => {
                          const newFamiliares = [...(formData.familiares || [])];
                          newFamiliares[index] = {
                            ...newFamiliares[index],
                            familiar: { ...newFamiliares[index].familiar, celular: e.target.value }
                          };
                          handleInputChange('familiares', newFamiliares);
                        }}
                        placeholder="11-1234-5678"
                      />
                    </div>
                    
                    <div>
                      <Label>Domicilio</Label>
                      <Input
                        value={familiar.familiar?.domicilio || ''}
                        onChange={(e) => {
                          const newFamiliares = [...(formData.familiares || [])];
                          newFamiliares[index] = {
                            ...newFamiliares[index],
                            familiar: { ...newFamiliares[index].familiar, domicilio: e.target.value }
                          };
                          handleInputChange('familiares', newFamiliares);
                        }}
                        placeholder="Dirección completa"
                      />
                    </div>
                    
                    <div>
                      <Label>Lugar de Trabajo</Label>
                      <Input
                        value={familiar.familiar?.lugarTrabajo || ''}
                        onChange={(e) => {
                          const newFamiliares = [...(formData.familiares || [])];
                          newFamiliares[index] = {
                            ...newFamiliares[index],
                            familiar: { ...newFamiliares[index].familiar, lugarTrabajo: e.target.value }
                          };
                          handleInputChange('familiares', newFamiliares);
                        }}
                        placeholder="Lugar de trabajo"
                      />
                    </div>
                    
                    <div>
                      <Label>Ocupación</Label>
                      <Input
                        value={familiar.familiar?.ocupacion || ''}
                        onChange={(e) => {
                          const newFamiliares = [...(formData.familiares || [])];
                          newFamiliares[index] = {
                            ...newFamiliares[index],
                            familiar: { ...newFamiliares[index].familiar, ocupacion: e.target.value }
                          };
                          handleInputChange('familiares', newFamiliares);
                        }}
                        placeholder="Ocupación"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id={`viveConAlumno-${index}`} 
                          checked={familiar.viveConAlumno || false}
                          onCheckedChange={(checked) => {
                            const newFamiliares = [...(formData.familiares || [])];
                            newFamiliares[index] = {
                              ...newFamiliares[index],
                              viveConAlumno: checked as boolean
                            };
                            handleInputChange('familiares', newFamiliares);
                          }}
                        />
                        <Label htmlFor={`viveConAlumno-${index}`}>Vive con el alumno</Label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center mb-6">
              <Home className="h-6 w-6 text-primary mr-2" />
              <h3 className="text-lg font-medium">Condiciones del Hogar</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="conectividadInternet">Tipo de Conectividad a Internet</Label>
                <Select onValueChange={(value) => handleInputChange('conectividadInternet', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione el tipo de conexión" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={InternetConnectivity.FIBRA_OPTICA}>Fibra Óptica</SelectItem>
                    <SelectItem value={InternetConnectivity.ADSL}>ADSL</SelectItem>
                    <SelectItem value={InternetConnectivity.CABLE}>Cable</SelectItem>
                    <SelectItem value={InternetConnectivity.DATOS_MOVILES}>Datos Móviles</SelectItem>
                    <SelectItem value={InternetConnectivity.SIN_CONEXION}>Sin Conexión</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="dispositivosDisponibles">Dispositivos Disponibles para Escolaridad</Label>
                <Textarea
                  id="dispositivosDisponibles"
                  value={formData.dispositivosDisponibles || ''}
                  onChange={(e) => handleInputChange('dispositivosDisponibles', e.target.value)}
                  placeholder="Describa los dispositivos disponibles (computadora, tablet, smartphone, etc.)"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="idiomasHabladosHogar">Idiomas Hablados en el Hogar</Label>
                <Input
                  id="idiomasHabladosHogar"
                  value={formData.idiomasHabladosHogar || ''}
                  onChange={(e) => handleInputChange('idiomasHabladosHogar', e.target.value)}
                  placeholder="Ej: Español, Inglés, Italiano"
                />
              </div>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-4">
            <div className="flex items-center mb-6">
              <Heart className="h-6 w-6 text-primary mr-2" />
              <h3 className="text-lg font-medium">Información de Salud</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="enfermedadesAlergias">Enfermedades o Alergias</Label>
                <Textarea
                  id="enfermedadesAlergias"
                  value={formData.enfermedadesAlergias || ''}
                  onChange={(e) => handleInputChange('enfermedadesAlergias', e.target.value)}
                  placeholder="Describa cualquier enfermedad o alergia conocida"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="medicacionHabitual">Medicación Habitual</Label>
                <Textarea
                  id="medicacionHabitual"
                  value={formData.medicacionHabitual || ''}
                  onChange={(e) => handleInputChange('medicacionHabitual', e.target.value)}
                  placeholder="Indique medicamentos que toma regularmente"
                  rows={2}
                />
              </div>
              
              <div>
                <Label htmlFor="limitacionesFisicasNeurologicas">Limitaciones Físicas o Neurológicas</Label>
                <Textarea
                  id="limitacionesFisicasNeurologicas"
                  value={formData.limitacionesFisicasNeurologicas || ''}
                  onChange={(e) => handleInputChange('limitacionesFisicasNeurologicas', e.target.value)}
                  placeholder="Describa cualquier limitación que deba conocer la escuela"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="tratamientosTerapeuticos">Tratamientos Terapéuticos en Curso</Label>
                <Input
                  id="tratamientosTerapeuticos"
                  value={formData.tratamientosTerapeuticos || ''}
                  onChange={(e) => handleInputChange('tratamientosTerapeuticos', e.target.value)}
                  placeholder="Ej: Fonoaudiología, Psicología, Terapia Ocupacional"
                />
              </div>
              
              <div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="usoAyudasMovilidad" 
                    checked={formData.usoAyudasMovilidad || false}
                    onCheckedChange={(checked) => handleInputChange('usoAyudasMovilidad', checked)}
                  />
                  <Label htmlFor="usoAyudasMovilidad">Usa ayudantes de movilidad</Label>
                </div>
              </div>
              
              <div>
                <Label htmlFor="coberturaMedica">Cobertura Médica</Label>
                <Input
                  id="coberturaMedica"
                  value={formData.coberturaMedica || ''}
                  onChange={(e) => handleInputChange('coberturaMedica', e.target.value)}
                  placeholder="Nombre de la obra social o prepaga"
                />
              </div>
              
              <div>
                <Label htmlFor="observacionesAdicionalesSalud">Observaciones Adicionales</Label>
                <Textarea
                  id="observacionesAdicionalesSalud"
                  value={formData.observacionesAdicionalesSalud || ''}
                  onChange={(e) => handleInputChange('observacionesAdicionalesSalud', e.target.value)}
                  placeholder="Cualquier información adicional que considere relevante"
                  rows={3}
                />
              </div>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <Check className="h-6 w-6 text-primary mr-2" />
              <h3 className="text-lg font-medium">Confirmación de Datos</h3>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-4">
                Por favor, revise la información ingresada antes de enviar la postulación:
              </p>
              
              <div className="space-y-2 text-sm">
                <p><strong>Aspirante:</strong> {formData.nombre} {formData.apellido}</p>
                <p><strong>DNI:</strong> {formData.dni}</p>
                <p><strong>Curso:</strong> {
                  formData.cursoSolicitado === CourseType.SALA_3 ? 'Sala de 3 años' :
                  formData.cursoSolicitado === CourseType.SALA_4 ? 'Sala de 4 años' :
                  formData.cursoSolicitado === CourseType.SALA_5 ? 'Sala de 5 años' :
                  formData.cursoSolicitado === CourseType.PRIMER_GRADO ? '1° Grado' :
                  formData.cursoSolicitado === CourseType.SEGUNDO_GRADO ? '2° Grado' :
                  formData.cursoSolicitado === CourseType.TERCER_GRADO ? '3° Grado' :
                  formData.cursoSolicitado === CourseType.CUARTO_GRADO ? '4° Grado' :
                  formData.cursoSolicitado === CourseType.QUINTO_GRADO ? '5° Grado' :
                  formData.cursoSolicitado === CourseType.SEXTO_GRADO ? '6° Grado' :
                  'No seleccionado'
                }</p>
                <p><strong>Turno:</strong> {
                  formData.turnoPreferido === ShiftType.MANANA ? 'Mañana' :
                  formData.turnoPreferido === ShiftType.TARDE ? 'Tarde' :
                  'No seleccionado'
                }</p>
                <p><strong>Familiares:</strong> {formData.familiares?.length || 0}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
<Checkbox 
  id="autorizadoComunicacionesEmail" 
  checked={communicationsAuthorized} // Use the new state here
  onCheckedChange={(checked: boolean) => setCommunicationsAuthorized(checked)} // Update the new state
/>
                <Label htmlFor="autorizadoComunicacionesEmail" className="text-sm">
                  Autorizo a recibir comunicaciones por correo electrónico
                </Label>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                Una vez enviada la postulación, recibirá un correo electrónico con un resumen 
                de la información proporcionada. El resultado de la postulación será comunicado 
                en los próximos días.
              </p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al inicio
          </Link>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Postulación de Alumno
            </h1>
            <p className="text-gray-600">
              Escuela Complejo Evangelico Pilar
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Paso {currentStep} de {totalSteps}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round((currentStep / totalSteps) * 100)}% completado
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && 'Datos del Aspirante'}
              {currentStep === 2 && 'Datos Familiares'}
              {currentStep === 3 && 'Condiciones del Hogar'}
              {currentStep === 4 && 'Información de Salud'}
              {currentStep === 5 && 'Confirmación'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderStep()}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Anterior
              </Button>
              
              {currentStep < totalSteps ? (
                <Button onClick={nextStep}>
                  Siguiente
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  disabled={!communicationsAuthorized}
                >
                  Enviar Postulación
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}