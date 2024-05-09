import {CustomerAr} from "../db/db.js";
import {ItemAr} from "../db/db.js";

export function refreshCustomers() {
  $('#customer_inputState').empty();
  for (let i = 0; i < CustomerAr.length; i++) {
   $('#customer_inputState').append($('<option>', {
    value: i,
    text: CustomerAr[i].customerId
   }));
  }
 }

$("#customer_inputState").on('click','option',function (){
 let index = $(this).index();
 // console.log(CustomerAr[index]);
 let customerId = CustomerAr[index].customerId;
 let customerName = CustomerAr[index].customerName;
 let customerAdd = CustomerAr[index].customerAdd;
 let customerSalary = CustomerAr[index].customerSalary;
 $("#C_id").val(customerId);
 $("#C_name").val(customerName);
 $("#C_salary").val(customerSalary);
 $("#C_address").val(customerAdd);

});
export function refreshItems() {
 $('#item_inputState').empty();
 for (let i = 0; i < ItemAr.length; i++) {
  $('#item_inputState').append($('<option>', {
   value: i,
   text: ItemAr[i].item_code
  }));
 }
}
