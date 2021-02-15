(function ($) {
    "use strict";

    jQuery(document).ready(function ($) {
        $(document).on('submit', '#create_account_form_submit', function (e) {
            e.preventDefault();
            var email = $('#email').val();
            var password =$("#myInput").val();
            var confirmPassword =$("#myInputTwo").val();
            var firstName = $('#firstName').val();
            var lastName = $('#lastName').val();
            var dob = $('#dob').val();
            var gender =$("#gender").val();
            var contactNo =$("#contactNo").val();
            var passportNo = $("#passportNo").val();
            var addressLine1 =$("#addressLine1").val();
            var addressLine2 =$("#addressLine2").val();
            var city =$("#city").val();
            var country =$("#country").val();
    
            var Genders=['Male','Female','Other'];
            var error_msgs="<strong>OOPS</strong>";

            try{
            if(!ValidateEmail(email)){
                error_msgs+='<br>Enter a valid email';
            }
            if(dob!=""){
                try{
                var datePicked = new Date(dob);
                
                if(Date.now()<datePicked)
                    error_msgs+='<br>Pick a valid Date of Birth';
                }catch{
                    error_msgs+='<br>Pick a valid Date of Birth';
                }     
            }
            if(Genders.indexOf(gender)==-1){
                error_msgs+="<br>Gender must be Male, Female or Other";
            }
            if(!(5<password.length && password.length<20)){
                error_msgs+="<br>Password must be more than 5 less than 20 characters";
            }
            if(password!=confirmPassword){
                error_msgs+="<br>Passwords do not match";
            }
            if(contactNo.length<10 ||contactNo.length>15 || isNaN(contactNo)){
                error_msgs+="<br>Contact number must be 10-15 digits"
            }
            }catch(err){
                error_msgs=`<br>OOPS! something went wrong!${err}`;
            }


            if (error_msgs=="<strong>OOPS</strong>") {
                console.log('k');
                $.ajax({
                    type: "POST",
                    url: '/customer/register',
                    data: {
                        'email' : email,
                        'password' :password,
                        'confirmPassword' :confirmPassword,
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
                        console.log(response);
                        $('#create_account_form_submit').children('.reg-success').remove();
                        if (response.result == 'redirect') {
                            //redirecting
                            window.location.replace(response.url);
                          }
                    },
                    error: function (res) {
                    }
                });
            } else {
                
                $('#create_account_form_submit').children('.reg-success').remove();
                $('#create_account_form_submit').prepend('<span class="alert alert-danger reg-success" style="z-index 999">'+error_msgs+'</span>');
                $('#map').height('576px');
                $('.reg-success');
            }



        });
        function ValidateEmail(mail) 
        {
        if (mail && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
        {
            return (true)
        }
            return (false)
        }
            })

}(jQuery));

