if (jQuery)
    (function ($) {

        $.extend($.fn, {
            indicadoresPanelTotales: function (titulo, icono, color, operacion, subtitulo, info) {

                this.append('<span class="count_top"><i class="' + icono + '"></i> ' + titulo + '</span>');
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
                                $(this).append('<div class="count" style=" ' + (color ? 'color:' + color : '') + '">' + res.data[0].total + (info ? ' <i class="fa fa-info-circle panel_total_info" title="' + info + '"></i>' : '') + '</div>');
                                if (subtitulo) {
                                    $(this).append('<span class="count_bottom"><i class="green">' + res.data[0].subtotal + ' </i> ' + subtitulo + '</span>');
                                } else {
                                    $(this).append('<span class="count_bottom">&nbsp;</span>');
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

