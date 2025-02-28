import Joi from "joi";

const schema = Joi.object({
    nip: Joi.string().trim().min(3).max(20).required().messages({
        "any.required": "NIP is required",
        "string.empty": "NIP cannot be empty",
        "string.min": "NIP must be at least 3 characters",
        "string.max": "NIP cannot exceed 20 characters"
    }),
    status: Joi.number().integer().min(1).max(9).required().messages({
        "number.base": "Status must be a number",
        "number.integer": "Status must be an integer",
        "number.min": "Status must be at least 1",
        "number.max": "Status cannot exceed 9"
    }),
});

const updateStatusEmployeeValidation = (req, res, next) => {
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

export default updateStatusEmployeeValidation;
