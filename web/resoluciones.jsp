<%-- 
    Document   : index
    Created on : 9/02/2013, 09:40:00 PM
    Author     : Fabian
--%>
<%@page import="com.frmejia.backend.manager.UsuarioManager"%>
<%@page import="java.util.Map"%>
<%@ page language="java" pageEncoding="UTF-8" %>

<%@taglib prefix="f" uri="http://java.sun.com/jsf/core"%>
<%@taglib prefix="h" uri="http://java.sun.com/jsf/html"%>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">

        <script type="text/javascript">
            if (window.location.pathname.indexOf("/Reasentamientos/s") === - 1) {
            window.location.href = "/Reasentamientos/s/index.jsp";
            }
        </script>



        <link rel="stylesheet" href="../css/custom-theme/jquery-ui-1.10.0.custom.min.css" />  
        <link rel="stylesheet" href="../css/bootstrap.min.css" />  
        <link rel="stylesheet" href="../css/font-awesome.min.css" />  

        <link rel="stylesheet" href="../css/jquery.dataTables.css" />  
        <link rel="stylesheet" href="../css/jquery.qtip.css" />  
        <link href="../css/jquery.loader.css" rel="stylesheet" />   
        <link type="text/css" href="../css/Plugins/alpaca.min.css" rel="stylesheet"/>
        <link type="text/css" href="../css/Plugins/jquery.selectBoxIt.css" rel="stylesheet"/>
        <link rel="stylesheet" href="../css/Plugins/dx.styles.css"/>
        <link rel="stylesheet" href="../css/Plugins/dhtmlxgantt.css"/>
        <link rel="stylesheet" href="../js/Plugins/orgchart/css/jquery.orgchart.css"/>

        <link rel="stylesheet" href="../css/estilos.css" type="text/css" />

        <script src="../js/jquery-1.9.1.min.js" type="text/javascript"></script>
        <script src="../js/jquery-ui-1.10.0.custom.min.js"></script>  
        <script src="../js/bootstrap.min.js"></script>  

        <script type="text/javascript" src="../js/idleRedirect.js"></script>

        <script type="text/javascript" src="../js/Plugins/jquery.jeditable.mini.js"></script>
        <script type="text/javascript" src="../js/Plugins/jquery.selectBoxIt.min.js"></script>
        <script type="text/javascript" src="../js/Plugins/number/jquery.number.js"></script>

        <script src="../js/gov.cvp.reas/util/formularioREASUtil.js"></script>  
        <script src="../js/gov.cvp.reas/revision_relocalizacion/FormularioRevisionRelocalizacion.js"></script>  
        <script src="../js/gov.cvp.reas/revision_relocalizacion/FormularioRevisionRelocalizacion_Schema.js"></script>  
        <script src="../js/gov.cvp.reas/revision_relocalizacion/FormularioRevisionRelocalizacion_Options.js"></script>  

        <script src="../js/jquery.dataTables.min.js"></script>  
        <script src="../js/jquery.qtip.js"></script>  
        <script src="../js/Plugins/globalize.js"></script>
        <script src="../js/Plugins/dx.chartjs.js"></script>
        <script src="../js/Plugins/dhtmlxgantt.js"></script>
        <script src="../js/Plugins/dhtmlxgantt_tooltip.js"></script>
        <script src="../js/Plugins/dhtmlxgantt_locale_es.js"></script>
        <script src="../js/Plugins/moment.js"></script>
        <script src="../js/Plugins/list.min.js"></script>
        <script src="../js/valor_calculo_ayuda.js"></script>
        <!--<script src="../js/Plugins/dhtmlxgantt_quick_info.js"></script>-->
        <script src="../js/jquery.loader.js"></script>
        <script src="../js/Plugins/orgchart/js/jquery.orgchart.js"></script>
        <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

        <script src="../js/Plugins/pdf/pdfmake.min.js"></script>
        <script src="../js/Plugins/pdf/vfs_fonts.js"></script>

        <%
            String strParam = request.getParameter("identificador");
        %> 
        <script src="../js/FormularioConsultaSolicitudes.js"></script>  
        <script src="../js/gov.cvp.reas/resoluciones/FormularioRevisionResoluciones.js"></script>  
        <script src="../js/gov.cvp.reas/resoluciones/FormularioRevisionFinancieraResoluciones.js"></script>  
        <script src="../js/gov.cvp.reas/resoluciones/FormularioNuevoMemorando.js"></script>  
        <script src="../js/gov.cvp.reas/revision_financiera.js"></script>  

        <% if (UsuarioManager.getTienePermisoSesion("50")) {%>
        <script id="scriptFormularioGraficoResolucionesMemorandos" src="../js/gov.cvp.reas/resoluciones/FormularioGraficoResolucionesMemorandos.js">
            {
            "crearResolucion":<%=UsuarioManager.getTienePermisoSesion("51")%>,
                    "editarResolucion":<%=UsuarioManager.getTienePermisoSesion("52")%>,
                    "eliminarResolucion":<%=UsuarioManager.getTienePermisoSesion("53")%>,
                    "crearMemorando":<%=UsuarioManager.getTienePermisoSesion("55")%>,
                    "editarMemorando":<%=UsuarioManager.getTienePermisoSesion("56")%>,
                    "eliminarMemorando":<%=UsuarioManager.getTienePermisoSesion("57")%>,
                    "crearContrato":<%=UsuarioManager.getTienePermisoSesion("58")%>,
                    "editarContrato":<%=UsuarioManager.getTienePermisoSesion("59")%>,
                    "eliminarContrato":<%=UsuarioManager.getTienePermisoSesion("60")%>,
                    "consulta":<%=UsuarioManager.getTienePermisoSesion("61")%>,
                    "crearNotificacion":<%=UsuarioManager.getTienePermisoSesion("2")%>
            }
        </script>  
        <% } %>        
        <% if (UsuarioManager.getTienePermisoSesion("20")) {%>
        <script id="scriptFormularioGraficoResolucionesMemorandos" src="../js/gov.cvp.reas/resoluciones/FormularioGraficoResolucionesMemorandos.js">
            {
            "crearResolucion":<%=UsuarioManager.getTienePermisoSesion("51")%>,
                    "editarResolucion":<%=UsuarioManager.getTienePermisoSesion("52")%>,
                    "eliminarResolucion":<%=UsuarioManager.getTienePermisoSesion("53")%>,
                    "crearMemorando":<%=UsuarioManager.getTienePermisoSesion("55")%>,
                    "editarMemorando":<%=UsuarioManager.getTienePermisoSesion("56")%>,
                    "eliminarMemorando":<%=UsuarioManager.getTienePermisoSesion("57")%>,
                    "crearContrato":<%=UsuarioManager.getTienePermisoSesion("58")%>,
                    "editarContrato":<%=UsuarioManager.getTienePermisoSesion("59")%>,
                    "eliminarContrato":<%=UsuarioManager.getTienePermisoSesion("60")%>,
                    "consulta":<%=UsuarioManager.getTienePermisoSesion("61")%>,
                    "crearNotificacion":<%=UsuarioManager.getTienePermisoSesion("2")%>
            }
        </script>  
        <% } %>        
        <% if (UsuarioManager.getTienePermisoSesion("1")) {%>
        <script id="scriptFormularioGraficoResolucionesMemorandos" src="../js/gov.cvp.reas/resoluciones/FormularioGraficoResolucionesMemorandos.js">
            {
            "crearResolucion":<%=UsuarioManager.getTienePermisoSesion("51")%>,
                    "editarResolucion":<%=UsuarioManager.getTienePermisoSesion("52")%>,
                    "eliminarResolucion":<%=UsuarioManager.getTienePermisoSesion("53")%>,
                    "crearMemorando":<%=UsuarioManager.getTienePermisoSesion("55")%>,
                    "editarMemorando":<%=UsuarioManager.getTienePermisoSesion("56")%>,
                    "eliminarMemorando":<%=UsuarioManager.getTienePermisoSesion("57")%>,
                    "crearContrato":<%=UsuarioManager.getTienePermisoSesion("58")%>,
                    "editarContrato":<%=UsuarioManager.getTienePermisoSesion("59")%>,
                    "eliminarContrato":<%=UsuarioManager.getTienePermisoSesion("60")%>,
                    "consulta":<%=UsuarioManager.getTienePermisoSesion("61")%>,
                    "crearNotificacion":<%=UsuarioManager.getTienePermisoSesion("2")%>
            }
        </script>  
        <% } %>        

        <jsp:include page="js/gov.cvp.reas/resoluciones/eliminarResolucion.jsp" />

        <script src="../js/gov.cvp.reas/novedades/MenuProcesos.js"></script>  
        <script src="../js/gov.cvp.reas/reportes.js"></script>  

        <% if (UsuarioManager.getTienePermisoSesion("65")) { %>
        <script src="../js/gov.cvp.reas/novedades/GestionarProcesos.js"></script>  
        <% } %>
        <% if (UsuarioManager.getTienePermisoSesion("58")) { %>
        <script src="../js/gov.cvp.reas/contrato/GestionarContratos.js"></script>  
        <% } %>
        <% if (UsuarioManager.getTienePermisoSesion("80")) { %>
        <script src="../js/gov.cvp.reas/contrato/RevisionJuridicaNuevoContrato.js"></script>  
        <% } %>

        <script src="../js/gov.cvp.reas/suspensiones/SuspensionesRelocalizacion.js"></script>  

        <!-- gauge.js -->
        <script src="../js/vendors/gauge.js/dist/gauge.min.js"></script>


        <script type = "text/javascript" >
            <%
                    if (session.getAttribute("user") != null) {
                        out.print("var usuario_login = '" + session.getAttribute("user") + "';");
                    }
            %>

            var URL_IMPRIMIR = window.location.protocol + "//" + window.location.hostname + ":81/"; //"http://cs9068:81/";
            //var URL_IMPRIMIR = "http://cs9068:81/";
            //var URL_IMPRIMIR = "http://localhost:81/";

            var lista_estados = [];
            var formularioConsulta;
            $(document).ready(function () {

            $(window).bind("beforeunload", function (event) {
            if (prevenirCierre)
                    return "No debería cerrar esta ventana hasta diligenciar completamente el formulario, esto puede traer errores posteriores. ¿Realmente desea salir?";
            });
            $(document).ajaxStart(function () {
            $.loader({
            className: "blue-with-image-2",
                    content: 'Cargando...'
            });
            });
            $(document).ajaxComplete(function () {
            $.loader('close');
            });
            iniciarModuloConsulta();
            //IniciarMenuNovedades('menu-novedades');
            //var novedades = IniciarMenuNovedades('menu-novedades');
            var procesos = IniciarMenuProcesos('menu-procesos');
            //iniciarPanelGraficos();

            $('#menu-proyectados').click(function (e) {
            e.stopPropagation();
            });
            //            mirar
            $(document).on('show.bs.modal', '.modal', function () {
            var zIndex = 1040 + (10 * $('.modal:visible').length);
            $(this).css('z-index', zIndex);
            setTimeout(function() {
            $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
            }, 0);
            });
            $(document).on('hidden.bs.modal', '.modal', function () {
            $('.modal:visible').length && $(document.body).addClass('modal-open');
            });
            });
        </script>

        <script type="text/javascript">
            function ocultarPaneles() {
            $("#formulario_revision").hide();
            }


            function iniciarModuloConsulta() {
            prevenirCierre = false;
            var editable = true;
            formularioConsulta = new FormularioConsulta("consultar-solicitud", resultadoSeleccionado, false, "Buscar Identificadores", editable, consultaFinalizada);
            formularioConsulta.iniciarFormulario();
            var ayudas = $(".calculo_ayuda");
            $.each(ayudas, function(index, value) {
            valorCalculo($(value));
            });
    //            formulario.buscarSolicitud();
            }

            function resultadoSeleccionado(itemSeleccionado, row) {
            var sOut = '<table cellpadding="5" cellspacing="5" border="0" style="padding-left:50px;">';
            sOut += '<tr><td>Fecha de acta entrega par:</td><td> <a data-toggle="modal" data-target=".bd-example-modal-sm" class="foto"  onclick="verFoto(event)" id="' + itemSeleccionado['IDENTIFICADOR'] + '"  >' + itemSeleccionado['fecha_acta'] + '   <span class="glyphicon glyphicon-picture"></span></a></td></tr>';
            //sOut += '<tr><td>Valor ayuda Ultimo Contrato:</td><td id="' + itemSeleccionado['IDENTIFICADOR'] + '" onclick="valorContrato(this)">Consultar</td></tr>';
            sOut += '<tr><td>Calculo ayuda / mes:</td><td class="calculo_ayuda" id="' + itemSeleccionado['IDENTIFICADOR'] + '" onclick="valorCalculo(this)">Consultar Ayuda</td></tr>';
            sOut += '<tr><td>Estado del proceso:</td><td  >' + itemSeleccionado['proceso'] + '</td></tr>';
            sOut += '<tr><td>Fecha de traslado:</td><td  >' + (itemSeleccionado['Fecha de Verificación de Traslado']?itemSeleccionado['Fecha de Verificación de Traslado']:'No tiene') + '</td></tr>';
            /* sOut += '<tr><td>Num Meses a pagar:</td><td>' + itemSeleccionado['NUM MESES'] + '</td></tr>';
             sOut += '<tr><td>Identificador:</td><td>' + itemSeleccionado['IDENTIFICADOR'] + '</td></tr>';
             sOut += '<tr><td>Evacuado</td><td>' + itemSeleccionado['NOMBRE EVACUADO'] + '</td></tr>';
             sOut += '<tr><td>Cédula Evacuado:</td><td>' + itemSeleccionado['CEDULA EVACUADO'] + '</td></tr>';
             sOut += '<tr><td>Pagos totales:</td><td>' + itemSeleccionado['TOTAL'] + '</td></tr>';
             sOut += '<tr><td style="width:150px;">Asignación total (pagos totales mas un mes):</td><td>' + itemSeleccionado['TOTAL MAS UN MES'] + '</td></tr>';*/
            //sOut += '<tr><td style="width:150px;">Requiere carta de autorización?:</td><td>' + (itemSeleccionado['requiere_carta_autorizacion'] ? '<span style="color:red; font-weight:bold;">SI</span>' : '<span style="color:green">NO</span>') + '</td></tr>';
            sOut += '</table>';
            <% if (UsuarioManager.getTienePermisoSesion("65")) { %>
            sOut += '<a class="btn btn-primary" style="margin:20px;" onclick="IniciarGestionarProcesos(\'' + itemSeleccionado['IDENTIFICADOR'] + '\',' + $(row).data('indice-resultado') + ')"> Reportar Novedad </a>';
            //sOut += '<div id="panel-novedades" style="padding-left:0px; padding-top:0px;"><script> buscarNovedades(\'' + itemSeleccionado['IDENTIFICADOR'] + '\',' + $(row).data('indice-resultado') + ',\'panel-novedades\') <\/script></div>';
            <% } %>

            sOut += '<a class="btn btn-primary" style="margin:20px;" onclick="IniciarSuspensionesReloca(\'' + itemSeleccionado['IDENTIFICADOR'] + '\')"> Suspensiones </a>';
            sOut += '<div id="panel-observaciones" style="padding-left:0px; padding-top:0px;"><script> buscarObservaciones(\'' + itemSeleccionado['IDENTIFICADOR'] + '\',' + $(row).data('indice-resultado') + ',\'panel-observaciones\') <\/script></div>';
            <% if (UsuarioManager.getTienePermisoSesion("50")) { %>
            sOut += '<a class="siguiente " onclick="GraficoResolucionesMemorandos(\'' + itemSeleccionado['IDENTIFICADOR'] + '\',' + $(row).data('indice-resultado') + ',\'panel-grafico-resoluciones-memorandos\',\'' + itemSeleccionado['fecha_entrega_vivienda'] + '\')">' +
                    '<span style="background: url(\'../images/page_white_text.png\') no-repeat scroll left top rgba(0, 0, 0, 0);font-size: 14px; padding: 0 0 0 20px;">Asignaciones y pagos</span></a>';
            sOut += '<div style="margin: 5px 50px; display:none;" id="panel-grafico-resoluciones-memorandos"></div>';
            <% } %>

            //sOut += '<div id="panel-alertas" style="padding-left:20px; padding-top:20px;"><script> buscarAlertas(\'' + itemSeleccionado['IDENTIFICADOR'] + '\',' + $(row).data('indice-resultado') + ',\'panel-alertas\') <\/script></div>';
            sOut += '<a  class="siguiente" onclick="RevisionFinanciera(\'' + itemSeleccionado['IDENTIFICADOR'] + '\',' + $(row).data('indice-resultado') + ',\'financiera\')">' +
                    '<i class="fa fa-bar-chart" aria-hidden="true"></i> <span style="font-size: 14px;">Revisión Financiera</span></a>';
            sOut += '<div style="margin: 5px 50px; display:none;" id="financiera"></div>';
            sOut += '<a class="siguiente"  onclick="RevisionResoluciones(\'' + itemSeleccionado['IDENTIFICADOR'] + '\',' + $(row).data('indice-resultado') + ',\'formulario_editar_estado_solicitud\')">' +
                    '<span style="background: url(\'../images/page_white_edit.png\') no-repeat scroll left top rgba(0, 0, 0, 0);font-size: 14px; padding: 0 0 0 20px;">Contratos</span></a>';
            sOut += '<div style="margin: 5px 50px; display:none;" id="formulario_editar_estado_solicitud"></div>';
            //sOut += '<div id="panel-cartas-autorizacion" style="padding-left:0px; padding-top:0px;"><script> buscarCartasAutorizacion(\'' + itemSeleccionado['IDENTIFICADOR'] + '\',' + $(row).data('indice-resultado') + ',\'panel-cartas-autorizacion\') <\/script></div>';
            return sOut;
            }
            function buscarAlertas(id, rowId, contenedor_id) {
            $(".details-" + rowId).find("#" + contenedor_id).empty();
            var objeto = {
            op: "consulta_alerta_resolucion",
                    IDENTIFICADOR: id
            };
            $.ajax({
            type: "POST",
                    url: "GestionConsultas",
                    dataType: "text",
                    async: true,
                    data: objeto,
                    success: function (response) {
                    if (response)
                    {
                    var res = eval('(' + response + ')');
                    if (res && res.total > 0) {

                    var nombres = [];
                    for (var prop in res.data[0]) {
                    nombres.push(prop);
                    }
                    nombres.sort();
                    $(".details-" + rowId).find("#" + contenedor_id).append("<table></table>");
                    $(".details-" + rowId).find("#" + contenedor_id).find("table").append("<tr><th colspan='2'>ALERTAS</th></tr>");
                    for (var i = 0; i < res.data.length; i++) {
                    for (var h in nombres) {
                    var filaResolucion = (nombres[h] === "01 RESOLUCION DE ASIGNACIÓN");
                    if (nombres[h] !== "14 OTROS PAGOS") {
                    if (nombres[h] === "06 VALOR ASIGNACION") {
                    $(".details-" + rowId).find("#" + contenedor_id).append("<tr><td>" + nombres[h] + "</td><td><span data-name='VALOR ASIGNACION' data-tipo='' class='editable' style='cursor: pointer;' >" + res.data[0][nombres[h]] + "</span></td></tr>");
                    $(".details-" + rowId).find("#" + contenedor_id).find(".editable")
                            .editable('GestionDML', {
                            tooltip: "Click para editar",
                                    indicator: 'Guardando...',
                                    //event: "dblclick",
                                    submit: 'Guardar',
                                    width: 150,
                                    "callback": function (sValue, y) {
                                    // Redraw the table from the new data on the server /

                                    var r = eval('(' + sValue + ')');
                                    if (r && r.data && r.data.length > 0) {
                                    if (r.data.length === 1) {
                                    $(this).text(r.data[0][$(this).data().name]);
                                    }
                                    }

                                    buscarAlertas(id, rowId, contenedor_id);
                                    //oTable.fnDraw();
                                    },
                                    "submitdata": function (value, settings) {
                                    return {
                                    "IDENTIFICADOR": id,
                                            "nombre": $(this).data().name,
                                            "tipo": $(this).data().tipo,
                                            "op": "ActualizarAlertas"
                                    };
                                    },
                                    "height": "14px"
                            });
                    } else {
                    $(".details-" + rowId).find("#" + contenedor_id).append("<tr><td>" + nombres[h] + "</td><td>" + res.data[0][nombres[h]] + (filaResolucion ? "<div style='display:inline;' id ='" + contenedor_id + "_contenedorResoluciones_" + i + "'></div>" : "") + "</td></tr>");
                    }
                    } else {
                    var pagos = eval(res.data[0][nombres[h]]);
                    var tabla = '<table id="tabla-otros-pagos-' + rowId + '"><tr><th >Mes</th><th style="text-align:center" width="80px">Orden de pago </th><th style="text-align:center" width="100px">Fecha giro tesorería </th><th style="text-align:center">Resolución </th><th style="text-align:center">Fecha Resolución</th></tr>';
                    for (var k = 0; k < pagos.length; k++) {
                    tabla += '<tr><td>' + pagos[k]["MES APAGAR"] + '</td>'
                            + '<td>' + pagos[k]["ORDEN DE PAGO"] + '</td>'
                            + '<td>' + pagos[k]["FECHA GIRO TESORERIA"] + '</td>'
                            + '<td>' + pagos[k]["RESOLUCION"] + '</td>'
                            + '<td>' + pagos[k]["FECHA RESOLUCION"] + '</td>'
                            + '</tr>';
                    }
                    tabla += '</table>';
                    $(".details-" + rowId).find("#" + contenedor_id).append("<tr><td>" + nombres[h] + "</td><td>" + tabla + (filaResolucion ? "<div style='display:inline;' id ='" + contenedor_id + "_contenedorResoluciones_" + i + "'></div>" : "") + "</td></tr>");
                    }

                    if (nombres[h] === "01 RESOLUCION DE ASIGNACIÓN") {
                    buscarResolucionAsignacion(res.data[0][nombres[h]], rowId, contenedor_id + "_contenedorResoluciones_" + i);
                    }

                    }
                    }

                    }
                    }
                    }, error: function () {
            alert("No fué posible obtener las alternativas");
            }
            });
            }

            function buscarObservaciones(id, rowId, contenedor_id) {
            var contenedor = $(".details-" + rowId).find("#" + contenedor_id);
            contenedor.empty();
            contenedor.append('<div class="col-xs-12" > <hr> </div>' +
                    '<div class="container" style="max-width:900px;" >' +
                    '	<div class="page-header" >' +
                    '		<h5 class="pull-left" >' +
                    '			Observaciones' +
                    '		</h5>' +
                    '		<div class="pull-right" >' +
                    '			<button type="button" class="btn btn-default btn-sm" aria-label="Añadir" id="#' + contenedor_id + '_btn_nuevo_comentario" onclick="nuevaObservacion(\'' + id + '\',' + rowId + ',\'' + contenedor_id + '\')">' +
                    '				<span class="glyphicon glyphicon-plus-sign " aria-hidden="true" > </span> Agregar' +
                    '			</button>' +
                    '		</div>' +
                    '		<div class="clearfix" > </div>' +
                    '	</div>' +
                    '	<ul class="timeline" id="#' + contenedor_id + '_lista_comentarios">Buscando...</ul>' +
                    '       <ul class="pager hidden">' +
                    '               <li class="next">' +
                    '                       <button id="#' + contenedor_id + '_btn_ver_todos_comentarios" type="button" data-parent="#' + contenedor_id + '_lista_comentarios" data-toggle="collapse" data-target=".collapse" class="btn btn-default btn-sm" aria-label="Añadir">Ver todos <span aria-hidden="true">&rarr;</span></button>' +
                    '               </li>' +
                    '       </ul>' +
                    '</div>' +
                    '<div class="col-xs-12"><hr></div>'
                    );
            $(contenedor).find('#' + contenedor_id + '_btn_ver_todos_comentarios').click(function () {
            $(this).html($(this).html() === 'Ver todos <span aria-hidden="true">→</span>' ? 'Ocultar <span aria-hidden="true">&larr;' : 'Ver todos <span aria-hidden="true">&rarr;');
            });
            var objeto = {
            op: "consulta_observaciones_identificador",
                    identificador: id
            };
            $.ajax({
            type: "POST",
                    url: "GestionConsultas",
                    dataType: "text",
                    async: true,
                    data: objeto,
                    success: function (response) {
                    var timelineContainer = $(contenedor).find("div.container > ul.timeline");
                    timelineContainer.empty();
                    if (response)
                    {
                    var res = eval('(' + response + ')');
                    if (res && res.total > 0) {

                    var limite = 3;
                    if (res.total >= limite) {
                    $(contenedor).find("div.container > ul.pager").removeClass("hidden");
                    }

                    for (var i = 0; i < res.data.length; i++) {
                    timelineContainer.append(
                            '<li class="' + (i % 2 === 0 ? '' : 'timeline-inverted') + (i >= limite ? ' collapse' : '') + '">' +
                            '	<div class="timeline-badge info"><i class="glyphicon glyphicon-comment"></i></div>' +
                            '	<div class="timeline-panel">' +
                            '		<div class="timeline-heading">' +
                            '			<span class="timeline-title">' + res.data[i].comen_user + '</span>' +
                            '			<p><small class="text-muted"><i class="glyphicon glyphicon-time"></i> ' + res.data[i].comen_time + '</small></p>' +
                            '		</div>' +
                            '		<div class="timeline-body">' +
                            '			<p>' + res.data[i].comen_desc + '</p>' +
                            '		</div>' +
                            '	</div>' +
                            '</li>');
                    }
                    }
                    }
                    }, error: function () {
            alert("No fué posible obtener las observaciones");
            }
            });
            }


            function nuevaObservacion(id, rowId, contenedor_id) {
            var modal_id = Math.random().toString(36).substring(7);
            var html = '<div id="dynamicModal-' + modal_id + '" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="confirm-modal" aria-hidden="true">';
            html += '<div class="modal-dialog">';
            html += '<div class="modal-content">';
            html += '<div class="modal-header">';
            html += '<a class="close" data-dismiss="modal">×</a>';
            html += '<h4>' + 'Nueva Observacion, identificador: ' + id + '</h4>';
            html += '</div>';
            html += '<div class="modal-body">';
            html += '<p>';
            html +=
                    '<form class="form" role="form" data-toggle="validator">' +
                    '  <div class="form-group">' +
                    '    <label for="comment">Observación:</label>' +
                    '    <textarea class="form-control" rows="5" id="comment" autofocus></textarea>' +
                    '  </div>' +
                    '</form>';
            html += '</div>';
            html += '<div class="modal-comments"/>';
            html += '<div class="modal-footer">';
            html += '<span class="btn btn-primary" id="btnGuardarNuevaObservacion">Guardar</span>';
            html += '<span class="btn btn-default" data-dismiss="modal">Cerrar</span>';
            html += '</div>'; // content
            html += '</div>'; // dialog
            html += '</div>'; // footer
            html += '</div>'; // modalWindow
            $('body').append(html);
            $("#dynamicModal-" + modal_id).modal();
            $('.modal').on('shown.bs.modal', function () {
            $(this).find('[autofocus]').focus();
            });
            $("#dynamicModal-" + modal_id).on('hidden.bs.modal', function (e) {
            $(this).remove();
            });
            $("#dynamicModal-" + modal_id).modal('show');
            $("#dynamicModal-" + modal_id).find("#btnGuardarNuevaObservacion").on('click', function (e) {
            $("#dynamicModal-" + modal_id).find(".modal-comments").empty();
            if (!$("#dynamicModal-" + modal_id).find("#comment").val()) {
            $("#dynamicModal-" + modal_id).find(".modal-comments").prepend('<div class="alert alert-danger" role="alert">Ingrese un comentario</div>');
            return;
            }

            var datos = {
            op: 'insertar_observacion_identificador',
                    identificador: id,
                    comen_desc: $("#dynamicModal-" + modal_id).find("#comment").val()
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
                    buscarObservaciones(id, rowId, contenedor_id);
                    }
                    }
                    }
            });
            });
            }

            function buscarCartasAutorizacion(id, rowId, contenedor_id) {
            var objeto = {
            IDENTIFICADOR: id
            };
            $.ajax({
            type: "GET",
                    url: URL_IMPRIMIR + "REAS/relocalizacion_cartas_autorizacion/consultar_cartas.php",
                    dataType: "text",
                    async: true,
                    data: objeto,
                    success: function (response) {
                    if (response)
                    {
                    var res = eval('(' + response + ')');
                    if (res && res.length > 0) {
                    for (var i = 0; i < res.length; i++) {
                    $(".details-" + rowId).find("#" + contenedor_id).append('<a  class="iconoLista" style="margin: 5px 50px;" target="_blank" href="' + URL_IMPRIMIR + 'REAS/relocalizacion_cartas_autorizacion/' + res[i] + '">' +
                            '<span style="background: url(\'../images/pdf.png\') no-repeat scroll left top rgba(0, 0, 0, 0);font-size: 14px; padding: 0 0 0 20px;">Imprimir Carta de autorización ' + res[i] + '</span></a>');
                    }

                    }
                    }
                    }, error: function (e) {
            alert("No fué posible obtener las alternativas");
            }
            });
            }


            function buscarResolucionAsignacion(resolucion, rowId, contenedor_id) {

            var objeto = {
            resolucion: resolucion
            };
            $.ajax({
            type: "GET",
                    url: URL_IMPRIMIR + "REAS/resoluciones_asignacion/consultar_resoluciones.php",
                    dataType: "text",
                    async: true,
                    data: objeto,
                    success: function (response) {
                    if (response)
                    {
                    var res = eval('(' + response + ')');
                    if (res && res.length > 0) {
                    for (var i = 0; i < res.length; i++) {
                    $(".details-" + rowId).find("#" + contenedor_id).append('<a style="display:inline;margin-left:20px;" target="_blank" href="' + URL_IMPRIMIR + 'REAS/resoluciones_asignacion/' + res[i] + '">' +
                            '<span style="background: url(\'../images/pdf.png\') no-repeat scroll left top rgba(0, 0, 0, 0);font-size: 14px; padding: 0 0 0 20px; font-weight:bold;">' + res[i] + '</span></a>');
                    }

                    }
                    }
                    }, error: function (e) {
            alert("No fué posible obtener las alternativas");
            }
            });
            }


            function buscarNovedades(id, rowId, contenedor_id) {
            alert("Pendiente");
            var contenedor = $(".details-" + rowId).find("#" + contenedor_id);
            contenedor.empty();
            contenedor.append('<div class="col-xs-12" > </div>' +
                    '<div class="container"  >' +
                    '	<ul class="timeline" id="#' + contenedor_id + '_lista_comentarios">Buscando...</ul>' +
                    '</div>' +
                    '<div class="col-xs-12"></div>'
                    );
            var objeto = {
            op: "ConsultaListaNovedadesEnProceso",
                    identificador: id
            };
            $.ajax({
            type: "POST",
                    url: "GestionConsultas",
                    dataType: "text",
                    async: true,
                    data: objeto,
                    success: function (response) {

                    var timelineContainer = $(contenedor).find("div.container > ul.timeline");
                    timelineContainer.empty();
                    if (response) {
                    var res = eval('(' + response + ')');
                    if (res && res.total > 0) {
                    for (var i = 0; i < res.data.length; i++) {
                    timelineContainer.append(
                            '<li class="">' +
                            '	<div class="timeline-panel">' +
                            '		<div class="timeline-heading">' +
                            '			<span class="timeline-title">' + res.data[i].comen_user + '</span>' +
                            '			<p><small class="text-muted"><i class="glyphicon glyphicon-time"></i> ' + res.data[i].comen_time + '</small></p>' +
                            '		</div>' +
                            '		<div class="timeline-body">' +
                            '			<p>' + res.data[i].comen_desc + '</p>' +
                            '		</div>' +
                            '	</div>' +
                            '</li>');
                    }
                    }
                    }
                    }, error: function () {
            alert("No fué posible obtener las observaciones");
            }
            });
            }


            function imprimir_resolucion(id) {
            var objeto = {
            identificador: id
            };
            var result = null;
            $.ajax({
            url: URL_IMPRIMIR + "pdf/imprimir_oficio.php",
                    type: 'POST',
                    data: objeto,
                    success: function (data) {
                    result = data;
                    //window.location.href = URL_PDF + data;
                    window.open(URL_IMPRIMIR + "pdf/" + data, "_blank");
                    }
            });
            }
            function imprimir_memorando(id) {
            var objeto = {
            identificador: id
            };
            var result = null;
            $.ajax({
            url: URL_IMPRIMIR + "pdf/imprimir_memorando.php",
                    type: 'POST',
                    data: objeto,
                    success: function (data) {
                    result = data;
                    //window.location.href = URL_PDF + data;
                    window.open(URL_IMPRIMIR + "pdf/" + data, "_blank");
                    }
            });
            }
            function imprimir_solicitud_crp(id) {
            var objeto = {
            identificador: id
            };
            var result = null;
            $.ajax({
            url: URL_IMPRIMIR + "pdf/imprimir_solicitud_crp.php",
                    type: 'POST',
                    data: objeto,
                    success: function (data) {
                    result = data;
                    //window.location.href = URL_PDF + data;
                    window.open(URL_IMPRIMIR + "pdf/" + data, "_blank");
                    }
            });
            }



            function iniciarPanelGraficos() {
            $('#selector-graficos input').change(function (e) {
            //$(this).addClass('active').siblings().removeClass('active');
            switch ($(this).data("op")) {
            case 'estados':
                    actualizarGraficoEstados();
            break;
            case 'saldos':
                    actualizarGraficoSaldosCDP();
            break;
            }
            // TODO: insert whatever you want to do with $(this) here
            });
            actualizarGraficoSaldosCDP();
            }

            function actualizarGraficoSaldosCDP() {
            $("#chartContainer div").hide();
            $("#chartContainerSaldos").show();
            var objeto = {
            op: "reporte_grafico_saldos_cdp"
            };
            $.ajax({
            type: "POST",
                    url: "GestionConsultas",
                    dataType: "text",
                    data: objeto,
                    success: function (response) {
                    if (response) {
                    var res = eval('(' + response + ')');
                    if (res && res.total > 0) {
                    var cdps = [];
                    for (var i = 0; i < res.data.length; i++) {
                    cdps.push(res.data[i].cdp_numero);
                    }

                    $("#chartContainerSaldos").dxChart({
                    dataSource: res.data,
                            zoomingMode: 'all',
                            tooltip: {
                            enabled: true,
                                    argumentFormat: 'currency',
                                    format: 'currency'
                            },
                            argumentAxis: {
                            type: 'discrete'
                            },
                            commonSeriesSettings: {
                            argumentField: 'cdp_numero',
                                    type: 'bar',
                                    label: {
                                    connector: {visible: true},
                                            format: 'currency',
                                            precision: 0,
                                            rotationAngle: - 45,
                                            overlappingBehavior: {mode: 'rotate', rotationAngle: 80}
                                    }
                            },
                            series: [
                                    /*{valueField: 'cdp_valor_disponible', name: 'Total'},*/
                                            //{valueField: 'valor_asignado', name: 'Asignado'},
                                            {valueField: 'saldo', name: 'Saldo por asignar'}
                                    ],
                                            size: {
                                            height: 300
                                                    //,width: 1800
                                            },
                                            palette: 'Soft Pastel',
                                            title: 'Saldos por CDP',
                                            valueAxis: {
                                            label: {format: 'largeNumber'},
                                                    title: {
                                                    text: '$',
                                                            font: {weight: 100}
                                                    }
                                            },
                                            legend: {
                                            horizontalAlignment: 'center',
                                                    verticalAlignment: 'bottom'
                                            }
                                    });
                            }
                            }
                            }, error: function () {
                            alert("No fué posible obtener las alternativas");
                            }
                            });
                            }

                            function actualizarGraficoEstados() {

                            $("#chartContainer div").hide();
                            $("#chartContainerEstados").show();
                            var objeto = {
                            op: "reporte_grafico_estado_resoluciones"
                            };
                            $.ajax({
                            type: "POST",
                                    url: "GestionConsultas",
                                    dataType: "text",
                                    async: false,
                                    data: objeto,
                                    success: function (response) {
                                    if (response)
                                    {
                                    var res = eval('(' + response + ')');
                                    if (res && res.total > 0) {
                                    var estados = [];
                                    for (var i = 0; i < res.data.length; i++) {
                                    estados.push(res.data[i].estado);
                                    }
                                    estados.sort();
                                    $("#chartContainerEstados").dxChart({
                                    dataSource: res.data,
                                            zoomingMode: 'all',
                                            tooltip: {
                                            enabled: true
                                            },
                                            argumentAxis: {
                                            type: 'discrete',
                                                    categories: estados
                                            },
                                            commonSeriesSettings: {
                                            argumentField: 'estado',
                                                    type: 'bar',
                                                    label: {
                                                    connector: {visible: true},
                                                            format: 'decimal',
                                                            precision: 0,
                                                            rotationAngle: - 45,
                                                            overlappingBehavior: {mode: 'rotate', rotationAngle: 80}
                                                    }
                                            },
                                            series: [
                                                    /*{valueField: 'cdp_valor_disponible', name: 'Total'},*/
                                                            //{valueField: 'valor_asignado', name: 'Asignado'},
                                                            {valueField: 'total', name: 'total'}
                                                    ],
                                                            size: {
                                                            height: 400
                                                                    //,width: 800
                                                            },
                                                            palette: 'Soft Pastel',
                                                            title: 'Estado Resoluciones',
                                                            valueAxis: {
                                                            label: {format: 'largeNumber'},
                                                                    title: {
                                                                    text: '',
                                                                            font: {weight: 100}
                                                                    }
                                                            },
                                                            legend: {
                                                            horizontalAlignment: 'center',
                                                                    verticalAlignment: 'bottom'
                                                            }
                                                    });
                                            }
                                            }
                                            }, error: function () {
                                            alert("No fué posible obtener las alternativas");
                                            }
                                            });
                                            }

                                            function verFoto(event) {
                                            var identificador = $(event.target).attr('id');
                                            var result = null;
                                            var objeto = {id: identificador};
                                            $.ajax({
                                            url: URL_IMPRIMIR + "pdf/imagen.php",
                                                    type: 'POST',
                                                    data: objeto,
                                                    dataType:"json",
                                                    success: function (data) {
                                                    $("#fotos").empty();
                                                    console.log(data);
                                                    if (data.foto)
                                                            $("#fotos").append("<li onclick='traeImagen(this)' id=" + data.foto + "><a href='#' >Imagen De Entrega " + identificador + " </a></li>");
                                                    if (data.acta)
                                                            $("#fotos").append("<li onclick='traePdf(this)' id=" + data.acta + " ><a href='#' >Acta escaneada " + identificador + " </a></li>");
                                                    if (!(data.acta) && !(data.foto))
                                                            $("#fotos").append("<li>No tiene foto o acta escaneada</li>");
                                                    }
                                            });
                                            }
                                            function traeImagen(obj){
                                            var objeto = {
                                            file: $(obj).attr("id")
                                            };
                                            var result = null;
                                            $.ajax({
                                            url: URL_IMPRIMIR + "pdf/expefoto.php",
                                                    type: 'POST',
                                                    data: objeto,
                                                    success: function (data) {
                                                    if (data){
                                                    window.open(URL_IMPRIMIR + "pdf/" + data, "_blank");
                                                    }
                                                    }
                                            });
                                            }
                                            function traePdf(obj){
                                            var objeto = {
                                            file: $(obj).attr("id")
                                            };
                                            var result = null;
                                            $.ajax({
                                            url: URL_IMPRIMIR + "pdf/expePdf.php",
                                                    type: 'POST',
                                                    data: objeto,
                                                    success: function (data) {

                                                    if (data){
                                                    window.open(URL_IMPRIMIR + "pdf/" + data, "_blank");
                                                    }
                                                    }
                                            });
                                            }

        </script>
        <script>
                                        var identifi = '<%=strParam%>';
                                        $(document).ready(function(){
                                        if (identifi != 'null'){
                                        $('#consulta_txtCodigoSolicitud').val(identifi);
                                        formularioConsulta.buscarSolicitud();
                                        }
                                        });
        </script>

        <link href="../css/banner.css" rel="stylesheet" type="text/css">

        <style>
            .breadcrumb {
                background-color: #f5f5f5;
                border-radius: 4px;
                list-style: outside none none;
                margin: 0 0 20px;
                padding: 8px 15px;
            }

            .breadcrumb > li {
                display: inline-block;
                text-shadow: 0 1px 0 #fff;
                line-height: 20px;
                padding-right: 20px;
            }

            .breadcrumb > li + li::before {
                content: none;
            }

            .breadcrumb > li > a {
                cursor: pointer;
                color: #333;
                text-decoration: none;
            }

            .breadcrumb > li > a:hover {

                color: #bbd147;

            }


            .child_preview{
                box-sizing: border-box;
                margin-top: 2px;
                position: absolute;
                z-index: 1;
                color: white;
                text-align: center;
                font-size: 12px;
                /*background: rgba(255,255,255,0.1);*/
            }

            .gantt_task_line.task-collapsed{
                height: 4px;
                opacity: 0.25;
            }

            .gantt_task_line.gantt_project.task-collapsed .gantt_task_content{
                display: none;
            }

            .complex_gantt_bar{
                background: transparent;
                border:none;
            }
            .complex_gantt_bar .gantt_task_progress{
                display:none;
            }

            .gantt_row.task-parent{
                font-weight: bold;
            }
            .task-memorando .gantt_add{
                display: none !important;
            }
            .memorando{
                border:2px solid #34c461;
                color:#34c461;
                background: #34c461;
            }
            .memorando .gantt_task_progress{
                background: #23964d;
            }

            .no_guardado{
                border:2px solid #C43634;
                color:#C43634;
                background: #C43634;
            }
            .no_guardado .gantt_task_progress{
                background: #962823;
            }

            .dummy{
                display: none;
            }
            .dummy .gantt_task_progress{
                display: none;
            }

            .entrega {
                background-color: #d33daf;
                border: 0 solid #61164f;
                box-sizing: content-box;
                border-width: 1px;
                box-sizing: border-box;
                transform: rotate(45deg);
                height: 30px !important;
                line-height: 30px;
                width: 30px !important;
            }

            .entrega > .gantt_task_content{
                display: none;
            }

            .resolucion{
                border:2px solid #6ba8e3;
                color:#6ba8e3;
                background: #6ba8e3;
            }
            .resolucion .gantt_task_progress{
                background: #547dab;
            }

            .fa{
                cursor: pointer;
                font-size: 14px;
                text-align: center;
                opacity: 0.2;
                padding: 5px;
            }
            .fa:hover{
                opacity: 1;
            }
            .fa-pencil{
                color: #ffa011;
            }
            .fa-plus{
                color: #328EA0;
            }
            .fa-times{
                color: red;
            }
            .gantt_cal_light select {
                display: inline;
                min-width: 0;
                width: auto;
            }

            .baseline {
                position: absolute;
                border-radius: 2px;
                opacity: 1;
                margin-top: -7px;
                height: 12px;
                background: #ffd180;
                border: 1px solid rgb(255,153,0);
            }

            .entrega-vivienda{ 
                background-color: #d9534f !important;
                border: 1px solid #d9534f !important;
                color: #fff !important;
                opacity: 0.8;
            }

            .contenedor-contratos-grafico{

            }

            .gantt_task_line.revocatoria {
                background-color: #e4534c;
                border: 1px solid #fd3515;
            }
        </style>
        <script src="js/Plugins/modalUp.js"></script> 
        <script src="js/Plugins/form_notificacion.js"></script> 
        <title>Revision relocalización</title>
    </head>
    <body>

        <f:view>
            <header>
                <img src="../images/logo_cvp.png" height="75" style="" />
            </header>

            <jsp:include page="menu.jsp"> 
                <jsp:param name="articleId" value="resoluciones.jsp"/>
                <jsp:param name="context" value=""/>
            </jsp:include>


            <div id="page-wrapper">

                <div id="content">
                    <div id="sp-breadcrumb" class="span12">
                        <ul class="breadcrumb" style="height: 35px;">
                            <!--<li role="presentation" class="dropdown" id="menu-novedades"></li>-->
                            <li role="presentation" class="dropdown" id="menu-procesos"></li>

                            <!--<li><a onclick="IniciarGestionarProcesos(identificador)">test</a></li>-->
                            </li>
                            <%
                                if (session.getAttribute("user") != null) {
                                    out.print("<li><span>Usuario: <i>" + ((Map<String, Object>) session.getAttribute("info")).get("usuario_nombre") + "</i></span> / </li>");
                                }
                            %>
                            <li>
                                <h:form>
                                    <h:commandLink value="Cerrar Sesión"
                                                   action="#{UsuarioManager.logout}"/>
                                </h:form>   
                            </li>
                            <li style="float: right; display: inline-block;">
                                <div id="txtEstado" style="">Verificando estado del sistema...</div>
                            </li>

                        </ul>

                    </div>    


                    <div id="mainContent" class="col-sm-12">
                        <!--div style="overflow: auto; width: 960px;">
                            <div id="selector-graficos"  class="btn-group" data-toggle="buttons">
                                <label class="btn btn-primary active">
                                    <input type="radio" name="options" id="option1" data-op="saldos" autocomplete="off" checked>Ver Saldos CDP
                                </label>
                                <label class="btn btn-primary">
                                    <input type="radio" name="options" id="option2" data-op="estados" autocomplete="off">Ver estado resoluciones
                                </label>
                            </div>
                            <div id="chartContainer">
                                <div id="chartContainerSaldos"></div>
                                <div id="chartContainerEstados"></div>
                            </div>
    
                        </div-->
                        <!--<a  class="iconoLista" style="margin: 5px 10px;" onclick="descargarReporte('reporte_saldos_cdp')"><span style="background: url('../images/xls.png') no-repeat scroll left top rgba(0, 0, 0, 0);font-size: 14px; padding: 0 0 0 20px;">Descargar saldos CDP</span></a>-->
                        <!--<a  class="iconoLista" style="margin: 5px 10px;" onclick="descargarReporte('reporte_numero_resoluciones_x_cdp')"><span style="background: url('../images/xls.png') no-repeat scroll left top rgba(0, 0, 0, 0);font-size: 14px; padding: 0 0 0 20px;">Número de resoluciones por CDP</span></a>-->
                        <!--<a  class="iconoLista" style="margin: 5px 10px;" onclick="descargarReporte('reporte_asignaciones_cdp_resoluciones')"><span style="background: url('../images/xls.png') no-repeat scroll left top rgba(0, 0, 0, 0);font-size: 14px; padding: 0 0 0 20px;">Asignaciones por CDP</span></a>-->
                        <!--                    <a  class="iconoLista" style="margin: 5px 10px;" onclick="descargarReporte('reporte_resumen_resoluciones')"><span style="background: url('../images/xls.png') no-repeat scroll left top rgba(0, 0, 0, 0);font-size: 14px; padding: 0 0 0 20px;">Resumen Resoluciones</span></a>
                                            <a  class="iconoLista" style="margin: 5px 10px;" onclick="descargarReporte('reporte_nuevos_memorandos')"><span style="background: url('../images/xls.png') no-repeat scroll left top rgba(0, 0, 0, 0);font-size: 14px; padding: 0 0 0 20px;">Nuevos Memorandos</span></a>
                                            <a  class="iconoLista" style="margin: 5px 10px;" onclick="descargarReporte('reporte_contratos_pendientes_asignacion')"><span style="background: url('../images/xls.png') no-repeat scroll left top rgba(0, 0, 0, 0);font-size: 14px; padding: 0 0 0 20px;"><b>Contratos sin resolucion de asignación</b></span></a>
                                            <a  class="iconoLista" style="margin: 5px 10px;" onclick="descargarReporte('reporte_memorandos_pendientes')"><span style="background: url('../images/xls.png') no-repeat scroll left top rgba(0, 0, 0, 0);font-size: 14px; padding: 0 0 0 20px;"><b>Memorandos pendientes</b></span></a>
                                            <a  class="iconoLista" style="margin: 5px 10px;" onclick="descargarReporte('reporte_nuevos_contratos')"><span style="background: url('../images/xls.png') no-repeat scroll left top rgba(0, 0, 0, 0);font-size: 14px; padding: 0 0 0 20px;">Nuevos Contratos</span></a>-->
                        <div id="formulario_revision"></div>

                        <div id="consultar-solicitud"></div>

                    </div>
                </div>

            </div>        

            <div class="modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content" >
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 class="modal-title">Acta y entrega de predio</h4>
                        </div>
                        <div class="modal-body">
                            <p style="text-align: justify">Lo siguiente fue lo que se encontró con la información del identificador </p>
                            <ul id="fotos">                            
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </f:view>
    </body>
</html>