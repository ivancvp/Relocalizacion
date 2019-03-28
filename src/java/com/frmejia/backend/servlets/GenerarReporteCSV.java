/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.frmejia.backend.servlets;

import com.frmejia.backend.manager.ConsultasManager;
import com.frmejia.backend.manager.UsuarioManager;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.sql.ResultSet;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import json.CDLFabian;
import json.JSONArray;
import json.JSONObject;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVPrinter;
import org.apache.commons.csv.CSVRecord;

/**
 *
 * @author juan
 */
public class GenerarReporteCSV extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        OutputStream out = response.getOutputStream();
        try {

            if (request.getSession().getAttribute("user") != null) {
                String op = request.getParameter("op");
                if (op != null) {
                    if (!op.isEmpty()) {
                        Map<String, Object> parametros = new HashMap<String, Object>(request.getParameterMap());

//                        Map parametros = request.getParameterMap();

                        parametros.put("USUARIO_ID", new String[]{UsuarioManager.getInfoSesion("usuario_id").toString()});
                        /*
                        String municipios = "'" + UsuarioManager.getInfoSesion("municipios").toString().replaceAll(", ", "','").replaceAll("\\[", "").replaceAll("\\]", "") + "'";
                        parametros.put("MUNICIPIOS_ID", new String[]{municipios});
                         */
                        String codigo_reporte = "";
                        if (request.getParameter("reportCode") != null) {
                            codigo_reporte = "_" + request.getParameter("reportCode");
                        }
                        response.setHeader("Content-disposition",
                                "attachment; filename=" + op + codigo_reporte + ".csv");
                        response.setContentType("text/comma-separated-values");
                        response.setCharacterEncoding("LATIN1");

                        ConsultasManager consultasManager = new ConsultasManager();
                        ResultSet result = consultasManager.EjecutarConsultaResultSet(op, parametros);

                        int columnCount = result.getMetaData().getColumnCount();

                        for (int i = 1; i <= columnCount; i++) {
                            out.write(result.getMetaData().getColumnLabel(i).getBytes("LATIN1"));
                            out.write(";".getBytes("LATIN1"));
                        }
                        out.write("\n".getBytes("LATIN1"));

                        while (result.next()) {
                            for (int i = 1; i <= columnCount; i++) {

                                if (result.getObject(i) != null) {
                                    out.write(result.getString(i).getBytes("LATIN1"));
                                }
                                out.write(";".getBytes("LATIN1"));
                            }
                            out.write("\n".getBytes("LATIN1"));

                        }
                        /*
                         OutputStreamWriter osw = new OutputStreamWriter(out, "UTF-8");
                         BufferedWriter sw = new BufferedWriter(osw);

                         CSVPrinter printer = new CSVPrinter(sw, CSVFormat.EXCEL.withHeader(result).withQuote('"').withDelimiter(';'));
                         printer.printRecords(result);
                         */

                        //out.write( ((OutputStreamWriter) printer.getOut()).getBuffer().toString().getBytes("UTF-8") );
                        /*CSVParser data = CSVParser.parse(new File("myresults.txt"), Charset.forName("UTF-8"), CSVFormat.EXCEL.withDelimiter("|".charAt(0)));
                         int i = 0;
                         for (CSVRecord line : data) {
                         i++;
                         out.write(line.get(0).getBytes("UTF-8"));
                         }*/
                        //out.write(((BufferedWriter) printer.getOut()).getBuffer().toString().getBytes());
                        //out.write(result.getBytes());
                        out.flush();
                    } else {

                        Map error = new LinkedHashMap();
                        error.put("error", "Operación no definida");

                        JSONObject jsonObject = new JSONObject(error);
                        out.write(jsonObject.toString().getBytes());
                    }

                } else {

                    Map error = new LinkedHashMap();
                    error.put("error", "Operación no definida");
                    JSONObject jsonObject = new JSONObject(error);
                    out.write(jsonObject.toString().getBytes());
                }

            } else {
                Map error = new LinkedHashMap();
                error.put("error", "Servicio denegado por falta de permisos");

                JSONObject jsonObject = new JSONObject(error);
                out.write(jsonObject.toString().getBytes());
            }

        } catch (Exception e) {

            System.out.println("por aqui: " + e.getMessage());

            Map error = new LinkedHashMap();
            error.put("error", "Operación no definida");
            error.put("descripcion", e.getMessage());

            JSONObject jsonObject = new JSONObject(error);
            out.write(jsonObject.toString().getBytes());

        } finally {
            out.close();
            Runtime.getRuntime().gc();
        }
        /*
         Connection conn;

         try {
         PostgresUtil postgresUtil = new PostgresUtil();
         Ent_Consulta ent_Consulta = new Ent_Consulta();
         XMLUtil xmlUtil = new XMLUtil();

         String reportName = request.getParameter("reportName");
         String[] parameters = request.getParameterValues("reportParameters");
         String reportPath = "/reportes/";//( String ) request.getAttribute( "reportPath" );

         Map parameterMap = new HashMap();
         if (parameters != null) {
         for (String param : parameters) {
         String[] s = param.split("@:");
         if (s.length == 2) {
         parameterMap.put(s[0], s[1]);
         }
         }
         }
         parameterMap.put("IMAGES_PATH", getServletContext().getRealPath("") + "\\images\\");
         parameterMap.put("SUBREPORT_DIR", getServletContext().getRealPath("") + "\\reportes\\");
         String municipios = "'" + UsuarioManager.getInfoSesion("municipios").toString().replaceAll(", ", "','").replaceAll("\\[", "").replaceAll("\\]", "") + "'";
         parameterMap.put("MUNICIPIOS_ID", municipios);
            
            
         if (!reportName.isEmpty() && !reportName.equals("")) {
         ent_Consulta = xmlUtil.obtenerConfiguracionConsulta("ConsultaParametrosConexionReporteGenerico");

         postgresUtil.connecting(ent_Consulta.getUrl(), ent_Consulta.getUser(), ent_Consulta.getPassword());
         conn = postgresUtil.getConnection();

         System.setProperty("jasper.reports.compile.class.path",
         getServletContext().getRealPath("/WEB-INF/lib/jasperreports-5.1.0.jar")
         + System.getProperty("path.separator")
         + getServletContext().getRealPath("/WEB-INF/classes/"));

         File reportFile = new File(getServletContext().getRealPath(reportPath
         + reportName + ".jasper"));
         JasperReport jasperReport = (JasperReport) JRLoader.loadObject(reportFile.getPath());

         JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameterMap, conn);

         //JRCsvExporter csv = 
         ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
         JRCsvExporter exporterCSV = new JRCsvExporter();
         exporterCSV.setParameter(JRCsvExporterParameter.FIELD_DELIMITER, ";");
         exporterCSV.setParameter(JRCsvExporterParameter.RECORD_DELIMITER, "\n");
         exporterCSV.setParameter(JRXlsExporterParameter.JASPER_PRINT, jasperPrint);
         exporterCSV.setParameter(JRXlsExporterParameter.OUTPUT_STREAM, byteArrayOutputStream);
         exporterCSV.setParameter(JRXlsExporterParameter.IS_ONE_PAGE_PER_SHEET, Boolean.FALSE);
         exporterCSV.setParameter(JRXlsExporterParameter.IS_REMOVE_EMPTY_SPACE_BETWEEN_COLUMNS, true);
         exporterCSV.setParameter(JRXlsExporterParameter.IS_REMOVE_EMPTY_SPACE_BETWEEN_ROWS, true);
         exporterCSV.setParameter(JRXlsExporterParameter.IS_WHITE_PAGE_BACKGROUND, true);
         exporterCSV.setParameter(JRXlsExporterParameter.CHARACTER_ENCODING, "UTF-8");

         exporterCSV.exportReport();
         //byte[] bytes = byteArrayOutputStream.toByteArray();
         //byte[] bytes = JasperExportManager.exportReportToPdf(jasperPrint);
         String codigo_reporte = "";

         if (request.getParameter("reportCode") != null) {
         codigo_reporte = "_" + request.getParameter("reportCode");
         }

         response.setHeader("Content-disposition",
         "attachment; filename=" + reportName + codigo_reporte + ".csv");
         response.setContentType("text/comma-separated-values");
         //response.setCharacterEncoding("UTF-8");
         //response.setContentLength(bytes.length);
         //response.setContentLength(byteArrayOutputStream.size());
         try (OutputStream out = response.getOutputStream()) {
         out.write(byteArrayOutputStream.toString("UTF-8").getBytes());
         out.flush();
         }
         }
         postgresUtil.cerrarConexion();

         } catch (Exception e) {
         e.printStackTrace();
         } finally {
         }
         */
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
