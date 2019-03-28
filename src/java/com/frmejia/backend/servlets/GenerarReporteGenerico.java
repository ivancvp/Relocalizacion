/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.frmejia.backend.servlets;

import com.frmejia.backend.entity.Ent_Consulta;
import com.frmejia.backend.util.PostgresUtil;
import com.frmejia.backend.util.XMLUtil;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.sql.Connection;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.util.JRLoader;

/**
 *
 * @author fabian.mejia
 */
public class GenerarReporteGenerico extends HttpServlet {

    /**
     * Proceses requests for both HTTP
     * <code>GET</code> and
     * <code>POST</code> methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        Connection conn;

        try {
            PostgresUtil postgresUtil = new PostgresUtil();
            Ent_Consulta ent_Consulta = new Ent_Consulta();
            XMLUtil xmlUtil = new XMLUtil();

            String reportName = request.getParameter("reportName");
            String[] parameters = request.getParameterValues("reportParameters");
            String reportPath = "/reportes/";//( String ) request.getAttribute( "reportPath" );

            Map parameterMap = new LinkedHashMap<Object, Object>();
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

                byte[] bytes = JasperExportManager.exportReportToPdf(jasperPrint);

                String codigo_reporte = "";
                
                if(request.getParameter("reportCode") != null){
                    codigo_reporte = "_" + request.getParameter("reportCode");
                }
                
                response.setHeader("Content-disposition",
                        "attachment; filename=" + reportName + codigo_reporte +  ".pdf");
                response.setContentType("application/pdf");
                response.setContentLength(bytes.length);
                OutputStream out = response.getOutputStream();
                out.write(bytes);
                out.flush();
                out.close();
            }


            postgresUtil.cerrarConexion();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP
     * <code>GET</code> method.
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
     * Handles the HTTP
     * <code>POST</code> method.
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
