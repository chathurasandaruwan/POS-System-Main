import CustomerModel from "../model/CustomerModel.js";
import {CustomerAr, OrderAr} from "../db/db.js";
import {refreshCustomers} from "./PlaceOrder.js";
import {CustomerValidation} from "./validation/CustomerValidation.js";
var recordIndex;
$('#delete_btn').prop('disabled', true);
$('#updateMain_btn').prop('disabled', true);
clearInputs();
$('#save_btn').on('click' , ()=>{
    var customerId=$("#customerId").val();
    var customerName=$("#customerName").val();
    var customerAdd=$("#customerAdd").val();
    var customerSalary=$("#customerSalary").val();
    var customerVal = new CustomerValidation();
    const result1 = customerVal.customerNameVal(customerName);
    const  result2 = customerVal.customerAddressVal(customerAdd);
    const  result3 =customerVal.customerSalaryVal(customerSalary);
    $('#customerName').removeAttr('style');
    $('#customerAdd').removeAttr('style');
    $('#customerSalary').removeAttr('style');
    if (result1.isValid){
        if (result2.isValid){
            if (result3.isValid){
                let customerDetails = new CustomerModel(customerId,customerName,customerAdd,customerSalary);
                // CustomerAr.push(customerDetails);

                $.ajax({
                    method:"POST",
                    contentType:"application/json",
                    url:"http://localhost:8080/PosSystem/customer",
                    async:true,
                    data:JSON.stringify({
                        "customerId": customerId,
                        "customerName": customerName,
                        "customerAdd": customerAdd,
                        "customerSalary": customerSalary
                    }),
                    success:function (data){
                        refreshCustomers();
                        loadTable();
                        clearInputs();
                        Swal.fire({
                            position: 'bottom-right',
                            icon: 'success',
                            title: 'Customer has been Save successfully..!',
                            showConfirmButton: false,
                            timer: 2000,
                            customClass: {
                                popup: 'small'
                            }
                        });

                    },
                    error:function (){
                        alert("Error")
                    }
                })
            }else {
                $('#customerSalary').css({"border": "2px solid red"});
                Swal.fire({
                    position: 'bottom-right',
                    icon: 'error',
                    title: 'invalid Salary ..!',
                    showConfirmButton: false,
                    timer: 2000,
                    customClass: {
                        popup: 'small'
                    }
                });
            }
        }else {
            $('#customerAdd').css({"border": "2px solid red"});
            Swal.fire({
                position: 'bottom-right',
                icon: 'error',
                title: 'invalid Address..!',
                showConfirmButton: false,
                timer: 2000,
                customClass: {
                    popup: 'small'
                }
            });
        }
    }else {
        $('#customerName').css({"border": "2px solid red"});
        Swal.fire({
            position: 'bottom-right',
            icon: 'error',
            title: 'invalid name..!',
            showConfirmButton: false,
            timer: 2000,
            customClass: {
                popup: 'small'
            }
        });
    }
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


        const customerVal1 = new CustomerValidation();
        const result1 = customerVal1.customerNameVal(custName);
        const  result2 = customerVal1.customerAddressVal(custAdd);
        const  result3 =customerVal1.customerSalaryVal(custSalary);
        $('#cust_Name').removeAttr('style');
        $('#cust_Address').removeAttr('style');
        $('#cust_Salary').removeAttr('style');

        if (result1.isValid){
            if (result2.isValid){
                if (result3.isValid){

                    $.ajax({
                        method:"PUT",
                        contentType:"application/json",
                        url:"http://localhost:8080/PosSystem/customer",
                        async:true,
                        data:JSON.stringify({
                            "customerId": custId,
                            "customerName": custName,
                            "customerAdd": custAdd,
                            "customerSalary": custSalary
                        }),
                        success:function (data){
                            refreshCustomers();
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

                        },
                        error:function (){
                            alert("Error")
                        }
                    })




                    /*var customerObj = CustomerAr[recordIndex];
                    customerObj.customerId = custId;
                    customerObj.customerName = custName;
                    customerObj.customerAdd = custAdd;
                    customerObj.customerSalary = custSalary;*/

                    $("#exampleModal1").modal("hide");
                    loadTable();
                    clearInputs();
                }else {
                    $('#cust_Salary').css({"border": "2px solid red"});
                    Swal.fire({
                        position: 'bottom-right',
                        icon: 'error',
                        title: 'invalid Salary ..!',
                        showConfirmButton: false,
                        timer: 2000,
                        customClass: {
                            popup: 'small'
                        }
                    });
                }
            }else {
                $('#cust_Address').css({"border": "2px solid red"});
                Swal.fire({
                    position: 'bottom-right',
                    icon: 'error',
                    title: 'invalid Address..!',
                    showConfirmButton: false,
                    timer: 2000,
                    customClass: {
                        popup: 'small'
                    }
                });
            }
        }else {
            $('#cust_Name').css({"border": "2px solid red"});
            Swal.fire({
                position: 'bottom-right',
                icon: 'error',
                title: 'invalid name..!',
                showConfirmButton: false,
                timer: 2000,
                customClass: {
                    popup: 'small'
                }
            });
        }
    }
});
function clearInputs() {
    var customerId = generateNextCustomerId();
    $("#customerId").val(customerId);
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
function generateNextCustomerId() {
    if (CustomerAr.length > 0){
        let customerId = CustomerAr[CustomerAr.length-1]._customerId;
        let strings = customerId.split("CID-");
        let id= parseInt(strings[1]);
        console.log(id);
        ++id;
        let digit = id.toString().padStart(3, '0');

        return "CID-" + digit;
    }else {
        return "CID-001";
    }
}