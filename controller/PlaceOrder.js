import {CustomerAr,PlaceOrderAr} from "../db/db.js";
import {ItemAr} from "../db/db.js";
import PlaceOrderModel from "../model/PlaceOrderModel.js";
import {reloadItemTable} from "./Item.js";
var recordIndex;
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
 let qtyOHVal = $("#qtyOH").val();
 let itemTotal = itemPriceVal*qtyVal;
let btnText =  $("#addToCart_btn").text();

if (btnText === "AddToCart"){
 if (qtyOHVal > 0) {
  let itemIndex = ItemAr.findIndex(item => item.item_code === itemCodeVal);
  if (itemIndex !== -1) ItemAr[itemIndex].item_qty -= qtyVal;

  let found =false;
  for (let i = 0; i < PlaceOrderAr.length; i++) {
   if (PlaceOrderAr[i].itemCode === itemCodeVal) {
    var placeOrderObj = PlaceOrderAr[i];
    placeOrderObj.qty = Number(qtyVal) + Number(PlaceOrderAr[i].qty);
    placeOrderObj.total = Number(itemTotal) + Number(PlaceOrderAr[i].total);
    loadTable();
    reloadItemTable();
    clearItemSelectInputs();
    found = true;
    break;
   }
  }
  if (!found){
   let placeOrderDetails = new PlaceOrderModel(itemCodeVal, itemNameVal, itemPriceVal, qtyVal, itemTotal);
   PlaceOrderAr.push(placeOrderDetails);
   reloadItemTable();
   loadTable();
   clearItemSelectInputs();
  }
 }else {
  console.log("empty qty");
 }
 let sumTot = 0;
 for (let i = 0; i < PlaceOrderAr.length; i++) {
  sumTot += PlaceOrderAr[i].total;
 }
 $("#lbl-total").text(sumTot);
 let discountPre = $('#discount').val();
 let subTotal = sumTot -(sumTot * (discountPre/100));

 $("#lbl-subTotal").text(subTotal);

}else {
 PlaceOrderAr.splice(recordIndex,1);
 loadTable();
 clearItemSelectInputs();
 $("#addToCart_btn").text("AddToCart");
}

});

function clearItemSelectInputs() {
 $("#itemCode").val("");
 $("#itemName").val("");
 $("#price").val("");
 $("#qtyOH").val("");
 $("#qty").val("");
}
function loadTable() {
 $('#placeOrder-table').empty();
 PlaceOrderAr.map((item,index) =>{
  var record=`<tr>
            <td id="itemCodeValue">${item.itemCode}</td>
            <td id="itemNameValue">${item.itemName}</td>
            <td id="priceValue">${item.price}</td>
            <td id="qtyValue">${item.qty}</td>
            <td id="total">${item.total}</td>
        </tr>`
  $('#placeOrder-table').append(record);
 });
}

$("#placeOrder-table").on('click','tr',function (){
 let index = $(this).index();
 recordIndex = index;

 let itemCodeValue = $(this).find("#itemCodeValue").text();
 let itemNameValue = $(this).find("#itemNameValue").text();
 let priceValue = $(this).find("#priceValue").text();
 let qtyValue = $(this).find("#qtyValue").text();

 $("#itemCode").val(itemCodeValue);
 $("#itemName").val(itemNameValue);
 $("#price").val(priceValue);
 $("#qty").val(qtyValue);

 $("#addToCart_btn").text("Remove");
 $("#addToCart_btn").css({backgroundColor : "red", color: "white" });


});