(function ($) {
    "use strict";

    jQuery(document).ready(function ($) {
        $(document).on('submit', '#register-form', function (e) {
            e.preventDefault();
            let name = $('#name').val();
            let email = $('#email').val();
            let password =$("#password").val();
            let password2 =$("#password2").val();
            let category = $('#category').val();
            let gender =$("#gender").val();
            let contactNo =$("#contactNo").val();

            let genderList=['Male','Female','Other'];
            let categoryList = ['2', '3', '4', '5', '6'];
            let error_msgs="<strong>Registration Error</strong>";

            try{
                if(!ValidateEmail(email)){
                    error_msgs+='<br>Enter a valid email';
                }

                if(genderList.indexOf(gender)===-1){
                    error_msgs+="<br>Gender must be Male, Female or Other";
                }
                if(categoryList.indexOf(category)===-1){
                    error_msgs+="<br>Pick a Category";
                }
                if(!(5<=password.length && password.length<11)){
                    error_msgs+="<br>Password must be more than 4 and less than 11 characters";
                }
                if(password !== password2){
                    error_msgs+="<br>Passwords do not match";
                }
                if(contactNo.length<10 ||contactNo.length>15 || isNaN(contactNo)){
                    error_msgs+="<br>Contact number must be 10-15 digits"
                }
            }catch(err){
                error_msgs=`<br>Error! Something went wrong! ${err}`;
            }


            if (error_msgs === "<strong>Registration Error</strong>") {
                // console.log('Validation passed');
                $.ajax({
                    type: "POST",
                    url: '/users/register',
                    data: {
                        'name': name,
                        'email' : email,
                        'password' :password,
                        'password2' :password2,
                        'category' : category,
                        'gender' :gender,
                        'contactNo' :contactNo,
                    },
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (response) {
                        console.log(response);
                        $('#register-form').children('.reg-error').remove();
                        if (response.result === 'redirect') {
                            //redirecting
                            let baseurl = window.location.origin;
                            baseurl = baseurl + '/users/';
                            let url = baseurl + response.url;
                            console.log(url);
                            window.location.replace(url);
                        }
                    },
                    error: function (res) {
                    }
                });
            } else {

                $('#register-form').children('.reg-error').remove();
                $('#register-form').prepend('<div class="alert alert-danger reg-error" role="alert">'+error_msgs+'</div>');
                $('#map').height('576px');
                $('.reg-error');
            }
        });
        function ValidateEmail(mail)
        {
            return !!(mail && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail));

        }
    })

}(jQuery));

