
function RevisionRelocalizacion(identificador_reas, rowId, nombre, contenedor) {
    prevenirCierre = true;
    ocultarPaneles();
    $('#' + contenedor).show();

    $('#' + contenedor).empty();
    $('#' + contenedor).append('<form class="forms ui-tabs-panel ui-widget-content ui-corner-all" autocomplete="on" style="padding-bottom: 20px; padding-right: 15px; border-width: 0;"></form>');
    $('#' + contenedor + ' .forms').formularioREASUtil({
        options: FormularioRevisionRelocalizacion_Options,
        schema: FormularioRevisionRelocalizacion_Schema,
        atributoCodigoFormulario: "identificador_reas",
        atributoNombreFormulario: "identificador_reas",
        operacion_insertar_editar: "InsertarEditarFormularioRevisionRelocalizacion",
        busqueda: {
            op: 'ConsultarIdentificadorReas',
            identificador_reas: identificador_reas
        },
        parametro_id: identificador_reas,
        dominios: [
        ],
        atributosEsperados: {
            token: "integer"
            , existencia_carpetas: {
                existe_carpeta_reas: "boolean"
                , existe_carpeta_reloca: "boolean"
                , existe_contrato_revision: "boolean"
            }
            , identificador_reas: "text"
            , contrato_fecha_inicio: "date"
            , contrato_fecha_final: "date"
            , poblacion: "integer"
            , identificador_observaciones: "text"
            , contrato_anterior_vigente: "boolean"
            , contrato_ant_arrendador_diferente: "boolean"
            , contrato_ant_soporte_acta_finalizacion: "boolean"
            , documentos_soporte: {
                docs_soporte_arrendatario: "text"
                , docs_soporte_arrendador: "text"
                , docs_soporte_apoderado: "text"
                , docs_soporte_observaciones: "text"
            }
            , contraste_documentos: {
                contraste_ids_arrendatario: "text"
                , contraste_ids_arrendador: "text"
                , contraste_ids_apoderado: "text"
                , contraste_ids_observaciones: "text"
            }
            , contraste_titularidad: {
                contraste_titulari_arrendatario: "text"
                , contraste_titulari_observaciones: "text"
            }
            , estudio_documentos: {
                estudio_docs_positivo: "boolean"
                , estudio_docs_adenda: "boolean"
                , estudio_docs_aden_positivo: "boolean"
            }
            , estudio_documen_511: {
                estudio_docs_511_positivo: "boolean"
                , estudio_docs_511_adenda: "boolean"
                , estudio_docs_511_aden_positivo: "boolean"
            }
            , estudio_docs_observaciones: "text"
            , propiedad_predio: {
                cert_tradi_arrendador: "text"
                , calidad_arrendador: "text"
                , predio_arrendar_direccion: "text"
                , predio_arrendar_vuc_direccion: "text"
                , predio_arrendar_limitaciones: "boolean"
                , predio_arrendar_observaciones: "text"
            }
            , certificacion_bancaria: {
                certi_bancaria_poder: "boolean"
                , certi_banc_arrendador_nombre: "text"
                , certi_banc_arrendador_numero: "text"
                , certi_banc_arrendador_banco: "text"
                , certi_banc_apoderado_poder: "text"
                , certi_banc_apoderado_nombre: "text"
                , certi_banc_apoderado_numero: "text"
                , certi_banc_apoderado_banco: "text"
                , certi_banc_observaciones: "text"
            }
            , seleccion_de_vivienda: {
                seleccion_vivienda: "boolean"
                , selec_vivien_tipo: "text"
                , selec_vivien_desistimiento: "boolean"
                , selec_vivien_fecha_seleccion: "date"
                , selec_vivien_proyecto: "integer"
                , selec_vivien_fecha_entrega: "date"
                , contrato_primer_cont_fecha: "date"
                , selec_viven_observaciones: "text"
            }
            , valor_contrato: {
                aplicacion_740: "boolean"
                , acta_evacuacion_idiger: "boolean"
                , aplicac_740_observaciones: "text"
            }
            , acta_par: {
                acta_entrega_par: "boolean"
                , acta_entre_par_fecha: "date"
                , acta_entre_par_observaciones: "text"
            }
            , acta_verificacion_traslado: {
                traslado_acta_verificacion: "boolean"
                , traslado_fecha: "date"
                , traslado_observaciones: "text"
            }

        },
        view: {
            "parent": "VIEW_WEB_EDIT",
            "layout": {
                "template": '../templates/wizard_revision_relocalizacion_template.html',
                "bindings": {
                    "beneficiario_nombre": "grupo-1",
                    "beneficiario_cedula": "grupo-1",
                    "existencia_carpetas": "grupo-1",
                    "identificador_reas": "grupo-1",
                    "contrato_fecha_inicio": "grupo-1",
                    "contrato_fecha_final": "grupo-1",
                    "contrato_anterior_vigente": "grupo-1",
                    "contrato_ant_arrendador_diferente": "grupo-1",
                    "contrato_ant_fecha": "grupo-1",
                    "contrato_ant_soporte_acta_finalizacion": "grupo-1"
                    , "poblacion": "grupo-1"
                    , "identificador_observaciones": "grupo-1"
                    , "documentos_soporte": "grupo-1"
                    , "contraste_documentos": "grupo-1"
                    , "contraste_titularidad": "grupo-1"
                    , "estudio_documentos": "grupo-2"
                    , "propiedad_predio": "grupo-2"
                    , "certificacion_bancaria": "grupo-2"
                    , "estudio_documen_511": "grupo-2"
                    , "estudio_docs_observaciones": "grupo-2"
                    , "valor_contrato": "grupo-3"
                    , "seleccion_de_vivienda": "grupo-3"
                    , "acta_par": "grupo-3"
                    , "acta_verificacion_traslado": "grupo-3"
                    , "rev_reloca_usuario": "grupo-4"
                    , "rev_reloca_usr_cargo": "grupo-4"
                }
            },
            "wizard": {
                "renderWizard": true,
                "statusBar": true,
                "validation": true,
                "buttons": {
                    "done": {
                        "validateOnClick": true
                    },
                    "next": {
                        "validateOnClick": true,
                        "onClick": function () {

                        }
                    },
                    "prev": {
                        "validateOnClick": true,
                        "onClick": function () {

                        }
                    }
                }
            },
            "fields": {
            }
        },
        guardado_completo: RevisionRelocalizacionGuardadoCompleto
    });

}


