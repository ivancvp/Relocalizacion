(function ($) { 
    $.Notificacion = function (element) { 
        this.modal = (element instanceof $) ? element : $(element); 
        $(document).append("<!-- Modal --><div class='modal fade' id='notificacionModal' tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'>\n\
                              <div class='modal-dialog' role='document'>    <div class='modal-content'>      <div class='modal-header'>        <h5 class='modal-title' id='exampleModalLabel'>Notificación de Resolución</h5>        <button type='button' class='close' data-dismiss='modal' aria-label='Close'>          <span aria-hidden='true'>&times;</span>        </button>      </div>      \n\
                                <div class='modal-body'><form class='form' role='form' data-toggle='validator'>  <p></p><h4></h4><p></p>  <div class='form-group'>    <label class='control-label' for='fecha'>Fecha de notificación</label>    <input class='form-control datepicker hasDatepicker' id='fecha' placeholder='dd/mm/yyyy' required='' value='01/05/2016'>  </div> <hr class='separator'>  <div class='form-group'>    <label for='estadoSelector'>Usuario que notifica:</label>  <select class='form-control' id='usuariosSelector' required=''></select>  </div></form>/div>\n\
                                <div class='modal-footer'>        \n\
                              <button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>\n\
                              <button type='button' id='salvarNotificacion' class='btn btn-primary salvarNotificacion'>Salvar notificación</button>      </div>    </div>  </div></div>");
    };
    $.Notificacion.prototype = {
        InitEvents: function () {         
            var that = this;            
            $(document).on('click','.salvarNotificacion',function (e) {
               
            });          
        },      
        guardarNotificacion: function () {
          
        },
    };


    $.Notificacion.defaultOptions = {           
       this.modal.cuerpo=$(document).find('#notificacionModal'); 
    };

}(jQuery));


