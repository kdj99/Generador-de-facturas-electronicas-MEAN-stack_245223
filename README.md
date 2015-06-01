# Generador-de-facturas-electronicas-MEAN-stack_245223

Hecho por:

Luis Alberto Maldonado Vargas 245360
Carlos Ramirez Longoria 245223


Generador de facturas electronicas usando MEAN stack

Sistema web para ingresar clientes a una base de datos los cuales son usados para generar una factura electronica
ingresando productos a facturar.

Para hacer uso de este sistema es necesario tener instalado MONGODB y NODE.JS
la base de datos alojada en mongodb, es "efactura", para levantar el sistema en un puerto de localhost por medio de node.js,
ingresamos con la terminal al directorio del proyecto "efacutra" y ejecutamos la instruccion "node server", asi podremos acceder
al sistema por el puerto 3000 de localhost.

En adicion a esto se optó por generar el PDF con la herramienta jsPDF https://github.com/MrRio/jsPDF

Esta herramienta tiene varios plugins para sus diferentes uso , se utilzaron los siguientes:
jquery-2.1.4.js
jspdf.js
jspdf.plugin.addimage.js
jspdf.plugin.standard_fonts_metrics.js 
jspdf.plugin.split_text_to_size.js   
jspdf.plugin.from_html.js
jspdf.plugin.table.js
jspdf.plugin.cell.js
FileSaver.js
generarPDF.js

Todos estos plugins asi como  el script creado "generarPDF.js" se encuentran en una carpeta llamada jspdf en /public/jspdf

