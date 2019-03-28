<%-- 
    Document   : newjsp
    Created on : 21/06/2016, 10:21:30 AM
    Author     : fabian.mejia
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%@taglib prefix="f" uri="http://java.sun.com/jsf/core"%>
<%@taglib prefix="h" uri="http://java.sun.com/jsf/html"%>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <!-- Meta, title, CSS, favicons, etc. -->
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="google-signin-client_id" content="234765107054-sl9nk9robbu8a74e3qp8r23ueg6lhjnq.apps.googleusercontent.com">
        <title>Inicio de sesión</title>

        <!-- Bootstrap -->
        <link href="../js/vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
        <!-- Font Awesome -->
        <link href="../js/vendors/font-awesome/css/font-awesome.min.css" rel="stylesheet">
        <!-- Font Awesome -->
        <link href="../css/custom.css" rel="stylesheet">
        <!-- NProgress -->
        <link href="../js/vendors/nprogress/nprogress.css" rel="stylesheet">
        <link href="../js/Plugins/gentella/css/custom.css" rel="stylesheet">

        <script language="JavaScript" src="../js/md5.js"></script>
        <!-- jQuery -->
        <script src="../js/vendors/jquery/dist/jquery.min.js"></script>
        <script src="https://apis.google.com/js/platform.js" async defer></script> 
        <script src="../js/reas/beneficiarios/login.js"></script> 
        <script>
            var prevenirCierre = false;

            //Iniciar los controles de la interfaz de usuario
            $(document).ready(function () {
                $('.usuario').attr('placeholder', 'Usuario').attr("required", "true");
                $('.password').attr('placeholder', 'Clave').attr("required", "true");
            });
            function onSignIn(googleUser) {
                // Useful data for your client-side scripts:
                var profile = googleUser.getBasicProfile();//  
                // The ID token you need to pass to your backend:
                var id_token = googleUser.getAuthResponse().id_token;
                var email = profile.getEmail();
                var data = {
                    'email': email,
                    'token': id_token
                };
                var l = window.location;
                var base_url = l.protocol + "//" + l.host + "/" + l.pathname.split('/')[1];
                $.ajax({
                    type: "POST",
                    url: base_url + "/loginGreas",
                    data: data,
                    dataType: "json",
                    success: function (data) {
                        console.log(data['resultado'])
                        if (data.resultado) {
                            window.location.href = base_url + '/s/index.jsp';
                        }else{
                            alert("su usuario de google no tiene permisos en el aplicativo")
                        }
                    },
                    error: function () {

                    }
                });
            }

            function signOut() {
                var auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(function () {
                    console.log('User signed out.');
                });
            }
        </script>
    </head>
    <body class="login">
        <div>
            <div class="login_wrapper">
                <div class="animate form login_form">
                    <section class="login_content">
                        <f:view>
                            <h:form id="login">
                                <h1>Inicio de sesión</h1>
                                <div>
                                    <h:inputText id="username" value="#{UsuarioManager.usuarioUsuario}"  styleClass="form-control usuario" /> 
                                </div>
                                <div>
                                    <h:inputSecret id="password" value="#{UsuarioManager.usuarioPwd}" styleClass="form-control password" onchange="document.getElementById('login:password').value = calcMD5(document.getElementById('login:password').value)"/>
                                </div>
                                <div>
                                    <h:commandButton id="submit" 
                                                     type="submit"
                                                     value="Ingresar"
                                                     styleClass="btn btn-default submit"
                                                     style="float: none; margin: 0 auto;"
                                                     action="#{UsuarioManager.validateUsuario}"/>
                                    <div class="clearfix"></div>
                                    <h:messages  showDetail="true" style="color: red" globalOnly="true"/>
                                </div>
                                <div class="clearfix"></div>
                                <%
                                if (request.getParameter("source") != null) {
                                    out.println("<h4>Usted ha sido redireccionado por inactividad en la página.<br/><br/>Por motivos de seguridad es necesario que ingrese nuevamente sus credenciales de usuario</h4>");
                                    out.println("<input type='hidden' name='source' value='" + request.getParameter("source") + "' />");
                                }
                                if (request.getParameter("secondlogin") != null) {
                                    out.println("<h4 style='color:red'>Su sesión ha finalizado!</h4><br><h4>Por motivos de seguridad usted ha sido redireccionado.<br><h4>Es probable que su sesión expirara por inactividad u otro usuario ingresó al sistema utilizando sus mismas credenciales.</h4><br><br>Recuerde que los datos de usuario y contraseña son personales y solo deben ser utilizados por la persona autorizada.</h4>");
                                }
                                %>
                                <hr>
                                para entrar con google
                                <div  style="width: 100%" class="g-signin2" data-onsuccess="onSignIn"></div>
                                <div class="separator">
                                    <div class="clearfix"></div>
                                    <br />

                                    <div>
                                        <h1>SIG Reasentamientos</h1>
                                        <p>Caja de la vivienda popular</p>
                                    </div>
                                </div>
                            </h:form>
                        </f:view>
                    </section>
                </div>

            </div>
        </div>
    </body>
</html>