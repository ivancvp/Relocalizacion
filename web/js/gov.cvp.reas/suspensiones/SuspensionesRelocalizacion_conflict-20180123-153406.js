
function IniciarSuspensionesReloca(identificador) {
    var modal_id = Math.random().toString(36).substring(7);
    var html = '<div id="dynamicModal-' + modal_id + '" style=" width: 100%;" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="confirm-modal" aria-hidden="true">';
    html += '<div class="modal-dialog modal-lg" style=" width: 95%;" >';
    html += '<div class="modal-content">';
    html += '<div class="modal-header">';
    html += '<a class="close" data-dismiss="modal">×</a>';
    html += '<h4>Suspension de la ayuda temporal</h4>';
    html += '</div>';
    html += '<div class="modal-body">';
    html += '<div class="col-xs-12" > </div>' +
            '<div class="container" >' +
            '	<div class="page-header" >' +
            '		<h5 class="" >' +
            '			Registro de novedades' +
            '		</h5>' +
            '		<div class="" >' +
            '			<button type="button" class="btn btn-info btn-sm" aria-label="Agregar" id="btn_nuevo">' +
            '				<span class="glyphicon glyphicon-plus-sign " aria-hidden="true" > </span> Agregar' +
            '			</button>' +
            '		</div>' +
            '		<div class="clearfix" > </div>' +
            '	</div>' +
            '	<ul class="timeline" id="lista_novedades">' +
            '   </ul>' +
//            '       <ul class="pager">' +
//            '               <li class="next">' +
//            '                       <button id="xxxxxxxxxxxxxxx_btn_ver_todos_comentarios" type="button" data-parent="xxxxxxxxx_lista_comentarios" data-toggle="collapse" data-target=".collapse" class="btn btn-default btn-sm" aria-label="Añadir">Ver todos <span aria-hidden="true">&rarr;</span></button>' +
//            '               </li>' +
//            '       </ul>' +
            '</div>' +
            '<div class="col-xs-12"><hr></div>';
    html += '<div class="clearfix"></div>';
    html += '<div class="row">';
    html += ' <div id="panel_lista_actividades" class="col-sm-12" style="overflow-x: auto;">';
    html += '  <div id="lista_actividades" ></div>';
    html += ' </div>';
    html += ' <div id="panel_comentarios" class="col-sm-4 collapse">';
    html += '  No disponible aún';
    html += ' </div>';
    html += '</div>';
    html += '</div>';
    html += '<div class="modal-footer">';
    html += '<span class="btn btn-primary" id="btnGuardarNuevoProceso">Guardar</span>';
    html += '  <span class="btn btn-default" data-dismiss="modal">Cerrar</span>';
    
    html += '</div>'; // footer
    html += '</div>'; // content
    html += '</div>'; // dialog
    html += '</div>'; // modalWindow
    $('body').append(html);
    $("#dynamicModal-" + modal_id).modal();
    $("#dynamicModal-" + modal_id).modal('show');
    $("#dynamicModal-" + modal_id).on('hidden.bs.modal', function (e) {
        $(this).remove();
    });
    $("#dynamicModal-" + modal_id).find("input.datepicker").datepicker({
        dateFormat: "dd/mm/yy"
    });
    $("#dynamicModal-" + modal_id).find("#btn_nuevo").on('click', function () {
        modalAdicionarNovedadSuspensiones(identificador, modal_id, function () {
            buscarNovedadesSuspensiones(identificador, modal_id);
        });
    });

    buscarNovedadesSuspensiones(identificador, modal_id);
}

function buscarNovedadesSuspensiones(identificador, modal_id) {
    $.ajax({
        type: "POST",
        url: "GestionConsultas",
        dataType: "text",
        async: true,
        data: {
            op: 'consultaSuspencionesReloca',
            identificador: identificador
        },
        success: function (response) {
            var timelineContainer = $("#dynamicModal-" + modal_id).find("div.container > ul.timeline");
            timelineContainer.empty();
            if (response)
            {
                var res = eval('(' + response + ')');
                if (res && res.total > 0) {

                    for (var i = 0; i < res.data.length; i++) {
                        var comment = '';
                        if (res.data[i].susp_estado_ayuda === true) {
                            comment =
                                    '       <li class="' + (i % 2 === 0 ? '' : 'timeline-inverted') + '">' +
                                    '           <div class="timeline-badge success"><i class="glyphicon glyphicon-check"></i></div>' +
                                    '           <div class="timeline-panel">' +
                                    '               <div class="timeline-heading">' +
                                    '                   <span class="timeline-title"><span class="label label-success">Continúa ayuda</span></span>' +
                                    '                   <p><small class="text-muted"><i class="glyphicon glyphicon-time"></i> ' + res.data[i].susp_user + ' | ' + res.data[i].susp_time + '</small></p>' +
                                    '               </div>' +
                                    '               <div class="timeline-body">' +
                                    '                   ' + (res.data[i].susp_observaciones ? '<p>' + res.data[i].susp_observaciones + '</p>' : '') +
                                    '               </div>' +
                                    '           </div>' +
                                    '       </li>';
                        } else if (res.data[i].susp_estado_ayuda === false) {
                            comment =
                                    '       <li class="' + (i % 2 === 0 ? '' : 'timeline-inverted') + '">' +
                                    '           <div class="timeline-badge warning"><i class="glyphicon glyphicon-warning-sign"></i></div>' +
                                    '           <div class="timeline-panel">' +
                                    '               <div class="timeline-heading">' +
                                    '                   <span class="timeline-title"><span class="label label-warning">Suspensión de la ayuda</span>: ' + (res.data[i].susp_cordis_salida ? res.data[i].susp_cordis_salida : 'Sin Cordis') + (res.data[i].susp_fecha_cordis_salida ? ' | ' + res.data[i].susp_fecha_cordis_salida : '') + '</span>' +
                                    '                   <p><small class="text-muted"><i class="glyphicon glyphicon-time"></i> ' + res.data[i].susp_user + ' | ' + res.data[i].susp_time + '</small></p>' +
                                    '               </div>' +
                                    '               <div class="timeline-body">' +
                                    '                   ' + (res.data[i].susp_concepto ? '<p>' + res.data[i].susp_concepto + '</p>' : '') +
                                    '                   ' + (res.data[i].susp_detalle ? '<p><small>' + res.data[i].susp_detalle + '</small></p>' : '') +
                                    '                   ' + (res.data[i].susp_observaciones ? '<p>' + res.data[i].susp_observaciones + '</p>' : '') +
                                    '                   <div class="pull-right"><a href="#" onclick="imp_resolucion()"><i class="glyphicon glyphicon-print"></i> imprimir oficio de suspensión </a></div>' +
                                    '               </div>' +
                                    '           </div>' +
                                    '       </li>';
                        } else {
                            comment = '       <li class="' + (i % 2 === 0 ? '' : 'timeline-inverted') + '">' +
                                    '           <div class="timeline-badge info"><i class="glyphicon glyphicon-comment"></i></div>' +
                                    '           <div class="timeline-panel">' +
                                    '               <div class="timeline-heading">' +
                                    '                   <span class="timeline-title"><span class="label label-info">Presentación de descargos</span>: ' + (res.data[i].susp_cordis_entrada ? res.data[i].susp_cordis_entrada : 'Sin Cordis') + (res.data[i].susp_fecha_cordis_entrada ? ' | ' + res.data[i].susp_fecha_cordis_entrada : '') + '</span>' +
                                    '                   <p><small class="text-muted"><i class="glyphicon glyphicon-time"></i> ' + res.data[i].susp_user + ' | ' + res.data[i].susp_time + '</small></p>' +
                                    '               </div>' +
                                    '               <div class="timeline-body">' +
                                    '                   ' + (res.data[i].susp_observaciones ? '<p>' + res.data[i].susp_observaciones + '</p>' : '') +
                                    '               </div>' +
                                    '           </div>' +
                                    '       </li>';
                        }


                        timelineContainer.append(comment);
                    }
                }
            }
        }, error: function () {
            alert("No fué posible obtener las observaciones");
        }
    });
}

function modalAdicionarNovedadSuspensiones(identificador, parent_modal_id, callback) {
    var modal_agregar_id = Math.random().toString(36).substring(7);
    var html = '<div id="dynamicModal-' + modal_agregar_id + '" style=" width: 100%;" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="confirm-modal" aria-hidden="true">';
    html += '<div class="modal-dialog modal-lg" style=" width: 95%;" >';
    html += '<div class="modal-content">';
    html += '<div class="modal-header">';
    html += '<a class="close" data-dismiss="modal">×</a>';
    html += '<h4>Suspension de la ayuda temporal</h4>';
    html += '</div>';
    html += '<div class="modal-body">';
    html +=
            '<form class="form" role="form" data-toggle="validator">' +
            '  <div class="form-group">' +
            '    <div class="btn-group" data-toggle="buttons">' +
            '        <label class="btn btn-default">' +
            '          <input type="radio" name="estado_ayuda" id="opt_suspender" value="false"> <i class="fa fa-warning"></i> Suspender ayuda' +
            '        </label>' +
            '        <label class="btn btn-default">' +
            '          <input type="radio" name="estado_ayuda" id="opt_descargos" value="null"> <i class="fa fa-folder-o"></i> Presentación de descargos' +
            '        </label>' +
            '        <label class="btn btn-default">' +
            '          <input type="radio" name="estado_ayuda" id="opt_mantener" value="true"> <i class="fa fa-check"></i> Mantener ayuda' +
            '        </label>' +
            '      </div>' +
            '  </div>' +
            '</form>';
    html += '<form id="form-mantener" class="form hidden" role="form" data-toggle="validator">' +
            '  <div class="form-group">' +
            '    <label for="susp_observaciones_mantener">Comentarios:</label>' +
            '    <textarea class="form-control" id="susp_observaciones_mantener" required value="" ></textarea>' +
            '  </div>' +
            '</form>';
    html += '<form id="form-descargos" class="form hidden" role="form" data-toggle="validator">' +
            '  <div class="form-group">' +
            '    <label for="direccion">Comentarios:</label>' +
            '    <textarea class="form-control" id="susp_observaciones_descargos" required value="" ></textarea>' +
            '  </div>' +
            '  <div class="form-group">' +
            '    <label for="direccion">Cordis de entrada:</label>' +
            '    <input type="text" class="form-control" id="susp_cordis_entrada_descargos" required value="" >' +
            '  </div>' +
            '  <div class="form-group">' +
            '    <label for="direccion">Fecha cordis de entrada:</label>' +
            '    <input class="form-control datepicker" id="susp_fecha_cordis_entrada_descargos" placeholder="dd/mm/yyyy" required value="">' +
            '  </div>' +
            '</form>';
    html += '<form id="form-suspender" class="form hidden" role="form" data-toggle="validator">' +
            '  <div class="form-group">' +
            '    <label for="direccion">Causal:</label>' +
            '    <select class="form-control" id="susp_concepto" required>' +
            '       <option value="null" selected disabled>Seleccione...</option>' +
            '       <option value="SIN ACTA DE ENTREGA PAR" >SIN ACTA DE ENTREGA PAR</option>' +
            '       <option value="SIN SELECCIÓN DE VIVIENDA CON VUR ASIGNADO" >SIN SELECCIÓN DE VIVIENDA CON VUR ASIGNADO</option>' +
            '       <option value="REPORTE DE VISITA SOCIAL" >REPORTE DE VISITA SOCIAL</option>' +
            '       <option value="ESTUDIO DE TITULOS NEGATIVO" >ESTUDIO DE TITULOS NEGATIVO</option>' +
            '       <option value="PENDIENTE DE REVISIÓN" >PENDIENTE DE REVISIÓN</option>' +
            '       <option value="DESISTIMIENTO DE LA SELECCIÓN DE VIVIENDA" >DESISTIMIENTO DE LA SELECCIÓN DE VIVIENDA</option>' +
            '       <option value="INHABILIDAD SDHT" >INHABILIDAD SDHT</option>' +
            '       <option value="SANCIÓN SDHT" >SANCIÓN SDHT</option>' +
            '       <option value="SUSPENSIÓN DEFINITIVA" >SUSPENSIÓN DEFINITIVA</option>' +
            '    </select>' +
            '  </div>' +
            '  <div id="group_detalle" class="form-group hidden">' +
            '    <label for="direccion">Detalle:</label>' +
            '    <select class="form-control" id="susp_detalle" >' +
            '       <option value="null" selected disabled>Seleccione...</option>' +
            '       <option value="b) No se pueda constatar mediante visita que la familia incluida en el programa de reasentamiento de la ayuda y el núcleo familiar habitan el inmueble donde se relocaliza transitoriamente" >b) No se pueda constatar mediante visita que la familia incluida en el programa de reasentamiento de la ayuda y el núcleo familiar habitan el inmueble donde se relocaliza transitoriamente</option>' +
            '       <option value="d) Se compruebe que la vivienda en la que la familia reside temporalmente, no cuenta con las condiciones de habitabilidad necesarias o se encuentre en zona de alto riesgo." >d) Se compruebe que la vivienda en la que la familia reside temporalmente, no cuenta con las condiciones de habitabilidad necesarias o se encuentre en zona de alto riesgo.</option>' +
            '       <option value="f) La familia incluida en la ayuda abandone la vivienda en la que la que esta reside temporalmente, sin dar aviso a la Caja de la Vivienda Popular." >f) La familia incluida en la ayuda abandone la vivienda en la que la que esta reside temporalmente, sin dar aviso a la Caja de la Vivienda Popular.</option>' +
            '    </select>' +
            '  </div>' +
            '  <div class="form-group">' +
            '    <label for="direccion">Comentarios:</label>' +
            '    <textarea class="form-control" id="susp_observaciones_suspender" required value="" ></textarea>' +
            '  </div>' +
            '  <div class="form-group">' +
            '    <label for="direccion">Cordis de suspensión:</label>' +
            '    <input type="text" class="form-control" id="susp_cordis_salida_suspender" required value="" >' +
            '  </div>' +
            '  <div class="form-group">' +
            '    <label for="direccion">Fecha cordis de suspensión:</label>' +
            '    <input class="form-control datepicker" id="susp_fecha_cordis_salida_suspender" placeholder="dd/mm/yyyy" required value="">' +
            '  </div>' +
            '</form>';
    html += '</div>';
    html += '<div class="modal-footer">';
    html += '<span class="btn btn-primary" id="btnGuardarNuevo">Guardar</span>';
    html += '  <span class="btn btn-default" data-dismiss="modal">Cerrar</span>';
    html += '</div>'; // footer
    html += '</div>'; // content
    html += '</div>'; // dialog
    html += '</div>'; // modalWindow
    $('body').append(html);
    $("#dynamicModal-" + modal_agregar_id).modal();
    $("#dynamicModal-" + modal_agregar_id).modal('show');
    $("#dynamicModal-" + modal_agregar_id).on('hidden.bs.modal', function (e) {
        $(this).remove();
    });
    $("#dynamicModal-" + modal_agregar_id).find("input.datepicker").datepicker({
        dateFormat: "dd/mm/yy"
    });
    $("#dynamicModal-" + modal_agregar_id).find("#susp_concepto").change(function () {
        $("#dynamicModal-" + modal_agregar_id).find("#group_detalle").toggleClass("hidden", $(this).val() !== "REPORTE DE VISITA SOCIAL");
    });
    $("#dynamicModal-" + modal_agregar_id).find("input[name='estado_ayuda']").change(function () {
        if ($("input[name='estado_ayuda']:checked").val() === 'true') {
            $("#dynamicModal-" + modal_agregar_id).find("#form-suspender").toggleClass("hidden", true);
            $("#dynamicModal-" + modal_agregar_id).find("#form-mantener").toggleClass("hidden", false);
            $("#dynamicModal-" + modal_agregar_id).find("#form-descargos").toggleClass("hidden", true);
        } else if ($("input[name='estado_ayuda']:checked").val() === 'false') {
            $("#dynamicModal-" + modal_agregar_id).find("#form-suspender").toggleClass("hidden", false);
            $("#dynamicModal-" + modal_agregar_id).find("#form-mantener").toggleClass("hidden", true);
            $("#dynamicModal-" + modal_agregar_id).find("#form-descargos").toggleClass("hidden", true);
        } else {
            $("#dynamicModal-" + modal_agregar_id).find("#form-suspender").toggleClass("hidden", true);
            $("#dynamicModal-" + modal_agregar_id).find("#form-mantener").toggleClass("hidden", true);
            $("#dynamicModal-" + modal_agregar_id).find("#form-descargos").toggleClass("hidden", false);
        }
    });
    $("#dynamicModal-" + modal_agregar_id).find("#btnGuardarNuevo").on('click', function () {
        guardarNovedadSuspension(identificador, modal_agregar_id, callback);
    });
}

function guardarNovedadSuspension(identificador, parent_modal_id, callback) {
    var alertas = [];
    var data = null;
    var modal_alertas_id = Math.random().toString(36).substring(7);
    //Mantener ayuda
    if ($("input[name='estado_ayuda']:checked").val() === 'true') {
        if (!$("#dynamicModal-" + parent_modal_id).find("#susp_observaciones_mantener").val()) {
            alertas.push('Debe ingresar un comentario');
        }
        data = {
            op: "InsertarNovedadSuspension_mantener",
            identificador: identificador,
            susp_observaciones: $("#dynamicModal-" + parent_modal_id).find("#susp_observaciones_mantener").val(),
            susp_estado_ayuda: true
        };
    }
    //suspender ayuda
    else if ($("input[name='estado_ayuda']:checked").val() === 'false') {
        if (!$("#dynamicModal-" + parent_modal_id).find("#susp_concepto").val()) {
            alertas.push('Debe Seleccionar la causal');
        } else if ($("#dynamicModal-" + parent_modal_id).find("#susp_concepto").val() === "REPORTE DE VISITA SOCIAL") {
            //al seleccionar visita social debe proveer detalles
            if (!$("#dynamicModal-" + parent_modal_id).find("#susp_detalle").val()) {
                alertas.push('Debe Seleccionar el detalle');
            }
        }
        if (!$("#dynamicModal-" + parent_modal_id).find("#susp_observaciones_suspender").val()) {
            alertas.push('Debe proporcionar comentarios');
        }
        if (!$("#dynamicModal-" + parent_modal_id).find("#susp_cordis_salida_suspender").val()) {
            alertas.push('Debe proporcionar el cordis de salida');
        }
        if (!$("#dynamicModal-" + parent_modal_id).find("#susp_fecha_cordis_salida_suspender").val()) {
            alertas.push('Debe proporcionar la fecha del cordis de salida');
        }
        data = {
            op: "InsertarNovedadSuspension_suspender",
            identificador: identificador,
            susp_concepto: $("#dynamicModal-" + parent_modal_id).find("#susp_concepto").val(),
            susp_detalle: $("#dynamicModal-" + parent_modal_id).find("#susp_detalle").val(),
            susp_observaciones: $("#dynamicModal-" + parent_modal_id).find("#susp_observaciones_suspender").val(),
            susp_cordis_salida: $("#dynamicModal-" + parent_modal_id).find("#susp_cordis_salida_suspender").val(),
            susp_fecha_cordis_salida: $("#dynamicModal-" + parent_modal_id).find("#susp_fecha_cordis_salida_suspender").val()
        };
    }
    //presnetar descargos
    else if ($("input[name='estado_ayuda']:checked").val() === 'null') {
        if (!$("#dynamicModal-" + parent_modal_id).find("#susp_observaciones_descargos").val()) {
            alertas.push('Debe ingresar un comentario');
        }
        if (!$("#dynamicModal-" + parent_modal_id).find("#susp_cordis_entrada_descargos").val()) {
            alertas.push('Debe proporcionar el cordis de ingreso');
        }
        if (!$("#dynamicModal-" + parent_modal_id).find("#susp_fecha_cordis_entrada_descargos").val()) {
            alertas.push('Debe proporcionar la fecha del cordis de ingreso');
        }
        data = {
            op: "InsertarNovedadSuspension_descargos",
            identificador: identificador,
            susp_observaciones: $("#dynamicModal-" + parent_modal_id).find("#susp_observaciones_descargos").val(),
            susp_cordis_entrada: $("#dynamicModal-" + parent_modal_id).find("#susp_cordis_entrada_descargos").val(),
            susp_fecha_cordis_entrada: $("#dynamicModal-" + parent_modal_id).find("#susp_fecha_cordis_entrada_descargos").val()
        };

    } else {
        alertas.push('Debe seleccionar el tipo de novedad a reportar');
    }

    if (alertas.length > 0) {
        var html = '<div id="dynamicModal-error-' + modal_alertas_id + '" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="confirm-modal" aria-hidden="true">';
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
        html += '</div>'; // content
        html += '</div>'; // dialog
        html += '</div>'; // footer
        html += '</div>'; // modalWindow
        $('body').append(html);
        $("#dynamicModal-error-" + modal_alertas_id).modal();
        $("#dynamicModal-error-" + modal_alertas_id).modal('show');
        $("#dynamicModal-error-" + modal_alertas_id).on('hidden.bs.modal', function (e) {
            $(this).remove();
        });
        return;
    }

    $.ajax({
        type: "POST",
        url: "GestionDML",
        dataType: "text",
        data: data,
        success: function (response) {
            if (response)
            {
                var res = eval('(' + response + ')');
                if (res && res.total > 0) {
                    $("#dynamicModal-" + parent_modal_id).modal('hide');
                    callback();
                } else {
                    alert("No fué posible guardar los datos");
                }
            }
        }, error: function () {
            alert("No fué posible guardar los datos");
        }
    });
}