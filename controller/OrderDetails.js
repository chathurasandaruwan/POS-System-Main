export function loadOrderDetailTable() {
    $('#orderDetail-tbl').empty();

    $.ajax({
        method:"GET",
        contentType:"application/json",
        url:"http://localhost:8080/PosSystem/api/v1/order",
        async:true,
        success:function (data){
/*            data.map((item,index) =>{
                console.log(item)
                var record=`<tr>
            <td id="itemCodeValue">${item._orderId}</td>
            <td id="itemNameValue">${item.items.item_code}</td>
            <td id="priceValue">${item._qty}</td>
            <td id="qtyValue">${item._orderDate}</td>
            <td id="total">${item._customerId}</td>
        </tr>`
                $('#orderDetail-tbl').append(record);
            });*/

            data.map((order, index) => {
                console.log(order)
                    let customer = order.customer;
                    let items = order.items;
                    // Loop through items to display them
                    items.forEach((item) => {
                        var record = `<tr>
                    <td id="orderIdValue">${order.tempId}</td>
                    <td id="itemCodeValue">${item.tempId}</td>
                    <td id="priceValue">${item.item_Name}</td>
                    <td id="qtyValue">${order.order_date}</td>
                    <td id="total">${customer.tempId}</td>
                </tr>`;

                        $('#orderDetail-tbl').append(record);
                    });
            });

        },
        error:function (){
            alert("Error")
        }
    });
}