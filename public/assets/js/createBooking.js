(function ($) {
    "use strict";

    jQuery(document).ready(function ($) {
        $(document).on('submit', '#bookingForm', function (e) {
            e.preventDefault();
            let values = $("input[name='passName[]']")
                .map(function(){return $(this).val();}).get();
            console.log(values);

        });

    })

}(jQuery));

