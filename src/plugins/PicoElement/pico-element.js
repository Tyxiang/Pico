function pico_element_card_1(){}
function pico_element_card_2(){}
function pico_element_card_3(){}
function pico_element_toc(){
    if($("#toc").length==0){
        $(".pico-element.toc").attr("class","pico-element toc-left-content");
        $(".pico-element.toc-left-content").before(
            "<div id='toc' class='pico-element toc-left'>\
                <ul data-toc='.pico-element.toc-left-content' data-toc-headings='h2,h3,h4'></ul>\
            </div>"
        );
        toc.call($("[data-toc]"));
    }
}
function pico_element_toc_top(){
    if($("#toc").length==0){
        $(".pico-element.toc-top").attr("class","pico-element toc-top-content");
        $(".pico-element.toc-top-content").before(
            "<div id='toc' class='pico-element toc-top'>\
                <ul data-toc='.pico-element.toc-top-content' data-toc-headings='h2,h3,h4'></ul>\
            </div>"
        );
        toc.call($("[data-toc]"));
    }
}
function pico_element_centre_park(){
    // $("body").append('<canvas id = "myCanvas"></canvas>');
    // $(".pico-element.centre-park img").attr('id','myImg');
    // var c = document.getElementById("myCanvas");
    // var ctx = c.getContext("2d");
    // var img = document.getElementById("myImg");
    // ctx.drawImage(img, 0, 0);
    // $("#myCanvas").remove();
    // var pixel = ctx.getImageData(10, 10, 1, 1);
    // var rgba = 'rgba(' + pixel.data[0] + ',' + pixel.data[1] + ',' + pixel.data[2] + ',' + (pixel.data[3]/255) + ')';
    // var centre_park = $(".pico-element.centre-park");
    // var centre_park_inner = centre_park.html();
    // centre_park.empty();
    // centre_park.append("<div class='container'></div>");
    // $(".pico-element.centre-park .container").append(centre_park_inner);
    // centre_park.css("background-color", rgba);
    //console.log(rgba);
}
function pico_element_ordered_heading(){}

$(document).ready(function(){
    $(".pico-element").trigger("change");
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////
var toc = function (options) {
    return this.each(function () {
        var root = $(this),
            data = root.data(),
            thisOptions,
            stack = [root],
            listTag = this.tagName,
            currentLevel = 0,
            headingSelectors;
        thisOptions = $.extend(
            {content: "body", headings: "h1,h2,h3"},
            {content: data.toc || undefined, headings: data.tocHeadings || undefined},
            options
        );
        headingSelectors = thisOptions.headings.split(",");
        $(thisOptions.content).find(thisOptions.headings).attr("id", function (index, attr) {
            var generateUniqueId = function (text) {
                if (text.length === 0) {
                    text = "?";
                }
                var baseId = text.replace(/\s+/g, "_"), suffix = "", count = 1;
                while (document.getElementById(baseId + suffix) !== null) {
                    suffix = "_" + count++;
                }
                return baseId + suffix;
            };
            return attr || generateUniqueId($(this).text());
        }).each(function () {
            var elem = $(this), level = $.map(headingSelectors, function (selector, index) {
                return elem.is(selector) ? index : undefined;
            })[0];
            if (level > currentLevel) {
                var parentItem = stack[0].children("li:last")[0];
                if (parentItem) {
                    stack.unshift($("<" + listTag + "/>").appendTo(parentItem));
                }
            } else {
                stack.splice(0, Math.min(currentLevel - level, Math.max(stack.length - 1, 0)));
            }
            $("<li/>").appendTo(stack[0]).append(
                $("<a/>").text(elem.text()).attr("href", "#" + elem.attr("id"))
            );
            currentLevel = level;
        });
    });
}, old = $.fn.toc;