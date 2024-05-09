import {CustomerAr} from "../db/db.js";

 export function refresh() {
  console.log("refreshed")
  $('#inputState').empty();
  for (let i = 0; i < CustomerAr.length; i++) {
   $('#inputState').append($('<option>', {
    value: i,
    text: CustomerAr[i].customerId
   }));
  }
 }

$("#inputState").on('click','option',function (){
 let index = $(this).index();
 // console.log(CustomerAr[index]);
 let customerId = CustomerAr[index].customerId;
 let customerName = CustomerAr[index].customerName;
 let customerAdd = CustomerAr[index].customerAdd;
 let customerSalary = CustomerAr[index].customerSalary;

 console.log(customerSalary);
});

