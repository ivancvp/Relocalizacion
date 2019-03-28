function loadTutorials() {
//    $.getJSON("../js/Plugins/tutorial/tutorial.json", function(data) {
//        $.each(data["tutoriales"], function(key, val) {
//            if ($(key).length > 0) {
//                loadTutorial(val);
//                addBoton();
//                $(".verTutorial").on("click", function() {
//                    introJs().start();
//                });
//            }
//        });
//    });
}

function loadTooltips() {
    $.getJSON("../js/Plugins/tutorial/tooltips.json", function(data) {
        $.each(data, function(k, info) {
            var obj = $(info["selector"]);
            if (obj !== undefined && obj.length > 0) {
                loadTooltip(obj, info);
            }
        });
    });
}

function addBoton() {
    if ($("#verTutorial").length <= 0) {
        $(".verTutorialBtn").append("<span id='verTutorial' class='verTutorial'><img src='../js/Plugins/tutorial/Apps-demo-icon.png' />Ver tutorial</span>");
    }

}
function loadTutorial(config) {
    var i = 1;
    $.each(config, function(key, val) {
        var obj = $(val["selector"]);
        if (obj !== undefined && obj.length > 0) {
            obj.attr("data-step", i);
            obj.attr("data-intro", val["texto"]);
            i++;
        }
    });
}

function loadTooltip(obj, info) {
    obj.addClass("oTooltipster");
    obj.tooltipster({
        content: $('<div>' + info["tooltip"] + '</div>'),
        theme: 'tooltipster-light',
        trigger: "custom",
        multiple: true
    });
    obj.find("input, select").focusin(function() {
        console.log("Focus: " + $(this).attr("name"));
        try {
            $(this).tooltipster('show');
        } catch (e) {
            $(this).parents("div.oTooltipster").first().css("background", "#e7ffeb").tooltipster('show');
        }
    });
    obj.find("input, select").focusout(function() {
        try {
            $(this).tooltipster('hide');
        } catch (e) {
            $(this).parents("div.oTooltipster").first().css("background", "#ffffff").tooltipster('hide');
        }
    });
}
