function FormularioRevisionRelocalizacion_Options_validar_fecha(e) {
    var curDate = $(e.target).datepicker("getDate");
    var minDate = new Date(2012, 1 - 1, 1);
    minDate.setHours(0, 0, 0, 0);           // clear time portion for correct results
    if (curDate < minDate) {
        alert("Fecha invalida, recuerde que el formato es: dd/mm/aaaa");
        $(e.target).datepicker("setDate", null);
    }
}


var FormularioRevisionRelocalizacion_Options = {
    "renderForm": true,
    "helper": "",
    "form": {
    },
    "fields": {
        "token": {
            "type": "hidden"
        },
        "contrato_fecha_inicio": {
            "dateFormat": "dd/mm/yy",
            "placeholder": "dd/mm/aaaa",
            "datepicker": {
                "changeMonth": true,
                "changeYear": true
            },
            "helper": "Del contrato que se encuentra sujeto a revisión"
        },
        "contrato_fecha_final": {
            "dateFormat": "dd/mm/yy",
            "placeholder": "dd/mm/aaaa",
            "datepicker": {
                "changeMonth": true,
                "changeYear": true
            },
            "helper": "Del contrato que se encuentra sujeto a revisión"
        },
        "existencia_carpetas": {
            "helper": "",
            "fields": {
                "existe_carpeta_reas": {
                    "rightLabel": "Existe carpeta de reasentamientos?"
                },
                "existe_carpeta_reloca": {
                    "rightLabel": "Existe carpeta de relocalización?"
                },
                "existe_contrato_revision": {
                    "rightLabel": "Existe contrato"
                }
            }
        },
        "contrato_anterior_vigente": {
            //"rightLabel": "Existe contrato anterior vigente?"
            "optionLabels": ["Si", "No"]
        },
        "contrato_ant_arrendador_diferente": {
            //"rightLabel": "En ese contrato aparece un arrendador Diferente?"
            "optionLabels": ["Si", "No"]
        },
        "contrato_ant_fecha": {
            "dateFormat": "dd/mm/yy",
            "placeholder": "dd/mm/aaaa",
            "datepicker": {
                "changeMonth": true,
                "changeYear": true
            }
        },
        "contrato_ant_soporte_acta_finalizacion": {
            "rightLabel": "Soporte acta de finalización anticipada?"
        },
        "poblacion": {
            "optionLabels": ["UITOTO", "EPERARA", "WOUNAAN", "BUENAVISTA"]
        },
        "identificador_observaciones": {
            "type": "textarea",
            "rows": 4,
            "cols": 80
        },
        "documentos_soporte": {
            "helper": "Existencia del Soporte de copias de documentos de identidad (Expediente reasentamientos, expediente relocalización, contrato)",
            "fields": {
                "docs_soporte_arrendatario": {
                    "optionLabels": ["Cumple", "No cumple"]
                },
                "docs_soporte_arrendador": {
                    "optionLabels": ["Cumple", "No cumple"]
                },
                "docs_soporte_apoderado": {
                    "optionLabels": ["Cumple", "No cumple"]
                },
                "docs_soporte_observaciones": {
                    "type": "textarea",
                    "rows": 4,
                    "cols": 80
                }

            }
        },
        "contraste_documentos": {
            "helper": "Para la diligencia de la siguiente pregunta tener en cuenta que se está revisando el último contrato (cuadro resumen, cuerpo, firmas) Posteriormente a esto se contrasta el contrato con los expedientes",
            "fields": {
                "contraste_ids_arrendatario": {
                    "optionLabels": ["Cumple", "No cumple"]
                },
                "contraste_ids_arrendador": {
                    "optionLabels": ["Cumple", "No cumple"]
                },
                "contraste_ids_apoderado": {
                    "optionLabels": ["Cumple", "No cumple"]

                },
                "contraste_ids_observaciones": {
                    "type": "textarea",
                    "rows": 4,
                    "cols": 80
                }

            }
        },
        "contraste_titularidad": {
            "helper": "Para la revisión en esta pregunta se contrasta el contrato con la titularidad de beneficiario expediente reasentamientos",
            "fields": {
                "contraste_titulari_arrendatario": {
                    "optionLabels": ["Cumple", "No cumple"]
                },
                "contraste_titulari_observaciones": {
                    "type": "textarea",
                    "rows": 4,
                    "cols": 80
                }

            }
        },
        "estudio_documentos": {
            "helper": "Para diligenciar esta pregunta, tener en cuenta el documento soporte de estudio de títulos que debe encontrarse en el expediente de reasentamientos",
            "fields": {
                "estudio_docs_positivo": {
                    "optionLabels": ["Positivo", "Negativo"]
                },
                "estudio_docs_adenda": {
                    "optionLabels": ["Si", "No"],
                    "dependencies": {
                        "estudio_docs_positivo": ["false"]
                    }
                },
                "estudio_docs_aden_positivo": {
                    "optionLabels": ["Positivo", "Negativo"],
                    "dependencies": {
                        "estudio_docs_adenda": ["true"]
                    }
                }
            }
        },
        "estudio_documen_511": {
            "helper": "",
            "fields": {
                "estudio_docs_511_positivo": {
                    "optionLabels": ["Positivo", "Negativo"]
                },
                "estudio_docs_511_adenda": {
                    "optionLabels": ["Si", "No"],
                    "dependencies": {
                        "estudio_docs_511_positivo": ["true"]
                    }
                },
                "estudio_docs_511_aden_positivo": {
                    "optionLabels": ["Positivo", "Negativo"],
                    "dependencies": {
                        "estudio_docs_511_adenda": ["true"]
                    }
                }
            }
        },
        "estudio_docs_observaciones": {
            "type": "textarea",
            "rows": 4,
            "cols": 80
        },
        "propiedad_predio": {
            "helper": "Tener en cuenta que para esta pregunta se esta hablando del arrendador",
            "fields": {
                "cert_tradi_arrendador": {
                    "optionLabels": ["Cumple", "No cumple"]
                },
                "calidad_arrendador": {
                    "optionLabels": ["Propietario", "Poseedor"]
                },
                "predio_arrendar_direccion": {
                    "helper": "Certificado de tradicion y libertad",
                    "optionLabels": ["Corresponde", "No corresponde"]
                },
                "predio_arrendar_vuc_direccion": {
                    "helper": "CHIP - No documento identidad propietario",
                    "optionLabels": ["Corresponde", "No corresponde"],
                    "dependencies": {
                        "predio_arrendar_direccion": ["No corresponde"]
                    }
                },
                "predio_arrendar_limitaciones": {
                    "helper": "En cuanto al arrendamiento y/o enajenación del bien (frente a la duda revisar tambien otros documentos que demuestran la propiedad)",
                    "optionLabels": ["Si", "No"]
                },
                "predio_arrendar_observaciones": {
                    "type": "textarea",
                    "rows": 4,
                    "cols": 80
                }
            }
        },
        "certificacion_bancaria": {
            "helper": "Esta pregunta hace referencia a los documentos soportes entregados junto con el contrato de arrendamiento a revisar. (si el documento no se encuentra adjunto con el último contrato, como alternativa, si el contrato inmediatamente anterior corresponde al mismo arrendatario se puede tomar el documento soporte del expediente de relocalización)",
            "fields": {
                "certi_bancaria_poder": {
                    "optionLabels": ["Si", "No"]
                },
                "certi_banc_arrendador_nombre": {
                    "optionLabels": ["Cumple", "No cumple"],
                    "dependencies": {
                        "certi_bancaria_poder": ["false"]
                    }
                },
                "certi_banc_arrendador_numero": {
                    "optionLabels": ["Cumple", "No cumple"],
                    "dependencies": {
                        "certi_bancaria_poder": ["false"]
                    }
                },
                "certi_banc_arrendador_banco": {
                    "optionLabels": ["Cumple", "No cumple"],
                    "dependencies": {
                        "certi_bancaria_poder": ["false"]
                    }
                },
                "certi_banc_apoderado_poder": {
                    "optionLabels": ["Cumple", "No cumple"],
                    "dependencies": {
                        "certi_bancaria_poder": ["true"]
                    }
                },
                "certi_banc_apoderado_nombre": {
                    "optionLabels": ["Cumple", "No cumple"],
                    "dependencies": {
                        "certi_bancaria_poder": ["true"]
                    }
                },
                "certi_banc_apoderado_numero": {
                    "optionLabels": ["Cumple", "No cumple"],
                    "dependencies": {
                        "certi_bancaria_poder": ["true"]
                    }
                },
                "certi_banc_apoderado_banco": {
                    "optionLabels": ["Cumple", "No cumple"],
                    "dependencies": {
                        "certi_bancaria_poder": ["true"]
                    }
                },
                "certi_banc_observaciones": {
                    "type": "textarea",
                    "rows": 4,
                    "cols": 80
                }
            }
        },
        "valor_contrato": {
            "helper": "Esta pregunta corresponde a los documentos soporte del expediente de relocalización (como alternativa se pueden mirar los documentos soporte del expediente de reasentamientos)",
            "fields": {
                "aplicacion_740": {
                    "optionLabels": ["Si", "No"]
                },
                "acta_evacuacion_idiger": {
                    "optionLabels": ["Si", "No"],
                    "dependencies": {
                        "aplicacion_740": ["false"]
                    }
                },
                "aplicac_740_observaciones": {
                    "type": "textarea",
                    "rows": 4,
                    "cols": 80
                }
            }
        },
        "seleccion_de_vivienda": {
            "helper": "Esta pregunta corresponde a los documentos soporte del expediente de reasentamientos",
            "fields": {
                "seleccion_vivienda": {
                    "optionLabels": ["Si", "No"]
                },
                "selec_vivien_tipo": {
                    "optionLabels": ["Nueva", "Usada"],
                    "dependencies": {
                        "seleccion_vivienda": ["true"]
                    }
                },
                "selec_vivien_desistimiento": {
                    "optionLabels": ["Si", "No"],
                    "dependencies": {
                        "seleccion_vivienda": ["true"]
                    }
                },
                "selec_vivien_fecha_seleccion": {
                    "dateFormat": "dd/mm/yy",
                    "placeholder": "dd/mm/aaaa",
                    "datepicker": {
                        "changeMonth": true,
                        "changeYear": true
                    },
                    "dependencies": {
                        "seleccion_vivienda": ["true"]
                    }
                },
                "selec_vivien_proyecto": {
                    "optionLabels": ["COLORES DE BOLONIA", "EL PARAÍSO", "ICARO", "LA GLORIA DE DIOS", "OPV LA UNIÓN", "OPV VENTANAS DE USMINIA", "PORTÓN DE BUENAVISTA", "PORVENIR CLL 51", "PUERTA DEL REY", "RINCÓN DE BOLONIA", "TORRES DE SAN RAFAEL", "XIE"],
                    "dependencies": {
                        "selec_vivien_tipo": ["Nueva"]
                    }
                },
                "selec_vivien_fecha_entrega": {
                    "dateFormat": "dd/mm/yy",
                    "placeholder": "dd/mm/aaaa",
                    "datepicker": {
                        "changeMonth": true,
                        "changeYear": true
                    },
                    "dependencies": {
                        "selec_vivien_tipo": ["Nueva"]
                    }
                },
                "contrato_primer_cont_fecha": {
                    "dateFormat": "dd/mm/yy",
                    "placeholder": "dd/mm/aaaa",
                    "datepicker": {
                        "changeMonth": true,
                        "changeYear": true
                    }
                },
                "selec_viven_observaciones": {
                    "type": "textarea",
                    "rows": 4,
                    "cols": 80
                }
            }
        },
        "acta_par": {
            "helper": "Esta pregunta corresponde a los documentos soporte del expediente de reasentamientos",
            "fields": {
                "acta_entrega_par": {
                    "optionLabels": ["Si", "No"]
                },
                "acta_entre_par_fecha": {
                    "dateFormat": "dd/mm/yy",
                    "placeholder": "dd/mm/aaaa",
                    "datepicker": {
                        "changeMonth": true,
                        "changeYear": true
                    },
                    "dependencies": {
                        "acta_entrega_par": ["true"]
                    }
                },
                "acta_entre_par_observaciones": {
                    "type": "textarea",
                    "rows": 4,
                    "cols": 80
                }
            }
        },
        "acta_verificacion_traslado": {
            "helper": "Esta pregunta corresponde a los documentos soporte del expediente de reasentamientos",
            "fields": {
                "traslado_acta_verificacion": {
                    "optionLabels": ["Si", "No"]
                },
                "traslado_fecha": {
                    "dateFormat": "dd/mm/yy",
                    "placeholder": "dd/mm/aaaa",
                    "datepicker": {
                        "changeMonth": true,
                        "changeYear": true
                    },
                    "dependencies": {
                        "traslado_acta_verificacion": ["true"]
                    }
                },
                "traslado_observaciones": {
                    "type": "textarea",
                    "rows": 4,
                    "cols": 80
                }
            }
        },
        "rev_reloca_usuario": {
            //"placeholder": "Nombre completo"
            "optionLabels": ["ALEJANDRA CAROLINA DAZA F.", "ALEJANDRO DE JESUS RESTREPO TOBON", "ALEXANDER RONCANCIO", "ALVARO ALFONSO RIOS CABAS", "ANA ELVIRA PENAGOS LOPEZ", "ANGELICA MARIA ACOSTA", "AUGUSTO ENRIQUE CASTRO CORTES", "BAIRON SANCHEZ CUENCA", "BRAHIAM FERNANDO QUINTANA MARTINEZ", "CARLOS ENRIQUE RUIZ PATIÑO", "CLARA INES JIMENEZ TRUJILLO", "CLAUDIA BLANCO VELANDIA", "CLAUDIA MARCELA LOPEZ UPEGUI", "CLAUDIA MILISA MENDEZ VILLAMIZAR", "CONSUELO ORTIZ RUBIO", "DANIEL GARAVITO", "DASSY MAYERLY VERA  ROSAS", "DAVID ESTEBAN CORDOBA ARIZA", "DIANA ALEJANDRA PEÑA PEÑA", "DIANA ELIZABETH VELASCO MARTIN", "DIEGO IVAN SANCHEZ LARROTTA", "DILIA GISELA ROZO BARAJAS", "EDILBERTO BARON CALDERON", "EDITH GOMEZ BAUTISTA", "EDWIN ALEXANDER CASTELLANOS CARDENAS", "EDWIN JONATHAN AROCA OSMA", "FREDDY NANCLARES", "FREDDY YOVANNY LARA MENDIETA", "GERMAN PEREZ FORERO", "HAIDY JOHANA ARANGO", "JAIME GABRIEL GONZALEZ GAMBOA", "JAIRO DAVID ARIAS GONZALEZ", "JONATHAN LEONARDO SILVA RIVERA", "JORGE LUIS TEJADA", "JORGE RENE MORA DIAZ", "JOSE ALEXANDER BOLAÑOS CASTEBLANCO", "JOSE DOMINGO GRACIA", "JUAN ANDRES MARTINEZ SUESCUN", "KATERINE CALDERON PARRADO", "LEIDY BRIGITT  MOSQUERA CAUCALI", "LEIDY CONSTANZA VILLARRAGA JOYA", "LORETTA COIA", "LUZ ANGELA RODRIGUEZ SUAREZ", "LUZ YAZMIN HERNANDEZ BUITRAGO", "MAIRA VALLEJO", "MARCELA GONZALEZ ECHEVERRY", "MARIA MARGARITA CHAVEZ RODRIGUEZ", "MARIA MERCEDES LAVERDE GONZALEZ", "MARTHA CAROLINA RUBIO", "MAYERLINE MOLANO MURCIA", "MICHAEL STRAUSS QUINTERO", "MIGUEL ALFONSO DÍAZ", "MILDRED ROCIO MENDEZ BOHORQUEZ", "MIRIAM BEATRIZ LORA ZUÑIGA", "NATALIA GARZON MORENO", "NIDIA DURAN MELO", "OLGA LUCIA GODOY", "OLGA LUCIA LEAL", "OLGA LUCIA PORRAS GIRALDO", "OSCAR FELIPE MARLES", "PEDRO VICENTE CONTRERAS", "RAFAEL PRIETO SUAREZ", "RICARDO ANTONIO SANCHEZ SANCHEZ", "SANDRA XIMENA PEÑAFORD LOPEZ", "SINDY RONCANCIO", "SOBEYDA ACOSTA", "WILLIAM RAMIREZ CARREÑO", "YESICA ANDREA ACHURY", "YESID DANILO MANCERA MANCERA", "YILDIER FLOREZ", "YULIETH ANDREA PIRAJAN MURCIA"]
        }

    }
};

function FormularioRevisionRelocalizacionProcesardependencias_onPostrender(e, dependientes, exclusiones) {
    if (!$(e.field).prop("disabled") && e.parent.options && e.parent.options.fields) {
        for (var j in e.parent.options.fields) {
            var field = e.parent.options.fields[j];
            if (field.exclusiones) {
                for (var i = 0; i < field.exclusiones.length; i++) {
                    if (field.exclusiones[i].toString() === e.propertyId && e.parent.data && e.parent.data[j] === true) {
                        $(e.field).prop("disabled", true);
                    }
                }
            }
        }
    }

    if (dependientes && e.data === true) {
        for (var i = 0; i < dependientes.length; i++) {
            if (e.parent.parent.options &&
                    e.parent.parent.options.fields &&
                    e.parent.parent.options.fields[dependientes[i]] &&
                    e.parent.parent.options.fields[dependientes[i]].fieldClass) {

                if (e.parent.parent.options.fields[dependientes[i]].fieldClass.indexOf("alpaca-fieldset-hidden") !== -1) {
                    $(e.parent.parent.options.fields[dependientes[i]]).prop(
                            "fieldClass",
                            $(e.parent.parent.options.fields[dependientes[i]]).prop("fieldClass").replace("alpaca-fieldset-hidden", "alpaca-fieldset-displayed")
                            );
                    $("div[data-alpaca-item-container-item-key='" + dependientes[i] + "'] span").css("display", "");

                } else if (e.parent.parent.options.fields[dependientes[i]].fieldClass.indexOf("alpaca-fieldset-displayed") === -1) {
                    $(e.parent.parent.options.fields[dependientes[i]]).prop(
                            "fieldClass",
                            $(e.parent.parent.options.fields[dependientes[i]]).prop("fieldClass") + " alpaca-fieldset-displayed");
                }
            } else {
                $.extend(true, e.parent.parent.options, eval("({'fields': {'" + dependientes[i] + "': {'fieldClass': 'alpaca-fieldset-displayed'}}})"));
            }
        }
    } else {
        for (var i = 0; i < dependientes.length; i++) {
            if (e.parent.parent.options && e.parent.parent.options.fields &&
                    e.parent.parent.options.fields[dependientes[i]] &&
                    e.parent.parent.options.fields[dependientes[i]].fieldClass) {
                if (e.parent.parent.options.fields[dependientes[i]].fieldClass.indexOf("alpaca-fieldset-displayed") === -1) {
                    if (e.parent.parent.options.fields[dependientes[i]].fieldClass.indexOf("alpaca-fieldset-hidden") === -1) {
                        $(e.parent.parent.options.fields[dependientes[i]]).prop(
                                "fieldClass",
                                $(e.parent.parent.options.fields[dependientes[i]]).prop("fieldClass") + " alpaca-fieldset-hidden");
                    }
                }
            } else {
                $.extend(true, e.parent.parent.options, eval("({'fields': {'" + dependientes[i] + "': {'fieldClass': 'alpaca-fieldset-hidden'}}})"));
            }
        }
    }
}

function getitembypath(parentpath, parent) {
    if (parentpath.indexOf("/") !== -1) {
        var name = parentpath.substring(0, parentpath.indexOf("/"));
        if (parent.childrenByPropertyId[name]) {
            var hijo = parentpath.substring(parentpath.indexOf("/") + 1, parentpath.length);
            return getitembypath(hijo, parent.childrenByPropertyId[name]);
        }
    } else
    {
        return parent.childrenByPropertyId[parentpath];
    }
}

function FormularioRevisionRelocalizacionProcesardependencias_onFieldChange(e, dependientes) {


    if (e.options && e.options.exclusiones) {
        for (var i = 0; i < e.options.exclusiones.length; i++) {
            $(e.parent.childrenByPropertyId[e.options.exclusiones[i]].field).prop("disabled", $(e.field).prop("checked"));
            $(e.parent.childrenByPropertyId[e.options.exclusiones[i]].field).prop("checked", false);
            /*
             var activo = true;
             if (field.exclusiones[i].toString() === e.propertyId) {
             if($(e.field).prop("checked")){
             activo;
             }
             //$(e.field).prop("disabled",true);
             }*/

        }
    }

    for (var prop in dependientes) {

        var field = e.parent.parent.childrenByPropertyId[prop];
        if (field && field.schema && field.schema.dependencias) {
            if ($.isArray(field.schema.dependencias)) {
                var padreSeleccionado = false;
                for (var i = 0; i < field.schema.dependencias.length; i++) {
                    var parentpath = field.schema.dependencias[i];
                    var ob = getitembypath(parentpath, e.parent.parent);
                    if (ob && ob.field && ob.field[0].type === "checkbox" && ob.field[0].checked) {
                        padreSeleccionado = true;
                        continue;
                    }
                }
                var tipo = dependientes[prop] === "field" ? "span" : (dependientes[prop] === "field" ? "fieldset" : "");

                if (padreSeleccionado) {
                    $("div[data-alpaca-item-container-item-key='" + prop + "'], div[data-alpaca-item-container-item-key='" + prop + "'] span, div[data-alpaca-item-container-item-key='" + prop + "'] fieldset").css("display", "").removeClass("alpaca-fieldset-hidden");
                } else {
                    $("div[data-alpaca-item-container-item-key='" + prop + "'], div[data-alpaca-item-container-item-key='" + prop + "'] span, div[data-alpaca-item-container-item-key='" + prop + "'] fieldset").css("display", "").addClass("alpaca-fieldset-hidden");
                }
            }
        }
    }
    /*}else {
     for (var prop in dependientes) {
     if (dependientes[prop] === "field") {
     $("div[data-alpaca-item-container-item-key='" + prop + "'] span").removeClass("alpaca-fieldset-hidden").addClass("alpaca-fieldset-displayed");
     } else if (dependientes[prop] === "field") {
     $("div[data-alpaca-item-container-item-key='" + prop + "'] fieldset").removeClass("alpaca-fieldset-hidden").addClass("alpaca-fieldset-displayed");
     }
     }
     $("div[data-alpaca-item-container-item-key='cv_vendedor_nombre1'] span").addClass("alpaca-fieldset-hidden");
     $("div[data-alpaca-item-container-item-key='cv_verdadero_propietario'] span").addClass("alpaca-fieldset-hidden");
     $("div[data-alpaca-item-container-item-key='solicitud_registro_orip'] span").addClass("alpaca-fieldset-hidden");
     
     $("div[data-alpaca-item-container-item-key='solicitud_tipo_documento_respaldaderecho'] fieldset").addClass("alpaca-fieldset-hidden");
     
     $(e.parent.parent.childrenByPropertyId["cv_vendedor_nombre1"].field).val("");
     $(e.parent.parent.childrenByPropertyId["cv_verdadero_propietario"].field).val("");
     $(e.parent.parent.childrenByPropertyId["solicitud_registro_orip"].field).val("");
     
     for (var prop in e.parent.parent.childrenByPropertyId["solicitud_tipo_documento_respaldaderecho"].childrenByPropertyId) {
     $(e.parent.parent.childrenByPropertyId["solicitud_tipo_documento_respaldaderecho"].childrenByPropertyId[prop].field).prop('checked', false);
     }
     ;
     }*/
}