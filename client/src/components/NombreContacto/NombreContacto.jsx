import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './NombreContacto.css';

const NombreContacto = ({ onContactSubmit }) => {
  const [primerNombre, setPrimerNombre] = useState('');
  const [segundoNombre, setSegundoNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de campos
    if (!primerNombre || !apellidoPaterno || !apellidoMaterno) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos obligatorios.',
      });
      return;
    }

    const contactInfo = { primerNombre, segundoNombre, apellidoPaterno, apellidoMaterno };
    onContactSubmit(contactInfo);
  };

  return (
    <div className='nombre_container'>
      <div>
        <img className='nombre_img' src="https://i.postimg.cc/rwgzxkfQ/icono.png" alt="" />
      </div>
      <div className="nombre_content">
        <form className='nombre_form' onSubmit={handleSubmit}>
          <h2>¿Cuáles son tus Nombres completos?</h2>
          <div className="nombre_info">
            <label className='nombre_label'>Primer Nombre</label>
            <input
              className='nombre_input'
              type="text"
              placeholder='Primer Nombre...'
              value={primerNombre}
              onChange={(e) => setPrimerNombre(e.target.value)}
            />
          </div>
          <div className="nombre_info">
            <label className='nombre_label'>Segundo Nombre</label>
            <input
              className='nombre_input'
              type="text"
              placeholder='Segundo Nombre...'
              value={segundoNombre}
              onChange={(e) => setSegundoNombre(e.target.value)}
            />
          </div>
          <div className="nombre_info">
            <label className='nombre_label'>Apellido Paterno</label>
            <input
              className='nombre_input'
              type="text"
              placeholder='Apellido Paterno...'
              value={apellidoPaterno}
              onChange={(e) => setApellidoPaterno(e.target.value)}
            />
          </div>
          <div className="nombre_info">
            <label className='nombre_label'>Apellido Materno</label>
            <input
              className='nombre_input'
              type="text"
              placeholder='Apellido Materno...'
              value={apellidoMaterno}
              onChange={(e) => setApellidoMaterno(e.target.value)}
            />
          </div>
          <button type="submit">Siguiente</button>
        </form>
      </div>
    </div>
  );
};

export default NombreContacto;
