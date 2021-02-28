(function ($) {
    "use strict";

    jQuery(document).ready(function ($) {
        $(document).on('submit', '#bookingForm', function (e) {
            e.preventDefault();
            let schedule_id = $('#schedule_id').val();
            let custID = $('#custID').val();
            let custName = $('#custName').val();
            let tempAddress = $('#adress').val();
            let custDob = $('#custDob').val();
            let custGender = $('#custGender').val();
            let custPassport = $('#custPassport').val();
            let mobile = $('#mobile').val();
            let custEmail = $('#custEmail').val();
            let passengers = $('#passengers').val();
            let custType = $('#custType').val();
            let passName = $("input[name='passName[]']").map(function(){return $(this).val();}).get();
            let passPassport = $("input[name='passPassport[]']").map(function(){return $(this).val();}).get();
            let passDob = $("input[name='passDob[]']").map(function(){return $(this).val();}).get();
            let seatNo = $("select[name='seatNo[]']").map(function(){return $(this).val();}).get();

            let passengerArray = ['1','2','3','4','5'];
            let Genders=['Male','Female','Other'];
            let error_msgs="<strong>Error</strong>";

            let address = tempAddress.replace(/\n/g, "");

            try{
                if(!ValidateEmail(custEmail)){
                    error_msgs+='<br>Enter a valid email';
                }
                if(custDob!==""){
                    try{
                        let datePicked = new Date(custDob);
                        let cutoffDate  = new Date(Date.now() - (1000*60*60*24*365*18));

                        if(cutoffDate<datePicked)
                            error_msgs+='<br>Pick a valid Date of Birth for customer';
                    }catch{
                        error_msgs+='<br>Pick a valid Date of Birth for customer';
                    }
                }
                if(Genders.indexOf(custGender)===-1){
                    error_msgs+="<br>Gender must be Male, Female or Other";
                }


                if(mobile.length<10 ||mobile.length>15 || isNaN(mobile)){
                    error_msgs+="<br>Contact number must be 10-15 digits"
                }

                if(passengerArray.indexOf(passengers) === -1){
                    error_msgs+="<br>Please select number of passengers";
                }
                if (!checkIfArrayIsUnique(seatNo)){
                    error_msgs+="<br>Please select a unique seat number for each passenger";
                }

                passDob.forEach(ValidatePassDob);

            }catch(err){
                error_msgs=`<br>OOPS! something went wrong!${err}`;
            }

            if (error_msgs==="<strong>Error</strong>") {
                $.ajax({
                    type: "POST",
                    url: '/booking/createBooking',
                    data: {
                        'schedule_id' : schedule_id,
                        'custID' : custID,
                        'custName' : custName,
                        'address' : address,
                        'custDob' : custDob,
                        'custGender' : custGender,
                        'custPassport' : custPassport,
                        'mobile' : mobile,
                        'custEmail' : custEmail,
                        'custType' : custType,
                        'passengers' : passengers,
                        'passName' : passName,
                        'passPassport' : passPassport,
                        'passDob' : passDob,
                        'seatNo' : seatNo
                    },
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (response) {
                        $('#bookingForm').children('.reg-error').remove();
                        if (response.result === 'redirect') {
                            //redirecting
                            let baseurl = window.location.origin;
                            baseurl = baseurl + '/booking';
                            let url = baseurl + response.url;
                            window.location.href = url;
                        }
                    },
                    error: function (res) {
                    }
                });
            } else {
                let bookingForm = $('#bookingForm');
                bookingForm.children('.reg-error').remove();

                $('.educational-registration-form').before('<span class="alert alert-danger reg-error" style="z-index 999; width: 100%">'+error_msgs+'</span>');
                // $('#map').height('576px');
                $('.reg-error');
            }

            function checkIfArrayIsUnique(myArray) {
                return myArray.length === new Set(myArray).size;
            }

            function ValidateEmail(mail) {
                if (mail && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
                {
                    return (true)
                }
                return (false)
            }

            function ValidatePassDob(item, index) {
                let datePicked = new Date(item);
                let currentDate = new Date(Date.now());
                if(currentDate<datePicked)
                    error_msgs+='<br>Pick a valid Date of Birth for passenger ' + (index+1);
            }
        });

    })

}(jQuery));

