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

        <!-- Bootstrap -->
        <link href="../js/vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
        <!-- Font Awesome -->
        <link href="../js/vendors/font-awesome/css/font-awesome.min.css" rel="stylesheet">
        <!-- NProgress -->
        <link href="../js/vendors/nprogress/nprogress.css" rel="stylesheet">
        <!-- iCheck -->
        <link href="../js/vendors/iCheck/skins/flat/green.css" rel="stylesheet">
        <!-- bootstrap-progressbar -->
        <link href="../js/vendors/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css" rel="stylesheet">
        <!-- JQVMap -->
        <link href="../js/vendors/jqvmap/dist/jqvmap.min.css" rel="stylesheet"/>

        <!-- Custom Theme Style -->
        <link href="../js/Plugins/gentella/css/custom.css" rel="stylesheet">


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
                line-height: 20px;
            }

            .breadcrumb > li > a {
                cursor: pointer;
                color: #333;
                text-decoration: none;
            }

            .breadcrumb > li > a:hover {

                color: #bbd147;

            }
            header{
                width:100%;
                margin:auto;
                padding-top:12px;
                overflow:visible;
                height:90px;
                padding-left:20px;
                padding-top:10px;
                background-color: #FFF;

            }
            #logo_small{
                display: none;
            }
            @media only screen and (max-width: 768px ){ 
                #logo_full, header{
                    display: none;
                }

                #logo_small{
                    display: block;
                }
            }


        </style>
        <title>Revision relocalización</title>
    </head>
    <body class="nav-md">
        <header>
            <img id="logo_full" src="../images/logo_cvp.png" height="75" style="" />

        </header>
        <f:view>
            <div class="container body">
                <div class="main_container">

                    <div class="col-md-3 left_col">
                        <div class="left_col scroll-view">
                            <div class="navbar nav_title" style="border: 0;">
                                <a  class="site_title">
                                    <!--<i class="fa fa-university"></i>--> 
                                    <span>Reasentamientos</span>
                                </a>
                            </div>

                            <div class="clearfix"></div>

                            <!-- menu profile quick info -->
                            <div class="profile">
                                <div class="profile_pic">

                                </div>
                                <div class="profile_info">
                                    <!--<span>Caja de la vivienda popular</span>-->
                                    <h2></h2>
                                </div>
                            </div>
                            <!-- /menu profile quick info -->

                            <br />

                            <!-- sidebar menu -->
                            <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
                                <div class="menu_section">
                                    <!--<h3>Relocalización</h3>-->
                                    <ul class="nav side-menu">
                                        <li class="active"><a href="index.jsp"><i class="fa fa-home"></i> Inicio </a></li>
                                        <li><a href="resoluciones.jsp"><i class="fa fa-street-view"></i> Relocalización </a></li>
<!--                                        <li><a href="resoluciones.jsp"><i class="fa fa-money"></i> VUR </a></li>
                                        <li><a href="giros/index.jsp"><i class="fa fa-bank"></i> Giros </a></li>
                                        <li><a href="resoluciones.jsp"><i class="fa fa-group"></i> Caracterización social </a></li>
                                        <li><a href="resoluciones.jsp"><i class="fa fa-list-alt"></i> Técnico-predial </a></li>-->
                                        <li><a href="visor_geografico.jsp" target="_blank"><i class="fa fa-map-o"></i> Visor Geográfico </a></li>
                                        <!--<li><a href="resoluciones.jsp"><i class="fa fa-file-text-o"></i> Documentación </a></li>-->
                                        <li><a href="titulacion/titulacion.jsp"><i class="fa fa-file-text-o"></i> Titulación </a></li>
                                    </ul>
                                </div>


                            </div>
                            <!-- /sidebar menu -->


                        </div>
                    </div>

                    <!-- top navigation -->
                    <div class="top_nav">
                        <div class="nav_menu">
                            <nav>
                                <div class="nav toggle">
                                    <a id="menu_toggle"><i class="fa fa-bars"></i></a>
                                </div>
                                <ul class="nav navbar-nav navbar-right">
                                    <li class="pull-right">
                                        <img id="logo_small" src="../images/logo_cvp_small.png" height="65" style="padding:5px;" />
                                    </li>
                                    <li class="">
                                        <a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                            <%
                                                if (session.getAttribute("user") != null) {
                                                    out.print("<span>Usuario: <i>" + ((Map<String, Object>) session.getAttribute("info")).get("usuario_nombre") + "</i></span>");
                                                }
                                            %>
                                            <span class=" fa fa-angle-down"></span>
                                        </a>
                                        <ul class="dropdown-menu dropdown-usermenu pull-right">
                                            <!--<li><a href="javascript:;"> Profile</a></li>
                                            <li>
                                                <a href="javascript:;">
                                                    <span class="badge bg-red pull-right">50%</span>
                                                    <span>Settings</span>
                                                </a>
                                            </li>
                                            <li><a href="javascript:;">Help</a></li>
                                            <li> 
                                            </li>
                                            -->
                                            <li> <h:form><i class="fa fa-sign-out pull-right"></i>
                                                    <h:commandLink value="Cerrar Sesión"
                                                                   action="#{UsuarioManager.logout}"/>
                                                </h:form></li>
                                        </ul>
                                    </li>



                                </ul>
                            </nav>
                        </div>
                    </div>
                    <!-- /top navigation -->

                    <!-- page content -->
                    <div class="right_col" role="main">
                        <!-- top tiles -->
                        <div class="row tile_count" id="contenedor-indicadores">
                            <!--                            <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
                                                            <span class="count_top"><i class="fa fa-user"></i> Beneficiarios</span>
                                                            <div class="count">2500</div>
                                                            <span class="count_bottom"><i class="green">75% </i> Pagos</span>
                                                        </div>
                                                        <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
                                                            <span class="count_top"><i class="fa fa-clock-o"></i> aaaaa</span>
                                                            <div class="count">123.50</div>
                                                            <span class="count_bottom"><i class="green"><i class="fa fa-sort-asc"></i>3% </i> From last Week</span>
                                                        </div>
                                                        <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
                                                            <span class="count_top"><i class="fa fa-user"></i> Total sssssss</span>
                                                            <div class="count green">2,500</div>
                                                            <span class="count_bottom"><i class="green"><i class="fa fa-sort-asc"></i>34% </i> From last Week</span>
                                                        </div>
                                                        <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
                                                            <span class="count_top"><i class="fa fa-user"></i> Total bbbbbb</span>
                                                            <div class="count">4,567</div>
                                                            <span class="count_bottom"><i class="red"><i class="fa fa-sort-desc"></i>12% </i> From last Week</span>
                                                        </div>
                                                        <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
                                                            <span class="count_top"><i class="fa fa-user"></i> Total ccccc</span>
                                                            <div class="count">2,315</div>
                                                            <span class="count_bottom"><i class="green"><i class="fa fa-sort-asc"></i>34% </i> From last Week</span>
                                                        </div>
                                                        <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
                                                            <span class="count_top"><i class="fa fa-user"></i> Total ttttt</span>
                                                            <div class="count">7,325</div>
                                                            <span class="count_bottom"><i class="green"><i class="fa fa-sort-asc"></i>34% </i> From last Week</span>
                                                        </div>-->
                        </div>
                        <!-- /top tiles -->

                        <div class="row">
                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="dashboard_graph">

                                    <div class="row x_title">
                                        <div class="col-md-6">
                                            <h3> <small>Avance mensual Relocalización</small></h3>
                                        </div>
                                        <div class="col-md-6">
                                            <!--                                            <div id="reportrange" class="pull-right" style="background: #fff; cursor: pointer; padding: 5px 10px; border: 1px solid #ccc">
                                                                                            <i class="glyphicon glyphicon-calendar fa fa-calendar"></i>
                                                                                            <span>December 30, 2014 - January 28, 2015</span> <b class="caret"></b>
                                                                                        </div>-->
                                        </div>
                                    </div>

                                    <div class="col-md-12 col-sm-12 col-xs-12">
                                        <div id="placeholder33" style="height: 260px; display: none" class="demo-placeholder"></div>
                                        <div style="width: 100%;">
                                            <div id="canvas_dahs" class="demo-placeholder" style="width: 100%; height:270px;"></div>
                                        </div>
                                    </div>
<!--                                    <div class="col-md-3 col-sm-3 col-xs-12 bg-white">
                                        <div class="x_title">
                                            <h2>Ejecución presupuestal</h2>
                                            <div class="clearfix"></div>
                                        </div>

                                        <div class="col-md-12 col-sm-12 col-xs-6">
                                            <div>
                                                <p>Total comprometido <span style="font-size: 1.1em;"> $4.592.370.394 </span></p>
                                                <div class="">
                                                    <div class="progress progress_sm" style="width: 76%;">
                                                        <div class="progress-bar bg-green" role="progressbar" data-transitiongoal="100"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <p>Total apropiado <span style="font-size: 1.1em;"> $3.435.767.722 </span></p>
                                                <div class="">
                                                    <div class="progress progress_sm" style="width: 76%;">
                                                        <div class="progress-bar bg-green" role="progressbar" data-transitiongoal="75"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12 col-sm-12 col-xs-6">
                                            <div>
                                                <p>Total girado <span class="" style="font-size: 1.1em;"> $2.075.694.820 </span></p>
                                                <div class="">
                                                    <div class="progress progress_sm" style="width: 76%;">
                                                        <div class="progress-bar bg-green" role="progressbar" data-transitiongoal="45"></div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>-->

                                    <div class="clearfix"></div>
                                </div>
                            </div>

                        </div>
                        <br />

                        <div class="row">


                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="x_panel tile ">
                                    <div class="x_title">
                                        <h2>Selección de vivienda</h2>
                                        <!--                                        <ul class="nav navbar-right panel_toolbox">
                                                                                    <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                                                                                    </li>
                                                                                    <li class="dropdown">
                                                                                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-wrench"></i></a>
                                                                                        <ul class="dropdown-menu" role="menu">
                                                                                            <li><a href="#">Settings 1</a>
                                                                                            </li>
                                                                                            <li><a href="#">Settings 2</a>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </li>
                                                                                    <li><a class="close-link"><i class="fa fa-close"></i></a>
                                                                                    </li>
                                                                                </ul>-->
                                        <div class="clearfix"></div>
                                    </div>
                                    <div class="x_content row" id="lista-seleccion-vivienda">
                                        <!--                                        <h4>Familias por poryecto de vivienda</h4>
                                                                                <div class="col-md-6 col-sm-6 col-xs-12">
                                                                                    <div class="widget_summary">
                                                                                        <div class="w_left w_25">
                                                                                            <span>0.1.5.2</span>
                                                                                        </div>
                                                                                        <div class="w_center w_55">
                                                                                            <div class="progress">
                                                                                                <div class="progress-bar bg-green" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 66%;">
                                                                                                    <span class="sr-only">60% Complete</span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="w_right w_20">
                                                                                            <span>123k</span>
                                                                                        </div>
                                                                                        <div class="clearfix"></div>
                                                                                    </div>
                                        
                                                                                    <div class="widget_summary">
                                                                                        <div class="w_left w_25">
                                                                                            <span>0.1.5.3</span>
                                                                                        </div>
                                                                                        <div class="w_center w_55">
                                                                                            <div class="progress">
                                                                                                <div class="progress-bar bg-green" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 45%;">
                                                                                                    <span class="sr-only">60% Complete</span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="w_right w_20">
                                                                                            <span>53k</span>
                                                                                        </div>
                                                                                        <div class="clearfix"></div>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-md-6 col-sm-6 col-xs-12">
                                                                                    <div class="widget_summary">
                                                                                        <div class="w_left w_25">
                                                                                            <span>0.1.5.4</span>
                                                                                        </div>
                                                                                        <div class="w_center w_55">
                                                                                            <div class="progress">
                                                                                                <div class="progress-bar bg-green" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 25%;">
                                                                                                    <span class="sr-only">60% Complete</span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="w_right w_20">
                                                                                            <span>23k</span>
                                                                                        </div>
                                                                                        <div class="clearfix"></div>
                                                                                    </div>
                                                                                    <div class="widget_summary">
                                                                                        <div class="w_left w_25">
                                                                                            <span>0.1.5.5</span>
                                                                                        </div>
                                                                                        <div class="w_center w_55">
                                                                                            <div class="progress">
                                                                                                <div class="progress-bar bg-green" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 5%;">
                                                                                                    <span class="sr-only">60% Complete</span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="w_right w_20">
                                                                                            <span>3k</span>
                                                                                        </div>
                                                                                        <div class="clearfix"></div>
                                                                                    </div>
                                                                                </div>-->

                                    </div>
                                </div>
                            </div>
                            <!--        
                                       <div class="col-md-4 col-sm-4 col-xs-12">
                                           <div class="x_panel tile fixed_height_320 overflow_hidden">
                                               <div class="x_title">
                                                   <h2>Device Usage</h2>
                                                   <ul class="nav navbar-right panel_toolbox">
                                                       <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                                                       </li>
                                                       <li class="dropdown">
                                                           <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-wrench"></i></a>
                                                           <ul class="dropdown-menu" role="menu">
                                                               <li><a href="#">Settings 1</a>
                                                               </li>
                                                               <li><a href="#">Settings 2</a>
                                                               </li>
                                                           </ul>
                                                       </li>
                                                       <li><a class="close-link"><i class="fa fa-close"></i></a>
                                                       </li>
                                                   </ul>
                                                   <div class="clearfix"></div>
                                               </div>
                                               <div class="x_content">
                                                   <table class="" style="width:100%">
                                                       <tr>
                                                           <th style="width:37%;">
                                                               <p>Top 5</p>
                                                           </th>
                                                           <th>
                                                               <div class="col-lg-7 col-md-7 col-sm-7 col-xs-7">
                                                                   <p class="">Device</p>
                                                               </div>
                                                               <div class="col-lg-5 col-md-5 col-sm-5 col-xs-5">
                                                                   <p class="">Progress</p>
                                                               </div>
                                                           </th>
                                                       </tr>
                                                       <tr>
                                                           <td>
                                                               <canvas id="canvas1" height="140" width="140" style="margin: 15px 10px 10px 0"></canvas>
                                                           </td>
                                                           <td>
                                                               <table class="tile_info">
                                                                   <tr>
                                                                       <td>
                                                                           <p><i class="fa fa-square blue"></i>IOS </p>
                                                                       </td>
                                                                       <td>30%</td>
                                                                   </tr>
                                                                   <tr>
                                                                       <td>
                                                                           <p><i class="fa fa-square green"></i>Android </p>
                                                                       </td>
                                                                       <td>10%</td>
                                                                   </tr>
                                                                   <tr>
                                                                       <td>
                                                                           <p><i class="fa fa-square purple"></i>Blackberry </p>
                                                                       </td>
                                                                       <td>20%</td>
                                                                   </tr>
                                                                   <tr>
                                                                       <td>
                                                                           <p><i class="fa fa-square aero"></i>Symbian </p>
                                                                       </td>
                                                                       <td>15%</td>
                                                                   </tr>
                                                                   <tr>
                                                                       <td>
                                                                           <p><i class="fa fa-square red"></i>Others </p>
                                                                       </td>
                                                                       <td>30%</td>
                                                                   </tr>
                                                               </table>
                                                           </td>
                                                       </tr>
                                                   </table>
                                               </div>
                                           </div>
                                       </div>
                            -->

                            <!--                            <div class="col-md-4 col-sm-4 col-xs-12">
                                                            <div class="x_panel tile fixed_height_320">
                                                                <div class="x_title">
                                                                    <h2>Quick Settings</h2>
                                                                    <ul class="nav navbar-right panel_toolbox">
                                                                        <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                                                                        </li>
                                                                        <li class="dropdown">
                                                                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-wrench"></i></a>
                                                                            <ul class="dropdown-menu" role="menu">
                                                                                <li><a href="#">Settings 1</a>
                                                                                </li>
                                                                                <li><a href="#">Settings 2</a>
                                                                                </li>
                                                                            </ul>
                                                                        </li>
                                                                        <li><a class="close-link"><i class="fa fa-close"></i></a>
                                                                        </li>
                                                                    </ul>
                                                                    <div class="clearfix"></div>
                                                                </div>
                                                                <div class="x_content">
                                                                    <div class="dashboard-widget-content">
                                                                        <ul class="quick-list">
                                                                            <li><i class="fa fa-calendar-o"></i><a href="#">Settings</a>
                                                                            </li>
                                                                            <li><i class="fa fa-bars"></i><a href="#">Subscription</a>
                                                                            </li>
                                                                            <li><i class="fa fa-bar-chart"></i><a href="#">Auto Renewal</a> </li>
                                                                            <li><i class="fa fa-line-chart"></i><a href="#">Achievements</a>
                                                                            </li>
                                                                            <li><i class="fa fa-bar-chart"></i><a href="#">Auto Renewal</a> </li>
                                                                            <li><i class="fa fa-line-chart"></i><a href="#">Achievements</a>
                                                                            </li>
                                                                            <li><i class="fa fa-area-chart"></i><a href="#">Logout</a>
                                                                            </li>
                                                                        </ul>
                            
                                                                        <div class="sidebar-widget">
                                                                            <h4>Profile Completion</h4>
                                                                            <canvas width="150" height="80" id="foo" class="" style="width: 160px; height: 100px;"></canvas>
                                                                            <div class="goal-wrapper">
                                                                                <span class="gauge-value pull-left">$</span>
                                                                                <span id="gauge-text" class="gauge-value pull-left">3,200</span>
                                                                                <span id="goal-text" class="goal-value pull-right">$5,000</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>-->

                        </div>


                        <div class="row">


                            <div class="col-md-12 col-sm-12 col-xs-12">



                                <div class="row">

                                    <div class="col-md-12 col-sm-12 col-xs-12">
                                        <div class="x_panel">
                                            <div class="x_title">
                                                <h2>Georreferenciación de las familias <small></small></h2>
                                                <ul class="nav navbar-right panel_toolbox">
                                                    <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                                                    </li>

                                                </ul>
                                                <div class="clearfix"></div>
                                            </div>
                                            <div class="x_content">
                                                <div class="dashboard-widget-content">

                                                    <div id="world-map-gdp" class="col-md-12 col-sm-12 col-xs-12" style="height:430px;">
                                                        <!--<iframe width="100%" height="100%" src="https://juanespo.maps.arcgis.com/apps/Cascade/index.html?appid=2e2b2e7f5fac40bab49432c072192b2d"/>-->
                                                        <iframe width="100%" height="100%" src="http://mapas.bogota.gov.co/"></iframe>
                                                        <!--<iframe width="100%" height="100%" src="https://cvpreas.maps.arcgis.com/apps/MapJournal/index.html?appid=f75614ad6057448980bc44308e6e3538"></iframe>-->
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                    <!-- /page content -->

                    <!-- footer content -->
                    <footer>
                        <div class="pull-right">
                            <!--Gentelella - Bootstrap Admin Template by <a href="https://colorlib.com">Colorlib</a>-->
                        </div>
                        <div class="clearfix"></div>
                    </footer>
                    <!-- /footer content -->
                </div>
            </div>

            <!-- jQuery -->
            <script src="../js/vendors/jquery/dist/jquery.min.js"></script>
            <!-- Bootstrap -->
            <script src="../js/vendors/bootstrap/dist/js/bootstrap.min.js"></script>
            <!-- FastClick -->
            <script src="../js/vendors/fastclick/lib/fastclick.js"></script>
            <!-- NProgress -->
            <script src="../js/vendors/nprogress/nprogress.js"></script>
            <!-- Chart.js -->
            <script src="../js/vendors/Chart.js/dist/Chart.min.js"></script>
            <!-- gauge.js -->
            <script src="../js/vendors/gauge.js/dist/gauge.min.js"></script>
            <!-- bootstrap-progressbar -->
            <script src="../js/vendors/bootstrap-progressbar/bootstrap-progressbar.min.js"></script>
            <!-- iCheck -->
            <script src="../js/vendors/iCheck/icheck.min.js"></script>
            <!-- Skycons -->
            <script src="../js/vendors/skycons/skycons.js"></script>
            <!-- Flot -->
            <script src="../js/vendors/Flot/jquery.flot.js"></script>
            <script src="../js/vendors/Flot/jquery.flot.pie.js"></script>
            <script src="../js/vendors/Flot/jquery.flot.time.js"></script>
            <script src="../js/vendors/Flot/jquery.flot.stack.js"></script>
            <script src="../js/vendors/Flot/jquery.flot.resize.js"></script>
            <!-- Flot plugins -->
            <script src="../js/vendors/flot.orderbars/js/jquery.flot.orderBars.js"></script>
            <script src="../js/vendors/flot-spline/js/jquery.flot.spline.min.js"></script>
            <script src="../js/vendors/flot.curvedlines/curvedLines.js"></script>
            <!-- DateJS -->
            <script src="../js/vendors/DateJS/build/date.js"></script>
            <!-- JQVMap -->
            <script src="../js/vendors/jqvmap/dist/jquery.vmap.js"></script>
            <script src="../js/vendors/jqvmap/dist/maps/jquery.vmap.world.js"></script>
            <script src="../js/vendors/jqvmap/examples/js/jquery.vmap.sampledata.js"></script>
            <!-- bootstrap-daterangepicker -->
            <script src="../js/Plugins/moment/moment.min.js"></script>
            <script src="../js/Plugins/datepicker/daterangepicker.js"></script>

            <!-- Custom Theme Scripts -->
            <script src="../js/Plugins/gentella/js/custom.min.js"></script>

            <script src="../js/gov.cvp.reas/indicadores/totales.js"></script>
            <script src="../js/gov.cvp.reas/indicadores/GraficoAvance.js"></script>
            <script src="../js/gov.cvp.reas/indicadores/GraficoSeleccionVivienda.js"></script>

            <!-- Flot -->
            <script>
            $(document).ready(function () {
                $("#canvas_dahs").indicadoresGraficoAvance("ConsultaIndicadorGraficoAvanceMensual", "mes",
                        [
                            {label: "Contratos", value: "contratos"},
                            {label: "Resoluciones", value: "resoluciones"},
                            {label: "Memorandos", value: "memorandos"}
                        ]);


                $('<div class="col-md-3 col-sm-4 col-xs-6 tile_stats_count"></div>').appendTo('#contenedor-indicadores').indicadoresPanelTotales("Familias en reasentamientos", "fa fa-group", null, "ConsultaIndicadorTotalFamiliasReas", null, "Familias activas en reasentamientos");
                $('<div class="col-md-3 col-sm-4 col-xs-6 tile_stats_count"></div>').appendTo('#contenedor-indicadores').indicadoresPanelTotales("Familias en relocalización", "fa fa-group", "#F39C12", "ConsultaIndicadorTotalFamiliasReloca", " de familias reas", "Familias con contrato vigente");
                $('<div class="col-md-3 col-sm-4 col-xs-6 tile_stats_count"></div>').appendTo('#contenedor-indicadores').indicadoresPanelTotales("Resoluciones Asignación vigentes", "fa fa-file-text-o", "#29d", "ConsultaIndicadorTotalResoluciones", "Asignados", "Familias con resolución de asignación que cubre el mes actual");
                $('<div class="col-md-3 col-sm-4 col-xs-6 tile_stats_count"></div>').appendTo('#contenedor-indicadores').indicadoresPanelTotales("Familias con pago de ayuda temporal", "fa fa-file-text", "#2f8325", "ConsultaIndicadorTotalMemorandos", "de las asignaciones", "Familias en relocalización con pago ordenado para el mes actual");


                $("#lista-seleccion-vivienda").indicadoresGraficoSeleccionVivienda("Familias por proyecto de vivienda", "ConsultaIndicadorSeleccionVivienda");
            });

            </script>
            <!-- /Flot -->


        </f:view>
    </body>


</html>