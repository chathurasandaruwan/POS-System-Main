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

}