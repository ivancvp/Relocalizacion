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

function FormularioConsulta(div, callbackOnResultadoSeleccionado, mostrarToolTip, titulo, editable, callbackOnConsultaFinalizada) {
    this.div = div;
    this.callbackOnResultadoSeleccionado = callbackOnResultadoSeleccionado;
    this.callbackOnConsultaFinalizada = callbackOnConsultaFinalizada;
    this.titulo = titulo;
    this.editable = editable;

    if (mostrarToolTip !== null) {
        this.mostrarToolTip = mostrarToolTip;
    }
}

FormularioConsulta.prototype.div = null;
FormularioConsulta.prototype.callbackOnResultadoSeleccionado = null;
FormularioConsulta.prototype.callbackOnConsultaFinalizada = null;
FormularioConsulta.prototype.mostrarToolTip = false;
FormularioConsulta.prototype.titulo = null;
FormularioConsulta.prototype.editable = false;

FormularioConsulta.prototype.iniciarFormulario = function () {
    $("#" + this.div).empty();

    $("#" + this.div).append('<form class="forms ui-tabs-panel ui-widget-content ui-corner-all" autocomplete="on" style="padding-bottom: 20px; border-width: 0;"></form>');
    if (this.titulo) {
        $("#" + this.div + " form").append('<div class="titulo-panel-busqueda"><h3>' + this.titulo + '</h3></div>');
    }

    //$("#" + this.div + " form").append('<label><h3 style="color: #005000;">Buscar solicitud por:</h3></label>');
    //$("#" + this.div + " form").append('<label><p style="color: #777777;">* Puede buscar por cualquiera de los siguientes criterios. No es necesario diligenciarlos todos para realizar la consulta</p></label>');
    $("#" + this.div + " form").append('<table/>');
    $("#" + this.div + " form table").append('<tr><td><label>Identificador:</label></td><td><input type="text" autocomplete autofocus name="consulta_txtCodigoSolicitud" id="consulta_txtCodigoSolicitud"></td></tr>');
    $("#" + this.div + " form table").append('<tr><td><a  href="#avanzada" data-toggle="collapse">Busqueda Avanzada <span class="glyphicon glyphicon-search" aria-hidden="true"></span></a></td><td></td></tr>');

    $("#" + this.div + " form table").append('<tr id="avanzada" class="collapse"><td><label>Contratos vigentes entre:</label>' +
            '</td><td>' +
            '<div class="btn-group btn-group-sm">' +
            '        <input type="text" class="datepicker input-small col-sm-5" id="start" placeholder="dd/mm/yyyy"/>' +
            '        <div class="col-sm-1" style="vertical-align: middle; display: table-cell; vertical-align: middle; line-height:30px;" >-</div>' +
            '        <input type="text" class="datepicker input-small col-sm-5" id="end" placeholder="dd/mm/yyyy"/>' +
            '</div>' +
            '<div class="clearfix"></div>' +
            '<div class="btn-group btn-group-sm" id="grpRangoFechas">' +
            '    <a class="btn btn-default" data-inicio="-1m" data-fin="0">Último mes</a>' +
            '    <a class="btn btn-default" data-inicio="-6m" data-fin="0">Útimo semestre</a>' +
            '    <a class="btn btn-default" data-inicio="-1y" data-fin="0">Último año</a>' +
            '</div>' + 
            '</td></tr>' +
            '<tr><td></td><td><hr></td></tr>');

    $("#" + this.div + " form table").find("input.datepicker").datepicker({
        dateFormat: "dd/mm/yy",
        dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
        monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    });
    
    //$("#" + this.div + " form table").find("input.datepicker#start").datepicker("setDate",new Date((new Date()).getFullYear() ,0,1));
    
    $("#" + this.div + " form table").find("#grpRangoFechas").find(".btn").click(function(e){
       $("input.datepicker#start").datepicker("setDate",$(e.target).attr("data-inicio"));
       $("input.datepicker#end").datepicker("setDate",$(e.target).attr("data-fin"));
    });
    
    //Crear Boton de buscar
    $('<a>', {
        text: 'Buscar',
        title: 'Buscar',
        href: '#',
        class: 'siguiente',
        id: 'FormularioConsultaSolicutudes_btnBuscar',
        click: $.proxy(this.buscarSolicitud, this)
    }).appendTo($("#" + this.div + " form"));

    $('<a>', {
        text: 'Buscando...',
        title: 'Buscando...',
        class: 'siguiente',
        href: '#',
        id: 'FormularioConsultaSolicutudes_lblBuscando'
    }).hide().appendTo($("#" + this.div + " form"));

    $("#" + this.div + " form").append('<div style="margin-top: 20px; margin-bottom: 20px; margin-right: 20px; width:100%;" id="div_resultados"></div>');

    $("#" + this.div + " form input").keypress(function (e) {
        if (e.which === 13) {
            e.preventDefault();
            if ($("#FormularioConsultaSolicutudes_btnBuscar").is(":visible")) {
                $("#FormularioConsultaSolicutudes_btnBuscar").trigger("click");
            }
        }
    });

};

FormularioConsulta.prototype.buscarSolicitud = function () {
    //Vaciar el listado de resultados anteriores
    var instancia = this;
    $("#" + this.div + " form #div_resultados").empty();
//    var identificador=(identi?identi:($("#" + this.div + " #consulta_txtCodigoSolicitud")[0].value !== "" ? $("#" + this.div + " #consulta_txtCodigoSolicitud")[0].value : ""));
    var identificador= $("#" + this.div + " #consulta_txtCodigoSolicitud")[0].value;
    
    var parametros = {
        op: 'consulta_listado_resoluciones',
        IDENTIFICADOR: identificador,
        inicio: $("#" + this.div + " #start")[0].value,
        fin: $("#" + this.div + " #end")[0].value,
        /*resolucion_estado: $("#" + this.div + " #consulta_resolucion_estado").find("option:selected").val(),
         resolucion_marzo_upd_usuario: $("#" + this.div + " #consulta_resolucion_marzo_upd_usuario").find("option:selected").val(),
         COD_SOLI: ($("#" + this.div + " #consulta_txtCodigoSolicitud")[0].value !== "" ? $("#" + this.div + " #consulta_txtCodigoSolicitud")[0].value : "null"),
         NOMBRE: $("#" + this.div + " #consulta_txtNombreSolicitante")[0].value,
         DOCUMENTO: $("#" + this.div + " #consulta_txtCedulaSolicitante")[0].value,
         CEDULA_CATASTRAL: ($("#" + this.div + " #consulta_txtCedulaCatastral")[0].value !== "" ? $("#" + this.div + " #consulta_txtCedulaCatastral")[0].value : "null"),
         */
        _a: Math.random(), _a_: Math.random()
    };
    $.ajax({
        data: parametros,
        url: 'GestionConsultas',
        type: 'GET',
        dataType: 'text',
        context: this,
        beforeSend: function () {
            $("#" + this.div + " form #div_resultados").append('<h3>Buscando, por favor espere...</h3>');

            $("#FormularioConsultaSolicutudes_btnBuscar").hide();
            $("#FormularioConsultaSolicutudes_lblBuscando").show();

        },
        complete: function () {
            $("#FormularioConsultaSolicutudes_btnBuscar").show();
            $("#FormularioConsultaSolicutudes_lblBuscando").hide();
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

                        var instanciaFormularioConsulta = this;
                        $("#" + this.div + " form #div_resultados").empty();

                        $("#" + instanciaFormularioConsulta.div + " form #div_resultados").append(
                                '<table id="tabla_resultados" class="stripe hover">' +
                                '<thead><tr><th>IDENTIFICADOR</th><th>Nombre Evacuado</th><th>Cédula Evacuado</th>' +
                                '<th>Entrega de vivienda</th>' +
                                //<th>Estado</th><th>Asignado a</th><th>Custodia del expediente</th><th>CDP</th><th>CRP</th><th>Resolución</th><th></th>'
                                '</tr></thead><tbody></tbody></table>');
                        for (var i = 0; i < res.data.length; i++) {

                            $("#" + instanciaFormularioConsulta.div + " form #div_resultados #tabla_resultados tbody").append('<tr data-indice-resultado="' + i + '" data-id="' + res.data[i]['IDENTIFICADOR'] + '" data-soli-id="' + res.data[i].soli_id + '" data-soli-cod-soli="' + res.data[i].soli_cod_soli + '"></tr>');

                            $($("#" + instanciaFormularioConsulta.div + " form #div_resultados #tabla_resultados tbody tr")[i]).append(
                                    //'<td  ><span class="alert alert-' + (res.data[i]['tiene_alertas'] ? 'danger' : 'success') + '" style="border-radius: 50px;  padding: 0 8px;">' + (res.data[i]['tiene_alertas'] ? 'Si' : 'No') + '</span></td>' +
                                    '<td style="padding:10px;"><a class="expandirTabla"  style="cursor: pointer; text-decoration: underline;">' + res.data[i]['IDENTIFICADOR'] + '</a></td>' +
                                    '<td><a class="expandirTabla"  style="cursor: pointer; text-decoration: underline;">' + res.data[i]['NOMBRE EVACUADO'] + '</a></td>' +
                                    '<td><a class="expandirTabla"  style="cursor: pointer; text-decoration: underline;">' + res.data[i]['CEDULA EVACUADO'] + '</a></td>' +
                                    '<td>' + res.data[i]['entrega_vivienda'] + '</td>'
                                    /* + '<td><span class="editable estados" style="cursor: pointer;" data-name="resolucion_estado" data-tipo="\'" >' + res.data[i]['resolucion_estado'] + '</span></td>' +
                                     '<td><span class="editable usuarios" style="cursor: pointer;" data-name="resolucion_marzo_upd_usuario" data-tipo="\'" >' + res.data[i]['resolucion_marzo_upd_usuario'] + '</span></td>' +
                                     '<td><span class="editable custodios" style="cursor: pointer;" data-name="custodia_expediente" data-tipo="\'" >' + res.data[i]['custodia_expediente'] + '</span></td>' +
                                     '<td><span  data-name="CDP" data-tipo="\'" >' + res.data[i]['CDP'] + '</span></td>' +
                                     '<td><span  data-name="CRP" data-tipo="\'" >' + res.data[i]['crp_numero'] + '</span></td>' +
                                     '<td><span class="editable resoluciones" data-name="RESOLUCION" data-tipo="\'" >' + (res.data[i]['RESOLUCION'] ? res.data[i]['RESOLUCION'] :
                                     '<span title="Calcular numero de resolución" class="autocalcular_resolucion" style="cursor: pointer; background: url(\'../images/page_white_edit.png\') no-repeat scroll left top rgba(0, 0, 0, 0);font-size: 14px; padding: 0 0 0 20px;"></span>') + '</span></td>' +
                                     '<td><input id="chck" type="checkbox"></td>'*/
                                    );
                        }

                        $.extend($.fn.dataTable.defaults, {
                            "bFilter": true,
                            "bSort": true
                        });

                        var oTable = $("#" + instanciaFormularioConsulta.div + " form #div_resultados #tabla_resultados").dataTable({
                            "oLanguage": {
                                "sLengthMenu": "Mostrar _MENU_ resultados por página",
                                "sZeroRecords": "No hay resultados",
                                "sInfo": "Viendo _START_ a _END_, de _TOTAL_ resultados",
                                "sInfoEmpty": "Viendo 0 a 0, de 0 resultados",
                                "sInfoFiltered": "(Filtrado de _MAX_ resultados totales)"
                            },
                            "sDom": 'T<"clear">lfrtip',
                            /*"oTableTools": {
                             "sSwfPath": "../js/Plugins/swf/ZeroClipboard.swf"
                             },*/
                            "aoColumnDefs": [
                                //{"bSortable": false, "aTargets": [0]}
                            ],
                            "aaSorting": [[0, 'asc']],
                            "fnDrawCallback": function () {
                                if (instancia.editable) {
                                    try {
                                        $('#' + instanciaFormularioConsulta.div + ' form #div_resultados #tabla_resultados tbody td .editable.resoluciones').find('.autocalcular_resolucion').click(function () {
                                            //alert($(this).data().name);

                                            var objeto = {
                                                op: "actualizarNumeroResolucionConsecutivo",
                                                IDENTIFICADOR: $($(this).parents('tr')[0]).data('id')
                                            };

                                            $.ajax({
                                                type: "POST",
                                                url: "GestionDML",
                                                dataType: "text",
                                                async: false,
                                                data: objeto,
                                                context: this,
                                                success: function (data) {
                                                    $.loader('close');
                                                    var res = eval('(' + data + ')');
                                                    if (res && res.total > 0) {

                                                        $($(this).parents('span')[0]).text(res.data[0]['RESOLUCION']);
                                                        //$(this).html(res.data[0]['RESOLUCION']);
                                                    } else {
                                                        alert("Se alcanzó el valor máximo de la secuencia de resoluciones disponibles.");
                                                    }
                                                }

                                            });

                                            /*
                                             if ($($(this).parents('tr')[0]).find("#chck").prop('checked')) {
                                             var ids = [];
                                             for (var i = 0; i < $(oTable.$('tr')).find("#chck:checked").parents('tr').length; i++) {
                                             ids.push($($(oTable.$('tr')).find("#chck:checked").parents('tr')[i]).data('id'));
                                             }
                                             alert(ids.join("','"));
                                             
                                             } else {
                                             alert( $($(this).parents('tr')[0]).data('id') );
                                             
                                             }
                                             */
                                        });

                                        var estados = {};//{"Priorizado para revisión": "Priorizado para revisión", "Alistamiento de expediente": "Alistamiento de expediente", "Asignado": "Asignado", "Revisión Jurídica": "Revisión Jurídica", "Revisión Financiera": "Revisión Financiera", "Impresa - REAS": "Impresa - REAS", "Numeración": "Numeración", "Solicitud RP": "Solicitud RP", "Registrado": "Registrado", "Memorando": "Memorando", "Devolucion": "Devolucion", "Sin expediente": "Sin expediente", "NO PROCEDE!": "NO PROCEDE!"};
                                        for (var estado in lista_estados) {
                                            estados[lista_estados[estado]] = lista_estados[estado];
                                        }

                                        $('#' + instanciaFormularioConsulta.div + ' form #div_resultados #tabla_resultados tbody td .editable.estados')
                                                .editable('GestionDML', {
                                                    tooltip: "Click para editar",
                                                    //event: "dblclick",
                                                    data: JSON.stringify(estados),
                                                    type: 'select',
                                                    submit: 'Guardar',
                                                    width: 150,
                                                    "callback": function (sValue, y) {
                                                        // Redraw the table from the new data on the server /
                                                        var r = eval('(' + sValue + ')');
                                                        if (r && r.data && r.data.length > 0) {
                                                            if (r.data.length === 1) {
                                                                $(this).text(estados[(r.data[0][$(this).data().name])]);
                                                            } else {
                                                                $(oTable.$('tr')).find("#chck:checked").parents('tr').find("span.editable.estados").text(estados[(r.data[0][$(this).data().name])]);
                                                            }
                                                        }
                                                        //oTable.fnDraw();
                                                    },
                                                    "submitdata": function (value, settings) {
                                                        if ($($(this).parents('tr')[0]).find("#chck").prop('checked')) {
                                                            var ids = [];
                                                            for (var i = 0; i < $(oTable.$('tr')).find("#chck:checked").parents('tr').length; i++) {
                                                                ids.push($($(oTable.$('tr')).find("#chck:checked").parents('tr')[i]).data('id'));
                                                            }
                                                            return {
                                                                "IDENTIFICADORES": "'" + ids.join("','") + "'",
                                                                "nombre": $(this).data().name,
                                                                "tipo": $(this).data().tipo,
                                                                "op": "ActualizarEstadoResolucionesMasivo"
                                                            };
                                                        } else {
                                                            return {
                                                                "IDENTIFICADOR": $($(this).parents('tr')[0]).data('id'),
                                                                "nombre": $(this).data().name,
                                                                "tipo": $(this).data().tipo,
                                                                "op": "ActualizarEstadoResoluciones"
                                                            };
                                                        }
                                                    },
                                                    "height": "14px"
                                                });


                                        var usuarios = {"Alexander Roncancio": "Alexander Roncancio", "Angélica Acosta": "Angélica Acosta", "Miguel Diaz": "Miguel Diaz", "Stephany Consuegra": "Stephany Consuegra", "Johanna Alejandra Perdomo": "Johanna Alejandra Perdomo", "Johanna Alejandra Fernandez": "Johanna Alejandra Fernandez", "Sayudy Cortes": "Sayudy Cortes", "Johana Solorzano": "Johana Solorzano", "Yael Fonseca": "Yael Fonseca", "Cristian Jahir Torres": "Cristian Jahir Torres", "Maria Fernanda Rozo Malaver": "Maria Fernanda Rozo Malaver", "Diana Milena Sanchez Vera": "Diana Milena Sanchez Vera", "Gina Paola Bohorquez": "Gina Paola Bohorquez", "Clara Villamizar": "Clara Villamizar", "Mayra Marcela Vallejo Vallejo": "Mayra Marcela Vallejo Vallejo", "Carlos Julian Florez Bravo": "Carlos Julian Florez Bravo", "Edith Gomez Bautista": "Edith Gomez Bautista", "Ana Elvira Penagos Lopez": "Ana Elvira Penagos Lopez", "Ludy Candelaria Polanco Castro": "Ludy Candelaria Polanco Castro", "Oscar Felipe Marlés Monje": "Oscar Felipe Marlés Monje", "Rocío del Pilar Albarracín": "Rocío del Pilar Albarracín", "Amanda Jara": "Amanda Jara"};
                                        $('#' + instanciaFormularioConsulta.div + ' form #div_resultados #tabla_resultados tbody td .editable.usuarios')
                                                .editable('GestionDML', {
                                                    tooltip: "click para editar",
                                                    //event: "dblclick",
                                                    data: '{"Alexander Roncancio":"Alexander Roncancio","Angélica Acosta":"Angélica Acosta","Miguel Diaz":"Miguel Diaz","Stephany Consuegra":"Stephany Consuegra","Johanna Alejandra Perdomo":"Johanna Alejandra Perdomo","Johanna Alejandra Fernandez":"Johanna Alejandra Fernandez","Sayudy Cortes":"Sayudy Cortes","Johana Solorzano":"Johana Solorzano","Yael Fonseca":"Yael Fonseca","Cristian Jahir Torres":"Cristian Jahir Torres","Maria Fernanda Rozo Malaver":"Maria Fernanda Rozo Malaver", "Diana Milena Sanchez Vera":"Diana Milena Sanchez Vera", "Gina Paola Bohorquez": "Gina Paola Bohorquez", "Clara Villamizar": "Clara Villamizar",  "Maria Alejandra Gonzalez":"Maria Alejandra Gonzalez",  "Angela Maria Polania Figueroa":"Angela Maria Polania Figueroa", "Mayra Marcela Vallejo Vallejo":"Mayra Marcela Vallejo Vallejo", "Carlos Julian Florez Bravo":"Carlos Julian Florez Bravo",   "Edith Gomez Bautista":"Edith Gomez Bautista", "Ana Elvira Penagos Lopez":"Ana Elvira Penagos Lopez", "Ludy Candelaria Polanco Castro": "Ludy Candelaria Polanco Castro", "Oscar Felipe Marlés Monje":"Oscar Felipe Marlés Monje","Rocío del Pilar Albarracín":"Rocío del Pilar Albarracín","Amanda Jara":"Amanda Jara"}',
                                                    type: 'select',
                                                    submit: 'Guardar',
                                                    width: 150,
                                                    "callback": function (sValue, y) {
                                                        /*
                                                         var r = eval('(' + sValue + ')');
                                                         if (r && r.data && r.data.length > 0) {
                                                         $(this).text(usuarios[(r.data[0][$(this).data().name])]);
                                                         }
                                                         */
                                                        var r = eval('(' + sValue + ')');
                                                        if (r && r.data && r.data.length > 0) {
                                                            if (r.data.length === 1) {
                                                                $(this).text(usuarios[(r.data[0][$(this).data().name])]);
                                                            } else {
                                                                $(oTable.$('tr')).find("#chck:checked").parents('tr').find("span.editable.usuarios").text(usuarios[(r.data[0][$(this).data().name])]);
                                                            }
                                                        }
                                                        //oTable.fnDraw();
                                                    },
                                                    "submitdata": function (value, settings) {
                                                        /*
                                                         return {
                                                         "IDENTIFICADOR": $($(this).parents('tr')[0]).data('id'),
                                                         "nombre": $(this).data().name,
                                                         "tipo": $(this).data().tipo,
                                                         "op": "ActualizarEstadoResoluciones"
                                                         };
                                                         */
                                                        if ($($(this).parents('tr')[0]).find("#chck").prop('checked')) {
                                                            var ids = [];
                                                            for (var i = 0; i < $(oTable.$('tr')).find("#chck:checked").parents('tr').length; i++) {
                                                                ids.push($($(oTable.$('tr')).find("#chck:checked").parents('tr')[i]).data('id'));
                                                            }
                                                            return {
                                                                "IDENTIFICADORES": "'" + ids.join("','") + "'",
                                                                "nombre": $(this).data().name,
                                                                "tipo": $(this).data().tipo,
                                                                "op": "ActualizarEstadoResolucionesMasivo"
                                                            };
                                                        } else {
                                                            return {
                                                                "IDENTIFICADOR": $($(this).parents('tr')[0]).data('id'),
                                                                "nombre": $(this).data().name,
                                                                "tipo": $(this).data().tipo,
                                                                "op": "ActualizarEstadoResoluciones"
                                                            };
                                                        }
                                                    },
                                                    "height": "14px"
                                                });

                                        var custodios = {"Archivo": "Archivo", "Alexander Roncancio": "Alexander Roncancio", "Angélica Acosta": "Angélica Acosta", "Miguel Diaz": "Miguel Diaz", "Stephany Consuegra": "Stephany Consuegra", "Johanna Alejandra Perdomo": "Johanna Alejandra Perdomo", "Johanna Alejandra Fernandez": "Johanna Alejandra Fernandez", "Sayudy Cortes": "Sayudy Cortes", "Johana Solorzano": "Johana Solorzano", "Yael Fonseca": "Yael Fonseca", "Cristian Jahir Torres": "Cristian Jahir Torres", "Maria Fernanda Rozo Malaver": "Maria Fernanda Rozo Malaver", "Diana Milena Sanchez Vera": "Diana Milena Sanchez Vera", "Gina Paola Bohorquez": "Gina Paola Bohorquez", "Clara Villamizar": "Clara Villamizar", "Maria Alejandra Gonzalez": "Maria Alejandra Gonzalez", "Angela Maria Polania Figueroa": "Angela Maria Polania Figueroa", "Mayra Marcela Vallejo Vallejo": "Mayra Marcela Vallejo Vallejo", "Carlos Julian Florez Bravo": "Carlos Julian Florez Bravo", "Edith Gomez Bautista": "Edith Gomez Bautista", "Ana Elvira Penagos Lopez": "Ana Elvira Penagos Lopez", "Ludy Candelaria Polanco Castro": "Ludy Candelaria Polanco Castro", "Oscar Felipe Marlés Monje": "Oscar Felipe Marlés Monje", "Rocío del Pilar Albarracín": "Rocío del Pilar Albarracín", "Amanda Jara": "Amanda Jara"};
                                        $('#' + instanciaFormularioConsulta.div + ' form #div_resultados #tabla_resultados tbody td .editable.custodios')
                                                .editable('GestionDML', {
                                                    tooltip: "click para editar",
                                                    //event: "dblclick",
                                                    data: '{"Archivo":"Archivo","Alexander Roncancio":"Alexander Roncancio","Angélica Acosta":"Angélica Acosta","Miguel Diaz":"Miguel Diaz","Stephany Consuegra":"Stephany Consuegra","Johanna Alejandra Perdomo":"Johanna Alejandra Perdomo","Johanna Alejandra Fernandez":"Johanna Alejandra Fernandez","Sayudy Cortes":"Sayudy Cortes","Johana Solorzano":"Johana Solorzano","Yael Fonseca":"Yael Fonseca","Cristian Jahir Torres":"Cristian Jahir Torres","Maria Fernanda Rozo Malaver":"Maria Fernanda Rozo Malaver", "Diana Milena Sanchez Vera":"Diana Milena Sanchez Vera", "Gina Paola Bohorquez": "Gina Paola Bohorquez", "Clara Villamizar": "Clara Villamizar",  "Maria Alejandra Gonzalez":"Maria Alejandra Gonzalez",  "Angela Maria Polania Figueroa":"Angela Maria Polania Figueroa", "Mayra Marcela Vallejo Vallejo":"Mayra Marcela Vallejo Vallejo", "Carlos Julian Florez Bravo":"Carlos Julian Florez Bravo",   "Edith Gomez Bautista":"Edith Gomez Bautista", "Ana Elvira Penagos Lopez":"Ana Elvira Penagos Lopez", "Ludy Candelaria Polanco Castro": "Ludy Candelaria Polanco Castro", "Oscar Felipe Marlés Monje":"Oscar Felipe Marlés Monje","Rocío del Pilar Albarracín":"Rocío del Pilar Albarracín","Amanda Jara":"Amanda Jara"}',
                                                    type: 'select',
                                                    submit: 'Guardar',
                                                    width: 150,
                                                    "callback": function (sValue, y) {
                                                        /*
                                                         var r = eval('(' + sValue + ')');
                                                         if (r && r.data && r.data.length > 0) {
                                                         $(this).text(custodios[(r.data[0][$(this).data().name])]);
                                                         }*/
                                                        var r = eval('(' + sValue + ')');
                                                        if (r && r.data && r.data.length > 0) {
                                                            if (r.data.length === 1) {
                                                                $(this).text(custodios[(r.data[0][$(this).data().name])]);
                                                            } else {
                                                                $(oTable.$('tr')).find("#chck:checked").parents('tr').find("span.editable.custodios").text(custodios[(r.data[0][$(this).data().name])]);
                                                            }
                                                        }
                                                        //oTable.fnDraw();
                                                    },
                                                    "submitdata": function (value, settings) {
                                                        /*
                                                         return {
                                                         "IDENTIFICADOR": $($(this).parents('tr')[0]).data('id'),
                                                         "nombre": $(this).data().name,
                                                         "tipo": $(this).data().tipo,
                                                         "op": "ActualizarEstadoResoluciones"
                                                         };
                                                         */
                                                        if ($($(this).parents('tr')[0]).find("#chck").prop('checked')) {
                                                            var ids = [];
                                                            for (var i = 0; i < $(oTable.$('tr')).find("#chck:checked").parents('tr').length; i++) {
                                                                ids.push($($(oTable.$('tr')).find("#chck:checked").parents('tr')[i]).data('id'));
                                                            }
                                                            return {
                                                                "IDENTIFICADORES": "'" + ids.join("','") + "'",
                                                                "nombre": $(this).data().name,
                                                                "tipo": $(this).data().tipo,
                                                                "op": "ActualizarEstadoResolucionesMasivo"
                                                            };
                                                        } else {
                                                            return {
                                                                "IDENTIFICADOR": $($(this).parents('tr')[0]).data('id'),
                                                                "nombre": $(this).data().name,
                                                                "tipo": $(this).data().tipo,
                                                                "op": "ActualizarEstadoResoluciones"
                                                            };
                                                        }
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
                                oTable.fnClose(nTr);
                            } else {
                                oTable.fnOpen(nTr, instanciaFormularioConsulta.callbackOnResultadoSeleccionado(res.data[$(nTr).data('indice-resultado')], nTr), 'details-' + $(nTr).data('indice-resultado'));
                            }
                        });

                        if (instancia.callbackOnConsultaFinalizada) {
                            instancia.callbackOnConsultaFinalizada();
                        }

                    } else {
                        alert("No hay datos registrados");
                    }
                }
            }
        }, error: function (e) {
            alert("No fué posible realizar la consulta");
        }
    });
};

FormularioConsulta.prototype.onResultadoSeleccionado = function (item) {
    this.callbackOnResultadoSeleccionado(item);
};


function consultaFinalizada() {

    $("#div_resultados").append(
            /*
             '<div style="padding-top: 30px;"><div class="titulo-panel-busqueda" style="padding: 0px;"><h3 style="">Otras opciones de la tabla de resultados</h3></div>' +
             '<label><p style="color: #777777;">* Estas opciones aplican para los resultados de la búsqueda y los filtros realizados</p></label>' +
             '<a class="iconoLista" style="margin: 5px;" onclick="validarImpresionEnCola(\'imprimir_oficio\',\'resolucion\')"><span style="background: url(\'../images/pdf.png\') no-repeat scroll left top rgba(0, 0, 0, 0);font-size: 14px; padding: 0 0 0 20px;">Imprimir resoluciones</span></a></div>' +
             */
            //'<a class="iconoLista" style="margin: 5px;" onclick="validarImpresionEnCola(\'formato_identificacion_carpetas\',\'identificacion_carpeta\')"><span style="background: url(\'../images/pdf.png\') no-repeat scroll left top rgba(0, 0, 0, 0);font-size: 14px; padding: 0 0 0 20px;">Imprimir Formatos identificación de carpetas</span></a></div>' +
            //'<a class="iconoLista" style="margin: 5px;" onclick="validarImpresionEnCola(\'reporte_lista_chequeo\',\'lista_chequeo\')"><span style="background: url(\'../images/pdf.png\') no-repeat scroll left top rgba(0, 0, 0, 0);font-size: 14px; padding: 0 0 0 20px;">Imprimir listas de chequeo</span></a></div>' +
            ''
            );

}

var total_descargados = 0;
var urlList = [];
var pdfList = [];

function validarImpresionEnCola(reportName, fileLabel) {
    if (urlList.length > 0) {
        $("<div style='text-align: justify;'>Actualmente está descargando " + urlList.length + " documentos, si continúa se cancelará la descarga actual.<br><br>Desea continuar?</div>").dialog({
            resizable: false,
            modal: true,
            dialogClass: "no-close",
            draggable: false,
            closeOnEscape: false,
            width: 420,
            title: "Cancelar trabajo",
            buttons: {
                "Cerrar": function () {
                    $(this).dialog("close");
                },
                "Continuar (cancelar descarga anterior)": function () {
                    $(this).dialog("close");
                    urlList = [];
                    total_descargados = 0;
                    imprimirFormulariosSolicitudTablaFiltrada(reportName, fileLabel);
                }
            }
        });
    } else {
        imprimirFormulariosSolicitudTablaFiltrada(reportName, fileLabel);
    }
}

function imprimirFormulariosSolicitudTablaFiltrada(reportName, fileLabel) {
    var total_seleccionados = $("#div_resultados #tabla_resultados").find("tr #chck:checked").length;
    var imprimir_seleccionados = true;
    if (total_seleccionados === 0) {
        imprimir_seleccionados = false;
        total_seleccionados = $("#div_resultados #tabla_resultados").dataTable().$('tr', {"filter": "applied"}).length;
    }

    $("<div style='text-align: justify;'>Está a punto de imprimir " + total_seleccionados + " documentos, esto puede tomar algunos minutos.<br><br>Desea continuar?</div>").dialog({
        resizable: false,
        modal: true,
        dialogClass: "no-close",
        draggable: false,
        closeOnEscape: false,
        width: 320,
        title: "Imprimir documentos",
        buttons: {
            "Continuar": function () {
                $(this).dialog("close");
                urlList = [];
                total_descargados = 0;

                if (imprimir_seleccionados) {
                    for (var i = 0; i < $("#div_resultados #tabla_resultados").find("tr #chck:checked").length; i++) {
                        var soliCodSoli = $($($("#div_resultados #tabla_resultados").find("tr #chck:checked")[i]).parents('tr')[0]).data('id')
                        //var soliId = $($("#div_resultados #tabla_resultados").dataTable().$('tr', {"filter": "applied"})[i]).data('soliId');
                        //urlList.push('GenerarReporteGenerico?reportName=' + reportName + '&reportParameters=SOLI_ID@:' + soliId + '&reportCode=' + soliCodSoli);
                        urlList.push(URL_IMPRIMIR + 'pdf/' + reportName + '.php?identificador=' + soliCodSoli + '&reportCode=' + soliCodSoli);
                    }
                } else {

                    for (var i = 0; i < $("#div_resultados #tabla_resultados").dataTable().$('tr', {"filter": "applied"}).length; i++) {
                        var soliCodSoli = $($("#div_resultados #tabla_resultados").dataTable().$('tr', {"filter": "applied"})[i]).data('id');
                        //var soliId = $($("#div_resultados #tabla_resultados").dataTable().$('tr', {"filter": "applied"})[i]).data('soliId');
                        //urlList.push('GenerarReporteGenerico?reportName=' + reportName + '&reportParameters=SOLI_ID@:' + soliId + '&reportCode=' + soliCodSoli);
                        urlList.push(URL_IMPRIMIR + 'pdf/' + reportName + '.php?identificador=' + soliCodSoli + '&reportCode=' + soliCodSoli);
                    }

                }
                if (urlList.length > 0) {
                    $("<div id='dialog_espere' style='text-align: center;'>Descargando.<br><br>Este mensaje se cerrará automáticamente.<div id='progressbar'></div></div>").dialog({
                        resizable: false,
                        modal: true,
                        draggable: false,
                        closeOnEscape: false,
                        width: 350,
                        title: "Por favor espere",
                        buttons: {},
                        open: function () {
                            $("#progressbar").progressbar({
                                value: false,
                                max: urlList.length
                            });
                        }
                    });

                    descargarSiguienteFormulario(fileLabel);
                    pdfList = [];
                }
            },
            "Cancelar": function () {
                $(this).dialog("close");
            }
        }
    });

}

function descargarSiguienteFormulario(fileLabel) {
    try {
        var url = urlList.shift();
        var fileName = fileLabel + "_" + url.substr(url.indexOf("reportCode=") + "reportCode=".length, url.length) + ".pdf";

        /*var objeto = {
         identificador: id
         };*/
        var result = null;
        $.ajax({
            url: url,
            type: 'GET',
            //data: objeto,
            success: function (data) {
                $("#progressbar").progressbar({
                    value: ++total_descargados
                });
                result = data;
                //window.location.href = URL_PDF + data;
//                window.open(URL_IMPRIMIR + "pdf/" + data, "_blank");
                pdfList.push(data);
                if (urlList.length > 0) {
                    descargarSiguienteFormulario(fileLabel);
                } else {
                    $.ajax({
                        url: URL_IMPRIMIR + "pdf/prueba_multiple_pdf.php?listado=" + pdfList,
                        type: 'GET',
                        success: function (dato) {
                            window.open(URL_IMPRIMIR + "pdf/" + dato, "_blank");
                        }
                    });
                    $("#dialog_espere").dialog("destroy");
                }
            }
        });
        /*
         var xhr = new XMLHttpRequest();
         xhr.ontimeout = function () {
         console.error("The request for " + url + " timed out.");
         if (urlList.length > 0) {
         descargarSiguienteFormulario(fileLabel);
         } else {
         $("#dialog_espere").dialog("destroy");
         }
         };
         */
        /*
         xhr.onload = function (e) {
         $("#progressbar").progressbar({
         value: ++total_descargados
         });
         var a = document.createElement("a");
         document.body.appendChild(a);
         a.style = "display: none";
         
         var blobURL = URL.createObjectURL(xhr.response);
         a.href = blobURL;
         a.download = fileName;
         a.click();
         window.URL.revokeObjectURL(url);
         if (urlList.length > 0) {
         descargarSiguienteFormulario(fileLabel);
         } else {
         $("#dialog_espere").dialog("destroy");
         }
         };
         xhr.onerror = function (e) {
         console.error("Error: " + e);
         };
         
         xhr.open("GET", url, true);
         xhr.responseType = "blob";
         xhr.timeout = 7200000;
         xhr.send(null);
         */
    } catch (e) {

    }
}
            