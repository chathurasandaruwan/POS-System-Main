import ItemModel from "../model/ItemModel.js";
import {CustomerAr, ItemAr} from "../db/db.js";
let recordIndex ;
$("#btnSave").on('click' , () =>{

    var itemCode = $("#item_code-main").val();
    var itemName = $("#item_Name-main").val();
    var itemPrice = $("#item_price-main").val();
    var itemQty = $("#item_qty-main").val();

    let itemDetails = new ItemModel(itemCode,itemName,itemPrice,itemQty);
    ItemAr.push(itemDetails);
    // console.log(ItemAr[0]);
    loadTable();
    clearInputs();
});

function loadTable() {
    $('#item-table').empty();
    ItemAr.map((item,index) =>{
        var record=`<tr>
            <td id="item_codeValue">${item.item_code}</td>
            <td id="item_NameValue">${item.item_Name}</td>
            <td id="item_priceValue">${item.item_price}</td>
            <td id="item_qtyValue">${item.item_qty}</td>
        </tr>`
        $('#item-table').append(record);
    });
}

$("#item-table").on('click','tr',function (){
    let index = $(this).index();
    recordIndex = index;

    let itemCodeValue = $(this).find("#item_codeValue").text();
    let itemNameValue = $(this).find("#item_NameValue").text();
    let itemPriceValue = $(this).find("#item_priceValue").text();
    let itemQtyValue = $(this).find("#item_qtyValue").text();

    $("#item_code-main").val(itemCodeValue);
    $("#item_Name-main").val(itemNameValue);
    $("#item_price-main").val(itemPriceValue);
    $("#item_qty-main").val(itemQtyValue);

    $("#item_code").val(itemCodeValue);
    $("#item_Name").val(itemNameValue);
    $("#item_price").val(itemPriceValue);
    $("#item_qty").val(itemQtyValue);

});

$("#btnUpdate").on('click' , () =>{
    var itemCode = $("#item_code").val();
    var itemName = $("#item_Name").val();
    var itemPrice = $("#item_price").val();
    var itemQty = $("#item_qty").val();

    let itemObj = ItemAr[recordIndex];

    itemObj.item_code = itemCode;
    itemObj.item_Name = itemName;
    itemObj.item_price = itemPrice;
    itemObj.item_qty = itemQty;

    $("#exampleModal2").modal("hide");
    loadTable();
    clearInputs()
});

$("#btnClear").on('click' , () =>{
    clearInputs();
});

function clearInputs() {
    $("#item_code-main").val("");
    $("#item_Name-main").val("");
    $("#item_price-main").val("");
    $("#item_qty-main").val("");

    $("#item_code").val("");
    $("#item_Name").val("");
    $("#item_price").val("");
    $("#item_qty").val("");
}

$("#btnDelete").on('click',()=>{
    ItemAr.splice(recordIndex,1);
    loadTable();
    clearInputs();
});