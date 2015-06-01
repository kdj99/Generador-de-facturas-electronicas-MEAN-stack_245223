function descargarArchivo(contenidoEnBlob, nombreArchivo) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var save = document.createElement('a');
        save.href = event.target.result;
        save.target = '_blank';
        save.download = nombreArchivo || 'archivo.dat';
        var clicEvent = new MouseEvent('click', {
            'view': window,
                'bubbles': true,
                'cancelable': true
        });
        save.dispatchEvent(clicEvent);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    };
    reader.readAsDataURL(contenidoEnBlob);
};

//reúne los datos a exportar en un solo objeto para el archivo xml
function obtenerDatos() {
    return {
        nombre_empresa: document.getElementById('facturar.nombre_empresa').value,
        rfc_empresa: document.getElementById('facturar.rfc_empresa').value,
        direccion_empresa: document.getElementById('facturar.direccion_empresa').value,
        cfdi_empresa: document.getElementById('facturar.cfdi_empresa').value,
        sat_empresa: document.getElementById('facturar.sat_empresa').value,
        certificacion_empresa: document.getElementById('facturar.certificacion_empresa').value,
        nombre_cliente: document.getElementById('facturar.nombre').value,
        direccion_cliente: document.getElementById('facturar.direccion').value,
        telefono_cliente: document.getElementById('facturar.telefono').value,
        email_cliente: document.getElementById('facturar.email').value,
        rfc_cliente: document.getElementById('facturar.rfc').value,
        nombre_producto: document.getElementById('facturar.nombre_producto').value,
        cantidad: document.getElementById('facturar.cantidad').value,
        unitario: document.getElementById('facturar.unitario').value,
        importe: document.getElementById('facturar.importe').value,
        subtotal: document.getElementById('facturar.subtotal').value,
        iva: document.getElementById('facturar.iva').value,
        total: document.getElementById('facturar.total').value,
        fecha: (new Date()).toLocaleString("es-MX", {timeZone: "America/Chihuahua"})
    };
};

//"escapa" las entidades XML necesarias
//para los valores (y atributos) del archivo XML
function escaparXML(cadena) {
    if (typeof cadena !== 'string') {
        return '';
    };
    cadena = cadena.replace('&', '&amp;')
        .replace('<', '&lt;')
        .replace('>', '&gt;')
        .replace('"', '&quot;');
    return cadena;
};


//Genera un objeto con los datos para el archivo XML
function generarXml(datos) {
    var texto = [];
    texto.push('<?xml version="1.0" encoding="UTF-8" ?>\n');
    texto.push('<factura>\n');
    texto.push('\t<nombre empresa>');
    texto.push(escaparXML(datos.nombre_empresa));
    texto.push('</nombre empresa>\n');
    texto.push('\t<rfc empresa>');
    texto.push(escaparXML(datos.rfc_empresa));
    texto.push('</rfc empresa>\n');
    texto.push('\t<direccion empresa>');
    texto.push(escaparXML(datos.direccion_empresa));
    texto.push('</direccion empresa>\n');
    texto.push('\t<cfdi empresa>');
    texto.push(escaparXML(datos.cfdi_empresa));
    texto.push('</cfdi empresa>\n');
    texto.push('\t<sello sat empresa>');
    texto.push(escaparXML(datos.sat_empresa));
    texto.push('</sello sat empresa>\n');
    texto.push('\t<certificacion digital>');
    texto.push(escaparXML(datos.certificacion_empresa));
    texto.push('</certificacion digital>\n');
    texto.push('\t<nombre cliente>');
    texto.push(escaparXML(datos.nombre_cliente));
    texto.push('</nombre cliente>\n');
    texto.push('\t<direccion cliente>');
    texto.push(escaparXML(datos.direccion_cliente));
    texto.push('</direccion cliente>\n');
    texto.push('\t<telefono cliente>');
    texto.push(escaparXML(datos.telefono_cliente));
    texto.push('</telefono cliente>\n');
    texto.push('\t<email cliente>');
    texto.push(escaparXML(datos.email_cliente));
    texto.push('</email cliente>\n');
    texto.push('\t<rfc cliente>');
    texto.push(escaparXML(datos.rfc_cliente));
    texto.push('</rfc cliente>\n');
    texto.push('\t<Nombre producto>');
    texto.push(escaparXML(datos.nombre_producto));
    texto.push('</Nombre producto>\n');
    texto.push('\tCantidad producto>');
    texto.push(escaparXML(datos.cantidad));
    texto.push('</Cantidad producto>\n');
    texto.push('\tUnitario producto>');
    texto.push(escaparXML(datos.unitario));
    texto.push('</Unitario producto>\n');
    texto.push('\timporte producto>');
    texto.push(escaparXML(datos.importe));
    texto.push('</importe producto>\n');
    texto.push('\tSubtotal>');
    texto.push(escaparXML(datos.subtotal));
    texto.push('</Subtotal>\n');
    texto.push('\tIva>');
    texto.push(escaparXML(datos.iva));
    texto.push('</Iva>\n');
    texto.push('\tTotal>');
    texto.push(escaparXML(datos.total));
    texto.push('</Total>\n');
    texto.push('\t<Fecha>');
    texto.push(escaparXML(datos.fecha));
    texto.push('</Fecha>\n');
    texto.push('</factura>');

    return new Blob(texto, {
        type: 'application/xml'
    });
};

document.getElementById('generar-xml').addEventListener('click', function () {
    var datos = obtenerDatos();
    descargarArchivo(generarXml(datos), 'factura.xml');
}, false);
