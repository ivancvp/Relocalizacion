if (jQuery)
    (function ($) {

        $.extend($.fn, {
            indicadoresGraficoAvance: function (operacion, mes, variables) {

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

                                for (var i = 0; i < variables.length; i++) {
                                    datos.push({data: [], label: variables[i].label});
                                    for (var j = 0; j < res.data.length; j++) {
                                        datos[i].data.push([new Date(res.data[j][mes]), res.data[j][variables[i].value]]);
                                    }

                                }

                                $.plot($(this), datos, {
                                    series: {
                                        lines: {
                                            show: false,
                                            fill: true
                                        },
                                        splines: {
                                            show: true,
                                            tension: 0.4,
                                            lineWidth: 2,
                                            fill: 0.1
                                        },
                                        points: {
                                            radius: 0,
                                            show: true
                                        },
                                        shadowSize: 2
                                    },
                                    grid: {
                                        verticalLines: true,
                                        hoverable: true,
                                        clickable: true,
                                        tickColor: "#d5d5d5",
                                        borderWidth: 0.5,
                                        //color: '#fff'
                                    },
                                    legend: {
                                        noColumns: 1
                                    },
                                    colors: ["#F39C12", "#29d", "#2f8325"],
                                    xaxis: {
                                        tickColor: "rgba(51, 51, 51, 0.06)",
                                        mode: "time",
                                        tickSize: [1, "month"],
                                        //tickLength: 10,
                                        axisLabel: "Date",
                                        axisLabelUseCanvas: true,
                                        axisLabelFontSizePixels: 12,
                                        axisLabelFontFamily: 'Verdana, Arial',
                                        axisLabelPadding: 10
                                    },
                                    yaxis: {
                                        ticks: 8,
                                        axisLabelPadding: 10,
                                        tickColor: "rgba(51, 51, 51, 0.06)"
                                    },
                                    tooltip: true
                                });

                                $("<div id='tooltip'></div>").css({
                                    position: "absolute",
                                    display: "none",
                                    border: "1px solid #fdd",
                                    padding: "2px",
                                    "background-color": "#29d",
                                    opacity: 0.80,
                                    color: "#FFF"
                                }).appendTo("body");

                                var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

                                $(this).bind("plothover", function (event, pos, item) {
                                    if (item) {
                                        var x = item.datapoint[0];
                                        var y = item.datapoint[1];
                                        var fecha = new Date(x);


                                        $("#tooltip").html(item.series.label + " de " + meses[fecha.getMonth()] + " - " + fecha.getFullYear() + ": " + y)
                                                .css({top: item.pageY + 5, left: item.pageX + 5})
                                                .fadeIn(200);
                                    } else {
                                        $("#tooltip").hide();
                                    }

                                });

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