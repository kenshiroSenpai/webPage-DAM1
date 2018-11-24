var tabla = [];
var quitaBoton, tablaValida = false;

window.onload = cargarTabla;

function cargarTabla() {
    document.getElementById("my-form").reset();
    document.getElementById("mostrar-tabla").addEventListener("click", mostrarTabla, false);
    document.getElementById("my-form").addEventListener("submit", listaEquipo, false);
}

function mostrarTabla() {

    var tablaEntera = "";
    for (var i = 0; i < tabla.length; i++) {
        tablaEntera += "<tr><td>" + tabla[i].linea + "</td><td>" + tabla[i].nombre + "</td></tr>";
    }

    if (tablaValida == true) {
        quitaBoton = true;
        document.getElementById("equipo-tabla").innerHTML = tablaEntera;
    }
    if (quitaBoton == true) {
        $('#mostrar-tabla').attr("disabled", true);
    }
}

function listaEquipo(event) {
    event.preventDefault();

    var f1 = $('#fila1').val();
    var f3 = $('#fila3').val();
    var f2 = $("#fila2").val();
    var f4 = $('#fila4').val();
    var f5 = $('#fila5').val();
    var f6 = $('#fila6').val();
    var f7 = $('#fila7').val();
    var f8 = $('#fila8').val();
    var f9 = $('#fila9').val();
    var f10 = $('#fila10').val();
    if (f1 != 0 && f2 != 0 && f3 != 0 && f4 != 0 && f5 != 0 && f6 != 0 && f7 != 0 && f8 != 0 && f9 != 0 && f10 != 0) {
        $("#message .modal-body").text('Se ha rellenado correctamente.');
        $("#message").modal();
        tablaValida = true;
    } else {
        $("#message .modal-body").text('Rellene todos los campos.');
        $("#message").modal();
    }

    var lineaIntroducida1 = document.getElementById("fila1").value;
    var nombreIntroducida1 = document.getElementById("fila2").value;
    var lineaIntroducida2 = document.getElementById("fila3").value;
    var nombreIntroducida2 = document.getElementById("fila4").value;
    var lineaIntroducida3 = document.getElementById("fila5").value;
    var nombreIntroducida3 = document.getElementById("fila6").value;
    var lineaIntroducida4 = document.getElementById("fila7").value;
    var nombreIntroducida4 = document.getElementById("fila8").value;
    var lineaIntroducida5 = document.getElementById("fila9").value;
    var nombreIntroducida5 = document.getElementById("fila10").value;

    var listaEquipo1 = { linea: lineaIntroducida1, nombre: nombreIntroducida1 };
    var listaEquipo2 = { linea: lineaIntroducida2, nombre: nombreIntroducida2 };
    var listaEquipo3 = { linea: lineaIntroducida3, nombre: nombreIntroducida3 };
    var listaEquipo4 = { linea: lineaIntroducida4, nombre: nombreIntroducida4 };
    var listaEquipo5 = { linea: lineaIntroducida5, nombre: nombreIntroducida5 };
    if (tablaValida == true) {
        tabla.push(listaEquipo1, listaEquipo2, listaEquipo3, listaEquipo4, listaEquipo5);
    }
}

function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;
    // El archivo CSV
    csvFile = new Blob([csv], {type: "text/csv"});
    downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";
    // Ponemos un link del modelo de objeto del documento(DOM)
    document.body.appendChild(downloadLink);
    downloadLink.click();
}
// Método para exportar la tabla en HTML a CSV.
function exportTableToCSV(filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");
        
        for (var j = 0; j < cols.length; j++) 
            row.push(cols[j].innerText);
        csv.push(row.join(","));        
    }
    // Descargar archivo CSV
    if(tablaValida==true){
        downloadCSV(csv.join("\n"), filename);
    }
    
}



