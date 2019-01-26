var height = 0;
var pages = $(".item");
pages.each(function(){
    var this_height = $(this).outerHeight(true);
    if(this_height > height){
        height = this_height;
    }
});
pages.each(function(){
    $(this).height(height);
});
//console.log(card_width);