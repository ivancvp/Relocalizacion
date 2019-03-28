<%@ page language="java" pageEncoding="UTF-8" %>

<%@taglib prefix="f" uri="http://java.sun.com/jsf/core"%>
<%@taglib prefix="h" uri="http://java.sun.com/jsf/html"%>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <link rel="icon" type="image/vnd.microsoft.icon" href="../images/favicon.ico" />
        <link rel="stylesheet" href="../css/estilos.css" type="text/css" />
        <script language="JavaScript" src="../js/md5.js"></script>
        <title>Fuera de línea</title>
        <STYLE>
		body {
			font-family: Arial;
			margin: 0;
		}
		
		#contenedor{
			width: 900px;
			margin: auto;
		}
		
		h1{
			width: 550px;
			font-size: 20px;
			font-weight: normal;
			margin: 10px auto;
			background: #faf5b3;
			padding: 8px;
		}
		
		#medio,#pie,#cabecera{
			text-align: center;	
		}
		
		#pie a{
			font-size: 10px;
			color: gray;
		}
		
		#pie span{
			display: block;
			font-size: 12px;
		}
		
		#formulario{
			width: 300px;
			margin: auto;
			margin-top: 20px;
			margin-bottom: 50px;
		}
		
		#formulario p, #submit{
			margin-left: 50px;			
		}
		
		.visible{
			display: none;
		}
		
	</STYLE>
    </head>
    <body>
        <header>
            <img src="../images/banner_logos.png" height="95" style="" />
        </header>
        <nav>
            <ul>
                <li style="height:44px;"></li>
            </ul>
        </nav>

        <f:view>
            <DIV id="medio">
                <H1>Nuestro sistema se encuentra desactivado por tareas de mantenimiento.</H1><IMG src="../images/fondoOffline.png">			 
            </DIV>
            <DIV id="pie"></DIV>

        </f:view>
    </body>
</html>