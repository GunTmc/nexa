import Joi from "joi";

const schema = Joi.object({
    nip: Joi.string().trim().min(3).max(20).required().messages({
        "any.required": "NIP is required",
        "string.empty": "NIP cannot be empty",
        "string.min": "NIP must be at least 3 characters",
        "string.max": "NIP cannot exceed 20 characters"
    }),
    name: Joi.string().trim().min(3).max(50).required().messages({
        "any.required": "Name is required",
        "string.empty": "Name cannot be empty",
        "string.min": "Name must be at least 3 characters",
        "string.max": "Name cannot exceed 50 characters"
    }),
    address: Joi.string().trim().min(5).max(255).required().messages({
        "any.required": "Address is required",
        "string.empty": "Address cannot be empty",
        "string.min": "Address must be at least 5 characters",
        "string.max": "Address cannot exceed 255 characters"
    }),
    gender: Joi.string().valid("L", "P").required().messages({
        "any.required": "Gender is required",
        "string.empty": "Gender cannot be empty",
        "any.only": "Gender must be either 'L' or 'P'"
    }),
    photo: Joi.string().allow(null).allow("").messages({
        "any.required": "Photo is required",
        "string.empty": "Photo cannot be empty",
        "string.base64": "Photo must be a valid Base64 encoded string"
    }),
    dateOfBirth: Joi.date().iso().required().messages({
        "any.required": "Date of Birth is required",
        "string.empty": "Date of Birth cannot be empty",
        "date.format": "Date of Birth must be in ISO format (YYYY-MM-DD)"
    })
});

const updateEmployeeValidation = (req, res, next) => {
    const { error } = schema.validate(
        {
            ...req.body,
            ...req.query,
            ...req.params,
        },
        { abortEarly: false }
    );

    if (error) {
        return res.status(400).json({
            success: false,
            errors: error.details.map((err) => err.message),
        });
    }
    next();
};

export default updateEmployeeValidation;
