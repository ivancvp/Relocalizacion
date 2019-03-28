/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.frmejia.backend.manager;

import com.frmejia.backend.entity.Ent_Consulta;
import com.frmejia.backend.util.PostgresUtil;
import com.frmejia.backend.util.XMLUtil;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;
import javax.faces.model.SelectItem;
import javax.servlet.http.HttpSession;
import javax.swing.table.DefaultTableModel;

public class UsuarioManager {

    public static final String USER_SESSION_KEY = "user";
    public static final String TYPE_USER_SESSION_KEY = "type";
    public static final String USER_INFO = "info";

    private String usuarioUsuario;
    private String usuarioPwd = "";
    private String usuarioPwdV;
    private String tipoUsuario;
    private List<SelectItem> listaTipoUsuarios;

    public String getUsuarioUsuario() {
        return usuarioUsuario;
    }

    public void setUsuarioUsuario(String usuarioUsuario) {
        this.usuarioUsuario = usuarioUsuario;
    }

    public String getUsuarioPwd() {
        return usuarioPwd;
    }

    public void setUsuarioPwd(String usuarioPwd) {
        this.usuarioPwd = usuarioPwd;
        /*
         try {
         MessageDigest m = MessageDigest.getInstance("MD5");
         m.reset();
         m.update(usuarioPwd.getBytes());
         byte[] digest = m.digest();
         BigInteger bigInt = new BigInteger(1,digest);
         String hashtext = bigInt.toString(16);
         this.usuarioPwd = hashtext;
         } catch (NoSuchAlgorithmException ex) {
         Logger.getLogger(UsuarioManager.class.getName()).log(Level.SEVERE, null, ex);
         }*/
    }

    public String getUsuarioPwdV() {
        return usuarioPwdV;
    }

    public void setUsuarioPwdV(String usuarioPwdV) {
        this.usuarioPwdV = usuarioPwdV;
        /*
         try {
         MessageDigest m = MessageDigest.getInstance("MD5");
         m.reset();
         m.update(usuarioPwdV.getBytes());
         byte[] digest = m.digest();
         BigInteger bigInt = new BigInteger(1,digest);
         String hashtext = bigInt.toString(16);
         this.usuarioPwdV = hashtext;
         } catch (NoSuchAlgorithmException ex) {
         Logger.getLogger(UsuarioManager.class.getName()).log(Level.SEVERE, null, ex);
         }*/
    }

    public String getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(String tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    public List<SelectItem> getListaTipoUsuarios() {
        if (listaTipoUsuarios == null) {
            listaTipoUsuarios = new ArrayList<>();

            XMLUtil xmlUtil = new XMLUtil();
            PostgresUtil postgresUtil = new PostgresUtil();
            Ent_Consulta ent_Consulta;
            ent_Consulta = xmlUtil.obtenerConfiguracionConsulta("ConsultaTiposUsuarios");

            String query;
            query = ent_Consulta.getSql();

            postgresUtil.connecting(ent_Consulta.getUrl(), ent_Consulta.getUser(), ent_Consulta.getPassword());
            DefaultTableModel tablaUsuario = postgresUtil.obtenerTabla(postgresUtil.executeQuerySQL(query));
            postgresUtil.cerrarConexion();

            if (tablaUsuario != null && tablaUsuario.getRowCount() > 0) {
                for (int i = 0; i < tablaUsuario.getRowCount(); i++) {
                    listaTipoUsuarios.add(
                            new SelectItem(
                                    tablaUsuario.getValueAt(i, tablaUsuario.findColumn("tius_id")),
                                    tablaUsuario.getValueAt(i, tablaUsuario.findColumn("tius_desc")).toString()));
                }

            }
        }
        return listaTipoUsuarios;
    }

    public void setListaTipoUsuarios(List<SelectItem> listaTipoUsuarios) {
        this.listaTipoUsuarios = listaTipoUsuarios;
    }



    public String validateUsuario() {
        FacesContext context = FacesContext.getCurrentInstance();

        XMLUtil xmlUtil = new XMLUtil();
        PostgresUtil postgresUtil = new PostgresUtil();
        Ent_Consulta ent_Consulta = new Ent_Consulta();
        ent_Consulta = xmlUtil.obtenerConfiguracionConsulta("ConsultaUsuarioByNombre");

        String query = "";
        query = ent_Consulta.getSql();
        query = query.replaceAll("@USUARIO", usuarioUsuario);

        postgresUtil.connecting(ent_Consulta.getUrl(), ent_Consulta.getUser(), ent_Consulta.getPassword());
        DefaultTableModel tablaUsuario = postgresUtil.obtenerTabla(postgresUtil.executeQuerySQL(query));
        postgresUtil.cerrarConexion();

        Ent_Consulta registro_login = new Ent_Consulta();
        registro_login = xmlUtil.obtenerConfiguracionConsultaDML("InsertarLogUsuario");

        PostgresUtil pgUtil = new PostgresUtil();
        pgUtil.connecting(registro_login.getUrl(), registro_login.getUser(), registro_login.getPassword());
        String q = registro_login.getSql();
        UUID uniqueID = UUID.randomUUID();
        q = q.replaceAll("@USUARIO", usuarioUsuario);
        q = q.replaceAll("@USER_AGENT", context.getExternalContext().getRequestHeaderMap().get("User-Agent"));
        q = q.replaceAll("@REFERER", context.getExternalContext().getRequestHeaderMap().get("referer"));

        pgUtil.executeDML(q);

        if (tablaUsuario != null && tablaUsuario.getRowCount() > 0) {
            if (!tablaUsuario.getValueAt(0, tablaUsuario.findColumn("usuario_pwd")).toString().equals(usuarioPwd)) {
                FacesMessage message = new FacesMessage(FacesMessage.SEVERITY_ERROR,
                        "Autenticación fallida!",
                        "La contraseña ingresada no es correcta.");
                context.addMessage(null, message);
                return null;
            }
            if (tablaUsuario.getValueAt(0, tablaUsuario.findColumn("usuario_activo")).toString().equals("false")) {
                FacesMessage message = new FacesMessage(FacesMessage.SEVERITY_ERROR,
                        "Autenticación fallida!",
                        "El usuario no está activo en el sistema.");
                context.addMessage(null, message);
                return null;
            }
            //Dia actual + 24 horas
            /*String usuario_fecha_vigencia = tablaUsuario.getValueAt(0, tablaUsuario.findColumn("usuario_fecha_vigencia")).toString();
            DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.S");
            Date vigencia = null;
            try {
                vigencia = (new Date(format.parse(usuario_fecha_vigencia).getTime() + (1000 * 60 * 60 * 24)));
            } catch (ParseException ex) {
                Logger.getLogger(UsuarioManager.class.getName()).log(Level.SEVERE, null, ex);
            }
            if (new Date().after(vigencia)) {
                FacesMessage message = new FacesMessage(FacesMessage.SEVERITY_ERROR,
                        "Autenticación fallida!",
                        "La cuenta del usuario ha caducado.");
                context.addMessage(null, message);
                return null;
            }*/

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
            /*
            String mun = "";
            try {
                mun = tablaUsuario.getValueAt(0, tablaUsuario.findColumn("municipios")).toString();
            } catch (Exception e) {
            }
            ArrayList listMpio = new ArrayList();
            if (mun.contains(",")) {
                String[] lista = new String[1];
                lista = mun.split(",");
                for (int i = 0; i < lista.length; i++) {
                    listMpio.add(lista[i]);
                }
            } else {
                if (mun != "") {
                    listMpio.add(mun);
                }
            }
            
            String reg = "";
            try {
                reg = tablaUsuario.getValueAt(0, tablaUsuario.findColumn("regionales")).toString();
            } catch (Exception e) {
            }
            ArrayList listReg = new ArrayList();
            if (reg.contains(",")) {
                String[] lista = new String[1];
                lista = reg.split(",");
                for (int i = 0; i < lista.length; i++) {
                    listReg.add(lista[i]);
                }
            } else {
                if (reg != "") {
                    listReg.add(reg);
                }
            }
            
            info.put("municipios", listMpio);
            info.put("regionales", listReg);
             */

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

            context.getExternalContext().getSessionMap().put(USER_SESSION_KEY, tablaUsuario.getValueAt(0, tablaUsuario.findColumn("usuario_usuario")).toString());

            context.getExternalContext().getSessionMap().put(TYPE_USER_SESSION_KEY, tablaUsuario.getValueAt(0, tablaUsuario.findColumn("tius_id")));
            context.getExternalContext().getSessionMap().put(USER_INFO, info);

            try {
                String nombre_archivo = usuarioUsuario;
                //Comprobar si el archivo existe
                String ruta = "C:\\TEMP_RELOCA\\SESIONES\\" + nombre_archivo + ".txt";
                File archivo = new File(ruta);
                BufferedWriter bw;
                if (archivo.exists()) { //si existe
                    archivo.delete();
                }
                bw = new BufferedWriter(new FileWriter(archivo));
                context.getExternalContext().getSessionMap().put("codigo_sesion", uniqueID.toString());
                bw.write(uniqueID.toString());
                bw.close();
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }

            return "app-main";
        } else {
            FacesMessage message = new FacesMessage(FacesMessage.SEVERITY_ERROR,
                    "Autenticación fallida!",
                    "El nombre de usuario '"
                    + usuarioUsuario
                    + "' no existe.");
            context.addMessage(null, message);
            return null;
        }
    }

    public static Object getInfoSesion(String parte) {
        FacesContext context = FacesContext.getCurrentInstance();
        Map<String, Object> info = new HashMap<String, Object>();
        info = (Map<String, Object>) context.getExternalContext().getSessionMap().get(UsuarioManager.USER_INFO);
        return info.get(parte);
    }

    public static Object getInfoSesion(String parte, HttpSession session) {
        Map<String, Object> info = new HashMap<String, Object>();
        info = (Map<String, Object>) session.getAttribute(UsuarioManager.USER_INFO);
        return info.get(parte);
    }

    public static Boolean getTienePermisoSesion(String cod_permiso) {
        String[] lista = {cod_permiso};
        if (cod_permiso.isEmpty()) {
            return true;
        }
        if (cod_permiso.contains("*")) {
            return true;
        }
        if (cod_permiso.contains(",")) {
            lista = cod_permiso.split(",");
        }
        FacesContext context = FacesContext.getCurrentInstance();
        Map<String, Object> info = new HashMap<String, Object>();
        info = (Map<String, Object>) context.getExternalContext().getSessionMap().get(UsuarioManager.USER_INFO);
        ArrayList listFunc = new ArrayList();
        listFunc = (ArrayList) info.get("funcionalidades");
        for (String cod : lista) {
            if (listFunc.indexOf(cod) != -1) {
                return true;
            }
        }
        return false;
    }

    public static Boolean getTieneMunicipioSesion(String cod_municio) {
        FacesContext context = FacesContext.getCurrentInstance();
        Map<String, Object> info = new HashMap<String, Object>();
        info = (Map<String, Object>) context.getExternalContext().getSessionMap().get(UsuarioManager.USER_INFO);
        ArrayList listFunc = new ArrayList();
        listFunc = (ArrayList) info.get("municipios");
        return listFunc.indexOf(cod_municio) != -1;
    }

    public static Boolean getTieneRegionalSesion(String cod_municio) {
        FacesContext context = FacesContext.getCurrentInstance();
        Map<String, Object> info = new HashMap<String, Object>();
        info = (Map<String, Object>) context.getExternalContext().getSessionMap().get(UsuarioManager.USER_INFO);
        ArrayList listFunc = new ArrayList();
        listFunc = (ArrayList) info.get("regionales");
        return listFunc.indexOf(cod_municio) != -1;
    }

    public String logout() {
        HttpSession session = (HttpSession) FacesContext.getCurrentInstance().getExternalContext().getSession(false);
        if (session != null) {
            session.invalidate();
//            Map<String, Object> info = new HashMap<String, Object>();
//            info = (Map<String, Object>) session.getAttribute("info");
//            String usuario_usuario = info.get("usuario_usuario").toString();
//            SesionLista slista = SesionLista.getInstancia();
//            slista.removerSesion(usuario_usuario);
        }
        return "login";
    }

    public String createUsuario() {
        FacesContext context = FacesContext.getCurrentInstance();

        if (!usuarioPwd.equals(usuarioPwdV)) {
            FacesMessage message = new FacesMessage(FacesMessage.SEVERITY_ERROR,
                    "No se pudo crear el usuario",
                    "Las contraseñas no coinciden");
            context.addMessage("create:passwordv", message);
        }

        if (tipoUsuario.isEmpty()) {
            FacesMessage message = new FacesMessage(FacesMessage.SEVERITY_ERROR,
                    "No se pudo crear el usuario",
                    "Debe seleccionar el tipo de usuario");
            context.addMessage("create:tipoUsuario", message);

        }

        /**
         * Validar que el usuario no exista*
         */
        XMLUtil xmlUtil = new XMLUtil();
        PostgresUtil postgresUtil = new PostgresUtil();
        Ent_Consulta ent_Consulta = new Ent_Consulta();
        ent_Consulta = xmlUtil.obtenerConfiguracionConsulta("ConsultaUsuarioByNombre");

        String query = "";
        query = ent_Consulta.getSql();
        query = query.replaceAll("@USUARIO", usuarioUsuario);

        postgresUtil.connecting(ent_Consulta.getUrl(), ent_Consulta.getUser(), ent_Consulta.getPassword());
        DefaultTableModel tablaUsuario = postgresUtil.obtenerTabla(postgresUtil.executeQuerySQL(query));
        postgresUtil.cerrarConexion();

        if (tablaUsuario != null && tablaUsuario.getRowCount() > 0) {
            FacesMessage message = new FacesMessage(FacesMessage.SEVERITY_ERROR,
                    "No se pudo crear el usuario",
                    "El nombre de usuario '"
                    + usuarioUsuario
                    + "' ya se encuentra registrado.");
            context.addMessage("create:username", message);
            return null;
        }

        //Insertar el usuario en la base de datos
        ent_Consulta = xmlUtil.obtenerConfiguracionConsultaDML("InsertarUsuario");

        int result = -1;
        String dml = "";
        dml = ent_Consulta.getSql();

        dml = dml.replaceAll("@USUARIO", usuarioUsuario);
        dml = dml.replaceAll("@PW", usuarioPwd);
        dml = dml.replaceAll("@TIUS", tipoUsuario);

        postgresUtil.connecting(ent_Consulta.getUrl(), ent_Consulta.getUser(), ent_Consulta.getPassword());
        result = postgresUtil.executeDML(dml);
        postgresUtil.cerrarConexion();

        if (result > 0) {
            return "app-main";
        } else {

            FacesMessage message = new FacesMessage(FacesMessage.SEVERITY_ERROR,
                    "No se pudo crear el usuario",
                    "No fué posible registrar el nuevo usuario");
            context.addMessage("", message);
            return null;
        }

    }
}
