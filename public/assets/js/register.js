(function ($) {
    "use strict";

    jQuery(document).ready(function ($) {
        $(document).on('submit', '#create_account_form_submit', function (e) {
            e.preventDefault();
            var name = $('#name').val();
            var dob = $('#dob').val();
            var email = $('#email').val();
            var gender =$("#gender").val();
            var contactNo =$("#contactNo").val();
            var country =$("#country").val();
            var passportNo = $("#passportNo").val();
            var password =$("#myInput").val();
            var confirmPassword =$("#myInputTwo").val();

            var Genders=['Male','Female','Other'];
            var error_msgs="<strong>OOPS</strong>";
            console.log(gender);
            try{
            if(name==""){
                error_msgs+="<br>Name is required";
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
            if(!(5<password.length && password.length<11)){
                error_msgs+="<br>Password must be more than 5 less than 11 characters";
            }
            if(password!=confirmPassword){
                error_msgs+="<br>Passwords do not match";
            }
            if(contactNo.length!=10 || isNaN(contactNo)){
                error_msgs+="<br>Contact number must be 10 digits"
            }
            }catch{
                error_msgs="<br>OOPS! something went wrong!"
            }


            if (error_msgs=="<strong>OOPS</strong>") {
                console.log("ok");
                $.ajax({
                    type: "POST",
                    url: '/customer/register',
                    data: {
                        'name': name,
                        'dob' : dob,
                        'email' : email,
                        'gender' :gender,
                        'contactNo' :contactNo,
                        'country' :country,
                        'passportNo' : passportNo,
                        'password' :password,
                        'confirmPassword' :confirmPassword,
                    },
                    success: function (data) {
                        // $('#create_account_form_submit').children('.reg-success').remove();
                        // $('#create_account_form_submit').prepend('<span class="alert alert-success reg-success">' + data + '</span>');
                        // $('#name').val('');
                        // $('#email').val('');
                        // $('#dob').val('');
                        // $("#gender").val('');
                        // $("#contactNo").val('');
                        // $("#country").val('');
                        // $("#passportNo").val('');
                        // $("#password").val('');
                        // $("#myInput").val('');
                        // $("#myInputTwo").val('');
                        // $('#map').height('576px');
                        // $('.reg-success');
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
    })

}(jQuery));