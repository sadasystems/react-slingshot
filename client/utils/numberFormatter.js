import MathHelper from "./mathHelper";

class NumberFormatter {
    static getCurrencyFormattedNumber(value) {
        if (value === null) {
            return "";
        }

        return "$" + this.getFormattedNumber(value); // eslint-disable-line prefer-template
    }

    static getFormattedNumber(value) {
        if (value === 0) {
            return 0;
        }

        if (!value) {
            return "";
        }

        if (!this.isInt(this.scrubFormatting(value))) {
            return ""; // if it"s not a number after scrubbing formatting, just return empty.
        }

        let roundedValue = MathHelper.roundNumber(value, 2); // round if more than 2 decimal points
        roundedValue = roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const roundedValueContainsDecimalPlace = (roundedValue.indexOf(".") !== -1);

        if (roundedValueContainsDecimalPlace) {
            const numbersToTheRightOfDecimal = roundedValue.split(".")[1];

            switch (numbersToTheRightOfDecimal.length) {
                case 0:
                    return roundedValue.replace(".", ""); // no decimal necessary since no numbers after decimal
                case 1:
                    return `${roundedValue}0`;
                default:
                    return roundedValue;
            }
        }
        return roundedValue;
    }

    static isInt(number) {
        if (number === "" || number === null) {
            return false;
        }

        return number % 1 === 0;
    }

    static scrubFormatting(value) {
        return value.toString()
            .replace("$", "")
            .replace(",", "")
            .replace(".", "");
    }
}

export default NumberFormatter;
