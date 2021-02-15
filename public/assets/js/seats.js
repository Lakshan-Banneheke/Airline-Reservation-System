var $body = $('body');

$body.on('click','.btn-utility',function(){
    $('.aircraft-details').toggleClass('open');
});
var limit = 5;
$("input:checkbox").click(function() {
    limit = $('#passengers').val();

    if (!(1 <= limit && limit <= 5)){
        limit = 5;
    }

    var bol = $("input:checkbox:checked").length >= limit;
    $("input:checkbox").not(":checked").attr("disabled",bol);
});


