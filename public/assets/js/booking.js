let bookingForm = $('#bookingForm');

let start ='<div class="passengerCount"> <div class="booking-registration-form"> <div class="booking-form-area"> <h3 class="title">Passenger information</h3>'
let end = '</div></div></div>'

let passengerinfo = '<br><div class="form-group row">' +
                        '<label class="col-lg-4 col-form-label">Full Name of Passenger</label>' +
                        '<div class="col-lg-8">' +
                            '<input type="text" class="form-control" name="passName[]" required>' +
                        '</div>' +
                    '</div>' +
                    '<div class="form-group row">' +
                        '<label class="col-lg-4 col-form-label">Passport Number</label>' +
                        '<div class="col-lg-8">' +
                            '<input type="text" class="form-control" name="passPassport[]" required>' +
                        '</div>' +
                    '</div>' +
                    '<div class="form-group row">' +
                        '<label class="col-lg-4 col-form-label">Date of Birth</label>' +
                        '<div class="col-lg-8">' +
                            '<input type="date" class="form-control" name="passDob[]" required>' +
                        '</div>' +
                    '</div>' +
                    '<div class="form-group row">' +
                        '<label class="col-lg-4 col-form-label">Seat Number</label>' +
                        '<div class="col-lg-8">' +
                            '<select class="select-bar seatNumber" name="seatNo[]" id="seatNo" required>' +

                            '</select>' +
                        '</div>' +
                    '</div><hr>'



let selected;
let dropdown;
$(".seat-check").click(function () {
    selected = [];
    dropdown = '';
    $('.plane input:checked').each(function() {
        selected.push($(this).data('seat'));
    });

    selected.forEach(function (item, index) {
        let menuItem;
        if (index === 0){
            menuItem = '<option style="color: #0b0b0b" value="'+ item +'" selected>' + item + '</option>'

        } else {
            menuItem = '<option style="color: #0b0b0b" value="'+ item +'">' + item + '</option>'
        }
        dropdown += menuItem;
    });

    $('.seatNumber').each(function () {
        $(this).html(dropdown);
    })
})



window.onload = checkPassengerCount;

function checkPassengerCount() {
    let passCount = $("#passengers").val();
    bookingForm.children('.passengerCount').remove();
    let passengerList = '';
    for(let i=0; i<passCount; i++){
        passengerList += passengerinfo
    }
    $('.educational-registration-form').before(start + passengerList + end)
    $('.seatNumber').each(function () {
        $(this).html(dropdown);
    })
}


$("#passengers").change(function() {
    bookingForm.children('.passengerCount').remove();
    let passengerList = '';
    for(let i=0; i<this.value; i++){
        passengerList += passengerinfo
    }
    $('.educational-registration-form').before(start + passengerList + end)
    $('.seatNumber').each(function () {
        $(this).html(dropdown);
    })
});