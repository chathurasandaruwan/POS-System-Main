import CustomerModel from "../model/CustomerModel.js";
import {CustomerAr} from "../db/db.js";

$('#save_btn').on('click' , ()=>{
    var customerId=$("#customerId").val();
    var customerName=$("#customerName").val();
    var customerAdd=$("#customerAdd").val();
    var customerSalary=$("#customerSalary").val();

    let customerDetails = new CustomerModel(customerId,customerName,customerAdd,customerSalary);
    CustomerAr.push(customerDetails);
    console.log(CustomerAr[0]);
    loadTable();
});
function loadTable() {
    $('#customer-table').empty();
    CustomerAr.map((item,index) =>{
        var record=`<tr>
            <td id="customerIdValue">${item.customerId}</td>
            <td id="customerNameValue">${item.customerName}</td>
            <td id="customerAddValue">${item.customerAdd}</td>
            <td id="customerSalaryValue">${item.customerSalary}</td>
        </tr>`
        $('#customer-table').append(record);
    });
}
$("#customer-table").on('click','tr',function (){

    let custIdValue = $(this).find("#customerIdValue").text();
    let custNameValue = $(this).find("#customerNameValue").text();
    let custAddValue = $(this).find("#customerAddValue").text();
    let custSalaryValue = $(this).find("#customerSalaryValue").text();

    $("#customerId").val(custIdValue);
    $("#customerName").val(custNameValue);
    $("#customerAdd").val(custAddValue);
    $("#customerSalary").val(custSalaryValue);

});