import ItemModel from "../model/ItemModel.js";
import {CustomerAr, ItemAr} from "../db/db.js";

$("#btnSave").on('click' , () =>{

    var itemCode = $("#item_code-main").val();
    var itemName = $("#item_Name-main").val();
    var itemPrice = $("#item_price-main").val();
    var itemQty = $("#item_qty-main").val();

    let itemDetails = new ItemModel(itemCode,itemName,itemPrice,itemQty);
    ItemAr.push(itemDetails);
    console.log(ItemAr[0]);
    loadTable();
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