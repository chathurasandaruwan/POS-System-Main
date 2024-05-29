export class CustomerValidation {
    customerNameVal(name) {
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
    customerAddressVal(address) {
        const namePattern = /^[A-Za-z0-9 ]{5,}$/;
        if (namePattern.test(address)) {
            return {
                isValid: true,
            };
        } else {
            return {
                isValid: false,
            };
        }
    }
    customerSalaryVal(salary) {
        const namePattern = /^[0-9]{2,}([.][0-9]{2})?$/;
        if (namePattern.test(salary)) {
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