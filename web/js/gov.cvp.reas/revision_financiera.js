var URL_IMPRIMIR = window.location.protocol + "//" + window.location.hostname + ":81/"; //"http://cs9068:81/";
function RevisionFinanciera(id_solicitud, rowId, contenedor_id) {
    if (!$(".details-" + rowId).find("#" + contenedor_id).is(":visible")) {
        $(".details-" + rowId).find("#" + contenedor_id).show();
        $(".details-" + rowId).find("#" + contenedor_id).empty();
        $(".details-" + rowId).find("#" + contenedor_id)
                .append("<table id=\"pagos\" class=\"table table-striped\"><thead> <tr> <th>Identificador</th><th>Documento</th><th>Nombre</th><th>CDP</th><th>Resolución</th><th>CRP</th><th>valor CRP</th> <th>Orden de pago</th><th>Valor OP</th><th>fecha de pago</th></tr></thead> <tbody id=\"infoPagos\"> </tbody> </table>");

        $(".details-" + rowId).find("#" + contenedor_id)
                .append("<div class='container' id='graficasCRP'></div>");

        var cedula = id_solicitud;
        var operacion = "op_cedula";
        var objeto = {
            'op': operacion,
            'cedula': cedula
        };
        $.ajax({
            type: "POST",
            url: "GestionConsultas",
            dataType: "text",
            async: true,
            data: objeto,
            success: function (response) {
                if (response) {
                    var res = eval('(' + response + ')');
                    if (res && res.total > 0) {
                        $(".details-" + rowId).find("#" + contenedor_id).find("#infoPagos").empty();
                        var id = 0;
                        for (var i = 0; i < res.data.length; i++) {
                            $(".details-" + rowId).find("#" + contenedor_id).find("#infoPagos").append(
                                    '<tr align="center">' +
                                    '<td>' +
                                    res.data[i].identificador +
                                    '</td>' +
                                    '<td>' +
                                    res.data[i].documento +
                                    '</td>' +
                                    '<td>' +
                                    res.data[i].nombre +
                                    '</td>' +
                                    '<td>' +
                                    res.data[i].cdp +
                                    '</td>' +
                                    '<td><a onclick=traeResolusion(' + res.data[i].resolucion + ')>' +
                                    res.data[i].resolucion +
                                    '</a></td>' +
                                    '<td>' +
                                    res.data[i].crp +
                                    '</td>' +
                                    '<td>' +
                                    $.number(res.data[i].valor_crp, 2) +
                                    '</td>' +
                                    '<td>' +
                                    res.data[i].num_op +
                                    '</td>' +
                                    '<td>' +
                                    $.number(res.data[i].valor_op, 2) +
                                    '</td>' +
                                    '<td>' +
                                    res.data[i].fecha_pago +
                                    '</td>' +
                                    '</tr>'
                                    );

                        }
                    } else {
                        $(".details-" + rowId).find("#" + contenedor_id).find("#infoPagos").append('<tr  align="center">' +
                                '<td colspan="10"> no hay datos</td><tr>');

                    }
                }
                //                $(".details-" + rowId).find("#" + contenedor_id).find("#infoPagos").find('#pagos').dataTable();

            }, error: function (e) {
                alert("No fué posible consultar:" + e);
            }
        });
        var objeto2 = {
            'op': "consulta_grafico_crp",
            'identificador': cedula
        };

        $.ajax({
            type: "POST",
            url: "GestionConsultas",
            dataType: "text",
            async: false,
            data: objeto2,
            success: function (response) {
                if (response) {
                    var res = eval('(' + response + ')');
                    if (res && res.total > 0) {
                        $(".details-" + rowId).find("#" + contenedor_id).find("#infoPagos").empty();

                        for (var i = 0; i < res.data.length; i++) {
                            var idGrafica = "crp" + res.data[i].crp;
                            $(".details-" + rowId).find("#" + contenedor_id).find("#graficasCRP").append("<div class=\"sidebar-widget grafica-crp\"> <h4>CRP " + res.data[i].crp + " Res " + res.data[i].resolucion + "</h4> <canvas width=\"150\" height=\"80\" id=\"" + idGrafica + "\" class=\"\" style=\"width: 160px;height:100px;\"></canvas> <div class=\"goal-wrapper\"><span class=\"gauge-value pull-left\">$</span><span id=\"gauge-text\" class=\"gauge-value pull-left\"> " + $.number(res.data[i].pagado) + "</span><span id=\"goal-text\" class=\"goal-value pull-right\">$" + $.number(res.data[i].valor_crp) + "</span></div><div style=\"text-align: center;\"class=\"goal-wrapper\"><span  class=\"goal-value \"><strong>"+$.number((res.data[i].pagado/res.data[i].valor_crp)*100) +" %</strong></span></div></div>");
                            grafica(idGrafica, res.data[i].valor_crp, res.data[i].pagado);
                        }
                    } else {

                    }
                }

            }, error: function (e) {
                alert("No fué posible consultar:" + e);
            }
        });
    } else {
        $(".details-" + rowId).find("#" + contenedor_id).hide();
    }

}

function grafica(id, total, pagado) {
    var opts = {
        lines: 12,
        angle: 0,
        lineWidth: 0.4,
        pointer: {
            length: 0.75,
            strokeWidth: 0.042,
            color: '#1D212A'
        },
        limitMax: 'false',
        colorStart: '#1ABC9C',
        colorStop: '#1ABC9C',
        strokeColor: '#F0F3F3',
        generateGradient: true
    };
    var target = document.getElementById(id),
            gauge = new Gauge(target).setOptions(opts);

    gauge.maxValue = total;
    gauge.animationSpeed = 32;
    gauge.set(pagado);
//    gauge.setTextField(document.getElementById("gauge-text"));
}
function traeResolusion(numero) {
    var archivos = buscaResolucion(numero);
    console.log(archivos['length']);
    if (archivos['length'] > 0) {
        $.each(archivos, function (i, val) {
            var objeto = {
                file: val[0]
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
    } else {
        alert('No encontró ningun archivo');
    }
}

function buscaResolucion(id_res) {
    var objeto = {
        resolucion: id_res};
    var archivos_resultado = [];
    $.ajax({
        url: URL_IMPRIMIR + "pdf/consultar_resolucion.php",
        type: 'POST',
        data: objeto,
        dataType: 'JSON',
        success: function (data) {
            if (data.length > 0) {
                $.each(data, function (i, val) {
                    archivos_resultado[i] = val;
                });
            }
        }
    });
    console.log(archivos_resultado);
    return archivos_resultado;
}

