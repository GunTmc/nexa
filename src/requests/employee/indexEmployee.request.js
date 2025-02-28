
import Joi from "joi";

const schema = Joi.object({
    search: Joi.string().allow(null).allow(""),
    page: Joi.number().integer().min(1).required().messages({
        "any.required": "Page is required",
        "number.base": "Page must be a number",
        "number.integer": "Page must be an integer",
        "number.min": "Page must be at least 1",
    }),
    size: Joi.number().integer().min(1).required().messages({
        "any.required": "Size is required",
        "number.base": "Size must be a number",
        "number.integer": "Size must be an integer",
        "number.min": "Size must be at least 1",
    }),
});

const indexEmployeeValidation = (req, res, next) => {
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

export default indexEmployeeValidation;
