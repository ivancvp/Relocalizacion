var URL_IMPRIMIR = window.location.protocol + "//" + window.location.hostname + ":81/"; //"http://cs9068:81/";

$(document).on("click", ".pdf-res", function () {
    var objeto = {
        file: $(this).attr("id")
    };
    $.ajax({
        url: URL_IMPRIMIR + "pdf/expeResolucion.php",
        type: 'POST',
        data: objeto,
        success: function (data) {
            window.open(URL_IMPRIMIR + "pdf/" + data, "_blank");
        }
    });
});
$(document).on("click", ".pdf-res", existe_resolcion());

function buscar_resolucion() {
    var objeto = {
        resolucion: $('#numero_resolucion').val()
    };

    $.ajax({
        url: URL_IMPRIMIR + "pdf/consultar_resolucion.php",
        type: 'POST',
        data: objeto,
        dataType: 'JSON',
        success: function (data) {
            $('#resultados').empty();
            if (data.length > 0) {
                $.each(data, function (i, val) {
                    $('#resultados').append('<li  class="list-group-item pdf-res" id="' + val + '" "><a href="#"><span class="tab">' + val + '</span></a></li>');
                });
            } else {
                $('#resultados').append('<li  class="list-group-item"><a href="#"><span class="tab">No hay resultados </span></a></li>');
            }
        }
    });
}
function existe_resolucion() {
    var objeto = {
        resolucion: $(this).attr('id')
    };

    $.ajax({
        url: URL_IMPRIMIR + "pdf/consultar_resolucion.php",
        type: 'POST',
        data: objeto,
        dataType: 'JSON',
        success: function (data) {
            
        }
    });
}
