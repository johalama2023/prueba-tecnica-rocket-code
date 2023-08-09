import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './DatosContacto.css';

const DatosContacto = ({ onContactSubmit }) => {
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de correo electrónico
    if (!isValidEmail(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Email inválido',
        text: 'Por favor ingresa un correo electrónico válido.',
      });
      return;
    }

    // Validación de longitud del teléfono
    if (telefono.length > 15) {
      Swal.fire({
        icon: 'error',
        title: 'Teléfono demasiado largo',
        text: 'El número de teléfono debe tener como máximo 15 caracteres.',
      });
      return;
    }

    const contactInfo = { email, telefono };
    onContactSubmit(contactInfo);
  };

  // Función para validar el formato de correo electrónico
  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  return (
    <div className='nombre_container'>
      <div>
        <img className='nombre_img' src="https://i.postimg.cc/rwgzxkfQ/icono.png" alt="" />
      </div>
      <form className='nombre_form' onSubmit={handleSubmit}>
        <h2>¿Cuáles son tus Datos de Contacto?</h2>
        <div className="nombre_info">
          <label className='nombre_label'>Email</label>
          <input
            className='nombre_input'
            type="email"
            placeholder='Email...'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="nombre_info">
          <label className='nombre_label'>Teléfono</label>
          <input
            className='nombre_input'
            type="text"
            placeholder='Teléfono...'
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>
        <button type="submit">Siguiente</button>
      </form>
    </div>
  );
};

export default DatosContacto;
