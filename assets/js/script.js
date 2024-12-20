document.getElementById('convertirBtn').addEventListener('click', realizarConversion);

async function realizarConversion() {
    const monto = parseFloat(document.getElementById('monto').value);
    const monedaSeleccionada = document.getElementById('moneda').value;
    const resultadoDiv = document.getElementById('resultado');

    if (!monto || !monedaSeleccionada) {
        resultadoDiv.innerHTML = 'Por favor, ingrese una cantidad válida y seleccione una moneda.';
        return;
    }

    try {
        const respuesta = await fetch('https://mindicador.cl/api/');
        if (!respuesta.ok) {
            throw new Error('No se pudo obtener los datos de la moneda.');
        }

        const datos = await respuesta.json();
        const moneda = datos[monedaSeleccionada];
        if (!moneda) {
            throw new Error(`No se encontró la moneda seleccionada: ${monedaSeleccionada}.`);
        }

        const tasaDeCambio = moneda.valor;
        const cantidadConvertida = monto / tasaDeCambio;

        const cantidadRedondeada = cantidadConvertida.toFixed(2);

        resultadoDiv.innerHTML = `${monto} CLP = ${cantidadRedondeada} ${moneda.nombre}`;
    } catch (error) {
        resultadoDiv.innerHTML = `Error: ${error.message}`;
        console.error(error);
    }
}