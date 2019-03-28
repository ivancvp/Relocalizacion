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


function RevisionFinancieraResoluciones(id_solicitud, rowId, contenedor_id) {
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


        formulario.append('<tr><td colspan="2"><label><h2>Asignación</h2></label></td></tr>');
        formulario.append('<tr><td><label>Inicio:</label></td><td> <input readonly id="INICIO" class="datepicker required" value="' + resultado["INICIO"] + '"></td></tr>');
        formulario.append('<tr><td><label>Fin:</label></td><td> <input readonly id="FIN" class="datepicker required" value="' + resultado["FIN"] + '"></td></tr>');
        formulario.append('<tr><td><label>Duración de en meses:</label></td><td> <input readonly id="NUM-MESES" class="required" type="number" value="' + resultado["NUM MESES"] + '"></td></tr>');
        formulario.append('<tr><td><label>VALOR AYUDA MES:</label></td><td> <input readonly id="VALOR-AYUDA-MES" type="number" class="required" value="' + resultado["VALOR AYUDA MES"] + '"></td></tr>');
        formulario.append('<tr><td><label>valor total:</label></td><td> <input readonly id="TOTAL" class="required" type="number" value="' + resultado["TOTAL"] + '"></td></tr>');
        formulario.append('<tr><td><label>Asignación Total (valor contratos + un mes):</label></td><td> <input readonly id="TOT-MAS-UN-MES" type="number" class="required" value="' + resultado["TOTAL MAS UN MES"] + '"></td></tr>');

        formulario.append('<tr><td colspan="2"><label><h2></h2></label></td></tr>');
        formulario.append('<tr><td><label>Localidad:</label></td><td> <input readonly class="required" value="' + resultado["localidad"] + '"></td></tr>');
        formulario.append('<tr><td><label>Sector:</label></td><td> <input readonly class="required" value="' + resultado["sector"] + '"></td></tr>');

        formulario.append('<tr><td colspan="2"><label><h2>Presupuesto</h2></label></td></tr>');

        formulario.append('<tr><td><label>CDP:</label></td><td> <select id="cdp-selector"></select> </td></tr>');


        formulario.append('<tr><td colspan="2"><label><h2>Solicitud CRP</h2></label></td></tr>');
        formulario.append('<tr><td><label>Número de resolucion:</label></td><td> <input id="RESOLUCION" class="required" value="' + resultado["RESOLUCION"] + '"></td></tr>');
        formulario.append('<tr><td><label>Asunto solicitud:</label></td><td> <textarea rows="4" cols="60" id="OBJETO-SOLICITUD-CRP" class="required">' + resultado["OBJETO SOLICITUD CRP"] + '</textarea> </td></tr>');
        formulario.append('<tr><td><label>Valor total CDP:</label></td><td> <input id="VALOR-CDP-TOTAL" type="number" class="required" value="' + resultado["VALOR CDP TOTAL"] + '"></td></tr>');
        formulario.append('<tr><td><label>Número solicitud RP:</label></td><td> <input id="SOLICITUD-RP" class="required" value="' + resultado["SOLICITUD RP"] + '"></td></tr>');

        formulario.append('<tr><td><label>Número CRP:</label></td><td> <input id="crp_numero" class="required" value="' + resultado["crp_numero"] + '"></td></tr>');
        formulario.append('<tr><td><label>Fecha CRP:</label></td><td> <input id="crp_fecha" class="datepicker required" value="' + (resultado["crp_fecha"] ? resultado["crp_fecha"] : '') + '"></td></tr>');


        formulario.append('<tr><td colspan="2"><label><h2>Memorando Orden de pago</h2></label></td></tr>');
        formulario.append('<tr><td><label>Inicio Pago:</label></td><td> <input id="INI-PAGO" class="datepicker required" value="' + resultado["INICIO PAGO"] + '"></td></tr>');
        formulario.append('<tr><td><label>Fin Pago:</label></td><td> <input id="FN-PAGO" class="datepicker required" value="' + resultado["FIN PAGO"] + '"></td></tr>');

        formulario.append('<tr><td colspan="2"><label><h2>Estado de la revision y datos del profesional que revisa</h2></label></td></tr>');
        formulario.append('<tr><td style="width:250px;"><label>Estado:</label></td><td> <select id="resolucion_estado" required> '
                /*+ '<option value="" disabled selected hidden>Seleccione...</option> '
                + '<option value="Priorizado para revisión" ' + (resultado["resolucion_estado"] === 'Priorizado para revisión' ? 'selected' : '') + '>Priorizado para revisión</option>'
                + '<option value="Alistamiento de expediente" ' + (resultado["resolucion_estado"] === 'Alistamiento de expediente' ? 'selected' : '') + '>Alistamiento de expediente</option>'
                + '<option value="Asignado" ' + (resultado["resolucion_estado"] === 'Asignado' ? 'selected' : '') + '>Asignado</option>'
                + '<option value="Revisión Jurídica" ' + (resultado["resolucion_estado"] === 'Revisión Jurídica' ? 'selected' : '') + '>Revisión Jurídica</option>'
                + '<option value="Revisión Financiera" ' + (resultado["resolucion_estado"] === 'Revisión Financiera' ? 'selected' : '') + '>Revisión Financiera</option>'
                + '<option value="Impresa - REAS" ' + (resultado["resolucion_estado"] === 'Impresa - REAS' ? 'selected' : '') + '>Impresa - REAS</option>'
                + '<option value="Numeración" ' + (resultado["resolucion_estado"] === 'Numeración' ? 'selected' : '') + '>Numeración</option>'
                + '<option value="Solicitud RP" ' + (resultado["resolucion_estado"] === 'Solicitud RP' ? 'selected' : '') + '>Solicitud RP</option>'
                + '<option value="Registrado" ' + (resultado["resolucion_estado"] === 'Registrado' ? 'selected' : '') + '>Registrado</option>'

                + '<option value="Memorando" ' + (resultado["resolucion_estado"] === 'Memorando' ? 'selected' : '') + '>Memorando</option>'
                + '<option value="Devolucion" ' + (resultado["resolucion_estado"] === 'Devolucion' ? 'selected' : '') + '>Devolucion</option>'
                + '<option value="Sin expediente" ' + (resultado["resolucion_estado"] === 'Sin expediente' ? 'selected' : '') + '>Sin expediente</option>'
                + '<option value="NO PROCEDE!" ' + (resultado["resolucion_estado"] === 'NO PROCEDE!' ? 'selected' : '') + '>NO PROCEDE!</option>'
                */
                + '</select> </td></tr>');
        formulario.find("#resolucion_estado").empty();
        formulario.find("#resolucion_estado").append('<option value="" disabled selected hidden>Seleccione...</option> ');
        for (var estado in lista_estados) {
            formulario.find("#resolucion_estado").append('<option value="' + lista_estados[estado] + '" ' + (resultado["resolucion_estado"] === lista_estados[estado] ? 'selected' : '') + '>' + lista_estados[estado] + '</option>');
        }


        formulario.append('<tr><td colspan="2"><label><h4>Componente financiero</h4></label></td></tr>');
        formulario.append('<tr><td><label>Revisado por:</label></td><td> <select id="resolucion_usuario_financiero" required> <option value="" disabled selected hidden>Seleccione...</option> '
                //+ ' <option value="Rocío del Pilar Albarracín" ' + (resultado["resolucion_usuario_financiero"] === 'Rocío del Pilar Albarracín' ? 'selected' : '') + '>Rocío del Pilar Albarracín</option> '
                + ' <option value="Amanda Jara" ' + (resultado["resolucion_usuario_financiero"] === 'Amanda Jara' ? 'selected' : '') + '>Amanda Jara</option> '

                + '</select> </td></tr>');
        formulario.append('<tr><td><label>Cargo/Contrato:</label></td><td> <input  placeholder="Contrato No. XX de 2016." id="resolucion_cargo_usuario_financiero" class="required" value="' + resultado["resolucion_cargo_usuario_financiero"] + '"></td></tr>');

        FormularioRevisionFinancieraResolucionesCargarCDP(id_solicitud, resultado, formulario, resultado["CDP"]);

        formulario.find("td input.datepicker").datepicker({
            dateFormat: "dd/mm/yy"
        });


        $(".details-" + rowId).find("#" + contenedor_id + " form fieldset").append('<input type="submit" id="btnGuardar" value="Guardar" onclick="return false;">');
        //$(".details-" + rowId).find("#" + contenedor_id + " form fieldset").append('<a class="siguiente " style="text-align:left; cursor: pointer; padding-left:60px;margin:20px 20px;" id="btnGuardar">Guardar</a>');

        $(".details-" + rowId).find("#" + contenedor_id + " form fieldset").append('<input style="margin-left: 20px;" type="submit" id="btnCancelar" value="Cancelar" onclick="return false;">');
        $(".details-" + rowId).find("#" + contenedor_id + " form fieldset").find("#btnCancelar").click(function () {
            $(".details-" + rowId).find("#" + contenedor_id).hide();
        });

        $(".details-" + rowId).find("#" + contenedor_id + " form fieldset").find("#btnGuardar").click(function () {

            var data = {
                op: "ActualizarRevisionFinancieraResoluciones",
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

function FormularioRevisionFinancieraResolucionesCargarCDP(id_solicitud, resultado, formulario, seleccionado) {
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

                    formulario.find("#cdp-selector").append(
                            ' <option data-valor="0" value="0" selected data-text="<strong style=\'color:#BB2F37; font-weight:bold;\'>Sin CDP</strong>"></option>');

                    for (var i = 0; i < grupos.length; i++) {
                        formulario.find("#cdp-selector").append('<optgroup id="cdp-selector-' + i + '" label="' + grupos[i].nombre + '"></optgroup>');
                        for (var j = 0; j < grupos[i].datos.length; j++) {
                            formulario.find("#cdp-selector #cdp-selector-" + i).append(
                                    '<option value="' + grupos[i].datos[j]["cdp_numero"] + '"'
                                    + 'rel="popover" title="CDP ' + grupos[i].datos[j]["cdp_numero"] + '" '
                                    + 'data-valor="' + grupos[i].datos[j]["cdp_valor_total"] + '"'
                                    + 'data-content="<table cellpadding=\'5\'>'
                                    + '<tr><td style=\'padding-bottom: 1em;\' width=\'70\'>CDP: </td><td style=\'padding-bottom: 1em;\'>' + grupos[i].datos[j]["cdp_numero"] + '</td></tr>'
                                    + '<tr><td style=\'padding-bottom: 1em;\'>Fecha: </td><td style=\'padding-bottom: 1em;\'>' + grupos[i].datos[j]["cdp_fecha"] + '</td></tr>'
                                    + '<tr><td style=\'padding-bottom: 1em;\'>Objeto: </td><td style=\'padding-bottom: 1em;\'><div align=\'justify\' style=\'word-wrap: break-word; \'>' + grupos[i].datos[j]["cdp_objeto"] + '</div></td></tr>'
                                    + '<tr><td>Valor total: </td><td>' + grupos[i].datos[j]["cdp_valor_mostrar_total"] + '</td></tr>'
                                    + '<tr><td>Valor disponible inicial: </td><td>' + grupos[i].datos[j]["cdp_valor_mostrar_disponible"] + '</td></tr>'
                                    + '</table>" '
                                    + 'data-text="CDP ' + grupos[i].datos[j]["cdp_numero"]
                                    + ' (<strong style=\'color:' + (grupos[i].datos[j]["cdp_saldo_estimado"] > Number(formulario.find("#TOT-MAS-UN-MES").val()) ? '#808000' : '#BB2F37') + ';\'>' + grupos[i].datos[j]["cdp_saldo_mostrar_estimado"] + '</strong>)'

                                    + (grupos[i].datos[j]["cdp_localidad"] ? (' - ' + grupos[i].datos[j]["cdp_localidad"]) : '')
                                    + (grupos[i].datos[j]["cdp_sector"] ? (' - ' + grupos[i].datos[j]["cdp_sector"]) : '')
                                    + (grupos[i].datos[j]["cdp_comunidad"] ? (' - ' + grupos[i].datos[j]["cdp_comunidad"]) : '')
                                    + '" '
                                    + (Number(seleccionado) ? (seleccionado === grupos[i].datos[j]["cdp_numero"].toString() ? 'selected' : '') : (grupos[i].datos[j]["seleccionado"] ? 'selected' : ''))
                                    + ' '
                                    + (grupos[i].datos[j]["cdp_habilitado"] ? '' : 'disabled')
                                    + '>'
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

    formulario.find("#VALOR-CDP-TOTAL").val(formulario.find("#cdp-selector option:selected").data("valor"));
    formulario.find("#cdp-selector").bind({
        "changed": function (ev, obj) {
            formulario.find("#VALOR-CDP-TOTAL").val(formulario.find("#cdp-selector option:selected").data("valor"));
        }
    });

    $("[rel='popover']").popover({trigger: "hover", container: "body", html: true});
}

function FormularioRevisionFinancieraResolucionesGuardadoCompleto(success, codigo_archivo) {
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
