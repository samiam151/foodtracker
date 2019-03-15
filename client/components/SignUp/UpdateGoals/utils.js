export function calculateBMR(feet, inches, pounds, age, gender, activityLevel) {
    const INCHES_TO_CENTIMETERS_QUANTIFIER = 2.54;
    const POUNDS_TO_KILOGRAMS_QUANTIFIER = 2.2;
    const NUM_INCHES_IN_A_FOOT = 12;

    let bmrFinal = null;
    let heightInCentimeters =
        (+feet * NUM_INCHES_IN_A_FOOT + +inches) *
        INCHES_TO_CENTIMETERS_QUANTIFIER;
    let weightInKilograms = Number.prototype.toFixed.call(
        +pounds / POUNDS_TO_KILOGRAMS_QUANTIFIER,
        2
    );

    let genderNeutralBase =
        heightInCentimeters * 6.25 +
        weightInKilograms * 9.99 -
        +age * 4.92;

    if (gender === "M") {
        bmrFinal = Math.round(genderNeutralBase + 5);
    } else {
        bmrFinal = Math.round(genderNeutralBase - 161);
    }

    bmrFinal = bmrFinal * +activityLevel;

    console.log(`${bmrFinal} Kcal`);
    return bmrFinal;
}