<%@page import="com.frmejia.backend.manager.UsuarioManager"%>
<% if (UsuarioManager.getTienePermisoSesion("53")) { %>
<script>
    function FormularioGraficoResolucionesMemorandosEliminarResolucion(resolucion_id, identificador) {
        if(gantt.hasChild(resolucion_id)){
            gantt.message({type: "error", text: "La resolucion tiene memorandos asociados"});
            return;
        }
        
        var modal_id = Math.random().toString(36).substring(7);

        var html = '<div id="dynamicModal-' + modal_id + '" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="confirm-modal" aria-hidden="true">';
        html += '<div class="modal-dialog">';
        html += '<div class="modal-content panel-warning">';
        html += '<div class="modal-header panel-heading">';
        html += '<a class="close" data-dismiss="modal">×</a>';
        html += '<h4>Desea eliminar la resolucion?</h4>';
        html += '</div>';
        html += '<div class="modal-footer">';
        html += '<span class="btn btn-default" data-dismiss="modal" id="btnEliminarResolucion">Aceptar</span>';
        html += '<span class="btn btn-default" data-dismiss="modal">Cancelar</span>';
        html += '</div>';  // footer
        html += '</div>';  // content
        html += '</div>';  // dialog
        html += '</div>';  // modalWindow
        $('body').append(html);
        $("#dynamicModal-" + modal_id).modal();
        $("#dynamicModal-" + modal_id).modal('show');

        $("#dynamicModal-" + modal_id).on('hidden.bs.modal', function (e) {
            $(this).remove();
        });

        $("#dynamicModal-" + modal_id).find("#btnEliminarResolucion").on('click', function (e) {
            var datos = {
                op: "Eliminar_Resolucion_desde_grafico",
                id: resolucion_id,
                IDENTIFICADOR: identificador
            };
            $.ajax({
                type: "POST",
                url: "GestionDML",
                dataType: "text",
                async: false,
                data: datos,
                success: function (response) {
                    if (response)
                    {
                        var res = eval('(' + response + ')');
                        if (res && res.total > 0) {
                            gantt.message("Resolución eliminada correctamente");
                            gantt.deleteTask(resolucion_id);
                        }
                    }
                }, error: function () {
                    gantt.message({type: "error", text: "No fué posible eliminar el nuevo memorando"});
                }
            });
        });
    }
</script>
<% }%>
