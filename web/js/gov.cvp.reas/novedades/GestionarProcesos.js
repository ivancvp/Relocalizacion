

/* global formularioConsulta, google, gantt, usuario_login */

function IniciarGestionarProcesos(identificador) {
    var modal_id = Math.random().toString(36).substring(7);

    var html = '<div id="dynamicModal-' + modal_id + '" style=" width: 100%;" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="confirm-modal" aria-hidden="true">';
    html += '<div class="modal-dialog modal-lg" style=" width: 95%;" >';
    html += '<div class="modal-content">';
    html += '<div class="modal-header">';
    html += '<a class="close" data-dismiss="modal">×</a>';
    html += '<h4>Novedades</h4>';
    html += '</div>';
    html += '<div class="modal-body">';

    html +=
            '<form class="form" role="form" data-toggle="validator">' +
            '  <div class="form-group">' +
            '    <label for="estadoSelector">Tipo de proceso:</label><div class="clearfix"></div>' +
            '    <select class="form-control" id="procesoSelector" required></select>' +
            '  </div>' +
            '</form>' +
            '<form class="form row" role="form" data-toggle="validator">' +
            '  <div class="form-group col-xs-12 col-sm-6">' +
            '    <label for="cordis-entrada">CORDIS de ingreso:</label><div class="clearfix"></div>' +
            '    <input type="text" class="form-control" id="cordis-entrada" required></input>' +
            '  </div>' +
            '  <div class="form-group col-xs-12 col-sm-6">' +
            '    <label for="fecha-cordis-entrada">Fecha de CORDIS de ingreso:</label><div class="clearfix"></div>' +
            '    <input type="text" class="form-control datepicker" id="fecha-cordis-entrada" required></input>' +
            '  </div>' +
            '</form>' +
            '<hr class="separator">';
    html += '<div class="row" id="panel-operaciones">' +
            /*
             '  <div class="col-sm-3">' +
             '    <a id="btn-mostrar-comentarios" class="btn btn-info" data-toggle="collapse" data-target="#panel_comentarios" role="button">Mostrar Comentarios</a>' +
             '  </div>' +
             */
            '  <div class="col-sm-9">' +
            '    <form class="form-inline">' +
            '      <div class="form-group">' +
            '        <label for="estadoSelector">Asignar todas las actividades a:</label>' +
            '        <select class="form-control" id="usuariosSelector" required></select>' +
            '      </div>' +
            '    </form>' +
            '  </div>' +
            '</div>';
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


    $("#dynamicModal-" + modal_id).find("#panel-operaciones").hide();

    $("#dynamicModal-" + modal_id).find("#btn-mostrar-comentarios").on("click", function (e) {
        if ($("#dynamicModal-" + modal_id).find("#panel_lista_actividades").hasClass("col-sm-12")) {
            $("#dynamicModal-" + modal_id).find("#panel_lista_actividades").removeClass("col-sm-12");
            $("#dynamicModal-" + modal_id).find("#panel_lista_actividades").addClass("col-sm-8");
        } else {
            $("#dynamicModal-" + modal_id).find("#panel_lista_actividades").removeClass("col-sm-8");
            $("#dynamicModal-" + modal_id).find("#panel_lista_actividades").addClass("col-sm-12");
        }
    });

    $("#dynamicModal-" + modal_id).find("#procesoSelector").on("change", function (e) {
        GestionarProcesosVerDetalles($("#dynamicModal-" + modal_id).find("#lista_actividades")[0], $("#dynamicModal-" + modal_id).find("#procesoSelector").val(), modal_id);
    });

    //Guardar nuevo proceso
    $("#dynamicModal-" + modal_id).find("#btnGuardarNuevoProceso").on('click', function (e) {
        var iconos_actividades = $("#dynamicModal-" + modal_id).find("#lista_actividades").find(".btn-asignar").parent();
        var asignado = true;
        var tipo_actividad_id = [];
        var usuario = [];

        for (var i = 0; i < iconos_actividades.length; i++) {
            tipo_actividad_id.push($(iconos_actividades[i]).data("actividad-id"));
            usuario.push($(iconos_actividades[i]).data("usuario"));

            if (!$(iconos_actividades[i]).data("usuario")) {
                asignado = false;
                break;
            }
        }
        if (!$("#dynamicModal-" + modal_id).find("#procesoSelector").val()) {
            alert("Seleccione el tipo de novedad a ingresar");
            gantt.message({type: "error", text: "Seleccione el tipo de novedad a ingresar"});
            return;
        }
        if (!asignado) {
            alert("Todas las actividades deben ser asignadas");
        } else {
            $.ajax({
                type: "POST",
                url: "GestionDML",
                dataType: "text",
                async: false,
                data: {
                    op: "InsertarNuevoProceso",
                    tipo_proceso_id: $("#dynamicModal-" + modal_id).find("#procesoSelector").val(),
                    cordis_entrada: $("#dynamicModal-" + modal_id).find("#cordis-entrada").val(),
                    cordis_fecha_entrada: $("#dynamicModal-" + modal_id).find("#fecha-cordis-entrada").val(),
                    IDENTIFICADOR: identificador,
                    usuario: "'" + usuario.join("','") + "'",
                    tipo_actividad_id: tipo_actividad_id.join(",")
                },
                success: function (response) {
                    if (response)
                    {
                        var res = eval('(' + response + ')');
                        if (res && res.total > 0) {
                            $("#dynamicModal-" + modal_id).modal('hide');
                            //alert("Pendiente actualizar identificador");
                            gantt.message("Novedad Creada Correctamente");
                        }
                    }
                }, error: function () {
                    alert("No fué posible obtener las alternativas");
                }
            });
        }

    });

    $("#dynamicModal-" + modal_id).find("#usuariosSelector").on('change', function (e) {
        //alert($("#dynamicModal-" + modal_id).find("#usuariosSelector option:selected").text());
        var actividades = $("#dynamicModal-" + modal_id).find("#lista_actividades").find('td.google-visualization-orgchart-node');
        for (var i = 0; i < actividades.length; i++) {

            if ($(actividades[i]).find("#pnl-avtividad").data("usuario") === "undefined") {
                $(actividades[i]).find("#pnl-avtividad").data("usuario", $("#dynamicModal-" + modal_id).find("#usuariosSelector").val());
                $(actividades[i]).find("#txt-usuario").empty();
                $(actividades[i]).find("#txt-usuario").append($("#dynamicModal-" + modal_id).find("#usuariosSelector option:selected").text());
            }
        }
    });

    //Buscar tipos de procesos
    GestionarProcesosCargarProcesos($("#dynamicModal-" + modal_id).find("#procesoSelector"), 'consulta_tipos_procesos');
    GestionarProcesosCargarProcesos($("#dynamicModal-" + modal_id).find("#localidadSelector"), 'consulta_localidades');

    GestionarProcesosMenuAsignarCargarUsuarios($("#dynamicModal-" + modal_id).find("#lista_actividades")[0], $("#dynamicModal-" + modal_id).find("#usuariosSelector"), 'consulta_usuarios_asignar_tarea', 'null', 'null');
}

function GestionarProcesosCargarProcesos(control, op, id, callback) {
    $.ajax({
        type: "POST",
        url: "GestionConsultas",
        dataType: "text",
        async: false,
        data: {op: op, id: id},
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
                if (callback) {
                    callback(res);
                }
            }
        }, error: function () {
            alert("No fué posible obtener las alternativas");
            if (callback) {
                callback("error");
            }
        }
    });
}


function GestionarProcesosVerDetalles(contenedor, proceso_id, modal_id) {
    $("#dynamicModal-" + modal_id).find("#panel-operaciones").hide();

    google.charts.load('current', {packages: ["orgchart"]});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Name');
        data.addColumn('string', 'Manager');
        data.addColumn('string', 'ToolTip');

        var objeto = {
            op: "consulta_actividades_proceso",
            proceso: proceso_id
        };
        $.ajax({
            type: "POST",
            url: "GestionConsultas",
            dataType: "text",
            async: true,
            data: objeto,
            success: function (response) {
                $(contenedor).empty();
                if (response)
                {
                    var res = eval('(' + response + ')');
                    if (res && res.total > 0) {
                        $("#dynamicModal-" + modal_id).find("#panel-operaciones").show();
                        for (var i = 0; i < res.data.length; i++) {
                            var f;

                            f = res.data[i].actividad
                                    + '<div style="font-size:0.6em;" id="txt-usuario">' + (res.data[i].usuario_nombre ? res.data[i].usuario_nombre : '') + '</div>'
                                    + '<div id="pnl-avtividad" style="font-size:0.6em;" data-usuario="' + res.data[i].usuario_defecto + '" data-proceso-id="' + res.data[i].proceso_id + '" data-actividad-id="' + res.data[i].tipo_actividad_id + '" >'
                                    + '  <a class="btn btn-default btn-asignar" data-proceso-id="' + res.data[i].proceso_id + '" data-actividad-id="' + res.data[i].tipo_actividad_id + '" title="Asignar a"><i class="fa fa-share" style="color: #f0ad4e; opacity: 0.6;"></i></a>'
                                    + '</div>';


                            data.addRow([
                                {
                                    v: res.data[i].tipo_actividad_id,
                                    f: f
                                },
                                res.data[i].actividad_previa,
                                ''
                            ]);

                            data.setRowProperty(i, 'style', 'opacity:1; border: 2px solid #b5d9ea; background: rgba(0, 0, 0, 0) linear-gradient(to bottom, #b5d9ea 0%, #b5d9ea 100%) repeat scroll 0 0; ');
                            data.setRowProperty(i, 'selectedStyle', 'opacity:1; border: 2px solid #b5d9ea; background: rgba(0, 0, 0, 0) linear-gradient(to bottom, #b5d9ea 0%, #b5d9ea 100%) repeat scroll 0 0; ');


                        }

                        // Create the chart.
                        var chart = new google.visualization.OrgChart(contenedor);
                        // Draw the chart, setting the allowHtml option to true for the tooltips.
                        google.visualization.events.addListener(chart, 'ready', function (e) {
                            $(contenedor).find(".btn-asignar").on('click', function (e) {
                                GestionarProcesosAbrirMenuAsignar($(e.currentTarget).parent(), $(e.currentTarget).data("proceso-id"), $(e.currentTarget).data("actividad-id"));
                            });
                        });
                        chart.draw(data, {allowHtml: true, size: 'large'});
                    } else {
                        $(contenedor).append("<h4>No hay actividades asociadas a este tipo de proceso</h4>");
                    }
                }
            }, error: function () {
                alert("No fué posible obtener las actividades");
            }
        });
    }
}

function GestionarProcesosAbrirMenuAsignar(contenedor, proceso_id, tipo_actividad_id) {
    var modal_id = Math.random().toString(36).substring(7);

    var html = '<div id="dynamicModal-' + modal_id + '" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="confirm-modal" aria-hidden="true">';
    html += '<div class="modal-dialog">';
    html += '<div class="modal-content">';
    html += '<div class="modal-header">';
    html += '<a class="close" data-dismiss="modal">×</a>';
    html += '<h4>Asignar a</h4>';
    html += '</div>';
    html += '<div class="modal-body">';

    html += '<form class="form" role="form" data-toggle="validator">' +
            '  <div class="form-group">' +
            '    <label for="usuarioSelector">Asignar A:</label><div class="clearfix"></div>' +
            '    <select class="form-control" id="usuarioSelector" required></select>' +
            '  </div>' +
            '</form>';

    html += '</div>';
    html += '<div class="modal-footer">';
    html += '  <span class="btn btn-primary" id="btnGuardarAsignarA">Guardar</span>';
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

    GestionarProcesosMenuAsignarCargarUsuarios(contenedor, $("#dynamicModal-" + modal_id).find("#usuarioSelector"), 'consulta_usuarios_asignar_tarea', proceso_id, tipo_actividad_id);

    $("#dynamicModal-" + modal_id).find("#btnGuardarAsignarA").on('click', function (e) {
        $("#dynamicModal-" + modal_id).modal('hide');
        $(contenedor).parent().find("#txt-usuario").empty();

        $(contenedor[0]).data("usuario", $("#dynamicModal-" + modal_id).find("#usuarioSelector").val());
        $(contenedor).parent().find("#txt-usuario").append($("#dynamicModal-" + modal_id).find("#usuarioSelector option:selected").text());
    });
}

function GestionarProcesosMenuAsignarCargarUsuarios(contenedor, control, op, proceso_id, tipo_actividad_id) {
    $.ajax({
        type: "POST",
        url: "GestionConsultas",
        dataType: "text",
        async: false,
        data: {op: op, proceso_id: proceso_id, tipo_actividad_id: tipo_actividad_id},
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

function GestionarProcesosPonerEnProceso(contenedor, proceso_id, tipo_actividad_id, parent_modal_id) {
    $.ajax({
        type: "POST",
        url: "GestionDML",
        dataType: "text",
        async: false,
        data: {op: "ActualizarTareaEnProceso", proceso_id: proceso_id, tipo_actividad_id: tipo_actividad_id},
        success: function (response) {
            if (response)
            {
                var res = eval('(' + response + ')');
                if (res && res.total > 0) {
                    $("#dynamicModal-" + parent_modal_id).modal('hide');
                    gantt.message("Tarea actualizada");
                    IniciarGestionarProcesos(contenedor);
                    GestionarProcesosVerDetalles(contenedor, proceso_id, tipo_actividad_id);
                }
            }
        }, error: function () {
            alert("No fué posible obtener las alternativas");
        }
    });
}
function GestionarProcesosMarcarCompletada(contenedor, proceso_id, tipo_actividad_id, parent_modal_id) {
    $.ajax({
        type: "POST",
        url: "GestionDML",
        dataType: "text",
        async: false,
        data: {op: "ActualizarTareaCompletada", proceso_id: proceso_id, tipo_actividad_id: tipo_actividad_id},
        success: function (response) {
            if (response)
            {
                var res = eval('(' + response + ')');
                if (res && res.total > 0) {
                    $("#dynamicModal-" + parent_modal_id).modal('hide');
                    gantt.message("Tarea Completada");
                    IniciarGestionarProcesos(contenedor);
                }
            }
        }, error: function () {
            alert("No fué posible obtener las alternativas");
        }
    });
}