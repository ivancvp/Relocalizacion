package com.frmejia.backend.util;

import com.frmejia.backend.entity.Ent_Conexion;
import com.frmejia.backend.entity.Ent_Consulta;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.swing.table.DefaultTableModel;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

/**
 * Clase que interactua con los archivos XML
 *
 * @author LACardona
 */
public class XMLUtil {

//    private static final String s = "\\";
    private static final String s = File.separator;

    public Ent_Consulta obtenerConfiguracionConsultaDML(String idConsulta) {

        Ent_Consulta ent_Consulta = new Ent_Consulta();
        InputStream in = null;

        try {

            in = getClass().getClassLoader().getResourceAsStream(s + "com" + s + "frmejia" + s + "backend" + s + "util" + s + "ConsultasDML.xml");
            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
            Document doc = dBuilder.parse(in);
            doc.getDocumentElement().normalize();

            NodeList listaConsultas = doc.getElementsByTagName("Consulta");

            for (int i = 0; i < listaConsultas.getLength(); i++) {
                Node parametrosConsulta = listaConsultas.item(i);

                if (parametrosConsulta.getAttributes().getNamedItem("id").getNodeValue().toString().equals(idConsulta)) {
                    if (parametrosConsulta.getNodeType() == Node.ELEMENT_NODE) {

                        Element elemento = (Element) parametrosConsulta;
                        ent_Consulta.setConexion(getTagValue("conexion", elemento));
                        Ent_Conexion ec = this.obtenerConfiguracionConexion(ent_Consulta.getConexion());
                        ent_Consulta.setSql(getTagValue("sql", elemento));
                        ent_Consulta.setUrl(ec.getUrl());
                        ent_Consulta.setUser(ec.getUser());
                        ent_Consulta.setPassword(ec.getPassword());
                        ent_Consulta.setPermisos(getTagValue("permisos", elemento));
                        try {
                            ent_Consulta.set_dml_complejo(getTagValue("es_dml_complejo", elemento).equals("true") || getTagValue("es_dml_complejo", elemento).equals("TRUE"));
                        } catch (Exception e) {
                            ent_Consulta.set_dml_complejo(false);
                        }
                        break;

                    }
                }
            }

        } catch (SAXException ex) {
            System.out.println("Error 006 -- Erro al intentar parsear el docunmento" + ex);
        } catch (IOException ex) {
            System.out.println("Error 007 -- No es posible leer el archivo XML" + ex);
        } catch (ParserConfigurationException ex) {
            System.out.println("Error 008 -- EL archivo XML esta mal configurado" + ex);
        } finally {
            try {
                in.close();
            } catch (IOException ex) {
                System.out.println("Error 009 -- Ocurrio un error al intentar cerrar el archivo de de los parametros de conexión" + ex);
            }
        }

        return ent_Consulta;
    }

    public Ent_Consulta obtenerConfiguracionConsulta(String idConsulta) {
        Ent_Consulta ent_Consulta = new Ent_Consulta();
        InputStream in = null;

        try {

            in = getClass().getClassLoader().getResourceAsStream(s + "com" + s + "frmejia" + s + "backend" + s + "util" + s + "Consultas.xml");
            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
            Document doc = dBuilder.parse(in);
            doc.getDocumentElement().normalize();

            NodeList listaConsultas = doc.getElementsByTagName("Consulta");

            for (int i = 0; i < listaConsultas.getLength(); i++) {
                Node parametrosConsulta = listaConsultas.item(i);

                if (parametrosConsulta.getAttributes().getNamedItem("id").getNodeValue().toString().equals(idConsulta)) {
                    if (parametrosConsulta.getNodeType() == Node.ELEMENT_NODE) {

                        Element elemento = (Element) parametrosConsulta;
                        ent_Consulta.setConexion(getTagValue("conexion", elemento));
                        Ent_Conexion ec = this.obtenerConfiguracionConexion(ent_Consulta.getConexion());
                        ent_Consulta.setSql(getTagValue("sql", elemento));
                        ent_Consulta.setUrl(ec.getUrl());
                        ent_Consulta.setUser(ec.getUser());
                        ent_Consulta.setPassword(ec.getPassword());
                        ent_Consulta.setPermisos(getTagValue("permisos", elemento));
                        break;

                    }
                }
            }

        } catch (SAXException ex) {
            System.out.println("Error 006 -- Erro al intentar parsear el docunmento" + ex);
        } catch (IOException ex) {
            System.out.println("Error 007 -- No es posible leer el archivo XML" + ex);
        } catch (ParserConfigurationException ex) {
            System.out.println("Error 008 -- EL archivo XML esta mal configurado" + ex);
        } finally {
            try {
                in.close();
            } catch (IOException ex) {
                System.out.println("Error 009 -- Ocurrio un error al intentar cerrar el archivo de de los parametros de conexión" + ex);
            }
        }
        return ent_Consulta;
    }

    public Ent_Conexion obtenerConfiguracionConexion(String nombre_conexion) {

        Ent_Conexion ent_conexion = new Ent_Conexion();
        InputStream in = null;

        try {

            in = getClass().getClassLoader().getResourceAsStream(s + "com" + s + "frmejia" + s + "backend" + s + "util" + s + "Conexiones.xml");
            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
            Document doc = dBuilder.parse(in);
            doc.getDocumentElement().normalize();

            NodeList listaConexiones = doc.getElementsByTagName("Conexion");

            for (int i = 0; i < listaConexiones.getLength(); i++) {
                Node conexion = listaConexiones.item(i);

                if (conexion.getAttributes().getNamedItem("id").getNodeValue().toString().equals(nombre_conexion)) {
                    if (conexion.getNodeType() == Node.ELEMENT_NODE) {

                        Element elemento = (Element) conexion;

                        ent_conexion.setUrl(getTagValue("url", elemento));
                        ent_conexion.setUser(getTagValue("user", elemento));
                        ent_conexion.setPassword(getTagValue("password", elemento));

                        break;

                    }
                }
            }

        } catch (SAXException ex) {
            System.out.println("Error 006 -- Erro al intentar parsear el docunmento" + ex);
        } catch (IOException ex) {
            System.out.println("Error 007 -- No es posible leer el archivo XML" + ex);
        } catch (ParserConfigurationException ex) {
            System.out.println("Error 008 -- EL archivo XML esta mal configurado" + ex);
        } finally {
            try {
                in.close();
            } catch (IOException ex) {
                System.out.println("Error 009 -- Ocurrio un error al intentar cerrar el archivo de de los parametros de conexión" + ex);
            }
        }

        return ent_conexion;
    }

    public List obtenerParametrosConexion(String pathXMLConnecting) {

        InputStream in = null;

        //Parametros de conexion
        String url = "";
        String user = "";
        String password = "";

        //Lista donde adicionamos la url, user y password de conexion a la base de datos
        List parametrosConexionBD = null;

        try {

            in = getClass().getClassLoader().getResourceAsStream(pathXMLConnecting);
            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
            Document doc = dBuilder.parse(in);
            doc.getDocumentElement().normalize();

            NodeList listaParametrosConexiones = doc.getElementsByTagName("ParametrosConexion");

            //Recorro la lista de nodos
            for (int i = 0; i < listaParametrosConexiones.getLength(); i++) {

                Node parametrosConexion = listaParametrosConexiones.item(i);
                if (parametrosConexion.getNodeType() == Node.ELEMENT_NODE) {

                    Element elemento = (Element) parametrosConexion;

                    //Parametros de conexion a la base de datos
                    user = getTagValue("user", elemento).toString();
                    password = getTagValue("password", elemento);
                    url = getTagValue("url", elemento);

                    parametrosConexionBD = new ArrayList();
                    parametrosConexionBD.add(url);
                    parametrosConexionBD.add(user);
                    parametrosConexionBD.add(password);
                }
            }
        } catch (SAXException ex) {
            System.out.println("Error 006 -- Erro al intentar parsear el docunmento" + ex);
        } catch (IOException ex) {
            System.out.println("Error 007 -- No es posible leer el archivo XML" + ex);
        } catch (ParserConfigurationException ex) {
            System.out.println("Error 008 -- EL archivo XML esta mal configurado" + ex);
        } finally {
            try {
                in.close();
            } catch (IOException ex) {
                System.out.println("Error 009 -- Ocurrio un error al intentar cerrar el archivo de de los parametros de conexión" + ex);
            }
        }

        return parametrosConexionBD;
    }

    public List obtenerParametrosConexion() {

        InputStream in = null;

        //Parametros de conexion
        String url = "";
        String user = "";
        String password = "";

        //Lista donde adicionamos la url, user y password de conexion a la base de datos
        List parametrosConexionBD = null;

        try {

            in = getClass().getClassLoader().getResourceAsStream(s + "com" + s + "frmejia" + s + "backend" + s + "util" + s + "ParametrosConexion.xml");
            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
            Document doc = dBuilder.parse(in);
            doc.getDocumentElement().normalize();

            NodeList listaParametrosConexiones = doc.getElementsByTagName("ParametrosConexion");

            //Recorro la lista de nodos
            for (int i = 0; i < listaParametrosConexiones.getLength(); i++) {

                Node parametrosConexion = listaParametrosConexiones.item(i);
                if (parametrosConexion.getNodeType() == Node.ELEMENT_NODE) {

                    Element elemento = (Element) parametrosConexion;

                    //Parametros de conexion a la base de datos
                    user = getTagValue("user", elemento).toString();
                    password = getTagValue("password", elemento);
                    url = getTagValue("url", elemento);

                    parametrosConexionBD = new ArrayList();
                    parametrosConexionBD.add(url);
                    parametrosConexionBD.add(user);
                    parametrosConexionBD.add(password);
                }
            }
        } catch (SAXException ex) {
            System.out.println("Error 006 -- Erro al intentar parsear el docunmento" + ex.getMessage());
        } catch (IOException ex) {
            System.out.println("Error 007 -- No es posible leer el archivo XML" + ex.getMessage());
        } catch (ParserConfigurationException ex) {
            System.out.println("Error 008 -- EL archivo XML esta mal configurado" + ex.getMessage());
        } finally {
            try {
                in.close();
            } catch (IOException ex) {
                System.out.println("Error 009 -- Ocurrio un error al intentar cerrar el archivo de de los parametros de conexión" + ex.getMessage());
            }
        }

        return parametrosConexionBD;
    }

    private static String getTagValue(String sTag, Element eElement) {
        NodeList nlList = eElement.getElementsByTagName(sTag).item(0).getChildNodes();
        Node nValue = (Node) nlList.item(0);
        return nValue.getNodeValue();
    }

    public String obtenerConsulta(String consulta) {

        InputStream in = null;
        String sql = "";

        try {

            in = getClass().getClassLoader().getResourceAsStream(s + "com" + s + "frmejia" + s + "backend" + s + "util" + s + "ConsultasAplicacion.xml");
            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
            Document doc = dBuilder.parse(in);
            doc.getDocumentElement().normalize();

            NodeList niveles = doc.getElementsByTagName("Consultas");

            //Recorro la lista de nodos
            for (int i = 0; i < niveles.getLength(); i++) {

                Node parametrosConexion = niveles.item(i);
                if (parametrosConexion.getNodeType() == Node.ELEMENT_NODE) {

                    Element elemento = (Element) parametrosConexion;
                    sql = getTagValue(consulta, elemento).toString();

                }
            }

        } catch (SAXException ex) {
            System.out.println(ex.getMessage());
        } catch (IOException ex) {
            System.out.println("No es posible leer el archivo XML" + ex.getMessage());
        } catch (ParserConfigurationException ex) {
            System.out.println("EL archivo XML esta mal configurado" + ex.getMessage());
        }

        return sql;

    }

    public static void respuestaXML(ResultSet conjuntoResultados, PrintWriter out) {

        int columnCount = 0;

        if (conjuntoResultados != null) {

            try {

                columnCount = conjuntoResultados.getMetaData().getColumnCount();

                if (columnCount > 0) {
                    out.println("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
                    out.println("<Resultados>");
                    while (conjuntoResultados.next()) {
                        out.println("   <Resultado>");
                        for (int i = 0; i < columnCount; i++) {
                            out.print("       <" + conjuntoResultados.getMetaData().getColumnLabel(i + 1) + ">");
                            out.print("" + conjuntoResultados.getObject(i + 1));
                            out.println("</" + conjuntoResultados.getMetaData().getColumnLabel(i + 1) + ">");
                        }
                        out.println("   </Resultado>");
                    }
                    out.println("</Resultados>");
                } else {
                    System.out.println("El numero de columnas del resultset es 0");
                }
            } catch (SQLException ex) {
                System.out.println("Error 015 -- Ocurrio un error al intentar escribir el xml");
            }
        }
    }

    public static void respuestaXML(int registro, PrintWriter out) {

        out.println("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
        out.println("<Resultados>");
        out.println("<Resultado>");
        out.println(registro);
        out.println("</Resultado>");
        out.println("</Resultados>");

    }

    public static void escribeRespuestaXML(PrintWriter out, DefaultTableModel tabla) {

        out.println("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
        out.println("<Resultados>");

        for (int i = 0; i < tabla.getRowCount(); i++) {
            out.println("   <Resultado>");

            for (int j = 0; j < tabla.getColumnCount(); j++) {

                out.print("       <" + tabla.getColumnName(j) + ">");
                out.print("" + tabla.getValueAt(i, j));
                out.println("</" + tabla.getColumnName(j) + ">");

            }
            out.println("   </Resultado>");
        }

        out.println("</Resultados>");
    }
}
