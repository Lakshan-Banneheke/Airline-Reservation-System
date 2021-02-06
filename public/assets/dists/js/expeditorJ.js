(function () {
    jQuery(document).ready(function ($) {
        var optionProject = '';
        var saved_o_id = '';
        var show_o_id = '';
        $(document).on('change', '#project_select', function (e) {
            e.preventDefault();
            optionProject = $("#project_select option:selected").text();
            // alert(optionProject);
            if (optionProject !== '' || optionProject !== 'Select Project') {
                $.ajax({
                    type: 'POST',
                    url: '/expeditor/order/getOrdersAndEstimations',
                    data: {
                        'Project_name': optionProject,

                    },
                    success: function (response) {
                        if (response.err !== "") {
                            // $('#err_msg').append(`<div class="alert alert-danger" role="alert">${response.err}</div>`) 
                            // alert(response.err);
                            return
                        }
                        else {
                            // "<% = orders %>" = response.orders;
                            var orders = response.orders;
                            var estimations = response.estimations;
                            // alert(response.orders[0].o_id);
                            // start - show all orders
                            if (orders.length !== 0) {
                                $('#order_view').text('');
                                var table = `
                                <h3>All Orders for ${optionProject} </h3>
                                <table class="table table-bordered table-hover" id="view_order_table">
                                <thead>
                                  <tr>
                                    <th style="width: 10px">#</th>
                                    <th>Order_ID</th>
                                    <th>Shop_Name</th>
                                    <th>Order_Date</th>
                                    <th style="width: 120px">Order_state</th>
                                    
                                  </tr>
                                </thead>
                                <tbody>`;

                                $.each(orders, function (num, order) {
                                    table += `
                                    <tr>
                                        <td>${num + 1}</td>
                                        <td>${order.order_id}</td>
                                        <td>${order.shop_name}</td>`;
                                        if(order.order_date!==null){
                                            table += `<td>${order.order_date.substring(0, 8)}${order.order_date.substring(8, 10)*1 + 1}</td>`;
                                        }else{
                                            table += `<td></td>`;
                                        }
                                   
                                    table += `
                                        <td>${order.ordered}</td>
                                    </tr>
                                    `;
                                });
                                table += `   </tbody>
                                            </table>`

                                $('#order_view').append(table);
                            }
                            else {
                                $('#order_view').html(`<div class="alert alert-danger" role="alert">No any orders for this project</div>`);
                            }
                            // end - show all orders
                            // start -show all estimations
                            if (estimations.length !== 0) {
                                
                                $('#All_Estimate_view').text('');
                                var table = `
                              <h3>All Estimations for ${optionProject} </h3>
                                <table class="table table-bordered table-hover" id="view_estimation_table">
                                <thead>
                                  <tr>
                                    <th style="width: 10px">#</th>
                                    <th>Estimation_ID</th>
                                    <th>Submit_Date</th>
                                    
                                  </tr>
                                </thead>
                                <tbody>`;

                                $.each(estimations, function (num, estimation) {
                                    table += `
                                    <tr>
                                        <td>${num + 1}</td>
                                        <td>${estimation.e_id}</td>
                                        <td>${(estimation.submit_date).substring(0, 8)}${(estimation.submit_date).substring(8, 10)* +1}</td>
                                       
                                    </tr>
                                    `;
                                });
                                table += `   </tbody>
                                            </table>`

                                $('#All_Estimate_view').append(table);
                            }
                            else {
                                $('#All_Estimate_view').html(`<div class="alert alert-danger" role="alert">No any estimations for this project</div>`);
                            }
                            // end - show all estimtions


                        }


                    },
                    error: function (res) {
                    }
                });
            }

        });

        // click show order button
        $(document).on('submit', '#search_order', function (e) {
            e.preventDefault();
            show_o_id = $('#o_id').val();
            // alert(o_id);
            $.ajax({
                type: 'POST',
                url: '/expeditor/order/showOrder',
                data: {
                    'o_id': show_o_id,

                },
                success: function (response) {
                    if (response.err !== "") {
                        $('#showOrder_err_msg').text(response.err);
                        $('#showOrder_err_msg').attr("class", 'alert alert-danger text-center');
                        $('#showOrder_err_msg').attr("role", 'alert');
                        $('#showOrder_err_msg').attr("style", 'text-align: center');
                    }
                    else {
                        order_items=response.order_items;
                        if(order_items.length === 0 ){
                            $('#order_details_table').html('');
                            $('#sendDelete').attr("style", 'display: none');
                            $('#showOrder_err_msg').text('No any order with this ID');
                            $('#showOrder_err_msg').attr("class", 'alert alert-danger text-center');
                            $('#showOrder_err_msg').attr("role", 'alert');
                            $('#showOrder_err_msg').attr("style", 'text-align: center');
                        }
                        else{
                            order_state= (response.order_state)[0].ordered;
                            var table = `
                              
                            <table class="table table-bordered">
                            <thead>
                              <tr>
                                <th style="width: 10px">#</th>
                                <th>Material_ID</th>
                                <th>Size/Description</th>
                                <th>Quantity</th>
                               
                                
                              </tr>
                            </thead>
                            <tbody>`;

                            $.each(order_items, function (num, order_item) {
                                table += `
                                <tr>
                                    <td>${num + 1}</td>
                                    <td>${order_item.m_name}</td>
                                    <td>${order_item.m_amount}</td>
                                    <td>${order_item.ordered_quantity}</td>
                                  
                                </tr>
                                `;
                            });
                            table += `   </tbody>
                                        </table>`

                            $('#order_details_table').html(table);
                            $('#showOrder_err_msg').attr("style", 'display:none');
                            if(order_state === false){
                                $('#sendDelete').attr("style", 'display:');
                            }
                          
                        }
                        
                        
                        // alert(response.order_items);
                    }

                },
                error: function (res) {
                }
            });

        });

        //end -click show order button
        // start show estimate 
        $(document).on('submit', '#search_estimate', function (e) {
            e.preventDefault();
            var e_id = $('#e_id').val();
            // alert(e_id);
            $.ajax({
                type: 'POST',
                url: '/expeditor/order/showEstimate',
                data: {
                    'e_id': e_id,

                },
                success: function (response) {
                    if (response.err !== "") {
                        $('#showEstimate_err_msg').text(response.err);
                        $('#showEstimate_err_msg').attr("class", 'alert alert-danger text-center');
                        $('#showEstimate_err_msg').attr("role", 'alert');
                        $('#showEstimate_err_msg').attr("style", 'text-align: center');
                    }
                    else {
                        estimate_materials=response.estimate_materials;
                        if(estimate_materials.length === 0 ){
                            $('#estimation_details_view').html('');
                            $('#showEstimate_err_msg').text('No any Estimation with this ID');
                            $('#showEstimate_err_msg').attr("class", 'alert alert-danger text-center');
                            $('#showEstimate_err_msg').attr("role", 'alert');
                            $('#showEstimate_err_msg').attr("style", 'text-align: center');
                        }
                        else{
                            var table = `
                              
                            <table class="table table-bordered">
                            <thead>
                              <tr>
                                <th style="width: 10px">#</th>
                                <th>Material_Name</th>
                                <th>Size/Description</th>
                                <th>Quantity</th>
                                <th>Cost</th>
                                
                              </tr>
                            </thead>
                            <tbody>`;
                            var total=0;
                            $.each(estimate_materials, function (num, estimate_material) {
                                table += `
                                <tr>
                                    <td>${num + 1}</td>
                                    <td>${estimate_material.m_name}</td>
                                    <td>${estimate_material.m_amount}</td>
                                    <td>${estimate_material.quantity}</td>`;
                                var cost = estimate_material.m_cost *estimate_material.quantity;
                                total +=cost;
                                table +=`<td>${cost}</td>
                                </tr>
                                `;
                            });
                            table += `<th style="text-align: center;" colspan="4">Total Cost</th><td ><b>${total}</b></td>   
                                        </tbody>
                                        </table>`

                            $('#estimation_details_view').html(table);
                            $('#showEstimate_err_msg').attr("style", 'display:none');
                          
                        }
                        
                        
                        // alert(response.order_items);
                    }

                },
                error: function (res) {
                }
            });

        });

        //end -click show estimate button


        $('#set_order_table').on('input', 'tbody td:nth-child(6)', function (e) {
            e.preventDefault();
            var quantity = $(this).find('input').val();
            var currentRow = $(this).closest("tr");
            var cost = currentRow.find("td:eq(4)").text() * quantity;
            currentRow.find("td:eq(6)").text(cost.toFixed(2));

            var total_cost = 0;
            $('#set_order_table tr').each(function () {
                total_cost += $(this).find("td:eq(6)").text() * 1;
            });

            $(' #order_total').text(total_cost.toFixed(2));

        });


        $(document).on('click', '#order_save_button', function (e) {
            e.preventDefault();
            var r = confirm("check the order again!");
            var final_materials = [];
            var final_quantiies = [];
            var shop_name = '';
            if (r) {
                $('#set_order_table tr').each(function () {
                    if ($(this).find("td:eq(6)").text() * 1 > 0) {
                        final_materials.push($(this).find("td:eq(1)").text());
                        final_quantiies.push($(this).find("td:eq(5) input").val() * 1);
                    }
                });
                shop_name = $('#shop_name').val();
                // alert(shop_name);
                if (optionProject === '' || optionProject === 'Select Project') {
                    $('#info_msg').text(`Please select the project`);
                    $('#info_msg').attr("class", 'alert alert-danger text-center');
                    $('#info_msg').attr("role", 'alert');
                    $('#info_msg').attr("style", 'text-align: center');
                    return;
                }

                if (final_materials.length === 0) {
                    $('#info_msg').text(`NO any items`);
                    $('#info_msg').attr("class", 'alert alert-danger text-center');
                    $('#info_msg').attr("role", 'alert');
                    $('#info_msg').attr("style", 'text-align: center');
                    // $('#info_msg').append(`<div class="alert alert-danger" role="alert">NO any items</div>`) 
                    return;
                }
                if (shop_name === "") {
                    $('#info_msg').text('Please enter the shop name');
                    $('#info_msg').attr("class", 'alert alert-danger text-center');
                    $('#info_msg').attr("role", 'alert');
                    $('#info_msg').attr("style", 'text-align: center');
                    return;
                }
                else {
                    $('#info_msg').text(``);
                    $('#info_msg').attr("class", '');
                    $('#info_msg').attr("role", '');
                }

                $.ajax({
                    type: 'POST',
                    url: '/expeditor/order/save',
                    data: {
                        'final_materials': final_materials,
                        'final_quantiies': final_quantiies,
                        'optionProject': optionProject,
                        'shop_name': shop_name,

                    },
                    success: function (response) {
                        if (response.err !== "") {
                            $('#info_msg').text(response.err);
                            $('#info_msg').attr("class", 'alert alert-danger text-center');
                            $('#info_msg').attr("role", 'alert');
                            $('#info_msg').attr("style", 'text-align: center');
                        }
                        else {
                            $('#info_msg').text('Order Successfully Saved');
                            $('#info_msg').attr("class", 'alert alert-success text-center');
                            $('#info_msg').attr("role", 'alert');
                            saved_o_id = response.o_id;
                            $('#order_send_button').prop('disabled', false);
                        }

                    },
                    error: function (res) {
                    }
                });
            }


        });


        $(document).on('click', '#order_send_button', function (e) {
            e.preventDefault();
            // alert(o_id);
            $('#order_send_button').prop('disabled', true);
            sendOrder(saved_o_id, '#info_msg');
        });

        $(document).on('click', '#orderview_send_button', function (e) {
            e.preventDefault();
            $('#showOrder_err_msg').attr("style", 'display:');
            sendOrder(show_o_id, '#showOrder_err_msg');
        });

        $(document).on('click', '#order_delete_button', function (e) {
            e.preventDefault();
            var r = confirm("Delete this Order?");
            if (r) {
                $.ajax({
                    type: 'POST',
                    url: '/expeditor/order/delete',
                    data: {
                        'o_id': show_o_id,

                    },
                    success: function (response) {
                        if (response.err !== "") {
                            $('#showOrder_err_msg').attr("style", 'display:');
                            $('#showOrder_err_msg').text(response.err);
                            $('#showOrder_err_msg').attr("class", 'alert alert-danger text-center');
                            $('#showOrder_err_msg').attr("role", 'alert');
                            $('#showOrder_err_msg').attr("style", 'text-align: center');
                        }
                        else {
                            $('#showOrder_err_msg').attr("style", 'display:');
                            $('#showOrder_err_msg').text('Order Successfully Deleted');
                            $('#showOrder_err_msg').attr("class", 'alert alert-success text-center');
                            $('#showOrder_err_msg').attr("role", 'alert');
                            $('#order_details_table').html('');
                            $('#sendDelete').attr("style", 'display:none');
                        }

                    },
                    error: function (res) {
                    }
                });
            }
         
        });

        function sendOrder(order_id,msg_id)
        {
            var r = confirm("Send the order?");
            if (r) {
                $.ajax({
                    type: 'POST',
                    url: '/expeditor/order/send',
                    data: {
                        'o_id': order_id,

                    },
                    success: function (response) {
                        if (response.err !== "") {
                            $(msg_id).text(response.err);
                            $(msg_id).attr("class", 'alert alert-danger text-center');
                            $(msg_id).attr("role", 'alert');
                            $(msg_id).attr("style", 'text-align: center');
                        }
                        else {
                            $(msg_id).text('Order Successfully Send');
                            $(msg_id).attr("class", 'alert alert-success text-center');
                            $(msg_id).attr("role", 'alert');
                            $('#sendDelete').attr("style", 'display:none');
                        }

                    },
                    error: function (res) {
                    }
                });
            }

        }


    })

}(jQuery))