let seconds = 600;
let el = document.getElementById('seconds-counter');

function incrementSeconds() {

    if (seconds>60){
        mint=Math.floor(seconds/60);
        sec=seconds%60;
        el.innerText = "Time Remaining is  " +mint + " Minuites and "+ sec + " seconds.";
    }
    else{
        el.innerText ="Time Remaining is  " + seconds + " seconds.";
    }
    seconds -= 1;

}

let cancel = setInterval(incrementSeconds, 1000);

setTimeout(delBooking, 602000);
//TODO
var show_close_alert=true;
//window.onbeforeunload = delBooking;
$("form").bind("submit", function (){
    show_close_alert=false;
    
});
$(window).bind("beforeunload", function () {
    if(show_close_alert){
        delBooking();
    }
    
});

function delBooking(){
    $.ajax({
        type: "DELETE",
        url: '/booking/deleteBooking',
        data: {
            'booking_id' : $('#booking_id').val(),

        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (response) {
            if (response.result === 'redirect') {
                //redirecting
                let baseurl = window.location.origin;
                let url = baseurl + response.url;
                window.location.href = url;
            }
        },
        error: function (res) {
        }
    });
}
