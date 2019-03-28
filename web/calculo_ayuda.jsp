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
        <script type="text/javascript">

            <%
                if (session.getAttribute("user") != null) {
                    out.print("var usuario_login = '" + session.getAttribute("user") + "';");
                }
            %>
            var URL_IMPRIMIR = window.location.protocol + "//" + window.location.hostname + ":81/"; //"http://cs9068:81/";
            var smav = 781242;
            var Total = 0;
            var porcentajeT = 0;
            var compon = [];
            var opciones = '';
            var blMenorMin = false;
            $(document).ready(function () {
                componentes();
                formCalculo();

                $('#cedula').keypress(function (event) {
                    var keycode = (event.keyCode ? event.keyCode : event.which);
                    if (keycode == '13') {
                        encabezado();
                    }
                });

            });
            function componentes() {
                var contenedor = $('#opciones');
                var objeto = {
                    'op': "componentes"
                };
                $.ajax({
                    type: "POST",
                    url: "GestionConsultas",
                    dataType: "text",
                    async: false,
                    data: objeto,
                    success: function (response) {
                        if (response) {
                            var res = eval('(' + response + ')');
                            if (res && res.total > 0) {
                                var id = 0;
                                componente = res.data;
                                for (var i = 0; i < res.data.length; i++) {
                                    contenedor.append(
                                            '<div class"col-lg-6" >' +
                                            '<div class"panel panel-default componente" >' +
                                            '<div class="panel-heading"><h2>' + res.data[i].nombre + ' </h2> valor maximo ' + res.data[i].val_max + '%</div>' +
                                            '<div class="panel-body" id="panel' + res.data[i].id_componente + '">' +
                                            '<input  type="hidden"  class="valmax" value="' + res.data[i].val_max + '">' +
                                            '</div>' +
                                            '</div>' +
                                            '</div>'
                                            );
                                }
                            }
                        }
                        $('#pagos').dataTable();
                    }, error: function (e) {
                        alert("No fué posible consultar:" + e);
                    }
                });

            }
            ;
            function formCalculo() {
                var objeto = {
                    'op': "info_calculo",
                    'cedula': 123};
                $.ajax({
                    type: "POST",
                    url: "GestionConsultas",
                    dataType: "text",
                    async: false,
                    data: objeto,
                    success: function (response) {
                        if (response) {
                            var res = eval('(' + response + ')');
                            if (res && res.total > 0) {
                                for (var i = 0; i < res.data.length; i++) {
                                    var contenedor = $('#panel' + res.data[i].id_componente);
                                    var grupo = $('#list' + res.data[i].grupo);

                                    if (grupo.length) {
                                        console.log("entró hay grupo");
                                        grupo.append(
                                                '<li class="list-group-item">' +
                                                res.data[i].descripcion +
                                                '<input class="pull-right checkbox" id="' +
                                                res.data[i].id_opcion +
                                                '" type="checkbox" value="' +
                                                res.data[i].valor +
                                                '">' +
                                                '</li>'
                                                );
                                    } else {
                                        console.log("agrega grupo");
                                        contenedor.append(
                                                '<ul class="list-group" id="list' + res.data[i].grupo + '" >' +
                                                '</ul>');
                                        var grupo = $("#list" + res.data[i].grupo);
                                        grupo.append(
                                                '<li class="list-group-item">' +
                                                res.data[i].descripcion +
                                                '<input class="pull-right checkbox" id="' +
                                                res.data[i].id_opcion +
                                                '" type="checkbox" value="' +
                                                res.data[i].valor +
                                                '">' +
                                                '</li>'
                                                );
                                    }


                                }
                            }
                            $('input:checkbox').on("click", function () {
                                var $box = $(this);
                                if ($box.is(":checked")) {
                                    // the name of the box is retrieved using the .attr() method
                                    // as it is assumed and expected to be immutable
                                    var group = $(this).parent().parent().find("input:checkbox");
                                    // the checked state of the group/box on the other hand will change
                                    // and the current value is retrieved using .prop() method
                                    $(group).prop("checked", false);
                                    $box.prop("checked", true);
                                } else {
                                    $box.prop("checked", false);
                                }
                                var hijos = $(this).parent().parent().find("input:checkbox");


                            });
                        }
                    },
                    error: function (e) {
                        alert("No fué posible consultar:" + e);
                    }
                });

            }
            ;
            function encabezado() {
                var objeto = {
                    'op': "info_beneficiario",
                    'numero': $('#cedula').val()
                };
                $.ajax({
                    type: "POST",
                    url: "GestionConsultas",
                    dataType: "text",
                    async: false,
                    data: objeto,
                    success: function (response) {
                        if (response) {
                            var res = eval('(' + response + ')');
                            if (res && res.total > 0) {
                                var id = 0;
                                for (var i = 0; i < res.data.length; i++) {
                                    $('#nombre').val(res.data[i]['Nombre 1']);
                                    $('#identificador').val(res.data[i]['IDENTIFICADOR']);
                                    $('#cedula1').val(res.data[i]["Cedula 1"]);
                                }
                            }
                        }
                        $('#pagos').dataTable();
                    }, error: function (e) {
                        alert("No fué posible consultar:" + e);
                    }
                });
            }
            ;
            function calcularTotal() {
                Total = 0;
                porcentajeT = 0;
                compon = [];
                opciones = '';
                $('#bodyTable').empty();
                var imprimir = false;
                var componentes = $('.panel-body');
                $.each(componentes, function (id, componente) {
                    var porcentaje = 0;
                    var valmax = $(componente).find('.valmax').val();
                    var valores = $(componente).find("input:checked");

                    $.each(valores, function (index, respuesta) {
                        console.log("valor=" + parseInt($(respuesta).val(), 10));
                        opciones += "," + $(respuesta).attr('id');
                        if (porcentaje < valmax) {
                            porcentaje += parseInt($(respuesta).val(), 10);
                            imprimir = true;
                        } else {
                            porcentaje = 0;
                            imprimir = false;
                            alert("escojio mas de una opción del componente " + (id + 1) + ", ¡por favor corrgija!");
                        }
                    });
                    porcentajeT += porcentaje;
                    console.log($(componente));

                    compon.push({nombre: $(componente).parent().find('h2').text(), porcentaje: porcentaje});
                    $('#bodyTable').append("<tr><td>" + $(componente).parent().find('h2').text() + "</td><td>" + porcentaje + "%</td></tr>");
                });
                Total = (smav * (porcentajeT / 100));
                if (Total > (smav / 2) && Total < smav) {
                    $('#bodyTable').append("<tr><th>Porcentaje Total</th><th>" + porcentajeT + "%</th></tr>");
                    $('#bodyTable').append("<tr><th>Ayuda Total</th><th>$" + $.number(Total, 0) + "</th></tr>");
//                $('#porcentaje').text("Porcentaje " + porcentajeT + "%");
//                $('#total').text("Total " + $.number(Total, 0));
                    $('#resumen').attr("hidden", false);
//                    if (imprimir) {
                    $('#imprimir').attr('disabled', false);
//                    } else {
//                        $('#imprimir').attr('disabled', true);
//                    }
                } else {
                    $('#imprimir').attr('disabled', false);
                    $('#resumen').attr("hidden", false);
                    alert("el valor está por debajo del 50% del salario minimo o supera su valor");

                }
            }
            ;
            function imprimir_calculo() {
                var objeto = {
                    identificador: $('#identificador').val(),
                    nombre: $('#nombre').val(),
                    cedula: $('#cedula1').val(),
                    total: Total,
                    porcentaje: porcentajeT,
                    usuario_login: usuario_login,
                    componentes: compon,
                    opciones: opciones

                };
                var result = null;
                $.ajax({
                    url: URL_IMPRIMIR + "pdf/imprimir_calculo_ayuda.php",
                    type: 'POST',
                    data: objeto,
                    success: function (data) {
                        result = data;
                        //window.location.href = URL_PDF + data;
                        window.open(URL_IMPRIMIR + "pdf/" + data, "_blank");
                        $('#guardar').attr('disabled', false);
                    }
                });
            }
            function guardarCalculo() {
                var objeto = {
                    op: "salvar_calculo",
                    identificador: $('#identificador').val(),
                    cedula: $('#cedula1').val(),
                    porcentaje: porcentajeT,
                    total: Total,
                    usuario_login: usuario_login,
                    componentes: compon


                };
                var result = null;
                $.ajax({
                    type: "POST",
                    url: "GestionConsultas",
                    dataType: "text",
                    async: true,
                    data: objeto,
                    success: function (data) {
                        guardarOpciones();
                    }
                });
            }
            ;
            function guardarOpciones() {
                var objeto = {
                    op: "salvar_opciones",
                    identificador: $('#identificador').val(),
                    cedula: $('#cedula1').val(),
                    porcentaje: porcentajeT,
                    total: Total,
                    usuario_login: usuario_login,
                    componentes: compon,
                    opciones: opciones.substring(1)

                };
                var result = null;
                $.ajax({
                    type: "POST",
                    url: "GestionConsultas",
                    dataType: "text",
                    async: true,
                    data: objeto,
                    success: function (data) {
                        alert("guardado correctamente");
                        $('#guardar').attr('disabled', true);
                    }
                });
            }
            ;
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
                            <div class="row">
                                <div class="page-title">                                    
                                    <h3>AYUDA POR CONCEPTO DE RELOCALIZACIÓN TRANSITORIA
                                    </h3>
                                    <p>Herramienta para generar el documento de ayuda de localización transitoria.</p>                                    
                                </div>
                                <br>
                                <div class="row">                                    
                                    <div> 
                                        <label>Identificador </label> <input type="text" id="cedula" placeholder="cedula o identificador" > 
                                    </div>
                                    <hr>
                                    <div class="container" id="calculo">                                                       
                                        <div id="encabezado">
                                            <div class="input-group">
                                                <label>Identificador  </label><input type="text" class="form-control" id="identificador" name="identificador">
                                                <br>
                                                <label>nombre </label><input type="text" class="form-control" id="nombre" name="nombre"> 
                                                <br>
                                                <label>cedula </label><input type="text" class="form-control" id="cedula1" name="cedula1"> 
                                            </div>
                                            <div class="input-group">
                                                <h2 class="pull-right" id="porcentaje"></h2>
                                                <h1 class="pull-right" id="total"></h1>
                                            </div> 
                                        </div> 
                                        <hr>
                                        <div id="opciones" class="row">

                                        </div> 
                                        <div id="resumen" class="row" hidden="true">
                                            <table id="resumen">
                                                <thead>
                                                    <tr>
                                                        <th>Componente</th>
                                                        <th>valor</th>                                                        
                                                    </tr>
                                                </thead>
                                                <tbody id="bodyTable" style="text-align: center;">

                                                </tbody>
                                            </table>
                                        </div> 
                                        <br>
                                        <div>
                                            <button  class="btn btn-info" onclick="calcularTotal()">calcular Total</button>
                                            <button  class="btn btn-success" onclick="imprimir_calculo()" id="imprimir" disabled>imprimir</button>
                                            <button  class="btn btn-success"  onclick="guardarCalculo()" id="guardar" disabled>guardar</button>
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