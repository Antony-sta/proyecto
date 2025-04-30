import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './Cali.css'; // Importa el archivo CSS

const materias = [
  {
    nombre: 'Equaciones Diferenciales',
    descripcion: 'Estudio de ecuaciones diferenciales y sus aplicaciones.',
    utilidad: 'Es fundamental para modelar fenómenos físicos y resolver problemas en ingeniería.',
    comportamiento: 'El alumno muestra interés en resolver problemas complejos y aplicar conceptos matemáticos.',
    calificaciones: [85, 90, 88, 92, 87, 89, 91, 93],
  },
  {
    nombre: 'Métodos Numéricos',
    descripcion: 'Métodos computacionales para resolver problemas matemáticos.',
    utilidad: 'Se utiliza en simulaciones y cálculos avanzados en ingeniería y ciencias.',
    comportamiento: 'El alumno demuestra habilidades en el uso de herramientas computacionales.',
    calificaciones: [80, 85, 83, 88, 84, 86, 89, 90],
  },
  { nombre: 'Fundamentos Base de datos', descripcion: 'Introducción a bases de datos y SQL.', calificaciones: [78, 82, 85, 87, 84, 88, 90, 92] },
  { nombre: 'Tópicos Avanzados de Programación', descripcion: 'Programación avanzada y patrones de diseño.', calificaciones: [88, 90, 85, 87, 89, 91, 92, 93] },
  { nombre: 'Redes de Computadoras', descripcion: 'Conceptos básicos de redes y protocolos de comunicación.', calificaciones: [80, 82, 84, 86, 88, 90, 92, 94] },
  { nombre: 'Principios Electrónicos', descripcion: 'Fundamentos de electrónica y circuitos.', calificaciones: [75, 78, 80, 82, 85, 87, 89, 91] },
  { nombre: 'Conmutación y Enrutamiento', descripcion: 'Configuración de redes y protocolos de enrutamiento.', calificaciones: [70, 72, 75, 78, 80, 82, 85, 87] },
];

export function Cali() {
  const [show, setShow] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewSemesters, setViewSemesters] = useState(false); // Nuevo estado para alternar vistas
  const [formCalificaciones, setFormCalificaciones] = useState(Array(8).fill('')); // Estado para el formulario
  const [asistencia, setAsistencia] = useState({ nombre: '', matricula: '', faltas: '' });

  const handleClose = () => setShow(false);
  const handleShow = (materia, index) => {
    setModalContent(materia);
    setSelectedItem(index);
    setFormCalificaciones(materia.calificaciones); // Cargar calificaciones existentes
    setShow(true);
  };

  const handleInputChange = (index, value) => {
    const newCalificaciones = [...formCalificaciones];
    newCalificaciones[index] = value;
    setFormCalificaciones(newCalificaciones);
  };

  const handleSaveCalificaciones = () => {
    if (selectedItem !== null) {
      const updatedMaterias = [...materias];
      updatedMaterias[selectedItem].calificaciones = formCalificaciones.map(Number);
      setModalContent(updatedMaterias[selectedItem]);
      setFormCalificaciones(Array(8).fill('')); // Reinicia el formulario
      alert('Calificaciones guardadas correctamente.');
    }
  };

  const handleAsistenciaChange = (field, value) => {
    setAsistencia({ ...asistencia, [field]: value });
  };

  const handleAsistenciaSubmit = () => {
    alert(`Asistencia registrada:\nNombre: ${asistencia.nombre}\nMatrícula: ${asistencia.matricula}\nFaltas: ${asistencia.faltas}`);
    setAsistencia({ nombre: '', matricula: '', faltas: '' }); // Reinicia el formulario
  };

  return (
    <div className="cali-background">
      <div className="cali-container">
        <h1 className="cali-title">Mis Calificaciones</h1>
        <Button variant="primary" onClick={() => setViewSemesters(!viewSemesters)}>
          {viewSemesters ? 'Ver Materias' : 'Ver Calificaciones por Semestre'}
        </Button>

        {!viewSemesters ? (
          <div className="cali-lists-container">
            <ul className="cali-list">
              {materias.map((materia, index) => (
                <li
                  key={index}
                  className={`cali-listItem ${selectedItem === index ? 'cali-selected' : ''}`}
                  onClick={() => handleShow(materia, index)}
                >
                  {materia.nombre}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="cali-semesters-container">
            {materias.map((materia, index) => (
              <div key={index} className="cali-semester">
                <h3>{materia.nombre}</h3>
                <ul className="cali-list">
                  {materia.calificaciones.map((calificacion, semestre) => (
                    <li key={semestre} className="cali-listItem">
                      Semestre {semestre + 1}: {calificacion}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{modalContent.nombre}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="modal-description">{modalContent.descripcion}</p>
            <h5 className="modal-subtitle">Utilidad en el área laboral:</h5>
            <p>{modalContent.utilidad}</p>
            <h5 className="modal-subtitle">Comportamiento del alumno:</h5>
            <p>{modalContent.comportamiento}</p>
            <h5 className="modal-subtitle">Calificaciones por semestre:</h5>
            <ul className="modal-calificaciones-list">
              {modalContent.calificaciones &&
                modalContent.calificaciones.map((calificacion, index) => (
                  <li key={index}>
                    <strong>Semestre {index + 1}:</strong> {calificacion}
                  </li>
                ))}
            </ul>
            <h5 className="modal-subtitle">Actualizar calificaciones:</h5>
            <Form>
              {Array.from({ length: 8 }).map((_, index) => (
                <Form.Group key={index} className="mb-3">
                  <Form.Label>Semestre {index + 1}</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder={`Calificación para semestre ${index + 1}`}
                    value={formCalificaciones[index]}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                  />
                </Form.Group>
              ))}
            </Form>
            <h5 className="modal-subtitle">Registrar asistencia:</h5>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nombre del alumno</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa el nombre del alumno"
                  value={asistencia.nombre}
                  onChange={(e) => handleAsistenciaChange('nombre', e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Matrícula</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa la matrícula del alumno"
                  value={asistencia.matricula}
                  onChange={(e) => handleAsistenciaChange('matricula', e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Días que faltó</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingresa los días que faltó"
                  value={asistencia.faltas}
                  onChange={(e) => handleAsistenciaChange('faltas', e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" onClick={handleAsistenciaSubmit}>
                Registrar Asistencia
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleSaveCalificaciones}>
              Guardar Calificaciones
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Cali;