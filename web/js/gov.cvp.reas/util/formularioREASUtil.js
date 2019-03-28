try {
    Alpaca;
} catch (e) {
    $.getScript("../js/Plugins/alpaca.min.js");
}
jQuery.getCSS = function(url, media) {
    jQuery(document.createElement('link')).attr({
        href: url,
        media: media || 'screen',
        type: 'text/css',
        rel: 'stylesheet'
    }).appendTo('head');
};
$.getCSS('../js/Plugins/jquery.wysiwyg/jquery.wysiwyg.css');
$.getScript("../js/Plugins/jquery.wysiwyg/jquery.wysiwyg.js");
if (jQuery)
    (function($) {

        $.extend($.fn, {
            formularioREASActualizarHijos: function(formulario, parametros, nombre, padre) {
                $.ajax({
                    type: "POST",
                    url: "GestionConsultas",
                    dataType: "text",
                    data: parametros,
                    success: function(response) {
                        if (response)
                        {
                            var res = eval('(' + response + ')');
                            var prop = [];
                            var opt = [];

                            if (res && res.total > 0) {
                                var q1 = "", q2 = "", s1 = "", s2 = "";
                                var r = "";

                                var form = formulario;
                                if (padre) {
                                    q1 = "'" + padre + "':{'properties':{";
                                    q2 = "}}";
                                    s1 = "'" + padre + "':{'fields':{";
                                    s2 = "}}";
                                    r = padre + "_";
                                    form = formulario.parent;
                                }

                                $("[name='" + r + nombre + "']").empty();
                                $("[name='" + r + nombre + "']").append('<option value="">Seleccione..</option>');
                                for (var i = 0; i < res.data.length; i++) {
                                    prop.push(res.data[i].id.toString());
                                    opt.push(res.data[i].label.toString());
                                    $("[name='" + r + nombre + "']").append('<option value="' + res.data[i].id + '">' + res.data[i].label + '</option>');
                                }

                                $.extend(true, form.schema, eval("({'properties': {" + q1 + "'" + nombre + "': {'enum': " + JSON.stringify(prop) + "}" + q2 + "}})"));
                                $.extend(true, form.options, eval("({'fields': {" + s1 + "'" + nombre + "': {'optionLabels': " + JSON.stringify(opt) + "}" + s2 + "}})"));
                            }
                        }
                    }, error: function() {
                        alert("No fué posible obtener las alternativas");
                    }
                });
            },
            formularioREASUtil: function(opciones, contenedor) {
                //Verificar los modulos necesarios
                try {
                    Alpaca;
                } catch (e) {
                    $.getScript("../js/Plugins/alpaca.min.js");
                }

                var cambiosSinGuardar = false;
                var peticionesPendientes = 0;
                var peticionesConError = false;

                // Defaults
                if (!opciones)
                    var opciones = {};

                if (opciones.mensajeCargando === undefined)
                    opciones.mensajeCargando = "Obteniendo la información desde el servidor...";

                /*if (opciones.parametro_id === undefined) {
                 console.error("El parámetro parametro_id es obligatorio");
                 $(this).html('<h3>Parámetros insuficientes para crear el módulo</h3>');
                 return;
                 }*/
                if (opciones.schema === undefined) {
                    console.error("El parámetro schema es obligatorio");
                    $(this).html('<h3>Parámetros insuficientes para crear el módulo</h3>');
                    return;
                }
                if (opciones.options === undefined) {
                    console.error("El parámetro options es obligatorio");
                    $(this).html('<h3>Parámetros insuficientes para crear el módulo</h3>');
                    return;
                }
                if (opciones.dominios === undefined) {
                    console.error("El parámetro dominios es obligatorio");
                    $(this).html('<h3>Parámetros insuficientes para crear el módulo</h3>');
                    return;
                }

                $(this).each(function() {

                    function iniciarFormulario(c) {
                        Alpaca.setDefaultLocale("es_ES");
                        buscarDominios(c);
                    }

                    function buscarDominios(c) {

                        peticionesPendientes = 0;
                        if (opciones.dominios.length === 0) {
                            procesarPeticionesDominioPendientes(c);
                        }

                        for (var i = 0; i < opciones.dominios.length; i++) {
                            if (opciones.dominios[i].depende_de_datos_cargados || opciones.dominios[i].tipo === "array") {
                                continue;
                            }

                            var parametros = {
                                op: 'ConsultaGenericaFormalizacion',
                                CAMPOS: opciones.dominios[i].campos,
                                TABLA: opciones.dominios[i].tabla,
                                WHERE: opciones.dominios[i].where
                            };
                            peticionesPendientes++;
                            $.ajax({
                                type: "POST",
                                url: "GestionConsultas",
                                dataType: "text",
                                data: parametros,
                                context: opciones.dominios[i],
                                success: function(response) {
                                    if (response)
                                    {
                                        var res = eval('(' + response + ')');
                                        if (res && res.total > 0) {
                                            if (this.tipo === 'boolean') {
                                                var prop = {};
                                                var opt = {};
                                                for (var i = 0; i < res.data.length; i++) {
                                                    $(prop).attr("" + res.data[i].id.toString(), {type: "boolean"});
                                                    $(opt).attr("" + res.data[i].id.toString(), {rightLabel: res.data[i].label.toString()});
                                                }

                                                $.extend(true, opciones.schema, eval("({'properties': {'" + this.nombre + "': {'properties': " + JSON.stringify(prop) + "}}})"));
                                                $.extend(true, opciones.options, eval("({'fields': {'" + this.nombre + "': {'fields': " + JSON.stringify(opt) + "}}})"));
                                            } else if (this.tipo === 'select') {
                                                var prop = [];
                                                var opt = [];
                                                for (var i = 0; i < res.data.length; i++) {
                                                    prop.push(res.data[i].id.toString());
                                                    opt.push(res.data[i].label.toString());
                                                }

                                                var q1 = "";
                                                var q2 = "";
                                                var s1 = "";
                                                var s2 = "";
                                                if (this.padre) {
                                                    q1 = "'" + this.padre + "':{'properties':{";
                                                    q2 = "}}";
                                                    s1 = "'" + this.padre + "':{'fields':{";
                                                    s2 = "}}";
                                                }

                                                $.extend(true, opciones.schema, eval("({'properties': {" + q1 + "'" + this.nombre + "': {'enum': " + JSON.stringify(prop) + "}" + q2 + "}})"));
                                                $.extend(true, opciones.options, eval("({'fields': {" + s1 + "'" + this.nombre + "': {'optionLabels': " + JSON.stringify(opt) + "}" + s2 + "}})"));
                                            }
                                        }
                                    }
                                    procesarPeticionesDominioPendientes(c);
                                }, error: function() {
                                    alert("No fué posible obtener las opciones de respuesta del formulario");
                                    procesarPeticionesDominioPendientes(c);
                                }
                            });
                        }
                    }

                    function procesarPeticionesDominioPendientes(c) {
                        peticionesPendientes--;
                        if (peticionesPendientes <= 0) {

                            if (opciones.parametro_id) {
                                buscarDatosAlmacenados(c);
                            } else {
                                crearFormulario(c);
                            }
                        }
                    }

                    function buscarDatosAlmacenados(c) {

                        $.ajax({
                            type: "POST",
                            url: "GestionConsultas",
                            dataType: "text",
                            data: opciones.busqueda,
                            success: function(response) {
                                if (response)
                                {
                                    var res = eval('(' + response + ')');
                                    if (res && res.total > 0) {
                                        var data = res.data[0];
                                        $.extend(data, {"token": opciones.parametro_id});

                                        buscarHijos(c, data);

                                    } else {
                                        alert("No hay formularios del identificador ingresado");
                                        crearFormulario(c);
                                    }

                                }
                            }, error: function() {
                                alert("No fué posible realizar la consulta");
                                crearFormulario(c);
                            }
                        });
                    }

                    function buscarHijos(c, data) {
                        var hijos = [];
                        for (var i = 0; i < opciones.dominios.length; i++) {
                            if (opciones.dominios[i].depende_de_datos_cargados) {
                                try {
                                    var padre = eval("(" + data[opciones.dominios[i].padre] + ")");
                                    if (eval(opciones.dominios[i].condicion_evaluacion)) {
                                        hijos.push({
                                            parametros: {
                                                op: 'ConsultaGenericaFormalizacion',
                                                CAMPOS: opciones.dominios[i].campos,
                                                TABLA: opciones.dominios[i].tabla,
                                                WHERE: eval(opciones.dominios[i].where)
                                            },
                                            nombre: opciones.dominios[i].nombre,
                                            padre: opciones.dominios[i].padre
                                        });
                                    }
                                } catch (e) {

                                }
                            }

                            if (opciones.dominios[i].tipo === 'boolean') {
                                hijos.push({
                                    parametros: {
                                        op: 'ConsultaGenericaFormalizacion',
                                        CAMPOS: opciones.dominios[i].atributo_dominio,
                                        TABLA: opciones.dominios[i].tabla_valores,
                                        WHERE: opciones.dominios[i].atributo_concepto + ' = ' + data.soli_id,
                                        a: Math.random()
                                    },
                                    nombre: opciones.dominios[i].nombre,
                                    padre: opciones.dominios[i].padre,
                                    tipo: "boolean"
                                });
                            }
                        }

                        peticionesPendientes = hijos.length;
                        if (hijos.length === 0) {
                            procesarPeticionesHijosPendientes(c, data);
                        }
                        for (var j = 0; j < hijos.length; j++) {

                            $.ajax({
                                type: "POST",
                                url: "GestionConsultas",
                                dataType: "text",
                                data: hijos[j].parametros,
                                context: hijos[j],
                                success: function(response) {
                                    if (response)
                                    {
                                        var res = eval('(' + response + ')');
                                        if (res && res.total > 0) {
                                            if (this.tipo === "boolean") {
                                                for (var i = 0; i < res.data.length; i++) {
                                                    $.extend(true, data, eval("({'" + this.nombre + "': {'" + res.data[i][this.parametros.CAMPOS] + "': true}})"));
                                                }
                                            } else {


                                                var prop = [];
                                                var opt = [];
                                                for (var i = 0; i < res.data.length; i++) {
                                                    prop.push(res.data[i].id.toString());
                                                    opt.push(res.data[i].label.toString());
                                                }

                                                var q1 = "";
                                                var q2 = "";
                                                var s1 = "";
                                                var s2 = "";
                                                if (this.padre) {
                                                    q1 = "'" + this.padre + "':{'properties':{";
                                                    q2 = "}}";
                                                    s1 = "'" + this.padre + "':{'fields':{";
                                                    s2 = "}}";
                                                }

                                                $.extend(true, opciones.schema, eval("({'properties': {" + q1 + "'" + this.nombre + "': {'enum': " + JSON.stringify(prop) + "}" + q2 + "}})"));
                                                $.extend(true, opciones.options, eval("({'fields': {" + s1 + "'" + this.nombre + "': {'optionLabels': " + JSON.stringify(opt) + "}" + s2 + "}})"));
                                            }
                                        }
                                    }
                                    procesarPeticionesHijosPendientes(c, data);
                                }, error: function() {
                                    alert("No fué posible obtener los hijos");
                                    procesarPeticionesHijosPendientes(c, data);
                                }
                            });
                        }
                    }

                    function procesarPeticionesHijosPendientes(c, data) {
                        peticionesPendientes--;
                        if (peticionesPendientes <= 0) {
                            crearFormulario(c, data);
                        }
                    }

                    function llenarAtributosFaltantes(objeto, atributos, prefijo) {
                        for (var prop in atributos) {

                            if (typeof atributos[prop] === "object") {
                                if (objeto[prop] === undefined)
                                    $(objeto).attr(prop, {});
                                var ob = llenarAtributosFaltantes(objeto[prop], atributos[prop], prop);
                                for (var p in ob) {
                                    $(objeto).attr(p, ob[p]);
                                }
                                $(objeto).removeAttr(prop);
                            }

                            if (objeto[prop] === undefined || objeto[prop] === "" || (atributos[prop] === "integer" && objeto[prop] === -1)) {
                                switch (atributos[prop]) {
                                    case "boolean":
                                        $(objeto).attr(prop, "null");
                                        break;
                                    case "text":
                                        $(objeto).attr(prop, "");
                                        break;
                                    case "integer":
                                        $(objeto).attr(prop, "null");
                                        break;
                                    case "date":
                                        $(objeto).attr(prop, "");
                                        break;
                                }
                            }
                        }
                        return objeto;
                    }

                    function crearFormulario(c, data) {
                        if (!data) {
                            data = {
                                "token": opciones.parametro_id
                            };
                        }

                        $(c).empty();
                        $(c).alpaca({
                            "data": data,
                            "schema": opciones.schema,
                            "options": opciones.options,
                            "view": opciones.view,
                            "postRender": function(form) {

                                $(form.container).addClass("FormularioAbreviado");
                                $(form.container).prepend('<div class="verTutorialBtn" id="ayuda"></div>');

                                $.each($(".alpaca-wizard-nav-bar"), function(index, item) {
                                    $(item).parent().prepend('<HR>');
                                    $(item).parent().prepend($(item).clone(true, true).css('float', 'none').css('margin', '10px 0').addClass("siguientePaso"));
                                });

                                $('<button type="button" accesskey="c" class="alpaca-wizard-button-pre"><span style="float: left;" class="ui-icon ui-icon-close"></span><span>Cancelar</span></button>').click(function() {
                                    $("<div>¿Desea salir de la página actual?<br>Los cambios no serán guardados.</div>").dialog({
                                        resizable: false,
                                        modal: true,
                                        dialogClass: "no-close",
                                        draggable: false,
                                        closeOnEscape: false,
                                        width: 300,
                                        title: "Salir y volver",
                                        buttons: {
                                            "Continuar": function() {
                                                $(this).dialog("close");
                                            },
                                            "Salir sin guardar": function() {
                                                $(this).dialog("close");
                                                opciones.guardado_completo.call(contenedor, true);
                                            }
                                        }
                                    });
                                }).prependTo($(".alpaca-wizard-nav-bar"));

                                try {
                                    loadTutorials();
                                } catch (e) {
                                }

                                try {
                                    loadTooltips();
                                } catch (e) {
                                }

                                cambiosSinGuardar = false;

                                $("#" + form.form.id + " .alpaca-fieldset-array-item-toolbar-add, .alpaca-fieldset-array-item-toolbar-remove").click(function() {
                                    cambiosSinGuardar = true;
                                });
                                $("#" + form.form.id + " input, #" + form.form.id + " select, #" + form.form.id + " textarea").change(function() {
                                    cambiosSinGuardar = true;
                                });

                                $(form.children).each(function() {
                                    $(this.field).change(function() {
                                        cambiosSinGuardar = true;
                                    });

                                    if (this.type === "array") {

                                        $(this.children).each(function(child) {
                                            $(this.field).change(function() {
                                                cambiosSinGuardar = true;
                                            });
                                            $(this.children).each(function(child) {
                                                $(this.field).change(function() {
                                                    cambiosSinGuardar = true;
                                                });
                                            });
                                        });

                                        $(this.container).bind("DOMNodeInserted DOMNodeRemoved'", function() {
                                            cambiosSinGuardar = true;
                                        });
                                    }
                                });

                                $("#" + form.form.id + " button.alpaca-wizard-button-done").click(function() {
                                    if (!form.isValid(true)) {
                                        alert("El formulario contiene errores");
                                        return;
                                    }

                                    var json = form.getValue();
                                    if(opciones.preprocesarAtributosEnviar){
                                        json = opciones.preprocesarAtributosEnviar(json);
                                    }
                                    $.extend(json, {op: opciones.operacion_insertar_editar});

                                    json = llenarAtributosFaltantes(json, opciones.atributosEsperados);

                                    if (!cambiosSinGuardar) {
                                        $("<div>No se detectaron cambios en la información, sin embargo puede actualizar los datos del formulario.</div>").dialog({
                                            resizable: false,
                                            modal: true,
                                            dialogClass: "no-close",
                                            draggable: false,
                                            closeOnEscape: false,
                                            width: 500,
                                            title: "No se detectaron cambios para guardar",
                                            buttons: {
                                                "Guardar y sobrescribir": function() {
                                                    $(this).dialog("close");
                                                    guardar(c, data, json);
                                                },
                                                "Salir sin guardar": function() {
                                                    $(this).dialog("close");
                                                    opciones.guardado_completo.call(contenedor, true, json[opciones.atributoNombreFormulario]);
                                                    return;
                                                }
                                            }
                                        });
                                    } else {
                                        guardar(c, data, json);
                                    }
                                });
                            }
                        });
                    }

                    function guardar(c, data, json) {
                        $("<div id='dialog_espere' style='text-align: center;'>Guardando.<br><br>Este mensaje se cerrará automáticamente.<div id='progressbar'></div></div>").dialog({
                            resizable: false,
                            modal: true,
                            draggable: false,
                            closeOnEscape: false,
                            width: 350,
                            title: "Por favor espere",
                            buttons: {},
                            open: function() {
                                $("#progressbar").progressbar({
                                    value: false
                                });
                            }
                        });
                        //Enviar 
                        $.ajax({
                            type: "POST",
                            url: opciones.op? opciones.op : "GestionDML",
                            dataType: "text",
                            success: function(response) {
                                if (response)
                                {
                                    var res = eval('(' + response + ')');
                                    if (res && res.total > 0) {
                                        peticionesPendientes = 0;
                                        procesarrelacionesMuchosMuchos(c, json, res.data[0][opciones.atributoCodigoFormulario], res.data[0][opciones.atributoNombreFormulario]);
                                    } else {
                                        alert("Ocurrió un error al verificar el guardado de la información");
                                        peticionesPendientes = 0;
                                        if (res && res.data && res.data.length > 0) {
                                            procesarPeticionesPendientesDominios(c, false, res.data[0][opciones.atributoNombreFormulario]);
                                        } else {
                                            if(opciones.onErrorGuardado){
                                                opciones.onErrorGuardado(res);
                                            }
                                            procesarPeticionesPendientesDominios(c, false, null);
                                        }
                                    }
                                }
                            }, error: function() {
                                alert("No fué posible guardar los datos");
                            },
                            data: json
                        });
                    }

                    function procesarrelacionesMuchosMuchos(c, json, concepto_id, formulario_nombre) {
                        try {
                            $.loader({
                                className: "blue-with-image-2",
                                content: 'Cargando...'
                            });
                        } catch (e) {
                        }
                        var peticionEnviada = false;
                        for (var i = 0; i < opciones.dominios.length; i++) {
                            if (opciones.dominios[i].tipo === "boolean" || opciones.dominios[i].tipo === "array") {
                                peticionEnviada = true;
                                peticionesPendientes++;

                                var parametros = {
                                    op: 'PrepararDominioConceptoJuridico',
                                    tabla_valores: opciones.dominios[i].tabla_valores,
                                    atributo_concepto: opciones.dominios[i].atributo_concepto,
                                    concepto_id: concepto_id
                                };
                                $.ajax({
                                    type: "POST",
                                    url: "GestionDML",
                                    dataType: "text",
                                    data: parametros,
                                    context: opciones.dominios[i],
                                    success: function() {
                                        for (var prop in json[this.nombre]) {
                                            if (json[this.nombre][prop]) {
                                                var parametros;
                                                if (this.tipo === "array") {
                                                    parametros = json[this.nombre][prop];
                                                    $.extend(parametros, {
                                                        op: this.operacion_insertar,
                                                        valor_concepto: concepto_id
                                                    });
                                                } else if (this.tipo === "boolean") {
                                                    parametros = {
                                                        op: 'InsertarDominioConceptoJuridico',
                                                        tabla_valores: this.tabla_valores,
                                                        atributo_dominio: this.atributo_dominio,
                                                        atributo_concepto: this.atributo_concepto,
                                                        separador_atributo_dominio: this.separador_atributo_dominio? this.separador_atributo_dominio: "",
                                                        dominio: prop,
                                                        valor_concepto: concepto_id
                                                    };
                                                }

                                                peticionesPendientes++;
                                                $.ajax({
                                                    type: "POST",
                                                    url: "GestionDML",
                                                    dataType: "text",
                                                    data: parametros,
                                                    success: function() {
                                                        procesarPeticionesPendientesDominios(c, true, formulario_nombre);
                                                    },
                                                    error: function() {
                                                        procesarPeticionesPendientesDominios(c, false, formulario_nombre);
                                                        alert("No fué posible realizar la consulta");
                                                    }
                                                });
                                            }
                                        }
                                        procesarPeticionesPendientesDominios(c, true, formulario_nombre);
                                    },
                                    error: function() {
                                        procesarPeticionesPendientesDominios(c, false, formulario_nombre);
                                        alert("No fué posible realizar la consulta");
                                    }
                                });
                            }
                        }

                        if (!peticionEnviada) {
                            procesarPeticionesPendientesDominios(c, true, formulario_nombre);
                        }
                    }

                    var maxPeticionesPendientes = null;
                    function procesarPeticionesPendientesDominios(c, success, nombreFormulario) {
                        if (!maxPeticionesPendientes || maxPeticionesPendientes < peticionesPendientes) {
                            maxPeticionesPendientes = peticionesPendientes;
                        }

                        $("#progressbar").progressbar({
                            value: (maxPeticionesPendientes - peticionesPendientes) / maxPeticionesPendientes * 100
                        });

                        peticionesPendientes--;
                        if (!success)
                            peticionesConError = true;
                        if (peticionesPendientes <= 0) {
                            $("#dialog_espere").dialog("destroy");
                            if (opciones.guardado_completo !== undefined) {
                                if (nombreFormulario) {
                                    opciones.guardado_completo.call(contenedor, !peticionesConError, nombreFormulario);
                                } else {
                                    opciones.guardado_completo.call(contenedor, !peticionesConError, null);
                                }
                            } else {
                                if (!peticionesConError)
                                    alert("La información se almacenó corectamente");
                                else
                                    alert("Se presentó un error al almacenar la información");
                            }

                            peticionesConError = false;
                        }
                    }

                    $(this).html('<div class="blue-with-image-2">' + opciones.mensajeCargando + '</span>');
                    iniciarFormulario($(this));
                });
            }
        });
    })(jQuery);
