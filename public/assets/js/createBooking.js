(function ($) {
    "use strict";

    jQuery(document).ready(function ($) {
        $(document).on('submit', '#bookingForm', function (e) {
            e.preventDefault();
            let custName = $('#custName').val();
            let address = $('#adress').val();
            let custDob = $('#custDob').val();
            let custGender = $('#custGender').val();
            let custPassport = $('#custPassport').val();
            let mobile = $('#mobile').val();
            let custEmail = $('#custEmail').val();
            let passengers = $('#passengers').val();
            let passname = $("input[name='passName[]']").map(function(){return $(this).val();}).get();
            let passPassport = $("input[name='passPassport[]']").map(function(){return $(this).val();}).get();
            let passDob = $("input[name='passDob[]']").map(function(){return $(this).val();}).get();
            let seatNo = $("select[name='seatNo[]']").map(function(){return $(this).val();}).get();

            let passengerArray = ['1','2','3','4','5'];
            var Genders=['Male','Female','Other'];
            var error_msgs="<strong>Error</strong>";

            try{
                if(!ValidateEmail(custEmail)){
                    error_msgs+='<br>Enter a valid email';
                }
                if(custDob!==""){
                    try{
                        let datePicked = new Date(custDob);

                        if(Date.now()<datePicked)
                            error_msgs+='<br>Pick a valid Date of Birth';
                    }catch{
                        error_msgs+='<br>Pick a valid Date of Birth';
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


            }catch(err){
                error_msgs=`<br>OOPS! something went wrong!${err}`;
            }

            if (error_msgs==="<strong>Error</strong>") {
                // $.ajax({
                //     type: "POST",
                //     url: '/booking/createBooking',
                //     data: {
                //
                //         'email' : email,
                //         'password' :password,
                //         'confirmPassword' :confirmPassword,
                //         'firstName': firstName,
                //         'lastName': lastName,
                //         'dob' : dob,
                //         'gender' :gender,
                //         'contactNo' :contactNo,
                //         'passportNo' : passportNo,
                //         'addressLine1': addressLine1,
                //         'addressLine2': addressLine2,
                //         'city': city,
                //         'country' :country,
                //     },
                //     contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                //     success: function (response) {
                //         $('#bookingForm').children('.reg-error').remove();
                //         if (response.result === 'redirect') {
                //             //redirecting
                //             let baseurl = window.location.origin;
                //             baseurl = baseurl + '/';
                //             let url = baseurl + response.url;
                //             window.location.replace(url);
                //         }
                //     },
                //     error: function (res) {
                //     }
                // });
            } else {
                let bookingForm = $('#bookingForm');
                bookingForm.children('.reg-error').remove();
                bookingForm.prepend('<span class="alert alert-danger reg-error" style="z-index 999; width: 100%">'+error_msgs+'</span>');
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
        });

    })

}(jQuery));

