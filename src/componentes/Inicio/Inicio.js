import React, { useState } from 'react';
import { Card, Container, Form, Button } from 'react-bootstrap'; // Importa React Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap
import './Inicio.css';

export function Inicio() {
  const initialStudentInfo = {
    nombre: '',
    matricula: '',
    grupo: '',
    direccion: '',
    telefono: '',
    correo: '',
    foto: null,
    fotoPreview: null, // Nueva propiedad para la vista previa
    fechaNacimiento: '', // Nueva propiedad
    genero: '', // Nueva propiedad
    nacionalidad: '', // Nueva propiedad
  };

  const [studentInfo, setStudentInfo] = useState(initialStudentInfo);

  const handleStudentInfoChange = (e) => {
    const { name, value } = e.target;
    setStudentInfo({ ...studentInfo, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log('Vista previa de la imagen:', reader.result); // Verifica el valor
        setStudentInfo({ ...studentInfo, foto: file, fotoPreview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log('Información del alumno:', studentInfo);
    alert('Información del alumno guardada en la consola');
  };

  const handleReset = () => {
    setStudentInfo(initialStudentInfo);
  };

  return (
    <div className="inicio-container">
      <Container className="formulario-sie mt-4">
        {/* Información del alumno */}
        <Card className="shadow-lg mb-4">
          <Card.Header className="bg-primary text-white text-center">
            <h4>Información del Alumno</h4>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nombre del Alumno</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={studentInfo.nombre}
                  onChange={handleStudentInfoChange}
                  placeholder="Ingrese el nombre del alumno"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Matrícula</Form.Label>
                <Form.Control
                  type="text"
                  name="matricula"
                  value={studentInfo.matricula}
                  onChange={handleStudentInfoChange}
                  placeholder="Ingrese la matrícula"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Grupo</Form.Label>
                <Form.Control
                  type="text"
                  name="grupo"
                  value={studentInfo.grupo}
                  onChange={handleStudentInfoChange}
                  placeholder="Ingrese el grupo"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  type="text"
                  name="direccion"
                  value={studentInfo.direccion}
                  onChange={handleStudentInfoChange}
                  placeholder="Ingrese la dirección"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  name="telefono"
                  value={studentInfo.telefono}
                  onChange={handleStudentInfoChange}
                  placeholder="Ingrese el número de teléfono"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  name="correo"
                  value={studentInfo.correo}
                  onChange={handleStudentInfoChange}
                  placeholder="Ingrese el correo electrónico"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Fecha de Nacimiento</Form.Label>
                <Form.Control
                  type="date"
                  name="fechaNacimiento"
                  value={studentInfo.fechaNacimiento}
                  onChange={handleStudentInfoChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Género</Form.Label>
                <Form.Select
                  name="genero"
                  value={studentInfo.genero}
                  onChange={handleStudentInfoChange}
                >
                  <option value="">Seleccione el género</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nacionalidad</Form.Label>
                <Form.Control
                  type="text"
                  name="nacionalidad"
                  value={studentInfo.nacionalidad}
                  onChange={handleStudentInfoChange}
                  placeholder="Ingrese la nacionalidad"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Foto del Alumno</Form.Label>
                <Form.Control
                  type="file"
                  name="foto"
                  onChange={handlePhotoChange}
                />
              </Form.Group>
            </Form>
            <div className="text-center mt-3">
              <Button variant="success" onClick={handleSave} className="me-2">
                Guardar
              </Button>
              <Button variant="danger" onClick={handleReset}>
                Limpiar Datos
              </Button>
            </div>
            {/* Vista previa de la imagen debajo de los botones */}
            {studentInfo.fotoPreview && (
              <div className="text-center mt-3">
                {console.log('Renderizando imagen:', studentInfo.fotoPreview)} {/* Verifica si se ejecuta */}
                <img
                  src={studentInfo.fotoPreview}
                  alt="Vista previa"
                  className="foto-preview"
                />
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Inicio;