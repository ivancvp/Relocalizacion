var FormularioRevisionRelocalizacion_Schema = {
    "title": "REVISION PARA ASIGNAR LA AYUDA TEMPORAL PARA RELOCALIZACION TRANSITORIA",
    "type": "object",
    "properties": {
        "token": {
            "type": "string"
        },
        "beneficiario_nombre": {
            "title": "Nombre del Beneficiario:",
            "type": "string",
            "readonly": true
        },
        "beneficiario_cedula": {
            "title": "Cédula del Beneficiario:",
            "type": "string",
            "readonly": true
        },
        "existencia_carpetas": {
            "title": "Existencia de soportes físicos",
            "type": "object",
            "properties": {
                "existe_carpeta_reas": {
                    "type": "boolean"
                },
                "existe_carpeta_reloca": {
                    "type": "boolean"
                },
                "existe_contrato_revision": {
                    "type": "boolean"
                }
            }
        },
        "identificador_reas": {
            "title": "Identificador REAS:",
            "type": "string",
            "required": true
        },
        "contrato_fecha_inicio": {
            "title": "Fecha de inicio del contrato:",
            "format": "date"
        },
        "contrato_fecha_final": {
            "title": "Fecha de finalización del contrato:",
            "format": "date"
        },
        "contrato_anterior_vigente": {
            "title": "Existe contrato anterior vigente?",
            "type": "string",
            "enum": ["true", "false"]
        },
        "contrato_ant_arrendador_diferente": {
            "title": "En ese contrato aparece un arrendador Diferente?",
            "type": "string",
            "enum": ["true", "false"]
        },
        "contrato_ant_fecha": {
            "title": "Fecha de finalización Último Contrato:",
            "format": "date"
        },
        "contrato_ant_soporte_acta_finalizacion": {
            "type": "boolean"
        },
        "poblacion": {
            "title": "Población:",
            "enum": ["1", "2", "3", "4"]
        },
        "identificador_observaciones": {
            "title": "Obsevaciones del expediente:",
            "type": "string"
        },
        "documentos_soporte": {
            "title": "Documentos de Soporte",
            "type": "object",
            "properties": {
                "docs_soporte_arrendatario": {
                    "title": "Arrendatario",
                    "type": "string",
                    "enum": ["Cumple", "No cumple"]
                },
                "docs_soporte_arrendador": {
                    "title": "Arrendador",
                    "type": "string",
                    "enum": ["Cumple", "No cumple"]
                },
                "docs_soporte_apoderado": {
                    "title": "Apoderado",
                    "type": "string",
                    "enum": ["Cumple", "No cumple"]
                },
                "docs_soporte_observaciones": {
                    "title": "Observaciones",
                    "type": "string"
                }
            }
        },
        "contraste_documentos": {
            "title": "Contraste documento de identidad",
            "type": "object",
            "properties": {
                "contraste_ids_arrendatario": {
                    "title": "Arrendatario",
                    "type": "string",
                    "enum": ["Cumple", "No cumple"]
                },
                "contraste_ids_arrendador": {
                    "title": "Arrendador",
                    "type": "string",
                    "enum": ["Cumple", "No cumple"]
                },
                "contraste_ids_apoderado": {
                    "title": "Apoderado",
                    "type": "string",
                    "enum": ["Cumple", "No cumple"]
                },
                "contraste_ids_observaciones": {
                    "title": "Observaciones",
                    "type": "string"
                }
            }
        },
        "contraste_titularidad": {
            "title": "Contraste documento de identidad",
            "type": "object",
            "properties": {
                "contraste_titulari_arrendatario": {
                    "title": "Arrendatario",
                    "type": "string",
                    "enum": ["Cumple", "No cumple"]
                },
                "contraste_titulari_observaciones": {
                    "title": "Observaciones",
                    "type": "string"
                }
            }
        },
        "propiedad_predio": {
            "title": "Propiedad del predio en arriendo",
            "type": "object",
            "properties": {
                "cert_tradi_arrendador": {
                    "title": "Certificado de tradicion y libertad Arrendador",
                    "type": "string",
                    "enum": ["Cumple", "No cumple"]
                },
                "calidad_arrendador": {
                    "title": "Calidad del Arrendador",
                    "type": "string",
                    "enum": ["Propietario", "Poseedor"]
                },
                "predio_arrendar_direccion": {
                    "title": "Dirección del predio a arrendar",
                    "type": "string",
                    "enum": ["Corresponde", "No corresponde"]
                },
                "predio_arrendar_vuc_direccion": {
                    "title": "Dirección alternativa VUC",
                    "type": "string",
                    "enum": ["Corresponde", "No corresponde"],
                    "dependencies": "predio_arrendar_direccion"
                },
                "predio_arrendar_limitaciones": {
                    "title": "Limitaciones de dominio",
                    "type": "string",
                    "enum": ["true", "false"]
                },
                "predio_arrendar_observaciones": {
                    "title": "Observaciones",
                    "type": "string"
                }
            }
        },
        "certificacion_bancaria": {
            "title": "Certificación Bancaria",
            "type": "object",
            "properties": {
                "certi_bancaria_poder": {
                    "title": "Existe Poder",
                    "type": "string",
                    "enum": ["true", "false"]
                },
                "certi_banc_arrendador_nombre": {
                    "title": "Nombre del arrendador",
                    "type": "string",
                    "enum": ["Cumple", "No cumple"],
                    "dependencies": "certi_bancaria_poder"
                },
                "certi_banc_arrendador_numero": {
                    "title": "Número de cuenta del arrendador",
                    "type": "string",
                    "enum": ["Cumple", "No cumple"],
                    "dependencies": "certi_bancaria_poder"
                },
                "certi_banc_arrendador_banco": {
                    "title": "Banco del arrendador",
                    "type": "string",
                    "enum": ["Cumple", "No cumple"],
                    "dependencies": "certi_bancaria_poder"
                },
                "certi_banc_apoderado_poder": {
                    "title": "Poder",
                    "type": "string",
                    "enum": ["Cumple", "No cumple"],
                    "dependencies": "certi_bancaria_poder"
                },
                "certi_banc_apoderado_nombre": {
                    "title": "Nombre del Apoderado",
                    "type": "string",
                    "enum": ["Cumple", "No cumple"],
                    "dependencies": "certi_bancaria_poder"
                },
                "certi_banc_apoderado_numero": {
                    "title": "Número de cuenta del Apoderado",
                    "type": "string",
                    "enum": ["Cumple", "No cumple"],
                    "dependencies": "certi_bancaria_poder"
                },
                "certi_banc_apoderado_banco": {
                    "title": "Banco del Apoderado",
                    "type": "string",
                    "enum": ["Cumple", "No cumple"],
                    "dependencies": "certi_bancaria_poder"
                },
                "certi_banc_observaciones": {
                    "title": "Observaciones",
                    "type": "string"
                }
            }
        },
        "estudio_documentos": {
            "title": "Estudio de documentos",
            "type": "object",
            "properties": {
                "estudio_docs_positivo": {
                    "title": "Estudio positivo?",
                    "type": "string",
                    "enum": ["true", "false"]
                },
                "estudio_docs_adenda": {
                    "title": "Adenda",
                    "type": "string",
                    "enum": ["true", "false"],
                    "dependencies": "estudio_docs_positivo"
                },
                "estudio_docs_aden_positivo": {
                    "title": "Adenda Positiva?",
                    "type": "string",
                    "enum": ["true", "false"],
                    "dependencies": "estudio_docs_adenda"
                }
            }
        },
        "estudio_documen_511": {
            "title": "Estudio de documentos 511",
            "type": "object",
            "properties": {
                "estudio_docs_511_positivo": {
                    "title": "Estudio positivo?",
                    "type": "string",
                    "enum": ["true", "false"]
                },
                "estudio_docs_511_adenda": {
                    "title": "Adenda",
                    "type": "string",
                    "enum": ["true", "false"],
                    "dependencies": "estudio_docs_511_positivo"
                },
                "estudio_docs_511_aden_positivo": {
                    "title": "Adenda Positiva?",
                    "type": "string",
                    "enum": ["true", "false"],
                    "dependencies": "estudio_docs_511_adenda"
                }
            }
        },
        "estudio_docs_observaciones": {
            "title": "Obsevaciones de los estudios de documentos:",
            "type": "string"
        },
        "valor_contrato": {
            "title": "Valor contrato",
            "type": "object",
            "properties": {
                "aplicacion_740": {
                    "title": "Formato \"Aplicación resolución 740 de 2015\"",
                    "type": "string",
                    "enum": ["true", "false"]
                },
                "acta_evacuacion_idiger": {
                    "title": "Acta de evacuación IDIGER",
                    "type": "string",
                    "enum": ["true", "false"],
                    "dependencies": "aplicacion_740"
                },
                "aplicac_740_observaciones": {
                    "title": "Obsevaciones valor del contrato:",
                    "type": "string"
                }
            }
        },
        "seleccion_de_vivienda": {
            "title": "Seleccion de vivienda",
            "type": "object",
            "properties": {
                "seleccion_vivienda": {
                    "title": "Hay Selección de vivienda",
                    "type": "string",
                    "enum": ["true", "false"]
                },
                "selec_vivien_tipo": {
                    "title": "Tipo de vivienda",
                    "type": "string",
                    "enum": ["Nueva", "Usada"],
                    "dependencies": "seleccion_vivienda"
                },
                "selec_vivien_desistimiento": {
                    "title": "Desistimiento",
                    "type": "string",
                    "enum": ["true", "false"],
                    "dependencies": "seleccion_vivienda"
                },
                "selec_vivien_fecha_seleccion": {
                    "title": "Fecha de Selección:",
                    "format": "date",
                    "dependencies": "seleccion_vivienda"
                },
                "selec_vivien_proyecto": {
                    "title": "Proyecto de vivienda:",
                    "enum": ["2", "3", "1", "9", "11", "10", "5", "12", "6", "4", "7", "8"],
                    "dependencies": "selec_vivien_tipo"
                },
                "selec_vivien_fecha_entrega": {
                    "title": "Fecha estimada de entrega:",
                    "format": "date",
                    "dependencies": "selec_vivien_tipo"
                },
                "contrato_primer_cont_fecha": {
                    "title": "Fecha del Primer contrato de relocalización:",
                    "format": "date"
                },
                "selec_viven_observaciones": {
                    "title": "Obsevaciones de la seleccion de vivienda:",
                    "type": "string"
                }
            }
        },
        "acta_par": {
            "title": "Acta de entrega PAR",
            "type": "object",
            "properties": {
                "acta_entrega_par": {
                    "title": "Acta de entrega PAR",
                    "type": "string",
                    "enum": ["true", "false"]
                },
                "acta_entre_par_fecha": {
                    "title": "Fecha de entrega PAR:",
                    "format": "date",
                    "dependencies": "acta_entrega_par"
                },
                "acta_entre_par_observaciones": {
                    "title": "Observaciones",
                    "type": "string"
                }
            }
        },
        "acta_verificacion_traslado": {
            "title": "Verificación de traslado",
            "type": "object",
            "properties": {
                "traslado_acta_verificacion": {
                    "title": "Acta de verificación de traslado a predio de reposición definitivo",
                    "type": "string",
                    "enum": ["true", "false"]
                },
                "traslado_fecha": {
                    "title": "Fecha de traslado:",
                    "format": "date",
                    "dependencies": "traslado_acta_verificacion"
                },
                "traslado_observaciones": {
                    "title": "Obsevaciones del traslado:",
                    "type": "string"
                }
            }
        },
        "rev_reloca_usuario": {
            "title": "Profesional que revisa:",
            "type": "string",
            "enum": ["ALEJANDRA CAROLINA DAZA F.", "ALEJANDRO DE JESUS RESTREPO TOBON", "ALEXANDER RONCANCIO", "ALVARO ALFONSO RIOS CABAS", "ANA ELVIRA PENAGOS LOPEZ", "ANGELICA MARIA ACOSTA", "AUGUSTO ENRIQUE CASTRO CORTES", "BAIRON SANCHEZ CUENCA", "BRAHIAM FERNANDO QUINTANA MARTINEZ", "CARLOS ENRIQUE RUIZ PATIÑO", "CLARA INES JIMENEZ TRUJILLO", "CLAUDIA BLANCO VELANDIA", "CLAUDIA MARCELA LOPEZ UPEGUI", "CLAUDIA MILISA MENDEZ VILLAMIZAR", "CONSUELO ORTIZ RUBIO", "DANIEL GARAVITO", "DASSY MAYERLY VERA  ROSAS", "DAVID ESTEBAN CORDOBA ARIZA", "DIANA ALEJANDRA PEÑA PEÑA", "DIANA ELIZABETH VELASCO MARTIN", "DIEGO IVAN SANCHEZ LARROTTA", "DILIA GISELA ROZO BARAJAS", "EDILBERTO BARON CALDERON", "EDITH GOMEZ BAUTISTA", "EDWIN ALEXANDER CASTELLANOS CARDENAS", "EDWIN JONATHAN AROCA OSMA", "FREDDY NANCLARES", "FREDDY YOVANNY LARA MENDIETA", "GERMAN PEREZ FORERO", "HAIDY JOHANA ARANGO", "JAIME GABRIEL GONZALEZ GAMBOA", "JAIRO DAVID ARIAS GONZALEZ", "JONATHAN LEONARDO SILVA RIVERA", "JORGE LUIS TEJADA", "JORGE RENE MORA DIAZ", "JOSE ALEXANDER BOLAÑOS CASTEBLANCO", "JOSE DOMINGO GRACIA", "JUAN ANDRES MARTINEZ SUESCUN", "KATERINE CALDERON PARRADO", "LEIDY BRIGITT  MOSQUERA CAUCALI", "LEIDY CONSTANZA VILLARRAGA JOYA", "LORETTA COIA", "LUZ ANGELA RODRIGUEZ SUAREZ", "LUZ YAZMIN HERNANDEZ BUITRAGO", "MAIRA VALLEJO", "MARCELA GONZALEZ ECHEVERRY", "MARIA MARGARITA CHAVEZ RODRIGUEZ", "MARIA MERCEDES LAVERDE GONZALEZ", "MARTHA CAROLINA RUBIO", "MAYERLINE MOLANO MURCIA", "MICHAEL STRAUSS QUINTERO", "MIGUEL ALFONSO DÍAZ", "MILDRED ROCIO MENDEZ BOHORQUEZ", "MIRIAM BEATRIZ LORA ZUÑIGA", "NATALIA GARZON MORENO", "NIDIA DURAN MELO", "OLGA LUCIA GODOY", "OLGA LUCIA LEAL", "OLGA LUCIA PORRAS GIRALDO", "OSCAR FELIPE MARLES", "PEDRO VICENTE CONTRERAS", "RAFAEL PRIETO SUAREZ", "RICARDO ANTONIO SANCHEZ SANCHEZ", "SANDRA XIMENA PEÑAFORD LOPEZ", "SINDY RONCANCIO", "SOBEYDA ACOSTA", "WILLIAM RAMIREZ CARREÑO", "YESICA ANDREA ACHURY", "YESID DANILO MANCERA MANCERA", "YILDIER FLOREZ", "YULIETH ANDREA PIRAJAN MURCIA"],
            //"required": true
            "disallow": ["No aplica", "y vacío", ""]
        },
        "rev_reloca_usr_cargo": {
            "title": "Cargo:",
            "type": "string",
            "required": true
        }
    }
};