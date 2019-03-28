<%-- 
    Document   : solicitudes
    Created on : 9/02/2013, 09:40:00 PM
    Author     : Fabian
--%>
<%@page import="gov.cvp.reas.manager.UsuarioManager"%>
<%@ page language="java" pageEncoding="UTF-8" %>

<%@taglib prefix="f" uri="http://java.sun.com/jsf/core"%>
<%@taglib prefix="h" uri="http://java.sun.com/jsf/html"%>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <link rel="icon" type="image/vnd.microsoft.icon" href="../images/favicon.ico" />
        <link rel="stylesheet" href="../css/custom-theme/jquery-ui-1.10.0.custom.min.css" />  

        <link rel="stylesheet" href="../css/jquery.dataTables.css" />  
        <link rel="stylesheet" href="../css/jquery.qtip.css" />  
        <link href="../css/jquery.loader.css" rel="stylesheet" />   
        <link type="text/css" href="../css/Plugins/alpaca.min.css" rel="stylesheet"/>

        <script src="../js/jquery-1.9.1.min.js" type="text/javascript"></script>
        <script src="../js/jquery-ui-1.10.0.custom.min.js"></script>  
        <script type="text/javascript" src="../js/idleRedirect.js"></script>

        <script type="text/javascript" src="../js/Plugins/tutorial/intro.min.js"></script>
        <script type="text/javascript" src="../js/Plugins/tutorial/tutorial.js"></script>
        <script type="text/javascript" src="../js/Plugins/tutorial/jquery.tooltipster.min.js"></script>
        <link href="../css/Plugins/introjs.min.css" rel="stylesheet">
        <link href="../css/Plugins/tooltipster.css" rel="stylesheet">

        <% if(UsuarioManager.getTienePermisoSesion("302,304,306,102,103")){ %>
        <script src="../js/gov.cvp.reas/util/formularioREASUtil.js"></script>  

        <script src="../js/gov.cvp.reas/estado_solicitud/FormularioEstadoSolicitud.js"></script>  

        <script src="../js/gov.cvp.reas/estado_solicitud/FormularioSeguimientoSolicitud.js"></script>  
        <script src="../js/gov.cvp.reas/estado_solicitud/FormularioSeguimientoSolicitud_Schema.js"></script>  
        <script src="../js/gov.cvp.reas/estado_solicitud/FormularioSeguimientoSolicitud_Options.js"></script>

        <script src="../js/gov.cvp.reas/estado_solicitud/FormularioSeguimientoNotarialSolicitud.js"></script>  
        <script src="../js/gov.cvp.reas/estado_solicitud/FormularioSeguimientoNotarialSolicitud_Schema.js"></script>  
        <script src="../js/gov.cvp.reas/estado_solicitud/FormularioSeguimientoNotarialSolicitud_Options.js"></script>  
        
        <script src="../js/gov.cvp.reas/estado_solicitud/FormularioSeguimientoAdministrativoSolicitud.js"></script>  
        <script src="../js/gov.cvp.reas/estado_solicitud/FormularioSeguimientoAdministrativoSolicitud_Schema.js"></script>  
        <script src="../js/gov.cvp.reas/estado_solicitud/FormularioSeguimientoAdministrativoSolicitud_Options.js"></script>  
        <% } %>

        <% if(UsuarioManager.getTienePermisoSesion("111")){ %>
        <% if(UsuarioManager.getTienePermisoSesion("113")){ %>
        <script>
            var yuxn8r2ggium7pmxphej = '<div  class="iconoLista" style="margin: 5px 10px; background: url(\'../images/listMenu.png\') no-repeat scroll 5px 5px transparent; color: #475228;    display: block;    font-size: 14px;    line-height: 2;    padding-left: 35px;    text-decoration: none;    vertical-align: middle;    cursor: pointer;  " onMouseOver="this.style.color=\'#A3AFA3\'"   onMouseOut="this.style.color=\'#475228\'" href="#" onclick="RepositorioDocumentalDesactivarItemSeleccionado(\'imewurjdnbjv6i4bifcjcfe3m\')"><span style="background: url(\'../images/cancel.png\') no-repeat scroll left top rgba(0, 0, 0, 0);font-size: 14px; padding: 0 0 0 20px;">Eliminar</span></div>';

            RepositorioDocumentalDesactivarItemSeleccionado = function (file) {
                $("#li-" + file).qtip().tooltip.hide();
                $("<div>¿Está seguro que desea eliminar este documento?<br>Este proceso no puede deshacerse.</div>").dialog({
                    resizable: false,
                    modal: true,
                    dialogClass: "no-close",
                    draggable: false,
                    closeOnEscape: false,
                    width: 300,
                    title: "Eliminar documento",
                    buttons: {
                        "Cancelar": function () {
                            $(this).dialog("close");
                        },
                        "Eliminar Archivo": function () {
                            $(this).dialog("close");

                            json = {
                                op: 'desactivarDocumentoRepositorio',
                                pigeon: file,
                                pif: Math.random()
                            };

                            $.ajax({
                                type: "POST",
                                url: "GestionDML",
                                dataType: "text",
                                success: function (response) {
                                    if (response)
                                    {
                                        var res = eval('(' + response + ')');
                                        if (res && res.total > 0) {
                                            $("#li-" + file).parent().parent().parent().find("a")[0].click();
                                            alert("Documento eliminado correctamente");
                                        } else {
                                            alert("No fué desactivar el documento");
                                        }
                                    }
                                }, error: function () {
                                    alert("No fué desactivar el documento");
                                },
                                data: json
                            });
                        }
                    }
                });
            };
        </script>
        <% }else{ %>
        <script>var yuxn8r2ggium7pmxphej = "";</script>
        <% } %>
        <script src="../js/RepositorioDocumental.js"></script>
        <% } %>

        <% if(UsuarioManager.getTienePermisoSesion("302")){ %>
        <script src="../js/FormularioConceptoJuridico.js"></script>
        <script src="../js/gov.cvp.reas/juridico/FormularioConceptoJuridicoAntecedentes.js"></script>
        <script src="../js/gov.cvp.reas/juridico/FormularioConceptoJuridicoAntecedentes_Schema.js"></script>  
        <script src="../js/gov.cvp.reas/juridico/FormularioConceptoJuridicoAntecedentes_Options.js"></script> 
        <% } %>

        <!--<script src="../js/gov.cvp.reas/juridico/FormularioInformacionPreliminarInformeTecnicoJuridico.js"></script>  -->

        <% if(UsuarioManager.getTienePermisoSesion("304")){ %>
        <script src="../js/gov.cvp.reas/juridico/FormularioInformeTecnicoJuridico.js"></script>  
        <% } %>

        <% if(UsuarioManager.getTienePermisoSesion("101")){ %>
        <script src="../js/FormularioConsultaSolicitudes.js"></script>  
        <script src="../js/gov.cvp.reas/FormularioConsultaMatricula.js"></script>  
        <% } %>

        <% if(UsuarioManager.getTienePermisoSesion("306")){ %>
        <script src="../js/gov.cvp.reas/juridico/FormularioDemanda.js"></script>
        <script src="../js/gov.cvp.reas/juridico/FormularioDemanda_Schema.js"></script>  
        <script src="../js/gov.cvp.reas/juridico/FormularioDemanda_Options.js"></script>  
        <% } %>

        <script src="../js/Plugins/select2/select2.js"></script>
        <script src="../js/jquery.dataTables.min.js"></script>  
        <script src="../js/jquery.qtip.js"></script>  
        <script src="../js/jquery.loader.js"></script>        
        <script src="../js/Plugins/select2/i18n/es.js"></script>

        <link href="../css/Plugins/select2.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="../css/estilos.css" type="text/css" />

        <% if(UsuarioManager.getTienePermisoSesion("2")){ %>
        <script src="../js/gov.cvp.reas/administrar/FormularioCambiarClave.js"></script>  
        <script type="text/javascript" src="../pigeon.jsp?a=<%=Math.random()%>"></script>
        <% } %>
        
        <title>Formalización</title>

        <script>
            var codigo_concepto_juridico;
            var prevenirCierre = false;

            //Iniciar los controles de la interfaz de usuario
            $(document).ready(function () {

                $(window).bind("beforeunload", function (event) {
                    if (prevenirCierre)
                        return "No debería cerrar esta ventana hasta diligenciar completamente el formulario, esto puede traer errores posteriores. ¿Realmente desa salir?";
                });

                ocultarPaneles();

            <% if(UsuarioManager.getTienePermisoSesion("101")){ %> iniciarModuloConsulta();
            <% } %>

                $(document).ajaxStart(function () {
                    $.loader({
                        className: "blue-with-image-2",
                        content: 'Cargando...'
                    });
                });
                $(document).ajaxComplete(function () {
                    $.loader('close');
                });
            });

            function ocultarPaneles()
            {
                $("#diligenciar-concepto").hide();
                $("#concepto-juridico").hide();
                $("#juridico").hide();
            }

            function limpiarPaneles() {
                $("#diligenciar-concepto").empty();
                $("#concepto-juridico").empty();
                $("#juridico").empty();
            }

            <% if(UsuarioManager.getTienePermisoSesion("302")){ %>
            function crearConceptoJuridico(id_solicitud, rowId) {
                codigo_concepto_juridico = null;

                ocultarPaneles();
                $('#diligenciar-concepto').show();

                $('#diligenciar-concepto').append('<form class="forms ui-tabs-panel ui-widget-content ui-corner-all" autocomplete="on" style="padding-bottom: 20px; padding-right: 15px; border-width: 0;"></form>');
                $('#diligenciar-concepto .forms').formularioConceptoJuridico({
                    soli_id: id_solicitud,
                    guardado_completo: conceptoJuridicoGuardadoCompleto
                });

                $("aside #abrirRepositorioDocumental").remove();

            <% if(UsuarioManager.getTienePermisoSesion("111")){ %>
                $('<li id="abrirRepositorioDocumental"><a class="iconoLista"' +
                        'onclick="AbrirPanelRepositorioDocumental(' + id_solicitud + ')">' +
                        '<span style="background: url(\'../images/directory.png\') no-repeat scroll left top rgba(0, 0, 0, 0);' +
                        'font-size: 14px; padding: 0 0 0 20px;">Repositorio documental</span></a></li>').appendTo($("aside ul"));
            <% } %>
            }


            function conceptoJuridicoGuardadoCompleto(success, concepto_id) {
                $.loader('close');

                ocultarPaneles();
                $('#diligenciar-concepto').empty();
                $('#juridico').show();
                $("aside #abrirRepositorioDocumental").remove();

                if (success) {
                    if (concepto_id && confirm('Los cambios se han almacenado correctamente, ¿Desea abrir el reporte almacenado?')) {

                        var id = 'bgForm' + (new Date().getTime());
                        window.open('GenerarReporteGenerico?reportName=concepto_juridico_antecedentes_reg&reportCode=' + soli_cod_soli + '&reportParameters=CONCEPTO_JURIDICO_ID@:' + res.data[0].con_jurid_id , '_blank');
                        //var $iframe = $('<iframe id="' + id + '" name="' + id + '" style="display: none;" src="GenerarReporteGenerico?reportName=concepto_juridico_antecedentes_reg&reportParameters=CONCEPTO_JURIDICO_ID@:' + concepto_id + '"></iframe>')
                        //        .appendTo(document.body);

                        $iframe.one('load', function () {
                            $iframe.load(function () {

                            });
                        });

                    } else {
                    }
                } else {
                    alert("Se presentó un error al almacenar la información");
                }
            }
            
            function crearConceptoJuridicoAntecedentes(id_solicitud, rowId, nombre) {
                codigo_concepto_juridico = null;

                ocultarPaneles();
                $('#diligenciar-concepto').show();

                $('#diligenciar-concepto').append('<form id="con_juri_antecendentes" class="forms ui-tabs-panel ui-widget-content ui-corner-all" autocomplete="on" style="padding-bottom: 20px; padding-right: 15px; border-width: 0;"></form>');
                FormularioConceptoJuridicoAntecedentes(id_solicitud, rowId,nombre,'diligenciar-concepto');
                //SolicitudAbreviado(' + itemSeleccionado.soli_id + ',' + $(row).data('indice-resultado') + ',\'' + itemSeleccionado.nombre + '\')
                //SeguimientoSolicitud(' + id_solicitud + ',' + rowId + ',\'' + nombre + '\',\'' + contenedor + '\');
                

                $("aside #abrirRepositorioDocumental").remove();

            <% if(UsuarioManager.getTienePermisoSesion("111")){ %>
                $('<li id="abrirRepositorioDocumental"><a class="iconoLista"' +
                        'onclick="AbrirPanelRepositorioDocumental(' + id_solicitud + ')">' +
                        '<span style="background: url(\'../images/directory.png\') no-repeat scroll left top rgba(0, 0, 0, 0);' +
                        'font-size: 14px; padding: 0 0 0 20px;">Repositorio documental</span></a></li>').appendTo($("aside ul"));
            <% } %>
            }
            function FormularioConceptoJuridicoAntecedentesGuardadoCompleto(success, codigo_archivo) {
                    $.loader('close');

                    if (success) {
                        prevenirCierre = false;
                        if (codigo_archivo) {
                            alert("Datos almacenados correctamente");
                        }
                        ocultarPaneles();
                        $('#diligenciar-concepto').empty();
                        $('#juridico').show();
                        $("aside #abrirRepositorioDocumental").remove();
                    } else {
                        alert("Se presentó un error al almacenar la información");
                    }
                }
            
            <% } %>

            <% if(UsuarioManager.getTienePermisoSesion("101")){ %>
            function iniciarModuloConsulta(origen) {

                if (origen) {
                    $(origen).parent().parent().children().removeClass('active');
                    $(origen).parent().addClass('active');
                }

                ocultarPaneles();
                limpiarPaneles();

                $('#juridico').show();
                var formulario = new FormularioConsulta("juridico", resultadoSeleccionado, false, "ANÁLISIS JURÍDICO - INFORMACIÓN DE LAS SOLICITUDES");
                formulario.iniciarFormulario();
            }

            function resultadoSeleccionado(itemSeleccionado, row) {
                var sOut = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">';
                sOut += '<tr><td>Solicitante:</td><td>' + itemSeleccionado.nombre + ' - ' + itemSeleccionado.pers_documentoid + '</td></tr>';
                sOut += '<tr><td>Predio:</td><td>' + itemSeleccionado.pre_nombre + '</td></tr>';
                sOut += '<tr><td>Cédula Catastral:</td><td>' + itemSeleccionado.pre_cedula_catastral + '</td></tr>';
                sOut += '<tr><td>Matricula Inmobiliaria:</td><td>' + itemSeleccionado.pre_matricula + '</td></tr>';
                sOut += '<tr><td>Ubicación:</td><td>' + itemSeleccionado.dpto_desc + ' - ' + itemSeleccionado.mpio_desc + ' - ' + itemSeleccionado.vereda + '</td></tr>';
                sOut += '<tr><td>Código de solicitud:</td><td>' + itemSeleccionado.soli_cod_soli + '</td></tr>';
                sOut += '<tr><td>Código anterior de solicitud:</td><td>' + itemSeleccionado.soli_cod_soli_anterior + '</td></tr>';

            <% if(UsuarioManager.getTienePermisoSesion("101,102")){ %>
                sOut += '<tr><td>Estado:</td><td><span id="lblEstado">' + (itemSeleccionado.tiest_soli_desc ? itemSeleccionado.tiest_soli_desc : '') + '</span> <a class="siguiente " style="display: inline; cursor: pointer; padding-left:10px;" onclick="EstadoSolicitud(' + itemSeleccionado.soli_id + ',' + $(row).data('indice-resultado') + ',\'formulario_editar_estado_solicitud\')">' +
                        '<span style="background: url(\'../images/page_white_edit.png\') no-repeat scroll left top rgba(0, 0, 0, 0);font-size: 14px; padding: 0 0 0 20px;">(Actualizar)</span></a></td></tr>';
                //sOut += '<a id="lblEstado"  class="iconoLista" style="margin: 5px 50px;" onclick="EstadoSolicitud(' + itemSeleccionado.soli_id + ',' + $(row).data('indice-resultado') + ',\'formulario_editar_estado_solicitud\')">Actualizar</a>';
            <% } %>
                sOut += '</table>';
                sOut += '<div style="margin: 5px 50px; display:none;" id="formulario_editar_estado_solicitud"></div>';

                /**Seguimiento Etapa 3**/
            <% if(UsuarioManager.getTienePermisoSesion("101,102")){ %>
                /*sOut += '<a  id="btnSeguimientoEtapa3" class="iconoLista" style="margin: 5px 50px;" onclick="SeguimientoSolicitud(' + itemSeleccionado.soli_id + ',' + $(row).data('indice-resultado') + ',\'' + itemSeleccionado.nombre + '\',\'seguimiento-solicitudes\')">' +
                 '<span style="background: url(\'../images/text_list_bullets.png\') no-repeat scroll left top rgba(0, 0, 0, 0);font-size: 14px; padding: 0 0 0 20px;">Seguimiento Etapa 3</span></a>';
                 */
                sOut += '<a  id="btnSeguimientoEtapa3' + '_' + $(row).data('indice-resultado') + '" class="iconoLista" style="margin: 5px 50px;" onclick="mostrarMenuSeguimientoEtapa3(\'btnSeguimientoEtapa3' + '_' + $(row).data('indice-resultado') + '\',' + itemSeleccionado.soli_id + ',' + $(row).data('indice-resultado') + ',\'' + itemSeleccionado.nombre + '\',\'seguimiento-solicitudes\')">' +
                        '<span style="background: url(\'../images/text_list_bullets.png\') no-repeat scroll left top rgba(0, 0, 0, 0);font-size: 14px; padding: 0 0 0 20px;">Seguimiento Etapa 3</span></a>';
            <% } %>

            <% if(UsuarioManager.getTienePermisoSesion("301")){ %>
                sOut += '<a  class="iconoLista" style="margin: 5px 50px;" href="#" onclick="generarReporteConceptoJuridico(' + itemSeleccionado.soli_id + ',' + itemSeleccionado.soli_cod_soli + ',' + $(row).data('indice-resultado') + ')">' +
                        '<span style="background: url(\'../images/pdf.png\') no-repeat scroll left top rgba(0, 0, 0, 0);font-size: 14px; padding: 0 0 0 20px;">Imprimir Concepto Jurídico Preliminar</span></a>';
            <% } %>
            <% if(UsuarioManager.getTienePermisoSesion("304")){ %>
                sOut += '<a  class="iconoLista" style="margin: 5px 50px;" href="GenerarReporteGenerico?reportName=informe_tecnico_juridico_definitivo&reportParameters=SOLI_ID@:' + itemSeleccionado.soli_id + '">' +
                        '<span style="background: url(\'../images/pdf.png\') no-repeat scroll left top rgba(0, 0, 0, 0);font-size: 14px; padding: 0 0 0 20px;">Imprimir Informe Técnico-Jurídico Definitivo (<i>Versión Anterior</i>)(<strike>Obsoleta</strike>)</span></a>';
            <% } %>

            <% if(UsuarioManager.getTienePermisoSesion("303")){ %>
                sOut += '<a  class="iconoLista" style="margin: 5px 50px;" href="inftecjur.jsp?itj=' + itemSeleccionado.soli_id + '#/informes/' + itemSeleccionado.soli_id + '">' +
                        '<span style="background: url(\'../images/pdf.png\') no-repeat scroll left top rgba(0, 0, 0, 0);font-size: 14px; padding: 0 0 0 20px;">Imprimir Informe Técnico Jurídico Definitivo</span></a>';
            <% } %>
            <% if(UsuarioManager.getTienePermisoSesion("305")){ %>
                sOut += '<a  class="iconoLista" style="margin: 5px 50px;" href="demanda.jsp?demanda=' + itemSeleccionado.soli_id + '#/demandas/' + itemSeleccionado.soli_id + '">' +
                        '<span style="background: url(\'../images/pdf.png\') no-repeat scroll left top rgba(0, 0, 0, 0);font-size: 14px; padding: 0 0 0 20px;">Imprimir Demanda</span></a>';
            <% } %>

            <% if(UsuarioManager.getTienePermisoSesion("111")){ %>
                sOut += '<a  class="iconoLista" style="margin: 5px 50px;" onclick="AbrirPanelRepositorioDocumental(' + itemSeleccionado.soli_id + ',' + $(row).data('indice-resultado') + ')">' +
                        '<span style="background: url(\'../images/directory.png\') no-repeat scroll left top rgba(0, 0, 0, 0);font-size: 14px; padding: 0 0 0 20px;">Repositorio documental</span></a>';
            <% } %>

            <% if(UsuarioManager.getTienePermisoSesion("302")){ %>
                sOut += '<a  class="iconoLista" style="margin: 5px 50px;" onclick="crearConceptoJuridicoAntecedentes(' + itemSeleccionado.soli_id + ',' + $(row).data('indice-resultado') + ',\'' + itemSeleccionado.nombre + '\')">Concepto jurídico y análisis de antecedentes registrales</a>';
            <% } %>

            <% if(UsuarioManager.getTienePermisoSesion("304")){ %>
                sOut += '<a  class="iconoLista" style="margin: 5px 50px;" onclick="InformeTecnicoJuridico(' + itemSeleccionado.soli_id + ',' + $(row).data('indice-resultado') + ',\'' + itemSeleccionado.nombre + '\')">Informe Técnico Jurídico Definitivo (<i>Versión Anterior</i>)(<strike>Obsoleta</strike>)</a>';
            <% } %>

            <% if(UsuarioManager.getTienePermisoSesion("308")){ %>
                sOut += '<a  class="iconoLista" style="margin: 5px 50px;" href="inftecjur.jsp?itj=' + itemSeleccionado.soli_id + '#/informes/' + itemSeleccionado.soli_id + '/edit/1">Informe Técnico Jurídico Definitivo</a>';
            <% } %>

            <% if(UsuarioManager.getTienePermisoSesion("306")){ %>
                sOut += '<a  class="iconoLista" style="margin: 5px 50px;" href="demanda.jsp?demanda=' + itemSeleccionado.soli_id + '#/demandas/' + itemSeleccionado.soli_id + '/edit/1">Demanda</a>';
            <% } %>


            <% if(UsuarioManager.getTienePermisoSesion("307")){ %>
                sOut += '<a  class="iconoLista" style="margin: 5px 50px;" target="_self" href="auditoria.jsp?solicitud=' + itemSeleccionado.soli_id + '&tipo=juridico">Auditoría Informe Técnico-Jurídico Definitivo</a>';
            <% } %>

                return sOut;
            }


            function iniciarModuloConsultaORIP(origen) {

                if (origen) {
                    $(origen).parent().parent().children().removeClass('active');
                    $(origen).parent().addClass('active');
                }

                ocultarPaneles();
                limpiarPaneles();

                $('#juridico').show();
                var formulario = new FormularioConsultaMatricula("juridico", resultadoSeleccionadoORIP, false, "ORIP");
                formulario.iniciarFormulario();
            }

            function resultadoSeleccionadoORIP(itemSeleccionado, row) {
                var sOut = '';
                window.open('GenerarReporteGenerico?reportName=ORIP_SIR_matricula&reportParameters=MATRICULA@:' + itemSeleccionado.matricula + '&reportCode=' + itemSeleccionado.matricula, '_blank');

            }

            function SeguimientoSolicitudGuardadoCompleto(success, codigo_archivo) {
                $.loader('close');

                if (success) {
                    prevenirCierre = false;
                    if (codigo_archivo) {
                        alert("Datos almacenados correctamente");
                    }
                    ocultarPaneles();
                    $('#seguimiento-solicitudes').empty();
                    $('#juridico').show();
                } else {
                    alert("Se presentó un error al almacenar la información");
                }
            }


            <% } %>

            <% if(UsuarioManager.getTienePermisoSesion("301")){ %>
            function generarReporteConceptoJuridico(soli_id, soli_cod_soli) {

                var parametros = {
                    op: 'ConsultaGenericaFormalizacion',
                    CAMPOS: 'con_jurid_id',
                    TABLA: 'concepto_juridico',
                    WHERE: 'soli_id = ' + soli_id
                };

                $.ajax({
                    type: "POST",
                    url: "GestionConsultas",
                    dataType: "text",
                    data: parametros,
                    success: function (response) {
                        if (response)
                        {
                            var res = eval('(' + response + ')');
                            if (res && res.total > 0) {

                                var id = 'bgForm' + (new Date().getTime());
                                window.open('GenerarReporteGenerico?reportName=concepto_juridico_antecedentes_reg&reportCode=' + soli_cod_soli + '&reportParameters=CONCEPTO_JURIDICO_ID@:' + res.data[0].con_jurid_id , '_blank');
                                //var $iframe = $('<iframe id="' + id + '" name="' + id + '" style="display: none;" src="GenerarReporteGenerico?reportName=concepto_juridico_antecedentes_reg&reportCode=' + soli_cod_soli + '&reportParameters=CONCEPTO_JURIDICO_ID@:' + res.data[0].con_jurid_id + '"></iframe>')
                                //        .appendTo(document.body);

                            } else {
                                alert("No se ha generado concepto jurídico para esta solicitud");
                            }

                        }
                    }, error: function () {
                        alert("No fué posible realizar la consulta");
                    }
                });

                //window.open("GenerarReporteGenerico?reportName=concepto_juridico&reportParameters=CONCEPTO_JURIDICO_ID@:" + codigo, '_blank');
            }
            <% } %>

            <% if(UsuarioManager.getTienePermisoSesion("304")){ %>
            function InformeTecnicoJuridico(id_solicitud, rowId) {
                if (confirm('Este informe es una versión obsoleta\n\nSolo debe ser utilizado para los informes creados antes de Diciembre de 2014,\n\n¿está seguro que desea continuar?')) {

                    ocultarPaneles();
                    $('#diligenciar-concepto').show();

                    $('#diligenciar-concepto').append('<form class="forms ui-tabs-panel ui-widget-content ui-corner-all" autocomplete="on" style="padding-bottom: 20px; padding-right: 15px; border-width: 0;"></form>');
                    $('#diligenciar-concepto .forms').formularioInformeTecnicoJuridico({
                        soli_id: id_solicitud,
                        guardado_completo: InformeTecnicoJuridicoGuardadoCompleto
                    });

                    $("aside #abrirRepositorioDocumental").remove();

                    $('<li id="abrirRepositorioDocumental"><a class="iconoLista"' +
                            'onclick="AbrirPanelRepositorioDocumental(' + id_solicitud + ')">' +
                            '<span style="background: url(\'../images/directory.png\') no-repeat scroll left top rgba(0, 0, 0, 0);' +
                            'font-size: 14px; padding: 0 0 0 20px;">Repositorio documental</span></a></li>').appendTo($("aside ul"));
                } else {

                }
            }


            function InformeTecnicoJuridicoGuardadoCompleto(success, concepto_id) {
                $.loader('close');

                ocultarPaneles();
                $('#diligenciar-concepto').empty();
                $('#juridico').show();
                $("aside #abrirRepositorioDocumental").remove();

                if (success) {

                } else {
                    alert("Se presentó un error al almacenar la información");
                }
            }
            <% } %>

            <% if(UsuarioManager.getTienePermisoSesion("101,102")){ %>
            function SeguimientoNotarialSolicitudGuardadoCompleto(success, codigo_archivo) {
                $.loader('close');

                if (success) {
                    prevenirCierre = false;
                    if (codigo_archivo) {
                        alert("Datos almacenados correctamente");
                    }
                    ocultarPaneles();
                    $('#seguimiento-solicitudes').empty();
                    $('#juridico').show();
                } else {
                    alert("Se presentó un error al almacenar la información");
                }
            }
            
            function SeguimientoAdministrativoSolicitudGuardadoCompleto(success, codigo_archivo) {
                $.loader('close');

                if (success) {
                    prevenirCierre = false;
                    if (codigo_archivo) {
                        alert("Datos almacenados correctamente");
                    }
                    ocultarPaneles();
                    $('#seguimiento-solicitudes').empty();
                    $('#juridico').show();
                } else {
                    alert("Se presentó un error al almacenar la información");
                }
            }

            function mostrarMenuSeguimientoEtapa3(id, id_solicitud, rowId, nombre, contenedor) {
                $("#" + id).qtip({
                    content: {
                        //title: {text: file.data().nombre},
                        text: '<a  class="iconoLista" style="margin: 5px 0px; margin-right:20px;" onclick="$(\'#' + id + '\').qtip(\'hide\');SeguimientoNotarialSolicitud(' + id_solicitud + ',' + rowId + ',\'' + nombre + '\',\'' + contenedor + '\');">' +
                                '<span style="background: url(\'../images/book_open.png\') no-repeat scroll left top rgba(0, 0, 0, 0);font-size: 14px; padding: 0 0 0 20px;">Tramite Notarial</span></a><br>' +
                                '<a  class="iconoLista" style="margin: 5px 0px;" onclick="$(\'#' + id + '\').qtip(\'hide\');SeguimientoSolicitud(' + id_solicitud + ',' + rowId + ',\'' + nombre + '\',\'' + contenedor + '\');">' +
                                '<span style="background: url(\'../images/hammer.png\') no-repeat scroll left top rgba(0, 0, 0, 0);font-size: 14px; padding: 0 0 0 20px;">Proceso Judicial</span></a><br>' +
                                '<a  class="iconoLista" style="margin: 5px 0px;" onclick="$(\'#' + id + '\').qtip(\'hide\');SeguimientoAdministrativoSolicitud(' + id_solicitud + ',' + rowId + ',\'' + nombre + '\',\'' + contenedor + '\');">' +
                                '<span style="background: url(\'../images/page_white_text.png\') no-repeat scroll left top rgba(0, 0, 0, 0);font-size: 14px; padding: 0 0 0 20px;">Proceso Administrativo</span></a>'
                    },
                    show: 'click',
                    hide: 'unfocus',
                    position: {
                        adjust: {x: 50, y: 0},
                        viewport: $(window),
                        my: 'center left',
                        at: 'center left'
                    },
                    style: {
                        classes: 'qtip-light qtip-shadow'
                    }
                }).qtip("show");
            }
            <% } %>
        </script>
    </head>
    <body>

        <f:view>
            <header>
                <div id="sesion">
                    <ul>
                        <%
                            if (session.getAttribute("user") != null) {
                                out.print("<li><a>Usuario: " + session.getAttribute("user") + "</a></li>");
                            }
                        %>
                        <li>
                            <h:form>
                                <h:commandLink value="Cerrar Sesión"
                                               action="#{UsuarioManager.logout}"/>
                            </h:form>   
                        </li>
                        <%
                            if(UsuarioManager.getTienePermisoSesion("2")){ 
                                out.print("<li><a style='cursor:pointer;color:#76874c;' onclick='var panel = new PanelCambiarClave({});panel.abrirVentana();'>Cambiar Contraseña</a></li>");
                            }
                        %>
                    </ul>
                </div>
                <img src="../images/banner_logos.png" height="95" style="" />
            </header>
            <nav>
                <table cellspacing="0" cellpadding="0" border="0" class="navigation">
                    <tbody>
                        <tr>
                            <h:form>
                                <td><h:commandLink value="Inicio" action="app-main"/></td>
                                <% if(UsuarioManager.getTienePermisoSesion("10")){ %>
                                <td><h:commandLink value="Solicitudes" action="solicitudes"/></td>
                                <% } %>
                                <% if(UsuarioManager.getTienePermisoSesion("20")){ %>
                                <td><h:commandLink value="Análisis Técnico" action="tecnico"/></td>
                                <% } %>
                                <% if(UsuarioManager.getTienePermisoSesion("30")){ %>
                                <td><h:commandLink value="Análisis Jurídico" action="juridico" styleClass="active"/></td>
                                <% } %>
                                <% if(UsuarioManager.getTienePermisoSesion("40")){ %>
                                <td><h:commandLink value="Reportes" action="reportes"/></td>
                                <% } %>
                                <!--<td><h:commandLink value="Complementos" action="plugins"/></td>-->
                                <td><a href="http://formalizacion.minagricultura.gov.co/guia-y-anexos/sistema-de-informaci%C3%B3n" target="_blank">Guía Metodológica</a></td>
                            </h:form>
                            <%
                                if (UsuarioManager.getTienePermisoSesion("70")) {
                                    out.print("<td><a href=\"administrar.jsp\"/>Administrar</a></td>");
                                }
                            %>
                        </tr>
                    </tbody></table>
            </nav>

            <div id="page-wrapper">
                <% if(UsuarioManager.getTienePermisoSesion("30")){ %>
                <div id="content">
                    <aside>
                        <ul>
                            <% if(UsuarioManager.getTienePermisoSesion("101")){ %>
                            <li class="active"><a href="#" onclick="iniciarModuloConsulta(this);">Solicitudes</a></li>
                            <li ><a href="#" onclick="iniciarModuloConsultaORIP(this);">Consulta ORIP</a></li>
                            <% }else{ %><li><h3>No tiene permiso para consultar Solicitudes</h3></li><% } %>
                        </ul>
                    </aside>
                    <div id="mainContent">

                        <div id="juridico" class="tabs">
                        </div>

                        <div id="concepto-juridico" class="tabs">
                        </div>

                        <div id="diligenciar-concepto" class="tabs">
                        </div>

                        <div id="seguimiento-solicitudes" class="tabs">
                        </div>
                    </div>
                </div>
                <% }else{ %>
                <div id="content">
                    <aside>  
                    </aside>
                    <div id="mainContent">
                        <h3>No tiene permiso para acceder a esta página</h3>
                    </div>
                </div>
                <% } %>
            </div>
        </f:view>
    </body>
</html>