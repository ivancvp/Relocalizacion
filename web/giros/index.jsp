<%-- 
    Document   : index
    Created on : 4/01/2017, 10:45:45 AM
    Author     : Fabian 
--%>
<%@page import="com.frmejia.backend.manager.UsuarioManager"%>
<%@page import="java.util.Map"%>
<%@ page language="java" pageEncoding="UTF-8" %>
<%@taglib prefix="f" uri="http://java.sun.com/jsf/core"%>
<%@taglib prefix="h" uri="http://java.sun.com/jsf/html"%>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta charset="utf-8">
        <!--
                <script type="text/javascript">
                    if (window.location.pathname.indexOf("/Reasentamientos/s") === -1) {
                        window.location.href = "/Reasentamientos/s/index.jsp";
                    }
        
                </script>-->



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
        <link rel="stylesheet" href="../css/basic_reas.css" type="text/css" />

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
        <script type="text/javascript"></script>
        <title>Giros</title>
    </head>
    <body>
        <header>
            <img src="../images/logo_cvp.png" height="75" style="" />
        </header>
        <f:view>
            <jsp:include page="../menu_giros.jsp"> 
                <jsp:param name="articleId" value="../resoluciones.jsp"/>
            </jsp:include>
        </f:view>
    </body>
</html>
