import {OrderAr} from "../db/db.js";

export function loadOrderDetailTable() {
    $('#orderDetail-tbl').empty();

    $.ajax({
        method:"GET",
        contentType:"application/json",
        url:"http://localhost:8080/PosSystem/order",
        async:true,
        success:function (data){
            data.map((item,index) =>{
                var record=`<tr>
            <td id="itemCodeValue">${item._orderId}</td>
            <td id="itemNameValue">${item._itemCode}</td>
            <td id="priceValue">${item._qty}</td>
            <td id="qtyValue">${item._orderDate}</td>
            <td id="total">${item._customerId}</td>
        </tr>`
                $('#orderDetail-tbl').append(record);
            });
        },
        error:function (){
            alert("Error")
        }
    });
}