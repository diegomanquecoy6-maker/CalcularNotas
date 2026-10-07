// Atrapamos los elementos principales que vamos a usar
const contenedorNotas = document.getElementById('contenedor-notas');
const btnAgregar = document.getElementById('btn-agregar');
const btnCalcular = document.getElementById('btn-calcular');
const divResultado = document.getElementById('resultado');
const spanPromedio = document.getElementById('promedio-final');
const pMensaje = document.getElementById('mensaje');

// Función para crear una nueva fila de notas en el HTML
btnAgregar.addEventListener('click', () => {
    // Creamos un nuevo div y le damos su clase
    const nuevaFila = document.createElement('div');
    nuevaFila.classList.add('fila-nota');
    
    // Le inyectamos el HTML interno
    nuevaFila.innerHTML = `
        <input type="number" class="nota" placeholder="Ej: 5.5" step="0.1" min="1" max="7">
        <input type="number" class="porcentaje" placeholder="Porcentaje %" min="1" max="100">
        <button class="btn-eliminar">X</button>
    `;
    
    // Se lo pegamos al contenedor principal
    contenedorNotas.appendChild(nuevaFila);
    asignarEventosEliminar(); // Refrescamos los botones de eliminar
});

// Función para darle vida a los botones "X" (eliminar)
function asignarEventosEliminar() {
    const botonesEliminar = document.querySelectorAll('.btn-eliminar');
    botonesEliminar.forEach(boton => {
        // Para evitar duplicar eventos, lo removemos y volvemos a poner
        boton.onclick = function() {
            // El botón elimina a su padre directo (la fila completa)
            this.parentElement.remove();
        };
    });
}

// Inicializamos el evento para el primer botón que ya viene en el HTML
asignarEventosEliminar();

// ¡Hora de las matemáticas!
btnCalcular.addEventListener('click', () => {
    const inputsNotas = document.querySelectorAll('.nota');
    const inputsPorcentajes = document.querySelectorAll('.porcentaje');
    
    let sumaPonderada = 0;
    let porcentajeTotal = 0;

    // Recorremos todas las filas ingresadas
    for (let i = 0; i < inputsNotas.length; i++) {
        const valorNota = parseFloat(inputsNotas[i].value);
        const valorPorcentaje = parseFloat(inputsPorcentajes[i].value);

        // Si el usuario dejó algo vacío o mal escrito, lo saltamos
        if (!isNaN(valorNota) && !isNaN(valorPorcentaje)) {
            // Multiplicamos la nota por su peso (ej: 5.0 * 0.2 para un 20%)
            sumaPonderada += valorNota * (valorPorcentaje / 100);
            porcentajeTotal += valorPorcentaje;
        }
    }

    if (porcentajeTotal === 0) {
        alert("¡Oye! Primero ingresa algunas notas y porcentajes válidos.");
        return;
    }

    if (porcentajeTotal > 100) {
        alert("Cuidado, la suma de los porcentajes no puede ser mayor a 100%.");
        return;
    }

    // Mostramos el resultado redondeado a 2 decimales
    divResultado.classList.remove('oculto');
    spanPromedio.textContent = sumaPonderada.toFixed(2);

    // Damos un mensaje de ánimo o alerta según el 4.0 tradicional
    if (sumaPonderada >= 4.0) {
        divResultado.className = 'aprobado';
        pMensaje.textContent = "¡Vas súper bien, sigues aprobando el ramo!";
    } else {
        divResultado.className = 'reprobado';
        pMensaje.textContent = "Peligro, hay que subir esas notas para salvar el semestre.";
    }
});
