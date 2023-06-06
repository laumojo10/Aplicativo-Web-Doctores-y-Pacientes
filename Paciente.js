// Función para validar los campos del formulario de pacientes
function validarFormularioPacientes() {
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const cedula = document.getElementById('cedula').value;
  const edad = document.getElementById('edad').value;
  const telefono = document.getElementById('telefono').value;
  const especialidad = document.getElementById('especialidad').value;
  
  // Expresión regular para validar el número de cédula (9 dígitos)
  const cedulaRegex = /^\d{9}$/;
  // Expresión regular para validar el teléfono (10 dígitos)
  const telefonoRegex = /^\d{10}$/;
  
  if (!nombre || !apellido || !cedula || !edad || !telefono || !especialidad) {
    alert('Por favor, complete todos los campos.');
    return false;
  }
  
  if (!cedula.match(cedulaRegex)) {
    alert('El número de cédula debe contener exactamente 9 dígitos.');
    return false;
  }
  
  if (!telefono.match(telefonoRegex)) {
    alert('El número de teléfono debe contener exactamente 10 dígitos.');
    return false;
  }
  
  return true;
}


// Obtener referencia al formulario Paciente
const pacienteForm = document.getElementById('paciente-form');


// Escuchar el evento de envío del formulario para pacientes
pacienteForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Evitar que el formulario se envíe

  // Obtener los valores del formulario para pacientes
  const nombre = pacienteForm.nombre.value;
  const apellido = pacienteForm.apellido.value;
  const numerodecedula = pacienteForm.numerodecedula.value;
  const edad           = pacienteForm.edad.value;
  const telefono       =pacienteForm.telefono.value;
  const especialidad   =pacienteForm.especialidad.value;
  

  // Crear un objeto con la información del paciente
  const paciente = {
    nombre,
    apellido,
    numerodecedula,
    edad,
    telefono,
    especialidad
  };

  // Convertir el objeto a JSON
  const pacienteJSON = JSON.stringify(paciente);


  // Guardar el archivo JSON
  guardarJSON('pacientes.json', pacienteJSON);
});

// Obtener el elemento en el que se mostrará la lista de pacientes
const listaPacientes = document.getElementById('lista-pacientes');

  // Leer el archivo JSON de pacientes y mostrar la información en la página
fetch('pacientes.json')
  .then(response => response.json())
  .then(pacientes => {
    const listaPacientes = document.createElement('ul');
    listaPacientes.id = 'lista-pacientes';

    pacientes.forEach(paciente => {
      const listItem = document.createElement('li');
      listItem.textContent = `Nombre: ${paciente.nombre} ${paciente.apellido}, Cedula: ${paciente.numerodecedula}, Edad: ${paciente.edad} ,Telefono :${paciente.telefono},Especialidad: ${paciente.especialidad}`;
      // Agregar más campos del paciente según la información

      listaPacientes.appendChild(listItem);
    });

    document.body.appendChild(listaPacientes);
  });
  .catch(error => {
    console.log('Error al cargar los pacientes:', error);
  });
