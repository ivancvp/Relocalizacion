<%-- 
    Document   : pigeon
    Author     : fabian.mejia
--%>
<%@page contentType="text/javascript" pageEncoding="UTF-8"%>
<%@page import="java.security.MessageDigest"%>
<%@page import="org.apache.commons.codec.binary.Hex"%>
<%@page import="java.sql.Date"%>
<%@page import="java.util.Calendar"%>
<%
    Calendar cal = Calendar.getInstance();
    MessageDigest digest = MessageDigest.getInstance("SHA-256");
    byte[] hash = digest.digest( (request.getSession().getAttribute("user").toString() + new Date(cal.getTime().getTime()).toString()).getBytes("UTF-8") );
    out.print("var pigeon = '" +  Hex.encodeHexString(hash)  + "';");
%>