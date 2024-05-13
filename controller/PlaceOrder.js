import {CustomerAr,PlaceOrderAr} from "../db/db.js";
import {ItemAr,OrderAr} from "../db/db.js";
import PlaceOrderModel from "../model/PlaceOrderModel.js";
import {reloadItemTable} from "./Item.js";
import OrderModel from "../model/OrderModel.js";
var recordIndex;
clearAllInputs();
$('#discount').on("keydown keyup", function (e) {
 setSubTotalLbl();
});
$('#cash').on("keydown keyup", function (e) {
 setBalanceLbl();
});
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
 let qtyVal = Number($("#qty").val());
 let qtyOHVal = Number($("#qtyOH").val());
 let itemTotal = itemPriceVal*qtyVal;
let btnText =  $("#addToCart_btn").text();
 console.log(qtyVal)
 console.log(qtyOHVal)

if (btnText === "AddToCart"){
 if (qtyOHVal > 0 && qtyOHVal >= qtyVal) {
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
  // console.log("empty qty");
  Swal.fire({
   position: 'bottom-right',
   icon: "error",
   title:"empty qty !",
   text: "please try again !",
   showConfirmButton: false,
   timer: 2000,
   customClass: {
    popup: 'small'
   }
  });
 }
 setValuesToTotalLbl();

}else {
 // removeFromCart
 let itemIndex = ItemAr.findIndex(item => item.item_code === PlaceOrderAr[recordIndex].itemCode);
 if (itemIndex !== -1) ItemAr[itemIndex].item_qty += Number(PlaceOrderAr[recordIndex].qty);
 reloadItemTable();
 PlaceOrderAr.splice(recordIndex,1);
 loadTable();
 clearItemSelectInputs();
 $("#addToCart_btn").text("AddToCart");
 $("#addToCart_btn").removeClass("btn-danger");
 $("#addToCart_btn").addClass("btn-warning");
 $("#cancel_btn").css({display:"none"});
 setValuesToTotalLbl();
}
});
function setValuesToTotalLbl() {
 let sumTot = 0;
 for (let i = 0; i < PlaceOrderAr.length; i++) {
  sumTot += PlaceOrderAr[i].total;
 }
 $("#lbl-total").text(sumTot);
 let discountPre = $('#discount').val();
 let subTotal = sumTot -(sumTot * (discountPre/100));

 $("#lbl-subTotal").text(subTotal);
}
function setSubTotalLbl() {
 if ($('#discount').val().length != 0){
  let sumTot = Number($("#lbl-total").text());
  let discountPre = $('#discount').val();
  let subTotal = sumTot -(sumTot * (discountPre/100));

  $("#lbl-subTotal").text(subTotal);
 }
}
function setBalanceLbl() {
 if ($('#cash').val().length!=0 && ($('#lbl-subTotal').text().length!=0)){
  let subTotal = Number( $("#lbl-subTotal").text());
  let cash = Number( $("#cash").val());
  console.log(subTotal);
  console.log(cash)
  let balance = cash - subTotal;
  $('#Balance').val(balance);

 }else {

  $('#Balance').val(0.00);
 }
}

function clearItemSelectInputs() {
 $("#itemCode").val("");
 $("#itemName").val("");
 $("#price").val("");
 $("#qtyOH").val("");
 $("#qty").val("");
 $("#item_inputState").val("");
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
 $("#addToCart_btn").removeClass("btn-warning");
 $("#addToCart_btn").addClass("btn-danger");
 $("#cancel_btn").css({display:"initial"});

});

$("#cancel_btn").on('click' , ()=>{
 clearItemSelectInputs();
 $("#addToCart_btn").text("AddToCart");
 $("#addToCart_btn").removeClass("btn-danger");
 $("#addToCart_btn").addClass("btn-warning");
 $("#cancel_btn").css({display:"none"});
});

$("#btnPurchase").on('click' , ()=>{
 let j = OrderAr.length;
 for (let i = 0; i < PlaceOrderAr.length; i++) {
  let orderId = $('#oId').val();
  let itemCode = PlaceOrderAr[i].itemCode;
  let qty = PlaceOrderAr[i].qty;
  let orderDate = $('#date').val();
  let customerId = $("#C_id").val();

  let orderDetails = new OrderModel(orderId,itemCode,qty,orderDate,customerId);
  OrderAr.push(orderDetails);
  console.log(OrderAr[j++]);
 }
 PlaceOrderAr.length = 0;
 clearAllInputs();
});

function clearAllInputs() {
 clearItemSelectInputs();
 $("#customer_inputState").val("");
 $('#oId').val("");
 $('#date').val("");
 $("#C_id").val("");
 $('#placeOrder-table').empty();
 $('#cash').val("");
 $('#lbl-subTotal').text("");
 $('#discount').val("");
 $("#C_name").val("");
 $("#C_salary").val("");
 $("#C_address").val('');
 $('#Balance').val("");
 $("#lbl-total").text("");

}