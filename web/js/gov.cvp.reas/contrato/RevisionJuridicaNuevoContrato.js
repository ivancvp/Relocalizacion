

/* global gantt, URL_IMPRIMIR */

function formularioRevisionJuridicaNuevoContrato(identificador, cordis, proceso_id, tipo_actividad_id, callback) {

    formularioRevisionJuridicaNuevoContratoBuscarDatosCargados(identificador, cordis, proceso_id, tipo_actividad_id, callback);

}

function formularioRevisionJuridicaNuevoContratoBuscarDatosCargados(identificador, cordis, proceso_id, tipo_actividad_id, callback) {
    $.ajax({
        type: "POST",
        url: "GestionConsultas",
        dataType: "text",
        async: false,
        data: {
            op: 'ConsultaRevisionJuridicaNuevoContrato',
            identificador: identificador,
            cordis: cordis,
            _a: Math.random()
        },
        success: function (response) {
            if (response)
            {
                var res = eval('(' + response + ')');

                if (res && res.total > 0) {
                    formularioRevisionJuridicaNuevoContratoAbrirFormulario(identificador, cordis, proceso_id, tipo_actividad_id, callback, res.data[0]);
                } else {
                    formularioRevisionJuridicaNuevoContratoAbrirFormulario(identificador, cordis, proceso_id, tipo_actividad_id, callback);
                }
            }
        }, error: function () {
            alert("No fué posible obtener los datos almacenados");
        }
    });
}

function formularioRevisionJuridicaNuevoContratoAbrirFormulario(identificador, cordis, proceso_id, tipo_actividad_id, callback, datos) {

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
            '    <input type="text" class="form-control" id="cordis" value="' + (cordis ? cordis : '') + '"readonly></input>' +
            '  </div>' +
            '  <div class="form-group  col-xs-12 col-sm-6">' +
            '    <label for="estadoSelector">Identificador:</label><div class="clearfix"></div>' +
            '    <input type="text" class="form-control" id="identificador" value="' + (identificador ? identificador : '') + '"readonly></input>' +
            '  </div>' +
            '  <hr class="col-xs-12 ">' +
            '  <div class="form-group col-xs-12 ">' +
            '    <label>' +
            '       <input data-target="#obsEntregaPAR" id="btnEntregaPAR" type="checkbox" ' + (datos && datos.revcon_entrega_par ? 'checked' : '') + '>' +
            '       Se entregó mediante acta el predio en alto riesgo.' +
            '    </label>' +
            '    <textarea placeholder="Observaciones" class="form-control " id="obsEntregaPAR" >' + (datos &&  datos.revcon_obs_entrega_par ? datos.revcon_obs_entrega_par : '') + '</textarea>' +
//            '    <textarea placeholder="Observaciones" class="form-control ' + (datos && datos.revcon_entrega_par ? 'collapse' : '') + '" id="obsEntregaPAR" >' + (datos && !datos.revcon_entrega_par && datos.revcon_obs_entrega_par ? datos.revcon_obs_entrega_par : '') + '</textarea>' +
            '  </div>' +
            '  <div class="form-group col-xs-12 ">' +
            '    <label>' +
            '       <input data-target="#obsContrato" id="btnContrato" type="checkbox" ' + (datos && datos.revcon_completitud_contrato ? 'checked' : '') + '>' +
            '       El contrato cumple en su diligenciamiento, información consignada y anexos aportados.' +
            '    </label>' +
            '    <textarea placeholder="Observaciones" class="form-control " id="obsContrato" >' + (datos && !datos.revcon_completitud_contrato && datos.revcon_obs_completitud_contrato ? datos.revcon_obs_completitud_contrato : '') + '</textarea>' +
//            '    <textarea placeholder="Observaciones" class="form-control ' + (datos && datos.revcon_completitud_contrato ? 'collapse' : '') + '" id="obsContrato" >' + (datos && !datos.revcon_completitud_contrato && datos.revcon_obs_completitud_contrato ? datos.revcon_obs_completitud_contrato : '') + '</textarea>' +
            '  </div>' +
            '  <div class="form-group col-xs-12 ">' +
            '    <label>' +
            '       <input data-target="#obsTitularidad" id="btnTitularidad" type="checkbox" ' + (datos && datos.revcon_titularidad ? 'checked' : '') + '>' +
            '       Se demuestra la titularidad del derecho de dominio del arrendador respecto del bien inmueble arrendado en el certificado de tradición y libertad.' +
            '    </label>' +
//            '    <textarea placeholder="Observaciones" class="form-control ' + (datos && datos.revcon_titularidad ? 'collapse' : '') + '" id="obsTitularidad" >' + (datos && !datos.revcon_titularidad && datos.revcon_obs_titularidad ? datos.revcon_obs_titularidad : '') + '</textarea>' +
            '    <textarea placeholder="Observaciones" class="form-control " id="obsTitularidad" >' + (datos &&  datos.revcon_obs_titularidad ? datos.revcon_obs_titularidad : '') + '</textarea>' +
            '  </div>' +
            '  <div class="form-group col-xs-12 ">' +
            '    <label>' +
            '       <input data-target="#obsCuentaBancaria" id="btnCuentaBancaria" type="checkbox" ' + (datos && datos.revcon_certificacion_bancaria ? 'checked' : '') + '>' +
            '       Certificación bancaria a nombre del propietario del bien inmueble arrendado.' +
            '    </label>' +
//            '    <textarea placeholder="Observaciones" class="form-control ' + (datos && datos.revcon_certificacion_bancaria ? 'collapse' : '') + '&& datos.rev_vur_sin_seleccion" id="obsCuentaBancaria" >' + (datos && !datos.revcon_certificacion_bancaria && datos.revcon_obs_certificacion_bancaria ? datos.revcon_obs_certificacion_bancaria : '') + '</textarea>' +
            '    <textarea placeholder="Observaciones" class="form-control" id="obsCuentaBancaria" >' + (datos &&  datos.revcon_obs_certificacion_bancaria ? datos.revcon_obs_certificacion_bancaria : '') + '</textarea>' +
            '  </div>' +
            '  <div class="form-group col-xs-12 ">' +
            '    <label>' +
            '       <input data-target="#obsVurSinSeleccion" id="btnVurSinSeleccion" type="checkbox" ' + (datos && datos.revcon_vur_sin_seleccion ? 'checked' : '') + '>' +
            '       Cuenta con asignación VUR y  ha efectuado selección de vivienda' +
            '    </label>' +
            '    <textarea placeholder="Observaciones" class="form-control " id="obsVurSinSeleccion" >' + (datos && datos.revcon_obs_vur_sin_seleccion ? datos.revcon_obs_vur_sin_seleccion : '') + '</textarea>' +
//            '    <textarea placeholder="Observaciones" class="form-control ' + (datos && datos.rev_vur_sin_seleccion ? 'collapse' : '') + '" id="obsVurSinSeleccion" >' + (datos && !datos.rev_vur_sin_seleccion && datos.rev_obs_vur_sin_seleccion ? datos.rev_obs_vur_sin_seleccion : '') + '</textarea>' +
            '  </div>' +
            '  <hr class="col-xs-12 ">' +
            '  <div class="form-group col-xs-12 col-sm-6 ' + (datos && datos.revcon_entrega_par && datos.revcon_completitud_contrato && datos.revcon_titularidad && datos.revcon_certificacion_bancaria && datos.revcon_vur_sin_seleccion  ? '' : 'collapse') + '" id="contenedor_fecha_inicio">' +
            '    <label for="fecha_inicio">Fecha inicio ayuda:</label><div class="clearfix"></div>' +
            '    <input type="text" class="form-control datepicker" id="fecha_inicio" value="' + (datos && datos.revcon_fecha_inicio_ayuda ? datos.revcon_fecha_inicio_ayuda : '') + '"></input>' +
            '  </div>' +
            '  <div class="form-group col-xs-12 col-sm-6 ' + (datos && datos.revcon_entrega_par && datos.revcon_completitud_contrato && datos.revcon_titularidad && datos.revcon_certificacion_bancaria  && datos.revcon_vur_sin_seleccion? '' : 'collapse') + '" id="contenedor_fecha_fin">' +
            '    <label for="fecha_fin">Fecha fin ayuda:</label><div class="clearfix"></div>' +
            '    <input type="text" class="form-control datepicker" id="fecha_fin" value="' + (datos && datos.revcon_fecha_fin_ayuda ? datos.revcon_fecha_fin_ayuda : '') + '"></input>' +
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

    $("#dynamicModal-" + modal_id).find('input[type=checkbox]').on('change', function (e) {
//        $($(this).data('target')).toggleClass('collapse', $(this).is(':checked'));

        var ok = true;
        $("#dynamicModal-" + modal_id).find('input[type=checkbox]').each(function () {
            if (!$(this).is(':checked')) {
                ok = false;
            }
        });

        $("#dynamicModal-" + modal_id).find("#contenedor_fecha_inicio").toggleClass('collapse', !ok);
        $("#dynamicModal-" + modal_id).find("#contenedor_fecha_fin").toggleClass('collapse', !ok);

    });


    //Guardar nuevo proceso
    $("#dynamicModal-" + modal_id).find("#btnGuardarRevisionJuridicaNuevoContrato").on('click', function (e) {

        $.ajax({
            type: "POST",
            url: "GestionDML",
            dataType: "text",
            async: false,
            data: {
                op: "InsertarRevisionJuridicaNuevoContrato",
                cordis: cordis,
                revcon_entrega_par: $("#dynamicModal-" + modal_id).find("#btnEntregaPAR").is(':checked'),
                revcon_completitud_contrato: $("#dynamicModal-" + modal_id).find("#btnContrato").is(':checked'),
                revcon_titularidad: $("#dynamicModal-" + modal_id).find("#btnTitularidad").is(':checked'),
                revcon_certificacion_bancaria: $("#dynamicModal-" + modal_id).find("#btnCuentaBancaria").is(':checked'),
                revcon_vur_sin_seleccion: $("#dynamicModal-" + modal_id).find("#btnVurSinSeleccion").is(':checked'),
//                revcon_obs_entrega_par: (!$("#dynamicModal-" + modal_id).find("#btnEntregaPAR").is(':checked') ? $("#dynamicModal-" + modal_id).find("#obsEntregaPAR").val():'') ,
                revcon_obs_entrega_par: $("#dynamicModal-" + modal_id).find("#obsEntregaPAR").val() ,
                revcon_obs_completitud_contrato: $("#dynamicModal-" + modal_id).find("#obsContrato").val(),
                revcon_obs_titularidad: $("#dynamicModal-" + modal_id).find("#obsTitularidad").val() ,
                revcon_obs_certificacion_bancaria: $("#dynamicModal-" + modal_id).find("#obsCuentaBancaria").val(),
                revcon_obs_vur_sin_seleccion:  $("#dynamicModal-" + modal_id).find("#obsVurSinSeleccion").val(),
                identificador: identificador,
                revcon_viable: $("#dynamicModal-" + modal_id).find("#btnEntregaPAR").is(':checked')
                        && $("#dynamicModal-" + modal_id).find("#btnContrato").is(':checked')
                        && $("#dynamicModal-" + modal_id).find("#btnTitularidad").is(':checked')
                        && $("#dynamicModal-" + modal_id).find("#btnVurSinSeleccion").is(':checked')
                        && $("#dynamicModal-" + modal_id).find("#btnCuentaBancaria").is(':checked'),
                revcon_fecha_inicio_ayuda: ($("#dynamicModal-" + modal_id).find("#fecha_inicio").val() ? $("#dynamicModal-" + modal_id).find("#fecha_inicio").val() : ''),
                revcon_fecha_fin_ayuda: ($("#dynamicModal-" + modal_id).find("#fecha_fin").val() ? $("#dynamicModal-" + modal_id).find("#fecha_fin").val() : ''),
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
}


function formularioRevisionJuridicaNuevoContratoImprimirConcepto(identificador, cordis) {
    var data = {
        identificador: identificador,
        cordis: cordis
    };
    $.ajax({
        type: "POST",
        url: URL_IMPRIMIR + "pdf/imprimir_concepto_revalidacion.php",
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