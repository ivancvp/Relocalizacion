
function estadoNovedad(id_componente, identificador) {
    identificador = identificador || '';

    var objeto = {
        'op': 'estado_novedad',
        'identificador': identificador
    };
    $.ajax({
        type: "POST",
        url: "GestionConsultas",
        dataType: "text",
        async: false,
        data: objeto,
        success: function (response) {
            if (response) {
                var res = eval('(' + response + ')');
                if (res && res.total > 0) {
                    $("#" + id_componente).find("#info").empty();
                    $("#" + id_componente).append("<table id=\"nov_table\" class=\"table table-striped\"> <thead><tr><th>Identificador</th> <th>Cordis</th> <th>Cordis Salida </th> <th>Usuario</th> <th>Actividad</th>  <!--<th></th>--></tr> </thead> <tbody id=\"info\"></tbody></table>");
                    
                    for (var i = 0; i < res.data.length; i++) {
//                        console.log( res.data[i]);
                        var salida=res.data[i].cordis_salida?res.data[i].cordis_salida:"no ingresado";
                        $("#" + id_componente).find("#info").append(
                                '<tr align="center">' +
                                '<td>' +
                                res.data[i].identificador +
                                '</td>' +
                                '<td>' +
                                res.data[i].cordis_entrada +
                                '</td>' +
                                '<td>' +
                                salida +
                                '</td>' +
                                '<td>' +
                                res.data[i].usuario_nombre +
                                '</td>' +
                                '<td>' +
                                res.data[i].tiact_desc +
                                '</td>'
                                );

                    }

                }
            }
            //                $(".details-" + rowId).find("#" + contenedor_id).find("#infoPagos").find('#pagos').dataTable();

        }, error: function (e) {
            alert("No fué posible consultar:" + e);
        }
    });
    $('#nov_table').dataTable();
}