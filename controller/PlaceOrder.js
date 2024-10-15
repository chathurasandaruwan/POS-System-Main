import {CustomerAr,PlaceOrderAr} from "../db/db.js";
import PlaceOrderModel from "../model/PlaceOrderModel.js";
import {reloadItemTable} from "./Item.js";
import {loadOrderDetailTable} from "./OrderDetails.js";

var recordIndex;
clearAllInputs();
refreshCustomers();
refreshItems();
loadOrderDetailTable();
var custAr;
var itemAr;
// $('#oId').val(generateNextOrderId());
$('#discount').on("keydown keyup", function (e) {
 setSubTotalLbl();
});
$('#cash').on("keydown keyup", function (e) {
 setBalanceLbl();
});
export function refreshCustomers() {
 $('#customer_inputState').empty();
 let customerArray = [];
 $.ajax({
  method:"GET",
  contentType:"application/json",
  url:"http://localhost:8080/PosSystem/api/v1/customer",
  async:true,
  success:function (data){
   customerArray=data;
   custAr=data;
   for (let i = 0; i < customerArray.length; i++) {
    $('#customer_inputState').append($('<option>', {
     value: i,
     text: customerArray[i].tempId
    }));
   }

  },
  error:function (){
   alert("Error")
  }
 });
 }
$("#customer_inputState").on('change',function (){
 let index = $(this).prop('selectedIndex');
 // console.log(index)
 let customerId = custAr[index].tempId;
 let customerName = custAr[index].customerName;
 let customerAdd = custAr[index].customerAdd;
 let customerSalary = custAr[index].customerSalary;
 $("#C_id").val(customerId);
 $("#C_name").val(customerName);
 $("#C_salary").val(customerSalary);
 $("#C_address").val(customerAdd);

});
export function refreshItems() {
 $('#item_inputState').empty();

 let ItemArray = [];
 $.ajax({
  method:"GET",
  contentType:"application/json",
  url:"http://localhost:8080/PosSystem/api/v1/item",
  async:true,
  success:function (data){
   ItemArray=data;
   itemAr=data;
   for (let i = 0; i < ItemArray.length; i++) {
    $('#item_inputState').append($('<option>', {
     value: i,
     text: ItemArray[i].item_code
    }));
   }

  },
  error:function (){
   alert("Error")
  }
 });
}

$('#item_inputState').on('change', function() {
 let index = $(this).prop('selectedIndex');
 console.log(index)
 let itemCode = itemAr[index].item_code;
 let itemName = itemAr[index].item_Name;
 let itemPrice = itemAr[index].item_price;
 let itemQty = itemAr[index].item_qty;

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
  let itemIndex = itemAr.findIndex(item => item.item_code === itemCodeVal);
  if (itemIndex !== -1) itemAr[itemIndex].item_qty -= qtyVal;

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
 let itemIndex = itemAr.findIndex(item => item.item_code === PlaceOrderAr[recordIndex].itemCode);
 if (itemIndex !== -1) itemAr[itemIndex].item_qty += Number(PlaceOrderAr[recordIndex].qty);
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
 let orderItems = [];
 let qty=0;

 for (let i = 0; i < PlaceOrderAr.length; i++) {
  let itemCode = PlaceOrderAr[i].itemCode;
  let itemName = PlaceOrderAr[i].itemName;
  let itemPrice = PlaceOrderAr[i].price;
  let itemQty = itemAr[i].item_qty;
  qty += PlaceOrderAr[i].qty;

  orderItems.push({
   "item_code": itemCode,
   "item_Name": itemName,
   "item_price": itemPrice,
   "item_qty": itemQty
  });
 }

 let orderId = $('#oId').val();
  let orderDate = $('#date').val();
  let customerId = $("#C_id").val();

  $.ajax({
   method:"POST",
   contentType:"application/json",
   url:"http://localhost:8080/PosSystem/api/v1/order",
   async:true,
   data:JSON.stringify({
    "order_id": orderId,
    "order_date": orderDate,
    "qty": qty,
    "customer": {
     "customerId": customerId
    },
    "items": orderItems
   }),
   success:function (data) {
    PlaceOrderAr.length = 0;
    clearAllInputs();
    loadOrderDetailTable();
    reloadItemTable();
    Swal.fire({
     position: 'bottom-right',
     icon: 'success',
     title: 'Order has been Saved successfully..!',
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

});

function clearAllInputs() {
/* clearItemSelectInputs();
 let orderId = generateNextOrderId();
 console.log(orderId)*/
 $("#customer_inputState").val("");
 // $('#oId').val(orderId);
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
function generateNextOrderId() {

 let OrderArray = [];
 /*$.ajax({
  method:"GET",
  contentType:"application/json",
  url:"http://localhost:8080/PosSystem/order",
  async:true,
  success:function (data){
   OrderArray=data;
   if (OrderArray.length > 0){
    let orderId = OrderArray[OrderArray.length-1].order_id;
    let strings = orderId.split("OID-");
    let id= parseInt(strings[1]);
    ++id;
    let digit = id.toString().padStart(3, '0');

    $("#oId").val("OID-" + digit);
   }else {
    $("#oId").val( "OID-001");
   }
  },
  error:function (){
   alert("Error")
  }
 });*/


 /*
 if (OrderAr.length > 0){
  let orderId = OrderAr[OrderAr.length-1]._orderId;
  let strings = orderId.split("OID-");
  let id= parseInt(strings[1]);
  console.log(id);
  ++id;
  let digit = id.toString().padStart(3, '0');

  return "OID-" + digit;
 }else {
  return "OID-001";
 }*/
}
