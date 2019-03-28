/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$num_radicados = 0;
$cdp = '';
var resoluciones = [];
var identificadores = [];

function agregarCrp() {
    if ($('#identificador').val() !== '' && $('#resolucion').val() !== '') {
        $num_radicados++;
        $cdp = $('#cdp').val();
        $crp_identificador = $('#identificador').val();
        $crp_num_resolucion = $('#resolucion').val();
        resoluciones.push($crp_num_resolucion);
        identificadores.push($crp_identificador);
        $info_crp = '<tr><td align="center"><input type="checkbox"></td><td align="center">' + $crp_identificador + '</td><td align="center">' + $crp_num_resolucion + '</td></tr> ';
        $('#radicados').append($info_crp);
        $('#identificador').val('');
        $('#resolucion').val('');
    }
    if ($('#cdp').val() !== '') {
        $('#cdp').attr('disabled', true);
    } else {
        $('#cdp').attr('disabled', false);
    }
    if ($num_radicados >= 1) {
        $('#btn_gen').removeClass('disabled');
        $('#btn_eliminar').removeClass('disabled');
    }
}
function eleminarSeleccion() {
    try {
        $seleccionados = $('#radicados').find('input:checked');
        $.each($seleccionados, function (index, obj) {
            $num_radicados--;
            $(obj).parent().parent().remove();
            $columnas = $(obj).parent().parent().find('td');
            $resol = $columnas[3];
            $identi = $columnas[2];
            resoluciones.splice(resoluciones.indexOf($($resol).html()), 1);
            identificadores.splice(identificadores.indexOf($($identi).html()), 1);
        });
        if ($num_radicados === 0) {
            $('#btn_gen').addClass('disabled');
            $('#btn_eliminar').addClass('disabled');
            $('#cdp').attr('disabled', false);
        }


    } catch (e) {
        alert(e);
    }
}
function generarArchivo() {
    $res = resoluciones.join("','");
    $ids = identificadores.join("','");





    $.ajax({
        type: "POST",
        url: "GestionConsultas",
        dataType: "text",
        async: false,
        data: {
            op: "csv_op",
            cdp: $cdp,
            resoluciones: $res,
            identificadores: $ids
        },
        success: function (response) {
            if (response)
            {
                var resp = eval('(' + response + ')');
//                alert(resp.data[0]);
                JSONToCSVConvertor(resp.data, 'crp', true);
            }
        }
    });


}


function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData !== 'object' ? JSON.parse(JSONData) : JSONData;

    var CSV = '';
    //Set Report title in first row or line

    CSV += ReportTitle + '\r\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";

        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {

            //Now convert each value to string and comma-seprated
            row += index + ',';
        }

        row = row.slice(0, -1);

        //append Label row with line break
        CSV += row + '\r\n';
    }

    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";

        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);

        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV === '') {
        alert("Invalid data");
        return;
    }

    //Generate a file name
    var fileName = "radicados_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g, "_");
    var d = new Date();
    var time = d.getDate() + "-" + (d.getMonth()+1) + "-" + d.getFullYear()+"-"+d.getHours()+"-"+d.getMinutes();
    fileName += time;

    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    

    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");
    link.href = uri;

    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";

    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
