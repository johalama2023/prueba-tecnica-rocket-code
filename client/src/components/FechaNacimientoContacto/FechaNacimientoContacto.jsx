import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './FechaNacimientoContacto.css';

const FechaNacimientoContacto = ({ onDateSubmit }) => {
  const [fechaNacimiento, setFechaNacimiento] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de fecha de nacimiento
    const selectedDate = new Date(fechaNacimiento);
    const currentDate = new Date();

    if (selectedDate > currentDate) {
      Swal.fire({
        icon: 'error',
        title: 'Fecha de Nacimiento inválida',
        text: 'La fecha de nacimiento no puede ser mayor que la fecha actual.',
      });
      return;
    }

    onDateSubmit(fechaNacimiento);
  };

  return (
    <div className='nombre_container'>
      <div>
        <img className='nombre_img' src="https://i.postimg.cc/rwgzxkfQ/icono.png" alt="" />
      </div>
      <form className='nombre_form' onSubmit={handleSubmit}>
        <h2>¿Cuál es tu Fecha de Nacimiento?</h2>
        <div className="nombre_info">
          <label className='nombre_label'>Fecha de Nacimiento</label>
          <input
            className='nombre_input'
            type="date"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
          />
        </div>
        <button type="submit">Siguiente</button>
      </form>
    </div>
  );
};

export default FechaNacimientoContacto;
  