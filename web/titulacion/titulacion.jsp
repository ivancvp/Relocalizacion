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
        <link rel="stylesheet" href="../js/Plugins/orgchart/css/jquery.orgchart.css"/>

        <link rel="stylesheet" href="../css/estilos.css" type="text/css" />

        <script src="../js/jquery-1.9.1.min.js" type="text/javascript"></script>
        <script src="../js/jquery-ui-1.10.0.custom.min.js"></script>  
        <script src="../js/bootstrap.min.js"></script>  

        <script type="text/javascript" src="../js/Plugins/jquery.jeditable.mini.js"></script>
        <script type="text/javascript" src="../js/Plugins/jquery.selectBoxIt.min.js"></script>
        <script type="text/javascript" src="../js/Plugins/number/jquery.number.js"></script>


        <script src="../js/jquery.dataTables.min.js"></script>  
        <script src="../js/jquery.qtip.js"></script>  
        <script src="../js/Plugins/globalize.js"></script>
        <script src="../js/Plugins/dx.chartjs.js"></script>
        <script src="../js/Plugins/dhtmlxgantt.js"></script>
        <script src="../js/Plugins/dhtmlxgantt_locale_es.js"></script>
        <script src="../js/Plugins/moment.js"></script>
        <script src="../js/jquery.loader.js"></script>

        <script type="text/javascript">

            <%
                if (session.getAttribute("user") != null) {
                    out.print("var usuario_login = '" + session.getAttribute("user") + "';");
                }
            %>
            var URL_IMPRIMIR = window.location.protocol + "//" + window.location.hostname + ":81/";
            var LISTA_IMPRESION_MASIVA = [];

            $(document).ready(function () {

                $(document).ajaxStart(function () {
                    $.loader({
                        className: "blue-with-image-2",
                        content: 'Cargando...'
                    });
                });
                $(document).ajaxComplete(function () {
                    $.loader('close');
                });


                $('#identificador').keypress(function (e) {
                    if (e.keyCode === 13) {  // detect the enter key
                        buscar_benef();
                    }
                });

                $('#myButton').click(function (e) {
                    alert('Button click activated!');
                });

            });

            function buscar_benef() {
                var contenedor = $("#beneficiarios");
                contenedor.empty();
                var identificador = $("#identificador").val();
                identificador = identificador.toUpperCase();
                var objeto = {
                    where: "upper(benef_1_) like '%" + identificador + "%' OR upper(cod_plano_) like '%" + identificador + "%'",
                    outFields: 'cod_plano_,benef_1_,cc_1_,barrio_leg_,direccion_',
                    returnGeometry: false,
                    f: 'json'
                };

                $.ajax({
                    type: "GET",
                    url: "http://201.245.172.43:6080/arcgis/rest/services/DUT/planos_titulacion/MapServer/0/query",
                    dataType: "text",
                    async: true,
                    data: objeto,
                    success: function (response) {
                        if (response) {
                            var res = eval('(' + response + ')');

                            if (res && res.features && res.features.length > 0) {
                                for (var i = 0; i < res.features.length; i++) {
                                    var r = res.features[i];
                                    $("#beneficiarios").append('<tr><td>' + r.attributes.benef_1_ + '</td>' +
                                            '<td>' + r.attributes.cc_1_ + '</td>' +
                                            '<td>' + r.attributes.barrio_leg_ + '</td>' +
                                            '<td>' + r.attributes.direccion_ + '</td>' +
                                            '<td>' + r.attributes.cod_plano_ + '</td>' +
                                            '<td><a class="btn btn-primary" onclick="imprimirPlano(\'' + r.attributes.cod_plano_ + '\')" > Imprimir plano </a></td></tr>');
                                }
                            }
                        }
                    }, error: function () {
                        alert("No fué posible obtener las observaciones");
                    }
                });
            }

            function imprimirPlano(cod_plano, log_container) {
                var url = "http://201.245.172.43:6080/arcgis/rest/services/DUT/AdvancedHighQualityPrinting/GPServer/AdvancedHighQualityPrinting/execute?Web_Map_as_JSON=&DDP_Pages=" + cod_plano + "&Format=&Layout_Template=&env%3AoutSR=&env%3AprocessSR=&returnZ=false&returnM=false&f=json";
                $.ajax({
                    url: url,
                    type: 'GET',
                    dataType: 'text',
                    beforeSend: function () {
                        /*
                         $("<div id='dialog_espere' style='text-align: center;'>Descargando. Este trabajo puede tardar algunos minutos<br><br>Este mensaje se cerrará automáticamente.<div id='progressbar'></div></div>").dialog({
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
                         });*/
                    },
                    complete: function () {

                    },
                    success: function (response) {
                        if (response)
                        {
                            var res = eval('(' + response + ')');
                            if (res.results && res.results[0] && res.results[0].value && res.results[0].value.url) {
                                var url = res.results[0].value.url;
                                var fileName = cod_plano + ".pdf";

                                var xhr = new XMLHttpRequest();
                                xhr.ontimeout = function () {
                                    console.error("The request for " + url + " timed out.");

                                    $("#dialog_espere").dialog("destroy");

                                };

                                xhr.onload = function (e) {

                                    var a = document.createElement("a");
                                    document.body.appendChild(a);
                                    a.style = "display: none";

                                    var blobURL = URL.createObjectURL(xhr.response);
                                    a.href = blobURL;
                                    a.download = fileName;
                                    a.click();
                                    window.URL.revokeObjectURL(url);

                                    if (log_container) {
                                        log_container.append("<li><small class='bg-success'>" + cod_plano + " - ok<small></li>");
                                    }

                                    imprimirSiguente(log_container);

                                    //$("#dialog_espere").dialog("destroy");

                                };
                                xhr.onerror = function (e) {
                                    console.error("Error: " + e);
                                    //$("#dialog_espere").dialog("destroy");
                                };

                                xhr.onreadystatechange = function (aEvt) {
                                    if (xhr.readyState === 4) {
                                        if (xhr.status === 200) {
                                            //$("#dialog_espere").dialog("destroy");
                                        } else {
                                            //$("#dialog_espere").dialog("destroy");
                                        }
                                    }
                                    if (xhr.readyState === 3) {
                                        /*$("#progressbar").progressbar({
                                         value: 50
                                         });*/
                                    }
                                    if (xhr.readyState === 2) {
                                        /*$("#progressbar").progressbar({
                                         value: 25
                                         });*/
                                    }
                                };
                                xhr.open("GET", url, true);
                                xhr.responseType = "blob";
                                xhr.timeout = 7200000;
                                xhr.send(null);
                            } else {
                                //$("#dialog_espere").dialog("destroy");
                                if (log_container) {
                                    log_container.append("<li><small class='bg-danger'>" + cod_plano + " - Error<small></li>");
                                } else {

                                    alert("No fué posible generar el plano");
                                }
                                imprimirSiguente(log_container);
                            }
                        }
                    }, error: function () {
                        //$("#dialog_espere").dialog("destroy");
                        if (log_container) {
                            log_container.append("<li><small class='bg-danger'>" + cod_plano + " - Error en consulta<small></li>");
                        } else {
                            alert("No fué posible realizar la consulta");
                        }
                        imprimirSiguente(log_container);
                    }
                });
            }


            function abrirPanelImpresionMasiva() {
                var modal_id = Math.random().toString(36).substring(7);
                var titulo = "Impresion masiva ";
                var html =
                        '<div id="modalCargueMasivo-' + modal_id + '" style="" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="confirm-modal" aria-hidden="true">' +
                        '   <div class="modal-dialog modal-lg" style="">' +
                        '       <div class="modal-content">' +
                        '           <div class="modal-header">' +
                        '               <a class="close" data-dismiss="modal">×</a>' +
                        '               <h4>' + titulo + '</h4>' +
                        '           </div>' + // header
                        '           <div class="modal-body ">' +
                        '               <div id="form_cargue_masivo">' +
                        '                   <form class="form" role="form" data-toggle="validator" id="form-cargar-documento">' +
                        '                       <div class="form-group">' +
                        '                           <label for="documento">Lista de codigos</label>' +
                        '                           <textarea class="form-control" rows="5" id="txt_codigos"></textarea>' +
                        '			</div>' +
                        '                   </form>' +
                        '               </div>' +
                        '           </div>' +
                        '           <div class="modal-footer" id="txt_status_impresion_masiva_titulación">' +
                        '           </div>' + // footer
                        '           <div class="modal-footer">' +
                        '               <span id="btn-imprimir" class="btn btn-success" >Imprimir</span>' +
                        '               <span id="btn-cerrar" class="btn btn-default" >Cerrar</span>' +
                        '           </div>' + // footer
                        '       </div>' + // content
                        '   </div>' + // dialog
                        '</div>'; // modalWindow
                $('body').append(html);

                var modal = $("#modalCargueMasivo-" + modal_id).modal();
                modal.modal('show');
                modal.on('hidden.bs.modal', function (e) {
                    $(this).remove();
                });
                modal.find("#btn-cerrar").on('click', function () {
                    modal.modal('hide');
                });

                modal.find("#btn-imprimir").on('click', function () {
                    if (modal.find("#txt_codigos").val()) {
                        LISTA_IMPRESION_MASIVA = [];
                        var codigos = modal.find("#txt_codigos").val().split("\n");
                        if (codigos.length > 0) {
                            for (var i = 0; i < codigos.length; i++) {
                                if (codigos[i] && codigos[i] !== "") {
                                    LISTA_IMPRESION_MASIVA.push(codigos[i]);
                                }
                            }
                            $("#txt_status_impresion_masiva_titulación").html("<h4>Imprimiendo por favor espere<h4> <small ><span id='current'>0</span> de " + LISTA_IMPRESION_MASIVA.length + "</small><div><ul class='unstyled list-unstyled' id='log-container'></ul></div>");
                            var log_container = $("#txt_status_impresion_masiva_titulación").find("#log-container");
                            imprimirSiguente(log_container);
                        }
                    }
                });
            }

            function imprimirSiguente(log_container) {
                if (LISTA_IMPRESION_MASIVA.length > 0) {
                    var codigo = LISTA_IMPRESION_MASIVA.shift();
                    imprimirPlano(codigo, log_container);

                    var current = $("#txt_status_impresion_masiva_titulación").find("#current").text();
                    $("#txt_status_impresion_masiva_titulación").find("#current").text(parseInt(current) + 1);
                } else {
                    if (log_container) {
                        log_container.append("<li><small class='bg-info'>Cola de impresión finalizada<small></li>");
                    } else {

                        alert("Cola de impresión terminada!");
                    }
                }
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
            th 
            {
                height: 50px; 
                width:50px;

                text-align:center; 
                vertical-align:middle;
            }
            #content-center{
                padding-left:5%;
                padding-right: 5%;
            }
            #beneficiarios{
                text-align:center; 
                vertical-align:middle; 
            }

        </style>
        <title>Readicación Memorandos de pago</title>
    </head>
    <body>

        <f:view>
            <header>
                <img src="../images/logo_cvp.png" height="75" style="" />
            </header>

            <jsp:include page="../menu.jsp"> 
                <jsp:param name="articleId" value="titulacion.jsp"/>
            </jsp:include>

            <div id="page-wrapper">

                <div id="content">
                    <div id="sp-breadcrumb" class="span12">
                        <ul class="breadcrumb" style="height: 35px;">
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
                            <li class="pull-right" style="margin-top: 8px;">
                                <div id="txtEstado" style="">Verificando estado del sistema...</div>
                            </li>
                        </ul>
                    </div>         
                    <div id="content-center">
                        <div class="right_col" role="main">
                            <div class="row">
                                <div class="page-title">                                    
                                    <h3>Consultar Beneficiario
                                    </h3>                                                              
                                </div>
                                <br>
                                <div >
                                    <labeL>Beneficiario: </labeL><input type="text" id="identificador" >
                                    <button onclick="buscar_benef()">Buscar</button>
                                    <div class="clearfix"></div>
                                    <a href="#" onclick="abrirPanelImpresionMasiva()">Impresión masiva</a>
                                </div>
                                <hr>
                                <div >
                                    <table id="tabla_beneficiarios" class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Nombre</th>
                                                <th>Cédula</th>
                                                <th>Barrio</th>
                                                <th>Dirección</th>
                                                <th>Código</th>
                                                <th>Opción</th>

                                                <!--<th></th>-->
                                            </tr>
                                        </thead>
                                        <tbody id="beneficiarios">                                               
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </f:view>
    </body>
</html>