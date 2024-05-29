export class ItemValidation {
    itemNameVal(name){
        const namePattern = /^[A-Za-z ]{5,}$/;
        if (namePattern.test(name)) {
            return {
                isValid: true,
            };
        } else {
            return {
                isValid: false,
            };
        }
    }
    itemPriceVal(price) {
        const namePattern = /^[0-9]{2,}([.][0-9]{2})?$/;
        if (namePattern.test(price)) {
            return {
                isValid: true,
            };
        } else {
            return {
                isValid: false,
            };
        }
    }
}