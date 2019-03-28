/* 
 * Configuracion y  funcion de crear notificacion
 */
var usuario_noti = "";
var identi = "";
var id_resolucion = 0;

var guardarNotificacion = function () {
    var usuario = $('#usuarioNoti').val();
    var fecha_notificacion =  $('#fechaNotificacion').val().split('/');

    if (usuario === "0") {
        usuario = usuario_noti;
    }
    $.ajax({
        type: "POST",
        url: "GestionDML",
        dataType: "text",
        async: false,
        data: {op: 'guardar_actualizar_notificacion', usuario: usuario, fecha: fecha_notificacion[2]+'-'+fecha_notificacion[0]+'-'+fecha_notificacion[1], identificador: identi, resolucion: id_resolucion},
        success: function (response) {
            if (response)
            {               
              $('#modalup').modal('hide'); 
              imprimirNotificacion(id_resolucion);
            }
        }
    });
};

function imprimirNotificacion(id_resolucion){
    var data = {
           resolucion: id_resolucion
    };
    $.ajax({
        type: "POST",
        url: URL_IMPRIMIR + "pdf/imprimir_notificacion_resolucion.php",
        dataType: "text",
        data: data,
        success: function (response) {
            if (response)
            {
                window.open(URL_IMPRIMIR + "pdf/" + response, "_blank");
            }
        }, error: function () {
            alert("No fué posible imprimir el documentos");
        }
    });
}
function usuariosNotifica() {
    var opciones = "<option value=\"0\">...</option>";
    $.ajax({
        type: "POST",
        url: "GestionConsultas",
        dataType: "text",
        async: false,
        data: {op: 'consulta_usuarios_asignar_tarea', proceso_id: 3, tipo_actividad_id: 42},
        success: function (response) {
            if (response)
            {
                var res = eval('(' + response + ')');

                if (res && res.total > 0) {
                    for (var i = 0; i < res.data.length; i++) {
                        opciones = opciones + '<option value="' + res.data[i].id + '" ' + (res.data[i].selected ? 'selected' : '') + '>' + res.data[i].desc + '</option>';
                    }
                }
            }
        }
    });
    return opciones;

}

var opciones = usuariosNotifica();
var form = $('<form />').attr('id', 'notificacionForm');
var labelFecha = $('<label />').attr({for : 'fechaNotificacion'}).text('Fecha');

var fecha = $('<input />').attr({type: 'text', id: 'fechaNotificacion', class: 'form-control'});
$(fecha).datepicker();
var select = $('<select />').attr({id: 'usuarioNoti', class: 'form-control'});
$(select).append(opciones);
var labelUsuario = $('<label />').attr({for : 'usuarioNoti'}).text('Usuario');
$(form).append(labelFecha);
$(form).append(fecha);
$(form).append(labelUsuario);
$(form).append(select);

//Cofiguración del modal
var conf = {
    tittle: "Notificacion de Resolucion",
    closeButtonName: "Cerrar",
    functionButtonName: "Guardar Notificacion",
    body: form,
    functions: {},
    callback: guardarNotificacion
};

function abrirModal(link) {
    identi = $(link).attr('identi');
    usuario_noti = $(link).attr('usuario');
    id_resolucion = $(link).attr('res');
    console.log(id_resolucion);
    $(this).modalup(conf);
}




