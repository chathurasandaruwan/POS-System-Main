export default class ItemModel {

    constructor(item_code,item_Name,item_price,item_qty) {
        this._item_code = item_code;
        this._item_Name = item_Name;
        this._item_price = item_price;
        this._item_qty = item_qty;
    }

    get item_code() {
        return this._item_code;
    }

    set item_code(value) {
        this._item_code = value;
    }

    get item_Name() {
        return this._item_Name;
    }

    set item_Name(value) {
        this._item_Name = value;
    }

    get item_price() {
        return this._item_price;
    }

    set item_price(value) {
        this._item_price = value;
    }

    get item_qty() {
        return this._item_qty;
    }

    set item_qty(value) {
        this._item_qty = value;
    }
}