/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.frmejia.backend.manager;

import com.frmejia.backend.entity.Ent_Consulta;
import com.frmejia.backend.util.EscaparCaracteres;
import com.frmejia.backend.util.JsonUtil;
import com.frmejia.backend.util.PostgresUtil;
import com.frmejia.backend.util.XMLUtil;
import java.sql.ResultSet;
import java.util.Iterator;
import java.util.Map;
import json.JSONArray;

/**
 *
 * @author ministerio
 */
public class ConsultasManager {

    public String EjecutarDML(String consulta, Map parametros) {

        String result;
        XMLUtil xmlUtil = new XMLUtil();
        PostgresUtil postgresUtil = new PostgresUtil();

        Ent_Consulta ent_Consulta;
        ent_Consulta = xmlUtil.obtenerConfiguracionConsultaDML(consulta);

        //Identificar si el usuario logueado no tiene permisos a la consulta, y lanza una exception
        if (!UsuarioManager.getTienePermisoSesion(ent_Consulta.getPermisos())) {
            //result = "{error:" + 1 + ", descripcion : 'No tiene permisos sobre la consulta'}";
        }

        String dml;
        dml = ent_Consulta.getSql();

        //Remplazamos los parametros
        Iterator itr = parametros.entrySet().iterator();
        while (itr.hasNext()) {
            Map.Entry e = (Map.Entry) itr.next();

            if (!e.getKey().toString().equals("op")) {
                String a = (String) e.getKey();
                String b= EscaparCaracteres.forRegex(((String[]) e.getValue())[0]);
//                b = EscaparCaracteres.forHTML(b);
                 dml = dml.replaceAll("@"+a, b);
            }
        }

        postgresUtil.connecting(ent_Consulta.getUrl(), ent_Consulta.getUser(), ent_Consulta.getPassword());
        if (ent_Consulta.is_dml_complejo()) {

            JSONArray resultados = JsonUtil.convertResultSetToJSON(postgresUtil.executeDML_complejo(dml));
            result = "{total:" + resultados.length() + ", data:";
            result += resultados.toString();
            result += "}";
        } else {
            result = "{total:" + postgresUtil.executeDML(dml) + "}";
        }
        postgresUtil.cerrarConexion();

        return result;
    }

    public JSONArray EjecutarConsulta(String consulta, Map parametros) throws Exception {

        XMLUtil xmlUtil = new XMLUtil();
        PostgresUtil postgresUtil = new PostgresUtil();

        Ent_Consulta ent_Consulta;
        ent_Consulta = xmlUtil.obtenerConfiguracionConsulta(consulta);

        //Identificar si el usuario logueado no tiene permisos a la consulta, y lanza una exception
        if (!UsuarioManager.getTienePermisoSesion(ent_Consulta.getPermisos())) {
            throw new Exception("No tiene permisos sobre la consulta.");
        }

        String query;
        query = ent_Consulta.getSql();

        //Remplazamos los parametros
        Iterator itr = parametros.entrySet().iterator();
        while (itr.hasNext()) {
            Map.Entry e = (Map.Entry) itr.next();

            if (!e.getKey().toString().equals("op")) {
                query = query.replaceAll("@" + e.getKey().toString(), ((String[]) e.getValue())[0]);
            }
        }
        
        //System.out.println("CONSULTA EJECUTADA: " + query);
        postgresUtil.connecting(ent_Consulta.getUrl(), ent_Consulta.getUser(), ent_Consulta.getPassword());
        JSONArray jsonArrayResult = JsonUtil.convertResultSetToJSON(postgresUtil.executeQuerySQL(query));
        postgresUtil.cerrarConexion();

        return jsonArrayResult;
    }
    
    
    public ResultSet EjecutarConsultaResultSet(String consulta, Map parametros) throws Exception {

        XMLUtil xmlUtil = new XMLUtil();
        PostgresUtil postgresUtil = new PostgresUtil();

        Ent_Consulta ent_Consulta;
        ent_Consulta = xmlUtil.obtenerConfiguracionConsulta(consulta);

        //Identificar si el usuario logueado no tiene permisos a la consulta, y lanza una exception
        if (!UsuarioManager.getTienePermisoSesion(ent_Consulta.getPermisos())) {
            throw new Exception("No tiene permisos sobre la consulta.");
        }

        String query;
        query = ent_Consulta.getSql();

        //Remplazamos los parametros
        Iterator itr = parametros.entrySet().iterator();
        while (itr.hasNext()) {
            Map.Entry e = (Map.Entry) itr.next();

            if (!e.getKey().toString().equals("op")) {
                query = query.replaceAll("@" + e.getKey().toString(), ((String[]) e.getValue())[0]);
            }
        }

        postgresUtil.connecting(ent_Consulta.getUrl(), ent_Consulta.getUser(), ent_Consulta.getPassword());
        return postgresUtil.executeQuerySQL(query);
    }
}
