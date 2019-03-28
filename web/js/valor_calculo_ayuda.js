function valorContrato(obj) {
    var objeto = {
        op: 'valor_ayuda',
        identificador: $(obj).attr("id")
    };

    $.ajax({
        url: "GestionConsultas",
        type: 'POST',
        data: objeto,
        dataType: "text",
        success: function (result) {
            var jsonResult=  eval('(' + result + ')');
            console.log(jsonResult);
            console.log(jsonResult.data.length);
            $(obj).empty();
            if(jsonResult.data.length>0){
                $(obj).text($.number( jsonResult.data[0].valor, 0 ));
            }else{
                $(obj).text('0');                
            }
        }
    });
}
function valorCalculo(obj) {
    var objeto = {
        identificador: $(obj).attr("id"),
        op: 'valor_calculo'
    };
    
    $.ajax({
        url: "GestionConsultas",
        type: 'POST',
        data: objeto,
        dataType: "text",
        success: function (result) {
            var jsonResult=  eval('(' + result + ')');
            console.log(jsonResult);
            console.log(jsonResult.data.length);
            $(obj).empty();
            if(jsonResult.data.length>0){
                $(obj).text($.number( jsonResult.data[0].valor, 0 ));
            }else{
                $(obj).text('0');                
            }
        }
    });
}


