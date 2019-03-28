function descargarReporte(reporte) {
    var url = 'GenerarReporteCSV?op=' + reporte;
    var xhr = new XMLHttpRequest();
    xhr.ontimeout = function () {
        $("#dialog_espere").dialog("destroy");
        console.error("The request for " + url + " timed out.");
    };
    xhr.onload = function (e) {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        var blobURL = URL.createObjectURL(xhr.response);
        a.href = blobURL;
        a.download = reporte + '.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    };
    xhr.onreadystatechange = function (aEvt) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200)
                $("#dialog_espere").dialog("destroy");
            else
                $("#dialog_espere").dialog("destroy");
        }
        if (xhr.readyState === 3) {
            $("#progressbar").progressbar({
                value: 50
            });
        }
        if (xhr.readyState === 2) {
            $("#progressbar").progressbar({
                value: 25
            });
        }
    };
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.timeout = 86400000;
    xhr.send(null);
    $("<div id='dialog_espere' style='text-align: center;'>Descargando.<br><br>Este mensaje se cerrará automáticamente.<div id='progressbar'></div></div>").dialog({
        resizable: false,
        modal: true,
        draggable: false,
        closeOnEscape: false,
        width: 350,
        title: "Por favor espere",
        buttons: {},
        open: function () {
            $("#progressbar").progressbar({
                value: false
            });
        }
    });
}