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
            if (window.location.pathname.indexOf("/Reasentamientos/s") === -1) {
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
        <link rel="stylesheet" href="../css/Plugins/datepicker.css"/>
        <link rel="stylesheet" href="../js/vendors/bootstrap-daterangepicker/daterangepicker.css"/>


        <link href="../js/Plugins/gentella/css/custom.css" rel="stylesheet">
        <link rel="stylesheet" href="../css/estilos.css" type="text/css" />

        <script src="../js/jquery-1.9.1.min.js" type="text/javascript"></script>
        <script src="../js/jquery-ui-1.10.0.custom.min.js"></script>  
        <script src="../js/bootstrap.min.js"></script>  

        <script type="text/javascript" src="../js/idleRedirect.js"></script>

        <script type="text/javascript" src="../js/Plugins/jquery.jeditable.mini.js"></script>
        <script type="text/javascript" src="../js/Plugins/jquery.selectBoxIt.min.js"></script>
        <script type="text/javascript" src="../js/vendors/html5sortable/jquery.sortable.min.js"></script>


        <script src="../js/jquery.dataTables.min.js"></script>  
        <script src="../js/jquery.qtip.js"></script>  
        <script src="../js/Plugins/globalize.js"></script>
        <script src="../js/Plugins/dx.chartjs.js"></script>
        <script src="../js/Plugins/dhtmlxgantt.js"></script>
        <script src="../js/Plugins/dhtmlxgantt_locale_es.js"></script>

        <script src="../js/Plugins/moment/moment.min.js"></script>
        <script src="../js/Plugins/datepicker/daterangepicker.js"></script>
        <script src="../js/Plugins/datepicker/bootstrap-datepicker.js"></script>
        <!--<script src="../js/Plugins/dhtmlxgantt_quick_info.js"></script>-->
        <script src="../js/jquery.loader.js"></script>
        <script src="../js/gov.cvp.reas/reportes.js"></script>  
        <script type="text/javascript">

            <%
                if (session.getAttribute("user") != null) {
                    out.print("var usuario_login = '" + session.getAttribute("user") + "';");
                }
            %>

            var URL_IMPRIMIR = window.location.protocol + "//" + window.location.hostname + ":81/";
            $(document).ready(function () {
                //bannerRotator('#bannerRotator', 500, 5000, true);
                $(window).bind("beforeunload", function (event) {
                    if (prevenirCierre)
                        return "No debería cerrar esta ventana hasta diligenciar completamente el formulario, esto puede traer errores posteriores. ¿Realmente desa salir?";
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
                //iniciarPanelGraficos();

            });
            function ocultarPaneles()
            {
                $("#consultar-solicitud").hide();
            }

            function iniciarModuloConsulta() {
                prevenirCierre = false;
                //inicializa el date range    
                $.fn.datepicker.dates.en = {
                    days: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"],
                    daysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
                    daysMin: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
                    months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
                    monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
                    today: "Hoy",
                    clear: "Limpiar"
                };

                $('.input-daterange').datepicker({
                    todayBtn: "linked",
                    format: 'yyyy-mm-dd'
                });


                /*
                 var start = $('#start').datepicker({
                 onRender: function (date) {
                 return date.valueOf() < now.valueOf() ? 'disabled' : '';
                 }
                 }).on('changeDate', function (ev) {
                 if (ev.date.valueOf() > end.date.valueOf()) {
                 var newDate = new Date(ev.date)
                 newDate.setDate(newDate.getDate() + 1);
                 end.setValue(newDate);
                 }
                 start.hide();
                 $('#end')[0].focus();
                 }).data('datepicker');
                 
                 var end = $('#end').datepicker({
                 onRender: function (date) {
                 return date.valueOf() <= start.date.valueOf() ? 'disabled' : '';
                 }
                 }).on('changeDate', function (ev) {
                 end.hide();
                 }).data('datepicker')
                 */

                $("#form-buscar-memorandos input").keypress(function (e) {
                    if (e.which === 13) {
                        e.preventDefault();
                        buscarMemorandos();
                    }
                });

                $("#grpRangoFechas .btn").click(function (e) {
                    $('#start').datepicker('setDate', moment().add($(e.target).attr("data-inicio"), 'd').toDate());
                    $('#end').datepicker('setDate', moment().add($(e.target).attr("data-fin"), 'd').toDate());
                    buscarGrupos();
                });

                //formulario.buscarSolicitud();
            }
            function formatDate(date) {
                var d = new Date(date),
                        month = '' + (d.getMonth() + 1),
                        day = '' + d.getDate(),
                        year = d.getFullYear();

                if (month.length < 2)
                    month = '0' + month;
                if (day.length < 2)
                    day = '0' + day;

                return [year, month, day].join('-');
            }

//         funcncion que carga los gupos buscados
            function buscarGrupos() {
                var contenedor = $("#grupos");
                contenedor.empty();
                var tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                var desde = $("#start").val() ? $("#start").val() : formatDate(new Date());
                var hasta = $("#end").val() ? $("#end").val() : formatDate(tomorrow);
                var objeto = {
                    'op': "consulta_grupos",
                    'desde': desde,
                    'hasta': hasta
                };
                $.ajax({
                    type: "POST",
                    url: "GestionConsultas",
                    dataType: "text",
                    async: true,
                    data: objeto,
                    success: function (response) {
                        if (response){
                            var res = eval('(' + response + ')');
                            if (res && res.total > 0) {
                                var id = 0;
                                for (var i = 0; i < res.data.length; i++) {
                                    id = res.data[i].grurad_id;
                                    contenedor.append(
                                            '<li class="list-group-item grupo-radicado" onclick=" memorandosXGrupo(' + id + ')" data-id="' + res.data[i].grurad_id + '">' +
                                            '	<div class="row">' +
                                            '		<div class="col-md-11 col-sm-11 col-xs-11">' +
                                            'Grupo radicado: ' + res.data[i].grurad_fecha +
                                            '			<a class="add-grupo" style="cursor: pointer;" title="Agregar grupo"><span class="fa fa-chevron-right" aria-hidden="true"></span></a>' +
                                            '		</div>' +
                                            '	</div>' +
                                            '</li>'
                                            );

//                                    $(contenedor).children("li").last().on('click', function () {
//                                        memorandosXGrupo(id);
//                                    });
                                }
                            }else{
                                contenedor.append("No hay resultados");
                            }

                        }


                    }, error: function (e) {
                        alert("No fué posible consultar:" + e);
                    }
                });
            }

            //funcion para cargar los memorandos de un grupo de  radicación
            function memorandosXGrupo(id) {
                var contenedor = $("#form-buscar-memorandos").parent().find(".target");
                $("#resultados-seleccionados").attr("data-grupo-id", id);
                contenedor.empty();
                var objeto = {
                    op: "memorandos_x_grupo",
                    idGrupo: id
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
                                for (var i = 0; i < res.data.length; i++) {
                                    contenedor.append(
                                            '<li data-id="' + res.data[i].id + '">' +
                                            '	<div class="row">' +
                                            '		<div class="col-md-11 col-sm-11 col-xs-11">' +
                                            '			<strong>' + res.data[i].cordis + '</strong>' +
                                            '			<span> | ' + res.data[i].identificador + '</span>' +
                                            '			<span> | ' + res.data[i].periodo_pagar + '</span>' +
                                            '		</div>' +
                                            '		<div class="fa-hover">' +
                                            '			<a class="adicionar-item hidden" style="cursor: pointer;" title="Añadir a la lista"><span class="fa fa-chevron-right" aria-hidden="true"></span></a>' +
                                            '			<a class="eliminar-item " style="cursor: pointer;" title="Eliminar"><span class="fa fa-chevron-left" aria-hidden="true"></span></a>' +
                                            '		</div>' +
                                            '	</div>' +
                                            '</li>'
                                            );
                                }
                                $(contenedor).find(".adicionar-item").on('click', function (a) {
                                    $(a.target).closest("li").appendTo('.target');
                                    $(".target").trigger('dragend.h5s', {item: $(a.target).closest("li")});
                                });
                                $(contenedor).find(".eliminar-item").on('click', function (a) {
                                    $(a.target).closest("li").appendTo('.source');
                                    $(".source").trigger('dragend.h5s', {item: $(a.target).closest("li")});
                                });

                            }
                            $("#total-resultados-seleccionados").text($("#grupo-radicado").children("li").size());
                            if ($('.target').find("li").size() > 0) {
                                $("#btn-guardar-grupo").removeClass('disabled');
                                $("#btn-descargar-archivo-plano").removeClass('disabled');
                            } else {
                                $("#btn-guardar-grupo").addClass('disabled');
                                $("#btn-descargar-archivo-plano").addClass('disabled');
                            }
                        }

                        $(".source, .target").sortable({
                            connectWith: ".connected"
                        }).on('dragend.h5s', function (a) {
                            a.preventDefault();
                            if ($('.target').find("li").size() > 0) {
                                $("#btn-guardar-grupo").removeClass('disabled');
                                $("#btn-descargar-archivo-plano").removeClass('disabled');
                            } else {
                                $("#btn-guardar-grupo").addClass('disabled');
                                $("#btn-descargar-archivo-plano").addClass('disabled');
                            }

                            if ($(a.delegateTarget).hasClass("target")) {
                                $(a.target).find(".adicionar-item").addClass('hidden');
                                $(a.target).find(".eliminar-item").removeClass('hidden');
                            } else {
                                $(a.target).find(".adicionar-item").removeClass('hidden');
                                $(a.target).find(".eliminar-item").addClass('hidden');
                            }

                            ;

                        });
                    }, error: function () {
                        alert("No fué posible consultar los grupos de memorandos");
                    }
                });
            }



            function descargarReporte(reporte, parametros) {
                //var url = 'GenerarReporteCSV?op=' + reporte;
                var url = 'GenerarReporteCSV';
                var params = 'op=' + reporte;
                var xhr = new XMLHttpRequest();
                if (parametros) {
                    //url += "&" + parametros;
                    params += "&" + parametros;
                }
                
                xhr.ontimeout = function () {
                    $("#dialog_espere").dialog("destroy");
                    console.error("The request for " + url + " timed out.");
                };
                xhr.onload = function (e) {
                    var a = document.createElement("a");
                    document.body.appendChild(a);
                    a.style = "display: none";
                    var blobURL = URL.createObjectURL(xhr.response);
                    a.href = blobURL;
                    a.download = reporte + '.csv';
                    a.click();
                    window.URL.revokeObjectURL(url);
                };
                xhr.onreadystatechange = function (aEvt) {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200)
                            $("#dialog_espere").dialog("destroy");
                        else
                            $("#dialog_espere").dialog("destroy");
                    }
                    if (xhr.readyState === 3) {
                        $("#progressbar").progressbar({
                            value: 50
                        });
                    }
                    if (xhr.readyState === 2) {
                        $("#progressbar").progressbar({
                            value: 25
                        });
                    }
                };
                xhr.open("POST", url, true);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.responseType = "blob";
                xhr.timeout = 86400000;
                xhr.send(params);
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
                            value: false
                        });
                    }
                });
            }


            function buscarMemorandos() {
                var contenedor = $("#form-buscar-memorandos").parent().find("#lst-resultados-memorandos");
                contenedor.empty();
                var objeto = {
                    op: "consulta_memorandos",
                    cordis: $("#form-buscar-memorandos").find("#txt-cordis").val(),
                    identificador: $("#form-buscar-memorandos").find("#txt-identificador").val()
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
                                for (var i = 0; i < res.data.length; i++) {
                                    contenedor.append(
                                            '<li data-id="' + res.data[i].id + '">' +
                                            '	<div class="row">' +
                                            '		<div class="col-md-11 col-sm-11 col-xs-11">' +
                                            '			<strong>' + res.data[i].cordis + '</strong>' +
                                            '			<span> | ' + res.data[i].identificador + '</span>' +
                                            '			<span> | ' + res.data[i].periodo_pagar + '</span>' +
                                            '		</div>' +
                                            '		<div class="fa-hover">' +
                                            '			<a class="adicionar-item" style="cursor: pointer;" title="Añadir a la lista"><span class="fa fa-chevron-right" aria-hidden="true"></span></a>' +
                                            '			<a class="eliminar-item hidden" style="cursor: pointer;" title="Eliminar"><span class="fa fa-chevron-left" aria-hidden="true"></span></a>' +
                                            '		</div>' +
                                            '	</div>' +
                                            '</li>'
                                            );
                                }
                                $(contenedor).find(".adicionar-item").on('click', function (a) {
                                    $(a.target).closest("li").appendTo('.target');
                                    $(".target").trigger('dragend.h5s', {item: $(a.target).closest("li")});
                                });
                                $(contenedor).find(".eliminar-item").on('click', function (a) {
                                    $(a.target).closest("li").appendTo('.source');
                                    $(".source").trigger('dragend.h5s', {item: $(a.target).closest("li")});
                                });
                            } else {
                                alert("No hay resultados de la consulta");
                            }
                        }

                        $(".source, .target").sortable({
                            connectWith: ".connected"
                        }).on('dragend.h5s', function (a) {
                            a.preventDefault();
                            if ($('.target').find("li").size() > 0) {
                                $("#btn-guardar-grupo").removeClass('disabled');
                                $("#btn-descargar-archivo-plano").removeClass('disabled');
                            } else {
                                $("#btn-guardar-grupo").addClass('disabled');
                                $("#btn-descargar-archivo-plano").addClass('disabled');
                            }

                            if ($(a.delegateTarget).hasClass("target")) {
                                $(a.target).find(".adicionar-item").addClass('hidden');
                                $(a.target).find(".eliminar-item").removeClass('hidden');
                            } else {
                                $(a.target).find(".adicionar-item").removeClass('hidden');
                                $(a.target).find(".eliminar-item").addClass('hidden');
                            }


                            $("#resultados-seleccionados").find("#total-resultados-seleccionados").text($('.target').find("li").size());
                            //$(a.target).find(".fa").removeClass('fa-chevron-right').addClass('fa-chevron-left');
                        });
                    }, error: function () {
                        alert("No fué posible consultar los memorandos");
                    }
                });
            }

            function guardarListado() {
                var grupoId = $("#resultados-seleccionados").attr("data-grupo-id") ? $("#resultados-seleccionados").attr("data-grupo-id") : 'null';
                var resultados = $("#resultados-seleccionados").find("li");
                var ids = [];
                for (var i = 0; i < resultados.length; i++) {
                    ids.push($(resultados[i]).data("id"));
                }
                var operacion = "insertar_editar_grupo_radicacion_memorando";
                var datos = {
                    op: operacion,
                    grupoId: grupoId,
                    MEMORANDOS_IDS: ids.toString()
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
                                var modal_id = Math.random().toString(36).substring(7);
                                var titulo = "Guardado completo";
                                var alertas = [];
                                if (!$("#dynamicModal-" + modal_id).find("#estadoSelector").val()) {
                                    alertas.push('El grupo fué guardado correctamente con la fecha: ' + res.data[0].grurad_fecha);
                                }
                                if (alertas.length > 0) {
                                    var html = '<div id="dynamicModal-alert-' + modal_id + '" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="confirm-modal" aria-hidden="true">';
                                    html += '<div class="modal-dialog">';
                                    html += '<div class="modal-content panel-success">';
                                    html += '<div class="modal-header panel-heading">';
                                    html += '<a class="close" data-dismiss="modal">×</a>';
                                    html += '<h4>' + titulo + '</h4>';
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
                                    $("#dynamicModal-alert-" + modal_id).modal();
                                    $("#dynamicModal-alert-" + modal_id).modal('show');

                                    $("#dynamicModal-alert-" + modal_id).on('hidden.bs.modal', function (e) {
                                        $(this).remove();
                                    });

                                    return;
                                }

                            }
                        }
                    }, error: function () {
                        alert("No fué posible almacenar la información");
                    }
                });
            }

            function descargarArchivoPlano() {
                var resultados = $("#resultados-seleccionados").find("li");
                var ids = [];
                for (var i = 0; i < resultados.length; i++) {
                    ids.push($(resultados[i]).data("id"));
                }
                var params = {
                    MEMORANDOS_IDS: ids.toString()
                };
                descargarReporte("reporte_archivo_plano_memorandos_financiera", $.param(params));
            }
            function descargarArchivoxls() {
                var resultados = $("#resultados-seleccionados").find("li");
                var ids = [];
                for (var i = 0; i < resultados.length; i++) {
                    ids.push($(resultados[i]).data("id"));
                }
                var params = {
                    MEMORANDOS_IDS: ids.toString()
                };
                Reportexls("reporte_archivo_plano_memorandos_financiera", $.param(params));
            }
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
                line-height: 0px;
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
            .input-group .form-control {
                margin: 0px !important;
            }
            #content-center{
                padding-left:5%;
                padding-right: 5%;
            }


        </style>
        <title>Readicación Memorandos de pago</title>
    </head>
    <body>

        <f:view>
            <header>
                <img src="../images/logo_cvp.png" height="75" style="" />
            </header>
                <jsp:include page="menu.jsp"> 
                    <jsp:param name="articleId" value="radicacion_memorandos.jsp"/>
                </jsp:include>
           

            <div id="page-wrapper">

                <div id="content">
                    <div id="sp-breadcrumb" class="span12">
                        <ul class="breadcrumb" style="height: 35px;">

                            <%
                                if (session.getAttribute("user") != null) {
                                    out.print("<li><span>Usuario: <i>" + ((Map<String, Object>)session.getAttribute("info")).get("usuario_nombre") + "</i></span> / </li>");
                                }
                            %>
                            <li>
                                <h:form>
                                    <h:commandLink value="Cerrar Sesión"
                                                   action="#{UsuarioManager.logout}"/>
                                </h:form>   
                            </li>
                            <li class="pull-right" style="margin-top: 8px;">
                                <div id="txtEstado" style="">Verificando estado del sistema...</div>
                            </li>
                        </ul>

                    </div>    


                    <div id="content-center">
                        <div class="right_col" role="main">
                            <div class="">
                                <div class="page-title">
                                    <div class="title_left">
                                        <h3>Grupos de memorandos radicados</h3>
                                    </div>
                                </div>

                                <form class="form-horizontal ">
                                    <div class="control-group">
                                        <label class="control-label" for="first-name">Buscar por fecha</label>
                                        <div class="clearfix"></div>
                                        <div class="btn-group btn-group-sm" id="grpRangoFechas">
                                            <a class="btn btn-default" data-inicio="0" data-fin="1">Hoy</a>
                                            <a class="btn btn-default" data-inicio="-1" data-fin="0">Ayer</a>
                                            <a class="btn btn-default" data-inicio="-7" data-fin="1">Última semana</a>
                                        </div>
                                        <div class="clearfix"></div>
                                        <div class="input-group">
                                            <div class="input-daterange" id="datepicker" >
                                                <input type="text" class="input-small" id="start"/>
                                                <span class="" > a</span>
                                                <input type="text" class="input-small" id="end"/>
                                            </div>

                                            <div class="clearfix"></div>
                                            <a class="btn btn-primary" onclick="buscarGrupos()">Buscar</a>
                                        </div>

                                    </div>
                                </form>
                                <div class="row ">

                                    <div class="col-md-6 col-xs-12">
                                        <div class="x_panel">
                                            <div class="x_title">
                                                <h2>Grupos de memorandos enviados <small></small></h2>
                                                <ul class="nav navbar-right panel_toolbox">
                                                </ul>
                                                <div class="clearfix"></div>
                                            </div>
                                            <div class="x_content">
                                                <div class="sideBySide" >
                                                    <div class="right">
                                                        <ul class="list-group" id="grupos">

                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div class="row">
                                    <div class="col-md-12 col-xs-12">
                                        <div class="x_panel">
                                            <div class="x_title">
                                                <h2>Buscar Memorandos <small></small></h2>
                                                <ul class="nav navbar-right panel_toolbox">
                                                </ul>
                                                <div class="clearfix"></div>
                                            </div>
                                            <div class="x_content">
                                                <form id="form-buscar-memorandos" data-parsley-validate class="form-inline">
                                                    <div class="form-group col-md-4 col-sm-4 col-xs-12">
                                                        <label class="control-label" for="first-name">Cordis</label>
                                                        <div class="">
                                                            <input type="text" id="txt-cordis" required="required" class="form-control col-md-7 col-xs-12">
                                                        </div>
                                                    </div>
                                                    <div class="form-group col-md-4 col-sm-4 col-xs-12">
                                                        <label class="control-label" for="last-name">Identificador</label>
                                                        <div class="">
                                                            <input type="text" id="txt-identificador" name="last-name" required="required" class="form-control col-md-7 col-xs-12">
                                                        </div>
                                                    </div>
                                                </form>


                                                <form class="form-group">
                                                    <div class="col-md-6 col-sm-6 col-xs-12 col-md-offset-0">
                                                        <a onclick="buscarMemorandos()" class="btn btn-primary">Buscar</a>
                                                    </div>
                                                </form>
                                                <div class="clearfix"></div>
                                                <div class="ln_solid"></div>

                                                <div class="col-md-6 col-xs-12">
                                                    <div class="x_panel">
                                                        <div class="x_title">
                                                            <h2>Resultados <small></small></h2>
                                                            <ul class="nav navbar-right panel_toolbox">
                                                            </ul>
                                                            <div class="clearfix"></div>
                                                        </div>
                                                        <div class="x_content">
                                                            <div class="sideBySide">
                                                                <div class="right">
                                                                    <h3>
                                                                        <small>Cordis | Identificador | Periodo a pagar</small>
                                                                    </h3>
                                                                    <ul id="lst-resultados-memorandos" class="source connected">
                                                                    </ul>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-md-6 col-xs-12">
                                                    <div class="x_panel">
                                                        <div class="x_title">
                                                            <h2>Memorandos a enviar <small></small></h2>
                                                            <ul class="nav navbar-right panel_toolbox">
                                                            </ul>
                                                            <div class="clearfix"></div>
                                                        </div>
                                                        <div class="x_content">
                                                            <div class="sideBySide" id="resultados-seleccionados">
                                                                <div class="right">
                                                                    <h3>
                                                                        <small>Cordis | Identificador | Periodo a pagar</small>
                                                                    </h3>
                                                                    <ul class="target connected" id="grupo-radicado">
                                                                    </ul>
                                                                    <div class="col-md-3 col-sm-3 col-xs-12 col-md-offset-10">
                                                                        <h4>
                                                                            <small>Total: </small><small id="total-resultados-seleccionados">0</small>
                                                                        </h4>
                                                                    </div>
                                                                    <div class="clearfix"></div>
                                                                    <div class="ln_solid"></div>
                                                                    <div class="row">
                                                                        <div class="col-md-3">
                                                                            <a id="btn-guardar-grupo" onclick="guardarListado()" class="btn btn-primary disabled"><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span> Guardar</a>
                                                                        </div>
                                                                        <div class="col-md-6">
                                                                            <a id="btn-descargar-archivo-plano" onclick="descargarArchivoPlano()" class="btn btn-primary disabled"><span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span> Descargar archivo plano</a>
                                                                        </div>
                                                                        <div class="col-md-6 collapse
                                                                             ">
                                                                            <a id="btn-descargar-archivo-xls" onclick="descargarArchivoxls()" class="btn btn-primary "><span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span> Descargar archivo xls
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </f:view>
    </body>
</html>