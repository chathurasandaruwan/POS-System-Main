import ItemModel from "../model/ItemModel.js";
import {ItemAr} from "../db/db.js";
import {refreshItems} from "./PlaceOrder.js";
import {ItemValidation} from "./validation/ItemValidation.js";

let recordIndex ;
$('#btnDelete').prop('disabled', true);
$('#updateMain_btn1').prop('disabled', true);
clearInputs();
export function reloadItemTable() {
    loadTable();
}
$("#btnSave").on('click' , () =>{
    var itemCode = $("#item_code-main").val();
    var itemName = $("#item_Name-main").val();
    var itemPrice = $("#item_price-main").val();
    var itemQty = $("#item_qty-main").val();

    const  itemVal = new ItemValidation();
    const result1 = itemVal.itemNameVal(itemName);
    const result2 = itemVal.itemPriceVal(itemPrice);
    const result3 = itemVal.itemQtyVal(itemQty);

    $('#item_Name-main').removeAttr('style');
    $('#item_price-main').removeAttr('style');
    $('#item_qty-main').removeAttr('style');
    if (result1.isValid){
        if (result2.isValid){
            if (result3.isValid){
                let itemDetails = new ItemModel(itemCode,itemName,itemPrice,itemQty);
                ItemAr.push(itemDetails);
                refreshItems();
                loadTable();
                clearInputs();
                Swal.fire({
                    position: 'bottom-right',
                    icon: 'success',
                    title: 'Item has been Saved successfully..!',
                    showConfirmButton: false,
                    timer: 2000,
                    customClass: {
                        popup: 'small'
                    }
                });
            }else {
                $('#item_qty-main').css({"border": "2px solid red"});
                Swal.fire({
                    position: 'bottom-right',
                    icon: 'error',
                    title: 'invalid Qty ..!',
                    showConfirmButton: false,
                    timer: 2000,
                    customClass: {
                        popup: 'small'
                    }
                });
            }
        }else {
            $('#item_price-main').css({"border": "2px solid red"});
            Swal.fire({
                position: 'bottom-right',
                icon: 'error',
                title: 'invalid price ..!',
                showConfirmButton: false,
                timer: 2000,
                customClass: {
                    popup: 'small'
                }
            });
        }
    }else {
        $('#item_Name-main').css({"border": "2px solid red"});
        Swal.fire({
            position: 'bottom-right',
            icon: 'error',
            title: 'invalid name..!',
            showConfirmButton: false,
            timer: 2000,
            customClass: {
                popup: 'small'
            }
        });
    }
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

    $('#btnDelete').prop('disabled', false);
    $('#updateMain_btn1').prop('disabled', false);
    $('#btnSave').prop('disabled', true);

});

$("#btnUpdate").on('click' , () =>{
    let consent = confirm("Do you really want to update this item.?");
    if (consent){
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
        clearInputs();
        Swal.fire({
            position: 'bottom-right',
            icon: 'success',
            title: 'Item has been Updated successfully..!',
            showConfirmButton: false,
            timer: 2000,
            customClass: {
                popup: 'small'
            }
        });
    }
});

$("#btnClear").on('click' , () =>{
    clearInputs();
});

function clearInputs() {
    var itemCode = generateNextItemCode();
    $("#item_code-main").val(itemCode);
    $("#item_Name-main").val("");
    $("#item_price-main").val("");
    $("#item_qty-main").val("");

    $("#item_code").val("");
    $("#item_Name").val("");
    $("#item_price").val("");
    $("#item_qty").val("");

    $('#btnDelete').prop('disabled', true);
    $('#updateMain_btn1').prop('disabled', true);
    $('#btnSave').prop('disabled', false);
}

$("#btnDelete").on('click',()=>{
    let consent = confirm("Do you really want to delete this item.?");
    ItemAr.splice(recordIndex,1);
    loadTable();
    clearInputs();
    Swal.fire({
        position: 'bottom-right',
        icon: 'success',
        title: 'Item has been Deleted successfully..!',
        showConfirmButton: false,
        timer: 2000,
        customClass: {
            popup: 'small'
        }
    });
});

function generateNextItemCode() {
    if (ItemAr.length > 0){
        let itemCode = ItemAr[ItemAr.length-1]._item_code;
        let strings = itemCode.split("IID-");
        let id= parseInt(strings[1]);
        console.log(id);
        ++id;
        let digit = id.toString().padStart(3, '0');

        return "IID-" + digit;
    }else {
        return "IID-001";
    }
}