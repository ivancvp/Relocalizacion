package com.frmejia.backend.util;

import java.sql.*;


import java.util.List;

import javax.swing.table.DefaultTableModel;
import json.JSONArray;

/**
 *
 * @author lacardona
 */
public class PostgresUtil {

    private Connection conexion = null;
    private Statement sentencia = null;
    private ResultSet conjuntoResultados = null;

    private Driver driver = new org.postgresql.Driver();
    public Connection getConnection() {
        return conexion;
    }

    public void connecting(String url, String user, String password) {


        try {
            DriverManager.registerDriver(driver);
        } catch (SQLException ex) {
            System.out.println("Error 010 -- No es posible obtener el driver de conexion");
        }
        try {
            conexion = DriverManager.getConnection(url, user, password);
        } catch (SQLException ex) {
            System.out.println("Error 011 -- Ocurrio un error al intentar obtener la conexion a la base de datos, verificar los parametros de conexion");
            System.err.println(ex.getMessage() + " :P");
        }
    }

    public void connecting(String path) {

        XMLUtil xmlUtil = new XMLUtil();
        List parametrosConexionBD = xmlUtil.obtenerParametrosConexion(path);

        try {
            DriverManager.registerDriver(new org.postgresql.Driver());
        } catch (SQLException ex) {
            System.out.println("Error 010 -- No es posible obtener el driver de conexion");
        }
        try {
            conexion = DriverManager.getConnection(parametrosConexionBD.get(0).toString(), parametrosConexionBD.get(1).toString(), parametrosConexionBD.get(2).toString());
        } catch (SQLException ex) {
            System.out.println("Error 011 -- Ocurrio un error al intentar obtener la conexion a la base de datos, verificar los parametros de conexion");
            System.err.println(ex.getMessage());
        }
    }

    public void connecting() {

        XMLUtil xmlUtil = new XMLUtil();
        List parametrosConexionBD = xmlUtil.obtenerParametrosConexion();

        try {
            DriverManager.registerDriver(new org.postgresql.Driver());
        } catch (SQLException ex) {
            System.out.println("Error 010 -- No es posible obtener el driver de conexion");
        }
        try {
            conexion = DriverManager.getConnection(parametrosConexionBD.get(0).toString(), parametrosConexionBD.get(1).toString(), parametrosConexionBD.get(2).toString());
        } catch (SQLException ex) {
            System.out.println("Error 011 -- Ocurrio un error al intentar obtener la conexion a la base de datos, verificar los parametros de conexion");
            System.err.println(ex.getMessage());
        }
    }

    public ResultSet executeQuerySQL(String sql) {

        if (conexion != null) {
            try {
                sentencia = conexion.createStatement();
            } catch (SQLException ex) {
                System.out.println("Error 14 -- Ocurrio un error al intentar crear la sentencia");
            }
            try {
                conjuntoResultados = sentencia.executeQuery(sql);
            } catch (SQLException ex) {
                System.out.println("Esta es la consulta : " + sql);
                System.out.println("Ocurrio un error al intentar ejecutar la consulta sql");
            }

            return conjuntoResultados;

        } else {
            return null;
        }
    }

    public int executeDML(String dml) {

        int resultado = 0;

        if (conexion != null) {
            try {
                sentencia = conexion.createStatement();
            } catch (SQLException ex) {
                System.out.println("Error 14 -- Ocurrio un error al intentar crear la sentencia");
            }
            try {
                System.out.println("Esta es la consulta : " + dml);
                resultado = sentencia.executeUpdate(dml);
                System.out.println("Se realizo la modificacion de " + resultado + " registros");

            } catch (SQLException ex) {
                System.out.println("Ocurrio un error al intentar ejecutar la consulta dml\n\n" + ex.getMessage());
            }

            return resultado;

        } else {
            System.out.println(" Error -- 016 Occurio un error al ejecutar la consulta no se pudo establecer conexión con la base de datos");
            return -1;
        }
    }
    
    public ResultSet executeDML_complejo(String dml) {
        if (conexion != null) {
            try {
                sentencia = conexion.createStatement();
            } catch (SQLException ex) {
                System.out.println("Error 14 -- Ocurrio un error al intentar crear la sentencia");
            }
            try {
                System.out.println("Esta es la consulta : " + dml);
                conjuntoResultados = sentencia.executeQuery(dml);
            } catch (SQLException ex) {
                System.out.println("Ocurrio un error al intentar ejecutar la consulta dml\n\n" + ex.getMessage());
            }

            return conjuntoResultados;

        } else {
            return null;
        }
    }

    public DefaultTableModel obtenerTabla(ResultSet resultset) {

        DefaultTableModel tabla = new DefaultTableModel();

        try {

            if (resultset != null) {

                int columnCount = resultset.getMetaData().getColumnCount();

                for (int i = 0; i < columnCount; i++) {
                    tabla.addColumn(resultset.getMetaData().getColumnLabel(i + 1));
                }

                while (resultset.next()) {

                    Object[] fila = new Object[columnCount];
                    for (int i = 0; i < columnCount; i++) {
                        Object o = resultset.getObject(i + 1);
                        fila[i] = o;
                    }
                    tabla.addRow(fila);
                }
            }

        } catch (SQLException e) {
            System.out.println("Ocurrio un error al utilizar el resultSet");
        }

        return tabla;
    }

    public void cerrarConexion() {
        try {
            if (conjuntoResultados != null) {
                conjuntoResultados.close();
            }

            if (sentencia != null) {
                sentencia.close();
            }

        } catch (SQLException ex) {
            System.out.println(" Error 012 -- Ocurrio un error al intentar cerrar la conexion al statement");
        }
        try {
            if (conexion != null) {
                conexion.close();
                DriverManager.deregisterDriver(driver);
            }
        } catch (SQLException ex) {
            System.out.println("Error 013 -- Ocurrio un error al intentar cerrar la conexion a la base de datos");
        }
    }

    /**
     * Método que ejecuta un prepareStatement SQL y retorna el resultSet
     *
     * @param sql <code> String </code> Cuerpo de la consulta
     * @param parametros <code> List </code> Lista de parametros
     * @return ResultSet null si ocurrio un error en la consulta
     */
    public ResultSet ejecutaPrepareStatementSQL(String sql, List parametros) {

        PreparedStatement preparedStatement ;
        ResultSet resultSet;

        try {
            preparedStatement = getConnection().prepareStatement(sql);

            for (int i = 0; i < parametros.size(); i++) {
                preparedStatement.setString(i + 1, (String) parametros.get(i));
            }

            resultSet = preparedStatement.executeQuery();

        } catch (SQLException ex) {
            resultSet = null;
        }

        return resultSet;
    }

    /**
     * Método que ejecuta un prepareStatement DML y retorna el resultSet
     *
     * @param sql <code> String </code> Cuerpo de la consulta
     * @param parametros <code> List </code> Lista de parametros
     * @return <code> int </code> Numero de registros modificados -1 si ocurre
     * algun error
     */
    public int ejecutaPrepareStatementDML(String sql, List parametros) {

        PreparedStatement preparedStatement;
        int numRegistos;

        try {
            preparedStatement = getConnection().prepareStatement(sql);

            for (int i = 0; i < parametros.size(); i++) {
                if (parametros.get(i) != null) {
                    preparedStatement.setString(i + 1, (String) parametros.get(i));
                }
            }

            numRegistos = preparedStatement.executeUpdate();

        } catch (SQLException ex) {
            numRegistos = -1;
        }

        return numRegistos;
    }
}
