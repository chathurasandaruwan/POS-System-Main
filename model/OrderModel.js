export default class OrderModel {
    constructor(orderId,itemCode,qty,orderDate,customerId) {
        this._orderId = orderId;
        this._itemCode = itemCode;
        this._qty = qty;
        this._orderDate = orderDate;
        this._customerId = customerId;
    }
    get itemCode() {
        return this._itemCode;
    }

    set itemCode(value) {
        this._itemCode = value;
    }

    get qty() {
        return this._qty;
    }

    set qty(value) {
        this._qty = value;
    }

    get orderDate() {
        return this._orderDate;
    }

    set orderDate(value) {
        this._orderDate = value;
    }

    get customerId() {
        return this._customerId;
    }

    set customerId(value) {
        this._customerId = value;
    }
}