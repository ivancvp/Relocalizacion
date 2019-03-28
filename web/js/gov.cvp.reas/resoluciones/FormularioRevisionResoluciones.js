$.editable.addInputType('datepicker', {
    element: function (settings, original) {
        var input = $('<input>');
        if (settings.width != 'none') {
            input.width(settings.width);
        }
        if (settings.height != 'none') {
            input.height(settings.height);
        }
        input.attr('autocomplete', 'off');
        $(this).append(input);
        return(input);
    },
    plugin: function (settings, original) {
        /* Workaround for missing parentNode in IE */
        var form = this;
        settings.onblur = 'ignore';
        $(this).find('input').datepicker({
            dateFormat: "dd/mm/yy"
        }).bind('click', function () {
            $(this).datepicker('show');
            return false;
        }).bind('dateSelected', function (e, selectedDate, $td) {
            $(form).submit();
        });
    }
});


function RevisionResoluciones(id_solicitud, rowId, contenedor_id) {
    //prevenirCierre = true;
    //ocultarPaneles();
    if (!$(".details-" + rowId).find("#" + contenedor_id).is(":visible")) {
        var resultado;
        $.ajax({
            type: "POST",
            url: "GestionConsultas",
            dataType: "text",
            async: false,
            data: {op: "consulta_datos_resolucion_marzo", IDENTIFICADOR: id_solicitud},
            success: function (response) {
                if (response)
                {
                    var res = eval('(' + response + ')');
                    if (res && res.total > 0) {
                        resultado = res.data[0];
                    }
                }
            }, error: function () {
                alert("No fué posible obtener las alternativas");
            }
        });

        $(".details-" + rowId).find("#" + contenedor_id).show();

        $(".details-" + rowId).find("#" + contenedor_id).empty();
        $(".details-" + rowId).find("#" + contenedor_id).append('<form class="forms ui-tabs-panel ui-widget-content ui-corner-all" autocomplete="on" style="padding-bottom: 20px; padding-right: 15px; border-width: 0;"><fieldset/></form>');
        $(".details-" + rowId).find("#" + contenedor_id + " form fieldset").append('<table/>');
        /*
         $(".details-" + rowId).find("#" + contenedor_id + " form fieldset table").append('<tr><td><label>Estado de la solicitud:</label></td><td> <select id="estados" class="required"><option value="" disabled selected>Seleccione</option></select></td></tr>');
         $(".details-" + rowId).find("#" + contenedor_id + " form fieldset table").append('<tr><td><label>Novedades:</label></td><td> <select id="novedades" class="required"><option value="" disabled selected>Seleccione</option><option value="null">Ninguna</option></select></td></tr>');
         $(".details-" + rowId).find("#" + contenedor_id + " form fieldset table").append('<tr><td><label>Comentarios/Observaciones:</label></td><td><textarea rows="4" cols="30" id="observacion_estado" >' + observacion + '</textarea></td></tr>');
         */
        var formulario = $(".details-" + rowId).find("#" + contenedor_id + " form fieldset table");

        /*
         formulario.append('<tr><td colspan="2"><label><h2>Datos del Evacuado</h2></label></td></tr>');
         formulario.append('<tr><td><label>Nombre del evacuado:</label></td><td> <input id="NOMBRE-EVACUADO" class="required" value="' + resultado["NOMBRE EVACUADO"] + '"></td></tr>');
         formulario.append('<tr><td><label>Cédula del evacuado:</label></td><td> <input id="CEDULA-EVACUADO" class="required" type="number" value="' + resultado["CEDULA EVACUADO"] + '"></td></tr>');
         formulario.append('<tr class="hidden"><td colspan="2"><label><h2>Asignación</h2></label></td></tr>');
         formulario.append('<tr class="hidden"><td><label>Inicio:</label></td><td> <input id="INICIO" class="datepicker required" value="' + resultado["INICIO"] + '"></td></tr>');
         formulario.append('<tr class="hidden"><td><label>Fin:</label></td><td> <input id="FIN" class="datepicker required" value="' + resultado["FIN"] + '"></td></tr>');
         formulario.append('<tr class="hidden"><td><label>Duración de en meses:</label></td><td> <input readonly id="NUM-MESES" class="required" type="number" value="' + resultado["NUM MESES"] + '"></td></tr>');
         formulario.append('<tr class="hidden"><td><label>VALOR AYUDA MES:</label></td><td> <input id="VALOR-AYUDA-MES" type="number" class="required" value="' + resultado["VALOR AYUDA MES"] + '"></td></tr>');
         formulario.append('<tr class="hidden"><td><label>valor total:</label></td><td> <input readonly id="TOTAL" class="required" type="number" value="' + resultado["TOTAL"] + '"></td></tr>');
         formulario.append('<tr class="hidden"><td><label>Asignación Total (valor contratos + un mes):</label></td><td> <input readonly id="TOT-MAS-UN-MES" type="number" class="required" value="' + resultado["TOTAL MAS UN MES"] + '"></td></tr>');
         */

        formulario.append('<tr><td colspan="2"><label><h3>Resumen de contratos</h3></label></td></tr>');
        formulario.append('<tr><td colspan="2" ><div style="width:1100px; overflow:auto;"><table width="200px"  style="width:550px;" id="datos_beneficiario" class="stripe hover">'
                + '<thead><tr><th>Contrato</th> <th>Inicio Contrato</th> <th>Fin Contrato</th> <th>Valor ayuda</th> <th>vigencia contrato (dias)</th> <th>vigencia contrato (meses)</th> <th>Total a pagar</th> <th>Titular</th> <th>Cedula Titular</th> <th>Banco</th> <th>Cuenta No</th> <th>Tipo Cuenta</th> '
                + ' <th>Teléfono del Beneficiario</th> '
                + ' <th>Dirección del predio</th> '
                + ' <th>Localidad</th> '
                + ' <th>Barrio</th> '
                + ' <th>Matricula Inmobiliaria</th> '
                + ' <th>CHIP</th> '
                + '</tr></thead>'
                + '<tbody>'
                + '</tbody>'
                + '</table></tr></td></tr>'
                );

        FormularioRevisionResolucionesActualizarListadoContratos(formulario, id_solicitud);
        var guardarCont = JSON.parse(jQuery('#scriptFormularioGraficoResolucionesMemorandos').html())['crearContrato'] ? '<tr><td><a class="btn btn-default" onclick="FormularioRevisionResolucionesNuevoContrato(\'' + id_solicitud + '\', \'' + rowId + '\', \'' + contenedor_id + '\')"><span class="glyphicon glyphicon-plus-sign"></span> Añadir contrato</a></td></tr>' : '';
        formulario.append(guardarCont);
//        formulario.append('<tr><td><a class="btn btn-default" onclick="FormularioRevisionResolucionesNuevoContrato(\'' + id_solicitud + '\', \'' + rowId + '\', \'' + contenedor_id + '\')"><span class="glyphicon glyphicon-plus-sign"></span> Añadir contrato</a></td></tr>');


        formulario.append('<tr class="hidden"><td colspan="2"><label><h2>Estado de la revision y datos del profesional que revisa</h2></label></td></tr>');
        formulario.append('<tr class="hidden"><td style="width:250px;"><label>Estado:</label></td><td> <select id="resolucion_estado" required> '
                + '</select> </td></tr>');

        formulario.find("#resolucion_estado").empty();
        formulario.find("#resolucion_estado").append('<option value="" disabled selected hidden>Seleccione...</option> ');
        for (var estado in lista_estados) {
            formulario.find("#resolucion_estado").append('<option value="' + lista_estados[estado] + '" ' + (resultado["resolucion_estado"] === lista_estados[estado] ? 'selected' : '') + '>' + lista_estados[estado] + '</option>');
        }


        //formulario.append('<tr class="hidden"><td><label>Observaciones / comentarios:</label></td><td> <textarea rows="4" cols="30" id="observacion" >' + resultado["observacion"] + '</textarea></td></tr>');

        formulario.append('<tr class="hidden"><td colspan="2"><label><h4>Componente jurídico</h4></label></td></tr>');
        formulario.append('<tr class="hidden"><td><label>Proyectado por:</label></td><td> <select id="resolucion_marzo_upd_usuario" required> <option value="" disabled selected hidden>Seleccione...</option> '
                + ' <option value="Alexander Roncancio" ' + (resultado["resolucion_marzo_upd_usuario"] === 'Alexander Roncancio' ? 'selected' : '') + '>Alexander Roncancio</option> '
                + ' <option value="Angélica Acosta" ' + (resultado["resolucion_marzo_upd_usuario"] === 'Angélica Acosta' ? 'selected' : '') + '>Angélica Acosta</option> '
                + ' <option value="Miguel Diaz" ' + (resultado["resolucion_marzo_upd_usuario"] === 'Miguel Diaz' ? 'selected' : '') + '>Miguel Diaz</option> '
                + ' <option value="Stephany Consuegra" ' + (resultado["resolucion_marzo_upd_usuario"] === 'Stephany Consuegra' ? 'selected' : '') + '>Stephany Consuegra</option> '
                + ' <option value="Johanna Alejandra Perdomo" ' + (resultado["resolucion_marzo_upd_usuario"] === 'Johanna Alejandra Perdomo' ? 'selected' : '') + '>Johanna Alejandra Perdomo</option> '
                + ' <option value="Johanna Alejandra Fernandez" ' + (resultado["resolucion_marzo_upd_usuario"] === 'Johanna Alejandra Fernandez' ? 'selected' : '') + '>Johanna Alejandra Fernandez</option> '
                + ' <option value="Sayudy Cortes" ' + (resultado["resolucion_marzo_upd_usuario"] === 'Sayudy Cortes' ? 'selected' : '') + '>Sayudy Cortes</option> '
                + ' <option value="Johana Solorzano" ' + (resultado["resolucion_marzo_upd_usuario"] === 'Johana Solorzano' ? 'selected' : '') + '>Johana Solorzano</option> '
                + ' <option value="Yael Fonseca" ' + (resultado["resolucion_marzo_upd_usuario"] === 'Yael Fonseca' ? 'selected' : '') + '>Yael Fonseca</option> '
                + ' <option value="Cristian Jahir Torres" ' + (resultado["resolucion_marzo_upd_usuario"] === 'Cristian Jahir Torres' ? 'selected' : '') + '>Cristian Jahir Torres</option> '
                + ' <option value="Maria Fernanda Rozo Malaver" ' + (resultado["resolucion_marzo_upd_usuario"] === 'Maria Fernanda Rozo Malaver' ? 'selected' : '') + '>Maria Fernanda Rozo Malaver</option> '
                + ' <option value="Diana Milena Sanchez Vera" ' + (resultado["resolucion_marzo_upd_usuario"] === 'Diana Milena Sanchez Vera' ? 'selected' : '') + '>Diana Milena Sanchez Vera</option> '
                + ' <option value="Gina Paola Bohorquez" ' + (resultado["resolucion_marzo_upd_usuario"] === 'Gina Paola Bohorquez' ? 'selected' : '') + '>Gina Paola Bohorquez</option> '
                + ' <option value="Clara Villamizar" ' + (resultado["resolucion_marzo_upd_usuario"] === 'Clara Villamizar' ? 'selected' : '') + '>Clara Villamizar</option> '
                //+ ' <option value="Maria Alejandra Gonzalez" ' + (resultado["resolucion_marzo_upd_usuario"] === 'Maria Alejandra Gonzalez' ? 'selected' : '') + '>Maria Alejandra Gonzalez</option> '
                //+ ' <option value="Angela Maria Polania Figueroa" ' + (resultado["resolucion_marzo_upd_usuario"] === 'Angela Maria Polania Figueroa' ? 'selected' : '') + '>Angela Maria Polania Figueroa</option> '
                + ' <option value="Mayra Marcela Vallejo Vallejo" ' + (resultado["resolucion_marzo_upd_usuario"] === 'Mayra Marcela Vallejo Vallejo' ? 'selected' : '') + '>Mayra Marcela Vallejo Vallejo</option> '
                + ' <option value="Carlos Julian Florez Bravo" ' + (resultado["resolucion_marzo_upd_usuario"] === 'Carlos Julian Florez Bravo' ? 'selected' : '') + '>Carlos Julian Florez Bravo</option> '
                //+ ' <option value="Sonia Carolina Peña Sanchez" ' + (resultado["resolucion_marzo_upd_usuario"] === 'Sonia Carolina Peña Sanchez' ? 'selected' : '') + '>Sonia Carolina Peña Sanchez</option> '
                + ' <option value="Edith Gomez Bautista" ' + (resultado["resolucion_marzo_upd_usuario"] === 'Edith Gomez Bautista' ? 'selected' : '') + '>Edith Gomez Bautista</option> '
                + ' <option value="Ana Elvira Penagos Lopez" ' + (resultado["resolucion_marzo_upd_usuario"] === 'Ana Elvira Penagos Lopez' ? 'selected' : '') + '>Ana Elvira Penagos Lopez</option> '
                + ' <option value="Ludy Candelaria Polanco Castro" ' + (resultado["resolucion_marzo_upd_usuario"] === 'Ludy Candelaria Polanco Castro' ? 'selected' : '') + '>Ludy Candelaria Polanco Castro</option> '

                + ' <option value="Oscar Felipe Marlés Monje" ' + (resultado["resolucion_marzo_upd_usuario"] === 'Oscar Felipe Marlés Monje' ? 'selected' : '') + '>Oscar Felipe Marlés Monje</option> '
                + ' <option value="Rocío del Pilar Albarracín" ' + (resultado["resolucion_marzo_upd_usuario"] === 'Rocío del Pilar Albarracín' ? 'selected' : '') + '>Rocío del Pilar Albarracín</option> '
                + ' <option value="Amanda Jara" ' + (resultado["resolucion_marzo_upd_usuario"] === 'Amanda Jara' ? 'selected' : '') + '>Amanda Jara</option> '

                + '</select> </td></tr>');
        formulario.append('<tr class="hidden"><td><label>Cargo/Contrato:</label></td><td> <input  placeholder="Contrato No. XX de 2016." id="resolucion_marzo_upd_usr_cargo" class="required" value="' + resultado["resolucion_marzo_upd_usr_cargo"] + '"></td></tr>');

        formulario.append('<tr class="hidden"><td colspan="2"><label><h4>Componente técnico</h4></label></td></tr>');
        formulario.append('<tr class="hidden"><td><label>Revisado por:</label></td><td> <select id="resolucion_usuario_tecnico" required> <option value="" disabled selected hidden>Seleccione...</option> '
                + ' <option value="Oscar Felipe Marlés Monje" ' + (resultado["resolucion_usuario_tecnico"] === 'Oscar Felipe Marlés Monje' ? 'selected' : '') + '>Oscar Felipe Marlés Monje</option> '

                + '</select> </td></tr>');
        formulario.append('<tr class="hidden"><td><label>Cargo/Contrato:</label></td><td> <input  placeholder="Contrato No. XX de 2016." id="resolucion_cargo_usuario_tecnico" class="required" value="' + resultado["resolucion_cargo_usuario_tecnico"] + '"></td></tr>');

        formulario.find("td input.datepicker").datepicker({
            dateFormat: "dd/mm/yy"
        });

        formulario.find("#INICIO,#FIN").change(function (dateText) {
            var numero_meses = monthDiff(
                    new Date(formulario.find("#INICIO").datepicker('getDate').getTime() - (24 * 60 * 60 * 1000 * 0)),
                    new Date(formulario.find("#FIN").datepicker('getDate').getTime() + (24 * 60 * 60 * 1000))
                    );
            var ayuda = parseInt(formulario.find("#VALOR-AYUDA-MES").val());

            numero_meses = (numero_meses - Math.floor(numero_meses) === 0 ? numero_meses : Math.round(numero_meses * 100) / 100);

            formulario.find("#NUM-MESES").val(numero_meses);
            formulario.find("#TOTAL").val(ayuda * numero_meses);
            formulario.find("#TOT-MAS-UN-MES").val((ayuda * numero_meses) + ayuda);
        });
        var guardarCont = JSON.parse(jQuery('#scriptFormularioGraficoResolucionesMemorandos').html())['editarContrato'] ? true : false;
        if (guardarCont) {
            $(".details-" + rowId).find("#" + contenedor_id + " form fieldset").append('<input type="submit" id="btnGuardar" value="Guardar" onclick="return false;">');
            //$(".details-" + rowId).find("#" + contenedor_id + " form fieldset").append('<a class="siguiente " style="text-align:left; cursor: pointer; padding-left:60px;margin:20px 20px;" id="btnGuardar">Guardar</a>');
        }
        $(".details-" + rowId).find("#" + contenedor_id + " form fieldset").append('<input style="margin-left: 20px;" type="submit" id="btnCancelar" value="Cancelar" onclick="return false;">');
        $(".details-" + rowId).find("#" + contenedor_id + " form fieldset").find("#btnCancelar").click(function () {
            $(".details-" + rowId).find("#" + contenedor_id).hide();
        });

        $(".details-" + rowId).find("#" + contenedor_id + " form fieldset").find("#btnGuardar").click(function () {

            var data = {
                op: "ActualizarRevisionResoluciones",
                IDENTIFICADOR: id_solicitud
            };

            jQuery.each($(".details-" + rowId).find("#" + contenedor_id + " form fieldset table").find("input"), function (i, field) {

                if (field.type === "checkbox") {
                    data[field.id] = field.checked;
                } else {
                    data[field.id] = field.value;
                }

            });

            jQuery.each($(".details-" + rowId).find("#" + contenedor_id + " form fieldset table").find("select"), function (i, field) {
                data[field.id] = $(field).find("option:selected").val();
            });

            jQuery.each($(".details-" + rowId).find("#" + contenedor_id + " form fieldset table").find("textarea"), function (i, field) {
                data[field.id] = $(field).val();
            });

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
                            $(".details-" + rowId).find("#" + contenedor_id).hide();
                            if ($("#FormularioConsultaSolicutudes_btnBuscar").is(":visible")) {
                                $("#FormularioConsultaSolicutudes_btnBuscar").trigger("click");
                            }

                            //$(".details-" + rowId).find("#lblEstado").text(txtEstado);
                            //lblEstado
                        } else {
                            alert("No fué posible obtener almacenar la información");
                        }
                    }
                }, error: function () {
                    alert("No fué posible obtener almacenar la información");
                }
            });


        });


    } else {
        $(".details-" + rowId).find("#" + contenedor_id).hide();
    }

}
function RevisionFinanciera(id_solicitud, rowId, contenedor_id) {
    if (!$(".details-" + rowId).find("#" + contenedor_id).is(":visible")) {
        var resultado;
        $.ajax({
            type: "POST",
            url: "GestionConsultas",
            dataType: "text",
            async: false,
            data: {op: "consulta_datos_resolucion_marzo", IDENTIFICADOR: id_solicitud},
            success: function (response) {
                if (response)
                {
                    var res = eval('(' + response + ')');
                    if (res && res.total > 0) {
                        resultado = res.data[0];
                    }
                }
            }, error: function () {
                alert("No fué posible obtener las alternativas");
            }
        });

        $(".details-" + rowId).find("#" + contenedor_id).show();      


    } else {
        $(".details-" + rowId).find("#" + contenedor_id).hide();
    }

}

function FormularioRevisionResolucionesCargarCDP(id_solicitud, resultado, formulario, seleccionado) {
    $.ajax({
        type: "POST",
        url: "GestionConsultas",
        dataType: "text",
        async: false,
        data: {op: "consulta_saldos_cdp", IDENTIFICADOR: id_solicitud, LOCALIDAD: resultado["localidad"], ASIGNACION: formulario.find("#TOT-MAS-UN-MES").val()},
        success: function (response) {
            if (response)
            {
                var res = eval('(' + response + ')');

                formulario.find("#cdp-selector").empty();

                if (res && res.total > 0) {
                    var grupos = [];
                    for (var i = 0; i < res.data.length; i++) {

                        var grupo_id = -1;
                        for (var j = 0; j < grupos.length; j++) {
                            if (res.data[i].grupo && grupos[j].nombre === res.data[i].grupo) {
                                grupo_id = j;
                                break;
                            }
                        }
                        if (grupo_id !== -1) {
                            grupos[grupo_id].datos.push(res.data[i]);
                        } else if (res.data[i].grupo) {

                            grupos.push({
                                nombre: res.data[i].grupo,
                                datos: [res.data[i]]
                            });
                        }
                    }

                    grupos.sort(function (a, b) {
                        var a1 = a.nombre, b1 = b.nombre;
                        if (a1 === b1)
                            return 0;
                        return a1 > b1 ? 1 : -1;
                    });

                    for (var i = 0; i < grupos.length; i++) {
                        formulario.find("#cdp-selector").append('<optgroup id="cdp-selector-' + i + '" label="' + grupos[i].nombre + '"></optgroup>');
                        for (var j = 0; j < grupos[i].datos.length; j++) {
                            formulario.find("#cdp-selector #cdp-selector-" + i).append(
                                    '<option value="' + grupos[i].datos[j]["cdp_numero"] + '"'
                                    + 'rel="popover" title="CDP ' + grupos[i].datos[j]["cdp_numero"] + '" '
                                    + 'data-content="<table cellpadding=\'5\'>'
                                    + '<tr><td style=\'padding-bottom: 1em;\' width=\'70\'>CDP: </td><td style=\'padding-bottom: 1em;\'>' + grupos[i].datos[j]["cdp_numero"] + '</td></tr>'
                                    + '<tr><td style=\'padding-bottom: 1em;\'>Fecha: </td><td style=\'padding-bottom: 1em;\'>' + grupos[i].datos[j]["cdp_fecha"] + '</td></tr>'
                                    + '<tr><td style=\'padding-bottom: 1em;\'>Objeto: </td><td style=\'padding-bottom: 1em;\'><div align=\'justify\' style=\'word-wrap: break-word; \'>' + grupos[i].datos[j]["cdp_objeto"] + '</div></td></tr>'
                                    + '<tr><td>Valor total: </td><td>' + grupos[i].datos[j]["cdp_valor_mostrar_total"] + '</td></tr>'
                                    + '</table>" '
                                    + 'data-text="CDP ' + grupos[i].datos[j]["cdp_numero"]
                                    + ' (<strong style=\'color:' + (grupos[i].datos[j]["cdp_saldo_estimado"] > Number(formulario.find("#TOT-MAS-UN-MES").val()) ? '#808000' : '#BB2F37') + ';\'>' + grupos[i].datos[j]["cdp_saldo_mostrar_estimado"] + '</strong>)'

                                    + (grupos[i].datos[j]["cdp_localidad"] ? (' - ' + grupos[i].datos[j]["cdp_localidad"]) : '')
                                    + (grupos[i].datos[j]["cdp_sector"] ? (' - ' + grupos[i].datos[j]["cdp_sector"]) : '')
                                    + (grupos[i].datos[j]["cdp_comunidad"] ? (' - ' + grupos[i].datos[j]["cdp_comunidad"]) : '')
                                    + '" '
                                    + (Number(seleccionado) ? (seleccionado === grupos[i].datos[j]["cdp_numero"].toString() ? 'selected' : '') : (grupos[i].datos[j]["seleccionado"] ? 'selected' : '')) + '>'
                                    + '</option>');
                        }
                    }
                }
            }
        }, error: function () {
            alert("No fué posible obtener las alternativas");
        }
    });
    if (formulario.find("#cdp-selector").data("selectBox-selectBoxIt")) {
        formulario.find("#cdp-selector").data("selectBox-selectBoxIt").destroy();
    }
    formulario.find("#cdp-selector").selectBoxIt();
    $("[rel='popover']").popover({trigger: "hover", container: "body", html: true});
}


function FormularioRevisionResolucionesActualizarListadoContratos(formulario, identificador) {
    $.ajax({
        type: "POST",
        url: "GestionConsultas",
        dataType: "text",
        async: false,
        data: {op: "consulta_contratos_por_identificador", IDENTIFICADOR: identificador},
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
                                + '  <td><span style="cursor: pointer;" class="editable localidad" data-name="cont_localidad_predio" data-tipo="\'">' + res.data[i]['cont_localidad_predio'] + '</span></td>'
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
                                    var localidad = {"01": "01 - Usaquén",
                                        "02": "02 - Chapinero",
                                        "03": "03 - Santa Fe",
                                        "04": "04 - San Cristóbal",
                                        "05": "05 - Usme",
                                        "06": "06 - Tunjuelito",
                                        "07": "07 - Bosa",
                                        "08": "08 - Kennedy",
                                        "09": "09 - Fontibón",
                                        "10": "10 - Engativá",
                                        "11": "11 - Suba",
                                        "12": "12 - Barrios Unidos",
                                        "13": "13 - Teusaquillo",
                                        "14": "14 - Los Martires",
                                        "15": "15 - Antonio Nariño",
                                        "16": "16 - Puente Aranda",
                                        "17": "17 - La Candelaria",
                                        "18": "18 - Rafael Uribe Uribe",
                                        "19": "19 - Ciudad Bolívar",
                                        "20": "20 - Sumapaz",
                                        "NA": "NA - No aplica"
                                    };
                                    formulario.find("#datos_beneficiario tbody td .editable.localidad")
                                            .editable('GestionDML', {
                                                tooltip: "Doble click para editar",
                                                //event: "dblclick",
                                                data: '{"01": "01 - Usaquén","02": "02 - Chapinero","03": "03 - Santa Fe","04": "04 - San Cristóbal","05": "05 - Usme","06": "06 - Tunjuelito","07": "07 - Bosa","08": "08 - Kennedy","09": "09 - Fontibón","10": "10 - Engativá","11": "11 - Suba","12": "12 - Barrios Unidos","13": "13 - Teusaquillo","14": "14 - Los Martires","15": "15 - Antonio Nariño","16": "16 - Puente Aranda","17": "17 - La Candelaria","18": "18 - Rafael Uribe Uribe","19": "19 - Ciudad Bolívar","20": "20 - Sumapaz","NA": "NA - No aplica"}',
                                                type: 'select',
                                                submit: 'Guardar',
                                                width: 150,
                                                "callback": function (sValue, y) {
                                                    // Redraw the table from the new data on the server /
                                                    var r = eval('(' + sValue + ')');
                                                    if (r && r.data && r.data.length > 0) {
                                                        $(this).text(localidad[(r.data[0][$(this).data().name])]);
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

function FormularioRevisionResolucionesNuevoContrato(id_solicitud, rowId, contenedor_id) {

    var formulario = $(".details-" + rowId).find("#" + contenedor_id + " form fieldset table");

    var modal_id = Math.random().toString(36).substring(7);


    var html = '<div id="dynamicModal-' + modal_id + '" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="confirm-modal" aria-hidden="true">';
    html += '<div class="modal-dialog">';
    html += '<div class="modal-content">';
    html += '<div class="modal-header">';
    html += '<a class="close" data-dismiss="modal">×</a>';
    html += '<h4>' + 'Nuevo contrato identificador: ' + id_solicitud + '</h4>';
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
        FormularioRevisionResolucionesActualizarListadoContratos(formulario, id_solicitud);

        $(this).remove();
    });


    $("#dynamicModal-" + modal_id).find("input.datepicker").datepicker({
        dateFormat: "dd/mm/yy"/*,
         minDate: resolucion.start_date,
         maxDate: resolucion.end_date*/
    });

    FormularioRevisionResolucionesNuevoContratoCargarBancos(id_solicitud, $("#dynamicModal-" + modal_id).find("#bancoSelector"), 'consulta_bancos');

    FormularioRevisionResolucionesCargarDominios(id_solicitud, $("#dynamicModal-" + modal_id).find("#localidadSelector"), 'consulta_localidades');

    $("#dynamicModal-" + modal_id).find("#localidadSelector").on('change', function (e) {

        $("#dynamicModal-" + modal_id).find("#upzSelector").find("option").empty();

        if ($(e.currentTarget).val()) {
            FormularioRevisionResolucionesCargarDominios(id_solicitud, $("#dynamicModal-" + modal_id).find("#upzSelector"), 'consulta_upz_x_localidad', $(e.currentTarget).val());
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
            identificador: id_solicitud,
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
            cont_chip_predio: $("#dynamicModal-" + modal_id).find("#chip").val() ? $("#dynamicModal-" + modal_id).find("#chip").val() : ''
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



function FormularioRevisionResolucionesNuevoContratoCargarBancos(identificador, control, op) {
    $.ajax({
        type: "POST",
        url: "GestionConsultas",
        dataType: "text",
        async: false,
        data: {op: op, "IDENTIFICADOR": identificador},
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


function FormularioRevisionResolucionesGuardadoCompleto(success, codigo_archivo) {
    $.loader('close');

    if (success) {
        prevenirCierre = false;
        if (codigo_archivo) {
            alert("El código de archivo de la solicitud es: " + codigo_archivo);
        }
        ocultarPaneles();
        $(".details-" + rowId).find("#" + contenedor_id).empty();
        //$('#consultar-solicitud').show();
    } else {
        alert("Se presentó un error al almacenar la información");
    }
}

function monthDiff(d1, d2) {
    var months;
    /*
     months = (d2.getFullYear() - d1.getFullYear()) * 12;
     months -= d1.getMonth() + 1;
     months += d2.getMonth();
     */

    months = (d2.getFullYear() - d1.getFullYear()) * 12 + (d2.getMonth() - d1.getMonth()) + (d2.getDate() - d1.getDate()) / 30;
    /*
     months = Math.floor((d2 - d1) / 31536000000) * 12 +
     Math.floor(((d2 - d1) % 31536000000) / 2628000000) +
     (Math.floor((((d2 - d1) % 31536000000) % 2628000000) / 86400000) / 30);
     */
    return months <= 0 ? 0 : months;

}
/*
 function monthDiff(d1, d2) {
 d1 /= 1000;
 d2 /= 1000;
 if (d1 > d2) d2 = [d1, d1 = d2][0];
 
 var diffs = {
 year: 0,
 month: 0,
 day: 0,
 hour: 0,
 minute: 0,
 second: 0
 };
 
 $.each(diffs, function(interval) {
 while (d2 >= (d3 = Date.strtotime('+1 '+interval, d1))) {
 d1 = d3;
 ++diffs[interval];
 }
 });
 
 return diffs;
 }*/


function FormularioRevisionResolucionesCargarDominios(identificador, control, op, id) {
    $.ajax({
        type: "POST",
        url: "GestionConsultas",
        dataType: "text",
        async: false,
        data: {op: op, "IDENTIFICADOR": identificador, id: id},
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