/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.frmejia.backend.entity;

/**
 *
 * @author ministerio
 */
public class Ent_Consulta {

    private String url;
    private String user;
    private String password;
    private String sql;
    private String permisos;
    private String conexion;
    private boolean dml_complejo;

    public boolean is_dml_complejo() {
        return dml_complejo;
    }

    public void set_dml_complejo(boolean es_dml_complejo) {
        this.dml_complejo = es_dml_complejo;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSql() {
        return sql;
    }

    public void setSql(String sql) {
        this.sql = sql;
    }

    public String getPermisos() {
        return this.permisos;
    }

    public void setPermisos(String permisos) {
        this.permisos = permisos;
    }

    public String getConexion() {
        return conexion;
    }

    public void setConexion(String conexion) {
        this.conexion = conexion;
    }

}
