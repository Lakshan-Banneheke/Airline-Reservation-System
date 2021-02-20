(function ($) {
    "use strict";

    jQuery(document).ready(function ($) {
        $(document).on('submit', '#passenger_count_to_dest_form_submit', function (e) {
            e.preventDefault();
            var passenger_count_airport_code = $('#passenger_count_airport_code').val();
            var passenger_count_start_date =$("#passenger_count_start_date").val();
            var passenger_count_end_date =$("#passenger_count_end_date").val();
                $.ajax({
                    type: "POST",
                    url: '/staff/manager/passenger_count_to_dest',
                    data: {
                        'passenger_count_airport_code':passenger_count_airport_code,
                        'passenger_count_start_date':passenger_count_start_date,
                        'passenger_count_end_date':passenger_count_end_date
                    },
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (response) {
                        if(response.message){
                        $('#passenger_count_to_dest_form_submit').prepend('<p class="text-center alert alert-success">'+response.message+'</p>');
                        }
                    },
                    error: function (res) {
                    }
                });
            });

})}(jQuery));

(function ($) {
    "use strict";

    jQuery(document).ready(function ($) {
        $(document).on('submit', '#booking_count_form_submit', function (e) {
            e.preventDefault();
            var booking_count_start_date =$("#booking_count_start_date").val();
            var booking_count_end_date =$("#booking_count_end_date").val();
                $.ajax({
                    type: "POST",
                    url: '/staff/manager/booking_count',
                    data: {
                        'booking_count_start_date':booking_count_start_date,
                        'booking_count_end_date':booking_count_end_date
                    },
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (response) {
                        let string='';
                        response.result.forEach(element => {
                        string += `<tr>
                                            <td>${element.type.toUpperCase()}</td>
                                            <td>${element.count}</td>
                                        </tr>`;
                        });
                        $('#booking_count_form_submit').prepend(`
                        
                        <div class="p-3 alert alert-success" style="overflow-x:auto;">
                            Number of Bookings between ${response.start} and ${response.end};
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">Customer Type</th>
                                        <th scope="col">Number of Bookings</th>
                                </thead>
                                <tbody>
                                    ${string}
                                </tbody>
                            </table>
                        </div>`);
                    },
                    error: function (res) {
                    }
                });
            });

})}(jQuery));


