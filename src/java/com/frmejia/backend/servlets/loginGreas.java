/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.frmejia.backend.servlets;

import com.frmejia.backend.entity.Ent_Consulta;
import com.frmejia.backend.manager.UsuarioManager;
import static com.frmejia.backend.manager.UsuarioManager.TYPE_USER_SESSION_KEY;
import static com.frmejia.backend.manager.UsuarioManager.USER_INFO;
import static com.frmejia.backend.manager.UsuarioManager.USER_SESSION_KEY;
import com.frmejia.backend.util.PostgresUtil;
import com.frmejia.backend.util.XMLUtil;
import java.io.IOException;
import java.io.PrintWriter;
import static java.lang.System.out;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;
import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;
import javax.json.Json;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.swing.table.DefaultTableModel;
import json.JSONException;
import json.JSONObject;

/**
 *
 * @author frmejia
 */
@WebServlet(name = "loginGreas", urlPatterns = {"/loginGreas"})
public class loginGreas extends HttpServlet {

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
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        try {
            //UsuarioManager usuario = new UsuarioManager();
            String tk = request.getParameter("token");
            String email = request.getParameter("email");           
            String respuesta = glogin(request, tk, email);
            String res = "{resultado:" + respuesta + "}";
            JSONObject jsonObject = new JSONObject(res);
            out.println(jsonObject.toString());
        } catch (Exception e) {
            out.println(e.getLocalizedMessage());
        }
    }

    public String glogin(HttpServletRequest request, String tk, String email) throws JSONException {
        try {
            if (tk != null) {
                Map<String, String[]> params = new HashMap<String, String[]>(request.getParameterMap());

                XMLUtil xmlUtil = new XMLUtil();
                PostgresUtil postgresUtil = new PostgresUtil();
                Ent_Consulta ent_Consulta = new Ent_Consulta();
                ent_Consulta = xmlUtil.obtenerConfiguracionConsulta("ConsultaUsuarioByCorreo");
                String query = "";
                query = ent_Consulta.getSql();
                query = query.replaceAll("@CORREO", email);

                postgresUtil.connecting(ent_Consulta.getUrl(), ent_Consulta.getUser(), ent_Consulta.getPassword());
                DefaultTableModel tablaUsuario = postgresUtil.obtenerTabla(postgresUtil.executeQuerySQL(query));
                postgresUtil.cerrarConexion();

                if (tablaUsuario != null && tablaUsuario.getRowCount() > 0) {
                    if (tablaUsuario.getValueAt(0, tablaUsuario.findColumn("usuario_activo")).toString().equals("false")) {
                        FacesMessage message = new FacesMessage(FacesMessage.SEVERITY_ERROR,
                                "Autenticación fallida!",
                                "El usuario no está activo en el sistema.");
                        
                        return "false, msg:Autenticación fallida!";
                    }
                    Map<String, Object> info = new HashMap<String, Object>();
                    String f = "";
                    try {
                        f = tablaUsuario.getValueAt(0, tablaUsuario.findColumn("funcionalidades")).toString();
                    } catch (Exception e) {
                        System.err.println(e.getMessage());
                    }
//            String[] listFunc = new String[1];
                    ArrayList listFunc = new ArrayList();
                    if (f.contains(",")) {
                        String[] lista = new String[1];
                        lista = f.split(",");
                        for (int i = 0; i < lista.length; i++) {
                            listFunc.add(lista[i]);
                        }
                    } else if (!"".equals(f)) {
                        listFunc.add(f);
                    }
                    UUID uniqueID = UUID.randomUUID();

                    info.put("funcionalidades", listFunc);
                    info.put("usuario_nombre", tablaUsuario.getValueAt(0, tablaUsuario.findColumn("usuario_nombre")));
                    info.put("usuario_usuario", tablaUsuario.getValueAt(0, tablaUsuario.findColumn("usuario_usuario")));
                    info.put("usuario_id", tablaUsuario.getValueAt(0, tablaUsuario.findColumn("usuario_id")));
                    info.put("usuario_user", tablaUsuario.getValueAt(0, tablaUsuario.findColumn("usuario_user")));
                    info.put("usuario_time", tablaUsuario.getValueAt(0, tablaUsuario.findColumn("usuario_time")));
                    info.put("usuario_user_upd", tablaUsuario.getValueAt(0, tablaUsuario.findColumn("usuario_user_upd")));
                    info.put("usuario_time_upd", tablaUsuario.getValueAt(0, tablaUsuario.findColumn("usuario_time_upd")));
                    info.put("usuario_correo", tablaUsuario.getValueAt(0, tablaUsuario.findColumn("usuario_correo")));
                    info.put("usuario_cargo", tablaUsuario.getValueAt(0, tablaUsuario.findColumn("usuario_cargo")));
                    info.put("usuario_activo", tablaUsuario.getValueAt(0, tablaUsuario.findColumn("usuario_activo")));
                    info.put("usuario_fecha_vigencia", tablaUsuario.getValueAt(0, tablaUsuario.findColumn("usuario_fecha_vigencia")));
                    info.put("unique_id", uniqueID.toString());

                    request.getSession().setAttribute(USER_SESSION_KEY, tablaUsuario.getValueAt(0, tablaUsuario.findColumn("usuario_usuario")).toString());
                    request.getSession().setAttribute(TYPE_USER_SESSION_KEY, tablaUsuario.getValueAt(0, tablaUsuario.findColumn("tius_id")));
                    request.getSession().setAttribute(USER_INFO, info);
                    
                    return "true, msg:app-main";
                } else {
                    return "false, msg:esta-null";
                }
            } else {
                return "false, msg:token mal";
            }

        } catch (Exception e) {
            return "false";
        }

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
