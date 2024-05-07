import CustomerModel from "../model/CustomerModel.js";

$('#save_btn').on('click' , ()=>{
    var customerId=$("#customerId").val();
    var customerName=$("#customerName").val();
    var customerAdd=$("#customerAdd").val();
    var customerSalary=$("#customerSalary").val();

    let customerDetails = new CustomerModel(customerId,customerName,customerAdd,customerSalary);
    console.log(customerDetails);
});