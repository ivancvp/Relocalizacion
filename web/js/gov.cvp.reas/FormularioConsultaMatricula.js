jQuery.getCSS = function (url, media) {
    jQuery(document.createElement('link')).attr({
        href: url,
        media: media || 'screen',
        type: 'text/css',
        rel: 'stylesheet'
    }).appendTo('head');
};
$.getCSS('../css/Plugins/TableTools.css');

$.getScript("../js/Plugins/ZeroClipboard.js");
$.getScript("../js/Plugins/TableTools.js");

function FormularioConsultaMatricula(div, callbackOnResultadoSeleccionado, mostrarToolTip, titulo, editable) {
    this.div = div;
    this.callbackOnResultadoSeleccionado = callbackOnResultadoSeleccionado;
    this.titulo = titulo;
    this.editable = editable;
    
    if (mostrarToolTip !== null) {
        this.mostrarToolTip = mostrarToolTip;
    }
}

FormularioConsultaMatricula.prototype.div = null;
FormularioConsultaMatricula.prototype.callbackOnResultadoSeleccionado = null;
FormularioConsultaMatricula.prototype.mostrarToolTip = false;
FormularioConsultaMatricula.prototype.titulo = null;
FormularioConsultaMatricula.prototype.editable = false;
FormularioConsultaMatricula.prototype.nombres = [];

FormularioConsultaMatricula.prototype.iniciarFormulario = function () {
    var instancia = this;
    $("#" + this.div).empty();
    $("#" + this.div).append('<form class="forms ui-tabs-panel ui-widget-content ui-corner-all" autocomplete="on" style="padding-bottom: 20px; border-width: 0;"></form>');
    if (this.titulo) {
        $("#" + this.div + " form").append('<div class="titulo-panel-busqueda"><h2>' + this.titulo + '</h2></div>');
    }
    $("#" + this.div + " form").append('<label><h3 style="color: #005000;">Buscar por:</h3></label>');
    $("#" + this.div + " form").append('<label><p style="color: #777777;">* Puede buscar por cualquiera de los siguientes criterios. No es necesario diligenciarlos todos para realizar la consulta</p></label>');
    $("#" + this.div + " form").append('<table/>');
    $("#" + this.div + " form table").append('<tr><td><label>Matrícula Inmobiliaria:</label></td><td><select id="consulta_txtMatriculaInmobiliaria"></select></td></tr>');
    $("#" + this.div + " form table").append('<tr><td><label>Documento de identificación:</label></td><td><select id="consulta_txtDocumento"></select></td></tr>');
    $("#" + this.div + " form table").append('<tr><td><label>Nombre:</label></td><td><select id="consulta_txtNombre"></select></td></tr>');

    $("#consulta_txtMatriculaInmobiliaria").select2({
        language: "es",
        ajax: {
            url: "GestionConsultas",
            dataType: 'text',
            delay: 250,
            data: function (params) {
                return {
                    op: "ConsultaMatriculaInmobiliaria",
                    MATRICULA: params.term, // search term
                    page: params.page
                };
            },
            processResults: function (data, page) {

                if (data) {
                    var results = [];
                    var res = eval('(' + data + ')');

                    if (res.hasOwnProperty('error')) {
                        alert(res.descripcion);
                    } else if (res.data)
                    {
                        if (res && res.total > 0) {
                            results = res.data;
                        }
                    }

                    return {
                        results: results
                    };
                }
            },
            cache: true
        },
        escapeMarkup: function (markup) {
            return markup;
        }, // let our custom formatter work
        minimumInputLength: 2,
        templateResult: formatRepo
    }).on("select2:select", function (e) {
        if ($("#FormularioConsultaMatriculaSolicutudes_btnBuscar").is(":visible")) {
            $("#FormularioConsultaMatriculaSolicutudes_btnBuscar").trigger("click");
        }
        
    });
    function formatRepo(repo) {
        if (repo.loading)
            return repo.text;

        var markup = '<div class="clearfix">' +
                '' +
                '<div style="font-size: 1.2em;">' + repo.matricula + '</div>' +
                '<div style="font-size: 0.9em; margin-left: 2px; color: #777777;">' + (repo.flio_cod_c && repo.flio_cod_c.indexOf("e+") === -1 ? repo.flio_cod_c : "") + '</div>' +
                '';

        if (repo.description) {
            markup += '<div>' + repo.description + '</div>';
        }

        markup += '</div></div>';

        return markup;
    }
    
    
    $("#consulta_txtDocumento").select2({
        language: "es",
        ajax: {
            url: "GestionConsultas",
            dataType: 'text',
            delay: 250,
            data: function (params) {
                return {
                    op: "ConsultaMatriculaInmobiliariaPorDocumento",
                    DOCUMENTO: params.term, // search term
                    page: params.page
                };
            },
            processResults: function (data, page) {

                if (data) {
                    var results = [];
                    var res = eval('(' + data + ')');

                    if (res.hasOwnProperty('error')) {
                        alert(res.descripcion);
                    } else if (res.data)
                    {
                        if (res && res.total > 0) {
                            results = res.data;
                        }
                    }

                    return {
                        results: results
                    };
                }
            },
            cache: true
        },
        escapeMarkup: function (markup) {
            return markup;
        }, // let our custom formatter work
        minimumInputLength: 2,
        templateResult: formatDoc
    }).on("select2:select", function (e) {
        if ($("#FormularioConsultaMatriculaSolicutudes_btnBuscar").is(":visible")) {
            $("#FormularioConsultaMatriculaSolicutudes_btnBuscar").trigger("click");
        }
        
    });
    function formatDoc(repo) {
        if (repo.loading)
            return repo.text;

        var markup = '<div class="clearfix">' +
                '' +
                '<div style="font-size: 1.2em;">' + repo.documento + '</div>' +
                '<div style="font-size: 0.9em; margin-left: 2px; color: #777777;">' + repo.matricula + '</div>' +
                '';

        if (repo.description) {
            markup += '<div>' + repo.description + '</div>';
        }

        markup += '</div></div>';

        return markup;
    }
    
    
    instancia.nombres = [];
    
    $("#consulta_txtNombre").select2({
        language: "es",
        ajax: {
            url: "GestionConsultas",
            dataType: 'text',
            delay: 250,
            data: function (params) {
                return {
                    op: "ConsultaMatriculaInmobiliariaPorNombre",
                    NOMBRE: params.term, // search term
                    page: params.page
                };
            },
            processResults: function (data, page) {

                if (data) {
                    var results = [];
                    var res = eval('(' + data + ')');

                    if (res.hasOwnProperty('error')) {
                        alert(res.descripcion);
                    } else if (res.data)
                    {
                        if (res && res.total > 0) {
                            results = res.data;
                            instancia.nombres = res.data;
                        }
                    }

                    return {
                        results: results
                    };
                }
            },
            cache: true
        },
        escapeMarkup: function (markup) {
            return markup;
        }, // let our custom formatter work
        minimumInputLength: 2,
        templateResult: formatNombre
    }).on("select2:select", function (e) {
        if ($("#FormularioConsultaMatriculaSolicutudes_btnBuscar").is(":visible")) {
            $("#FormularioConsultaMatriculaSolicutudes_btnBuscar").trigger("click");
        }
        
    });
    function formatNombre(repo) {
        if (repo.loading)
            return repo.text;

        var markup = '<div class="clearfix">' +
                '' +
                '<div style="font-size: 1.2em;">' + repo.text + '</div>' +
                '<div style="font-size: 0.9em; margin-left: 2px; color: #777777;">' + repo.documento + '</div>' +
                '<div style="font-size: 0.9em; margin-left: 2px; color: #777777;">' + repo.matricula + '</div>' +
                '';

        if (repo.description) {
            markup += '<div>' + repo.description + '</div>';
        }

        markup += '</div></div>';

        return markup;
    }
    


    //
    //Crear Boton de buscar
    $('<a>', {
        text: 'Buscar',
        title: 'Buscar',
        href: '#',
        class: 'siguiente',
        id: 'FormularioConsultaMatriculaSolicutudes_btnBuscar',
        click: $.proxy(this.buscarSolicitud, this)
    }).appendTo($("#" + this.div + " form"));

    $('<a>', {
        text: 'Buscando...',
        title: 'Buscando...',
        class: 'siguiente',
        href: '#',
        id: 'FormularioConsultaMatriculaSolicutudes_lblBuscando'
    }).hide().appendTo($("#" + this.div + " form"));

    $("#" + this.div + " form").append('<div style="margin-top: 20px; margin-bottom: 20px; margin-right: 20px;" id="div_resultados"></div>');

    $("#" + this.div + " form input").keypress(function (e) {
        if (e.which === 13) {
            if ($("#FormularioConsultaMatriculaSolicutudes_btnBuscar").is(":visible")) {
                $("#FormularioConsultaMatriculaSolicutudes_btnBuscar").trigger("click");
            }
        }
    });
};

FormularioConsultaMatricula.prototype.buscarSolicitud = function () {
    //Vaciar el listado de resultados anteriores
    var instancia = this;
    $("#" + this.div + " form #div_resultados").empty();

    var parametros = {
        op: 'ConsultaDetallesMatriculaInmobiliaria',
        MATRICULA: ($("#" + this.div + " #consulta_txtMatriculaInmobiliaria")[0].value !== "" ? $("#" + this.div + " #consulta_txtMatriculaInmobiliaria")[0].value : "null"),
        DOCUMENTO: ($("#" + this.div + " #consulta_txtDocumento")[0].value !== "" ? $("#" + this.div + " #consulta_txtDocumento")[0].value : "null"),
        DOCUM2: ($("#" + this.div + " #consulta_txtNombre")[0].value !== "" ? $("#" + this.div + " #consulta_txtNombre")[0].value : "null"),
        _a: Math.random(), _a_: Math.random()
    };
    $.ajax({
        data: parametros,
        url: 'GestionConsultas',
        type: 'GET',
        dataType: 'text',
        context: this,
        beforeSend: function () {
            $("#FormularioConsultaMatriculaSolicutudes_btnBuscar").hide();
            $("#FormularioConsultaMatriculaSolicutudes_lblBuscando").show();
        },
        complete: function () {
            $("#FormularioConsultaMatriculaSolicutudes_btnBuscar").show();
            $("#FormularioConsultaMatriculaSolicutudes_lblBuscando").hide();
        },
        success: function (response) {
            if (response)
            {
                var res = eval('(' + response + ')');

                if (res.hasOwnProperty('error')) {
                    alert(res.descripcion);
                } else if (res.data)
                {
                    if (res && res.total > 0) {

                        var instanciaFormularioConsultaMatricula = this;

                        $("#" + instanciaFormularioConsultaMatricula.div + " form #div_resultados").append(
                                '<table id="tabla_resultados">' +
                                '<thead><tr><th>Matricula</th><th>Código Catastral</th><th>Dirección</th><th>Vereda</th></tr></thead><tbody></tbody></table>');
                        for (var i = 0; i < res.data.length; i++) {

                            $("#" + instanciaFormularioConsultaMatricula.div + " form #div_resultados #tabla_resultados tbody").append('<tr data-indice-resultado="' + i + '"></tr>');

                            $($("#" + instanciaFormularioConsultaMatricula.div + " form #div_resultados #tabla_resultados tbody tr")[i]).append(
                                    '<td><a class="expandirTabla "  style="cursor: pointer; text-decoration: underline;"><span style="background: url(\'../images/pdf.png\') no-repeat scroll left top rgba(0, 0, 0, 0);font-size: 14px; padding: 0 0 0 20px;">' + res.data[i].matricula + '</span></a></td>' +
                                    '<td><span class="">' + (res.data[i].flio_cod_c ? res.data[i].flio_cod_c : 'No especificado') + '</span></td>' +
                                    '<td><a class="">' + res.data[i].direccion + '</a></td>' +
                                    '<td><span class="">' + res.data[i].vereda + " - " + res.data[i].municipio + '</span></td>' 
                                    );
                        }

                        $.extend($.fn.dataTable.defaults, {
                            "bFilter": true,
                            "bSort": true
                        });

                        var oTable = $("#" + instanciaFormularioConsultaMatricula.div + " form #div_resultados #tabla_resultados").dataTable({
                            "oLanguage": {
                                "sLengthMenu": "Mostrar _MENU_ resultados por página",
                                "sZeroRecords": "No hay resultados",
                                "sInfo": "Viendo _START_ a _END_, de _TOTAL_ resultados",
                                "sInfoEmpty": "Viendo 0 a 0, de 0 resultados",
                                "sInfoFiltered": "(Filtrado de _MAX_ resultados totales)"
                            },
                            "sDom": 'T<"clear">lfrtip',
                            "oTableTools": {
                                "sSwfPath": "../js/Plugins/swf/ZeroClipboard.swf"
                            },
                            "fnDrawCallback": function () {
                                if (instancia.editable) {
                                    try {
                                        console.log("TODO: PENDIENTE POR IMPLEMENTAR GUARDADO DE CAMBIOS!!!");
                                        $('#' + instanciaFormularioConsultaMatricula.div + ' form #div_resultados #tabla_resultados tbody td .editable')
                                                .editable('../examples_support/editable_ajax.php', {
                                                    tooltip: "Doble clik para editar",
                                                    event: "dblclick",
                                                    "callback": function (sValue, y) {
                                                        /* Redraw the table from the new data on the server */
                                                        oTable.fnDraw();
                                                    },
                                                    "height": "14px"
                                                });
                                    } catch (e) {
                                        console.log("No se ha configurado el editor");
                                    }
                                }
                            }


                        }).on('click', 'a.expandirTabla', function () {
                            var nTr = $(this).parents('tr')[0];
                            if (oTable.fnIsOpen(nTr)) {
                                //oTable.fnClose(nTr);
                            }
                            else {
                                oTable.fnOpen(nTr, instanciaFormularioConsultaMatricula.callbackOnResultadoSeleccionado(res.data[$(nTr).data('indice-resultado')], nTr), 'details-' + $(nTr).data('indice-resultado'));
                                oTable.fnClose(nTr);
                            }
                        });

                    } else {
                        alert("No hay solicitudes registradas");
                    }
                }
            }
        }, error: function () {
            alert("No fué posible realizar la consulta");
        }
    });
};

FormularioConsultaMatricula.prototype.onResultadoSeleccionado = function (item) {
    this.callbackOnResultadoSeleccionado(item);
};
