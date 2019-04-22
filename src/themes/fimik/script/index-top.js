$(document).ready(function(){
    $(".banner").each(function(){
        var json_row_setting = $(this).children("#row_setting").val();
        var row_setting = JSON.parse(json_row_setting);
        //height
        if(row_setting.height > $(this).height()){
            $(this).height(row_setting.height);
        }
        //background color
        if(row_setting.background_color){
            $(this).css("background-color", row_setting.background_color);
        }
    });
    $(".cards").each(function(){
        //width
        var document_width = $(document).width();
        var cards_width = $(this).children(".container").width();
        var cards = $(this).find(".card");
        var margin = cards.first().outerWidth(true) - cards.first().outerWidth();
        var card_width = cards_width/cards.length - margin - 2;
        cards.each(function(){
            if( document_width > 767 ) {
                $(this).width(card_width);
            }
        });
        //height
        var slogans = $(this).find(".slogan");
        var slogan_height = 0;
        slogans.each(function(){
            var this_slogan_height = $(this).outerHeight(true);
            if(this_slogan_height > slogan_height){
                slogan_height = this_slogan_height;
            }
        });
        slogans.each(function(){
            $(this).height(slogan_height);
        });
        //console.log(card_width);
    });
});
$(window).resize(function(){
    //location.reload();
});
