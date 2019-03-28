(function ($) {
    var settingsComentarios = "";
    var nomUsuarios = [];
    var formatoComentario = {
        campoPertenece: "",
        idUsuario: "",
        resuelto: false,
        comentario: "",
        hijos: [],
        padre: "",
        tieneHijosNoResueltos: function () {//retorna true si algun hijo nmo esta resuelto
            var flag = false;
            $(this.hijos).each(function (key, element) {
                if (!element.resuelto) {
                    flag = true;
                    return;
                }
            });
            return flag;
        },
        resolverComentario: function () {
            if (this.hijos.length) {
                if (!this.tieneHijosNoResueltos()) {
                    this.resuelto = true;
                    if (this.padre !== "") {
                        var p = obtenerPadre(this.padre);
                        //console.log(p);
                        p.resolverComentario();
                    }
                }
            } else {
                this.resuelto = true;
                if (this.padre !== "") {
                    var p = obtenerPadre(this.padre);
                    p.resolverComentario();
                }
            }
        }
    };
    $.fn.comentarios = function (options) {
        this.each(function (key, elementComment) {
            if ($(elementComment).parent().attr('data-alpaca-item-container-item-key') === undefined) {
                alert('Error cargando libreria de comentarios, no todos los elementos tiene tag-comment');
                return;
            }
            // This is the easiest way to have default options.
            settingsComentarios = $.extend({
                // These are the defaults.
                url: "#",
                mostrarTodo: false,
                crearComentario: true,
                idReferencia: -1, //se refiere a la estructura,
                idUsuario: -1,
                data: [],
                extraBusqueda: {}
            }, options);
            agregarModal();
            obtenerComentarios();
            // Greenify the collection based on the settings variable.
            if (settingsComentarios.crearComentario) {
                //nuevoComentario(elementComment);
            } else {
                $('#informacionModal').html("No tiene permisos");
            }
            var verComentarios = $("<span>");
            verComentarios.addClass('glyphicon glyphicon-comment newComentario btn btn-sm btn-default');
            verComentarios.attr('data-toggle', 'modal');
            verComentarios.attr('data-target', '#nuevoComentario');
            verComentarios.click(function () {
                inicialComentario(elementComment);
            });
            verComentarios.html(' ');
            $(elementComment).append(verComentarios);
        });
        resaltarPendientesCampos();
    };

    var resaltarPendientesCampos = function () {
        $('[tag-comment]').each(function (key, e) {
            var element = $(e).find(".glyphicon-comment");
            var contador = 0;
            if (settingsComentarios.data.length) {
                $(settingsComentarios.data).each(function (key, jsn) {
                    if (jsn.campoPertenece === $(e).parent().attr('data-alpaca-item-container-item-key')) {
                        if (!jsn.resuelto) {
                            contador++;
                            //console.log('resaltar' + jsn.campoPertenece);
                        }
                    }
                });
                if (contador > 0) {
//                    $(element).addClass('label label-danger');
                    $(element).addClass('btn-danger');
                } else {
//                    $(element).removeClass('label label-danger');
                    $(element).removeClass('btn-danger');
                }
            }
        });
    };

    var inicialComentario = function (elementComment) {
        limpiarPopup();
        if (settingsComentarios.data.length) {
            var todo = $('<div>');
            var numerador = 1;
            $(settingsComentarios.data).each(function (key, e) {
                if (e.campoPertenece === $(elementComment).parent().attr('data-alpaca-item-container-item-key')) {
                    if ((settingsComentarios.mostrarTodo) || (e.idUsuario === settingsComentarios.idUsuario)) {
                        //console.log(e);
                        var cont = $("<div>");
                        var btnAcE = $("<div>");
                        var btnComment = $("<div>");
//                        cont.attr("style", "min-height:41px");
                        cont.addClass("row");
                        cont.append('<div class="col-xs-7 col-lg-9 text-justify"><span class="badge">' + numerador + "</span> " + e.comentario + '</div>');
                        numerador++;
                        cont.append('<div class="col-xs-5 col-lg-3 text-right">' + ((e.resuelto) ? '<span class="label label-success">Resuelto</span>' : ((e.hijos.length) ? '<span class="label label-info">Observado</sán>' : '<span class="label label-warning">Pentiente</span>')) + '</div>');
                        btnComment.addClass('col-xs-6 col-lg-6 text-center');
                        btnComment.click(function () {
                            internaComentarios(e, key);
                        });
                        btnComment.append(((e.resuelto) ? '<br/><button class="btn btn-xs btn-block btn-default"><span class="glyphicon glyphicon-zoom-in"></span> Ver Comentarios</button>' : '<br/><button class="btn btn-xs btn-block btn-default"><span class="glyphicon glyphicon-comment"></span> Comentar</button>'));
                        cont.append(btnComment);
                        if (settingsComentarios.idUsuario === e.idUsuario && (e.hijos.length === 0)) {
                            btnAcE.addClass('col-xs-6 col-lg-6 text-center');
                            btnAcE.click(function () {
                                actualizarEstado(e);
                            });
                            btnAcE.append(((e.resuelto) ? '' : '<br/><button class="btn btn-xs btn-block btn-default"><span class="glyphicon glyphicon-ok"></span> Aprobar</button>'));
                            cont.append(btnAcE);
                        }
                        todo.append(cont);
                        todo.append('<br/><div class="text-muted text-left"><em><strong>Autor:</strong> ' + getNombreUsuario(e.idUsuario) + '</em></div>');
                        todo.append("<hr/>");
                    }
                }
            });
            $('#informacionModal').append(todo);
        } else {
            $('#informacionModal').html('<span>No hay comentarios sobre este campo</span>');
        }
        if (settingsComentarios.crearComentario) {
            var formNuevoComentario = $("<div>");
            var input = $('<input>');
            var btnGuardar = $('<button>');
            input.addClass('form-control');
            input.attr('id', "ingComent");
            input.attr('maxlength', "250");
            btnGuardar.addClass("btn btn-primary btn-sdis addBtn");
            btnGuardar.attr('id', "guardarComentario");
            btnGuardar.attr('tag', $(elementComment).parent().attr('data-alpaca-item-container-item-key'));
            btnGuardar.html('Guardar Comentario');
            btnGuardar.click(function () {
                guardarComentario(elementComment);
            });
            formNuevoComentario.append($('<label>').html('Ingrese su comentario sobre ' + $(elementComment).parent().attr('data-alpaca-item-container-item-key') + ':'));
            formNuevoComentario.append(input);
            $('#informacionModal').append(formNuevoComentario);
            $('#botoneraComentario').append(btnGuardar);
        }
    };
    var internaComentarios = function (padre, pos, Fvolver) {
        var abuelo = {};
        //console.log(padre);
        if (padre.padre !== "") {
            abuelo = obtenerPadre(padre.padre);
            if (abuelo.padre !== "" && Fvolver) {
                internaComentarios(abuelo, abuelo.hijos.indexOf(padre));
                return;
            }
        }
        limpiarPopup();
        var todo = $('<div>');
        var contVolver = $('<div>');
        contVolver.addClass('col-lg-12');
        var volver = $('<div>');
        volver.addClass('btn btn-sm btn-default');
        volver.html('<span class="glyphicon glyphicon-arrow-left"></span> Atrás');
        volver.click(function () {
            if (padre.padre !== "") {
                internaComentarios(abuelo, abuelo.hijos.indexOf(padre), true);
            } else {
                inicialComentario($('[tag-comment=' + padre.campoPertenece + ']'));
            }
        });
        contVolver.append(volver);
        var espacioPadre = $("<div class=' well well-sm text-center'>");
        espacioPadre.addClass('row');

        espacioPadre.append(contVolver);

        espacioPadre.append('<div class="col-xs-7 col-lg-9 text-justify"><br/>' + padre.comentario + '</div>');
        espacioPadre.append('<div class="col-xs-5 col-lg-3 text-right"><br/>' + ((padre.resuelto) ? '<span class="label label-success">Resuelto</span>' : ((padre.hijos.length) ? '<span class="label label-info">Observado</sán>' : '<span class="label label-warning">Pentiente</span>')) + '</div>');
        todo.append(espacioPadre);
        var formNuevoComentario = $("<div>");
        if (!padre.resuelto) {
            formNuevoComentario = $("<div class=' well well-sm text-center'>");
            var input = $('<textarea>');
            var btnGuardar = $('<button>');
            input.addClass('form-control');
            input.attr('id', "ingComent");
            input.attr('maxlength', "250");
            btnGuardar.addClass("btn btn-default btn-sm btn-sdis addBtn");
            btnGuardar.html('<span class="glyphicon glyphicon-floppy-saved"></span> Guardar Comentario');
            btnGuardar.click(function () {
                guardarReplica(padre, pos);
            });
            formNuevoComentario.append($('<label>').html('<hr/>Ingrese su comentario :'));
            formNuevoComentario.append(input);
            formNuevoComentario.append("<br/>");
            formNuevoComentario.append(btnGuardar);

        }

        if (padre.hijos.length) {
//            //console.log(padre,padre.hijos);
            $(padre.hijos).each(function (key, e) {
//                //console.log(e,"hijos");
//                if ((settingsComentarios.mostrarTodo) || (e.idUsuario === settingsComentarios.idUsuario)) {
                var cont = $("<div>");
                var btnAcE = $("<div>");
                var btnComment = $("<div>");
//                    cont.attr("style", "min-height:40px");
                cont.addClass("row");

                cont.append('<div class="col-xs-7 col-lg-9 text-justify"><span class="badge" >' + (obtenerPadre(e.padre).hijos.indexOf(e) + 1) + "</span> " + e.comentario + '</div>');
                cont.append('<div class="col-xs-5 col-lg-3 text-right">' + ((e.resuelto) ? '<span class="label label-success">Resuelto</span>' : ((e.hijos.length) ? '<span class="label label-info">Observado</sán>' : '<span class="label label-warning">Pentiente</span>')) + '</div>');
                btnComment.addClass('col-xs-6 col-lg-6 text-center');


                btnComment.click(function () {
                    internaComentarios(e, key);
                });
                btnComment.append(((e.resuelto) ? '<br/><button class="btn btn-xs btn-block btn-default"><span class="glyphicon glyphicon-zoom-in"></span> Ver Comentarios</button>' : '<br/><button class="btn btn-xs btn-block btn-default"><span class="glyphicon glyphicon-comment"></span> Comentar</button>'));
                cont.append(btnComment);
                if (settingsComentarios.idUsuario === e.idUsuario && (e.hijos.length === 0)) {
                    btnAcE.addClass('col-xs-6 col-lg-6 text-center');
                    btnAcE.click(function () {
                        actualizarEstado(e, padre, pos);
                    });
                    btnAcE.append(((e.resuelto) ? '' : '<br/><button class="btn btn-xs btn-block btn-default"><span class="glyphicon glyphicon-ok"></span> Aprobar</button>'));
                    cont.append(btnAcE);
                }
                todo.append(cont);
                todo.append('<br/><div class="text-muted text-left"><em><strong>Autor:</strong> ' + getNombreUsuario(e.idUsuario) + '</em></div>');
                todo.append("<hr/>");
//                }
            });
            $('#informacionModal').append(todo);
        } else {

        }
        todo.append(formNuevoComentario);
        $('#informacionModal').append(todo);
    };

    var guardarReplica = function (padre, pos) {
        //console.log(padre, pos, "info replica");
        var comment = {};
        var ruta = padre.padre + "," + pos;

        $.extend(comment, formatoComentario);
        $.extend(comment, {
            campoPertenece: padre.campoPertenece,
            idUsuario: settingsComentarios.idUsuario,
            comentario: $('#ingComent').val(),
            padre: ruta.replace(/^,+/, ''),
            hijos: []
        });
        padre.hijos.push(comment);
        guardarComentarios();
        internaComentarios(padre, pos);
    };

    var obtenerPadre = function (str) {
        var posPadre = str.split(",");
        var primera = true;
        //console.log(posPadre, "ruta");
        var inicio = settingsComentarios.data;
        $(posPadre).each(function (key, e) {
            if (primera) {
                //console.log(e, inicio, "padre");
                inicio = inicio[e];
                primera = false;
            } else {
                //console.log(e, inicio.hijos, "padre");
                inicio = inicio.hijos[e];
            }
        });
        //console.log(inicio, "retorno padre");
        return inicio;
    };

    var actualizarEstado = function (ele, padre, pos) {
        if (ele !== undefined) {
            ele.resolverComentario();
            guardarComentarios();
            if (padre !== undefined) {
                internaComentarios(padre, pos);
            } else {
                inicialComentario($('[tag-comment=' + ele.campoPertenece + ']'));
            }
        }
    };
    var obtenerComentarios = function () {
        $.extend(settingsComentarios.extraBusqueda, {
            id: settingsComentarios.idReferencia
        });
        settingsComentarios.data = [];
//        $.ajax({
//            url: settingsComentarios.url + 'getComentarios',
//            type: 'POST',
//            data: settingsComentarios.extraBusqueda,
//            success: function (data) {
//                //console.log(data, 'RETORNA');
//                if (data) {
//                    settingsComentarios.data = data;
//                    agregarMetodos(settingsComentarios.data);
//                    resaltarPendientesCampos();
//                } else {
//                    settingsComentarios.data = [];
//                }
//            },
//            error: function () {
//                alert('Error al cargar los comentarios');
//            }
//        });
    };

    var limpiarPopup = function () {
        $('.addBtn').remove();
        $('#informacionModal').html('');
    };

    var nuevoComentario = function (_this) {
        var nuevoComentario = $("<span>");
        nuevoComentario.addClass('glyphicon glyphicon-plus newComentario btn btn-sm btn-primary');
        nuevoComentario.attr('data-toggle', 'modal');
        nuevoComentario.attr('data-target', '#nuevoComentario');
        nuevoComentario.click(function () {
            limpiarPopup();
            var formNuevoComentario = $("<div>");
            var input = $('<input>');
            var btnGuardar = $('<button>');
            input.addClass('form-control');
            input.attr('id', "ingComent");
            input.attr('maxlength', "250");
            btnGuardar.addClass("btn btn-primary btn-sdis addBtn");
            btnGuardar.attr('id', "guardarComentario");
            btnGuardar.attr('tag', $(_this).parent().attr('data-alpaca-item-container-item-key'));
            btnGuardar.html('Guardar Comentario');
            btnGuardar.click(guardarComentario);
            formNuevoComentario.append($('<label>').html('Ingrese su comentario sobre ' + $(_this).parent().attr('data-alpaca-item-container-item-key') + ':'));
            formNuevoComentario.append(input);
            $('#informacionModal').html(formNuevoComentario);
            $('#botoneraComentario').append(btnGuardar);
        });
        $(_this).append(nuevoComentario);
    };

    var guardarComentario = function (e) {
        var comment = {};
        $.extend(comment, formatoComentario);
        $.extend(comment, {
            campoPertenece: $(e).parent().attr('data-alpaca-item-container-item-key'),
            idUsuario: settingsComentarios.idUsuario,
            comentario: $('#ingComent').val(),
            hijos: []
        });
        settingsComentarios.data.push(comment);
        console.log(settingsComentarios.data);
        guardarComentarios();
//        $('#nuevoComentario').modal('hide');
        inicialComentario(e);
    };

    var limpiarGuardado = function (inicio) {
        var arreglado = [];
        $(inicio).each(function (key, elementComment) {
            var element = {};
            $.extend(element, elementComment);
            $.extend(element, {
                tieneHijosNoResueltos: null,
                resolverComentario: null
            });
            if (element.hijos.length) {
                element.hijos = limpiarGuardado(elementComment.hijos);
            }
            arreglado.push(element);
        });
        return arreglado;
    };

    var agregarMetodos = function (inicio) {
        console.log(inicio);
        var arreglado = [];
        $(inicio).each(function (key, elementComment) {
            var element = {};
//            $.extend(element, elementComment);
            elementComment.resuelto = (elementComment.resuelto == "true");
            elementComment.idUsuario = parseInt(elementComment.idUsuario);
            $.extend(elementComment, {
                tieneHijosNoResueltos: formatoComentario.tieneHijosNoResueltos,
                resolverComentario: formatoComentario.resolverComentario
            });
            if (elementComment.hijos) {
                if (elementComment.hijos.length) {
                    elementComment.hijos = agregarMetodos(elementComment.hijos);
                }
            } else {
                elementComment.hijos = [];
            }
            arreglado.push(element);
        });
        return inicio;
    };
    var getNombreUsuario = function (id) {
        console.log("codigo solicitado", id);
        var retorno = "";
        if (nomUsuarios[id]) {
            return nomUsuarios[id];
        } else {
            $.ajax({
                url: settingsComentarios.url + 'getNombreUsuario',
                type: 'POST',
                async: false,
                data: {
                    'id': id
                },
                success: function (data) {
                    if (data.status) {
                        nomUsuarios[id] = data.nombre;
                        retorno = data.nombre;
                    }
                },
                error: function () {
                    alert('Error al cargar los comentarios');
                }, complete: function (jqXHR, textStatus) {
                }
            });
            return retorno;
        }
    };
    var guardarComentarios = function () {
        resaltarPendientesCampos();
        var json = JSON.parse(JSON.stringify(settingsComentarios.data));
        limpiarGuardado(json);
        $.ajax({
            url: settingsComentarios.url + 'setComentario',
            type: 'POST',
            data: {
                'extras': settingsComentarios.extraBusqueda,
                'comentarios': json
            },
            success: function (data) {
                //console.log(data);
            },
            error: function () {
                alert('Error al cargar los comentarios');
            }, complete: function (jqXHR, textStatus) {
            }
        });
        return true;
    };
    var agregarModal = function () {
        if (!$('#nuevoComentario').length) {
            $('body').append('<div class="modal fade" id="nuevoComentario" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
                    '<div class="modal-dialog">' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Cerrar</span></button>' +
                    '<h4 class="modal-title" id="myModalLabel">Comentario</h4>' +
                    '</div>' +
                    '<div class="modal-body" id="informacionModal">' +
                    'Cargando...' +
                    '</div>' +
                    '<div class="modal-footer" id="botoneraComentario">' +
                    '<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>');
        }
    };
}(jQuery));