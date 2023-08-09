import React, { useState } from 'react';
import DatosContacto from './components/DatosContacto/DatosContacto';
import FechaNacimientoContacto from './components/FechaNacimientoContacto/FechaNacimientoContacto';
import NombreContacto from './components/NombreContacto/NombreContacto';
import Modal from 'react-modal'; // Importa el componente del modal
import './App.css';
import axios from 'axios';
import Swal from 'sweetalert2';

function App() {
  const [nombreContactoData, setNombreContactoData] = useState(null);
  const [datosContactoData, setDatosContactoData] = useState(null);
  const [fechaNacimientoData, setFechaNacimientoData] = useState(null);
  const [mostrarDatos, setMostrarDatos] = useState(false);
  const [formularioActivo, setFormularioActivo] = useState(1); // 1: Nombre, 2: Datos de contacto, 3: Fecha de nacimiento
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleNombreSubmit = (nombreData) => {
    setNombreContactoData(nombreData);
    setFormularioActivo(2); // Mostrar el siguiente formulario (Datos de contacto)
  };

  const handleContactSubmit = (contactData) => {
    setDatosContactoData(contactData);
    setFormularioActivo(3); // Mostrar el siguiente formulario (Fecha de nacimiento)
  };

  const handleDateSubmit = (dateData) => {
    setFechaNacimientoData(dateData);
    setFormularioActivo(3); // Avanzar al siguiente formulario (valor 3 para indicar que ya se completó el formulario de fecha de nacimiento)
  };

  const handleSaveUser = async () => {
    try {
      const url = 'http://localhost:3001/api/guardar_usuario';
      const data = {
        nombre: nombreContactoData.primerNombre,
        segundo_nombre: nombreContactoData.segundoNombre,
        apellido_paterno: nombreContactoData.apellidoPaterno,
        apellido_materno: nombreContactoData.apellidoMaterno,
        email: datosContactoData.email,
        telefono: datosContactoData.telefono,
        fecha_nacimiento: fechaNacimientoData
      };
  
      const response = await axios.post(url, data);
  
      if (response.status === 201) {
        // Mostrar SweetAlert2 de éxito
        Swal.fire({
          icon: 'success',
          title: '¡Usuario guardado correctamente!',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        // Mostrar SweetAlert2 de error
        Swal.fire({
          icon: 'error',
          title: 'Error al guardar el usuario',
          text: 'Ha ocurrido un error al guardar el usuario en la base de datos.',
          confirmButtonText: 'Cerrar'
        });
      }
    } catch (error) {
      // Mostrar SweetAlert2 de error en caso de excepción
      Swal.fire({
        icon: 'error',
        title: 'Error al guardar el usuario',
        text: 'Ha ocurrido un error al guardar el usuario en la base de datos.',
        confirmButtonText: 'Cerrar'
      });
    }
  };

  const limpiarDatos = () => {
    setNombreContactoData(null);
    setDatosContactoData(null);
    setFechaNacimientoData(null);
    setMostrarDatos(false);
    setFormularioActivo(1);
  };
  
  return (
    <div className="App">
      <h1 className='app_title'>Datos de Contacto</h1>
      <div className="app_container">
        {/* Mostrar el primer formulario (Nombre) */}
        <div className={`form_container${formularioActivo === 1 ? ' form_active' : ''}`}>
          <NombreContacto onContactSubmit={handleNombreSubmit} />
          {nombreContactoData && (
            <div className="app_container_rosa">
              <div className="recuadro_rosa">
                <h3 className='app_subtitle'>Nombres Completos:</h3>
                <p><span className="app_parrafo">Primer Nombre:</span> {nombreContactoData.primerNombre}</p>
                <p><span className="app_parrafo">Segundo Nombre:</span> {nombreContactoData.segundoNombre}</p>
                <p><span className="app_parrafo">Apellido Paterno:</span> {nombreContactoData.apellidoPaterno}</p>
                <p><span className="app_parrafo">Apellido Materno:</span> {nombreContactoData.apellidoMaterno}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="app_container">
        {/* Mostrar el segundo formulario (Datos de contacto) */}
        <div className={`form_container${formularioActivo >= 2 ? ' form_active' : ''}`}>
          {formularioActivo >= 2 && (
            <DatosContacto onContactSubmit={handleContactSubmit} />
          )}
          {datosContactoData && (
            <div className="app_container_rosa">
              <div className="recuadro_rosa">
                <h3 className='app_subtitle'>Contacto:</h3>
                <p><span className="app_parrafo">Email:</span> {datosContactoData.email}</p>
                <p><span className="app_parrafo">Teléfono:</span> {datosContactoData.telefono}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="app_container">
        {/* Mostrar el tercer formulario (Fecha de nacimiento) */}
        <div className={`form_container${formularioActivo >= 3 ? ' form_active' : ''}`}>
          {formularioActivo >= 3 && (
            <FechaNacimientoContacto onDateSubmit={handleDateSubmit} />
          )}
          {fechaNacimientoData && (
            <div className="app_container_rosa">
              <div className="recuadro_rosa">
                <h3 className='app_subtitle'>Fecha de Nacimiento:</h3>
                <p><span className="app_parrafo">Fecha de Nacimiento:</span> {fechaNacimientoData}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {mostrarDatos && (
        <div className="container_cuadro_rosa">
          <div className="recuadro_rosa">
          <h3>Usuario Guardado Correctamente</h3>
            {nombreContactoData && (
              <div>
                <p>Primer Nombre: {nombreContactoData.primerNombre}</p>
                <p>Segundo Nombre: {nombreContactoData.segundoNombre}</p>
                <p>Apellido Paterno: {nombreContactoData.apellidoPaterno}</p>
                <p>Apellido Materno: {nombreContactoData.apellidoMaterno}</p>
              </div>
            )}
            {datosContactoData && (
              <div>
                <p>Email: {datosContactoData.email}</p>
                <p>Teléfono: {datosContactoData.telefono}</p>
              </div>
            )}
            {fechaNacimientoData && (
              <div>
                <p>Fecha de Nacimiento: {fechaNacimientoData}</p>
              </div>
            )}
          </div>
        </div>
      )}
     {!mostrarDatos && formularioActivo === 3 && (
        <div className="btn_iniciar">
          <button
            onClick={() => {
              setModalIsOpen(true);
              handleSaveUser();
            }}
            className="iniciar_button"
          >
            Iniciar
          </button>
        </div>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Datos Capturados"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div className="container_cuadro_rosa">
          <div className="recuadro_rosa">
            <h3>Todos los Datos Capturados:</h3>
            {nombreContactoData && (
              <div>
                <p>Primer Nombre: {nombreContactoData.primerNombre}</p>
                <p>Segundo Nombre: {nombreContactoData.segundoNombre}</p>
                <p>Apellido Paterno: {nombreContactoData.apellidoPaterno}</p>
                <p>Apellido Materno: {nombreContactoData.apellidoMaterno}</p>
              </div>
            )}
            {datosContactoData && (
              <div>
                <p>Email: {datosContactoData.email}</p>
                <p>Teléfono: {datosContactoData.telefono}</p>
              </div>
            )}
            {fechaNacimientoData && (
              <div>
                <p>Fecha de Nacimiento: {fechaNacimientoData}</p>
              </div>
            )}
          </div>
        </div>
        <button onClick={() => {
          setModalIsOpen(false);
          limpiarDatos();
          }} 
          className="modal-close-button">
          Cerrar
        </button>
      </Modal>
    </div>
  );
}

export default App;

