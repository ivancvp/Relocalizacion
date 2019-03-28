
/* global pdfMake */

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
    html += '  <span class="btn btn-default" id="btnImprimir">imprimir</span>';
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
                            var appendData = {
                                suspension_detalle: res.data[i].susp_detalle,
                                suspension_observaciones: res.data[i].susp_observaciones,
                                suspension_usuario_elabora: res.data[i].susp_user,
                                suspension_cargo_elabora: res.data[i].usuario_cargo
                            };

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
                                    '                   <div class="pull-right"><a id="btn_imprimir_oficio_' + i + '" href="#" data-concepto="' + (res.data[i].susp_concepto ? res.data[i].susp_concepto : '') + '"><i class="glyphicon glyphicon-print"></i> imprimir oficio de suspensión </a></div>' +
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

                        timelineContainer.find("#btn_imprimir_oficio_" + i).on('click', function () {
                            imprimirOficioSuspension(identificador, $(this).data('concepto'), appendData);
                        });
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


function imprimirOficioSuspension(identificador, concepto, appendData) {
    $.ajax({
        type: "GET",
        url: "GestionConsultas",
        dataType: "text",
        data: {
            op: 'consultaDatsosOficioSuspencionReloca',
            identificador: identificador
        },
        success: function (response) {
            if (response)
            {
                var res = eval('(' + response + ')');
                if (res && res.total > 0) {
                    var modelo = null;
                    switch (concepto) {
                        case 'SIN ACTA DE ENTREGA PAR':
                            modelo = MODELO_OFICIO_NO_ENTREGA_PAR;
                            break;

                        case 'SIN SELECCIÓN DE VIVIENDA CON VUR ASIGNADO':
                        case 'REPORTE DE VISITA SOCIAL':
                        case 'ESTUDIO DE TITULOS NEGATIVO':
                        case 'PENDIENTE DE REVISIÓN':
                        case 'DESISTIMIENTO DE LA SELECCIÓN DE VIVIENDA':
                        case 'INHABILIDAD SDHT':
                        case 'SANCIÓN SDHT':
                        case 'SUSPENSIÓN DEFINITIVA':
                            break

                    }


                    if (modelo) {
                        var data = res.data[0];
                        var str = JSON.stringify(modelo);

                        $.extend(true, data, appendData);

                        for (var att in data) {
                            str = str.replace(new RegExp('@' + att, 'g'), res.data[0][att]);
                        }
                        var obj = eval('(' + str + ')');
                        pdfMake.createPdf(obj).download();
                    }else{
                        alert("Formato no disponible aún");
                    }
                    
                } else {
                    alert("No fué posible consultar la información");
                }
            }
        }, error: function () {
            alert("No fué posible consultar la información");
        }
    });
}



var MODELO_OFICIO_NO_ENTREGA_PAR = {
    pageSize: 'LETTER',
    pageMargins: [80, 100, 60, 120],
    header: {
        margin: [270, 20],
        columns: [
            {image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/wAALCAEYAPEBAREA/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/9oACAEBAAA/AP1Toooooor8Rrr/AIKt/Hv4b/ELxJp0upaL4o02y1O6t4bfWdLQbI0lZVXfAYmJAAGWJPrmvZvA3/Bb8bY4vGPwtwf+Wl3oeqcH6Qyp/OSvePCP/BXz9n3xJs/tK88ReFWb739q6S0oXn1tml+v0/KvUNN/4KHfs66rb+dB8VdHRfS5jngbpn7skan9Kr61/wAFGP2ctBg824+KemSrjIWytrm6Y8gdIomP+fY14145/wCCyvwW8PrInh7SvE3iu5wdjRWkdrAT7vK4cf8Afs183fEL/gtf8QNX3xeC/Amg+G4Wyom1SeXUJgOxXb5SA9OqsPr1r5g+In7e/wAfvid5i6v8TdatbZ8j7No0i6bHtP8ACRbhCw5/iJz3zXk3hr4neL/BuvS63oPinWtF1iU7pNQ0/UJYJ3PqzqwLdT1NfUvwx/4KxfH34frHBqmr6b44skwoj1+xBkC+0sJjcn3ct/Svqn4d/wDBbbwpeCKLxx8OtX0h+j3Og3kd6hP97y5fKKj23MR79K+g/CP/AAVD/Zy8WLGreO30K5f/AJd9Y025hK845kVGjH/ff8q9R0f9r34Ha6qG0+LvgkmRgqRza9bQuxPQBHcNnkcY68Vq3v7S3wh02MS3fxU8E2sbNtDzeIrRFJxnGTJ1wDxXDeKP2/v2efCCO198V9BuQvUaW735PXp9nV89D+nqK+efiV/wWf8AhT4dimi8HeG9f8Y3i58uSZU0+1f/AIG26Qf9+q85/ZX/AOCkXxR/ab/bG8A+E7+LSvDfg28bUDPpGmW+95wlhcyx+bNJuYlXRW+TYDgZBr9T6KKKKKKKKKKKKK/mK+JGn3WqfGDxXZ2VtLd3c+uXkcVvboXeRjO4Cqo5JPoK+n/FXwB+G3g39kV/E3iv4d/Ezwp8TlmWBrGXS7u2tPMCyKk7XNxa+WsDAq7xqxcsFUFQcj4tor728B/sS+BvBf7Bvif45/EyS8uNf1TSZZPDemx3HlRW0kp8qzlYKcyuzssmCdoQ8qSCRwv7H/7GviT4qWPxG1HXPAOtOkHhG9PhubUNOuIbSfU5NkUTLIVAkZFd3CjOCFbB24P0p4f1H9gv9n2xj+H3iS3t/H3iG0/0XWfEj6ZPeI1xkCUpIvCqpGAIc4A6sxYn5Z/bU/Zh8PfDr4oeEbr4QXX/AAk3gT4hQfavDUNlK1xJ5vmiN7ZCSWcB2Tbu+b5tpyyEn5dSxuJL1bNLeVrtpPKEAQmQvnG3b1znjHWvpH9j39nv4d/EuDxF41+MfjRfBXw48PSQ2ztHIEuNRu5Q7LBD8rMdqoWYKrNgjGOWX6QX9jf9lz46atpupfBT4hX2o2tncwprvheSSRLw2UkqRSXduJ41lBh80SHKyIwTHBPzfCnjz4Zx+Cfjp4g+Hr6kssWk+I7jQjqUyeUGWK6aDzmGTtBC7sc4969L/bO/Y18Q/se+OLHTr+/j13w5q6SS6TrMcflGbZt8yOSPJ2SIXXuQQykHqF+dq9F+AnwlT42/FHQfB51/TNAk1K6igSTUpmi87c4BjiYIy+aQTtVyoZsKCSQDF8dPhHN8DfiZrPgu617SfEF9pUzQXM2jySSRxSBiDG5ZF/eAAbgu4KTtJyCB7V/wS4/5Ps+GX/cT/wDTXd1+/wBRRRRRRRRRRRRRX5a/8Eu/Aeg3Xxc/aD8e3Omw6j4m8P6k9vpjyruNsssl00hQdmfy1XdjIAYA4ZgfAv2Hf2kPih8TP25NAm1nxBqfiCDxZdXUOsaRNcu9nJbNbysyiFiVCRBQyrjgJtHU58x/4KI/DTw38Jf2uPG2geE7e3sNIzbXi6fbDalo81vHK8arjCrucsFHAV1A6Yq98Hf22bD4dfDjQ/A/ib4J/Dv4h6NpCzJBd61pobUCJZpJWzO+8AgyuAVUYGPTJ9q8cf8ABWa21Hwf4f0fwf8AA/w74em0AD+yG1W8/tK10xgpRHgtxDEokVOFcn5dzADBOYf2Yf8Agop4609vit4m8d+OrzxB4kj020vNF0a/kWOxmWO7Q3kcMI2xpL5BbbtAJAY84rtP+HXnwv8A2g7NfHvwd+MsVj4P1D/SpLDUrRbuXTt3zNG7iVGUqcjZINwxyzdTxv8Aw1d4H/Y/+L3hrwL4Mjh+IXgvwdot7o134jZEe5lvrqY3E9xZkPsVUkWFB1yEcBjkMfjz4UfETTfBvxq8P+MdT0DTLqwtNWhvnsCLiO3twJVffGIpFfKY3KpYjgAhhxX1D4T+Gul/8FFtY+I1n4DGjfDXxFp2tSeI9E8L3BZbW7tbiGCC53OikpIrWkMhKqV3XDDABBX2D9lz9hnxT+xh8ULD4ufFLxT4c0Sz0ovYabaW9+WW8urpXtV85nVFSJVlaUnOQEydoViPO/ix/wAFK08SfFjxnonivwJ4R+MPws/ta4j0xdQshb3f2VZWEMkNwFO35MYYoWIxyCTnsfix/wAFCf2afj94X8L6L8QfhP4z1Oy0A77W0j1IYQlAhBmW4SSQYUDLEE9a+I/2jvGnwz8c+Pbe9+FHgW48A+F4LGO2On3d49zJPMryEzsWZipZWjXbub7mc8mvrTwz8Efh9+zl/wAE+rT43a14VsfGvxG8VMttpP8AbcK3VjphleRY2+ztmNysUTSZkVsvtXG3Ocj9in4ceE/22vC3xI+H/ivw3oeleNNP08atoPirQ9Nh02aBt2xo5o7dUikjDtHwVBwz88KV82/4Jcf8n2fDL/uJ/wDpru6/f6iiiiiiiiiiiiivwa/Zx+KOlfCP9pLx7rt38Ybz4R3iavdASP4bk1vTdTh+0Sb4LmGKVXBztKkKcfMQyEAn7GuNN+AP7MOp2vxB+HHjTwj4U8eeNND/ALVs9S8R2OoNp0VlOSXmsbVcmIs6HELszKBt4GVb8nviZ4iuPFnxA8QaxdeILrxXcXl7JNJrd7CYZb0lj+9MZJ2A9lzwMDAxgfp94z/4Is+HPEem2uqeBfiBfaE9xbxzHT9as1vIw7ICVWVGjZVye6ufc9a+ffFn/BHr486DezR6V/wjniS2UZjms9S8kvz0KzKmD+JHua871L/gmf8AtKabcmF/hlcTHGQ9tqdlKhGcZysxx06HB9ql0P8A4JjftJa3fLb/APCuZNPTPzXF9qdnHGg9f9aSf+AgmvqH4P8A/BFC+uJLa7+J3j2G1j4abSfDMJkkIPb7TKAFPUcRMM9Ccc/Xnhf9i/8AZn1zwv4n+HGm/D/SbtNDu47PVLiRJDqEVy1tFOrC8J83PlzI3ysFBJGByK+XPHn/AARz1bwzrT+Ivgp8U7jStQt5Gazt9VLwTQMCQQt7b8g9V/1YI7mvnD4q/sNftj+MNRgi8YaX4i8eLa7ltbq98Txaiir3KebcFkB9CFJ9K4uz/wCCaf7Sl9N5Ufwvu1bGczalYxL+bTgV3vh3/gkL+0FrV1FHe2Xh/QImbDTX2rK4QY6kQrIT6cc59OtfQ3gf/gizo/h3T7rVvH3xAuNZFtbyTHS9DsxbIWVCQDO7MzLkdAinHcZ48x/ZQ+JHg/8AaB/ZK1b4DfFTxz4b8K6fpV4J9K1HWtVXTbm0j3GSNomlVornEjSKYyyMqNjnIK+hzfBnwt+wN8LfiFo2jfGnwmnivxNpax6jrd/MYtZtrMo5ji07Soyzu8u//XNcKoIU4G3I+Vf+CXH/ACfZ8Mv+4n/6a7uv3+ooooooooooooor8BvgX+y/ov7WH7RXxI8I3nj6PwVrsd7e3WlwTad9qXUCs8nmID50e1lG1sAMSu84Gw594/a6/ZO8a+FP2MdIh8W2dtJrvwiu/sltrOmu0ltq+i3koCMCwDLLDNtUxkDauW5Dgn82K/av47f8FAdQ/ZR/aQ8H+FvEmlNqPw31Lwhp91N9kC/a7WZpZ1a5j6b1wio0bEfcDKQchvsP4U/HDwH8cNF/tXwL4q03xLaKFMos5gZYMjIWWI4eM+zgGu6or4y/bw8b+AdasoNB03406X8L/jN4fkW50i+bUJoHiWXb5lvcGEMRFKqqSpDcqh2kcH4x+GH7O/xZ8RfFTVvD9l+1b4Jj1bxfqCv4ktfD3iq7/tW9CFvN2xfZ0LSLGZMIWUEcHCjj9g/CnhfS/BHhvSvD+iWiWGkabbR2lrbx5xHGihVHucDqeSeT1rYor45/a4/4KWfDz9naxvtG8O3dt438fqGjj02yk32tlJjg3UqnAwesaEuSMHZncPYvgn4s8RePf2VfDHifxY8UniDWvDS6ldPBGERjNCZFIUfd+Rl4HAr8H/2P/g2nx8/aQ8DeCpwDp17feff572sKNNMvsWSNlHuwr6h/bw/Zd+LfxH8VfEj9oDxBBpPhrwdBN5VhZatfGK9ezh229uVi2kBpdocIzBsyHgZFeSf8EuP+T7Phl/3E/wD013dfv9RRRRRRRRRRRRRX8xvxC1a+0L4yeKdQ0y9uNOv7fXLuSC7tZWiliYTvhldcFT7jFfbFh8cfHfi3/glt8UdY8deJdU8S3Wr+JrPw7plxqs/mskcZtp5MFvmbIWQEkk5HsTX541+1H/BSD9j3UP2gPgp4Y8b+ErVbrxj4T0seZZxRZn1GxKK7RIRyzxkM6L33yAZYgH8cvDHizX/h/wCIIdX0DVtQ8Pa1aOfLvNPne3niPQjcpBHuK+yfgz/wV2+M3w3jt7LxQmnfETSo+CdTUwX230FxGME+8iOfev02/ZK/bm8Aftb2Nxb6J5+heK7KJZrzw9qDKZVXoZIXHEsYYgbgARkblXIz8eftdfsW+OfhP8WPGP7U+h+ItB1BdD1eHxNBoV7by7iI5IsKxBAbBGcAgkDgg4r8/vjV+0d4p+Nnxxuvitdi28P+J5JbaeF9FDxLbPboiROhZmbcPLU7s5z0wMAf0d+E7q8vvCujXOoNG+oTWcMly0QwhkKAuV9txOPavgj9qz/grhoXwg8Wat4O+Hfh+LxjrWnSNbXWsXtwY9PhnU4ZEVPnm2kFSQyDIOC3Wvzi+NX7dPxs+PUNxZ+JfG13Bos5w2j6QBZWhX+4yx4aRe+JGbn6Csz9kv8AZl179qf4uab4V0uKaHSI3SfWdWVMx2NqD8zE9N7AFUX+JvYEj+hvVNItPD/w+u9L0+BbawstLe2t4U+7HGkRVVHsAAK/D7/gk7qVpYftqeFoblVMt5YahBbsQPlk+zO+R6HYjj8cd689/as/ah+LHxm8Uat4W8deLrnVtI0PVZ4bfT1tYrSEPG7Rh3jiRdz4B5fJG5gMA4rqP+CXH/J9nwy/7if/AKa7uv3+ooooooooooooor+YH4sf8lT8Zf8AYZvP/R71mSeLNcm8NReHZNY1CTw/Hcfa49Ja6c2iTYYeaIs7Q+HYbsZwx9TWRX9Cf7Sn7TGq/sp/CrwZ40HhBvFnhNhDZaz9mufJubLfGnkTLlSrLkOhDY+Z4/mHQ/nj+0h8eP2PP2pbqTxLf6L488BeN51/0jUtJ021dblgMAzxeeVl/wB4FHIABbAAHwZ4gs7DTtavbbTNR/tbTopSsF95DQeemeG8tuVJ9DnHqetepfse/EiT4UftOfDXxGt6dPtYdbt7e+mD7VFpM4in3ccr5btwfTt1r9qP+CkniO28N/sXfEkz3kFrNe2sNlAszAGZ5LiJSiD+Jtpc8dACegJr+fOv6RfiN8R7Dwv+yf4g8Z2OuW8Fpb+Epbuy1WGYNGZDanyWRhkMS5QLjOSQBnNfzdsxYkk5J6mup+G8PgubxZaf8J9ea7Z+GV+e5Phy0hubyTBH7tBNLGiZGfnJbbx8jV+kPw+/4KjfAb9njwmPDnwm+DeuWmmLh3N5PBazXUmAC80gaZnbGeWJwAAMDAH3v8E/ifrnxo/Zl07x14g0q30O/wBe0y6vk0+1LskNuzSeQNzcsTF5bFsAEsSABgV/OVpGsX/h/UoNQ0y9uNOv4G3w3VpK0UsbequpBU+4qvPPLdTyTTSNNNIxd5JCSzEnJJJ6n3r6l/4Jcf8AJ9nwy/7if/pru6/f6iiiiiiiiiiiiiv5iviVY3GqfF7xXaWdvLd3U+uXccUEKF5JHM7gKqjkknjA5r6mX4DeBvDP7H+q678QPhF8RvDvxJhvYUgSz0y9toJ4YonC3Ml1cWssMEbmZjJGGDMbaMoqKcn4mr+nW88E6H8R/hRH4Y8SadDq+happcdtd2dwCVkQxr6cgg4IIIIIBBBAr8if2l/+CRvxF+H+t3Wo/C2M+PfCrsXjtDNHFqVqvPyurFVlA4AaP5j/AHBjJ+LfiD8J/Gnwov47Lxn4U1jwtcygmJNWspLfzcYyULABwMjlc9a5KtnWPGGveIrGxstW1vUdTs7BSlpb3t3JNHbqeojViQg6cLisatKbxFqtxo8Oky6neSaXC2+Oxa4cwI2TyEztB5PIHes2u5+FvwR8efG7VJtP8C+FNT8T3MAUz/YIC0cAOdpkkOEQHBxuIzg+lfcX7Mv/AAR98a+JtasNY+L8sPhXw7FIssug2tws9/dqDny2eMlIVbjJDM+Mjap5H61alo9l4e+H91pWm2sdlp1jpj2ttbRDCRRJEVRFHYBQBj0FfzD6XpF/rl4tpptlcahdsGZYLWJpHIAySFUEkAZNbvxE+F/ir4T+ILjRfFug32h6hDLJDtu4GRZCh2sY2Iw65xypI5FfQH/BLj/k+z4Zf9xP/wBNd3X7/UUUUUUUUUUUUUV+V/8AwSi8G+H9Y/aQ+PXiK/trW48Q6NfLFpjzANJDHPcXYneMHof3cSlgMgPjI3EH5u/Ze/aM+JnxA/4KAeFfEt7q+pSal4j177JqWnCWQwizkJWSAxZx5cUYyAR8vlK3UZrnf+Clnw/8M/Df9r7xdpXhW0t9NsJorW+lsLVAkVtPLCryKqjhQxIfA4G/jAwK/evwsCfCejhTtP2GHBx/0zFfmj+3B8YP2y/2fby+lg1yzu/AVwzmDxN4c0KLMKE/6u4DiQ27gcBs4Ochychfy98aePPEnxI16fXPFWu6h4i1eb795qdy88uMk7QWJwoycAcDsBXP0UUUV1Xw48UeMfB/ii21HwLqWsaX4gQgRTaHJIlwfmHy/JywJwCpyD0Oa/Yr9g/xl+178Rriy1H4nGx0zwJCqkz+ItG8jVb9ccLDHGYtowQfNkXnggPk19veLP8AkVdZ/wCvKb/0Bq/B39lf9lfUNc+HOu/H3xB41u/hv4I8HSGaDVNLh87Ubu6jK4jt13qEO50QOxwWYLgjcV7nQfA9l/wU58beK7y28c+IdM+Kun6d9rs9L8Trb3NhfWsZWMLDJAkItjuZCyiNhly3zZYjiv8Agmfpd1on7f3w/wBOvoGtr2zm1a3nhk4aORNNu1ZT7ggiv30ooooooooooooor8CPgF8TtB+EP7UXjPxNqXxH1n4bX9vqt5Hb3un6Iuq2t3E1w/mwXMXmK204QjaG55ypVTX254g1T9nj4L6lpHxg8J+MvDvgf4i+PtLl1Cz17VPDep3Njsf5bm4tbNXK28jPn5XZjyQAQTu/KD4sa/8A8JT8SfEernxNfeMmvL15m17UrUWs98SeZTFvfYCc4Xdwu3hfuj+mTwn/AMiro3/XlD/6AtZ3xF8UXvgvwZqmt6f4b1Lxdc2cfmDRtI8s3Vwu4BhGHZVYhSW25ycYAJIB/Ir9pr/gpNaX02p6H4B+DGl+AtdGbefXPEOl27arbEnLqsPl4ifIXli3rgHBHw1pfgPxb4z0/VtdsND1bVrCxikvdQ1RLeR4YUHLySy42jnuxySQBkkCuYoorpbP/hKvhbruh67BHqfhrVY/K1LS7/Y8DkcPHNExA3KcqQwyCD71+mf7OP8AwV38VeKbzSvCeu/Ca48YeKbtwhvPCMmye8fAG9rYoRu2gFmDhRjooGB+n+h315qWj2V1f6bJpF5NEskthNKkj27EcozISpYdCVJGehPWovFn/Iq6z/15Tf8AoDV+R37LOvP+0Z/wTz8ffAKwgk03xJY3ccun6lNBK1hMGu0vEinmQFYHZopUBl2qflIJ2tt6D9gn9mH4g/sl+OvEvxG+IXg/U11WLRZrHQ/DOlKL67v5nkTLE2/mJDH+72b5Sq/PuPAyfCf+CfniS/8AGX/BSjwx4g1UQrqmq6nrl/di2YNEJpbG9d9hBOV3McHJ47mv3dooooooooooooor+f34I/s8eGP2nf2mvHvgjXPHB8D6tcX19Lo8rWS3Md7Otw+6HBkT5tp3AA/MEfoQM/TP7U37Gfi7wT+w+uleJntdX1T4T37XGi69YM2zUNHvJv30To3zJLFIVcg5VURQrHJx+YFf1JeE/wDkVdG/68of/QFrWrmvEXgDw34ivV1PUfDGi6zq8MRjguNQs45JFHUL5hRmVc46Zx6GvzW/bM8Ofti/tK48C2Pwlj8JeA4ZUB0/Sdas54r5lbKPLcM8eYwQrBNiAEAsCQNvyj8Rf2P/AAt+zh4L1uX4w/EG0g+IktgzaJ4H8KOt3dJcMP3cl9Ky7IogeSo5YcqxI2n5atRA11CLlpEtt6+Y0QDOFzyVBIBOM4BIz619l3H/AATkl+KuknxD+z38RdA+Keisiu+l3Nwun6vZk9Emhc7VOQRlmTPGFI5r6W/Yz8K/ti/BWyg+HGs/C7Stf8AJMxEXinVbdIrFS+XEU0TykoWLNtEUnJJAGTn9KPD/AIX0jwzC66Voun6OZcGZNPt0iVmx32qN31NGleLND1671G103WdP1G602f7New2t1HK9rLnHlyhSSjZBG1sHjpTvFn/Iq6z/ANeU3/oDV/Nb8E/FnxC8O+PtN0/4beItY8P+ItcuIdLi/se8kt2uGlkCpG+w/Mu9l4OcHBxkV9gf8FFPjJ8TR8YLrwL4Q8X+MLrw74R8OWWg69JpN9dra3t15TPPLchG2uzLIqsXyTsIOcGvKf8Aglx/yfZ8Mv8AuJ/+mu7r9/qKKKKKKKKKKKKK/mI+J11NY/FzxZcW8skFxFrl3JHLGxVkYTuQwI5BBwc19r+DfjN478Qf8EyfjXrvjHxTrXiaXUdcsPDmmzaxey3LRKpgkmUFiSAUdue5xnOK/Pev6K/2k7mzsv2T9buNW8YHwRoC6CY9R1OKxW6n8uS2MSJCGZcSGR49pHzE4ClSQy/GujeNf2l/gX+xf4b+I/gafwr4m8P3Ec3iHW767tZbjXJxcTvK11dMX2SbQyq20l0VR8zBCy/TH/BPn9s66/bA8A67Lrml2uleK/DtxDDfrp+4W00cwcwyorMzJkxyKVJPKZB5wPIv+Cmn7fWu/AS6g+Gvw8kSz8VX1oLnUdcKh206JydscIPAmYDcWOdqspA3MGX8cNX1i+8Qapdalql7calqN3I01xeXkrSzTSMcs7uxJZieSTyTVKui8B/EDxF8L/FVh4m8J6zd6Brti/mW97ZSbHX1B7Mp6FWyrAkEEHFfvD+wD+15d/tZfC26u9d0waZ4t0OSO31HyEK292rhvLuIgegbY4K8gMpwcEAfO37Uv/BTP4heHf2hbn4SfBvwppuqanZX66U9xqMMlxNe3hIBjhjV0CKrEqSxOSpPyjrzPjzwP8bPEn7Y3wi1j4j654L+FHi3xFp4itIdLWa+stQurCXzoluYBIN0oa4TZvlK5hXaxIVT+kqNrjfC6Q+J0sk8Q/2U4vxprO1r54iIcxbvm2EgkbuQCM81+Cf/AATu0+DU/wBtL4Vw3C7411KSYD/bjt5XQ/gyqa+of21v+Cl2ptZ/EH4OeB/B6+D5l1TUNH1vWnuUlknAmkiuREioAplIbMhJIDHABww+e/8Aglx/yfZ8Mv8AuJ/+mu7r9/qKKKKKKKKKKKKK/mB+LH/JU/GX/YZvP/R71ijXNSGkHSv7QuhpZk842PnN5Bkxjfszt3e+M1n1++v7dfwP8VfH79jpPDvg2M3muWv2HUo9PDhDerEmGiBYgbsNvAJ5KAdSK+IP2f8A9srxx+yb8G9S+FPxn+FfiZvC5iubTT7q9tHs5oEmVi9vtnVVmQl2YYYEBiOVxjV/4JwftQ/C/wDZc+Bvj7UfFOqWdtqlzJDdQafFK02p6lMiyDyliXKxxDdGqFiCS0zsQu0Lg+GPgL8aP+CpPxSX4j+Ni3gr4eIPIsbloT5cdqHJ8myjbBlYkndM3y7s8naEHnP7cn7Ffhv9kfRbO6Gu3d5q/iDWbiLRNJLpItvpcAw09xJtUvM5eE7VVVUOwyxGa+OK/RXwz/wSxsPj18Nfh58RPhf4tk0/RPEVvA+qaXrCLcTafIXMdy0Ei7BKsTh/3b7WKofnZiBXrv7PPxK8bf8ABNrxHb/CP41WnnfCnUr6U+H/ABxZB3tbWRzuKP3RGO5mQgMjF2G9CWHz78M/2uPhb4C/bo1r4ya1ot9Haahptz9tstOSK+W11Zwiyy2cu8eZDIFchzsYecylQBk7Nx44+Jf/AAUg/bG8AeJ/DfhPUNB8GeGdQtjb32xmisLaK4E0s8s+Nhnbbwg7qijOCx/YnxZ/yKus/wDXlN/6A1fzM/Cr4lat8HfiN4c8a6Ctu+r6FeR3tvHeIXhdlP3XAIJVhkHBBwTgg8034ofETUfi18RPEXjPV4LW21TXL2S/uYrFWWBZHYswQMzEDJPBY19Af8EuP+T7Phl/3E//AE13dfv9RRRRRRRRRRRRRX4R/s6fD34J+Pv2hPHNn8WdVvJbuTWLx9K0Gxs7t3vJY7gsIi8ALOJFLr5SLvOF2up+VsjTf+CYvx38TaDdaxpej6DfPDuMum2et27XEUmN3ksobaj4I+RmBGQDg18q6lpt3o2oXVhf201le2srQT21whSSKRSVZGU8qwIIIPIIr+oPwbMlz4R0OWJ1kiexgZXRsqwMa4IPce9cZ+0Z8G4fjx8GfFvgzz4bG+1bT5LW11CWEP8AZ5Dhlb127lUHHOM1/P78Qv2efiJ+zz4qhb4geCtW0nTbHUYoZdQksjLY3B3FgsU3+ql3JG5C7uQrZxg4+w9H/bP+NH7Xn7Veg+D/AIaanqXhP4dHVYYo9O0aAQtBpcci+ZPcSINykxqTtDBQSqD1Pr3/AAVS/Zh8S/FDxFqXxNuNXi0jwL4M8Fh03BZXudQN1MfIRNylQyvBmQ5AwAAxyB+W3wh8Ax/FT4qeEvBkmo/2QfEGp2+lR3phMwhkmkWONigIyNzL3HFfov8AFr4f/tF/sc/sgeAj4Z1u+0ebwHruqQ6pNoVyLi0urO5lSa3u3hZSGiVzIuJFBVpCSuDkcn8Yv+CiunfHr9gnVfDfjbS7S6+I+oanFpYjtMRpsi8qcahtIOzkeWVXGWY4IBIGR+xX/wAE2vilJ8dPDeu/ErwRb6R4H00m8vIdbNvdJfDYQtv9n3sW3FhneAoAbOThT+x/h3w3pPhDR7XSNC0uz0XSbVdlvY6dbpBBCv8AdSNAFUewApviz/kVdZ/68pv/AEBq/ltor6q/4Jcf8n2fDL/uJ/8Apru6/f6iiiiiiiiiiiiivyR/4Jp+AdF8YfHb9o+68+C38b20VzaaFcSEiW1W4muY57iPrtKkQKWAJAkIzhiD8wfs3+KPiR+yD+2FouhyW99p+sjWodE1rRQGZb+CSVUZdoOJAQ2+N+RnawyDz1P/AAUj+GN9/wAL68ffE7T9PgsvA2q69HpNhchkQ395DZoL2SJAcsizxyh5OhdscncF+sv+CbH/AAUR0C/8IaH8I/iTqMOh6tpNt9l0fXr+cR215AnEdvK7ECOVEwqkna6qBkNgN+l6OsiBlIZSMgqeDXyn/wAFSNNsL/8AYg+IU19CZWs30+e2dQC0cxvoIwwz7SMp/wBlmqX/AIJk6tZ69+xr4Dv4tNtbC9WKexupLaBIzcGC4liR2KjLHYq5J5zu+td7+2r4Vn8afsm/FbSrWHz7ltAubmOLZvLtCvnBQO7Ex4HfOK/DP9iPw3ceKv2uvhFY2sUk0kfiOzvisfUJbyC4dvoFiYn2Br+jOeCK6gkhmjWaGRSjxyAFWBGCCD1HtX4s/t9fD/whp37f3w/8G+GfDmj+FNHdNHtbm10PTo7ON5Jrxy8jLGFDPtkUbuuFUdq/ayivzm/4KLf8FFvDPhPwTr3wx+G2srrPi/Uo2sdR1XT2DW+mwsMSosoOGmZSV+TITLEkMAK+Xv2Tf2EfAHir4B3fxx+OHjG48MeAv3y2UFhIsUjiOQxGR3ZHLEyK6JEilmIGCchS74S+JPgL8LPF3j7xH8OtF8Q/FvwfDoBfUfB/iu1tkmgEd3BImoREo8c8UTLyGjDosm4h18wrxH/BNiazuv8AgoJ4CmsPtP2KSfVnh+2MrTbDpt2RvKgAtjqQACecDpX730UUUUUUUUUUUUV/Ol4n8eeO/wBk39rXxvqXhrU5NG8S6Rrt/btJsDRXMLTsdrxtw8brtYA/7LDBAI+vPh9/wUx0tNLh+I/xRuvDfinx3p8Lw6P4V8N+Gnt7xWOV3XOpXEbCJMMzBbck/Nk55Q8/+1H8LfFH7el8PiX8HvH8fxH0SC3Dj4fXlzHa6p4e+VRJHHbfKjKSv3xhmwoBkxur89dW0m90HVLvTdStJ7DULSVobi1uozHLFIpIZGU8qwORg9DXu/wH/by+M/7O9jbaZ4a8VNe+Hrc/JoWtRC7tFH91M4eNevEbqM19g+D/APgt9qccsUfiv4WWlzEceZPo+qtCy9ORHJG2ec8Fx1HPHP0J4F/4K/fATxWUj1iXxB4OlOAzappvnRZ9mt2lJHuVFfVnw4+Lngf4y6KdR8GeJ9K8UWBGJG0+5WUx5/hkT7yH2YA+1fK37Jf/AAT1s/2df2mPiJ48Zo5dDJNt4RgDgtBBOA85cdQ0f+oU913k9Rj6s+JHxd8E/B/Sf7T8a+KdL8MWTZ2PqNysTSnuI1J3OfZQTXyj8QP+CvnwE8Iu8Wjz694zmXIDaTpxii3eha4aI49wD+NfPvi7/guBqEkkqeF/hVbQIOI7jV9WaQn3Mcca4+m8/Wvk349f8FDPjX+0DDPYat4l/wCEf0Cbh9F8OK1pA49JG3GSQf7LuVyOgr5pr9W/jZ+z3qv7S/7DPwwuPgyXsvC2m3cmoweFtbuPsBzMAjokkxWOQxzm4KOzAFZ2CtwA1D9nv9lfT/2D/hX4/wDit8ctQ02z8R32hXOkaZ4ZjukmYrMmGjJU4klkYKmEJVV3Escnb4L/AMEkfAt54o/bG0bWYUb7L4Z029v7iRfujzIGtVUn1JuM4/2T6Gv3Wooooooooooooor8wP8AgrN+xZqfiq4Pxq8FadJf3lvbLD4lsLVN0jRRjEd4qjltiAI4GcKqNjCsa/JuExLNGZkaSEMC6xvtYr3AJBwffB+hr9MPhr+3d+yT8FfBtjf+C/gRfQ+NtOTdaPf2NpLcLcbcb/7ReR5VU5I3KuevyAVwP7YFjo/7X37P+i/tN+FNMt9P8U6bImi+PNJshnynGFhuj328ooY5JSSME/umr4Ior2X4NfsnfEP41fGm6+GGmaUdN8RadLKmrNqWUi0xYm2SNMVBwA2FAAO4kAdc19Y+PP8Aglf8W/2ffDt/49+GvxHXW9Z0SKSeaDRFn07UBGgDOISjtvYAE7MqSBgBiQp5PxB/wUo/ab+Hnw10bw/rF9poutc02LVNM8Vy2CNfSWcm5AVOfKYhkdSzRlgVbknBr4x8X+NfEHxC1241rxNrd/r+rz/62+1K5eeZvQbmJOBnp0FYdFbfgvwbrXxC8WaT4a8O6fLquuapcJa2dnCAWlkY4A54A7knAABJIAJr9fP2cv8AgnX4Q+FPgnVpYLbwb8VPjfpjIl1b+Irt30nR7h0EiRmBEdiQpVgzqGbqpQcV8X/Gf9r79pX4R/tIaofGWrRabrujxvpr+GVt1bRDZyBW8tLf7rxSKEIckuQFywI4+epIPE/7R3xXSDw94XtZPEOtzrHa6H4dtBBbR8YCxx52xRqOSSQqjJJABNfub+wf+yBZ/sk/Ck2V28N7401sx3WuX0QBUOqnZbxnvHHuYZ/iZmbjIA+maKKKKKKKKKKKKKK+Fv2pv+CUvw++Nl5eeIvBNwvw88WTkySx28AfTLqTqS8IwY2J/ijOOpKMTmvzU+Mn/BO/47fBWS4lv/BVz4h0mI/8hXw3m/hKgcsUQeai+7oorwBda1jSdL1LQVvr2y0+6mje+00SukUssRYRmWPozIXfG4ZXc3TJrKrpfhv4ktvB/j7w7rd7Cbixsb+Ge5hWCGZpIQ48xVSZWjZiu4AOCM4zX6C+EPGXjz/got4B+Pl94Yi0nwv8RHg0KCLSNLla2OoabA14zW7TO3LM0i5YkKfKhVgowa87/ZE/Z1/aY+CPxs0fXYNE1r4f+GrG4juvEmoapILfTm02NhJcCYElZR5atgKCwOCNpG4ex/tteB/2ZtS+IHg628WfFnVfDOm+H/C1na2PhTQtAmuLqS3dpZ0l+1MpjVpFlX5GA24BPXA6rWv2c/2Wvh3+yZL8XfEXwZ1qHQpvsr2MN7r1x/bN5bzyxxxXBRZ1iidlkaXy1JBVRnBJVfiL48aH+y9ffD+fxD8IfEHjLT/E/wBphjHhTxLAjKI2yXkWVFIwoUDBkYksMcdPmmvUv2df2hNf/Zm+Ih8Z+GdP0u+1hbC4soTqtuZkgMqgeamGBDjA5zggsp4Y1S8G698UvGvxC1DUPB974q1TxprErzXc3h97hr25Z2LOzeT8xBY59K+xvhH/AMEo/jP8bNXi8Q/FzxBJ4TtptplbU7k6lq8y9ht3FU44+d9yn+A9K/Tr9nf9k/4b/sv6GbDwRoaxX0yBLzWr0ia/u8c/vJcDC5/gQKo67epr2OiiiiiiiiiiiiiiiiiuG+IXwP8Ah78WIyPGXgnQfEz4wJtT06KaVO3yyMu5T2yCDivmnx5/wST/AGfPGW99P0jWPB87nJfRNTcrn/cuBKoHsAPwr5z8e/8ABEG4XzZvBPxPilH/ACzs9f00pjnvPE5z+EQ/XjxbS/2Kv2uP2PfGP/CX+A9Lkvby2jaBr/wpcR3yzxMQTG9q4EkqEqDgxEAqp4IBHD/tHft7fHf4ueGZvh748kTw5YpIo1PTbPT30+5utv8ABOHJYDIztACk4yDgY8M+NXxf1z47fErWfG3iLyE1LUmT/R7VCkFvEiLHFFGpJwqoirySTjJySTXqn7TH7a3xH/a2bS9B1G3tdJ8M2MgOneGdChYRCQKUVmJJeRwpKjooBOFGTmv8N/2Afj78UvLk0v4batYWkmD9q1xV06Paf4gJyjMP90Gvqr4cf8ETPF2peXN47+IOk6In3mtdDtZL6Q/7JeTylU+4DD69a+rfhh/wSd+AXw+8ubU9H1Lxverz53iC9Yxg+0UIjQj2cNX1b4P8C+G/h7pK6Z4X8P6Z4c04HItNKs47aLOMZ2oACfet+iiiiiiiiiiiiiiiiiiiiiiiuF+KnwR8BfG7R20vx14U03xLa7SqG8hBliz1Mcow8Z90YGvkHQ/+CNvwZ03x5d6vf6p4g1Xw6ziS28OSXKxRx+qSToBI688YKMO7N1r69+GnwL+Hvwbsxb+CfBujeGht2NNYWaJNIP8AppLje592JNd3RRRRRRRRRRRRRRRRRRRRRRRRRRRXHfFL4teEPgr4Tk8TeNtcg8P6HHMkBvLhXYeY5O1QqAsScHoOgJ7Ve8A+PtC+J/hPT/E3hq8bUdD1BPMtbxreWATJkjeqyKrFTjg4wRyMjmujooooooooooooooorz/48fF/TfgH8H/FXj7VovtNrodm1wtr5vlG5mJCRQh8HaXkZEzg43ZwcYr54/Yn/AOCi+mftgeM9e8Lz+EP+EM1awsV1C1jOq/bheRh9kvPkxbChaLj5twcnjbz2P7bv7ZP/AAxv4W8Naz/wiH/CX/21eyWnk/2n9h8nYm/du8mTdnOMYFe6fD3xWfHngHwz4m+y/Yf7a0y11H7L5nmeT50SybN2BuxuxnAzjoOlcn+0F+0N4O/Zn+Hd14w8Z3rw2aP5NtZ2yh7m9mIJWKFCRuYgE5JAABJIAzXwPcf8FjPGc9vJ4ksPgNdSeBopTG+pSX85U/MBg3C2/lo3X5cHBIGTjn7e/ZZ/aq8H/tZeAH8R+FjNZ3dm6wano95j7RYzEZAOOGRgCVccMAeAQyjx79tb/gozpv7IPjbQ/C0Hg/8A4TTVb6ybULpBqwshZxl9kQ/1Mu4sVkOPlwFU87uPor4E/FzTfjx8IfC3j3SE8i01yzW4NsZPMNvKCVlhLYG4pIrpnAztzgZrwj4X/t6/8LK/a/8AE3wL/wCEG/s7+xZ76H+3v7X83zvsxxnyPIXbu/66HHvX1tX5t+J/+Cvmr6T8RvFPhLR/gVeeI59C1G5sXmsdfdmkWGZo/NMa2TbQSoOCTjOMmug+Dv8AwV78KeMfiBbeFPiF4F1D4Yz3Uy28d7c332qCGRuFE+6GJolJON21gMgnAyRN/wAFDPip4Kn+Onwc+FHjrwBeeMtM1K9tdQhaLxA1hbpLNcm2HnQLC/nBVDfxrxIw4zmvrj44/FfR/wBnb4LeJPG17aRtpvh6w8yHT4nECyvxHBApwQgZ2RAQDjPQ4xXgH7Ev/BRTTP2wPGHiDwzN4Q/4QzVtPs1v7aE6r9uF3Fv2SkHyYtpQtFxzkOTxivsWvz1/aQ/4Kz/8M+/GzxT8Pf8AhVf9vf2HPHD/AGl/wkX2fzt0KSZ8v7K+3G/H3j0z3xX1N8cv2k9H+DX7N+ofF+Gy/tzTEsbW9srP7QIGu/tLxrCofa+3PmqSQrYAPpXjH7E//BRL/hsTx9rvhn/hX/8AwiP9maYdR+1f219t8396kezb9nj2/fznJ6YxzXUftvftzab+xpp/hjd4aPi/WNdll8vTxqIsxFBGF3Sl/Kk/idFA2jPzHPy4MngP9s67+K37IuofGjwZ4FOt6tpvn/bvCP8Aa2ySJoXBlVZxCd7CErMB5YLBgOCRmX9if9uDQ/2x9B12WHRh4U8RaPOouNFe++1k27j93Oknlx7lLBlIC/KQM/eXPFfED/gos2m/tVW/wO+H/wAPf+FgawbmOwudSGt/Y4be55M6lRby5SFBl2yCCrrt+Xmp+1h/wU88K/s9+OJfAvhnw5cfEDxlbssd5b29x5FtaSMAREXCO0kvIyqrgZwWBBA8q8O/8FgNW8L+JLLTvi58GdW8HWF2ci+t5JVmjTP3hbzxJ5ijK5KuMdgcgV9H/tX/ALcek/s4/B3wf8RtC0KL4gaN4mu44LNoNS+xoYngeVZQxhkzwmNpAIzz0xXzWv8AwWI8WSaaNRX9m3WG05oftAul1yXyvK27t+/7BjbjnOcYr6d/Y3/bo8JfthWGrQ6bpt14b8S6Sqy3mjXcomzExwJYpQBvXd8pyqkHHGCCfpeivzI/4LI/Fq71GPwB8FNDfzNR1q6TVb2FWwWXeYbWM+zSGVsesamvCPit4Msf+CdH7X/wj8W+G76O98MNp1muoSWsvmLMUiW11IYHVnU+fgjAaUYAwAPfv+C195BqHwj+F9zbSpPbzatPJHLGwZXU24IIPcEY5r7w/Z6/5ID8NP8AsWdM/wDSWOvzY/4LEX1z4p+P/wAHvBNzdNb6M9p53HRHubsQyP7kLCv69Mmv1Ls/Bmhad4Rh8K2+kWcfhuGzGnppXkg24twmzyth4K7eMHqK80+BP7K3ws/ZXs9XufA+jPon22JTqN7dX805ljj3MpfzHKqF3N0A4J9TX5d/C7wPZf8ABRb9q741+MPEF/HZ+H49Nu49Hlu5RGsMsiNbaYCpP8MaNMQOrx9OTXuP/BGr4x3NrbeOfgvrjtDqGkXDatYW8rZZF3CK7iHOAFkETYHeRzXH/suf8pgfiZ/1+67/AOh1+tVflV/wTQ/5P6/aE/7in/p1Wuy/4LYeBdIuPg74G8Zm1iTXrTXhpC3KoBI9vNbzylWbuA1upAOcbmxjJz87fHzxBe+Kvi7+xPq2oyme/ufDXhxp5m5Mji+wXPuSMn3Ne5/8FkPi1dakvgD4KaI5k1HWbpNWvYVbaWXe0FpGe2GkMrEHoY0NeFfFDwfp/wDwTn/bG+Evirw5eR3vhaTTrMahJayiUSlYxa6kMZ5ZgfPAOAGlXAGMD9p7W5ivraK4t5Fmt5kEkckZyrqRkEHuCCDX4cftdfDc/E/9t/8AaFsIkLXem6LNrUG3khrWztpnx65jSRcf7VWfi9+0Bc/FT/gn/wDAP4YafM154im1ubTLmFGy22yxFaxH2ZLy3I94/avZv+CXfg+2+Hv7cnx48LWZ3WmhwajpkLeqQ6mkan8lFc54tj0n9vL/AIKbXulaxdxy/DrwnFLZuWmEaPbWmVbaxOGEl3Iee6MOoFbX/BLnxtdfAP8Aag+IvwD129SSC+uJxYSKwMcl5aFstH7S2+589xEnHNcb+154F8V/8E5/2ol+J3wvKad4b8WQXgtITGGt7aaRf39sydCiu0c0YIA4UDPlmvo//gl7+zLc/Cv4Yat8bfFttJdeNfFdpJdWYu2JlhsD+9DsT/HcMFkJOTtEfQlhXif/AARx8MWPxI+NnxP+IXiMR6r4nsIYZYLi6y8gmvJZnnnGc/P+6xu64kPqa+2/+Cj3w/0Tx5+yB4/bVreFrnRbL+1tPupAN9vPEwYFG7Fxujx3Dke9flB4m8UXviD/AIJl+DrG7laSDRPiVd6faBmJ2RGwFxgeg8y4kOPevpL4ff8ABXUfBv4NeCPCEvwh1Ca+0bw9Y6fb3d5q32eK7ENukQnC+QTsbbuABPXGe9dz/wAEo/2a/G/hvxt4u+NPi7SB4ZsvEmnvbaXpuzy2mjnnjuHmEecpGPLRUDckMeMAE/phTHdY0LMQqgZJY8Cvxe8H/Bq6/wCClf7bXxF1vxBNrGgeCoI5JYLyCHZILeMrb2cSeYpUM6r5jDB5D9zmu7/ag/4JI+G/hN8DfFPjHwR4j8Ra7ruiQLeHT75YGSWBXHnEbI1IKxln752Ed68T+OXxM1j4w/sE/BzSb2wvpNf8H63caHco1u+9oEtlNtJjH3fKKx5PVomr6I+HH/BWx/Anw88L+Gn+CmvXkmjaXa6c1wuobBKYYVj3hfIOM7c4ycZqP9qzwH4j/wCCiH7Pfhj42+BfB9/o3ivw3c3djN4beUzXd1aBlbfFhFLOjAsEABYO2MkKDmH/AILHeMLD4dv4YuvhpMnxYih+wm8klKwfaNuPPa1Me8PnB8rOCf4gOK5jR2+M/wCzv+wb461Xx1q3iaXWviFJFoHh7w1qk808mn2jq7Xdy0LZMRkj3oBhSvyseWFdH+y//wAEkfDXxa+Bfhbxl428ReI9B13WoWvDp9iIFSKBnbySd8bHLRhX/wCB4xxXnvjr4M3v/BNT9tL4ea94cl1jxD4NkSO4lu5oA8rW7loLyFvLUKWVCXXgfeTuM1l/8Lvu/wBmv/gop8TfiMPCOoeK7A6tqsEdvZkxCVZpDtdZNjAjjPTn1r6v8Df8Fcf+E28beHvDv/Cl9csP7W1G3sPtcmo7lh82VU3keQMhd2cZHTtXyZ8Gf2kL79kT9rr4z+KbjwJqviqHVdR1PT0ht3a325vzJv3GNtwwmMe9dX8bPiT8Yv8AgqN4u8J+EPC/w0vvCPhHS7pppbu7aWWCN2whuLicxog2Ju2xqCx3MBuyAOr/AG6Ph2vgD9rP9l7w/pFrcS6J4c03RNOS48slVigvygZ2AwDtUEk1w/g34MXX/BSr9tj4ja54huNY0HwXBHJNBeQwhJBbxskFnEnmIVDMg8wjHZ+cnJ7r9qL/AIJJeHPhL8DfE/jLwP4i8Ra9rmiwreHT78QMkturDziNkancsZZ/fYR3r64/4JlfF29+KP7LOg2GsR3EWu+FXOhXAuo2RnijUG3cA9R5LIme7RtXzj4A8MPq3/BYL4lRX+nzTaRfabc28rSRMI5Eewt1Zd3QggkV8u/scfs4a0v7fXh/wdq9hdmw8IeILu6uZ5YmEW6xZ2R84wQ8sUIz0II7V6V4C+JWq/AP9pD9szxna2F2upD+2rbSGWBjvu5tYWOFl4+YKW8wgdVRql/Yp/4Jg6R+0Z8HP+E58d634g8O3F9qE0Vha2CxKZLeMhDK/mxscmUSrxxhPfjA/as/ZCv/APgn78Tvhh49+G99rPiSyS8+0+ZeorSRXUEiv5beUgHlyRtjGDna+eoFe7/8FdtZHxQ/Z/8Ag54i0G1uruy1S7bUIVWIs6Ry2quocD7pG7BHYgivvv8AZ+jaL4C/DaORSjr4a01WVhggi1jBBr8qtU8L/FD/AIJY/tK+IPF+geFLjxP8KdVMkfmRq32aSyZ/MSKSZVbyJ4iNoZ1wQGIBDHFz9ob9vfx5+3V4T/4VL8Jfhlq0EOryRDU3jkN1cSqrhxHlFVIYt6qWd2wQuDtG7Nr9tD9me+/Z1/YD+E/gjym1LXl8StqOrvZq0ifapbaYuFwOVQBIw3cJnjOK+wrz9mPSf2nv+Cfnwz8G6rEllrUHgzSJ9J1CWP57G8WwiCk8Z2tyjr3UnuAR85f8Et/jj4u+FPjzWP2eviNZajZJFczDRmvI3KWd1GT59qH6bHCs6EHbuDYz5gr9SqKKKKKKKKKKKKKKKKKKKK860f8AaD+HXiL4lXnw+0vxbp+oeM7NpUudItmZ5oTGMyB8DC7ehyRg4HUgV6LRRRRRRRRRRRXyp+3N+3N/wxf/AMIT/wAUT/wmP/CS/bf+Yr9h+zfZ/s//AEwl37vtHtjb3zx89N/wWXvNDlt5PFHwE1vQdPmIxc/2uzMw/wBlZLSMNxz94V9Q61+214Suf2Tdb+Ongy2bxVpmlxIZdImuPsk8cxljjeCY7ZPLdfMDdGBG0glWDV8r6R/wWQ8TeIbMXel/s46tqVoWKC4s9ellQsOo3LYEZr6F/ZC/bc8Q/tQeN9Y0HWPhFqfw8g0/TvtyX97fSTrM3monlANbRYOHLZyfu9O9d5+2R+08f2SfhHD43/4Rr/hKvM1OHTvsP2/7HjzEkbf5nlSdPLxjbznrxXyHY/8ABYrxLfWMWop+zlrMmksvmm9h1uWSPyx1cN9hCkAZ7gcdRX1R+x/+2x4O/bB0TVZNEs7vQte0gx/b9GvmV2RHzskjkXiRCVZc4BBHKjKk+GfHL/grT4a8E/EC68F/DTwXe/E/V7Wc20t3bXRhtnlXO5YAkcjzYIIyAoJyQWGCYPg3/wAFcPD3iLx5B4P+KngW/wDhbqU0qwJe3Fw01vHIx+X7QrxxvAvIG4hgOp2jJH1L+0p+1B4I/ZZ8Cp4l8YXcrm5cw6fpdiFe6vpAMlY1JA2qCCzEhVBHOSoPw7J/wWS8Ttat4gi+AV+/g5ZSg1FtVlCHqB+++ymMNn+HnuM96+1/2Yf2r/BX7VPw9n8T+GZZbCSwfytU0vUNqz2EmCRvIO0owBKuDggHoQyj5Z+J3/BXzSLXx5c+FfhL8OtS+J0sLmMahFcNDHcMp+YwRJFJJInYMdueuCME9L+zj/wVU8LfFv4g2vgTx14Tu/hn4mupltbZru6862knPAidmSNonY4ChlIJIG7JAOR8aP8AgqL4o+EPxG8X+G1+AOraxpnh++uLX+2xq0sMM8UTEed/x5MFUgbvvEAdz1rh9F/4LKeIvElq11o/7OuqapbK5jaax1+WZA4AO0lbAjOCpx7j1r7e+IH7QVl8Nf2abr4u67pbWaQaFDqx0eSfY/2iaNDHaGQpwxlkWPdt4Jzt7V8j/wDBLH42fDD4heKviPp3hjwLceDvF93s1m8vdS1s6td6pG0hEp80wxbFSR1JUAgmbPav0Ur4R/af/wCCnV1+zr8etS+GVl8KZvGN3axW8kV1BrZgecywrLtWEWshyN2OGOcZ46Vxvhn/AILNaJD4mttN+IPwm1zwPbSPtkuYr37Y8IOMO0TwwsV6525IA4DE4r9D/D+vad4q0PT9a0i8i1DStQt47q0u7dgyTROoZHU9wQQa8a/au/bA8E/sj+ErXU/ExuNR1bUC6aZodjt+0XTLjc2W4SNdy5c+owGPFfHVv/wWV1nS7qw1LxN8C9S0nwjfPth1CPUnLsvXMZe3SOU4B+UMv1GOf0I+EfxY8N/G/wCHuj+NfCV99v0LVIvMidlKyIwJV43X+F1YFSPUcEjBPZ0UUUV+Vf8AwXO/5on/ANxv/wBsK/SG88F6P8RvhOvhnxBYxajo2q6VHa3VtMoZWRo155B+YcEHsQCOgr8RP2atcu7X9kX9q7w2JmutNTT9Ju0ePJhEi33lllPYuu3tyIx6V6b+xZ+1t8cvg78D7bw54C+A+rfEDw/HfXE6a1Z6bfTo0jsC8e6GNkyuBwDmv0L/AGN/2hfin8eP+Ev/AOFl/CjUPhh/ZX2P+z/t1ldW327zfP8AN2+ei7tnlx/dzjzBnGRXlf8AwWS/5NHs/wDsZrP/ANE3FfPnwD/bu+Nvwq/Z58IaB4f/AGctd1/RdN09bex8SfZr1rW6G5iJBst9rDrwr9utcJ+w34o0jQ/hT+1F46j8Qw2XxVm8NahLBoNvbtbfZLchme4j/hOJnQbV/wBWEXP3xj6B/wCCKHw90KL4S+N/HH2SGTxJca42jm6dQZIrWK3glCqeqhnnYnGN2xc52jGv/wAFovh9omo/Abwz4yks4U8RabrkWnw3wUCR7aWKZnhJ7rvRWGc4IbGNxz8a+MNeuf2i/jv+yp4U8aXDy6JJoXh/S5lkkP8ApCSXBWVs8YeVVVCeSSoPJ4r9R/2sv2svhn+yNoHhrQfG3hfVNW0PxLbXdnb6bolhbTWywQLCkkUkcssahCs6qFAIIDAgcZ+ErX46fs+2n7MPx8sP2fPA3i3wfr0vh6H+1LvV5C4uLaW9htWA/wBLmwVW6foqgKW57H6O/wCCPHw70PQP2Y5fFVtbwSa9r+q3AvLsAGVY4WEccJPZRhnx6yZ9MeW/8Fsvh/o8Og/DrxxBDDbeIvts2lSzxgLLcQeX5qbj3EbI2D280+tfW/j/AMSXvjL/AIJ3eI/EGpeYdS1X4WXN9c+cNr+bLpDO+4djuY14b/wRU/5NZ8U/9jndf+kNjXEf8FkPi1cahH4A+CujTxi+1q6TVb9GkCDbvMNqjE8BWkMrHPQxKa8K8Uad4f8A+Cff7bnwy8ReE9cs9T8E3WnWcGpz2N0s6FTGLW/3hWJ3ZUXODxudcdMD9p45EnjR0dXjYZVlOQQe/wBK/Jn4yf8AKaLwt/1+6X/6QrX1t/wVE8EaN4s/Y18a3+pWMU9/of2a+066ZAZLaX7TEjFCegZHZTjqD7Cs/wD4JQeIL7Xv2MfDUV7L5w02/vbK3Y9REJi4UnvgyMB6DA7V8pftNWFt8ZP+Cu3hLwd4oiFzoGnS6ZZpa3S4hmhW2+2mPnO5XkkZT0ySV7Zr9QPih8KfDXxi+Huq+CfFGnre+HtShWGa3Q7CoUgqyEfdZSoII6EVR+C3wP8ABf7PngtfCvgTSX0bRPtDXTQPdzXBaZgoZy0rsckIvAIA7AZrv6KKKK/MD/gtf4T1vxR/wpr+xtG1DV/I/tnzfsNq83l7vsO3dtBxnaevXB9Koa1/wUy+Mvi7wO/hHwR+zzr2leIriz+w2+peZdXzxEps81IVtY/nGcgliAcZBHBy/Bv7Gfij4Bf8E5vjPe+IdKmHjvxhBYudHt086a1tobmMxREJn94TJI7AdBtB5U4439kP9uXxv+yr8G7fwF/woPxB4o8m9uLv+0PtU9pnzGB2+X9kk6Y67ufQV9sfsi/t0eI/2nPiTqXhfV/g7qnw+trTSZNSXU72+lnSR0mhj8kK1rEASJi2dx+4eOcjn/8AgrtoOp+I/wBlW0tNJ0671O6HiSzkMNnA0zhRFcAnaoJxkjn3r5w+Av8AwUc8dfA/4L+FfAUf7PGvaw+hWIs11Fr6eETEEncYvsbbRz03H61N+w7+zX48+Ovx9+J/xV+JHg+68HeFfFOn6raTWs9q9qbmS/ykiQJINxRUZz5hBBbHU7sch8L/ABD8bP8AglZ8RPE2h6t4DuvHHw81WdJBeWayJbTlcrHPDOqOscm0gPE4ycKOAFYu+MHj342/8FS/F3hvwl4b+Ht54M8A6ddfaZbq982S2ilIKG4uLgoikqhcJGg3fM4+bOR7b+3d+wL4gfwj8MvFnwZt57vxJ8O9LtdI+yW+BeXNvbEPb3EQ6NMj72I6tv4yVAPC6t/wVG8X6r4ZttE8Wfs4Ra18Q7RTAsmoQSm3WUgbnFq8BkTJUZjD84HzcYqP9hH9h3x74u034wap8TPDkngrQfHmgT6VbQ3MPk3KTSzrMsyWzfMiRNGpAk2knbjIyRx/wP8AjJ8cP+CY+qa54E8a/DS+8UeDbq8a6t5LVpFg84qFM1rdLG6MrqqExsAwIGQhLAu8aR/Gj/gqx8XvC8T+Cr3wD8MdGcqbqZXaC1jcr58xmdUFxOwRVVEUBflBABZz+mX7RXhyPTP2SfiboGjWbmG38EanYWVnApdtq2EqRxqByTgAAV82f8EdNB1Pwt+zD4og1nTrvSJz4vupRFfQNCxT7FZDdhgOMqefY18xeDf2f9Q/4KKftsfEbxD44tfEvhvwJCkkltdRQm1mMMbLBZxRmaJlBZFMjDaej9zmuw/ay/4JL+DvhT8C9f8AF3w31Pxfr3iPSfLuDp2pT29ws1vvCy7Eit0Ysqtv69Ebg5FfY3/BO/4m6x8SP2W/DEXiOwvtP8Q+HlOhXiahbvC8iwhfJkAcAsGhaLLd2D+lfBv7ZWreKPhX/wAFL/8AhZOmeB9W8WWeiHTbtLe0hlSO422aKVEyxuF5J52nGOlavx7/AGqPjt+3V4N/4VX4N+BOs+F7HVLiFtSnkea5DqkgdFed4YY4Y96oxLZyVAyMkH6E8Xfsp/HH4SfstfC/4d/AvxPHpviPSZp7jxBfRXq2yXMkwMj7S6/MokYqvAO1VzzmuG/4KFfst/Eqx+JXgj9oP4YWE+ueKtBitP7XsLOIzz+fbMGiuVjXmZCPkkVedqqcEFivmnxj/wCCj3xY/aM+Gl38MfBvwc1jQ/FWuRGx1K6sWnu5RETtlSGIQqU3fdLMTtUsOThh75D+zz+034R/Yr8IeFvCfjrUD8WG11dT1WfUNZ3mysmt5k+xJNIXBVGEB2r8u7eQSOT9sfDyz1nT/APhq18Rz/avEMGmW0WpTbt/mXKxKJWz3y4Y5710VFFFFFFFFFFFFFZniLxDp3hHQdR1vWLyLTtJ063ku7u7nbbHDEilndj2AUE07QdcsvE2i2OraZP9p06+hW4t5trKJI3UFWAYA4IIIz61o0UUUUUUUUUUUUUUUUUUUUUUUUUV4H+118StZ+F+j/C680nWBokGo/ELQ9K1Odtmx7GaZhPG5cEKpUcsMEAdRWL+2R+0Da+C/wBnfxJq/gXxxpcPiiG601LR7G8t55tsmoW0coVCWzmJ5AeDgEntmr37ZOsanrXhrwp8LPDk9rbeJviFq8enRT3VlFeJa2UA+03lyYJQUkCRxhcMDzKvQ4Ii8B/GnW/GP7GOueK7iY6d480DQdUsdWCqm+11exjlimJXGFPmxeYFxgK68V4PD438X6F+zDpHxTt/2nby68ZyeGrXW18MalDpVxb3l7JbpL/Z4hSFZsySN5KhW3gsO4r3HXviR4y1D9oL4NeGpbq58L2vifwhqt9q2lRrG7W94kdsU+ZlJ3RNI4HYnqDXnfxC8G/FDwh+0F8IvANt8f8AxrNpvjKDWpru5ls9M86E2UMMkYjxa4wxlYHcDwBjFex/FbxVrH7NP7NOv6hP4j1Pxx4pt4mtdKvNUjgW6vNQuZRFaRbIkRCBLIgwFztUk5wTWV+zB4r8ZXll8Qfhf8QfEkmrePvCF4sTa9HDFFJdWV3CJrW5VQNuVJlj+7jMIzk5FeY/ELwb8UPCH7QXwi8A23x/8azab4yg1qa7uZbPTPOhNlDDJGI8WuMMZWB3A8AYxX1l8PvC+peDfC9tpeq+KNS8YXsTOzatqyQpcS7mJCsIURAFBCjCjgc5rpqKKKKKKKKKKKKKKKKKKK+bP24fBkvjzw38JtKOht4h05viVoL6lZG0N1CbPzXExmTBHlbWIYsNuDz1riv21/2Xvh9pf7NviW68C/CTw1aeKYrvS2tJ/Dvhq3S9Qf2la+aY2hi3geXv3Y/h3Z4zVzVPhDr37R37UvjDxPdeJPGXw90PwNaQ+G/D99oJjtZL+WVfOv5QbiCQFNxhj3IMN5f3uOeZt/hh4i+BOtfHn4ewXHifxp4d8ceDr7xNp+t6nELiU6sIZLe6tneGJIzLIvkOo2gkLj5jXmnh+z+Cd5+zDoPhT/hn7WdT+KP/AAitrYO+n/Dm4tb5tVW0RWl+3eQm1hMC7TeZ0BbJ7+4+GvBfjfSvj1+zO/iuK81XWNJ8B6laa7q6o0sS3hitAwkmAwWZlbkkFiCfWuz+Mehalffti/s56nbafdXGm2Fp4oW7vIYXaG2MlraiMSOBhCxVgMkZIOM4rE/aS8Baz+0H8ePh18OobvX/AA34V8PQyeNNS8RaOgiYXsbeTYQwzSRPGJVdpZSpDHaoOAcGsN/g7r37Ov7THw98cWfijxp8RdL8VJJ4O8Qz680V5LZxsDPYzD7PbxhY1mWRGdwQom+8M4Pb/GPQtSvv2xf2c9TttPurjTbC08ULd3kMLtDbGS1tRGJHAwhYqwGSMkHGcV9E0UUUUUUUUUV4B/wmf7S3/RMPh/8A+Fjc/wDyDR/wmf7S3/RMPh//AOFjc/8AyDR/wmf7S3/RMPh//wCFjc//ACDR/wAJn+0t/wBEw+H/AP4WNz/8g0f8Jn+0t/0TD4f/APhY3P8A8g0f8Jn+0t/0TD4f/wDhY3P/AMg0f8Jn+0t/0TD4f/8AhY3P/wAg0f8ACZ/tLf8ARMPh/wD+Fjc//INH/CZ/tLf9Ew+H/wD4WNz/APINH/CZ/tLf9Ew+H/8A4WNz/wDINH/CZ/tLf9Ew+H//AIWNz/8AINH/AAmf7S3/AETD4f8A/hY3P/yDR/wmf7S3/RMPh/8A+Fjc/wDyDR/wmf7S3/RMPh//AOFjc/8AyDR/wmf7S3/RMPh//wCFjc//ACDR/wAJn+0t/wBEw+H/AP4WNz/8g0f8Jn+0t/0TD4f/APhY3P8A8g0f8Jn+0t/0TD4f/wDhY3P/AMg0f8Jn+0t/0TD4f/8AhY3P/wAg0f8ACZ/tLf8ARMPh/wD+Fjc//INH/CZ/tLf9Ew+H/wD4WNz/APINH/CZ/tLf9Ew+H/8A4WNz/wDINH/CZ/tLf9Ew+H//AIWNz/8AINH/AAmf7S3/AETD4f8A/hY3P/yDR/wmf7S3/RMPh/8A+Fjc/wDyDR/wmf7S3/RMPh//AOFjc/8AyDR/wmf7S3/RMPh//wCFjc//ACDR/wAJn+0t/wBEw+H/AP4WNz/8g0f8Jn+0t/0TD4f/APhY3P8A8g0f8Jn+0t/0TD4f/wDhY3P/AMg0f8Jn+0t/0TD4f/8AhY3P/wAg17/Xi/xC/aSTw74+uPAfg3wbrfxL8a2dtHd6hp2ivbwQabHJzH9qubiRI43dcsqZLEDOACCdX4KfH3S/jLN4h0p9G1Twl4w8NzR2+t+GdbRFurNpFLRSAozJJFIoJSRSQwGeOK9TrnPC/ii78Q6j4gtrnw/qWix6XfG0huL5UCagmxW8+HaxJTLFfmwcqeK6OiuB1D4vabpvxs0b4ZvZ3T6tqmi3Gtx3i7PISKGWONkbnduJkGMAjANd9WF428U2/gbwbr3iS6ikuLXR7C41CaGHG90ijaRlXJAyQpxnHNV/hv42tfiX8O/C/i+xt5rWy8QaVa6tbwXGPNjjnhWVVfaSNwDgHBIzXS155ofxm0zWPjV4o+GUtjd6drui6baavFLc7PK1G0nLIZYMMWIjkQxtuAwxGM5zVbx58cdP8E/Evwt4Eh0jUNe8Q6/ZX2opBpwjP2a3tYwxeXcwIEjssaYByxxxgmuz8I65P4m8L6Vq11pF7oFze26TyaXqAUXFqzDJjkCkjcM4OCaq+LvFF34Zk0JbXw/qWvDUtUi0+ZtOVCLGN1cm6m3MP3S7QDtycuuAea6OiiuA8W/GDTfCHxY8AeAbmyu5tS8ZRalLZ3MW3yYRZRxySCTJzlhKANoPQ5xXf0V8teCP23NW+IXgmx8Z6D8B/iFqvhW8jaeK/szp0rSRozK7JF9qDsQVYbQMkjA6ive/hh8StB+MHgHRfGXhi7N7oerwefbSspRvvFWVlPKsrKykdipFdVRRXA6h8XtN0342aN8M3s7p9W1TRbjW47xdnkJFDLHGyNzu3EyDGARgGu+ooor5j/ZLaHS/i5+0lo+pMo8WjxydQmVjmRtNms7c2J91CrKBxgciup+KXxj+HPhub4q2J1s+HvFfh/wyt9rmt6Zp/mXdhbyK4tz5uwq0oPzJExJ+ZTjBNfGF1o938N/FHwG8UeHPhr418APqvjfRdKuvGHizxYJdQ1+G6fbPHc2Kzy8yrvc7tuzHygA4HoGveNILXSvj/pmu6/4ujj1L4q22iafp3hOQnUtQZ7a3f+z7dmZfJWRUk3MrLtUMcnOCvwL02/8Ahj+2d4Q0LS/h/q3wk0HxB4a1Ga78P6h4pGr/AG9oWiMVy8QllWF1OVDbyzDcOMNn3D9tbUr+50n4XeDYdVvdC0bxp41sdD1i/wBPuHt5mtGjmla2SRSGQzNEqZBzgsMHNeDeOPBWl/suftValefD1rrGm/CLXtasPD13fTXsVtcRSKymPzXdlSVo1yoOCyMR1NcJ4c8G/EuP4T+EviZ4Z+H+o2nj6aPT9X/4WTrPxOieLUzK8bOlxbyOI/JmVzGIcAruUckHd+gv7Qv/ACQH4l/9izqf/pLJXxVb/wBiePPBPwC8Hy+GvGnxV1Gy+F+kX8ngXQdSj0zSoBJBCqXt5ctPDmQ7GRI2ZgAGbaCQT67/AME89R1ePRPiz4b1G3utLtPDvjK4sbHRLrVzqp0qLyIWNqtyTl1R2bjnBLDnknoP2qIz8LfiR8K/jbC3kWeh6j/wjfiSTO1P7J1B1iEsh/uw3PkPj/aJ5xiuX8AtJ8TvEf7RHxpMjGzSxu/BnheZWOVsbGOQ3M0bA4Ky3Zcgj/niPqfNPhH4+m+Ccn7OPxH8Ra3ef8Id4v8Ah22h63NdTO8MF7bQC9t7hsk5lkRJo89SF59RHocvia3+Df7PfjPWL+/ttb+I3xls/El7Abh8R2t5HePBbDn/AFIgSEhPugk8d65TRdF8bftCQfELxlqXwz1vxVr8ev6pY6d4lt/iINI/4Rv7PK0cUVta7lEJiCK7FwS5JZshsV6LbeHdf+NPxy+Bvh34latdSm6+G93deILPQtXZLTVZo7iBcvJbOAyOxWQ+WcH7v3SQeM1bUNX+GGh/Fb4UeGvEWs6H4Qf4paB4Zt77+0ZZLnQ9N1COF7kQTuxZFzlRk8CRjnJJPoerfBXwh8CP24vgFB4Vub3T9JuNK8RzTaPdalPdQ2rJax7rlfOkcoZQQGwQD5APXJrwH4t+VqXwH8U/Fjwl4N8f6zqEMkupWfxm8SeKV0yQ/wClHy3t7JZyTD8wjjjEKKy4Pyk1+qXh+7kvtB025nO6aa2jkdgMZYqCf1NfCP7D1v8AtC3n7I/gCDwbe/DjTvDslncJZXerQ301/CpuZsuyIRGzBtxAzgjGe9bviD4K23gvXv2df2bLrXdUl8A3Vprepay8Ny9nLr91CFnMLPGwZYzJczStGrHI2jPy7q5b4rWkvwHl/aM+Gfg3VNTTwUnwxPim0s5b+af+w75pZ4Wigkd2dFkRFl2lsAjKgAnOjrHw7sfgj4J+AHxU8K69rV94617XdA07Vr+fVri4XxJb3yKs8LxM5j2hTvj2rhBGuAcZrrfhf4kvP+Gdf2s7261SfzNP8X+NY4bia4bNskasUVWJ+QL1AGAPauU+E/iBNP8Aib+zxrusalJbRw/AZr281KcmVowEsnkmbOSxABY9SfevEviLDN4f+CumfFbwl4E8fWmqLf6df2/xb8W+Klt7zUvOvIvn/s9Z38yKVJABHsVdh3c7SD9RfD/4Z6V8Uv22vjxfeJ7jU9Sh8I6n4bu9D0/+0riK1srhtNhleYRI4R2YxoCGBGNwx87Z+w6K8n+KP7NHgr4seJLXxNfLq2g+LbaD7JF4i8M6tcaXf+Ru3eS0sLrvTOThwcc4xk1J4T/Zl+HPg74f+I/BtroH2zR/Eok/tyTUrmW6utUaRdrvPcOxkZsE4O4bTyu2uJh/Yj+Gmjw6ff3Nv4p8WX/h+4hv9DbV/El3dzac9uwkiitPNlCRDcijHAPAY4HHJfCP9m1/ip4Z+KN18VfCV94aXxX43bxNpOnnUFTUdN8qCGOC5E9tIfKm3I5wrHAODkEivUfA/wCyf4A8B+NtJ8Z2setap4y09J4v+Eg1vWrq+vLiOVAjRzSSu29FCjauNqHJUAsxPdfEz4Y+GvjD4Pu/DPi3TF1TSLhkkMe9o5I5EbckkciEPG6kAhlII9eTXCfDv9k34f8Aw38af8JfZxaxrPixrKXTrjWvEGsXOo3NzbyFCUlaZ23ACNABgBRnA5JOLpP7Dfwq0fWbGeCy1mTQ9Pvf7Rs/Cc+uXcmh21yH3iVLFnMYIbLBcFQT93pXtniXw7Y+LvDmq6HqcTTabqlpLZXUSuVLxSIUcAjkEqxGRXkWvfsd/D7Wf+EXks28Q+Gb7w7osHh201Dw3r11p91JpsIAjtZpInBkQYz82TnPPNdd8I/gN4J+Bcetw+CdJbRbTV7iO7urZbmWWNpljWPzAHZiGZVUsc5Y8nJJNdF4+8C6L8TvBeteFPEdkuoaFrFq9pd27MV3xsMcEcqw4IYYIIBGCKz/AAj8JvDPgX4Y23w/0WwNp4Wt7KSwS081mbyn3b8uTuLMXYlicksTXJeMv2U/ht48+C+h/CvW9Elu/BmirAthai8lSWHyUKRkSqwcnazKcnkMa6jxN8H/AAr4tsPBtjqGnsbTwhqVrq+jxQzNEtvcW8bxwnCkblVZGG08H04rz/xt+xf8NvHXiPWtXuIte0dfED+Zr2m6Drt3p9jrLYAJuoIpFRyQOSAC2SSSTmu+sfgz4R0rxpoHiiw0lLDU9B0Z9A01bV2jgt7FmRvKWIHZgGNMcZAGKytV/Zy+H2vWfxAtNU0FdStPHc0U+vW9zNIy3EkcaRxuvzfu2UIhBTBDKGBBGa5/wR+yB8PPAvjjR/GUSa5rfizS4p7e21jxBrl1qE4glTyzATK7AxqpYKuMLuY9SSeef9gL4Q3GlXuiXdlr174VmEv2bwvdeIb19K09pN26S2tjLsjcFmKnB2k5XHGPoLStOi0fS7PT4DI0FrCkCGVy7lVUKMseScDqetc/8Lfhj4f+DfgLSPBvha1kstA0pGjtbeSV5mRWdnILsST8zMeTWd8Xvgn4U+N2j2Vh4ntLgy6fci807UtOupLS9sLgAgSwTxkOjYPY4PGQcCvKviJ+yrpfhn9nH4ueG/h9pl5rHjDxfpFxFcahrGpvdahqtyYmSITXVw/QbiACyquSeMkm98G/2OfA/wAPj4R1y4sNVn1nRbSN7LS9S1me80/R7p4wJ3tLZpGiiYsW5UYH8OOKu+JP2K/hh4r8T+JdXvbPWIoPErtPrWi2etXVvpmoXDLt8+a1RxG8nfJGN3zEE811mk/s7+A9HvfDdzDo7SN4f8NHwjYx3E7yxjTCI1MLqxIfIjUbmBJGeeTXnLf8E/8A4RXWgtoOoW/iTWPD8KhNN0nUvEt9Pa6RhgwNmjS4hYbQNw+bGVzhmB9l8N/DHQPCfjbxd4s062ki1zxW9rJq07zMwma2hEEJCk7UwgA+UDJ5NdbX/9k=',
                width: 50,
                height: 60
            }
        ]
    },
    footer: {
        margin: [100, 20],
        columns: [
            {image: 'data:image/jpeg;base64,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8qF1/wDHaP8Ahln4X/8AQsf+VC6/+O1yLOcmSsqEvuX/AMkd74f4ibu8VH73/wDInx7D8cNXhsIrRdM0/wAqOy/s9G33SusO2NSoYTAqCIkyAQpIJIO5s+dO3mPIwTy1znYOn61+g/8Awyz8L/8AoWP/ACoXX/x2j/hln4X/APQsf+VC6/8AjtddLiXLqN/Z05K/kv8A5I8+vwfm+Jt7WtB283/8ifAusavJrV3FcSIqMltBbfL/AHYoUiU89yEBPuTXfaL+0B4n0Kz060thZG1sLP7JBC8AdNwDL5rZ++wWRxhsr83Svrz/AIZZ+F//AELH/lQuv/jtH/DLPwv/AOhY/wDKhdf/AB2pqcRZZWioVKUml5L/AOSKo8JZ1h5upSrxi3vZy/8AkT5RvP2kNf1C3v7efTdLkttQEpu4RCy+e8iQq7EhsjJhyVUhT5jAgjGOb+IvxY1b4oR2Q1m1sUms5JWimtYREyxuVPlkA4KqQSCQTljzX2l/wyz8L/8AoWP/ACoXX/x2j/hln4X/APQsf+VC6/8AjtZU89ymjJTp0ZJrbRf/ACR0VuGc+xEJU6uIi4y3V3r1/l76nynpP7SWuaVeandnSNKuri51OXV7Zpo3b7HcyRmNmj+bkbT0bPPNSW/7TPiGx/s02emaZbyW5ha6l2O5vhHAYFV9z4AKE8Ljk5+v1R/wyz8L/wDoWP8AyoXX/wAdo/4ZZ+F//Qsf+VC6/wDjtZPOcmbu6EvuX/yX9PXc2jw/xDFWWJj33f8A8h/S02Pk6X9oK/eK8tU8OaPHp0umjSoLNRMY4IhuI+UybXO5y2XBOdpBGOfLK/QT/hln4X/9Cx/5ULr/AOO0f8Ms/C//AKFj/wAqF1/8drqo8RZbh7+ypyV/Jf8AyRx1+E84xVvbVoO22r6/9uH590V+gn/DLPwv/wChY/8AKhdf/HaP+GWfhf8A9Cx/5ULr/wCO10f614L+Sf3L/wCSOT/UjMf+fkPvl/8AIn590V+gn/DLPwv/AOhY/wDKhdf/AB2j/hln4X/9Cx/5ULr/AOO0f614L+Sf3L/5IP8AUjMf+fkPvl/8iVP2S1Zfgbou4YzNcn/yO9exVk+FfCul+CdBtdF0W1+xaZa7vJg8x5Nu5y7fMxJOWYnk961q/NsZWjiMTUrR2k2/vZ+v5fh5YTCUcPN3cIxT+SsFFFFcZ3hRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB/9k=',
                width: 400,
                height: 80
            }
        ]
    },
    content: [
        {text: '1200\n\n', fontSize: 12, alignment: 'left'},
        {text: 'Bogotá, D.C.\n\n', fontSize: 12, alignment: 'left'},
        {text: 'Señor(a)', fontSize: 12, alignment: 'left'},
        {text: '@nombre', fontSize: 12, alignment: 'left', style: 'sub1'},
        {text: '@cont_direccion_predio', fontSize: 12, alignment: 'left'},
        {text: 'Barrio: @cont_barrio_predio @cont_localidad_predio'
            , fontSize: 12, alignment: 'left'},
        {text: 'Tel: @beneficiario_telefono', fontSize: 12, alignment: 'left'},
        {text: 'La ciudad\n\n', fontSize: 12, alignment: 'left'},
        {
            table: {
                widths: [100, 350],
                body: [
                    [
                        {text: 'Asunto:', bold: true},
                        {text: 'Notificación de Suspensión de la Ayuda de Relocalización Transitoria - ID @identificador', bold: false, alignment: 'justify'}
                    ]
                ]
            },
            layout: 'noBorders'
        },
        {text: '\n\nCordial saludo,\n\n', fontSize: 12, alignment: 'left'},
        {text: 'Teniendo en cuenta que usted no ha efectuado la entrega del predio en alto riesgo y que la misma constituye un requisito indispensable para dar continuidad al pago de la ayuda temporal, la Dirección de Reasentamientos de la Caja de La Vivienda Popular, procederá a suspender la ayuda por concepto de Relocalización Transitoria, con fundamento en lo estipulado en el literal c) del Artículo 6 de la Resolución No.740 de 2015, donde se consagra que: \n\n', fontSize: 12, alignment: 'justify'},
        {text: [
                {text: '"ARTÍCULO 6.- Suspensión de la Ayuda de Relocalización Transitoria.', bold: true},
                {text: 'Habrá lugar a suspensión de la ayuda de relocalización transitoria cuando:\n\n'},
                {text: '(…)\n\n'},
                {text: 'c) Se compruebe que el predio en alto riesgo no ha sido entregado a la Caja de Vivienda Popular.\n\n', fontSize: 10},
                {text: '(…)”\n\n'}
            ], style: 'superMargin'
        },
        {text: 'En ese entendido, requerimos la entrega del predio declarado en alto riesgo, en un término de 30 días calendario, contados a partir de la notificación de la presente, con el ánimo de poder continuar prestando la ayuda por concepto de relocalización transitoria.\n\nNo obstante, usted cuenta con el término de diez (10) días hábiles a partir de la notificación de la presente para que se acerque personalmente a la Caja de Vivienda Popular y se manifieste sobre la mencionada situación y/o allegue la documentación necesaria que demuestre de forma inequívoca el cumplimiento de las obligaciones propias del programa de reasentamientos plasmadas en el Decreto No.255 de 2013 y la Resolución No.740 de 2015 y demás normativa aplicable, superando la causal de suspensión.\n\nFinalmente, en atención al inciso segundo del artículo 7 de la Resolución 740 de 2015, en caso de no presentarse manifestación alguna por parte de la familia, una vez se venza el término establecido, la ayuda será suspendida definitivamente y se entenderá que usted asume todos y cada uno de los gastos de relocalización transitoria. \n\n\nCordialmente,\n\n\n\n\n', fontSize: 12, alignment: 'justify'},
        {text: 'JUAN PABLO TOVAR OCHOA\nDirector Técnico de Reasentamientos\n\n\n', fontSize: 12, alignment: 'left', bold: true},
        {
            fontSize: 8,
            table: {
                widths: [50, 120, 120, 120],
                body: [
                    ['', 'Elaboró', 'Revisó', 'Aprobó'],
                    ['NOMBRE', '@suspension_usuario_elabora', 'Erika Paola Gallego Camargo', 'Juan Pablo Tovar Ochoa'],
                    ['CARGO', '@suspension_cargo_elabora', 'Contrato No. 119 de 2017', 'Director de Reasentamientos']
                ]
            }
        }
    ],
    styles: {
        sub1: {
            bold: true
        },
        superMargin: {
            margin: [20, 0, 0, 0],
            fontSize: 12,
            alignment: 'justify',
            italics: true
        }
    }

};