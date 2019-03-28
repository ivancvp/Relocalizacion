

function GestionarContratos(id_solicitud, proceso, tipo_actividad, callback) {
    var modal_id = Math.random().toString(36).substring(7);

    var html = '<div id="dynamicModal-' + modal_id + '" style=" width: 100%;" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="confirm-modal" aria-hidden="true">';
    html += '<div class="modal-dialog modal-lg" style=" width: 95%;" >';
    html += '<div class="modal-content">';
    html += '<div class="modal-header">';
    html += ' <a class="close" data-dismiss="modal">×</a>';
    html += ' <h4>Contratos</h4>';
    html += '</div>';
    html += '<div class="modal-body">';
    html += ' <div  id="panel-operaciones">' +
            ' </div>';
    html += '</div>';
    html += '<div class="modal-footer">';
    html += '  <span class="btn btn-default" data-dismiss="modal">Cerrar</span>';
    html += ' </div>';  // footer
    html += '</div>';  // content
    html += '</div>';  // dialog
    html += '</div>';  // modalWindow
    $('body').append(html);
    $("#dynamicModal-" + modal_id).modal();
    $("#dynamicModal-" + modal_id).modal('show');

    $("#dynamicModal-" + modal_id).on('hidden.bs.modal', function (e) {
        $(this).remove();
        callback();
    });

    $("#dynamicModal-" + modal_id).find('#panel-operaciones').iniciarMenuContratos({
        identificador: id_solicitud,
        contratoCreado: function (e) {

            var datos = {
                op: 'ActualizarTareaPuedeCompletarse',
                proceso_id: proceso,
                tipo_actividad_id: tipo_actividad
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
                            $("#dynamicModal-" + modal_id).find('#btnAceptar').removeClass("disabled");
                        } else {
                            alert("No fué posible guardar el contrato");
                        }
                    }
                }, error: function () {
                    alert("No fué posible guardar el contrato");
                }
            });

        }
    });
}

(function ($) {
    $.fn.iniciarMenuContratos = function (opciones) {
        var contratoCreado = false;

        function crarNuevoContrato(contenedor, opciones) {
            var modal_id = Math.random().toString(36).substring(7);

            var html = '<div id="dynamicModal-' + modal_id + '" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="confirm-modal" aria-hidden="true">';
            html += '<div class="modal-dialog">';
            html += '<div class="modal-content">';
            html += '<div class="modal-header">';
            html += '<a class="close" data-dismiss="modal">×</a>';
            html += '<h4>' + 'Nuevo contrato identificador: ' + opciones.identificador + '</h4>';
            html += '</div>';
            html += '<div class="modal-body">';
            html += '<p>';

            html +=
                    '<form class="form" role="form" data-toggle="validator">' +
                    '  <p><h4>Contrato</h4></p>' +
                    '  <div class="form-group">' +
                    '    <label class="control-label" for="cont_fecha_inicio">Fecha de inicio</label>' +
                    '    <input class="form-control datepicker" id="cont_fecha_inicio" placeholder="dd/mm/yyyy" required value="">' +
                    '  </div>' +
                    '  <div class="form-group">' +
                    '    <label class="control-label" for="cont_fecha_fin">Fecha final</label>' +
                    '    <input class="form-control datepicker" id="cont_fecha_fin" placeholder="dd/mm/yyyy" required value="" >' +
                    '  </div>' +
                    '  <hr class="separator">' +
                    '  <div class="form-group">' +
                    '    <label for="valor_ayuda_mes">Valor Ayuda:</label>' +
                    '    <input type="number" class="form-control" id="valor_ayuda_mes" required value="" >' +
                    '  </div>' +
                    '  <hr class="separator">' +
                    '  <div class="form-group">' +
                    '    <label for="titular_nombre">Nombre del titular:</label>' +
                    '    <input type="text" class="form-control" id="titular_nombre" required value="" >' +
                    '  </div>' +
                    '  <div class="form-group">' +
                    '    <label for="titular_cedula">Cedula del titular:</label>' +
                    '    <input type="text" class="form-control" id="titular_cedula" required value="" >' +
                    '  </div>' +
                    '  <div class="form-group">' +
                    '    <label for="bancoSelector">Banco:</label><div class="clearfix"></div>' +
                    '    <select class="form-control" id="bancoSelector" required></select>' +
                    '  </div>' +
                    '  <div class="form-group">' +
                    '    <label for="cuenta_tipo">Tipo de cuenta:</label>' +
                    '    <input type="text" class="form-control" id="cuenta_tipo" required value="" >' +
                    '  </div>' +
                    '  <div class="form-group">' +
                    '    <label for="cuenta_numero">Número de cuenta:</label>' +
                    '    <input type="text" class="form-control" id="cuenta_numero" required value="" >' +
                    '  </div>' +
                    '  <hr class="separator">' +
                    '  <div class="form-group">' +
                    '    <label for="localidadSelector">Localidad del predio en arriendo:</label>' +
                    '    <select class="form-control" id="localidadSelector" required></select>' +
                    '  </div>' +
                    '  <div class="form-group">' +
                    '    <label for="supzSelector">UPZ:</label>' +
                    '    <select class="form-control" id="upzSelector" required></select>' +
                    '  </div>' +
                    '  <div class="form-group">' +
                    '    <label for="barrio">Barrio:</label>' +
                    '    <input type="text" class="form-control" id="barrio" required value="" >' +
                    '  </div>' +
                    '  <div class="form-group">' +
                    '    <label for="direccion">Dirección:</label>' +
                    '    <input type="text" class="form-control" id="direccion" required value="" >' +
                    '  </div>' +
                    '  <div class="form-group">' +
                    '    <label for="telefono">Teléfono:</label>' +
                    '    <input type="text" class="form-control" id="telefono" required value="" >' +
                    '  </div>' +
                    '  <div class="form-group">' +
                    '    <label for="matricula">Matrícula Inmobiliaria:</label>' +
                    '    <input type="text" class="form-control" id="matricula" required value="" >' +
                    '  </div>' +
                    '  <div class="form-group">' +
                    '    <label for="chip">CHIP:</label>' +
                    '    <input type="text" class="form-control" id="chip" required value="" >' +
                    '  </div>' +
                    '</form>';

            html += '</div>';
            html += '<div class="modal-footer">';
            html += '<span class="btn btn-primary" id="btnGuardarNuevoMemorando">Guardar</span>';
            html += '<span class="btn btn-default" data-dismiss="modal">Cerrar</span>';
            html += '</div>';  // content
            html += '</div>';  // dialog
            html += '</div>';  // footer
            html += '</div>';  // modalWindow
            $('body').append(html);
            $("#dynamicModal-" + modal_id).modal();
            $("#dynamicModal-" + modal_id).modal('show');

            $("#dynamicModal-" + modal_id).on('hidden.bs.modal', function (e) {
                actualizarListadoContratos(contenedor, opciones);

                $(this).remove();
            });


            $("#dynamicModal-" + modal_id).find("input.datepicker").datepicker({
                dateFormat: "dd/mm/yy"/*,
                 minDate: resolucion.start_date,
                 maxDate: resolucion.end_date*/
            });


            FormularioRevisionResolucionesNuevoContratoCargarBancos(opciones.identificador, $("#dynamicModal-" + modal_id).find("#bancoSelector"), 'consulta_bancos');

            FormularioRevisionResolucionesCargarDominios(opciones.identificador, $("#dynamicModal-" + modal_id).find("#localidadSelector"), 'consulta_localidades');

            $("#dynamicModal-" + modal_id).find("#localidadSelector").on('change', function (e) {
                $("#dynamicModal-" + modal_id).find("#upzSelector").find("option").empty();
                if ($(e.currentTarget).val()) {
                    FormularioRevisionResolucionesCargarDominios(opciones.identificador, $("#dynamicModal-" + modal_id).find("#upzSelector"), 'consulta_upz_x_localidad', $(e.currentTarget).val());
                }
            });

            $("#dynamicModal-" + modal_id).find("#btnGuardarNuevoMemorando").on('click', function (e) {

                var alertas = [];

                if (!$("#dynamicModal-" + modal_id).find("#cont_fecha_inicio").val()) {
                    alertas.push('Debe seleccionar la fecha inicial');
                }
                if (!$("#dynamicModal-" + modal_id).find("#cont_fecha_fin").val()) {
                    alertas.push('Debe seleccionar la fecha final');
                }
                if (!$("#dynamicModal-" + modal_id).find("#valor_ayuda_mes").val()) {
                    alertas.push('Debe seleccionar el valor de la ayuda');
                }
                if (!$("#dynamicModal-" + modal_id).find("#titular_nombre").val()) {
                    alertas.push('Debe seleccionar el nombre del titular');
                }
                if (!$("#dynamicModal-" + modal_id).find("#titular_cedula").val()) {
                    alertas.push('Debe seleccionar la cédula del titular');
                }
                if (!$("#dynamicModal-" + modal_id).find("#bancoSelector").val()) {
                    alertas.push('Debe seleccionar el banco');
                }
                if (!$("#dynamicModal-" + modal_id).find("#cuenta_tipo").val()) {
                    alertas.push('Debe seleccionar el tipo de cuenta');
                }
                if (!$("#dynamicModal-" + modal_id).find("#cuenta_numero").val()) {
                    alertas.push('Debe seleccionar el número de cuenta');
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
                    op: "InsertarNuevoContrato",
                    identificador: opciones.identificador,
                    cont_fecha_inicio: $("#dynamicModal-" + modal_id).find("#cont_fecha_inicio").val(),
                    cont_fecha_fin: $("#dynamicModal-" + modal_id).find("#cont_fecha_fin").val(),
                    valor_ayuda_mes: $("#dynamicModal-" + modal_id).find("#valor_ayuda_mes").val(),
                    titular_nombre: $("#dynamicModal-" + modal_id).find("#titular_nombre").val(),
                    titular_cedula: $("#dynamicModal-" + modal_id).find("#titular_cedula").val(),
                    cuenta_banco: $("#dynamicModal-" + modal_id).find("#bancoSelector").val(),
                    cuenta_tipo: $("#dynamicModal-" + modal_id).find("#cuenta_tipo").val(),
                    cuenta_numero: $("#dynamicModal-" + modal_id).find("#cuenta_numero").val(),
                    cont_localidad_predio: $("#dynamicModal-" + modal_id).find("#localidadSelector").val() ? $("#dynamicModal-" + modal_id).find("#localidadSelector").val() : '',
                    cont_upz_predio: $("#dynamicModal-" + modal_id).find("#upzSelector").val() ? $("#dynamicModal-" + modal_id).find("#upzSelector").val() : '',
                    cont_barrio_predio: $("#dynamicModal-" + modal_id).find("#barrio").val() ? $("#dynamicModal-" + modal_id).find("#barrio").val() : '',
                    cont_direccion_predio: $("#dynamicModal-" + modal_id).find("#direccion").val() ? $("#dynamicModal-" + modal_id).find("#direccion").val() : '',
                    cont_matricula_predio: $("#dynamicModal-" + modal_id).find("#matricula").val() ? $("#dynamicModal-" + modal_id).find("#matricula").val() : '',
                    cont_chip_predio: $("#dynamicModal-" + modal_id).find("#chip").val() ? $("#dynamicModal-" + modal_id).find("#chip").val() : '',
                    telefono: $("#dynamicModal-" + modal_id).find("#telefono").val() ? $("#dynamicModal-" + modal_id).find("#telefono").val() : ''
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
                                contratoCreado = true;
                                $("#dynamicModal-" + modal_id).modal('hide');

                                opciones.contratoCreado(contratoCreado);
                            } else {
                                alert("No fué posible guardar el contrato");
                            }
                        }
                    }, error: function () {
                        alert("No fué posible guardar el contrato");
                    }
                });

            });

        }

        function actualizarListadoContratos(contenedor, opciones) {
            $(contenedor).empty();

            var btnNuevocontrato = $('<a class="btn btn-default" ><span class="glyphicon glyphicon-plus-sign"></span> Añadir contrato</a>');
            $(btnNuevocontrato).on("click", function (e) {
                crarNuevoContrato(contenedor, opciones);
            });

            $(contenedor).append(btnNuevocontrato);

            var formulario = $(contenedor).append("<table/>");
            formulario.append('<div style="width:100%; overflow:auto;"><table style="width:90%;" id="datos_beneficiario" class="stripe hover">'
                    + '<thead><tr><th>Contrato</th> <th>Inicio Contrato</th> <th>Fin Contrato</th> <th>Valor ayuda</th> <th>vigencia contrato (dias)</th> <th>vigencia contrato (meses)</th> <th>Total a pagar</th> <th>Titular</th> <th>Cedula Titular</th> <th>Banco</th> <th>Cuenta No</th> <th>Tipo Cuenta</th> '
                    + ' <th>Teléfono del Beneficiario</th> '
                    + ' <th>Dirección del predio</th> '
                    + ' <th>Barrio</th> '
                    + ' <th>Matricula Inmobiliaria</th> '
                    + ' <th>CHIP</th> '
                    + '</tr></thead>'
                    + '<tbody>'
                    + '</tbody>'
                    + '</table></div>'
                    );

            $.ajax({
                type: "POST",
                url: "GestionConsultas",
                dataType: "text",
                async: false,
                data: {op: "consulta_contratos_por_identificador", IDENTIFICADOR: opciones.identificador},
                success: function (response) {
                    if (response)
                    {
                        var res = eval('(' + response + ')');
                        if (res && res.total > 0) {
                            if (formulario.find("#datos_beneficiario") && formulario.find("#datos_beneficiario")[0] && $.fn.DataTable.fnIsDataTable(formulario.find("#datos_beneficiario")[0])) {
                                formulario.find("#datos_beneficiario").dataTable().fnDestroy();
                            }

                            formulario.find("#datos_beneficiario tbody").empty();

                            for (var i = 0; i < res.data.length; i++) {
                                formulario.find("#datos_beneficiario tbody").append(
                                        ' <tr data-id="' + res.data[i]['CLAVEUNIDA'] + '">'
                                        + '  <td><span >' + res.data[i]['CONSECONTRATO'] + '</span></td>'
                                        + '  <td><span style="cursor: pointer;" class="editable datepicker" data-name="cont_fecha_inicio" data-tipo="\'">' + res.data[i]['INICIO VALIDO'] + '</span></td>'
                                        + '  <td><span style="cursor: pointer;" class="editable datepicker" data-name="cont_fecha_fin" data-tipo="\'">' + res.data[i]['FIN VALIDO'] + '</span></td>'
                                        + '  <td><span style="opacity: 0.5;" data-name="valor_ayuda_mes" data-tipo="">' + res.data[i]['valor_ayuda_mes'] + '</span></td>'
                                        + '  <td><span style="opacity: 0.5;" data-name="dias_x_pagar" data-tipo="">' + res.data[i]['dias_x_pagar'] + '</span></td>'
                                        + '  <td><span style="opacity: 0.5;" data-name="meses_x_pagar" data-tipo="">' + res.data[i]['meses_x_pagar'] + '</span></td>'
                                        + '  <td><span style="opacity: 0.5;" data-name="total_pagar" data-tipo="">' + res.data[i]['total_pagar'] + '</span></td>'
                                        + '  <td><span style="cursor: pointer;" class="editable text" data-name="titular_nombre" data-tipo="\'">' + res.data[i]['titular_nombre'] + '</span></td>'
                                        + '  <td><span style="cursor: pointer;" class="editable text" data-name="titular_cedula" data-tipo="">' + res.data[i]['titular_cedula'] + '</span></td>'
                                        + '  <td><span style="cursor: pointer;" class="editable bancos" data-name="cuenta_banco" data-tipo="">' + res.data[i]['cuenta_banco'] + '</span></td>'
                                        + '  <td><span style="cursor: pointer;" class="editable text" data-name="cuenta_numero" data-tipo="\'">' + res.data[i]['cuenta_numero'] + '</span></td>'
                                        + '  <td><span style="cursor: pointer;" class="editable text" data-name="cuenta_tipo" data-tipo="\'">' + res.data[i]['cuenta_tipo'] + '</span></td>'
                                        + '  <td><span style="cursor: pointer;" class="editable text" data-name="beneficiario_telefono" data-tipo="\'">' + res.data[i]['beneficiario_telefono'] + '</span></td>'
                                        + '  <td><span style="cursor: pointer;" class="editable text" data-name="cont_direccion_predio" data-tipo="\'">' + res.data[i]['cont_direccion_predio'] + '</span></td>'
                                        + '  <td><span style="cursor: pointer;" class="editable text" data-name="cont_barrio_predio" data-tipo="\'">' + res.data[i]['cont_barrio_predio'] + '</span></td>'
                                        + '  <td><span style="cursor: pointer;" class="editable text" data-name="cont_matricula_predio" data-tipo="\'">' + res.data[i]['cont_matricula_predio'] + '</span></td>'
                                        + '  <td><span style="cursor: pointer;" class="editable text" data-name="cont_chip_predio" data-tipo="\'">' + res.data[i]['cont_chip_predio'] + '</span></td>'
                                        + ' </tr>'
                                        );
                            }

                            var oTable = formulario.find("#datos_beneficiario").dataTable({
                                "oLanguage": {
                                    "sLengthMenu": "Mostrar _MENU_ resultados por página",
                                    "sZeroRecords": "No hay resultados",
                                    "sInfo": "Viendo _START_ a _END_, de _TOTAL_ resultados",
                                    "sInfoEmpty": "Viendo 0 a 0, de 0 resultados",
                                    "sInfoFiltered": "(Filtrado de _MAX_ resultados totales)"
                                },
                                "bLengthChange": false,
                                "paging": false,
                                "bFilter": false,
                                "bSort": false,
                                "bPaginate": false,
                                //"sScrollX": "550px",
                                "fnDrawCallback": function (draw) {
                                    var guardarCont = JSON.parse(jQuery('#scriptFormularioGraficoResolucionesMemorandos').html())['editarContrato'] ? true : false;
                                    if (guardarCont) {
                                        try {
                                            formulario.find("#datos_beneficiario tbody td .editable.text")
                                                    .editable('GestionDML', {
                                                        type: 'text',
                                                        width: 200,
                                                        "callback": function (sValue, y) {
                                                            // Redraw the table from the new data on the server /
                                                            var r = eval('(' + sValue + ')');
                                                            if (r && r.data && r.data.length > 0) {
                                                                $(this).text(r.data[0][$(this).data().name]);
                                                            }

                                                            oTable.fnDraw();


                                                        },
                                                        "submitdata": function (value, settings) {
                                                            return {
                                                                "claveunida": $($(this).parents('tr')[0]).data('id'),
                                                                "nombre": $(this).data().name,
                                                                "tipo": $(this).data().tipo,
                                                                "op": "ActualizarDatosCuentas"
                                                            };
                                                        },
                                                        "height": "14px"
                                                    });

                                            formulario.find("#datos_beneficiario tbody td .editable.datepicker")
                                                    .editable('GestionDML', {
                                                        tooltip: "Doble click para editar",
                                                        //event: "dblclick",
                                                        type: 'datepicker',
                                                        submit: 'Guardar',
                                                        width: 150,
                                                        "callback": function (sValue, y) {
                                                            // Redraw the table from the new data on the server /
                                                            var r = eval('(' + sValue + ')');
                                                            if (r && r.data && r.data.length > 0) {

                                                                $(this).text((r.data[0][$(this).data().name]).replace(/(\d{4})\-(\d{2})\-(\d{2})/, '$3/$2/$1'));

                                                                var objeto = {
                                                                    op: "CalcularActualizacionValoresCuentas",
                                                                    CLAVEUNIDA: $($(this).parents('tr')[0]).data('id')
                                                                };

                                                                $.ajax({
                                                                    type: "POST",
                                                                    url: "GestionConsultas",
                                                                    dataType: "text",
                                                                    async: false,
                                                                    context: this,
                                                                    data: objeto,
                                                                    success: function (response) {
                                                                        if (response)
                                                                        {
                                                                            var resul = eval('(' + response + ')');
                                                                            if (resul && resul.total > 0) {
                                                                                for (var prop in resul.data[0]) {
                                                                                    $($(this).parents('tr')[0]).find("[data-name='" + prop + "']").text(resul.data[0][prop]);
                                                                                    $($(this).parents('tr')[0]).find("[data-name='" + prop + "']").text();
                                                                                }
                                                                            }
                                                                        }
                                                                    }, error: function () {
                                                                        //$(".details-" + rowId).find("#" + contenedor_id + " form fieldset #datos_beneficiario").find("td").prop('disabled',false);
                                                                        alert("No fué posible obtener guardar los cambios");
                                                                    }
                                                                });
                                                            }
                                                            //oTable.fnDraw();
                                                        },
                                                        "submitdata": function (value, settings) {
                                                            return {
                                                                "claveunida": $($(this).parents('tr')[0]).data('id'),
                                                                "nombre": $(this).data().name,
                                                                "tipo": $(this).data().tipo,
                                                                "op": "ActualizarFechasCuentas"
                                                            };
                                                        },
                                                        "height": "14px"
                                                    });

                                            var bancos = {"8": "ABN AMRO Bank", "58": "Ahorramas", "505": "Alianza Fiduciaria", "5": "Bancafe", "40": "Banco Agrario", "48": "Banco Aliadas", "25": "Banco Central Hipotecario", "14": "Banco Crédito", "1": "Banco de Bogotá", "0": "Banco de la República", "23": "Banco de Occidente", "20": "Banco del Estado", "28": "Banco Mercantil", "26": "Banco of America", "2": "Banco Popular", "6": "Banco Santander", "12": "Banco Sudameris", "34": "Banco Superior", "29": "Banco Tequendama", "21": "Banco Uconal", "22": "Banco Unión Colombiano", "30": "Bancoop", "10": "Banistmo (HSBC)", "37": "Bank Boston S.A.", "32": "Caja Social", "9": "Citibank", "57": "Colmena", "7": "Conavi-Bancolombia", "810": "Coomeva", "51": "Davivienda", "13": "Granahorrar-BBVA", "35": "Interbanco", "52": "Las Villas", "36": "Megabanco", "19": "Red Multibanca Colpatria", "502": "Skandia", "24": "Standart Charted", "419": "Ya Servicios Financieros"};
                                            formulario.find("#datos_beneficiario tbody td .editable.bancos")
                                                    .editable('GestionDML', {
                                                        tooltip: "Doble click para editar",
                                                        //event: "dblclick",
                                                        data: '{"8":"ABN AMRO Bank", "58":"Ahorramas", "505":"Alianza Fiduciaria", "5":"Bancafe", "40":"Banco Agrario", "48":"Banco Aliadas", "25":"Banco Central Hipotecario", "14":"Banco Crédito", "1":"Banco de Bogotá", "0":"Banco de la República", "23":"Banco de Occidente", "20":"Banco del Estado", "28":"Banco Mercantil", "26":"Banco of America", "2":"Banco Popular", "6":"Banco Santander", "12":"Banco Sudameris", "34":"Banco Superior", "29":"Banco Tequendama", "21":"Banco Uconal", "22":"Banco Unión Colombiano", "30":"Bancoop", "10":"Banistmo (HSBC)", "37":"Bank Boston S.A.", "32":"Caja Social", "9":"Citibank", "57":"Colmena", "7":"Conavi-Bancolombia", "810":"Coomeva", "51":"Davivienda", "13":"Granahorrar-BBVA", "35":"Interbanco", "52":"Las Villas", "36":"Megabanco", "19":"Red Multibanca Colpatria", "502":"Skandia", "24":"Standart Charted", "419":"Ya Servicios Financieros"}',
                                                        type: 'select',
                                                        submit: 'Guardar',
                                                        width: 150,
                                                        "callback": function (sValue, y) {
                                                            // Redraw the table from the new data on the server /
                                                            var r = eval('(' + sValue + ')');
                                                            if (r && r.data && r.data.length > 0) {
                                                                $(this).text(bancos[(r.data[0][$(this).data().name])]);
                                                            }
                                                            oTable.fnDraw();
                                                        },
                                                        "submitdata": function (value, settings) {
                                                            return {
                                                                "claveunida": $($(this).parents('tr')[0]).data('id'),
                                                                "nombre": $(this).data().name,
                                                                "tipo": $(this).data().tipo,
                                                                "op": "ActualizarDatosCuentas"
                                                            };
                                                        },
                                                        "height": "14px"
                                                    });
                                        } catch (e) {
                                            console.log("No se ha configurado el editor");
                                        }
                                    }
                                }
                            });
                        }
                    }
                }, error: function () {
                    alert("No fué posible obtener las alternativas");
                }
            });
        }

        actualizarListadoContratos(this, opciones);
        return this;
    };
}(jQuery));