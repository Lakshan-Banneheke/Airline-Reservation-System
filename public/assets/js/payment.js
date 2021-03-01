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

let submitted = false;

function setSubmitted(){
    submitted = true;
}
window.onbeforeunload = delBooking;


function delBooking(){
    if (!submitted) {
        submitted = true;
        $.ajax({
            type: "DELETE",
            url: '/booking/deleteBooking',
            data: {
                'booking_id': $('#booking_id').val(),

            },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function (response) {
                // if (response.result === 'redirect') {
                //     //redirecting
                //     let baseurl = window.location.origin;
                //     let url = baseurl + response.url;
                //     window.location.href = url;
                // }
            },
            error: function (res) {
            }
        });
    }
}
