const servicePrices = {
    logo: 100,
    web: 300,
    flyer: 50
};

function simulateProcess() {
    const serviceType = document.getElementById('serviceType').value;
    const numRevisions = parseInt(document.getElementById('numRevisions').value);
    const resultElement = document.getElementById('result');
    const discountMessageElement = document.getElementById('discountMessage');
    const errorMessageElement = document.getElementById('errorMessage');

    resultElement.textContent = "";
    discountMessageElement.textContent = "";
    errorMessageElement.textContent = "";

    if (isNaN(numRevisions) || numRevisions < 1 || numRevisions > 10) {
        errorMessageElement.textContent = 'El número de revisiones debe estar entre 1 y 10.';
        return;
    }

    let basePrice = servicePrices[serviceType];
    let totalPrice = basePrice + numRevisions * 10;

    let discountMessage = "";
    if (numRevisions > 5) {
        totalPrice *= 0.9; // Descuento del 10%
        discountMessage = "¡Se ha aplicado un descuento del 10% por más de 5 revisiones!";
    } else {
        discountMessage = "No se ha aplicado ningún descuento.";
    }

    resultElement.textContent = `El precio total es: $${totalPrice.toFixed(2)}`;
    discountMessageElement.textContent = discountMessage;
    
    resultElement.classList.add('highlight');
    discountMessageElement.classList.add('highlight');

    const cotizacion = {
        servicio: serviceType,
        revisiones: numRevisions,
        precioTotal: totalPrice,
        descuento: discountMessage
    };

    localStorage.setItem('ultimaCotizacion', JSON.stringify(cotizacion));
}

function checkForm() {
    const numRevisions = document.getElementById('numRevisions').value;
    const calculateBtn = document.getElementById('calculateBtn');
    
    if (numRevisions >= 1 && numRevisions <= 10) {
        calculateBtn.disabled = false;
    } else {
        calculateBtn.disabled = true;
    }
}

window.onload = function() {
    const lastCotizacion = localStorage.getItem('ultimaCotizacion');
    if (lastCotizacion) {
        const cotizacion = JSON.parse(lastCotizacion);
        document.getElementById('result').textContent = `Última cotización: ${cotizacion.servicio}, Revisiones: ${cotizacion.revisiones}, Precio: $${cotizacion.precioTotal.toFixed(2)}`;
        document.getElementById('discountMessage').textContent = cotizacion.descuento;
    }

    document.getElementById('numRevisions').addEventListener('input', checkForm);
};

document.getElementById('calculateBtn').addEventListener('click', simulateProcess);
