package javacryption.servlet;

import java.io.*;
import java.io.PrintWriter;
import java.security.KeyPair;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javacryption.aes.AesCtr;
import javacryption.jcryption.JCryption;

/**
 *
 * @author leo
 * @version 1.0
 */
public class CryptoServlet extends HttpServlet {

    /**
     * serialVersionUID
     */
    private static final long serialVersionUID = 4510110365995157499L;

    /**
     * Handles a POST request
     *
     * @see HttpServlet
     */
    public void doPost(HttpServletRequest req, HttpServletResponse res)
            throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        /**
         * Generates a KeyPair for RSA *
         */
        if (req.getParameter("generateKeyPair") != null && req.getParameter("generateKeyPair").equals("true")) {
            JCryption jc = new JCryption();
            KeyPair keys = jc.getKeyPair();
            request.getSession().getServletContext().setAttribute("jCryptionKeys", keys);
            String e = jc.getPublicExponent();
            String n = jc.getKeyModulus();
            String md = String.valueOf(jc.getMaxDigits());
            /**
             * Sends response *
             */
            PrintWriter out = response.getWriter();
            out.print("{\"e\":\"" + e + "\",\"n\":\"" + n
                    + "\",\"maxdigits\":\"" + md + "\"}");
            return;
        } /**
         * jCryption handshake *
         */
        else if (req.getParameter("handshake") != null && req.getParameter("handshake").equals("true")) {
            /**
             * Decrypts password using private key *
             */
            JCryption jc = new JCryption((KeyPair) request.getSession()
                    .getServletContext().getAttribute("jCryptionKeys"));
            String key = jc.decrypt(req.getParameter("key"));

            request.getSession().getServletContext()
                    .removeAttribute("jCryptionKeys");
            request.getSession().getServletContext()
                    .setAttribute("jCryptionKey", key);
            /**
             * Encrypts password using AES *
             */
            String ct = AesCtr.encrypt(key, key, 256);
            /**
             * Sends response *
             */
            PrintWriter out = response.getWriter();
            out.print("{\"challenge\":\"" + ct + "\"}");
            return;
        }

    }

    /**
     * Handles a GET request
     *
     * @see HttpServlet
     */
    public void doGet(HttpServletRequest req, HttpServletResponse res)
            throws IOException, ServletException {
        doPost(req, res);

    }

    /*
     *
     * Método que desencripta datos
     *
     */
    public static String getParameter(HttpServletRequest request, String txt) {
        return txt;
        //se omite temporalmente por falta de metodos que encriptan del lado del cliente
        /*
        String key = (String) request.getSession().getServletContext().getAttribute("jCryptionKey");
        txt = txt.replace(" ", "+");
        String p1 = AesCtr.decrypt(txt, key, 256);
        try {
            p1 = java.net.URLDecoder.decode(p1, "UTF-8");
            return p1;
        } catch (Exception e) {
            return null;
        }*/
    }
    /*
     *
     * Método que encripta
     *
     */

    public static String setParameter(HttpServletRequest request, String txt) {
        String key = (String) request.getSession().getServletContext().getAttribute("jCryptionKey");
        String p1 = AesCtr.encrypt(txt, key, 256);
        return p1;
    }

}
