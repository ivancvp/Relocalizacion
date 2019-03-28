

/* global formularioConsulta */

function IniciarMenuNovedades(contenedor) {
    $("#" + contenedor).empty();

    $("#" + contenedor).append(
            '<a id="dropdown" class="dropdown-toggle info-number" data-toggle="dropdown" aria-expanded="false">' +
            '    <i class="fa fa-comments"></i> Novedades' +
            '    <span class="badge" id="lbl-total-novedades">0</span>' +
            '</a>'
            );

    BuscarNovedades(contenedor);
}

function BuscarNovedades(contenedor) {
    $.ajax({
        type: "POST",
        url: "GestionConsultas",
        dataType: "text",
        async: false,
        data: {op: "consulta_novedades_usuario", _c: Math.random()},
        success: function (response) {
            if (response) {
                var res = eval('(' + response + ')');
                if (res && res.total) {
                    $('#' + contenedor).find('#lbl-total-novedades').text(res.total);
                }
                if (res && res.total > 0) {
                    $("#" + contenedor).append('<ul id="lista-novedades" class="dropdown-menu list-unstyled msg_list" role="menu"></ul>');

                    var lista = $("#" + contenedor).find('#lista-novedades');

                    lista.on('click', function (event) {
                        event.stopPropagation();
                    });

                    for (var i = 0; i < res.data.length; i++) {
                        var novedad = res.data[i];
                        lista.append(
                                '<li>' +
                                '    <div class="">' +
                                '        <h5><b>' + novedad.identificador + '</b></h5>' +
                                '        <span>' +
                                '            <span><b>' + novedad.tinov_desc + '</b> | <span class="text-info">' + novedad.tiesnov_desc + '</span></span>' +
                                '            <span class="time">' +
                                '                <button data-id="' + novedad.identificador + '" type="button" title="Ver expediente" class="btn btn-xs btn-primary btn-ver-expediente"><span class="glyphicon glyphicon-folder-open" aria-hidden="true"></span></button>' +
                                '                <button data-id="' + novedad.novedad_id + '" type="button" title="Ver detalles" class="btn btn-xs btn-success btn-comentarios"><span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span></button>' +
                                '            </span>' +
                                '        </span>' +
                                '        <span class="message">' +
                                '            <i class="glyphicon glyphicon-user"></i> ' + novedad.usuario_nombre + ' <small>' + novedad.novedad_fecha + '</small>' +
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
                        MenuNovedadesVerDetalles($(this).data("id"));
                    });

                    lista.find(".btn-asignar").on('click', function () {
                        alert("no disponible aun");
                    });
                }
            }
        }, error: function () {
            alert("No fué posible consultar las novedades del usuario");
        }
    });
}

function MenuNovedadesVerDetalles(id) {
    var modal_id = Math.random().toString(36).substring(7);

    var html = '<div id="dynamicModal-' + modal_id + '" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="confirm-modal" aria-hidden="true">';
    html += '<div class="modal-dialog modal-lg">';
    html += '<div class="modal-content">';
    html += '<div class="modal-header">';
    html += '<a class="close" data-dismiss="modal">×</a>';
    html += '<h4>Novedades</h4>';
    html += '</div>';
    html += '<div class="modal-body">';

    html += ' <ul class="timeline" id="lista_comentarios">Buscando...</ul>';

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
    

    var objeto = {
        op: "consulta_comentarios_novedad",
        novedad_id: id
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

                    var limite = 3;
                    if (res.total >= limite) {
                        //$(contenedor).find("div.container > ul.pager").removeClass("hidden");
                    }

                    for (var i = 0; i < res.data.length; i++) {

                        timelineContainer.append(
                                '<li class="' + (i % 2 === 0 ? '' : 'timeline-inverted') + (i >= limite ? ' collapse' : '') + '">' +
                                '	<div class="timeline-badge success"><i class="glyphicon glyphicon-ok"></i></div>' +
                                '	<div class="timeline-panel">' +
                                '		<div class="timeline-heading">' +
                                '			<span class="timeline-title">' + res.data[i].comnov_user + '</span>' +
                                '			<p><small class="text-muted"><i class="glyphicon glyphicon-time"></i> ' + res.data[i].comnov_time + '</small></p>' +
                                '		</div>' +
                                '		<div class="timeline-body">' +
                                '                   <p>' + res.data[i].comnov_desc + '</p>' +
                                '                    <hr>' +
                                '                    <div class="btn-group">' +
                                '                      <button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown">' +
                                '                        <i class="glyphicon glyphicon-cog"></i> <span class="caret"></span>' +
                                '                      </button>' +
                                '                      <ul class="dropdown-menu" role="menu">' +
                                '                        <li><a href="#">Marcar como finalizado</a></li>' +
                                '                        <li><a href="#">Aprobado</a></li>' +
                                '                        <li><a href="#">Asignar</a></li>' +
                                '                        <li class="divider"></li>' +
                                '                        <li><a href="#">No Aprobado</a></li>' +
                                '                      </ul>' +
                                '                    </div>' +
                                '		</div>' +
                                '	</div>' +
                                '</li>');
                    }
                }
            }
        }, error: function () {
            alert("No fué posible obtener las observaciones");
        }
    });
}