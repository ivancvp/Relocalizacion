/* global gantt, usuario_login, URL_IMPRIMIR */

$.editable.addInputType('datepicker', {
    element: function (settings, original) {
        var input = $('<input>');
        if (settings.width !== 'none') {
            input.width(settings.width);
        }
        if (settings.height !== 'none') {
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

var GraficoResolucionesMemorandosEventos = [];
var GraficoResolucionesMemorandosListaContratos;

function GraficoResolucionesMemorandos(id_solicitud, rowId, contenedor_id, entrega_vivienda) {
    //prevenirCierre = true;
    //ocultarPaneles();

    for (var i = 0; i < GraficoResolucionesMemorandosEventos.length; i++) {
        gantt.detachEvent(GraficoResolucionesMemorandosEventos[i]);
    }

    if (!$(".details-" + rowId).find("#" + contenedor_id).is(":visible")) {

        GraficoResolucionesMemorandosListaContratos = null;
        var fechas_contratos = [];

        $.ajax({
            type: "POST",
            url: "GestionConsultas",
            dataType: "text",
            async: false,
            data: {op: "consulta_contratos_identificador", IDENTIFICADOR: id_solicitud, _c: Math.random()},
            success: function (response) {
                if (response) {
                    var res = eval('(' + response + ')');
                    if (res && res.total > 0) {
                        GraficoResolucionesMemorandosListaContratos = res.data;
                        for (var i = 0; i < res.data.length; i++) {

                            fechas_contratos.push(new Date(res.data[i].cont_fecha_inicio));
                            fechas_contratos.push(new Date(res.data[i].cont_fecha_fin));
                        }
                    }
                }
            }, error: function () {
                alert("No fué posible consultar los contratos");
            }
        });


        ConfigurarGraficoResolucionesMemorandos(entrega_vivienda);

        $(".details-" + rowId).find("#" + contenedor_id).show();
        $(".details-" + rowId).find("#" + contenedor_id).empty();
        $(".details-" + rowId).find("#" + contenedor_id).append("<div id='grafico-resoluciones' style='height:300px;'></div>");


        var resoluciones_gantt = $(".details-" + rowId).find("#" + contenedor_id).find("#grafico-resoluciones").dhx_gantt({
            data: null,
            columns: [
                {name: "text", label: "Resolución / Memorando", width: "150", tree: true},
                {
                    name: "buttons",
                    label: JSON.parse(jQuery('#scriptFormularioGraficoResolucionesMemorandos').html())['crearResolucion'] ? '<div class="gantt_grid_head_cell gantt_grid_head_add" onclick="nuevaResolucion(\'' + id_solicitud + '\')"></div>' : '',
                    width: 105,
                    template: function (task) {
                        if (task && task.tipo && task.tipo === "resolucion") {

                            return '<i class="fa gantt_button_grid gantt_grid_add fa-print" onclick="clickGridButton(\'' + task.id + '\', \'imprimir_resolucion\', \'' + id_solicitud + '\')"></i>' +
                                    (JSON.parse(jQuery('#scriptFormularioGraficoResolucionesMemorandos').html())['crearNotificacion'] ? '<i class="fa gantt_button_grid gantt_grid_edit fa-bell-o" identi="' + task.identificador + '" usuario="' + usuario_login + '"  res="' + task.id_resolucion + '" title="Notificar Resolucion" ' + (task.notificada ? ' style="color: blue; text-shadow: 1px 1px 1px blue;" onclick="imprimirNotificacion(' + task.id_resolucion + ')"' : ' style="color: red; text-shadow: 1px 1px 1px red;" onclick="abrirModal(this)"></i>') : '') +
                                    (JSON.parse(jQuery('#scriptFormularioGraficoResolucionesMemorandos').html())['editarResolucion'] ? '<i class="fa gantt_button_grid gantt_grid_edit fa-pencil" title="Editar Resolucion" onclick="nuevaResolucion(\'' + id_solicitud + '\',\'' + task.id + '\' )"></i>' : '') +
                                    (JSON.parse(jQuery('#scriptFormularioGraficoResolucionesMemorandos').html())['crearMemorando'] ? '<i class="fa gantt_button_grid gantt_grid_add fa-plus" title="Nuevo Memorando" onclick="FormularioGraficoResolucionesMemorandosNuevoMemorando(\'' + id_solicitud + '\', \'' + task.id + '\',null,\'' + entrega_vivienda + '\')"></i>' : '') +
                                    (JSON.parse(jQuery('#scriptFormularioGraficoResolucionesMemorandos').html())['eliminarResolucion'] ? '<i class="fa gantt_button_grid gantt_grid_delete fa-times" title="Eliminar Resolucion" onclick="FormularioGraficoResolucionesMemorandosEliminarResolucion(\'' + task.id + '\', \'' + id_solicitud + '\')"></i>' : '')
                                    ;
                        } else if (task && task.tipo && task.tipo === "memorando") {
                            return (
                                    '<i class="fa gantt_button_grid gantt_grid_add fa-print" onclick="clickGridButton(' + task.id + ', \'print\', \'' + id_solicitud + '\')"></i>' +
                                    (JSON.parse(jQuery('#scriptFormularioGraficoResolucionesMemorandos').html())['editarMemorando'] ? '<i class="fa gantt_button_grid gantt_grid_edit fa-pencil" title="Editar Memorando" onclick="FormularioGraficoResolucionesMemorandosNuevoMemorando(\'' + id_solicitud + '\', \'' + task.parent + '\', \'' + task.id + '\',\'' + entrega_vivienda + '\')"></i>' : '') +
                                    (JSON.parse(jQuery('#scriptFormularioGraficoResolucionesMemorandos').html())['eliminarMemorando'] ? '<i class="fa gantt_button_grid gantt_grid_delete fa-times" title="Eliminar Memorando" onclick="clickGridButton(' + task.id + ', \'delete\', \'' + id_solicitud + '\')"></i>' : '')
                                    );
                        } else if (task && task.tipo && task.tipo === "modificada") {
                            return (
                                    ''
//                                    +'<i class="fa gantt_button_grid gantt_grid_add fa-print" onclick="clickGridButton(' + task.id + ', \'print\', \'' + id_solicitud + '\')"></i>'

                                    );

                        } else if (task && task.tipo && task.tipo === "revocatoria") {
                            return (
                                    '<i class="fa gantt_button_grid gantt_grid_add fa-print" onclick="clickGridButton(' + task.id + ', \'imprimir_revocatoria\', \'' + id_solicitud + '\')"></i>'
                                    + '<i class="fa gantt_button_grid gantt_grid_edit fa-pencil" onclick="clickGridButton(' + task.id + ', \'editar_revocatoria\', \'' + id_solicitud + '\')"></i>'

                                    );
                        }

                    }
                }
            ],
            drag_resize: true,
            drag_links: false,
            drag_move: true,
            drag_progress: false,
            readonly: false,
            select_task: false,
            min_column_width: 50,
            show_unscheduled: true,
            scale_unit: 'year',
            date_scale: "%Y",
            duration_unit: 'month',
            subscales: [
                {unit: "month", step: 1, date: "%M"}
            ],
            lightbox: {
                sections: [
                    {
                        name: "parent",
                        type: "parent",
                        allow_root: "false",
                        root_label: "Seleccione...",
                        filter: function (id, task) {
                            if (task.$level > 0) {
                                return false;
                            } else {
                                return true;
                            }
                        }
                    },
                    {name: "period", type: "time", map_to: "auto", year_range: [1990, 2025]},
                    {name: "cdp", height: 30, map_to: "cdp", type: "textarea"},
                    {name: "crp", height: 30, map_to: "crp", type: "textarea"},
                    {name: "cordis", height: 30, map_to: "cordis", type: "textarea"}
                    //{name: "time", type: "time", map_to: "auto", time_format: ["%d", "%m", "%Y", "%H:%i"]}
                ],
                resolucion_sections: [
                    {name: "period", type: "time", map_to: "auto"}
                ]
            },
            quickinfo_buttons: ["icon_delete", "icon_edit", "advanced_details_button"]
        });

        resoluciones_gantt.clearAll();
        /*
         resoluciones_gantt.form_blocks.parent.set_value = function (node, value, ev) {
         if (ev.tipo === "resolucion") {
         node.style.display = "none";
         node.previousSibling.style.display = "none";
         resoluciones_gantt.resizeLightbox();
         } else {
         node.style.display = "";
         node.previousSibling.style.display = "";
         resoluciones_gantt.resizeLightbox();
         }
         };*/

        resoluciones_gantt.form_blocks.textarea.set_value = function (node, value, ev) {
            node.firstChild.value = value || "";
            if (ev.tipo === "resolucion") {
                node.style.display = "none";
                node.previousSibling.style.display = "none"; //section header
                resoluciones_gantt.resizeLightbox();
            } else {
                node.style.display = "";
                node.previousSibling.style.display = ""; //section header
                resoluciones_gantt.resizeLightbox();
            }
        };
        /**
         * pendiente
         */
        /*
         resoluciones_gantt.form_blocks.parent.set_value = function (t, e, n, a) {
         var i = document.createElement("div");
         i.innerHTML = gantt.form_blocks.parent._display(a, n.id);
         var s = i.removeChild(i.firstChild);
         if (n.tipo === "resolucion") {
         t.style.display = "none";
         t.previousSibling.style.display = "none"; //section header
         resoluciones_gantt.resizeLightbox();
         return;
         } else {
         t.style.display = "";
         t.previousSibling.style.display = ""; //section header
         resoluciones_gantt.resizeLightbox();
         }
         return t.onselect = null, t.parentNode.replaceChild(s, t), gantt.form_blocks.select.set_value.apply(gantt, [s, e, n, a])
         };
         /*
         
         
         /*
         resoluciones_gantt.form_blocks.parent.set_value = function (node, value, ev) {
         node.firstChild.value=value||"";
         if (ev.tipo === "resolucion") {
         node.style.display = "none";
         node.previousSibling.style.display = "none"; //section header
         resoluciones_gantt.resizeLightbox();
         } else {
         node.style.display = "";
         node.previousSibling.style.display = ""; //section header
         resoluciones_gantt.resizeLightbox();
         }
         };*/


        resoluciones_gantt.config.types["resolucion"] = "resolucion";
        resoluciones_gantt.locale.labels["type_resolucion"] = "resolucion";

        resoluciones_gantt.config.lightbox["resolucion_sections"] = [
            {name: "period", type: "time", map_to: "auto"}
        ];

        resoluciones_gantt.locale.labels["advanced_details_button"] = "Imprimir";
        resoluciones_gantt.locale.labels["section_parent"] = "Resolución";
        resoluciones_gantt.locale.labels["section_period"] = "Periodo a pagar";
        resoluciones_gantt.locale.labels["section_cdp"] = "CDP";
        resoluciones_gantt.locale.labels["section_crp"] = "CRP";
        resoluciones_gantt.locale.labels["section_cordis"] = "Cordis";



        GraficoResolucionesMemorandosEventos.push(resoluciones_gantt.attachEvent("onBeforeLightbox", function (id) {
            var task = resoluciones_gantt.getTask(id);
            /*
             task.start_date = new Date(2016, 6, 1);
             task.end_date = new Date(2016, 6, 31);
             */
            return true;
        }));

        GraficoResolucionesMemorandosEventos.push(resoluciones_gantt.attachEvent("onBeforeTaskDrag", function (id, mode, e) {
            var task = resoluciones_gantt.getTask(id);
            if (task.tipo === "resolucion") {
                return false;
            }
            return true;
        }));
        GraficoResolucionesMemorandosEventos.push(resoluciones_gantt.attachEvent("onMouseOver", function (id, mode, e) {
            var task = resoluciones_gantt.getTask(id);
            if (task.tipo === "memorando") {

//                $(".memorando").tooltip();
            }
            return true;
        }));

        GraficoResolucionesMemorandosEventos.push(resoluciones_gantt.attachEvent("onTaskDrag", function (id, mode, task, original, e) {
            var parent = task.parent ? resoluciones_gantt.getTask(task.parent) : null,
                    children = resoluciones_gantt.getChildren(id),
                    modes = resoluciones_gantt.config.drag_mode;
            var limitLeft = null,
                    limitRight = null;
            if (!(mode === modes.move || mode === modes.resize))
                return;
            if (mode === modes.move) {
                limitLeft = limitMoveLeft;
                limitRight = limitMoveRight;
            } else if (mode === modes.resize) {
                limitLeft = limitResizeLeft;
                limitRight = limitResizeRight;
            }

            //check parents constraints
            if (parent && +parent.end_date < +task.end_date) {
                limitLeft(task, parent);
            }
            if (parent && +parent.start_date > +task.start_date) {
                limitRight(task, parent);
            }

            //check children constraints
            for (var i = 0; i < children.length; i++) {
                var child = resoluciones_gantt.getTask(children[i]);
                if (+task.end_date < +child.end_date) {
                    limitLeft(task, child);
                } else if (+task.start_date > +child.start_date) {
                    limitRight(task, child);
                }
            }

            task.tipo = "no_guardado";
            task.text = "(No guardado)";
            resoluciones_gantt.message({
                id: "myBox",
                text: "Los cambios no han sido almacenados. haga click en el memorando y seleccione \"editar\" para guardar los cambios"
            });
        }));

        GraficoResolucionesMemorandosEventos.push(resoluciones_gantt.attachEvent("onBeforeTaskDelete", function (id, item) {
            if (item.tipo === "resolucion") {
                //resoluciones_gantt.message({type: "error", text: "Las resoluciones no pueden ser eliminadas"});
                return true;
            } else if (item.tipo === "memorando") {
                return true;
            }
        }));

        GraficoResolucionesMemorandosEventos.push(resoluciones_gantt.attachEvent("onAfterTaskDelete", function (id, item) {
            if (item.tipo === "resolucion") {
                //resoluciones_gantt.message({type: "error", text: "Las resoluciones no pueden ser eliminadas"});
            } else if (item.tipo === "memorando") {
                var datos = {
                    op: "Eliminar_Memorando_desde_grafico",
                    id: item.id,
                    IDENTIFICADOR: id_solicitud
                };
                $.ajax({
                    type: "POST",
                    url: "GestionDML",
                    dataType: "text",
                    async: false,
                    data: datos,
                    success: function (response) {
                        if (response)
                        {
                            var res = eval('(' + response + ')');
                            if (res && res.total > 0) {
                                resoluciones_gantt.message("Memorando eliminado correctamente");
                            }
                        }
                    }, error: function () {
                        resoluciones_gantt.message({type: "error", text: "No fué posible eliminar el nuevo memorando"});
                    }
                });
            }
        }));


        GraficoResolucionesMemorandosEventos.push(resoluciones_gantt.attachEvent("onTaskCreated", function (task) {
            var parent = task.parent,
                    types = gantt.config.types,
                    level = 0;

            if (parent === gantt.config.root_id || !parent) {
                level = 0;
            } else {
                level = gantt.getTask(task.parent).$level + 1;
            }

            switch (level) {
                case 0:
                    task.type = "resolucion";
                    break;
                case 1:
                    task.type = "memorando";
                    break;
            }
            return true;
        }));

        GraficoResolucionesMemorandosEventos.push(resoluciones_gantt.attachEvent("onLightboxSave", function (id, item) {
            if (item.tipo === "resolucion") {
                var datos = {
                    op: "editar_resolucion_desde_grafico",
                    id: item.id,
                    IDENTIFICADOR: id_solicitud,
                    fecha_inicio: $.datepicker.formatDate('dd/mm/yy', item.start_date),
                    fecha_fin: $.datepicker.formatDate('dd/mm/yy', item.end_date)
                };
                //Guardar en la bd
                var estado = false;
                $.ajax({
                    type: "POST",
                    url: "GestionDML",
                    dataType: "text",
                    async: false,
                    data: datos,
                    success: function (response) {
                        if (response)
                        {
                            var res = eval('(' + response + ')');
                            if (res && res.total > 0) {
                                estado = true;
                                resoluciones_gantt.message("Se han guardado los cambios en la resolución");
                            } else {
                                resoluciones_gantt.message({type: "error", text: "No fué posible almacenar los cambios en la resolución"});
                                estado = false;
                            }
                        }
                    }, error: function () {
                        resoluciones_gantt.message({type: "error", text: "No fué posible almacenar los cambios en la resolución"});
                        estado = false;
                    }
                });
                return estado;
            } else {
                if (!item.parent) {
                    resoluciones_gantt.message({type: "error", text: "Debe seleccionar una resolucion"});
                    return false;
                } else {
                    var parent = resoluciones_gantt.getTask(item.parent);
                    if (parent.end_date < +item.end_date) {
                        resoluciones_gantt.message({type: "error", text: "La resolucion no cubre el periodo seleccionado"});
                        return false;
                    }
                    if (parent.start_date > +item.start_date) {
                        resoluciones_gantt.message({type: "error", text: "La resolucion no cubre el periodo seleccionado"});
                        return false;
                    }
                }
                item.tipo = "memorando";
                item.text = "Nuevo memorando";
                var datos = {
                    op: "GuardarNuevoMemorando_desde_grafico",
                    id: item.id,
                    IDENTIFICADOR: id_solicitud,
                    RESOLUCION: item.parent,
                    cdp_numero: item.cdp,
                    crp_numero: item.crp,
                    cordis: item.cordis,
                    "INI-PAGO": $.datepicker.formatDate('dd/mm/yy', item.start_date),
                    "FN-PAGO": $.datepicker.formatDate('dd/mm/yy', item.end_date)
                };
                //Guardar en la bd
                var estado = false;
                $.ajax({
                    type: "POST",
                    url: "GestionDML",
                    dataType: "text",
                    async: false,
                    data: datos,
                    success: function (response) {
                        if (response)
                        {
                            var res = eval('(' + response + ')');
                            if (res && res.total > 0) {
                                estado = true;
                                item.text = item.cordis ? item.cordis : item.parent;
                                item.usuario = usuario_login;
                                resoluciones_gantt.message("Memorando almacenado correctamente");
                            }
                        }
                    }, error: function () {
                        resoluciones_gantt.message({type: "error", text: "No fué posible almacenar el nuevo memorando"});
                        estado = false;
                    }
                });
                return estado;
            }
        }));


        //Dibujar contratos
        GraficoResolucionesMemorandosEventos.push(resoluciones_gantt.attachEvent("onGanttReady", function () {
            resoluciones_gantt.addTaskLayer(function (task) {
                if (GraficoResolucionesMemorandosListaContratos && GraficoResolucionesMemorandosListaContratos.length > 0) {
                    contratos_graficados = true;
                    var salida = "<div id='contenedor-contratos-grafico' class='contenedor-contratos-grafico'>";
                    for (var i = 0; i < GraficoResolucionesMemorandosListaContratos.length; i++) {
                        var contrato = GraficoResolucionesMemorandosListaContratos[i];
                        var inicio = new Date(contrato.cont_fecha_inicio);
                        var fin = new Date(contrato.cont_fecha_fin);
                        var sizes = resoluciones_gantt.getTaskPosition(task, inicio, fin);
                        if (sizes.width > 0) {
                            //var el = "<div data-id=" + contrato.claveunida + " class='baseline' style='left:" + sizes.left + "px; width:" + sizes.width + "px; line-height:10px; font-size:10px; text-align: center; vertical-align: middle; z-index: 10; margin-top: 0; top: " + (sizes.top + resoluciones_gantt.config.task_height + 30) + "px';> Contrato " + contrato.consecontrato + "</div>";
                            var el = "<div data-claveunida='" + contrato.claveunida + "' data-consecontrato='" + contrato.consecontrato + "' data-cont_fecha_fin='" + contrato.cont_fecha_fin + "' data-cont_fecha_inicio='" + contrato.cont_fecha_inicio + "' data-cuenta_banco='" + contrato.cuenta_banco + "' data-cuenta_numero='" + contrato.cuenta_numero + "' data-cuenta_tipo='" + contrato.cuenta_tipo + "' data-identificador='" + contrato.identificador + "' data-titular_cedula='" + contrato.titular_cedula + "' data-titular_nombre='" + contrato.titular_nombre + "' data-valor_ayuda_mes='" + contrato.valor_ayuda_mes + "' class='baseline' style='left:" + sizes.left + "px; width:" + sizes.width + "px; line-height:10px; font-size:10px; text-align: center; vertical-align: middle; z-index: 10; margin-top: 0; '> Contrato " + contrato.consecontrato + "</div>";
                            salida += el;
                        }
                    }
                    //salida += "<div class='entrega-vivienda' left:12.986111111111112px; width:585.0649641577061px; line-height:10px; font-size:10px; text-align: center; vertical-align: middle; z-index: 10; margin-top: 0; top: 30px>aaa</div> </div>";
                    salida += "</div>";
                    return $(salida)[0];
                }
                return false;
            });
        }));

        //Ver detalles contratos
        GraficoResolucionesMemorandosEventos.push(resoluciones_gantt.attachEvent("onGanttRender", function () {
            $(".baseline").on("click", function (e) {
                var modal_id = Math.random().toString(36).substring(7);
                var html = '<div id="dynamicModal-' + modal_id + '" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="confirm-modal" aria-hidden="true">';
                html += '<div class="modal-dialog">';
                html += '<div class="modal-content panel-default">';
                html += '<div class="modal-header panel-heading">';
                html += '<a class="close" data-dismiss="modal">×</a>';
                html += '<h4>Contrato</h4>';
                html += '</div>';
                html += '<div class="modal-body">';

                html += '  <div class="form-group"><label class="control-label">Identificador: </label><input class="form-control" readonly value="' + $(e.currentTarget).data('identificador') + '"></div>';
                html += '  <div class="form-group"><label class="control-label">Contrato número: </label><input class="form-control" readonly value="' + $(e.currentTarget).data('consecontrato') + '"></div>';
                html += '  <div class="form-group"><label class="control-label">Clave unida: </label><input class="form-control" readonly value="' + $(e.currentTarget).data('claveunida') + '"></div>';
                html += '<hr>';
                html += '  <div class="form-group"><label class="control-label">Fecha Inicio: </label><input class="form-control" readonly value="' + $(e.currentTarget).data('cont_fecha_inicio') + '"></div>';
                html += '  <div class="form-group"><label class="control-label">Fecha Fin: </label><input class="form-control" readonly value="' + $(e.currentTarget).data('cont_fecha_fin') + '"></div>';
                html += '  <div class="form-group"><label class="control-label">Valor Ayuda: </label><input class="form-control" readonly value="' + $(e.currentTarget).data('valor_ayuda_mes') + '"></div>';
                html += '<hr>';
                html += '  <div class="form-group"><label class="control-label">Titular: </label><input class="form-control" readonly value="' + $(e.currentTarget).data('titular_nombre') + '"></div>';
                html += '  <div class="form-group"><label class="control-label">Cédula Titular: </label><input class="form-control" readonly value="' + $(e.currentTarget).data('titular_cedula') + '"></div>';
                html += '  <div class="form-group"><label class="control-label">Número de cuenta: </label><input class="form-control" readonly value="' + $(e.currentTarget).data('cuenta_numero') + '"></div>';
                html += '  <div class="form-group"><label class="control-label">Tipo de cuenta: </label><input class="form-control" readonly value="' + $(e.currentTarget).data('cuenta_tipo') + '"></div>';
                html += '  <div class="form-group"><label class="control-label">Banco: </label><input class="form-control" readonly value="' + $(e.currentTarget).data('cuenta_banco') + '"></div>';

                html += '<div class="modal-footer">';
                html += '<span class="btn btn-default" data-dismiss="modal">Cerrar</span>';
                html += '</div>';  // content
                html += '</div>';  // dialog
                html += '</div>';  // footer
                html += '</div>';  // modalWindow
                $('body').append(html);
                $("#dynamicModal-" + modal_id).modal();
                $("#dynamicModal-" + modal_id).modal('show');

                $("#dynamicModal-" + modal_id).on('hidden.bs.modal', function (e) {
                    $(this).remove();
                });
            });
        }));


        $.ajax({
            type: "POST",
            url: "GestionConsultas",
            dataType: "text",
            async: false,
            data: {op: "consulta_arbol_resoluciones_memorandos", IDENTIFICADOR: id_solicitud, _c: Math.random()},
            success: function (response) {
                if (response)
                {
                    var res = eval('(' + response + ')');
                    if (res && res.total > 0) {
                        var datos = [];
                        for (var i = 0; i < res.data.length; i++) {

                            fechas_contratos.push(new Date(res.data[i].fecha_inicio.replace(/(\d{2})-(\d{2})-(\d{4})/, "$3/$2/$1")));
                            fechas_contratos.push(new Date(res.data[i].fecha_fin.replace(/(\d{2})-(\d{2})-(\d{4})/, "$3/$2/$1")));
                            var tipo = '';
                            if (res.data[i].revocatoria) {
                                tipo = "revocatoria";
                            } else {
                                tipo = res.data[i].res_modificatoria ? "modificada" : "resolucion";
                            }
                            datos.push({
                                id: res.data[i].resolucion,
                                text: res.data[i].resolucion,
                                start_date: res.data[i].fecha_inicio,
                                end_date: res.data[i].fecha_fin,
                                tipo: tipo,
                                type: tipo,
                                id_resolucion: res.data[i].id_resolucion,
                                identificador: res.data[i].identificador,
                                fechaResolucion: res.data[i].fecha_resolucion,
                                cdp_id: res.data[i].cdp_id,
                                cdp_numero: res.data[i].cdp_numero,
                                crp: res.data[i].crp_numero,
                                fechaCRP: res.data[i].crp_fecha,
                                observaciones: res.data[i].resolucion_observaciones,
                                modificada: res.data[i].res_modificatoria ? true : false,
                                notificada: res.data[i].res_notificada ? true : false,
                                tipo_mod: res.data[i].tipo_mod,
                                justificacion: res.data[i].justificacion ? res.data[i].justificacion : '',
                                revocatoria: res.data[i].revocatoria ? res.data[i].revocatoria : '',
                                readonly: true,
                                open: true
                            });
                            if (res.data[i].memorando && res.data[i].memorando !== "[null]") {
                                var memorandos = eval(res.data[i].memorando);
                                for (var j = 0; j < memorandos.length; j++) {
                                    var memorando = memorandos[j];
                                    datos.push({
                                        id: memorando.id, //memorando.chart_id ? memorando.chart_id : memorando.id,
                                        chart_id: memorando.chart_id,
                                        parent: memorando.resolucion,
                                        text: memorando.cordis ? memorando.cordis : memorando.resolucion,
//                                        text: memorando.cordis ? memorando.cordis+"("+ memorando.memorando_fecha+")" : memorando.resolucion+"(" + memorando.memorando_fecha+")",
                                        start_date: memorando.inicio_pago,
                                        end_date: memorando.fin_pago,
                                        fecha: memorando.memorando_fecha,
                                        cdp: memorando.cdp,
                                        crp: memorando.crp,
                                        cordis: memorando.cordis,
                                        ties_mem_id: memorando.ties_mem_id,
                                        usuario: memorando.memorando_user,
                                        tipo: "memorando",
                                        readonly: true,
                                        open: true
                                    });
                                }
                            }
                        }
                        /*
                         datos.push({
                         id: "aaaa",
                         text: "prueba entrega de vivienda",
                         start_date: "14-04-2016",
                         tipo: "entrega",
                         readonly: true
                         });
                         */

                        var maxDate = new Date(Math.max.apply(null, fechas_contratos));
                        var minDate = new Date(Math.min.apply(null, fechas_contratos));

                        resoluciones_gantt.config.start_date = minDate;
                        resoluciones_gantt.config.end_date = maxDate;

                        $(".details-" + rowId).find("#" + contenedor_id).find("#grafico-resoluciones").dhx_gantt().parse({data: datos});
                    } else {

                        var maxDate = new Date(Math.max.apply(null, fechas_contratos));
                        var minDate = new Date(Math.min.apply(null, fechas_contratos));

                        resoluciones_gantt.config.start_date = minDate;
                        resoluciones_gantt.config.end_date = maxDate;

                        $(".details-" + rowId).find("#" + contenedor_id).find("#grafico-resoluciones").dhx_gantt().parse({data: [{
                                    id: "dummy_task_0",
                                    text: "Sin resoluciones",
                                    readonly: true,
                                    start_date: minDate,
                                    end_date: maxDate,
                                    tipo: "dummy"
                                }]});
                    }
                }
            },
            error: function () {
                alert("No fué posible obtener las alternativas");
            }
        });
    } else {
        $(".details-" + rowId).find("#" + contenedor_id).hide();
    }
}


function ConfigurarGraficoResolucionesMemorandos(entrega_vivienda) {
    gantt.templates.rightside_text = function (start, end, task) {
        if (task.type === gantt.config.types.milestone) {
            return task.text;
        }
        return "";
    };
    gantt.templates.tooltip_text = function (start, end, task) {
        if (task.tipo === "memorando") {
            return "<b>Nº:</b> " + task.text + "<br/><b>fecha:</b> " + task.fecha;
        } else {
            return "<b>Nº:</b> " + task.text + "<br/><b>fecha:</b> " + task.fechaResolucion;
        }
    };
    function createBox(sizes, class_name) {
        var box = document.createElement('div');
        box.style.cssText = [
            "height:" + sizes.height + "px",
            "line-height:" + sizes.height + "px",
            "width:" + sizes.width + "px",
            "top:" + sizes.top + 'px',
            "left:" + sizes.left + "px",
            "position:absolute"
        ].join(";");
        box.className = class_name;
        return box;
    }

    gantt.templates.grid_row_class = gantt.templates.task_class = function (start, end, task) {
        var css = [];
        if (gantt.hasChild(task.id)) {
            css.push("task-parent");
        }
        if (!task.$open && gantt.hasChild(task.id)) {
            css.push("task-collapsed");
        }
        if (task.tipo === 'memorando' || task.tipo === 'no_guardado') {
            css.push("task-memorando");
        }
        if (task.tipo === 'revocatoria') {
            css.push("revocatoria");
        }
        return css.join(" ");
    };

    gantt.templates.task_cell_class = function (item, date) {
        if (date > new Date(entrega_vivienda)) {
            return "entrega-vivienda";
        }
    };

    /*
     gantt.addTaskLayer(function show_hidden(task) {
     if (!task.$open && gantt.hasChild(task.id)) {
     var sub_height = gantt.config.row_height - 5,
     el = document.createElement('div'),
     sizes = gantt.getTaskPosition(task);
     var sub_tasks = gantt.getChildren(task.id);
     var child_el;
     for (var i = 0; i < sub_tasks.length; i++) {
     var child = gantt.getTask(sub_tasks[i]);
     var child_sizes = gantt.getTaskPosition(child);
     child_el = createBox({
     height: sub_height,
     top: sizes.top,
     left: child_sizes.left,
     width: child_sizes.width
     }, "child_preview gantt_task_line");
     child_el.innerHTML = child.text;
     el.appendChild(child_el);
     }
     return el;
     }
     return false;
     });
     */


    gantt.templates.task_class = function (start, end, task) {
        switch (task.tipo) {
            case "resolucion":
                return "resolucion";
                break;
            case "memorando":
                return "memorando";
                break;
            case "modificado":
                return "modificado";
                break;
            case "revocatoria":
                return "revocatoria";
                break;
            case "no_guardado":
                return "no_guardado";
                break;
            case "dummy":
                return "dummy";
                break;
                /*case "entrega":
                 return "entrega";
                 break;*/
        }
    };
}

function limitMoveLeft(task, limit) {
    var dur = task.end_date - task.start_date;
    task.end_date = new Date(limit.end_date);
    task.start_date = new Date(+task.end_date - dur);
}
function limitMoveRight(task, limit) {
    var dur = task.end_date - task.start_date;
    task.start_date = new Date(limit.start_date);
    task.end_date = new Date(+task.start_date + dur);
}

function limitResizeLeft(task, limit) {
    task.end_date = new Date(limit.end_date);
}
function limitResizeRight(task, limit) {
    task.start_date = new Date(limit.start_date);
}

function imprimirTask(id, id_solicitud) {
    var task = gantt.getTask(id);


    var alertas = [];
    if (!task.ties_mem_id) {
        alertas.push('Debe actualizar el estado del memorando antes de imprimirlo');
    }
    if (task.ties_mem_id && task.ties_mem_id.toString() !== '1') {
        alertas.push('El memorando ya fué impreso, para imprimirlo nuevamente, cambie su estado a "Proyectado"');
    }
    if (alertas.length > 0) {
        var modal_id = Math.random().toString(36).substring(7);
        var html = '<div id="dynamicModal-' + modal_id + '" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="confirm-modal" aria-hidden="true">';
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
        $("#dynamicModal-" + modal_id).modal();
        $("#dynamicModal-" + modal_id).modal('show');

        $("#dynamicModal-" + modal_id).on('hidden.bs.modal', function (e) {
            $(this).remove();
        });

        return;
    }


    var inicio = $.datepicker.formatDate('dd/mm/yy', task.start_date);
    var fin = $.datepicker.formatDate('dd/mm/yy', new Date(new Date(task.start_date).setMonth(task.start_date.getMonth() + task.duration) - 1));
    var data = {
        IDENTIFICADOR: id_solicitud,
        RESOLUCION: task.parent,
        cdp_numero: task.cdp,
        crp_numero: task.crp,
        usuario: task.usuario,
        memorando_id: task.id,
        "INI-PAGO": inicio,
        "FN-PAGO": fin
    };
    $.ajax({
        type: "POST",
        url: URL_IMPRIMIR + "pdf/imprimir_memorando.php",
        dataType: "text",
        data: data,
        success: function (response) {
            if (response)
            {
                window.open(URL_IMPRIMIR + "pdf/" + response, "_blank");
            }
        }, error: function () {
            alert("No fué posible obtener almacenar la información");
        }
    });
}


function editarResolucionGrafico(id, action, id_solicitud) {

}

function clickGridButton(id, action, id_solicitud) {
    switch (action) {
        case "edit":
            gantt.showLightbox(id);
            break;
        case "add":
            gantt.createTask(null, id);
            break;
        case "delete":
            gantt.confirm({
                title: gantt.locale.labels.confirm_deleting_title,
                text: gantt.locale.labels.confirm_deleting,
                callback: function (res) {
                    if (res)
                        gantt.deleteTask(id);
                }
            });
            break;
        case "print":
            imprimirTask(id, id_solicitud);
            break;
        case "imprimir_resolucion":
            FormularioGraficoResolucionesMemorandosImprimirResolucion(id, id_solicitud);
            break;
        case "imprimir_revocatoria":
            ImprimirRevocatoria(id, id_solicitud);
            break;
        case "editar_revocatoria":
            EditarRevocatoria(id, id_solicitud);
            break;
    }
}
function tiposModificacion() {
    var data = {
        'op': "modificatorias"
    };
    var opciones = "<option value=\"0\">...</option>";
    $.ajax({
        type: "POST",
        url: "GestionConsultas",
        dataType: "text",
        data: data,
        async: false,
        success: function (response) {
            if (response) {
                var res = eval('(' + response + ')');
                for (var i = 0; i < res.data.length; i++) {
                    opciones = opciones + "<option value=\"" + res.data[i].id_tipo_modificacion + "\">" + res.data[i].modificcion + "</option>";
                }
            }
        }
    });

    return opciones;
}
function tiposRevocatoria() {
    var data = {
        'op': "revocatorias"
    };
    var opciones = "<option value=\"0\">...</option>";
    $.ajax({
        type: "POST",
        url: "GestionConsultas",
        dataType: "text",
        data: data,
        async: false,
        success: function (response) {
            if (response) {
                var res = eval('(' + response + ')');
                for (var i = 0; i < res.data.length; i++) {
                    opciones = opciones + "<option value=\"" + res.data[i].id_tipo_revocatoria + "\">" + res.data[i].tipo + "</option>";
                }
            }
        }
    });

    return opciones;
}
function notificarResolucion(identificador, taskId) {
    var modal = $.Notificacion();

    modal.show();
    var task = {};
    if (taskId) {
        task = gantt.getTask(taskId);
    }

}

function nuevaResolucion(identificador, taskId) {
    var modal_id = Math.random().toString(36).substring(7);
    var task = {};
    if (taskId) {
        task = gantt.getTask(taskId);
    }
    var tipoModificacion = tiposModificacion();
    var tipoRevocatoria = tiposRevocatoria();
    var boton = (task.tipo_mod !== 0) ? '  <button type="button" class="btn btn-warning" id="btnGuardarMod"><span class="glyphicon glyphicon-copy" aria-hidden="true"></span>Guardar Cambios</button>' : '  <button type="button" class="btn btn-warning" id="btnModificatoria"><span class="glyphicon glyphicon-copy" aria-hidden="true"></span>Crear Resolución modificatoria</button>';
    var botonRevo = (task.revocatoria) ? ' <button type="button" class="btn btn-warning" id="btnGuardarRev"><span class="glyphicon glyphicon-copy" aria-hidden="true"></span>Guardar Cambios</button>' : '  <button type="button" class="btn btn-warning" id="btnRevocatoria"><span class="glyphicon glyphicon-copy" aria-hidden="true"></span>Crear Revocatoria</button>';
//    console.log(tipoModificacion);
    var modificacion = "";
    if (!task.modificada) {
        modificacion = '<div class="form-group">' +
                '    <label class="control-label" for="tipoModificacion">Tipo Modificación:</label>' +
                '    <select class="form-control" id="tipoModificacion" >' +
                tipoModificacion +
                '</select>' +
                '<textarea class="form-control" id="justificacion">' + task.justificacion + '</textarea>' +
                boton +
                '  </div>';
    }
    var revocatoria = '<div class="form-group">' +
            '    <label class="control-label" for="tipoRevocatoria">Tipo revocatoria:</label>' +
            '    <select class="form-control" id="tipoRevocatoria" >' +
            tipoRevocatoria +
            '</select>' +
            ' <label class="control-label" for="tipoRevocatoria">fecha Revocatoria:</label>' +
            '<input class="form-control datepicker" id="fechaRevocarotia" placeholder="dd/mm/yyyy" value="' + (task.fechaRevocatoria ? task.fechaRevocatoria : '') + '"  >' +
            ' <label class="control-label" for="tipoRevocatoria">Justificación Revocatoria:</label>' +
            '<textarea class="form-control" id="revJustificacion"></textarea>' +
            botonRevo +
            '</div><hr class="separator">';

    var html = '<div id="dynamicModal-' + modal_id + '" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="confirm-modal" aria-hidden="true">';
    html += '<div class="modal-dialog">';
    html += '<div class="modal-content">';
    html += '<div class="modal-header">';
    html += '<a class="close" data-dismiss="modal">×</a>';
    html += '<h4>' + 'Nueva resolución, identificador: ' + identificador + '</h4>';
    html += '</div>';
    html += '<div class="modal-body">';
    html += '<p>';

    html +=
            '<form class="form" role="form" data-toggle="validator">' +
            '  <p><h4>Asignación</h4></p>' +
            '  <div class="form-group">' +
            '    <label class="control-label" for="fechaDesde">Desde</label>' +
            '    <input class="form-control datepicker" id="fechaDesde" placeholder="dd/mm/yyyy" required value="' + (task.start_date ? $.datepicker.formatDate('dd/mm/yy', task.start_date) : '') + '">' +
            '  </div>' +
            '  <div class="form-group">' +
            '    <label class="control-label" for="fechaHasta">Hasta</label>' +
            '    <input class="form-control datepicker" id="fechaHasta" placeholder="dd/mm/yyyy" required value="' + (task.end_date ? $.datepicker.formatDate('dd/mm/yy', task.end_date) : '') + '" >' +
            '  </div>' +
            '  <hr class="separator">' +
            '  <div class="form-group">' +
            '    <label for="cdp">CDP:</label><div class="clearfix"></div>' +
            '    <select class="form-control" id="cdpSelector"></select>' +
            '  </div>' +
            '  <hr class="separator">' +
            '  <div class="form-group">' +
            '    <label for="estadoSelector">Estado:</label><div class="clearfix"></div>' +
            '    <select class="form-control" id="estadoSelector" required></select>' +
            '  </div>' +
            '  <div class="form-group">' +
            '    <label for="cdp">Observaciones:</label><div class="clearfix"></div>' +
            '    <textarea class="form-control" rows="3" id="txtObservaciones">' + (task.observaciones ? task.observaciones : '') + '</textarea>' +
            '  </div>' +
            '  <div class="form-group">' +
            '    <label for="resolucion">Resolución número:</label>' +
            '    <input type="text" class="form-control" id="resolucion" required  value="' + (task.text ? task.text : 'En Trámite') + '">' +
            '  </div>' +
            '  <div class="form-group">' +
            '    <label class="control-label" for="fechaResolucion">Fecha de la resolucíon</label>' +
            '    <input class="form-control datepicker" id="fechaResolucion" placeholder="dd/mm/yyyy" value="' + (task.fechaResolucion ? task.fechaResolucion : '') + '"  >' +
            '  </div>' +
            '  <hr class="separator">' +
            '  <button type="button" class="btn btn-info" id="btnImprimirSolicitudCRP"><span class="glyphicon glyphicon-print" aria-hidden="true"></span> Imprimir solicitud CRP</button>' +
            '  <hr class="separator">' +
            '  <div class="form-group">' +
            '    <label for="crp">CRP Número:</label>' +
            '    <input type="text" class="form-control" id="crp" required value="' + (task.crp ? task.crp : '') + '" >' +
            '  </div>' +
            '  <div class="form-group">' +
            '    <label class="control-label" for="fechaCRP">Fecha del CRP</label>' +
            '    <input class="form-control datepicker" id="fechaCRP" placeholder="dd/mm/yyyy"  value="' + (task.fechaCRP ? task.fechaCRP : '') + '"  >' +
            '  </div>' +
            '  <hr class="separator">' +
            revocatoria +
            modificacion +
            '</form>';

    html += '</div>';
    html += '<div class="modal-footer">';
    html += '<span class="btn btn-primary" id="btnGuardarNuevaResolucion">Guardar</span>';
    html += '<span class="btn btn-default" data-dismiss="modal">Cerrar</span>';
    html += '</div>';  // content
    html += '</div>';  // dialog
    html += '</div>';  // footer
    html += '</div>';  // modalWindow
    $('body').append(html);
    $("#dynamicModal-" + modal_id).modal();
    $("#dynamicModal-" + modal_id).modal('show');
    $('#tipoModificacion option[value="' + task.tipo_mod + '"]').attr("selected", true);
    $("#dynamicModal-" + modal_id).on('hidden.bs.modal', function (e) {
        $(this).remove();
    });

    $("#btnModificatoria").on("click", function () {
        var tipoModificacion = $('#tipoModificacion').val();
        var justificacion = $('#justificacion').val();
        modificaResolucion(task.text, modal_id, tipoModificacion, justificacion, identificador);

    });
    $("#btnGuardarMod").on("click", function () {
        var tipoModificacion = $('#tipoModificacion').val();
        var justificacion = $('#justificacion').val();
        guardarModificada(task.text, modal_id, tipoModificacion, justificacion, identificador);
    });
    $("#btnRevocatoria").on("click", function () {
        var tipoRevocatoria = $('#tipoRevocatoria').val();
        var justificacion = $('#revJustificacion').val();
        var fechaRevocatoria = $('#fechaRevocarotia').val();
        creaRevocatoria(task.id_resolucion, modal_id, tipoRevocatoria, fechaRevocatoria, justificacion);

    });
    $("#btnGuardarRev").on("click", function () {
        var tipoRevocatoria = $('#tipoRevocatoria').val();
        var fechaRevocatoria = $('#fechaRevocatoria').val();
        cambiosRevocatoria(task.text, modal_id, tipoRevocatoria, fechaRevocatoria);

    });
    $("#dynamicModal-" + modal_id).find("input.datepicker").datepicker({
        dateFormat: "dd/mm/yy"
    });
    FormularioGraficoResolucionesMemorandosCargarCDP(identificador, $("#dynamicModal-" + modal_id).find("#cdpSelector"), task.cdp_id);

    FormularioGraficoResolucionesMemorandosCargarEstados(identificador, $("#dynamicModal-" + modal_id).find("#estadoSelector"), 'consulta_estados_resoluciones', task.id);

    $("#dynamicModal-" + modal_id).find("#btnImprimirSolicitudCRP").on('click', function (e) {
        var data = {
            identificador: identificador,
            resolucion: task.id,
            usuario: (usuario_login ? usuario_login : "")
        };
        $.ajax({
            type: "POST",
            url: URL_IMPRIMIR + "pdf/imprimir_solicitud_crp_grafico_v5.php",
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
    });

    $("#dynamicModal-" + modal_id).find("form").find("input").on("keypress", function (e) {
        if (e.which === 13) {
            $("#dynamicModal-" + modal_id).find("#btnGuardarNuevaResolucion").focus().click();
        }
    });
    $("#dynamicModal-" + modal_id).find("form").find("select").on("keypress", function (e) {
        if (e.which === 13) {
            $("#dynamicModal-" + modal_id).find("#btnGuardarNuevaResolucion").focus().click();
        }
    });

    $("#dynamicModal-" + modal_id).find("#btnGuardarNuevaResolucion").on('click', function (e) {
        var datos = {
            op: 'insertar_actualizar_resolucion_desde_grafico',
            identificador: identificador,
            id_resolucion: (task.id_resolucion ? task.id_resolucion : 'null'),
            fecha_inicio: $("#dynamicModal-" + modal_id).find("#fechaDesde").val(),
            fecha_fin: $("#dynamicModal-" + modal_id).find("#fechaHasta").val(),
            resolucion: ($("#dynamicModal-" + modal_id).find("#resolucion").val() ? $("#dynamicModal-" + modal_id).find("#resolucion").val() : '999999'),
            fechaResolucion: $("#dynamicModal-" + modal_id).find("#fechaResolucion").val(),
            cdp_id: $("#dynamicModal-" + modal_id).find("#cdpSelector").val(),
            crp: $("#dynamicModal-" + modal_id).find("#crp").val(),
            fechaCRP: $("#dynamicModal-" + modal_id).find("#fechaCRP").val(),
            ties_res_id: $("#dynamicModal-" + modal_id).find("#estadoSelector").val() ? $("#dynamicModal-" + modal_id).find("#estadoSelector").val() : 'null',
            observaciones: $("#dynamicModal-" + modal_id).find("#txtObservaciones").val()
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
                        if (res.data[0] && res.data[0].op && res.data[0].op === "INSERT") {
                            gantt.addTask({
                                id: datos.resolucion,
                                text: datos.resolucion,
                                start_date: datos.fecha_inicio,
                                end_date: datos.fecha_fin,
                                tipo: "resolucion",
                                type: "resolucion",
                                id_resolucion: res.data[0].id_resolucion,
                                fechaResolucion: datos.fechaResolucion,
                                cdp_id: datos.cdp_id,
                                crp: datos.crp,
                                fechaCRP: datos.fechaCRP,
                                readonly: true,
                                open: true
                            });


                            gantt.message("La resolución fué almacenada correctamente");
                        } else if (res.data[0] && res.data[0].op && res.data[0].op === "UPDATE") {

                            gantt.deleteTask(task.id);

                            gantt.addTask({
                                id: datos.resolucion,
                                text: datos.resolucion,
                                start_date: datos.fecha_inicio,
                                end_date: datos.fecha_fin,
                                tipo: "resolucion",
                                type: "resolucion",
                                id_resolucion: res.data[0].id_resolucion,
                                fechaResolucion: datos.fechaResolucion,
                                cdp_id: datos.cdp_id,
                                crp: datos.crp,
                                fechaCRP: datos.fechaCRP,
                                readonly: true,
                                open: true
                            });

                            gantt.refreshData();
                        }
                    } else {
                        gantt.message({type: "error", text: "No fué posible almacenar la resolución"});
                    }
                }
            }, error: function () {
                gantt.message({type: "error", text: "No fué posible almacenar la resolución"});
            }
        });


    });

}


function FormularioGraficoResolucionesMemorandosNuevoMemorando(identificador, resolucion_id, memorando, entrega_vivienda) {
    var modal_id = Math.random().toString(36).substring(7);
    var task = {};
    if (memorando) {
        task = gantt.getTask(memorando);
    }

    var resolucion = gantt.getTask(resolucion_id);

    var alertas = [];
    if (!resolucion.cdp_id) {
        alertas.push('La resolución no tiene CDP');
    }
    if (!resolucion.crp) {
        alertas.push('La resolución no tiene CRP');
    }
    if (alertas.length > 0) {
        var html = '<div id="dynamicModal-' + modal_id + '" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="confirm-modal" aria-hidden="true">';
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
        $("#dynamicModal-" + modal_id).modal();
        $("#dynamicModal-" + modal_id).modal('show');

        $("#dynamicModal-" + modal_id).on('hidden.bs.modal', function (e) {
            $(this).remove();
        });

        return;
    }
    var fechas_inicio_contratos = [];
    var fechas_fin_contratos = [];

    for (var i = 0; i < GraficoResolucionesMemorandosListaContratos.length; i++) {
        if (moment(GraficoResolucionesMemorandosListaContratos[i].cont_fecha_inicio) <= resolucion.end_date &&
                moment(GraficoResolucionesMemorandosListaContratos[i].cont_fecha_fin) >= resolucion.start_date) {
            fechas_inicio_contratos.push(moment(GraficoResolucionesMemorandosListaContratos[i].cont_fecha_inicio));
            fechas_fin_contratos.push(moment(GraficoResolucionesMemorandosListaContratos[i].cont_fecha_fin));
        }
    }
    /*fechas_inicio_contratos.push(resolucion.start_date);
     fechas_fin_contratos.push(resolucion.end_date);
     */

    var maxFinContrato = new Date(Math.max.apply(null, fechas_fin_contratos));
    var minInicioContrato = new Date(Math.min.apply(null, fechas_inicio_contratos));

    var maxEndDate = new Date(Math.min.apply(null, [maxFinContrato, resolucion.end_date, moment(entrega_vivienda).add(0, 'days').toDate()]));
    var minStartDate = new Date(Math.max.apply(null, [minInicioContrato, resolucion.start_date]));


    var html = '<div id="dynamicModal-' + modal_id + '" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="confirm-modal" aria-hidden="true">';
    html += '<div class="modal-dialog">';
    html += '<div class="modal-content">';
    html += '<div class="modal-header">';
    html += '<a class="close" data-dismiss="modal">×</a>';
    html += '<h4>' + 'Nuevo Memorando, resolución: ' + resolucion.id + ', identificador: ' + identificador + '</h4>';
    html += '</div>';
    html += '<div class="modal-body">';
    html += '<p>';

    html +=
            '<form class="form" role="form" data-toggle="validator">' +
            '  <p><h4>Pago</h4></p>' +
            '  <div class="form-group">' +
            '    <label class="control-label" for="fechaDesde">Desde</label>' +
            '    <input class="form-control datepicker" id="fechaDesde" placeholder="dd/mm/yyyy" required value="' + (task.start_date ? $.datepicker.formatDate('dd/mm/yy', task.start_date) : '') + '">' +
            '  </div>' +
            '  <div class="form-group">' +
            '    <label class="control-label" for="fechaHasta">Hasta</label>' +
            '    <input class="form-control datepicker" id="fechaHasta" placeholder="dd/mm/yyyy" required value="' + (task.end_date ? $.datepicker.formatDate('dd/mm/yy', task.end_date) : '') + '" >' +
            '  </div>' +
            '  <hr class="separator">' +
            '  <div class="form-group">' +
            '    <label for="estadoSelector">Estado:</label><div class="clearfix"></div>' +
            '    <select class="form-control" id="estadoSelector" required></select>' +
            '  </div>' +
            '  <hr class="separator">' +
            '  <div class="form-group">' +
            '    <label for="crp">Cordis:</label>' +
            '    <input type="text" class="form-control" id="cordis" required value="' + (task.cordis ? task.cordis : '') + '" >' +
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
        $(this).remove();
    });


    $("#dynamicModal-" + modal_id).find("input.datepicker").datepicker({
        dateFormat: "dd/mm/yy",
        minDate: minStartDate,
        maxDate: maxEndDate
    });
    FormularioGraficoResolucionesMemorandosCargarCDP(identificador, $("#dynamicModal-" + modal_id).find("#cdpSelector"), resolucion.cdp_id);

    FormularioGraficoResolucionesMemorandosCargarEstados(identificador, $("#dynamicModal-" + modal_id).find("#estadoSelector"), 'consulta_estados_memorandos', (task.id ? task.id : 'null'));

    $("#dynamicModal-" + modal_id).find("form").find("input").on("keypress", function (e) {
        if (e.which === 13) {
            $("#dynamicModal-" + modal_id).find("#btnGuardarNuevoMemorando").focus().click();
        }
    });
    $("#dynamicModal-" + modal_id).find("form").find("select").on("keypress", function (e) {
        if (e.which === 13) {
            $("#dynamicModal-" + modal_id).find("#btnGuardarNuevoMemorando").focus().click();
        }
    });

    $("#dynamicModal-" + modal_id).find("#btnGuardarNuevoMemorando").on('click', function (e) {

        var alertas = [];
        if (!$("#dynamicModal-" + modal_id).find("#estadoSelector").val()) {
            alertas.push('Debe seleccionar el estado del memorando');
        }
        if (!$("#dynamicModal-" + modal_id).find("#fechaDesde").val()) {
            alertas.push('Debe seleccionar la fecha inicial');
        }
        if (!$("#dynamicModal-" + modal_id).find("#fechaHasta").val()) {
            alertas.push('Debe seleccionar la fecha final');
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
            op: "InsertarEditarMemorandoDesdeGrafico",
            id: (task.id ? task.id : gantt.uid),
            IDENTIFICADOR: identificador,
            RESOLUCION: resolucion.id,
            cdp_numero: resolucion.cdp_id,
            crp_numero: resolucion.crp,
            cordis: $("#dynamicModal-" + modal_id).find("#cordis").val(),
            "INI-PAGO": $("#dynamicModal-" + modal_id).find("#fechaDesde").val(),
            "FN-PAGO": $("#dynamicModal-" + modal_id).find("#fechaHasta").val(),
            ties_mem_id: $("#dynamicModal-" + modal_id).find("#estadoSelector").val() ? $("#dynamicModal-" + modal_id).find("#estadoSelector").val() : 'null'
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
                        if (res.data[0] && res.data[0].op && res.data[0].op === "INSERT") {
                            gantt.addTask({
                                id: res.data[0].id, //memorando.chart_id ? memorando.chart_id : memorando.id,
                                parent: resolucion.id,
                                text: $("#dynamicModal-" + modal_id).find("#cordis").val() ? $("#dynamicModal-" + modal_id).find("#cordis").val() : resolucion.id,
                                start_date: $("#dynamicModal-" + modal_id).find("#fechaDesde").val(),
                                end_date: $("#dynamicModal-" + modal_id).find("#fechaHasta").val(),
                                cdp: resolucion.cdp_numero,
                                crp: resolucion.crp,
                                cordis: $("#dynamicModal-" + modal_id).find("#cordis").val(),
                                ties_mem_id: $("#dynamicModal-" + modal_id).find("#estadoSelector").val(),
                                usuario: usuario_login,
                                tipo: "memorando",
                                readonly: true,
                                open: true
                            });

                            gantt.message("El memorando fué almacenado correctamente");
                        } else if (res.data[0] && res.data[0].op && res.data[0].op === "UPDATE") {
                            //gantt.deleteTask(task.id);

                            task.parent = resolucion.id;
                            task.text = $("#dynamicModal-" + modal_id).find("#cordis").val() ? $("#dynamicModal-" + modal_id).find("#cordis").val() : resolucion.id;
                            task.start_date = $("#dynamicModal-" + modal_id).find("#fechaDesde").datepicker('getDate');
                            task.end_date = $("#dynamicModal-" + modal_id).find("#fechaHasta").datepicker('getDate');
                            task.cdp = resolucion.cdp_numero;
                            task.crp = resolucion.crp;
                            task.cordis = $("#dynamicModal-" + modal_id).find("#cordis").val();
                            task.ties_mem_id = $("#dynamicModal-" + modal_id).find("#estadoSelector").val();
                            task.usuario = usuario_login;
                            task.tipo = "memorando";
                            task.readonly = true;
                            task.open = true;

                            gantt.refreshData();
                        }
                    } else {
                        gantt.message({type: "error", text: "No fué posible almacenar la resolución"});
                    }
                }
            }, error: function () {
                gantt.message({type: "error", text: "No fué posible almacenar la resolución"});
            }
        });


    });

}

function modificaResolucion(numero_resolucion, modal_id, tipo_modificacion, justificacion, identificador) {
    var r = confirm("Esta seguro de crear la modificación!");
    if (r === true) {
        var datos = {
            op: 'crear_resolucion_modificatoria',
            resolucion: numero_resolucion,
            identificador: identificador,
            usuario: usuario_login,
            tipo: tipo_modificacion,
            justificacion: justificacion


        };
        $.ajax({
            type: "POST",
            url: "GestionDML",
            dataType: "text",
            data: datos,
            success: function (response) {
                if (response) {
                    var res = eval('(' + response + ')');
                    if (res && res.total > 0) {
                        $("#dynamicModal-" + modal_id).modal('hide');
                        gantt.refreshData();
                    }
                }
            }
        });

    }
}

function guardarModificada(numero_resolucion, modal_id, tipo_modificacion, justificacion, identificador) {
    var r = confirm("Esta seguro de crear la modificación!");
    if (r === true) {
        var datos = {
            op: 'guardar_modificatoria',
            resolucion: numero_resolucion,
            identificador: identificador,
            usuario: usuario_login,
            tipo: tipo_modificacion,
            justificacion: justificacion


        };
        $.ajax({
            type: "POST",
            url: "GestionDML",
            dataType: "text",
            data: datos,
            success: function (response) {
                if (response) {
                    var res = eval('(' + response + ')');
                    if (res && res.total > 0) {
                        $("#dynamicModal-" + modal_id).modal('hide');
                        gantt.refreshData();
                    }
                }
            }
        });

    }
}
function creaRevocatoria(numero_resolucion, modal_id, tipo_revocatoria, fechaRevocatoria, justificacion) {
    var r = confirm("Esta seguro de crear la revocatoria!");

    if (r === true) {
        var datos = {
            op: 'guardar_revocatoria',
            resolucion: numero_resolucion,
            usuario: usuario_login,
            tipo: tipo_revocatoria,
            fecha: fechaRevocatoria,
            justificacion: justificacion
        };
        $.ajax({
            type: "POST",
            url: "GestionConsultas",
            dataType: "text",
            data: datos,
            success: function (response) {
                if (response) {
                    var res = eval('(' + response + ')');
                    if (res && res.total > 0) {
                        $("#dynamicModal-" + modal_id).modal('hide');
                        gantt.refreshData();
                    }
                }
            }
        });

    }
}

function cambiosRevocatoria(numero_resolucion, modal_id, tipo_revocatoria, fechaRevocatoria) {
    var r = confirm("Esta seguro de crear la revocatoria!");
    if (r === true) {
        var datos = {
            op: 'actualizar_revocatoria',
            resolucion: numero_resolucion,
            usuario: usuario_login,
            fecha: fechaRevocatoria,
            tipo: tipo_revocatoria
        };
        $.ajax({
            type: "POST",
            url: "GestionConsultas",
            dataType: "text",
            data: datos,
            success: function (response) {
                if (response) {
                    var res = eval('(' + response + ')');
                    if (res && res.total > 0) {
                        $("#dynamicModal-" + modal_id).modal('hide');
                        gantt.refreshData();
                    }
                }
            }
        });

    }
}
function FormularioGraficoResolucionesMemorandosCargarCDP(identificador, control, cdp_id) {
    $.ajax({
        type: "POST",
        url: "GestionConsultas",
        dataType: "text",
        async: false,
        data: {op: "consulta_cdp_disponibles", "IDENTIFICADOR": identificador},
        success: function (response) {
            if (response)
            {
                var res = eval('(' + response + ')');

                $(control).empty();

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

                    $(control).append(
                            ' <option data-valor="0" value="0" selected data-text="<strong style=\'color:#BB2F37; font-weight:bold;\'>Sin CDP</strong>"></option>');

                    for (var i = 0; i < grupos.length; i++) {
                        $(control).append('<optgroup id="cdp-selector-' + i + '" label="' + grupos[i].nombre + '"></optgroup>');
                        for (var j = 0; j < grupos[i].datos.length; j++) {
                            $(control).find("#cdp-selector-" + i).append(
                                    '<option value="' + grupos[i].datos[j]["cdp_id"] + '"'
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
                                    + (grupos[i].datos[j]["cdp_fecha"] ? " - " + (new Date(grupos[i].datos[j]["cdp_fecha"]).getFullYear()) : "")
                                    + ' (<strong style=\'color:' + (grupos[i].datos[j]["cdp_saldo_estimado"] > 0 ? '#808000' : '#BB2F37') + ';\'>' + (grupos[i].datos[j]["cdp_saldo_mostrar_estimado"] ? grupos[i].datos[j]["cdp_saldo_mostrar_estimado"] : "Saldo no calculado") + '</strong>)'

                                    + (grupos[i].datos[j]["cdp_localidad"] ? (' - ' + grupos[i].datos[j]["cdp_localidad"]) : '')
                                    + (grupos[i].datos[j]["cdp_sector"] ? (' - ' + grupos[i].datos[j]["cdp_sector"]) : '')
                                    + (grupos[i].datos[j]["cdp_comunidad"] ? (' - ' + grupos[i].datos[j]["cdp_comunidad"]) : '')
                                    + '" '
                                    + (cdp_id && (cdp_id === grupos[i].datos[j]["cdp_id"]) ? 'selected' : '')
                                    //+ (Number(seleccionado) ? (seleccionado === grupos[i].datos[j]["cdp_numero"].toString() ? 'selected' : '') : (grupos[i].datos[j]["seleccionado"] ? 'selected' : ''))
                                    + ' '
                                    //+ (grupos[i].datos[j]["cdp_habilitado"] ? '' : 'disabled')
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
    if ($(control).data("selectBox-selectBoxIt")) {
        $(control).data("selectBox-selectBoxIt").destroy();
    }
    $(control).selectBoxIt();

    //formulario.find("#VALOR-CDP-TOTAL").val(formulario.find("#cdp-selector option:selected").data("valor"));
    /*formulario.find("#cdp-selector").bind({
     "changed": function (ev, obj) {
     formulario.find("#VALOR-CDP-TOTAL").val(formulario.find("#cdp-selector option:selected").data("valor"));
     }
     });*/

    $("[rel='popover']").popover({trigger: "hover", container: "body", html: true});
}

function FormularioGraficoResolucionesMemorandosCargarEstados(identificador, control, op, id) {
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

function FormularioGraficoResolucionesMemorandosImprimirResolucion(id, id_solicitud) {
    var task = gantt.getTask(id);
    var data = {
        identificador: id_solicitud,
        resolucion: task.id,
        usuario: usuario_login
    };
    $.ajax({
        type: "POST",
        url: URL_IMPRIMIR + "pdf/imprimir_resolucion.php",
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
function ImprimirRevocatoria(id, id_solicitud) {
    var task = gantt.getTask(id);
    var data = {
        identificador: id_solicitud,
        resolucion: task.id,
        usuario: usuario_login
    };
    $.ajax({
        type: "POST",
        url: URL_IMPRIMIR + "pdf/imprimir_revocatoria.php",
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
function EditarRevocatoria(id, id_solicitud) {
    
    $.ajax({
        type: "POST",
        url: "GestionConsultas",
        dataType: "text",
        async: false,
        data: {op: "consulta_cdp_disponibles", "IDENTIFICADOR": identificador},
        success: function (response) {
            if (response) {
            }
        }
    });
}