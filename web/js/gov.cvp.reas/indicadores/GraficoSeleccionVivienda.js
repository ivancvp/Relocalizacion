if (jQuery)
    (function ($) {

        $.extend($.fn, {
            indicadoresGraficoSeleccionVivienda: function (titulo, operacion) {
                $(this).append("<h4>Familias por proyecto de vivienda</h4>");
                var datos = [];
                $.ajax({
                    type: "POST",
                    url: "GestionConsultas",
                    dataType: "text",
                    async: true,
                    data: {op: operacion, _c: Math.random()},
                    context: this,
                    success: function (response) {
                        if (response) {
                            var res = eval('(' + response + ')');
                            if (res && res.data && res.data.length > 0) {
                                var tam = Math.ceil(res.data.length / 3);
                                var id_contenedor = 0;
                                for (var i = 0; i < res.data.length; i++) {
                                    if (i % tam === 0) {
                                        id_contenedor++;
                                        $(this).append('<div id="contenedor-' + id_contenedor + '" class="col-md-4 col-sm-12 col-xs-12"></div>');
                                    }

                                    $(this).find("#contenedor-" + id_contenedor).append('<div class="widget_summary">' +
                                            '    <div class="w_left " style="width:250px">' +
                                            '        <span><small>' + res.data[i].proyecto + '</small></span>' +
                                            '    </div>' +
                                            '    <div class="w_center w_25">' +
                                            '        <div class="progress">' +
                                            '            <div class="progress-bar bg-green" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: ' + res.data[i].porcentaje + '%;">' +
                                            '                <span class="sr-only">60% Complete</span>' +
                                            '            </div>' +
                                            '        </div>' +
                                            '    </div>' +
                                            '    <div class="w_right w_20" style="width:120px">' +
                                            '        <span style="font-size: 10pt;">' + res.data[i].total + ' (' + res.data[i].porcentaje_total + '%)' + '</span>' +
                                            '    </div>' +
                                            '    <div class="clearfix"></div>' +
                                            '</div>');
                                }

                            } else {

                            }
                        } else {

                        }
                    }, error: function () {

                    }
                });
            }
        });
    })(jQuery);