/* 
    Document   : ToolBars
    Created on : 18/03/2012, 12:36:35 PM
    Author     :Maicol Camargo : mfcamargoh@gmail.com 
                Leonardo Cardona : leocardonapiedrahita@gmail.com
    Descripcion: Barra de herramientas que brinda el visor
 */

/************************* Acciones del Toolbar Agregadas al Mapa ****************************/
	
// Zoom to extent
action = new GeoExt.Action({
    control: new OpenLayers.Control.ZoomToMaxExtent(),
    map: map,
    allowDepress: false,
    group: "navControl",
    tooltip: "Zoom Extent",
    //iconCls: "zoomfull"
    icon:'imagenes/toolbar/zoom-full.png'
});
    
actions["max_extent"] = action;
toolbarItems.push(action);
    
identify =new OpenLayers.Control.WMSGetFeatureInfo({
    autoActivate: true,
    infoFormat: "application/vnd.ogc.gml",
    url: "../geoserver/Estaciones/wms",
    maxFeatures: 3,
    eventListeners: {
        "getfeatureinfo": function(e) {

            if(e.features.length > 0){

                //Etiqueta html formato
                var tag_html = "";

                var items = [];
                Ext.each(e.features, function(feature) {
                    items.push({
                        xtype: "propertygrid",
                        title: feature.fid,
                        source: feature.attributes
                    });

                    tag_html = "<iframe scrolling='auto' height='100%' frameborder='0' src='"+feature.attributes.FOLDER+"'></iframe>";
                });

                new GeoExt.Popup({
                    title: "Informacion Estaciones",
                    //maximizable: true,
                    collapsible: true,
                    layout: "accordion",
                    map: app.mapPanel,
                    location: e.xy,
                    height: 300,
                    //items: items
                    html: tag_html
                }).show();

            }
        }
    }
});

// Pan Map
action = new GeoExt.Action({
        
    control: identify,
    map: map,
    toggleGroup: "navControl",
    allowDepress: false,
    pressed: true,
    checked: true,
    tooltip: "Pan Map",
    group: "navControl",
    iconCls: "panMap",
    icon:'imagenes/toolbar/pan.png'
});
    
actions["nav"] = action;
toolbarItems.push(action);

// Zoom In
action = new GeoExt.Action({
    control: new OpenLayers.Control.ZoomBox({
        displayClass:'olControlZoomBoxActive'
    }),
    map: map,
    toggleGroup: "navControl",
    allowDepress: false,
    tooltip: "Zoom In",
    group: "navControl",
    iconCls: "zoomWindowIn",
    icon:'imagenes/toolbar/zoom-in.png'
});
    
actions["zoom_box"] = action;
toolbarItems.push(action);

// Zoom Out
action = new GeoExt.Action({
    control: new OpenLayers.Control.ZoomBox({
        out:true, 
        displayClass: 'olControlZoomBoxOut'
    }),
    map: map,
    toggleGroup: "navControl",
    allowDepress: false,
    tooltip: "Zoom Out",
    group: "navControl",
    iconCls: "zoomOut",
    icon:'imagenes/toolbar/zoom-out.png'
});
    
actions["zoom_out"] = action;
toolbarItems.push(action);
toolbarItems.push("-");

// Navigation history - two "button" controls
ctrl = new OpenLayers.Control.NavigationHistory();
map.addControl(ctrl);
    
// Zoom Previous
action = new GeoExt.Action({
    control: ctrl.previous,
    disabled: true,
    toggleGroup: "navControl",
    group: "navControl",
    tooltip: "Vista Atras",
    iconCls: "previousExtent",
    icon:'imagenes/toolbar/view-back.png'
});
    
actions["previous"] = action;
toolbarItems.push(action);
    
// Zoom Next
action = new GeoExt.Action({
    control: ctrl.next,
    disabled: true,
    toggleGroup: "navControl",
    group: "navControl",
    tooltip: "Vista Adelante",
    iconCls: "nextExtent",
    icon:'imagenes/toolbar/view-forward.png'
});
    
actions["next"] = action;
toolbarItems.push(action);
toolbarItems.push("-");
    
// Measure Distance
var Distancia= new OpenLayers.Control.Measure(OpenLayers.Handler.Path, {
    eventListeners: {
        measure: function(evt) {
            Ext.Msg.show({  
                title: 'Resultado',
                msg: 'La distancia es: '+ evt.measure.toFixed(3) + ' '+ evt.units,
                icon: Ext.MessageBox.INFO,
                buttons: Ext.MessageBox.OK,
                modal: false
            }); 
        }
    }
});
         
action = new GeoExt.Action({
    control: Distancia,     
    map: map,
    toggleGroup: "navControl",
    group: "navControl",
    tooltip: "Medir distancia",
    iconCls: "measureDist",
    icon:'imagenes/toolbar/measure.png'
});
    
actions["measure_distance"] = action;
toolbarItems.push(action);

// Measure Area
var area= new OpenLayers.Control.Measure(OpenLayers.Handler.Polygon,
{
    displayClass: 'olControlMeasureArea', 
            
    eventListeners: {
        measure: function(evt) {
					
            Ext.Msg.show({  
                title: 'Resultado',
                msg: 'El \xE1rea es: '+ evt.measure.toFixed(3) + ' '+ evt.units +'2',
                icon: Ext.MessageBox.INFO,
                buttons: Ext.MessageBox.OK,
                modal: false
            });  
        }
    }
});
         
action = new GeoExt.Action({
    //text: "measure area",
    control: area,     
    map: map,
    toggleGroup: "navControl",
    group: "navControl",
    tooltip: "Medir Area",
    iconCls: "measureArea",
    icon:'imagenes/toolbar/tool-measure.png'
});
    
actions["measure_area"] = action;
toolbarItems.push(action);
toolbarItems.push("-");

/************************* Otras herramientas del mapa ***********************/
    
//Poligono
action = new GeoExt.Action({
    //text: "draw poly",
    icon:'imagenes/toolbar/Poligono.png',
    control: new OpenLayers.Control.DrawFeature(
        vector, OpenLayers.Handler.Polygon
        ),
    map: map,
    toggleGroup: "navControl",
    group: "navControl",
    tooltip: "Dibujar Poligono"
});
actions["draw_poly"] = action;
toolbarItems.push(action);

//Linea
action = new GeoExt.Action({
    //text: "draw line",
    icon:'imagenes/toolbar/Linea.png',
    control: new OpenLayers.Control.DrawFeature(
        vector, OpenLayers.Handler.Path
        ),
    map: map,
    toggleGroup: "navControl",
    group: "navControl",
    tooltip: "Dibujar Linea"

});
actions["draw_line"] = action;
toolbarItems.push(action);
    
//Punto
action = new GeoExt.Action({
    //text: "draw point",
    icon:'imagenes/toolbar/Punto.png',
    control: new OpenLayers.Control.DrawFeature(
        vector, OpenLayers.Handler.Point),
    map: map,
    tooltip: "Dibujar Punto",
    toggleGroup: "navControl",
    group: "navControl"
});
actions["draw_point"] = action;
toolbarItems.push(action);
toolbarItems.push("-");
    
// Dibujar Puntos a partir de Coordenadas (x,y)
							
var verticesPuntos =function () {
				 
    var x =  Ext.Element.get('coordx-punto').getValue();
    var y  = Ext.Element.get('coordy-punto').getValue();
    var point = new OpenLayers.Geometry.Point(x, y);
    vertices.push(point);
    formPunto.getForm().reset();
}
var dibujarPuntos= function ()
{
    var puntos= new OpenLayers.Geometry.MultiPoint(vertices);
    var pointFeature = new OpenLayers.Feature.Vector(puntos);
    vector.addFeatures(pointFeature);
    map.addLayer(vector);   
    vertices.splice(0,vertices.length);
    win.close();
}    
            
/*            
var Puntoxy= function(){
    var coordy = new Ext.form.TextField({
        id:'coordy-punto',
        fieldLabel: 'Coordenada Y',
        name: 'coordenada-Y',
        emptyText:'ej: 4.64007...',
        anchor:'95%'
    });
							
    var coordx = new Ext.form.TextField({
        id:'coordx-punto',
        fieldLabel: 'Coordenada X',
        name: 'coord-X',
        emptyText:'ej: -74.08093...',
        anchor:'95%'
    });
    formPunto = new Ext.FormPanel({
        frame:true,
        monitorValid:true,
        bodyStyle:'padding:5px 5px 0',
        width: 250,
        items: [coordx,coordy],
        buttons:
        [{
            text:'Agregar Vertice',
            handler:verticesPuntos,
            formBind:true
        },
        {
            text:'Dibujar Punto(s)',
            handler:dibujarPuntos,
            formBind:true
        }]
    })
    win = new Ext.Window({
        title: 'Agregar Punto a partir de Coordenadas',  
        width:300, 
        height:150, 
        layout: 'fit',  
        bodyStyle:'background-color:#fff;',   
        plain: true,
        items: [formPunto]
    });

    win.show();
			
}
// Dibujar Linea a partir de Coordenadas (x,y)
    
var verticesLinea =function () {
				 
    var x =  Ext.Element.get('coordx-linea').getValue();
    var y  = Ext.Element.get('coordy-linea').getValue();
    var point = new OpenLayers.Geometry.Point(x, y);
    vertices.push(point);
    formLinea.getForm().reset();
}
			
var dibujarLinea= function ()
{
    if (vertices.length>=2)
    {
        var vertLinea = new OpenLayers.Geometry.LineString(vertices);
        var linea = new OpenLayers.Feature.Vector(vertLinea);
        vector.addFeatures(linea);
        map.addLayer(vector);   
        vertices.splice(0,vertices.length);
        win.close();
    }  
    else {
        Ext.Msg.show({  
            title: 'Advertencia',
            msg: 'Para dibujar una linea es necesario agregar minimo 2 vertices',
            icon: Ext.MessageBox.INFO,
            buttons: Ext.MessageBox.OK,
            modal: false
        });
    }
}  
            
var Lineaxy= function(){
    var coordy = new Ext.form.TextField({
        id:'coordy-linea',
        fieldLabel: 'Coordenada Y',
        name: 'coordenada-Y',
        emptyText:'ej: 4.64007...',
        anchor:'95%'
    });
							
    var coordx = new Ext.form.TextField({
        id:'coordx-linea',
        fieldLabel: 'Coordenada X',
        name: 'coord-X',
        emptyText:'ej: -74.08093...',
        anchor:'95%'
    });
    formLinea = new Ext.FormPanel({
        frame:true,
        bodyStyle:'padding:5px 5px 0',
        width: 250,
        items: [coordx,coordy]
    })
    win = new Ext.Window({
        title: 'Agregar Linea a partir de Coordenadas',  
        width:300, 
        height:150, 
        layout: 'fit',  
        bodyStyle:'background-color:#fff;',   
        plain: true,
        items: [formLinea],
        buttons:
        [{
            text:'Agregar Vertice',
            handler:verticesLinea
        },
        {
            text:'DibujarLinea',
            handler:dibujarLinea
        }]
    });

    win.show();
			
}
					
// Dibujar Poligono a partir de Coordenadas (x,y)
    
var verticesPoly =function () {
				 
    var x =  Ext.Element.get('coordx-poly').getValue();
    var y  = Ext.Element.get('coordy-poly').getValue();
    var point = new OpenLayers.Geometry.Point(x, y);
    vertices.push(point);
    formPoly.getForm().reset();
}
var dibujarPoly= function ()
{
    if (vertices.length>=3)
    {
        var vertPoly = new OpenLayers.Geometry.LinearRing(vertices);
        var poly = new OpenLayers.Feature.Vector(vertPoly);
        vector.addFeatures(poly);
        map.addLayer(vector); 
        vertices.splice(0,vertices.length); 
        win.close();
    }
    else {
        Ext.Msg.show({  
            title: 'Advertencia',
            msg: 'Para dibujar un Poligono es necesario agregar minimo 3 vertices',
            icon: Ext.MessageBox.INFO,
            buttons: Ext.MessageBox.OK,
            modal: false
        });
    } 
}    
            
var Polyxy= function(){
    var coordy = new Ext.form.TextField({
        id:'coordy-poly',
        fieldLabel: 'Coordenada Y',
        name: 'coordenada-Y',
        emptyText:'ej: 4.64007...',
        anchor:'95%'
    });
							
    var coordx = new Ext.form.TextField({
        id:'coordx-poly',
        fieldLabel: 'Coordenada X',
        name: 'coord-X',
        emptyText:'ej: -74.08093...',
        anchor:'95%'
    });
    formPoly = new Ext.FormPanel({
        frame:true,
        bodyStyle:'padding:5px 5px 0',
        width: 250,
        items: [coordx,coordy]
    })
    win = new Ext.Window({
        title: 'Agregar Poligono a partir de Coordenadas',  
        width:300, 
        height:150, 
        layout: 'fit',  
        bodyStyle:'background-color:#fff;',   
        plain: true,
        items: [formPoly],
        buttons:
        [{
            text:'Agregar Vertice',
            handler:verticesPoly
        },
        {
            text:'Dibujar Poligono',
            handler:dibujarPoly
        }]
    });

    win.show();
			
}
					
// Se agrega un menu en el toolbar con las herramientas de coordenadas de punto, linea y poligono
					
toolbarItems.push({  
		 
    text: "(x,y)",
    tooltip:'Drawing Features',
    icon:'imagenes/pencil.png',
    menu: new Ext.menu.Menu({
        items: [{
            text:'Punto (x,y)',
            icon:'imagenes/images/pointXY (1).png',
            handler: Puntoxy
        },
        {
            text:'Linea (x,y)',
            icon:'imagenes/img/bezierappend.png',
            handler: Lineaxy
        },
        {
            text:'Poligono (x,y)',
            icon:'imagenes/img/bezierinsert.png',
            handler: Polyxy
        }]
    })
        
});
*/