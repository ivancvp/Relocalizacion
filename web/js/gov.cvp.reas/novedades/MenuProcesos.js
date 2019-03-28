

/* global formularioConsulta, google, gantt, usuario_login, URL_IMPRIMIR */

var MenuProcesosBusquedaContinua = true;
var MenuProcesosFallasBusquedaContinua = 0;
var MenuProcesosTiemposBusquedaContinua = [10000, 15000, 20000, 30000, 60000, 1000000000000];
var MenuProcesosIntervaloSeleccionadoBusquedaContinua = MenuProcesosTiemposBusquedaContinua[0];
var MenuProcesosIntervaloBusquedaContinua;

function IniciarMenuProcesos(contenedor) {
    $("#" + contenedor).empty();

    $("#" + contenedor).append(
            '<a id="dropdown" class="dropdown-toggle info-number" data-toggle="dropdown" aria-expanded="false">' +
            '    <i class="fa fa-comments"></i> Tareas ' +
            '    <span class="badge" id="lbl-total-actividades">0</span>' +
            '</a>'
            );

    //$("#" + contenedor).append('<ul id="lista-actividades" class="dropdown-menu list-unstyled msg_list" role="menu"></ul>');
    $("#" + contenedor).append('<ul id="tabs-actividades" class="dropdown-menu" role="menu" style="color:black">' +
            '   <ul class="nav nav-tabs"></ul>' +
            '    <div class="tab-content"></div>' +
            '</ul>');


    $('#tabs-actividades').on('click', '.nav-tabs a', function () {
        $(this).closest('.dropdown').addClass('dontClose');
    });

    $("#" + contenedor).on('show.bs.dropdown', function (e) {
        clearInterval(MenuProcesosIntervaloBusquedaContinua);
    });

    $("#" + contenedor).on('hide.bs.dropdown', function (e) {
        if ($(this).hasClass('dontClose')) {
            e.preventDefault();
        } else {
            MenuProcesosIterarBusquedaContinua(contenedor);
        }
        $(this).removeClass('dontClose');
    });

    MenuProcesosBuscarActividades(contenedor);
    if (MenuProcesosBusquedaContinua) {
        MenuProcesosIntervaloBusquedaContinua = setTimeout(function () {
            MenuProcesosIterarBusquedaContinua(contenedor);
        }, MenuProcesosIntervaloSeleccionadoBusquedaContinua);
    }

}

var MenuProcesosIterarBusquedaContinua = function (contenedor) {

    MenuProcesosBuscarActividades(contenedor);

    if (MenuProcesosIntervaloBusquedaContinua) {
        clearInterval(MenuProcesosIntervaloBusquedaContinua);
    }
    MenuProcesosIntervaloBusquedaContinua = setTimeout(function () {
        MenuProcesosIterarBusquedaContinua(contenedor);
    }, MenuProcesosIntervaloSeleccionadoBusquedaContinua);
};

function MenuProcesosBuscarActividades(contenedor) {
    $.ajax({
        type: "POST",
        url: "GestionConsultas",
        dataType: "text",
        async: false,
        data: {op: "consulta_actividades_usuario", _c: Math.random()},
        timeout: 5,
        success: function (response) {
            if (response) {

                var res = eval('(' + response + ')');

                if (res && res.total) {
                    $('#' + contenedor).find('#lbl-total-actividades').text(res.total);
                    MenuProcesosFallasBusquedaContinua = 0;
                    MenuProcesosIntervaloSeleccionadoBusquedaContinua = MenuProcesosTiemposBusquedaContinua[0];
                }
                if (res && res.data) {
                    var listaTiposActividades = [];

                    $('#' + contenedor).find("#tabs-actividades").find("ul.nav").empty();
                    $('#' + contenedor).find("#tabs-actividades").find("div.tab-content").empty();

                    for (var i = 0; i < res.data.length; i++) {

                        var actividad = res.data[i];

                        //Crear lista de pestañas por cada tipo de actividad
                        if (listaTiposActividades.indexOf(actividad.actividad) === -1) {
                            var activa = ($('#' + contenedor).find("#tabs-actividades").find("ul.nav").find('li').length > 0 ? '' : 'active');

                            listaTiposActividades.push(actividad.actividad);

                            $('#' + contenedor).find("#tabs-actividades").find("ul.nav").append(
                                    '<li class="' + activa + '">' +
                                    '  <a id="lbl_tab_actividad_' + actividad.tipo_actividad_id + '" href="#actividad_' + actividad.tipo_actividad_id + '" data-toggle="tab">' + actividad.actividad + ' <span class="badge label label-pill label-warning" id="lbl-total-novedades">0</span></a>' +
                                    '</li>'
                                    );
                            $('#' + contenedor).find("#tabs-actividades").find("div.tab-content").append(
                                    '<div class="tab-pane ' + activa + '" id="actividad_' + actividad.tipo_actividad_id + '">' +
                                    ' <input data-actividad="' + actividad.tipo_actividad_id + '" class="search" style="margin-left:10px;" placeholder="Buscar..." id="txtBuscar_actividad_' + actividad.tipo_actividad_id + '"/>' +
                                    '  <ul id="lista-actividades_' + actividad.tipo_actividad_id + '" class="list-unstyled msg_list">' +
                                    '</div>');

                            $('#' + contenedor).find("#tabs-actividades").find("div.tab-content").on('click', function (event) {
                                event.stopPropagation();
                            });

                            $('#' + contenedor).find("#tabs-actividades").find('#lista-actividades_' + actividad.tipo_actividad_id).on('click', function (event) {
                                event.stopPropagation();
                            });

                            //Filtrar actividades por Cordis o identificador
                            $('#' + contenedor).find("#tabs-actividades").find('#txtBuscar_actividad_' + actividad.tipo_actividad_id).on('change', function (event) {
                                var actividad = $(this).data("actividad");
                                var actividades = $('#' + contenedor).find("#tabs-actividades").find('#lista-actividades_' + actividad).find(".actividad");
                                for (var i = 0; i < actividades.length; i++) {
                                    var act = actividades[i];
                                    var data = $(act).data();

                                    $(act).toggleClass("collapse",
                                            data.cordis.indexOf($(this).val()) === -1 &&
                                            data.identificador.indexOf($(this).val()) === -1
                                            );
                                }
                            });


                        }

                        var contenedor_tab = $('#' + contenedor).find("#tabs-actividades").find('#lista-actividades_' + actividad.tipo_actividad_id);

                        $(contenedor_tab).append(
                                '<li class="actividad" ' +
                                '        data-cordis="' + actividad.cordis_entrada + '" ' +
                                '        data-identificador="' + actividad.identificador + '" ' +
                                '        data-proceso-id="' + actividad.proceso_id + '" ' +
                                '        data-actividad-id="' + actividad.tipo_actividad_id + '" ' +
                                '>' +
                                '    <div class="datos">' +
                                '        <h5><b>Cordis: ' + actividad.cordis_entrada + '</b> | Identificador: ' + actividad.identificador + '</h5>' +
                                '        <span>' +
                                //'            <span><b>' + actividad.actividad + '</b> | <i>' + actividad.proceso + '</i> | <span class="text-info"><b>' + actividad.estado + '</b></span></span>' +
                                '            <span class="time">' +
                                '                <button data-id="' + actividad.identificador + '" type="button" title="Ver expediente" class="btn btn-xs btn-primary btn-ver-expediente"><span class="glyphicon glyphicon-folder-open" aria-hidden="true"></span></button>' +
                                '                <button data-proceso-id="' + actividad.proceso_id + '" data-actividad-id="' + actividad.tipo_actividad_id + '" type="button" title="Ver detalles" class="btn btn-xs btn-success btn-comentarios"><span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span></button>' +
                                '                <button data-proceso-id="' + actividad.proceso_id + '" data-actividad-id="' + actividad.tipo_actividad_id + '" type="button" title="Asignar A" class="btn btn-xs btn-default btn-asignar"><span class="glyphicon glyphicon-share-alt" style="color: #f0ad4e;" aria-hidden="true"></span></button>' +
                                '            </span>' +
                                '        </span>' +
                                '        <span class="message">' +
                                '            <i class="glyphicon glyphicon-user"></i> ' + actividad.usuario_nombre + ' <small>' + actividad.fecha_asignacion + '</small>' +
                                '        </span>' +
                                '    </div>' +
                                '</li>');

                        $('#' + contenedor).find("#tabs-actividades").find('#lbl_tab_actividad_' + actividad.tipo_actividad_id).find("#lbl-total-novedades").html($(contenedor_tab).find("li.actividad").length);
                    }
                    //seleccionar elemento
                    $('#' + contenedor).find("li.actividad").on('click', function (event) {
                        $(this).toggleClass("seleccionado");
                    });

                    //Ver el expediente
                    $('#' + contenedor).find(".btn-ver-expediente").on('click', function () {
                        formularioConsulta.iniciarFormulario();
                        $("#" + formularioConsulta.div).find("#consulta_txtCodigoSolicitud")[0].value = $(this).data("id");
                        formularioConsulta.buscarSolicitud();
                    });

                    $('#' + contenedor).find(".btn-comentarios").on('click', function () {
                        MenuProcesosVerDetalles(contenedor, $(this).data("proceso-id"), $(this).data("actividad-id"));
                    });

                    $('#' + contenedor).find(".btn-asignar").on('click', function () {
                        MenuProcesosAbrirMenuAsignar(contenedor, $(this).data("proceso-id"), $(this).data("actividad-id"));
                    });

                } else {
                    MenuProcesosProcesarFallaBuscarActividades();
                }
            } else {
                MenuProcesosProcesarFallaBuscarActividades();
            }
        }, error: function () {
            MenuProcesosProcesarFallaBuscarActividades();
        }
    });
}

function MenuProcesosBuscarActividades_old(contenedor) {
    $.ajax({
        type: "POST",
        url: "GestionConsultas",
        dataType: "text",
        async: false,
        data: {op: "consulta_actividades_usuario", _c: Math.random()},
        timeout: 5,
        success: function (response) {
            if (response) {

                var res = eval('(' + response + ')');
                var lista = $("#" + contenedor).find('#lista-actividades');

                lista.find('li').empty();


                if (res && res.total) {
                    $('#' + contenedor).find('#lbl-total-actividades').text(res.total);
                    MenuProcesosFallasBusquedaContinua = 0;
                    MenuProcesosIntervaloSeleccionadoBusquedaContinua = MenuProcesosTiemposBusquedaContinua[0];
                }
                if (res && res.data) {

                    lista.on('click', function (event) {
                        event.stopPropagation();
                    });

                    for (var i = 0; i < res.data.length; i++) {
                        var actividad = res.data[i];
                        lista.append(
                                '<li>' +
                                '    <div class="">' +
                                '        <h5><b>Cordis: ' + actividad.cordis_entrada + '</b> | Identificador: ' + actividad.identificador + '</h5>' +
                                '        <span>' +
                                '            <span><b>' + actividad.actividad + '</b> | <i>' + actividad.proceso + '</i> | <span class="text-info"><b>' + actividad.estado + '</b></span></span>' +
                                '            <span class="time">' +
                                '                <button data-id="' + actividad.identificador + '" type="button" title="Ver expediente" class="btn btn-xs btn-primary btn-ver-expediente"><span class="glyphicon glyphicon-folder-open" aria-hidden="true"></span></button>' +
                                '                <button data-proceso-id="' + actividad.proceso_id + '" data-actividad-id="' + actividad.tipo_actividad_id + '" type="button" title="Ver detalles" class="btn btn-xs btn-success btn-comentarios"><span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span></button>' +
                                '            </span>' +
                                '        </span>' +
                                '        <span class="message">' +
                                '            <i class="glyphicon glyphicon-user"></i> ' + actividad.usuario_nombre + ' <small>' + actividad.fecha_asignacion + '</small>' +
                                '        </span>' +
                                '    </div>' +
                                '</li>'
                                );
                    }

                    lista.find(".btn-ver-expediente").on('click', function () {
                        formularioConsulta.iniciarFormulario();
                        $("#" + formularioConsulta.div).find("#consulta_txtCodigoSolicitud")[0].value = $(this).data("id");
                        formularioConsulta.buscarSolicitud();
                    });

                    lista.find(".btn-comentarios").on('click', function () {
                        MenuProcesosVerDetalles(contenedor, $(this).data("proceso-id"), $(this).data("actividad-id"));
                    });

                    lista.find(".btn-asignar").on('click', function () {
                        alert("no disponible aun");
                    });
                } else {
                    MenuProcesosProcesarFallaBuscarActividades();
                }
            } else {
                MenuProcesosProcesarFallaBuscarActividades();
            }
        }, error: function () {
            MenuProcesosProcesarFallaBuscarActividades();
        }
    });
}

//Si no hay conexion con el servidor se deja un tiempo de espera antes de hacer una nueva petición
function MenuProcesosProcesarFallaBuscarActividades() {
    MenuProcesosFallasBusquedaContinua++;
    console.log("Fallas en busqueda: " + MenuProcesosFallasBusquedaContinua);
    if (MenuProcesosFallasBusquedaContinua > 3 &&
            MenuProcesosTiemposBusquedaContinua.indexOf(MenuProcesosIntervaloSeleccionadoBusquedaContinua) < MenuProcesosTiemposBusquedaContinua.length - 1) {
        MenuProcesosFallasBusquedaContinua = 0;
        MenuProcesosIntervaloSeleccionadoBusquedaContinua = MenuProcesosTiemposBusquedaContinua[MenuProcesosTiemposBusquedaContinua.indexOf(MenuProcesosIntervaloSeleccionadoBusquedaContinua) + 1];
        console.log("Intervalo de busqueda: " + MenuProcesosIntervaloSeleccionadoBusquedaContinua);
    }
}

function MenuProcesosVerDetalles(contenedor, proceso_id, actividad_id) {
    var modal_id = Math.random().toString(36).substring(7);

    var html = '<div id="dynamicModal-' + modal_id + '" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="confirm-modal" aria-hidden="true">';
    html += '<div class="modal-dialog modal-lg"  style=" width: 95%;">';
    html += '<div class="modal-content">';
    html += '<div class="modal-header">';
    html += '<a class="close" data-dismiss="modal">×</a>';
    html += '<h4>Novedades</h4>';
    html += '</div>';
    html += '<div class="modal-body">';

    html += ' <div id="lista_comentarios" ></div>';

    html += '</div>';
    html += '<div class="modal-footer">';
    html += '  <span class="btn btn-default" data-dismiss="modal">Cerrar</span>';
    html += '</div>';  // footer
    html += '</div>';  // content
    html += '</div>';  // dialog
    html += '</div>';  // modalWindow
    $('body').append(html);
    $("#dynamicModal-" + modal_id).modal();
    $("#dynamicModal-" + modal_id).modal('show');

    $("#dynamicModal-" + modal_id).on('hidden.bs.modal', function (e) {
        $(this).remove();
    });

    google.charts.load('current', {packages: ["orgchart"]});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Name');
        data.addColumn('string', 'Manager');
        data.addColumn('string', 'ToolTip');

        var objeto = {
            op: "consulta_arbol_actividades",
            proceso: proceso_id
        };
        $.ajax({
            type: "POST",
            url: "GestionConsultas",
            dataType: "text",
            async: true,
            data: objeto,
            success: function (response) {
                var timelineContainer = $("#dynamicModal-" + modal_id).find("#lista_comentarios");
                timelineContainer.empty();
                if (response)
                {
                    var res = eval('(' + response + ')');
                    if (res && res.total > 0) {
                        for (var i = 0; i < res.data.length; i++) {
                            var f;
                            if (res.data[i].tipo_actividad_id.toString() === actividad_id.toString() && res.data[i].actividad_usuario === usuario_login) {
                                f = res.data[i].actividad
                                        + '<div style="font-size:0.6em;">' + res.data[i].usuario_nombre + '</div>'
                                        + '<div style="font-size:0.6em;">'
                                        //+ (res.data[i].tiest_proc_id !== 3 ? '  <a id="btn-en-proceso" class="btn btn-default" data-proceso-id="' + res.data[i].proceso_id + '" data-actividad-id="' + res.data[i].tipo_actividad_id + '" title="Marcar En proceso"><i class="fa fa-gears" style="color: #337ab7; opacity: 0.6;"></i></a>' : '')
                                        + '  <a id="btn-asignar" class="btn btn-default" data-proceso-id="' + res.data[i].proceso_id + '" data-actividad-id="' + res.data[i].tipo_actividad_id + '" title="Asignar a"><i class="fa fa-share" style="color: #f0ad4e; opacity: 0.6;"></i></a> | ';

                                //+ '  <a id="btn-comentarios" class="btn btn-default" data-proceso-id="' + res.data[i].proceso_id + '" data-actividad-id="' + res.data[i].tipo_actividad_id + '" title="Comentarios"><i class="fa fa-comment" style="color: #337ab7; opacity: 0.6;"></i></a>'
                                switch (res.data[i].operacion) {
                                    case ("Gestionar Contratos"):
                                    {
                                        f += '  <a class="btn btn-default" id="btn-ver-contratos" title="Ver Contratos" ' +
                                                '  data-identificador="' + res.data[i].identificador + '"' +
                                                '  data-proceso-id="' + res.data[i].proceso_id + '" ' +
                                                '  data-tipo-actividad-id="' + res.data[i].tipo_actividad_id + '" ' +
                                                ' ><i class="fa fa-tasks" style="color: #337ab7; opacity: 0.6;"></i></a>';
                                        break;
                                    }
                                    case ("Oficio Respuesta"):
                                    {
                                        f += '  <a class="btn btn-default" id="btn-formulario-oficio-respuesta" title="Datos de respuesta"' +
                                                '  data-identificador="' + res.data[i].identificador + '" ' +
                                                '  data-cordis-entrada="' + res.data[i].cordis_entrada + '" ' +
                                                '  data-cordis-salida="' + res.data[i].cordis_salida + '" ' +
                                                '  data-noti-direccion="' + res.data[i].noti_direccion + '" ' +
                                                '  data-noti-barrio="' + res.data[i].noti_barrio + '" ' +
                                                '  data-noti-localidad="' + res.data[i].noti_localidad + '" ' +
                                                '  data-noti-ciudad="' + res.data[i].noti_ciudad + '" ' +
                                                '  data-noti-telefono="' + res.data[i].noti_telefono + '" ' +
                                                '  data-noti-nombre="' + res.data[i].noti_nombre + '" ' +
                                                '  data-proceso-id="' + res.data[i].proceso_id + '" ' +
                                                '  data-tipo-actividad-id="' + res.data[i].tipo_actividad_id + '" ' +
                                                ' ><i class="fa fa-edit" style="color: #337ab7; opacity: 1;"></i></a>' +
                                                '<a id="btn-imprimir-oficio-respuesta" title="Imprimir respuesta" class="btn btn-default ' + (!res.data[i].puede_completarse ? 'disabled' : '') + '" ' +
                                                ' data-identificador="' + res.data[i].identificador + '" ' +
                                                ' data-cordis-entrada="' + res.data[i].cordis_entrada + '" ' +
                                                ' data-cordis-salida="' + res.data[i].cordis_salida + '" ' +
                                                ' data-noti-direccion="' + res.data[i].noti_direccion + '" ' +
                                                ' data-noti-barrio="' + res.data[i].noti_barrio + '" ' +
                                                ' data-noti-localidad="' + res.data[i].noti_localidad + '" ' +
                                                ' data-noti-ciudad="' + res.data[i].noti_ciudad + '" ' +
                                                ' data-noti-telefono="' + res.data[i].noti_telefono + '" ' +
                                                ' data-noti-nombre="' + res.data[i].noti_nombre + '" ' +
                                                '><i class="fa fa-file-pdf-o" style="color: #337ab7; opacity: 0.6;"></i></a>';
                                        break;
                                    }
                                    case ("Cordis Salida"):
                                    {
                                        f += '  <a class="btn btn-default" id="btn-formulario-cordis-salida" title="CORDIS de respuesta"' +
                                                '  data-identificador="' + res.data[i].identificador + '" ' +
                                                '  data-cordis-entrada="' + res.data[i].cordis_entrada + '" ' +
                                                '  data-cordis-salida="' + res.data[i].cordis_salida + '" ' +
                                                '  data-noti-direccion="' + res.data[i].noti_direccion + '" ' +
                                                '  data-noti-barrio="' + res.data[i].noti_barrio + '" ' +
                                                '  data-noti-localidad="' + res.data[i].noti_localidad + '" ' +
                                                '  data-noti-ciudad="' + res.data[i].noti_ciudad + '" ' +
                                                '  data-noti-telefono="' + res.data[i].noti_telefono + '" ' +
                                                '  data-noti-nombre="' + res.data[i].noti_nombre + '" ' +
                                                '  data-proceso-id="' + res.data[i].proceso_id + '" ' +
                                                '  data-tipo-actividad-id="' + res.data[i].tipo_actividad_id + '" ' +
                                                ' ><i class="fa fa-edit" style="color: #337ab7; opacity: 1;"></i></a>';
                                        break;
                                    }
                                    case ("Formulario Revision Jurídica"):
                                    {
                                        f += '  <a class="btn btn-default" id="btn-formulario-revision-juridica" title="Revision Jurídica"' +
                                                '  data-identificador="' + res.data[i].identificador + '" ' +
                                                '  data-cordis-entrada="' + res.data[i].cordis_entrada + '" ' +
                                                '  data-cordis-salida="' + res.data[i].cordis_salida + '" ' +
                                                '  data-noti-direccion="' + res.data[i].noti_direccion + '" ' +
                                                '  data-noti-barrio="' + res.data[i].noti_barrio + '" ' +
                                                '  data-noti-localidad="' + res.data[i].noti_localidad + '" ' +
                                                '  data-noti-ciudad="' + res.data[i].noti_ciudad + '" ' +
                                                '  data-noti-telefono="' + res.data[i].noti_telefono + '" ' +
                                                '  data-noti-nombre="' + res.data[i].noti_nombre + '" ' +
                                                '  data-proceso-id="' + res.data[i].proceso_id + '" ' +
                                                '  data-tipo-actividad-id="' + res.data[i].tipo_actividad_id + '" ' +
                                                ' ><i class="fa fa-edit" style="color: #337ab7; opacity: 1;"></i></a>' +
                                                '<a id="btn-imprimir-formato-revision-juridica" class="btn btn-default ' + (!res.data[i].puede_completarse ? 'disabled' : '') + '" ' +
                                                '  data-proceso-id="' + res.data[i].proceso_id + '" ' +
                                                '  data-actividad-id="' + res.data[i].tipo_actividad_id + '" ' +
                                                '  data-identificador="' + res.data[i].identificador + '" ' +
                                                '  data-cordis-entrada="' + res.data[i].cordis_entrada + '" ' +
                                                '  title="Imprimir Formato">' +
                                                '  <i class="fa fa-file-pdf-o" style="color: #AF0000; opacity: 0.9;"></i>' +
                                                '</a>'
                                                ;
                                        break;
                                    }
                                    case ("Impresion Concepto viabilidad"):
                                    {
                                        f += '<a id="btn-imprimir-formato-revision-juridica" class="btn btn-default" ' +
                                                '  data-proceso-id="' + res.data[i].proceso_id + '" ' +
                                                '  data-actividad-id="' + res.data[i].tipo_actividad_id + '" ' +
                                                '  title="Imprimir Formato">' +
                                                '  <i class="fa fa-file-pdf-o" style="color: #AF0000; opacity: 0.9;"></i>' +
                                                '</a>'
                                                ;
                                        break;
                                    }
                                    case ("asignacion responsable"):
                                    {
                                        f += '<a id="btn-iasignar-respponsable" class="btn btn-default" ' +
                                                '  data-proceso-id="' + res.data[i].proceso_id + '" ' +
                                                '  data-actividad-id="' + res.data[i].tipo_actividad_id + '" ' +
                                                '  title="asignacion responsable">' +
                                                '  <i class="fa fa-edit" style="color: #AF0000; opacity: 0.9;"></i>' +
                                                '</a>'
                                                ;
                                        break;
                                    }
                                    case ("imprimir formato notificacion"):
                                    {
                                        f += '<a id="btn-formulario-notificacion" class="btn btn-default" ' +
                                                '  data-proceso-id="' + res.data[i].proceso_id + '" ' +
                                                '  data-actividad-id="' + res.data[i].tipo_actividad_id + '" ' +
                                                '   onclick="abrirModal(this)"' +
                                                '  title="Generar Docuemnto de Notificación">' +
                                                '  <i class="fa fa-edit" style="color: #AF0000; opacity: 0.9;"></i>' +
                                                '</a>' +
                                                '<a id="btn-imprimir-notificacion" class="btn btn-default" ' +
                                                '  data-proceso-id="' + res.data[i].proceso_id + '" ' +
                                                '  data-actividad-id="' + res.data[i].tipo_actividad_id + '" ' +
                                                '  title="Imprimir Formato">' +
                                                '  <i class="fa fa-file-pdf-o" style="color: #AF0000; opacity: 0.9;"></i>' +
                                                '</a>'
                                                ;
                                        break;
                                    }
                                    default:
                                        break;
                                }
                                f += ' |   <a id="btn-completada" class="btn btn-default ' + (!res.data[i].puede_completarse ? 'disabled' : '') + '" data-proceso-id="' + res.data[i].proceso_id + '" data-actividad-id="' + res.data[i].tipo_actividad_id + '" title="Marcar como Completada"><i class="fa fa-check" style="color: green; opacity: 0.6;"></i></a>'
                                        + '</div>';
                            } else {
                                f = res.data[i].actividad
                                        + '<div style="font-size:0.6em;">' + res.data[i].usuario_nombre + '</div>';

                                var icono_estado;
                                switch (res.data[i].tiest_proc_id) {
                                    case 1:
                                    {
                                        icono_estado = 'fa fa-info';
                                        break;
                                    }
                                    case 2:
                                    {
                                        icono_estado = 'fa fa-user';
                                        break;
                                    }
                                    case 3:
                                    {
                                        icono_estado = 'fa fa-gears';
                                        break;
                                    }
                                    case 4:
                                    {
                                        icono_estado = 'fa fa-check';
                                        break;
                                    }
                                }
                                f += '<div style="font-size:0.6em;">'
                                        + '  <i class="' + icono_estado + ' disabled" style="cursor:default; opacity: 0.6;"></i> ' + res.data[i].estado
                                        + (res.data[i].tiest_proc_id !== 4 ? '  <a id="btn-asignar" class="btn btn-default" data-proceso-id="' + res.data[i].proceso_id + '" data-actividad-id="' + res.data[i].tipo_actividad_id + '" title="Asignar a"><i class="fa fa-share" style="color: #f0ad4e; opacity: 0.6;"></i></a>' : '');
                                +'</div>';
                            }

                            data.addRow([
                                {
                                    v: res.data[i].tipo_actividad_id,
                                    f: f
                                },
                                res.data[i].actividad_previa,
                                ''
                            ]);

                            if (res.data[i].tipo_actividad_id.toString() === actividad_id.toString()) {
                                //data.setRowProperty(i, 'style', 'border: 1px solid green; opacity:1; background: rgba(0, 0, 0, 0) linear-gradient(to bottom, #fff7ae 0%, #eee79e 100%) repeat scroll 0 0;');
                                //data.setRowProperty(i, 'style', 'border: 1px solid green; opacity:1; background: rgba(0, 0, 0, 0) linear-gradient(to bottom, #fff7ae 0%, #eee79e 100%) repeat scroll 0 0;');
                                data.setRowProperty(i, 'style', 'opacity:1; border: 2px solid #b5d9ea; background: rgba(0, 0, 0, 0) linear-gradient(to bottom, #b5d9ea 0%, #b5d9ea 100%) repeat scroll 0 0; ');
                                data.setRowProperty(i, 'selectedStyle', 'opacity:1; border: 2px solid #b5d9ea; background: rgba(0, 0, 0, 0) linear-gradient(to bottom, #b5d9ea 0%, #b5d9ea 100%) repeat scroll 0 0; ');
                            } else {
                                data.setRowProperty(i, 'style', 'border: 1px solid #ccc; background: #ccc; opacity:1;');
                                data.setRowProperty(i, 'selectedStyle', 'border: 1px solid #ccc; background: #ccc; opacity:1;');
                            }

                        }

                        // Create the chart.
                        //var chart = new google.visualization.OrgChart(document.getElementById('lista_comentarios'));
                        var chart = new google.visualization.OrgChart($("#dynamicModal-" + modal_id).find('#lista_comentarios')[0]);
                        // Draw the chart, setting the allowHtml option to true for the tooltips.
                        google.visualization.events.addListener(chart, 'ready', function (e) {
                            $("#dynamicModal-" + modal_id).find("#lista_comentarios").find("#btn-en-proceso").on('click', function (e) {
                                MenuProcesosPonerEnProceso(contenedor, $(e.currentTarget).data("proceso-id"), $(e.currentTarget).data("actividad-id"), modal_id);
                            });
                            $("#dynamicModal-" + modal_id).find("#lista_comentarios").find("a#btn-asignar").on('click', function (e) {
                                MenuProcesosAbrirMenuAsignar(contenedor, $(e.currentTarget).data("proceso-id"), $(e.currentTarget).data("actividad-id"), modal_id, true);
                            });
                            $("#dynamicModal-" + modal_id).find("#lista_comentarios").find("#btn-completada").on('click', function (e) {
                                MenuProcesosMarcarCompletada(contenedor, $(e.currentTarget).data("proceso-id"), $(e.currentTarget).data("actividad-id"), modal_id);
                            });


                            /*Operaciones*/


                            /*Ver Comentarios**/
                            $("#dynamicModal-" + modal_id).find("#lista_comentarios").find("#btn-ver-contratos").on('click', function (e) {
                                var identificador = $(e.currentTarget).data("identificador");
                                var proceso = $(e.currentTarget).data("proceso-id");
                                var tipo_actividad = $(e.currentTarget).data("tipo-actividad-id");

                                GestionarContratos(identificador, proceso, tipo_actividad, function () {
                                    $("#dynamicModal-" + modal_id).modal('hide').data('bs.modal', null);
                                    window.setTimeout(function () {
                                        //IniciarMenuProcesos(contenedor);
                                        clearInterval(MenuProcesosIntervaloBusquedaContinua);
                                        MenuProcesosIterarBusquedaContinua(contenedor);
                                        MenuProcesosVerDetalles(contenedor, proceso_id, actividad_id);
                                    }, 300);

                                });
                            });

                            /*Formulario Oficio de Respuesta**/
                            $("#dynamicModal-" + modal_id).find("#lista_comentarios").find("#btn-formulario-oficio-respuesta").on('click', function (e) {
                                var identificador = $(e.currentTarget).data("identificador");
                                var cordis = $(e.currentTarget).data("cordis-entrada");
                                var proceso = $(e.currentTarget).data("proceso-id");
                                var tipo_actividad = $(e.currentTarget).data("tipo-actividad-id");
                                formularioOficioRespuestaBuscarDatosCargados(identificador, cordis, proceso, tipo_actividad, function () {
                                    $("#dynamicModal-" + modal_id).modal('hide').data('bs.modal', null);
                                    window.setTimeout(function () {
                                        //IniciarMenuProcesos(contenedor);
                                        clearInterval(MenuProcesosIntervaloBusquedaContinua);
                                        MenuProcesosIterarBusquedaContinua(contenedor);
                                        MenuProcesosVerDetalles(contenedor, proceso_id, actividad_id);
                                    }, 300);

                                });
                            });

                            /*Imprimir Oficio respuesta**/
                            $("#dynamicModal-" + modal_id).find("#lista_comentarios").find("#btn-imprimir-oficio-respuesta").on('click', function (e) {
                                var data = {
                                    identificador: $(e.currentTarget).data("identificador"),
                                    cordis_entrada: $(e.currentTarget).data("cordis-entrada"),
                                    noti_direccion: $(e.currentTarget).data("noti-direccion"),
                                    noti_barrio: $(e.currentTarget).data("noti-barrio"),
                                    noti_localidad: $(e.currentTarget).data("noti-localidad"),
                                    noti_telefono: $(e.currentTarget).data("noti-telefono"),
                                    noti_nombre: $(e.currentTarget).data("noti-nombre"),
                                    noti_ciudad: $(e.currentTarget).data("noti-ciudad"),
                                    usuario: usuario_login,
                                    __a: Math.random()
                                };
                                $.ajax({
                                    type: "POST",
                                    url: URL_IMPRIMIR + "pdf/imprimir_oficio_respuesta_solucitud_renovacion_ayuda.php",
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
                            });

                            /*Formulario Cordis de Salida*/
                            $("#dynamicModal-" + modal_id).find("#lista_comentarios").find("#btn-formulario-cordis-salida").on('click', function (e) {

                                var identificador = $(e.currentTarget).data("identificador");
                                var cordis = $(e.currentTarget).data("cordis-entrada");
                                var proceso = $(e.currentTarget).data("proceso-id");
                                var tipo_actividad = $(e.currentTarget).data("tipo-actividad-id");
                                formularioCordisSalidaBuscarDatosCargados(identificador, cordis, proceso, tipo_actividad, function () {
                                    $("#dynamicModal-" + modal_id).modal('hide').data('bs.modal', null);
                                    window.setTimeout(function () {
                                        //IniciarMenuProcesos(contenedor);
                                        clearInterval(MenuProcesosIntervaloBusquedaContinua);
                                        MenuProcesosIterarBusquedaContinua(contenedor);
                                        MenuProcesosVerDetalles(contenedor, proceso_id, actividad_id);
                                    }, 300);

                                });
                            });

                            $("#dynamicModal-" + modal_id).find("#lista_comentarios").find("#btn-formulario-revision-juridica").on('click', function (e) {
                                var identificador = $(e.currentTarget).data("identificador");
                                var cordis = $(e.currentTarget).data("cordis-entrada");
                                var proceso = $(e.currentTarget).data("proceso-id");
                                var tipo_actividad = $(e.currentTarget).data("tipo-actividad-id");
                                formularioRevisionJuridicaNuevoContrato(identificador, cordis, proceso, tipo_actividad, function () {
                                    $("#dynamicModal-" + modal_id).modal('hide').data('bs.modal', null);
                                    window.setTimeout(function () {
                                        //IniciarMenuProcesos(contenedor);
                                        clearInterval(MenuProcesosIntervaloBusquedaContinua);
                                        MenuProcesosIterarBusquedaContinua(contenedor);
                                        MenuProcesosVerDetalles(contenedor, proceso_id, actividad_id);
                                    }, 300);

                                });
                            });
                            $("#dynamicModal-" + modal_id).find("#lista_comentarios").find("#btn-imprimir-formato-revision-juridica").on('click', function (e) {
                                var identificador = $(e.currentTarget).data("identificador");
                                var cordis = $(e.currentTarget).data("cordis-entrada");
                                formularioRevisionJuridicaNuevoContratoImprimirConcepto(identificador, cordis);
                            });
                            /*Formulario Oficio de Respuesta**/
                            $("#dynamicModal-" + modal_id).find("#lista_comentarios").find("#btn-formulario-notificacion").on('click', function (e) {
                                var identificador = $(e.currentTarget).data("identificador");
                                var cordis = $(e.currentTarget).data("cordis-entrada");
                                var proceso = $(e.currentTarget).data("proceso-id");
                                var tipo_actividad = $(e.currentTarget).data("tipo-actividad-id");
                                formularioOficioRespuestaBuscarDatosCargados(identificador, cordis, proceso, tipo_actividad, function () {
                                    $("#dynamicModal-" + modal_id).modal('hide').data('bs.modal', null);
                                    window.setTimeout(function () {
                                        //IniciarMenuProcesos(contenedor);
                                        clearInterval(MenuProcesosIntervaloBusquedaContinua);
                                        MenuProcesosIterarBusquedaContinua(contenedor);
                                        MenuProcesosVerDetalles(contenedor, proceso_id, actividad_id);
                                    }, 300);

                                });
                            });
                        });
                        chart.draw(data, {allowHtml: true, size: 'large'});
                    }
                }
            }, error: function () {
                alert("No fué posible obtener las actividades");
            }
        });
    }
}





function MenuProcesosAbrirMenuAsignar(contenedor, proceso_id, tipo_actividad_id, parent_modal_id, ver_detalles) {
    var modal_id = Math.random().toString(36).substring(7);

    var html = '<div id="dynamicModal-' + modal_id + '" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="confirm-modal" aria-hidden="true">';
    html += '<div class="modal-dialog">';
    html += '<div class="modal-content">';
    html += '<div class="modal-header">';
    html += '<a class="close" data-dismiss="modal">×</a>';
    html += '<h4>Asignar a</h4>';
    html += '</div>';
    html += '<div class="modal-body">';

    html += '<form class="form" role="form" data-toggle="validator">' +
            '  <div class="form-group">' +
            '    <label for="usuarioSelector">Asignar A:</label><div class="clearfix"></div>' +
            '    <select class="form-control" id="usuarioSelector" required></select>' +
            '  </div>' +
            '</form>';

    html += '</div>';
    html += '<div class="modal-footer">';
    html += '  <span class="btn btn-primary" id="btnGuardarAsignarA">Guardar</span>';
    html += '  <span class="btn btn-default" data-dismiss="modal">Cerrar</span>';
    html += '</div>';  // footer
    html += '</div>';  // content
    html += '</div>';  // dialog
    html += '</div>';  // modalWindow
    $('body').append(html);
    $("#dynamicModal-" + modal_id).modal();
    $("#dynamicModal-" + modal_id).modal('show');

    $("#dynamicModal-" + modal_id).on('hidden.bs.modal', function (e) {
        $(this).remove();
    });

    MenuProcesosMenuAsignarCargarUsuarios(contenedor, $("#dynamicModal-" + modal_id).find("#usuarioSelector"), 'consulta_usuarios_asignar_tarea', proceso_id, tipo_actividad_id);

    $("#dynamicModal-" + modal_id).find("#btnGuardarAsignarA").on('click', function (e) {
        var alertas = [];

        if (!$("#dynamicModal-" + modal_id).find("#usuarioSelector").val()) {
            alertas.push('Debe seleccionar el usuario');
        }
        if (alertas.length > 0) {
            var html = '<div id="dynamicModal-error-' + modal_id + '" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="confirm-modal" aria-hidden="true">';
            html += '<div class="modal-dialog">';
            html += '<div class="modal-content panel-warning">';
            html += '<div class="modal-header panel-heading">';
            html += '<a class="close" data-dismiss="modal">×</a>';
            html += '<h4>Error</h4>';
            html += '</div>';
            html += '<div class="modal-body">';
            html += '<p>';
            for (var i = 0; i < alertas.length; i++) {
                html += '  <h5>' + alertas[i] + '</h5>';
                html += '  <hr class="separator">';
            }
            html += '<div class="modal-footer">';
            html += '<span class="btn btn-default" data-dismiss="modal">Cerrar</span>';
            html += '</div>';  // content
            html += '</div>';  // dialog
            html += '</div>';  // footer
            html += '</div>';  // modalWindow
            $('body').append(html);
            $("#dynamicModal-error-" + modal_id).modal();
            $("#dynamicModal-error-" + modal_id).modal('show');

            $("#dynamicModal-error-" + modal_id).on('hidden.bs.modal', function (e) {
                $(this).remove();
            });

            return;
        }

        var datos = {
            op: "AsignarTarea",
            proceso_id: proceso_id,
            tipo_actividad_id: tipo_actividad_id,
            actividad_usuario: $("#dynamicModal-" + modal_id).find("#usuarioSelector").val()
        };

        $.ajax({
            type: "POST",
            url: "GestionDML",
            dataType: "text",
            data: datos,
            success: function (response) {
                if (response)
                {
                    var res = eval('(' + response + ')');
                    if (res && res.total > 0) {
                        $("#dynamicModal-" + modal_id).modal('hide');

                        gantt.message("Tarea actualizada");
                        if (parent_modal_id) {
                            $("#dynamicModal-" + parent_modal_id).modal('hide');
                        }

                        //IniciarMenuProcesos(contenedor);
                        clearInterval(MenuProcesosIntervaloBusquedaContinua);
                        MenuProcesosIterarBusquedaContinua(contenedor);

                        if (ver_detalles) {
                            MenuProcesosVerDetalles(contenedor, proceso_id, tipo_actividad_id);
                        }
                    } else {
                        gantt.message({type: "error", text: "No fué posible almacenar la resolución"});
                    }
                }
            }, error: function () {
                gantt.message({type: "error", text: "No fué posible almacenar la resolución"});
            }
        });
    });
}

function MenuProcesosMenuAsignarCargarUsuarios(contenedor, control, op, proceso_id, tipo_actividad_id) {
    $.ajax({
        type: "POST",
        url: "GestionConsultas",
        dataType: "text",
        async: false,
        data: {op: op, proceso_id: proceso_id, tipo_actividad_id: tipo_actividad_id},
        success: function (response) {
            if (response)
            {
                var res = eval('(' + response + ')');

                $(control).empty();

                if (res && res.total > 0) {
                    $(control).append(
                            ' <option value="null" selected disabled>Seleccione...</option>');

                    for (var i = 0; i < res.data.length; i++) {
                        $(control).append('<option value="' + res.data[i].id + '" ' + (res.data[i].selected ? 'selected' : '') + '>' + res.data[i].desc + '</option>');
                    }
                }
            }
        }, error: function () {
            alert("No fué posible obtener las alternativas");
        }
    });
}

function MenuProcesosPonerEnProceso(contenedor, proceso_id, tipo_actividad_id, parent_modal_id) {
    $.ajax({
        type: "POST",
        url: "GestionDML",
        dataType: "text",
        async: false,
        data: {op: "ActualizarTareaEnProceso", proceso_id: proceso_id, tipo_actividad_id: tipo_actividad_id},
        success: function (response) {
            if (response)
            {
                var res = eval('(' + response + ')');
                if (res && res.total > 0) {
                    $("#dynamicModal-" + parent_modal_id).modal('hide');
                    gantt.message("Tarea actualizada");
                    //IniciarMenuProcesos(contenedor);
                    clearInterval(MenuProcesosIntervaloBusquedaContinua);
                    MenuProcesosIterarBusquedaContinua(contenedor);

                    MenuProcesosVerDetalles(contenedor, proceso_id, tipo_actividad_id);
                }
            }
        }, error: function () {
            alert("No fué posible obtener las alternativas");
        }
    });
}
function MenuProcesosMarcarCompletada(contenedor, proceso_id, tipo_actividad_id, parent_modal_id) {
    $.ajax({
        type: "POST",
        url: "GestionDML",
        dataType: "text",
        async: false,
        data: {op: "ActualizarTareaCompletada", proceso_id: proceso_id, tipo_actividad_id: tipo_actividad_id},
        success: function (response) {
            if (response)
            {
                var res = eval('(' + response + ')');
                if (res && res.total > 0) {
                    $("#dynamicModal-" + parent_modal_id).modal('hide');
                    gantt.message("Tarea Completada");
                    //IniciarMenuProcesos(contenedor);
                    clearInterval(MenuProcesosIntervaloBusquedaContinua);
                    MenuProcesosIterarBusquedaContinua(contenedor);
                }
            }
        }, error: function () {
            alert("No fué posible obtener las alternativas");
        }
    });
}



function formularioCordisSalidaBuscarDatosCargados(identificador, cordis, proceso_id, tipo_actividad_id, callback) {
    $.ajax({
        type: "POST",
        url: "GestionConsultas",
        dataType: "text",
        async: false,
        data: {
            op: 'ConsultaDatosCordisSalidaSolicitudNuevoContrato',
            identificador: identificador,
            cordis: cordis,
            _a: Math.random()
        },
        success: function (response) {
            if (response)
            {
                var res = eval('(' + response + ')');

                if (res && res.total > 0) {
                    formularioCordisSalidaAbrirFormulario(identificador, cordis, proceso_id, tipo_actividad_id, callback, res.data[0]);
                } else {
                    formularioCordisSalidaAbrirFormulario(identificador, cordis, proceso_id, tipo_actividad_id, callback);
                }
            }
        }, error: function () {
            alert("No fué posible obtener los datos almacenados");
        }
    });
}


function formularioCordisSalidaAbrirFormulario(identificador, cordis, proceso_id, tipo_actividad_id, callback, datos) {

    var modal_id = Math.random().toString(36).substring(7);

    var html = '<div id="dynamicModal-' + modal_id + '" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="confirm-modal" aria-hidden="true">';
    html += '<div class="modal-dialog modal-lg"  style=" width: 95%;">';
    html += '<div class="modal-content">';
    html += '<div class="modal-header">';
    html += '<a class="close" data-dismiss="modal">×</a>';
    html += '<h4>Revision Jurídica nuevo contrato</h4>';
    html += '</div>';
    html += '<div class="modal-body">';


    html +=
            '<form class="form row" role="form" data-toggle="validator">' +
            '  <div class="form-group col-xs-12 col-sm-6">' +
            '    <label for="estadoSelector">Cordis de Entrada:</label><div class="clearfix"></div>' +
            '    <input type="text" class="form-control" id="cordis" value="' + (datos.cordis_entrada ? datos.cordis_entrada : '') + '"readonly></input>' +
            '  </div>' +
            '  <div class="form-group  col-xs-12 col-sm-6">' +
            '    <label for="estadoSelector">Identificador:</label><div class="clearfix"></div>' +
            '    <input type="text" class="form-control" id="identificador" value="' + (datos.identificador ? datos.identificador : '') + '" readonly></input>' +
            '  </div>' +
            '  <div class="form-group col-xs-12 col-sm-6">' +
            '    <label for="cordis-entrada">CORDIS de Salida:</label><div class="clearfix"></div>' +
            '    <input type="text" class="form-control" id="cordis-salida" value="' + (datos.cordis_salida ? datos.cordis_salida : '') + '" required></input>' +
            '  </div>' +
            '  <div class="form-group col-xs-12 col-sm-6">' +
            '    <label for="fecha-cordis-entrada">Fecha de CORDIS de Salida:</label><div class="clearfix"></div>' +
            '    <input type="text" class="form-control datepicker" id="fecha-cordis-salida" value="' + (datos.cordis_fecha_salida ? datos.cordis_fecha_salida : '') + '" required></input>' +
            '  </div>' +
            '</form>';

    html += '</div>';
    html += '<div class="modal-footer">';
    html += '  <span class="btn btn-primary" id="btnGuardarRevisionJuridicaNuevoContrato">Guardar</span>';
    html += '  <span class="btn btn-default" data-dismiss="modal">Cerrar</span>';
    html += '</div>';  // footer
    html += '</div>';  // content
    html += '</div>';  // dialog
    html += '</div>';  // modalWindow
    $('body').append(html);
    $("#dynamicModal-" + modal_id).modal();
    $("#dynamicModal-" + modal_id).modal('show');

    $("#dynamicModal-" + modal_id).on('hidden.bs.modal', function (e) {
        $(this).remove();
    });

    $("#dynamicModal-" + modal_id).find("input.datepicker").datepicker({
        dateFormat: "dd/mm/yy"
    });


    //Guardar nuevo proceso
    $("#dynamicModal-" + modal_id).find("#btnGuardarRevisionJuridicaNuevoContrato").on('click', function (e) {

        $.ajax({
            type: "POST",
            url: "GestionDML",
            dataType: "text",
            async: false,
            data: {
                op: "ActualizarDatosCordisSalidaSolicitudNuevoContrato",
                cordis: cordis,
                identificador: identificador,
                cordis_salida: $("#dynamicModal-" + modal_id).find("#cordis-salida").val(),
                cordis_fecha_salida: $("#dynamicModal-" + modal_id).find("#fecha-cordis-salida").val(),
                proceso_id: proceso_id,
                tipo_actividad_id: tipo_actividad_id
            },
            success: function (response) {
                if (response)
                {
                    var res = eval('(' + response + ')');
                    if (res && res.total > 0) {
                        $("#dynamicModal-" + modal_id).modal('hide');
                        //alert("Pendiente actualizar identificador");
                        gantt.message("Datos almacenados Correctamente");
                        callback();
                    }
                }
            }, error: function () {
                alert("No fué posible almacenar la información");
            }
        });
    });

    GestionarProcesosCargarProcesos($("#dynamicModal-" + modal_id).find("#localidadSelector"), 'consulta_localidad_oficio_respuesta_revision_nuevo_contrato', datos.noti_localidad);
}


function formularioOficioRespuestaBuscarDatosCargados(identificador, cordis, proceso_id, tipo_actividad_id, callback) {
    $.ajax({
        type: "POST",
        url: "GestionConsultas",
        dataType: "text",
        async: false,
        data: {
            op: 'ConsultaDatosOficioRespuestaNuevoContrato',
            identificador: identificador,
            cordis: cordis,
            _a: Math.random()
        },
        success: function (response) {
            if (response)
            {
                var res = eval('(' + response + ')');

                if (res && res.total > 0) {
                    formularioOficioRespuestaAbrirFormulario(identificador, cordis, proceso_id, tipo_actividad_id, callback, res.data[0]);
                } else {
                    formularioOficioRespuestaAbrirFormulario(identificador, cordis, proceso_id, tipo_actividad_id, callback);
                }
            }
        }, error: function () {
            alert("No fué posible obtener los datos almacenados");
        }
    });
}

function formularioOficioRespuestaAbrirFormulario(identificador, cordis, proceso_id, tipo_actividad_id, callback, datos) {

    var modal_id = Math.random().toString(36).substring(7);

    var html = '<div id="dynamicModal-' + modal_id + '" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="confirm-modal" aria-hidden="true">';
    html += '<div class="modal-dialog modal-lg"  style=" width: 95%;">';
    html += '<div class="modal-content">';
    html += '<div class="modal-header">';
    html += '<a class="close" data-dismiss="modal">×</a>';
    html += '<h4>Revision Jurídica nuevo contrato</h4>';
    html += '</div>';
    html += '<div class="modal-body">';


    html +=
            '<form class="form row" role="form" data-toggle="validator">' +
            '  <div class="form-group col-xs-12 col-sm-6">' +
            '    <label for="estadoSelector">Cordis:</label><div class="clearfix"></div>' +
            '    <input type="text" class="form-control" id="cordis" value="' + (datos.cordis_entrada ? datos.cordis_entrada : '') + '"readonly></input>' +
            '  </div>' +
            '  <div class="form-group  col-xs-12 col-sm-6">' +
            '    <label for="estadoSelector">Identificador:</label><div class="clearfix"></div>' +
            '    <input type="text" class="form-control" id="identificador" value="' + (datos.identificador ? datos.identificador : '') + '" readonly></input>' +
            '  </div>' +
            '  <div class="form-group col-xs-12 col-sm-6">' +
            '    <label for="cordis-entrada">Nombre del interesado:</label><div class="clearfix"></div>' +
            '    <input type="text" class="form-control" id="noti_nombre" value="' + (datos.noti_nombre ? datos.noti_nombre : '') + '" required></input>' +
            '  </div>' +
            '  <div class="form-group col-xs-12 col-sm-6">' +
            '    <label for="cordis-entrada">Dirección de notificacion:</label><div class="clearfix"></div>' +
            '    <input type="text" class="form-control" id="noti_direccion" value="' + (datos.noti_direccion ? datos.noti_direccion : '') + '" required></input>' +
            '  </div>' +
            '  <div class="form-group col-xs-12 col-sm-6">' +
            '    <label for="cordis-entrada">Localidad de notificacion:</label><div class="clearfix"></div>' +
            '    <select class="form-control" id="localidadSelector" required></select>' +
            '  </div>' +
            '  <div id="grp-ciudad" class="form-group col-xs-12 col-sm-6 collapse">' +
            '    <label for="noti_ciudad">Ciudad de notificacion:</label><div class="clearfix"></div>' +
            '    <input type="text" class="form-control" id="noti_ciudad" value="' + (datos.noti_ciudad ? datos.noti_ciudad : '') + '" required></input>' +
            '  </div>' +
            '  <div class="form-group col-xs-12 col-sm-6">' +
            '    <label for="cordis-entrada">Barrio de notificacion:</label><div class="clearfix"></div>' +
            '    <input type="text" class="form-control" id="noti_barrio" value="' + (datos.noti_barrio ? datos.noti_barrio : '') + '" required></input>' +
            '  </div>' +
            '  <div class="form-group col-xs-12 col-sm-6">' +
            '    <label for="cordis-entrada">Teléfono de notificacion:</label><div class="clearfix"></div>' +
            '    <input type="text" class="form-control" id="noti_telefono" value="' + (datos.noti_telefono ? datos.noti_telefono : '') + '" required></input>' +
            '  </div>' +
            '</form>';

    html += '</div>';
    html += '<div class="modal-footer">';
    html += '  <span class="btn btn-primary" id="btnGuardarRevisionJuridicaNuevoContrato">Guardar</span>';
    html += '  <span class="btn btn-default" data-dismiss="modal">Cerrar</span>';
    html += '</div>';  // footer
    html += '</div>';  // content
    html += '</div>';  // dialog
    html += '</div>';  // modalWindow
    $('body').append(html);
    $("#dynamicModal-" + modal_id).modal();
    $("#dynamicModal-" + modal_id).modal('show');

    $("#dynamicModal-" + modal_id).on('hidden.bs.modal', function (e) {
        $(this).remove();
    });


    //Guardar nuevo proceso
    $("#dynamicModal-" + modal_id).find("#btnGuardarRevisionJuridicaNuevoContrato").on('click', function (e) {
        $.ajax({
            type: "POST",
            url: "GestionDML",
            dataType: "text",
            async: false,
            data: {
                op: "ActualizarDatosOficioRespuestaRevisionNuevoContrato",
                cordis: cordis,
                identificador: identificador,
                noti_barrio: $("#dynamicModal-" + modal_id).find("#noti_barrio").val(),
                noti_telefono: $("#dynamicModal-" + modal_id).find("#noti_telefono").val(),
                noti_direccion: $("#dynamicModal-" + modal_id).find("#noti_direccion").val(),
                noti_ciudad: $("#dynamicModal-" + modal_id).find("#noti_ciudad").val(),
                noti_localidad: $("#dynamicModal-" + modal_id).find("#localidadSelector").val() ? $("#dynamicModal-" + modal_id).find("#localidadSelector").val() : 'null',
                noti_nombre: $("#dynamicModal-" + modal_id).find("#noti_nombre").val(),
                proceso_id: proceso_id,
                tipo_actividad_id: tipo_actividad_id
            },
            success: function (response) {
                if (response)
                {
                    var res = eval('(' + response + ')');
                    if (res && res.total > 0) {
                        $("#dynamicModal-" + modal_id).modal('hide');
                        //alert("Pendiente actualizar identificador");
                        gantt.message("Datos almacenados Correctamente");
                        callback();
                    }
                }
            }, error: function () {
                alert("No fué posible almacenar la información");
            }
        });
    });



    $("#dynamicModal-" + modal_id).find("#localidadSelector").on('change', function (e) {
        $("#dynamicModal-" + modal_id).find("#grp-ciudad").toggleClass('collapse', $(this).val() !== "NA");
    });

    GestionarProcesosCargarProcesos($("#dynamicModal-" + modal_id).find("#localidadSelector"), 'consulta_localidad_oficio_respuesta_revision_nuevo_contrato', datos.noti_localidad, function () {
        $("#dynamicModal-" + modal_id).find("#grp-ciudad").toggleClass('collapse', $("#dynamicModal-" + modal_id).find("#localidadSelector").val() !== "NA");
    });
}
