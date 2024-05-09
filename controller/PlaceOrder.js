import {CustomerAr} from "../db/db.js";
import {ItemAr} from "../db/db.js";
import PlaceOrderModel from "../model/PlaceOrderModel.js";

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
$("#item_inputState").on('click','option',function (){
 let index = $(this).index();
 let itemCode = ItemAr[index].item_code;
 let itemName = ItemAr[index].item_Name;
 let itemPrice = ItemAr[index].item_price;
 let itemQty = ItemAr[index].item_qty;

 $("#itemCode").val(itemCode);
 $("#itemName").val(itemName);
 $("#price").val(itemPrice);
 $("#qtyOH").val(itemQty);

});

$("#addToCart_btn").on('click' , () => {
 let itemCodeVal = $("#itemCode").val();
 let itemNameVal = $("#itemName").val();
 let itemPriceVal = $("#price").val();
 let qtyVal = $("#qty").val();
 let itemTotal = itemPriceVal*qtyVal;

 let placeOrderDetails = new PlaceOrderModel(itemCodeVal,itemNameVal,itemPriceVal,qtyVal,itemTotal);


});