(function ($) {
    "use strict";

    jQuery(document).ready(function ($) {
        $(document).on('submit', '#changePassword', function (e) {
            e.preventDefault();
            let custID = $('#custID').val();
            let currentPassword =$("#currentPassword").val();
            let newPassword1 =$("#newPassword1").val();
            let newPassword2 =$("#newPassword2").val();
            let error_msgs="<strong>OOPS</strong>";

            try{
                if(!(5<newPassword1.length && newPassword1.length<20)){
                    error_msgs+="<br>Password must be more than 5 less than 20 characters";
                }

                if(newPassword1!==newPassword2){
                    error_msgs+="<br>Passwords do not match";
                }
            }catch(err){
                error_msgs=`<br>OOPS! something went wrong!${err}`;
            }

            if (error_msgs==="<strong>OOPS</strong>") {
                $.ajax({
                    type: "POST",
                    url: '/customer/changePassword',
                    data: {
                        'custID' :custID,
                        'currentPassword' :currentPassword,
                        'newPassword1': newPassword1,
                        'newPassword2': newPassword2,
                    },
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (response) {
                        $('#changePassword').children('.reg-error1').remove();
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
                $('#changePasswordButton').before('<span class="alert alert-danger reg-error1" style="z-index 999; width: 100%">'+error_msgs+'</span>');

            }



        });
    })

}(jQuery));

