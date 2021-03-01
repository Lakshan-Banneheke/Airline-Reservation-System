(function ($) {
    "use strict";

    jQuery(document).ready(function ($) {
        $(document).on('submit', '#editProfile', function (e) {
            e.preventDefault();
            let custID = $('#custID').val();
            let firstName = $('#editFirstName').val();
            let lastName = $('#editLastName').val();
            let dob = $('#editDob').val();
            let gender =$("#editGender").val();
            let contactNo =$("#editContactNo").val();
            let passportNo = $("#editPassportNo").val();
            let addressLine1 =$("#editAddressLine1").val();
            let addressLine2 =$("#editAddressLine2").val();
            let city =$("#editCity").val();
            let country =$("#editCountry").val();

            let Genders=['Male','Female','Other'];
            let error_msgs="<strong>OOPS</strong>";

            try{
                if(dob!=""){
                    try{
                        let datePicked = new Date(dob);
                        let cutoffDate  = new Date(Date.now() - (1000*60*60*24*365*18));
                        if(cutoffDate<datePicked)
                            error_msgs+='<br>Pick a valid Date of Birth';
                    }catch{
                        error_msgs+='<br>Pick a valid Date of Birth';
                    }
                }
                if(Genders.indexOf(gender)===-1){
                    error_msgs+="<br>Gender must be Male, Female or Other";
                }
                if(contactNo.length<10 ||contactNo.length>15 || isNaN(contactNo)){
                    error_msgs+="<br>Contact number must be 10-15 digits"
                }
            }catch(err){
                error_msgs=`<br>OOPS! something went wrong!${err}`;
            }
            if (error_msgs==="<strong>OOPS</strong>") {
                $.ajax({
                    type: "POST",
                    url: '/customer/editProfile',
                    data: {
                        'custID' :custID,
                        'firstName': firstName,
                        'lastName': lastName,
                        'dob' : dob,
                        'gender' :gender,
                        'contactNo' :contactNo,
                        'passportNo' : passportNo,
                        'addressLine1': addressLine1,
                        'addressLine2': addressLine2,
                        'city': city,
                        'country' :country,
                    },
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (response) {
                        $('#editProfile').children('.reg-error1').remove();
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
            } else {
                $('.reg-error1').remove();
                $('#submitButton').before('<span class="alert alert-danger reg-error1" style="z-index 999; width: 100%">'+error_msgs+'</span>');

            }



        });
    })

}(jQuery));

