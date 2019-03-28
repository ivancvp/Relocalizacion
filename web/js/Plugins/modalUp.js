(function ($) {

    $.fn.modalup = function (options) {
        // ModalUp's default settings:        
        var defaults = {
            id: "modalup",
            tittle: "Hello ModalUP",
            closeHeader: true,
            closeButton: true,
            closeButtonName: "Close",
            functionButton: true,
            functionButtonName: "Do something",
            body: "<h2>Hello world</h2>",
            callback: function () {

            },
            modalSettings: {
                class: "modal fade",
                id: "modalup"
            },
            dialogSettings: {
                class: "modal-dialog",
                role: "document"
            },
            headerSettings: {
                class: "modal-header"
            },
            containerSettings: {
                class: "modal-content"
            },
            footerSettings: {
                class: "modal-footer"
            },
            bodySettings: {
                class: "modal-body"
            },
            functionButtonSettings: {
                class: "btn btn-primary"                
            },
            closeButtonSettings: {
                'data-dismiss': "modal",
                class: "btn btn-secondary"
            },
            closeHeaderSettings: {
                class: "close",
                'data-dismiss': "modal",
                'aria-label': "Close"
            },
            modalCSS: {
            },
            containerCSS: {
            },
            dialogCSS: {
            },
            headerCSS: {
            },
            footerCSS: {
            },
            bodyCSS: {
            },
            functions:{}
        };
        var settings = $.extend({}, defaults, options);

//        Adding modal to body page or open modal;      
        if (!$('#' + settings.id).length) {
            // Contenedores del modal(Modal Containers):
            var modal = $("<div />")
                    .attr(settings.modalSettings)
                    .css(settings.modalCSS);

            var dialog = $("<div />")
                    .attr(settings.dialogSettings)
                    .css(settings.dialogCSS)
                    .appendTo(modal);
            var modalContainer = $("<div />")
                    .attr(settings.containerSettings)
                    .css(settings.containerCSS)
                    .appendTo(dialog);

            var modalHeader = $("<div />")
                    .attr(settings.headerSettings)
                    .css(settings.headerCSS)
                    .appendTo(modalContainer);

            var modalBody = $("<div />")
                    .attr(settings.bodySettings)
                    .css(settings.bodyCSS)
                    .appendTo(modalContainer);
            var modalFooter = $("<div />")
                    .attr(settings.footerSettings)
                    .css(settings.footerCSS)
                    .appendTo(modalContainer);

//      Elementos del modal(Modal elements)
//      
//      Elementos de la cabecera(Header Elements)
            if (settings.closeHeader) {
                var closeHeaderButton = $("<button />")
                        .attr(settings.closeHeaderSettings)
                        .appendTo(modalHeader);
            }
            var titleHeader = $("<h3 />")
                    .text(settings.tittle)
                    .appendTo(modalHeader);


//      Elementos del pie de pagina(footer elements)
            if (settings.closeButton) {
                var closeFooterButton = $("<button />")
                        .attr(settings.closeButtonSettings)
                        .text(settings.closeButtonName)
                        .appendTo(modalFooter);

            }
            var call=function(){
                settings.callback(this);
            };
            if (settings.functionButton) {
                var functionFooterButton = $("<button />")
                        .attr(settings.functionButtonSettings)
                        .text(settings.functionButtonName)
                        .click(call)
                        .appendTo(modalFooter);
            }
//        Elementos del cuerpo del modal (Body elements)
            $(modalBody).append(settings.body);

            $(this).parent('body').append(modal);
//            adding functions to modal body
            
            $.each(settings.functions,function(name,funct){
                $(modalBody).on('click','#'+name,funct); 
                console.log(funct);
            });
           
            $(modal).modal('show');
            
        } else {
            $('#' + settings.id).modal('show');
        }
    };

}(jQuery));

