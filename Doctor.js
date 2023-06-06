
// Función para validar los campos del formulario de doctores
function validarFormularioDoctores() {
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const cedula = document.getElementById('cedula').value;
  const especialidad = document.getElementById('especialidad').value;
  const consultorio = document.getElementById('consultorio').value;
  const correo = document.getElementById('correo').value;
  
  // Expresión regular para validar el número de cédula (9 dígitos)
  const cedulaRegex = /^\d{9}$/;
  
  if (!nombre || !apellido || !cedula || !especialidad || !consultorio || !correo) {
    alert('Por favor, complete todos los campos.');
    return false;
  }
  
  if (!cedula.match(cedulaRegex)) {
    alert('El número de cédula debe contener exactamente 9 dígitos.');
    return false;
  }
  
  return true;
}

// Obtener referencia al formulario Doctor
const doctorForm = document.getElementById('doctor-form');


// Escuchar el evento de envío del formulario para doctores
doctorForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Evitar que el formulario se envíe

  // Obtener los valores del formulario para doctores
  const nombre = doctorForm.nombre.value;
  const apellido = doctorForm.apellido.value;
  const numerodecedula = doctorForm.numerodecedula.value;
  const especialidad   = doctorForm.especialidad.value;
  const consultorio    = doctorForm.consultorio.value;
  const correodecontacto = doctorForm.correodecontacto.value;
  

  // Crear un objeto con la información del doctor
  const doctor = {
    nombre,
    apellido,
    especialidad,
    consultorio,
    correodecontacto
   
  };

  // Convertir el objeto a JSON
  const doctorJSON = JSON.stringify(doctor);

  // Guardar el archivo JSON
  guardarJSON('doctores.json', doctorJSON);
});


// Obtener el elemento en el que se mostrará la lista de pacientes
const listaDoctores = document.getElementById('lista-doctores');

// Leer el archivo JSON de doctores y mostrar la información en la página
fetch('doctores.json')
  .then(response => response.json())
  .then(doctores => {
    const listaDoctores = document.createElement('ul');
    listaDoctores.id = 'lista-doctores';

    doctores.forEach(doctor => {
      const listItem = document.createElement('li');
      listItem.textContent = `Nombre: ${doctor.nombre} ${doctor.apellido}, Especialidad: ${doctor.especialidad}, Consultorio: ${doctor.consultorio}`;
      // Agregar más campos del doctor según la información

      listaDoctores.appendChild(listItem);
    });

    document.body.appendChild(listaDoctores);
  });
  .catch(error => {
    console.log('Error al cargar los doctores:', error);
  });
