export default class CustomerModel{

    constructor(customerId,customerName,customerAdd,customerSalary) {
        this._customerId = customerId;
        this._customerName = customerName;
        this._customerAdd = customerAdd;
        this._customerSalary = customerSalary;
    }

    get customerId() {
        return this._customerId;
    }

    set customerId(value) {
        this._customerId = value;
    }

    get customerName() {
        return this._customerName;
    }

    set customerName(value) {
        this._customerName = value;
    }

    get customerAdd() {
        return this._customerAdd;
    }

    set customerAdd(value) {
        this._customerAdd = value;
    }

    get customerSalary() {
        return this._customerSalary;
    }

    set customerSalary(value) {
        this._customerSalary = value;
    }
}