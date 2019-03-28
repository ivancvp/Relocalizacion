<%-- 
    Document   : menu
    Created on : 9/11/2016, 05:32:36 PM
    Author     : frmejia
--%>

<%@page import="com.frmejia.backend.manager.UsuarioManager"%>


<!--    <div class="navbar-header">
      <a class="navbar-brand" href="#">Reasentamientos</a>
    </div>-->
<%
    //System.out.println(request.getRequestURI().toString());
%>

<nav id="menu" class="navbar " role="navigation">
    <div class="container-fluid" id="navfluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navigationbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>        
        </div>
        <div class="collapse navbar-collapse" id="navigationbar">
            <ul class="nav navbar-nav">
                <li ><a href="index.jsp" class="
                        <%if (request.getParameter("articleId").equals("index.jsp")) {
                                out.print("active");
                            }
                        %>" 
                        >Inicio</a></li>
                <li ><a href="beneficiarios.jsp" class="
                        <%if (request.getParameter("articleId").equals("beneficiarios.jsp")) {
                                out.print("active");
                            }
                        %>" 
                        >Reasentamientos</a></li>
                <li ><a href="resoluciones.jsp" class="
                        <%if (request.getParameter("articleId").equals("resoluciones.jsp")) {
                                out.print("active");
                            }
                        %>" 
                        >Relocalización</a></li>
                <li ><a href="gestion_novedades.jsp" class="
                        <%if (request.getParameter("articleId").equals("gestion_novedades.jsp")) {
                                out.print("active");
                            }
                        %>" 
                        >Novedades</a></li>
                <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">Herramientas
                        <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="calculo_ayuda.jsp" class="
                               <%if (request.getParameter("articleId").equals("calculo_ayuda.jsp")) {
                                       out.print("active");
                                   }
                               %>" 
                               >Cálculo de ayuda</a></li>
                        <li><a href="seguimiento_novedades.jsp" class="
                               <%if (request.getParameter("articleId").equals("seguimiento_novedades.jsp")) {
                                       out.print("active");
                                   }
                               %>" 
                               >Estado de novedades</a></li>
                        <li><a href="radicacion_memorandos.jsp" class="
                               <%if (request.getParameter("articleId").equals("radicacion_memorandos.jsp")) {
                                       out.print("active");
                                   }
                               %>" 
                               >Radicación Memorandos</a></li>
                        <li><a href="radicacion_crp.jsp" class="
                               <%if (request.getParameter("articleId").equals("radicacion_crp.jsp")) {
                                       out.print("active");
                                   }
                               %>" 
                               >Radicación CRP</a></li>
                        <li><a href="crp_op.jsp" class="
                               <%if (request.getParameter("articleId").equals("crp_op.jsp")) {
                                       out.print("active");
                                   }
                               %>" 
                               >Estado financiero por persona</a></li>
                        <li><a href="consultar_resolucion.jsp" class="
                               <%if (request.getParameter("articleId").equals("consultar_resolucion.jsp")) {
                                       out.print("active");
                                   }
                               %>" 
                               >Consultar Resolución</a></li> 
                    </ul>
                </li>      
                <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">Reportes
                        <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a onclick="descargarReporte('reporte_nuevos_memorandos')">Nuevos Memorandos</a></li>
                        <li><a onclick="descargarReporte('reporte_contratos_pendientes_asignacion')">Contratos sin asignación</a></li>
                        <li><a onclick="descargarReporte('reporte_memorandos_pendientes')">Memorandos Pendientes</a></li>
                        <li><a onclick="descargarReporte('reporte_nuevos_contratos')">Nuevos Contratos</a></li>           
                        <li><a onclick="descargarReporte('reporte_resumen_resoluciones')">Resumen Resoluciones</a></li>           
                        <li role="separator" class="divider"></li>
                        <li><a onclick="descargarReporte('reporte_resumen_contratos_x_mes')">Meses de contrato por Identificador</a></li>           
                    </ul>
                </li>      
            </ul>
        </div>
    </div>
</nav>