/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.frmejia.backend.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import json.JSONObject;

/**
 *
 * @author felipe
 */
public class Correos extends HttpServlet {

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
            if (request.getSession().getAttribute("user") != null) {
                enviar(request.getParameter("asunto"), request.getParameter("mensaje"), request.getParameter("correos"));
//                enviar(request.getParameter("asunto"), request.getParameter("mensaje"), "felipecanol@gmail.com,juanpa1891@gmail.com,jhonfr29@gmail.com");
            } else {
                Map error = new LinkedHashMap();
                error.put("error", "Servicio denegado por falta de permisos");
                JSONObject jsonObject = new JSONObject(error);
                out.println(jsonObject.toString());
            }
        } catch (Exception e) {

            Map error = new LinkedHashMap();
            error.put("error", "Operación no definida");

            JSONObject jsonObject = new JSONObject(error);
            out.println(jsonObject.toString());

        } finally {
            out.close();
        }
    }

    public static void enviar(String asunto, String mensaje, String correo) {
        /*final String username = "astrading.client@gmail.com";
        final String password = "c113nt34s7";

        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");
        */
        
        final String username = "sig.formalizacion@minagricultura.gov.co";
        final String password = "@grar1o%";

        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        //props.put("mail.smtp.starttls.enable", "false");
        props.put("mail.smtp.host", "correo.minagricultura.gov.co");
        props.put("mail.smtp.port", "25");
   
        Session session = Session.getInstance(props,
                new javax.mail.Authenticator() {
                    @Override
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                });

        try {
            System.out.print("Enviando mensaje...");
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("sig.formalizacion@minagricultura.gov.co","SIG Formalización"));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(correo));
            message.setSubject(asunto);
            message.setContent(mensaje, "text/html");

            Transport.send(message);
            System.out.print("Mensaje enviado!");
            System.out.println("Done");
        } catch (MessagingException e) {
            System.out.print("Mensaje no enviado, " + e.getMessage());
//            throw new RuntimeException(e);
        } catch (UnsupportedEncodingException ex) {
            Logger.getLogger(Correos.class.getName()).log(Level.SEVERE, null, ex);
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
