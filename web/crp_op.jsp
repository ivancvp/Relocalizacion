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
        <script type="text/javascript" src="../js/Plugins/number/jquery.number.js"></script>


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
        <script src="../js/gov.cvp.reas/revision_financiera.js"></script>  
        <script type="text/javascript">

            <%
                if (session.getAttribute("user") != null) {
                    out.print("var usuario_login = '" + session.getAttribute("user") + "';");
                }
            %>

            $(document).ready(function () {

                $('#cedula').keypress(function (event) {
                    var keycode = (event.keyCode ? event.keyCode : event.which);
                    if (keycode == '13') {
                        buscarInfo();
                    }
                });               
            });
            function buscarInfo() {
                var contenedor = $("#infoPagos");
                contenedor.empty();
                var cedula = $("#cedula").val() ? $("#cedula").val() : "";
                var operacion = $("#titular").is(":checked") ? "op_cedula_arrendador" : "op_cedula";
                var objeto = {
                    'op': operacion,
                    'cedula': cedula
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
                                contenedor.empty();
                                var id = 0;
                                for (var i = 0; i < res.data.length; i++) {
                                    id = res.data[i].grurad_id;
                                    contenedor.append(
                                            '<tr align="center">' +
                                            '<td>' +
                                            res.data[i].identificador +
                                            '</td>' +
                                            '<td>' +
                                            res.data[i].documento +
                                            '</td>' +
                                            '<td>' +
                                            res.data[i].nombre +
                                            '</td>' +
                                            '<td>' +
                                            res.data[i].cdp +
                                            '</td>' +
                                            '<td>' +
                                            res.data[i].resolucion +
                                            '</td>' +
                                            '<td>' +
                                            res.data[i].crp +
                                            '</td>' +
                                            '<td>' +
                                            $.number(res.data[i].valor_crp, 2) +
                                            '</td>' +
                                            '<td>' +
                                            res.data[i].num_op +
                                            '</td>' +
                                            '<td>' +
                                            $.number(res.data[i].valor_op, 2) +
                                            '</td>' +
                                            '<td>' +
                                            res.data[i].fecha_pago +
                                            '</td>' +
                                            '</tr>'
                                            );

                                }
                            } else {
                                alert("No hay datos");
                            }
                        }
                        $('#pagos').dataTable();


                    }, error: function (e) {
                        alert("No fué posible consultar:" + e);
                    }
                });
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

        </style>
        <title>Readicación Memorandos de pago</title>
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
                                        <h3>Revisión de pagos
                                        </h3>
                                    </div>
                                </div>
                                <div class="row">
                                    <p>
                                        busqueda de Ordenes de pago y CRP radicadas filtradas por cedula o identificador 

                                    </p>
                                    <div> <label>Numero de cedula: </label> <input type="text" id="cedula" placeholder="número de cedula" > 
                                        <input type="checkbox" id="titular"><label>(Seleccione para buscar por la cedula titular de la cuenta para resultados del 2015)</label>
                                    </div>
                                    <div class="container">

                                        <table id="pagos" class="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Identificador</th>
                                                    <th>Documento</th>
                                                    <th>Nombre</th>
                                                    <th>CDP</th>
                                                    <th>Resolución</th>
                                                    <th>CRP</th>
                                                    <th>valor CRP</th>
                                                    <th>Orden de pago</th>
                                                    <th>Valor OP</th>
                                                    <th>fecha de pago</th>                                                    
                                                    <!--<th></th>-->
                                                </tr>
                                            </thead>
                                            <tbody id="infoPagos">                                               
                                            </tbody>
                                        </table>
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