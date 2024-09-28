const entradasTimesheet = JSON.parse(localStorage.getItem('entradasTimesheet')) || [];

document.getElementById('formulario-timesheet').addEventListener('submit', function (e) {
    e.preventDefault();

    const fecha = document.getElementById('fecha').value;
    const horas = parseFloat(document.getElementById('horas').value);
    const horasExtras = parseFloat(document.getElementById('horas-extras').value);
    const tarea = document.getElementById('tarea').value;
    const totalHoras = horas + horasExtras;
    const estado = "Pendiente";

    const nuevaEntrada = { fecha, horas, horasExtras, totalHoras, tarea, estado };

    entradasTimesheet.push(nuevaEntrada);
    localStorage.setItem('entradasTimesheet', JSON.stringify(entradasTimesheet));
    renderizarEntradas();
    limpiarFormulario();
});

function renderizarEntradas() {
    const cuerpoTabla = document.getElementById('entradas-timesheet');
    cuerpoTabla.innerHTML = '';
    entradasTimesheet.forEach(entrada => {
        const nuevaFila = document.createElement('tr');
        nuevaFila.innerHTML = `
            <td>${entrada.fecha}</td>
            <td>${entrada.horas}</td>
            <td>${entrada.horasExtras}</td>
            <td>${entrada.totalHoras}</td>
            <td>${entrada.tarea}</td>
            <td>${entrada.estado}</td>
        `;
        cuerpoTabla.appendChild(nuevaFila);
    });
}

function limpiarFormulario() {
    document.getElementById('fecha').value = '';
    document.getElementById('horas').value = '';
    document.getElementById('horas-extras').value = 0;
    document.getElementById('tarea').value = '';
}

document.getElementById('validar').addEventListener('click', function () {
    entradasTimesheet.forEach(entrada => {
        entrada.estado = entrada.totalHoras >= 8 ? 'Aprobado' : 'No Aprobado';
    });
    localStorage.setItem('entradasTimesheet', JSON.stringify(entradasTimesheet));
    renderizarEntradas();
});

document.getElementById('consultarHoras').addEventListener('click', function () {
    const totalHoras = entradasTimesheet.reduce((total, entrada) => total + entrada.totalHoras, 0);
    document.getElementById('total-horas').innerText = `Total de horas trabajadas: ${totalHoras}`;
});

document.getElementById('limpiar').addEventListener('click', function () {
    localStorage.removeItem('entradasTimesheet');
    entradasTimesheet.length = 0;
    renderizarEntradas(); 
    document.getElementById('total-horas').innerText = ''; 
});


renderizarEntradas();
