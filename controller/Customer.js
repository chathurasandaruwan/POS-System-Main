import CustomerModel from "../model/CustomerModel.js";
import {CustomerAr} from "../db/db.js";
import {refreshCustomers} from "./PlaceOrder.js";
var recordIndex;
$('#delete_btn').prop('disabled', true);
$('#updateMain_btn').prop('disabled', true);
$('#save_btn').on('click' , ()=>{
    var customerId=$("#customerId").val();
    var customerName=$("#customerName").val();
    var customerAdd=$("#customerAdd").val();
    var customerSalary=$("#customerSalary").val();

    let customerDetails = new CustomerModel(customerId,customerName,customerAdd,customerSalary);
    CustomerAr.push(customerDetails);
    refreshCustomers();
    // console.log(CustomerAr[0]);
    loadTable();
    clearInputs();
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
    let index = $(this).index();
    recordIndex = index;

    let custIdValue = $(this).find("#customerIdValue").text();
    let custNameValue = $(this).find("#customerNameValue").text();
    let custAddValue = $(this).find("#customerAddValue").text();
    let custSalaryValue = $(this).find("#customerSalaryValue").text();

    $("#customerId").val(custIdValue);
    $("#customerName").val(custNameValue);
    $("#customerAdd").val(custAddValue);
    $("#customerSalary").val(custSalaryValue);

    $("#cust_id").val(custIdValue);
    $("#cust_Name").val(custNameValue);
    $("#cust_Address").val(custAddValue);
    $("#cust_Salary").val(custSalaryValue);

    $('#delete_btn').prop('disabled', false);
    $('#updateMain_btn').prop('disabled', false);
    $('#save_btn').prop('disabled', true);

});

$('#clear_btn').on('click' , ()=>{
    clearInputs();
});

$("#delete_btn").on('click',()=>{
    let consent = confirm("Do you really want to delete this customer.?");
    if (consent){
        CustomerAr.splice(recordIndex,1);
        loadTable();
        clearInputs();
        Swal.fire({
            position: 'bottom-right',
            icon: 'success',
            title: 'Customer has been Delete successfully..!',
            showConfirmButton: false,
            timer: 2000,
            customClass: {
                popup: 'small'
            }
        });
    }
});

$("#Update_btn").on('click',()=>{
    let consent = confirm("Do you really want to update this customer.?");
    if (consent){
        var custId=$("#cust_id").val();
        var custName=$("#cust_Name").val();
        var custAdd=$("#cust_Address").val();
        var custSalary=$("#cust_Salary").val();

        var customerObj = CustomerAr[recordIndex];
        customerObj.customerId = custId;
        customerObj.customerName = custName;
        customerObj.customerAdd = custAdd;
        customerObj.customerSalary = custSalary;

        $("#exampleModal1").modal("hide");
        loadTable();
        clearInputs();
        Swal.fire({
            position: 'bottom-right',
            icon: 'success',
            title: 'Customer has been Updated successfully..!',
            showConfirmButton: false,
            timer: 2000,
            customClass: {
                popup: 'small'
            }
        });
    }
});
function clearInputs() {
    $("#customerId").val("");
    $("#customerName").val("");
    $("#customerAdd").val("");
    $("#customerSalary").val("");

    $("#cust_id").val("");
    $("#cust_Name").val("");
    $("#cust_Address").val("");
    $("#cust_Salary").val("");

    $('#delete_btn').prop('disabled', true);
    $('#updateMain_btn').prop('disabled', true);
    $('#save_btn').prop('disabled', false);
}