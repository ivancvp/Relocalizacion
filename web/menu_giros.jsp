<%-- 
    Document   : menu
    Created on : 9/11/2016, 05:32:36 PM
    Author     : frmejia
--%>

<%@page import="com.frmejia.backend.manager.UsuarioManager"%>


<!--    <div class="navbar-header">
      <a class="navbar-brand" href="#">Reasentamientos</a>
    </div>-->
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
                <li ><a href="../index.jsp" class="
                                      <%if (request.getParameter("articleId").equals("index.jsp")) {
                                              out.print("active");
                                          }
                                      %>" 
                                      >Inicio</a></li>
                <li ><a href="resoluciones.jsp" class="
                                      <%if (request.getParameter("articleId").equals("resoluciones.jsp")) {
                                              out.print("active");
                                          }
                                      %>" 
                                      >Selección de vivienda</a></li>
                <li ><a href="gestion_novedades.jsp" class="
                                      <%if (request.getParameter("articleId").equals("gestion_novedades.jsp")) {
                                              out.print("active");
                                          }
                                      %>" 
                                      >Juridico</a></li>             
               
        </div>
    </div>
</nav>