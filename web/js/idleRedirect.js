idleTime = 0;


//Increment the idle time counter every minute.
var idleInterval = setInterval("timerIncrement()", 60000); // 1 min

//Zero the idle timer on mouse movement.
document.onmousemove = function (e) {
    idleTime = 0;
};

document.onkeypress = function (e) {
    idleTime = 0;
};


function timerIncrement() {
    idleTime = idleTime + 1;
    if (idleTime > 60) { // 10 min
        var pn = window.location.pathname.split('/');
        window.location.href = "login.jsp?source=" + pn[pn.length - 1];
    }
}

var validarSesion = function () {
    /*
     $.ajax({
     type: "GET",
     url: "/Reasentamientos/webresources/ValidarSesion/confirmar",
     dataType: "json",
     data: {a:Math.random()},
     success: function (data, status, jqXHR) {
     console.log(data);
     if (!data.sesion) {
     window.location.href = '/Reasentamientos';
     }
     },
     error: function (jqXHR, status) {
     console.log("error cargando datso de sesion!");
     }
     });
     */
    var xhr = new XMLHttpRequest();
    xhr.onload = function (e) {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //var data = JSON.parse();
            var res = eval('(' + xhr.responseText + ')');
            
            if (res && res.data && res.data.length > 0) {
                $("#txtEstado").html('En linea<div style="display:inline;width:5px;padding:5px 11px;margin:0 auto;border:2px solid #a1a1a1;border-radius:25px;background-color:green;margin-left:10px">');
                //window.location.href = 'login.jsp?secondlogin=true';
            }
        }else{  
            $("#txtEstado").html('Fuera de línea!!!<div style="display:inline;width:5px;padding:5px 11px;margin:0 auto;border:2px solid #a1a1a1;border-radius:25px;background-color:red;margin-left:10px"></div>');
        }
    };

    xhr.open("GET", "GestionConsultas?op=consulta_estado_del_sistema&_a_=" + Math.random(), true);
    xhr.timeout = 5000;
    xhr.send(null);
};

setInterval(function () {
    validarSesion();
}, 5000);
 