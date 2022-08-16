const passwordValidator = require("password-validator");

// Creation du schéma
const passwordSchema = new passwordValidator();

passwordSchema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(30) // Maximum length 30
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits(1) // Must have at least 1 digits
    .has()
    .not()
    .spaces() // Should not have spaces
    .is()
    .not()
    .oneOf(["Passw0rd", "Password123"]);

//---Exportation (vers middleware)---
module.exports = passwordSchema;
