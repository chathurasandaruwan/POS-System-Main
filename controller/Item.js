import ItemModel from "../model/ItemModel.js";
import {ItemAr} from "../db/db.js";

$("#btnSave").on('click' , () =>{

    var itemCode = $("#item_code-main").val();
    var itemName = $("#item_Name-main").val();
    var itemPrice = $("#item_price-main").val();
    var itemQty = $("#item_qty-main").val();

    let itemDetails = new ItemModel(itemCode,itemName,itemPrice,itemQty);

});
